"use client";
import { useState } from "react";

// Example readings in dBm, clearly labelled as example data on the page.
const NET = { voice: [-71, -84, -97], data: [-78, -92, -104], sms: [-69, -80, -93] } as const;
type K = keyof typeof NET;

export function NetworkDash({ label = "Example 1960 Network dashboard" }: { label?: string }) {
  const [k, setK] = useState<K>("voice");
  return (
    <div className="dash" role="group" aria-label={label}>
      <div className="ui-h"><span>Signal by operator</span><span className="mono">Example data</span></div>
      <div className="dash-tabs">
        {(Object.keys(NET) as K[]).map((key) => (
          <button key={key} type="button" aria-pressed={k === key} onClick={() => setK(key)}>{key === "sms" ? "SMS" : key[0].toUpperCase() + key.slice(1)}</button>
        ))}
      </div>
      {NET[k].map((v, i) => (
        <div key={i} className={`dash-row${v <= -100 ? " low" : ""}`}>
          <span className="op">Operator {"ABC"[i]}</span>
          <span className="track"><span className="fill" style={{ width: `${Math.round(((v + 120) / 70) * 100)}%` }} /></span>
          <span className="v">{v} dBm</span>
        </div>
      ))}
    </div>
  );
}

// A fixed 12 x 6 example coverage grid; one weak spot flagged.
const HEAT = [9,8,8,7,9,8,6,7,8,9,8,7, 8,7,6,6,7,5,4,6,7,8,7,6, 7,6,5,4,3,2,3,5,6,7,6,5, 8,6,5,4,3,3,4,5,6,6,5,4, 9,7,6,5,5,4,5,6,7,7,6,5, 9,8,7,7,6,6,7,7,8,8,7,6];
export function Heat() {
  return (
    <div className="heat">
      {HEAT.map((n, i) => <i key={i} className={i === 29 ? "flag" : undefined} style={i === 29 ? undefined : { opacity: n / 10 }} />)}
    </div>
  );
}
