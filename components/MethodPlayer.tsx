"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { prefersReducedMotion } from "@/lib/useInView";

type Step = { key: string; title: string; cap: string; body: string };
const DUR = 6500;

/** How we work: five steps as tabs that advance on their own while in view, paused on hover or focus. */
export function MethodPlayer({ steps, panels }: { steps: readonly Step[]; panels: ReactNode[] }) {
  const [cur, setCur] = useState(0);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [reduce, setReduce] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const show = useCallback((i: number, focus = false) => {
    const n = (i + steps.length) % steps.length;
    setCur(n); setCycle((c) => c + 1);
    if (focus) tabs.current[n]?.focus();
  }, [steps.length]);

  useEffect(() => setReduce(prefersReducedMotion()), []);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => setInView(es[0].isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduce || !inView || hold) return;
    const t = setTimeout(() => show(cur + 1), DUR);
    return () => clearTimeout(t);
  }, [cur, cycle, inView, hold, reduce, show]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); show(cur + 1, true); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); show(cur - 1, true); }
  };
  const paused = hold || !inView;

  return (
    <div ref={root} className={`method${paused ? " paused" : ""}${reduce ? " static" : ""}`}
      style={{ ["--m-dur" as string]: `${DUR}ms` }}
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false); }}>
      <ol className="m-list" role="tablist" aria-label="Our five steps" aria-orientation="vertical">
        {steps.map((s, i) => (
          <li key={s.key}>
            <button ref={(b) => { tabs.current[i] = b; }} className="m-tab" role="tab" id={`mt-${i}`} aria-controls={`ms-${i}`}
              aria-selected={i === cur} tabIndex={i === cur ? 0 : -1} onClick={() => show(i)} onKeyDown={onKey}>
              <span className="k">/{i + 1}</span>
              <span className="t">{s.title}.</span>
              <span className="d"><span>{s.body}</span></span>
            </button>
            <span className="m-prog" key={i === cur ? `p${cycle}` : "p"} />
          </li>
        ))}
      </ol>
      <div className="m-stage">
        <span className="corner" />
        {steps.map((s, i) => (
          <div key={s.key} className={`m-slide${i === cur ? " on" : ""}`} id={`ms-${i}`} role="tabpanel" aria-labelledby={`mt-${i}`}>
            <div className="m-cap"><span>/{i + 1} {s.title}</span><span>{s.cap}</span></div>
            <div className="m-body">{panels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
