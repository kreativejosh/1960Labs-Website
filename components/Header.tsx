"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    const mq = window.matchMedia("(min-width: 901px)");
    const onMq = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => { window.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`hdr gut${scrolled ? " scrolled" : ""}`}>
        <div className="wrap bar">
          <Link className="logo" href="/" aria-label={`${SITE.name} home`}><Logo /></Link>
          <nav aria-label="Main">
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={pathname === n.href ? "page" : undefined}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="acts">
            <Link className="btn btn-primary btn-sm" href="/diagnostic"><span>Book a diagnostic</span></Link>
            <button ref={btn} className="btn btn-secondary btn-sm menu-btn" type="button" aria-expanded={open}
              aria-controls="sheet" onClick={() => setOpen((o) => !o)}>
              <span>{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>
      <div className="sheet gut" id="sheet" hidden={!open} onClick={(e) => { if ((e.target as Element).closest("a")) setOpen(false); }}>
        <ul>
          {[{ href: "/", label: "Home" }, ...NAV].map((n, i) => (
            <li key={n.href} style={{ ["--i" as string]: i }}>
              <Link href={n.href}>{n.label}<span className="n">0{i + 1}</span></Link>
            </li>
          ))}
        </ul>
        <div className="sheet-foot">
          <Link className="btn btn-primary" href="/diagnostic"><span>Book a diagnostic</span><Icon name="arrow-right" /></Link>
          <span className="mono">{SITE.email}</span>
        </div>
      </div>
    </>
  );
}
