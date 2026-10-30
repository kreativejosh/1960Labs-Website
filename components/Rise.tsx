"use client";
import { createElement, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/useInView";

type Props = { as?: "h1" | "h2"; text: string; stop?: boolean; className?: string; id?: string };

/**
 * Headline that rises word by word (brand motion pattern 2).
 * Words render server-side and stay readable before any animation runs.
 */
export function Rise({ as = "h2", text, stop = false, className = "", id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const introRunning = document.documentElement.classList.contains("intro-on");
    if (el.getBoundingClientRect().top < window.innerHeight) {
      const t = setTimeout(() => setGo(true), introRunning ? 1500 : 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setGo(true); io.disconnect(); }
    }, { rootMargin: "0px 0px 8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  const children = words.flatMap((w, i) => [
    <span className="w" key={i} style={{ ["--i" as string]: i }}>{w}</span>,
    i < words.length - 1 ? " " : null,
  ]);
  if (stop) {
    children.push(<span className="stop" aria-hidden="true" key="stop" />, <span className="sr" key="sr">.</span>);
  }
  return createElement(as, { ref, id, className: `${className}${go ? " rise-go" : ""}` }, children);
}
