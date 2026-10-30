"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type Sector = { id: string; name: string; body: string };

/** Sectors: one row open at a time. Links to #sector-<id> (the hero tiles) open their row. */
export function SectorAccordion({ sectors }: { sectors: readonly Sector[] }) {
  const [open, setOpen] = useState<string | null>(sectors[0]?.id ?? null);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#sector-", "");
      if (window.location.hash.startsWith("#sector-") && sectors.some((s) => s.id === id)) setOpen(id);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#sector-"], a[href^="/#sector-"]');
      if (a) setOpen(a.getAttribute("href")!.split("#sector-")[1]);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("hashchange", fromHash); document.removeEventListener("click", onClick); };
  }, [sectors]);

  return (
    <div className="acc">
      {sectors.map((s) => {
        const on = open === s.id;
        return (
          <div key={s.id} className={`acc-item${on ? " open" : ""}`} id={`sector-${s.id}`}>
            <h3>
              <button className="acc-btn" type="button" aria-expanded={on} aria-controls={`ap-${s.id}`}
                onClick={() => setOpen(on ? null : s.id)}>
                <span className="acc-name">{s.name}</span>
                <span className="acc-ic"><Icon name="plus" /></span>
              </button>
            </h3>
            {/* Text stays in the HTML when closed, so search engines and AI crawlers read every sector. */}
            <div className="acc-panel" id={`ap-${s.id}`} role="region" aria-label={s.name}>
              <div><div className="acc-in"><p>{s.body}</p></div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
