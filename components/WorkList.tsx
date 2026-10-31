"use client";
import { useEffect } from "react";
import { Icon } from "./Icon";
import { ProjectVisual } from "./ProjectVisual";
import { useWorkPanel } from "./WorkPanel";
import type { Project } from "@/lib/content";

/** Work page: one row per project; "View work" opens the case summary panel. /work#<id> opens it directly. */
export function WorkList({ projects }: { projects: readonly Project[] }) {
  const { show, panel } = useWorkPanel(projects);

  useEffect(() => {
    const i = projects.findIndex((p) => `#${p.id}` === window.location.hash);
    if (i >= 0) show(i);
  }, []); // once, on load

  return (
    <div className="rows gut">
      <div className="wrap" style={{ display: "grid", gap: "clamp(16px,2.5vw,40px)" }}>
        {projects.map((p, i) => (
          <section key={p.id} className={`row${i % 2 ? " rev" : ""}`} id={p.id} aria-labelledby={`w-${p.id}`}>
            <div className="row-vis"><span className="tag">fig. {String(i + 1).padStart(2, "0")} · {p.sector}</span><ProjectVisual id={p.id} /></div>
            <div className="row-txt">
              <span className="k">{String(i + 1).padStart(2, "0")} · {p.sector}</span>
              <h2 className="d-3" id={`w-${p.id}`}>{p.name}. {p.headline}</h2>
              <p className="plain">{p.summary}</p>
              <dl className="facts">
                <div><dt>Sector</dt><dd>{p.sector}</dd></div>
                <div><dt>Delivered as</dt><dd>{p.deliveredAs}</dd></div>
              </dl>
              <button type="button" className="btn btn-primary" onClick={() => show(i)} aria-haspopup="dialog">
                <span>View work</span><Icon name="arrow-right" />
              </button>
            </div>
          </section>
        ))}
      </div>
      {panel}
    </div>
  );
}
