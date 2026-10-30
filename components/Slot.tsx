"use client";
import { useRef, type ReactNode } from "react";
import { prefersReducedMotion, useInViewOnce } from "@/lib/useInView";

/** Opens its contents from a narrow slot when scrolled into view (brand motion pattern 3). */
export function Slot({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref, "0px 0px -10% 0px");
  const go = seen && !prefersReducedMotion();
  return <div ref={ref} className={`${className}${go ? " slot-go" : ""}`}>{children}</div>;
}
