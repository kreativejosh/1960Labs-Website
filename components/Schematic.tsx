"use client";
import { useEffect, useRef } from "react";
import { SCHEMES } from "@/lib/schematics";
import { prefersReducedMotion } from "@/lib/useInView";

const NS = "http://www.w3.org/2000/svg";
const BLUE = "#221FC3";
const MUTED = "#8F8E88";

type Flow = { svg: SVGSVGElement; tick: (now: number) => void };

/* One animation loop for every drawing on the page; only visible drawings tick. */
const flows = new Set<Flow>();
const visible = new Set<SVGSVGElement>();
let io: IntersectionObserver | null = null;
let raf = 0;
const loop = (now: number) => {
  flows.forEach((f) => { if (visible.has(f.svg)) f.tick(now); });
  raf = flows.size ? requestAnimationFrame(loop) : 0;
};
const observe = (svg: SVGSVGElement) => {
  io ??= new IntersectionObserver((es) => es.forEach((e) => {
    const t = e.target as SVGSVGElement;
    if (e.isIntersecting) visible.add(t); else visible.delete(t);
  }));
  io.observe(svg);
};

type Props = {
  kind: string;
  tone?: "night" | "paper";
  grid?: boolean;
  label?: string;
  className?: string;
};

/**
 * Hairline process drawing with a blue unit travelling the main path and
 * manual steps crawling in grey (brand imagery rules). Decorative unless `label` is set.
 */
export function Schematic({ kind, tone = "night", grid = true, label, className = "schem" }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const sc = SCHEMES[kind];
  const [W, H] = sc ? sc.vb : [320, 220];

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !sc) return;
    svg.replaceChildren();
    const el = <K extends keyof SVGElementTagNameMap>(p: Element, t: K, a: Record<string, string | number>) => {
      const e = document.createElementNS(NS, t);
      for (const k in a) e.setAttribute(k, String(a[k]));
      p.appendChild(e);
      return e;
    };
    const night = tone === "night";
    const ink = night ? "#F7F7F5" : "#0B0B0C", faint = night ? "#1C1C1F" : "#EFEEEA", bg = night ? "#0B0B0C" : "#FFFFFF";
    const ns = { "vector-effect": "non-scaling-stroke", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" };

    if (grid) {
      const g = el(svg, "g", {});
      for (let x = 20; x < W; x += 20) el(g, "line", { x1: x, y1: 0, x2: x, y2: H, stroke: faint, "stroke-width": 0.5, "vector-effect": "non-scaling-stroke" });
      for (let y = 20; y < H; y += 20) el(g, "line", { x1: 0, y1: y, x2: W, y2: y, stroke: faint, "stroke-width": 0.5, "vector-effect": "non-scaling-stroke" });
    }
    const label = (x: number, y: number, s: string, c: string, anchor = "middle") => {
      const t = el(svg, "text", { x, y, fill: c, "text-anchor": anchor });
      t.textContent = s;
    };
    const paths: { el: SVGPathElement; manual: boolean }[] = [];
    const nodes: { x: number; y: number; r: SVGRectElement }[] = [];
    sc.items.forEach((o) => {
      if ("d" in o) paths.push({
        el: el(svg, "path", { ...ns, d: o.d, stroke: o.manual ? MUTED : ink, "stroke-width": o.manual ? 0.75 : 1, ...(o.manual ? { "stroke-dasharray": "3 3" } : {}) }),
        manual: !!o.manual,
      });
    });
    sc.items.forEach((o) => {
      if ("n" in o) {
        const [x, y, s, man, done, below] = o.n;
        const r = el(svg, "rect", { ...ns, class: "node", x: x - 5, y: y - 5, width: 10, height: 10, stroke: done ? BLUE : man ? MUTED : ink, "stroke-width": 1, fill: done ? BLUE : bg });
        nodes.push({ x, y, r });
        if (s) label(x, below ? y + 24 : y - 14, s, done ? ink : MUTED);
      } else if ("box" in o) {
        const [x, y, w, h, s, hi] = o.box;
        el(svg, "rect", { ...ns, x, y, width: w, height: h, stroke: hi ? BLUE : ink, "stroke-width": 1, fill: bg });
        if (hi) el(svg, "rect", { x: x + w - 7, y, width: 7, height: 7, fill: BLUE });
        label(x + w / 2, y + h / 2 + 4, s, hi ? (night ? "#F7F7F5" : BLUE) : ink);
      } else if ("t" in o) {
        label(o.t[0], o.t[1], o.t[2], MUTED, o.t[3] || "middle");
      }
    });

    // Keep labels near 11px on screen whatever the drawing's size.
    const fit = () => {
      const w = svg.getBoundingClientRect().width;
      if (w) svg.style.fontSize = Math.max(6, Math.min(W / 36, 11 / (w / W))) + "px";
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(svg);
    if (prefersReducedMotion()) return () => ro.disconnect();

    const layer = el(svg, "g", {});
    let offset = 0;
    const runners = paths.map((p) => {
      const len = p.el.getTotalLength(), dur = (len / (p.manual ? 55 : 160)) * 1000;
      const sq = [1, 0.45, 0.2].map(() => el(layer, "rect", { width: 7, height: 7, x: -3.5, y: -3.5, fill: p.manual ? MUTED : BLUE, opacity: 0 }));
      const r = { p: p.el, len, dur, start: p.manual ? 0 : offset, sq, base: [1, 0.45, 0.2], manual: p.manual };
      if (!p.manual) offset += dur * 0.55;
      return r;
    });
    const mainCycle = Math.max(1, ...runners.filter((r) => !r.manual).map((r) => r.start + r.dur)) + 900;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const hits = new Map<(typeof nodes)[number], number>();
    const flow: Flow = {
      svg,
      tick: (now) => {
        runners.forEach((r) => {
          const t = now % (r.manual ? r.dur + 900 : mainCycle);
          const k = (t - r.start) / r.dur, live = k >= 0 && k <= 1;
          const fade = live ? Math.min(1, k * 8, (1 - k) * 8) : 0;
          r.sq.forEach((q, i) => {
            const kk = Math.max(0, ease(Math.min(1, Math.max(0, k))) - i * 0.025);
            const pt = r.p.getPointAtLength(kk * r.len);
            q.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
            q.setAttribute("opacity", (r.base[i] * fade).toFixed(3));
            if (i === 0 && live && !r.manual) nodes.forEach((n) => { if (Math.abs(n.x - pt.x) < 6 && Math.abs(n.y - pt.y) < 6) hits.set(n, now); });
          });
        });
        nodes.forEach((n) => n.r.classList.toggle("hit", now - (hits.get(n) ?? -1e9) < 520));
      },
    };
    flows.add(flow);
    observe(svg);
    if (!raf) raf = requestAnimationFrame(loop);
    return () => {
      ro.disconnect();
      flows.delete(flow);
      visible.delete(svg);
      io?.unobserve(svg);
    };
  }, [sc, W, H, tone, grid]);

  return (
    <svg ref={ref} className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })} />
  );
}
