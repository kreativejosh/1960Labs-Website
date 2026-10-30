import { NextResponse } from "next/server";
import { validate, type Booking } from "@/lib/diagnostic";

/**
 * Receives "Book a diagnostic" requests and emails them through Resend.
 * Needs RESEND_API_KEY, DIAGNOSTIC_TO and DIAGNOSTIC_FROM. Without them it answers 503
 * and the form shows the email fallback, so nothing is silently lost.
 */
export async function POST(req: Request) {
  let body: Partial<Booking>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validate(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "invalid", errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY, to = process.env.DIAGNOSTIC_TO, from = process.env.DIAGNOSTIC_FROM;
  if (!key || !to || !from) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const clip = (s: unknown, n = 2000) => String(s ?? "").slice(0, n);
  const lines = [
    `Name: ${clip(body.name, 200)}`,
    `Email: ${clip(body.email, 200)}`,
    `Company: ${clip(body.company, 200)}`,
    `Role: ${clip(body.role, 200) || "-"}`,
    `Sector: ${clip(body.sector, 50) || "-"}`,
    `Tried: ${(body.tried ?? []).map((t) => clip(t, 60)).join(", ") || "-"}`,
    "",
    "Process to fix:",
    clip(body.process),
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [to], reply_to: clip(body.email, 200),
      subject: `Diagnostic request: ${clip(body.company, 120)}`,
      text: lines.join("\n"),
    }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
