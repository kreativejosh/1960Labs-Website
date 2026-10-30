"use client";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { SECTOR_OPTIONS, TRIED_OPTIONS, validate, type Booking } from "@/lib/diagnostic";
import { SITE } from "@/lib/site";

type Field = "name" | "email" | "company" | "process";
const HINTS: Record<Field | "role", string> = {
  name: "First and last name.",
  email: "We reply within one working day.",
  company: "Where you work.",
  role: "Optional.",
  process: "Describe the process in a sentence or two. Name it the way your team does.",
};

export function BookForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [firstName, setFirstName] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);

  const read = (): Booking => {
    const f = new FormData(form.current!);
    return {
      name: String(f.get("name") ?? ""), email: String(f.get("email") ?? ""), company: String(f.get("company") ?? ""),
      role: String(f.get("role") ?? ""), sector: String(f.get("sector") ?? ""), process: String(f.get("process") ?? ""),
      tried: f.getAll("tried").map(String), website: String(f.get("website") ?? ""),
    };
  };

  const onBlur = (field: Field) => {
    const b = read();
    if (!b[field]) return;
    setErrors((e) => ({ ...e, [field]: validate(b)[field] }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const b = read();
    const errs = validate(b);
    setErrors(errs);
    const first = (Object.keys(errs) as Field[])[0];
    if (first) { form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    setState("sending");
    setFirstName(b.name.trim().split(" ")[0]);
    let ok = false;
    try {
      const res = await fetch("/api/diagnostic", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) });
      ok = res.ok;
    } catch {}
    setState(ok ? "sent" : "fallback");
    setTimeout(() => done.current?.focus(), 0);
  };

  if (state === "sent" || state === "fallback") {
    return (
      <div className="done" ref={done} tabIndex={-1}>
        <span className="eyebrow">{state === "sent" ? "Request received" : "Almost there"}</span>
        <h2 className="d-3">Thanks, {firstName}.</h2>
        {state === "sent"
          ? <p>We have your request and will reply within one working day to arrange your 30-minute diagnostic.</p>
          : <p>We couldn&apos;t send the form just now. Please email the same details to {SITE.email} and we&apos;ll reply within one working day.</p>}
        <div><button className="btn btn-ghost-n btn-sm" type="button" onClick={() => { setState("idle"); setErrors({}); }}><span>Start again</span></button></div>
      </div>
    );
  }

  const field = (name: Field | "role", label: string, type: string, auto: string, required = true) => {
    const err = name !== "role" ? errors[name] : undefined;
    return (
      <div className={`field${err ? " err" : ""}`}>
        <label htmlFor={`f-${name}`}>{label}</label>
        <input id={`f-${name}`} name={name} type={type} autoComplete={auto} required={required} aria-invalid={!!err}
          aria-describedby={`h-${name}`} onBlur={name !== "role" ? () => onBlur(name) : undefined} />
        <span className="hint" id={`h-${name}`}>{err || HINTS[name]}</span>
      </div>
    );
  };

  return (
    <form className="form" ref={form} noValidate onSubmit={submit} aria-label="Book a diagnostic">
      <div className="two">{field("name", "Your name", "text", "name")}{field("email", "Work email", "email", "email")}</div>
      <div className="two">{field("company", "Company", "text", "organization")}{field("role", "Your role", "text", "organization-title", false)}</div>
      <fieldset className="field">
        <legend>Sector</legend>
        <div className="opts">
          {SECTOR_OPTIONS.map((s) => <label key={s}><input type="radio" name="sector" value={s} /><span>{s}</span></label>)}
        </div>
      </fieldset>
      <div className={`field${errors.process ? " err" : ""}`}>
        <label htmlFor="f-process">Process to fix</label>
        <textarea id="f-process" name="process" required aria-invalid={!!errors.process} aria-describedby="h-process" onBlur={() => onBlur("process")}
          placeholder="Example: Month-end reconciliation takes four people a week, mostly copying between the bank feed and our ledger." />
        <span className="hint" id="h-process">{errors.process || HINTS.process}</span>
      </div>
      <fieldset className="field">
        <legend>What have you tried?</legend>
        <div className="opts">
          {TRIED_OPTIONS.map((t) => <label key={t}><input type="checkbox" name="tried" value={t} /><span>{t}</span></label>)}
        </div>
      </fieldset>
      <div style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="f-website">Leave this empty</label><input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <p className="note">We use these details only to prepare for your diagnostic.</p>
        <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
          <span>{state === "sending" ? "Sending…" : "Book a diagnostic"}</span>{state !== "sending" && <Icon name="arrow-right" />}
        </button>
      </div>
    </form>
  );
}
