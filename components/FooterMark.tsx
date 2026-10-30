"use client";
import { useRef } from "react";
import { Logo } from "./Logo";
import { prefersReducedMotion, useInViewOnce } from "@/lib/useInView";

/** The full-width lockup at the foot of every page; the mark builds once when it scrolls in. */
export function FooterMark() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref, "0px 0px -5% 0px");
  return (
    <div ref={ref} className={`f-mark${seen && !prefersReducedMotion() ? " go" : ""}`} aria-hidden="true">
      <Logo fill="#F7F7F5" stop="#F7F7F5" stopOpacity={0.6} viewBox="12 12 257 48" />
    </div>
  );
}
