"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import { ProjectVisual } from "./ProjectVisual";
import type { Project } from "@/lib/content";

const Tbc = ({ v }: { v: string | null }) => (v ? <>{v}</> : <span className="tbc">To be confirmed</span>);

/** Open/close state for the work panel; remembers the button that opened it so focus can go back there. */
export function useWorkPanel(projects: readonly Project[]) {
  const [open, setOpen] = useState<number | null>(null);
  const from = useRef<HTMLElement | null>(null);
  const show = useCallback((i: number) => {
    if (open === null) from.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  }, [open]);
  const close = useCallback(() => {
    setOpen(null);
    from.current?.focus();
  }, []);
  const panel = open === null ? null : (
    <WorkPanel projects={projects} index={open} onClose={close} onGo={(i) => setOpen((i + projects.length) % projects.length)} />
  );
  return { show, panel };
}

/** Wide panel that slides in from the right with a project's case summary. */
function WorkPanel({ projects, index, onClose, onGo }: {
  projects: readonly Project[]; index: number; onClose: () => void; onGo: (i: number) => void;
}) {
  const p = projects[index];
  const box = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const f = box.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { html.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  // a new project scrolls back to the top of the panel
  useEffect(() => { box.current?.scrollTo({ top: 0 }); }, [index]);

  const next = projects[(index + 1) % projects.length];

  return createPortal(
    <div className="wp" role="presentation">
      <div className="wp-scrim" onClick={onClose} aria-hidden="true" />
      <div className="wp-box" ref={box} role="dialog" aria-modal="true" aria-labelledby="wp-h">
        <div className="wp-bar">
          <span className="mono">Case summary · {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <button ref={closeBtn} type="button" className="wp-x" onClick={onClose} aria-label="Close case summary"><Icon name="close" /></button>
        </div>

        <div className="wp-body" key={p.id}>
          <header className="wp-head">
            <span className="eyebrow">{p.sector}</span>
            <h2 id="wp-h" className="d-2">{p.name}</h2>
            <p className="wp-cat">{p.category}</p>
            <p className="wp-desc">{p.summary}</p>
          </header>

          <div className="wp-vis"><ProjectVisual id={p.id} /></div>

          <dl className="wp-meta">
            <div><dt>Client</dt><dd><Tbc v={p.client} /></dd></div>
            <div><dt>Year</dt><dd><Tbc v={p.year} /></dd></div>
            <div><dt>URL</dt><dd>{p.url
              ? <a href={p.url} target="_blank" rel="noopener noreferrer">{p.url.replace(/^https?:\/\//, "")} <Icon name="external" /></a>
              : <Tbc v={null} />}</dd></div>
            <div><dt>Delivered as</dt><dd>{p.deliveredAs}</dd></div>
          </dl>

          <div className="wp-story">
            <section><span className="k">01 · Problem</span><p>{p.problem}</p></section>
            <section><span className="k">02 · Solution</span><p>{p.solution}</p></section>
            <section><span className="k">03 · Impact</span><p><Tbc v={p.impact} /></p></section>
          </div>
        </div>

        {projects.length > 1 && (
          <div className="wp-foot">
            <button type="button" className="wp-next" onClick={() => onGo(index + 1)}>
              <span className="mono">Next project</span>
              <span className="n">{next.name}</span>
              <Icon name="arrow-right" />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
