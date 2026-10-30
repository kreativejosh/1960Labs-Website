"use client";
import { useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy");
  const addr = useRef<HTMLSpanElement>(null);
  const reset = () => setTimeout(() => setLabel("Copy"), 1600);
  const select = () => {
    if (!addr.current) return;
    const r = document.createRange();
    r.selectNodeContents(addr.current);
    const s = window.getSelection();
    s?.removeAllRanges(); s?.addRange(r);
    setLabel("Selected"); reset();
  };
  const copy = () => {
    try { navigator.clipboard.writeText(email).then(() => { setLabel("Copied"); reset(); }, select); }
    catch { select(); }
  };
  return (
    <div className="f-mail">
      <span className="addr" ref={addr}>{email}</span>
      <button className="copy" type="button" onClick={copy}>{label}</button>
    </div>
  );
}
