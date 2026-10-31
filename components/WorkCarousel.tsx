"use client";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./Icon";
import { ProjectVisual } from "./ProjectVisual";
import { useWorkPanel } from "./WorkPanel";
import type { Project } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/useInView";

/** Our work band (Poetic's testimonial carousel): tabs, arrows, a visual and the giant project name. */
export function WorkCarousel({ title, projects }: { title: string; projects: readonly Project[] }) {
  const [cur, setCur] = useState(0);
  const [slot, setSlot] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { show: view, panel } = useWorkPanel(projects);
  const show = (i: number, focus = false) => {
    const n = (i + projects.length) % projects.length;
    setCur(n);
    if (!prefersReducedMotion()) setSlot((s) => s + 1);
    if (focus) tabs.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); show(cur + 1, true); }
    if (e.key === "ArrowLeft") { e.preventDefault(); show(cur - 1, true); }
  };

  return (
    <section className="wb gut" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="wb-top">
          <div className="wb-idx">
            <span className="n" aria-hidden="true">{String(cur + 1).padStart(2, "0")}</span>
            <h2 className="l" id="work-h" style={{ color: "inherit" }}>{title}</h2>
          </div>
          <div className="wb-tabs" role="tablist" aria-label="Projects">
            {projects.map((p, i) => (
              <button key={p.id} ref={(b) => { tabs.current[i] = b; }} role="tab" id={`wt-${i}`} aria-controls={`ws-${i}`}
                aria-selected={i === cur} tabIndex={i === cur ? 0 : -1} onClick={() => show(i)} onKeyDown={onKey}>{p.name}</button>
            ))}
          </div>
        </div>
        <div className="wb-grid">
          <div className="wb-slides">
            {projects.map((p, i) => (
              <article key={p.id} className={`wb-slide${i === cur ? " on" : ""}`} id={`ws-${i}`} role="tabpanel" aria-labelledby={`wt-${i}`}>
                <h3>{p.name}. {p.headline}</h3>
                <p>{p.summary}</p>
                <dl className="facts">
                  <div><dt>Sector</dt><dd>{p.sector}</dd></div>
                  <div><dt>Delivered as</dt><dd>{p.deliveredAs}</dd></div>
                </dl>
                <div>
                  <button type="button" className="btn btn-ghost-n btn-sm" onClick={() => view(i)} aria-haspopup="dialog"><span>View work</span><Icon name="arrow-right" /></button>
                </div>
              </article>
            ))}
          </div>
          <div className="wb-vis">
            {projects.map((p, i) => (
              <div key={`v${i}-${cur === i ? slot : "x"}`} className={cur === i ? `on${slot ? " slot-go" : ""}` : undefined}>
                <ProjectVisual id={p.id} />
              </div>
            ))}
          </div>
        </div>
        <div className="wb-ctrl">
          <div className="wb-arrows">
            <button type="button" aria-label="Previous project" onClick={() => show(cur - 1)}><Icon name="arrow-left" /></button>
            <button type="button" aria-label="Next project" onClick={() => show(cur + 1)}><Icon name="arrow-right" /></button>
          </div>
          <Link className="tlink" href="/work" style={{ color: "var(--on-night)" }}>All work <Icon name="arrow-right" /></Link>
        </div>
        <div className="wb-name" aria-hidden="true">
          {projects.map((p, i) => <span key={p.id} className={i === cur ? "on" : undefined}>{p.name}</span>)}
        </div>
      </div>
      {panel}
    </section>
  );
}
