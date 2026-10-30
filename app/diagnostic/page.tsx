import { BookForm } from "@/components/BookForm";
import { JsonLd } from "@/components/JsonLd";
import { Rise } from "@/components/Rise";
import { CTA } from "@/lib/content";
import { breadcrumb, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Book a diagnostic",
  description: "Book a 30-minute diagnostic with 1960 Labs. We'll tell you plainly whether custom software, automation or AI is the right fix, or whether none of them is.",
  path: "/diagnostic",
});

const EXPECT = [
  ["Thirty minutes", "A call with the people who would do the work."],
  ["One process", "Bring the work that slows you down most. We'll ask where it slows down, where it breaks and what it costs you."],
  ["A plain answer", "Custom software, automation, AI, or none of them."],
];

export default function Diagnostic() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          breadcrumb([["Book a diagnostic", "/diagnostic"]]),
          { "@type": "ContactPage", name: "Book a diagnostic", url: `${SITE.url}/diagnostic`, about: { "@id": `${SITE.url}/#organization` } },
        ],
      }} />
      <div className="gut">
        <div className="inner book">
          <div className="book-l">
            <span className="eyebrow">Book a diagnostic</span>
            <Rise as="h1" className="d-1" text="Book a diagnostic." />
            <p className="lead">{CTA.body}</p>
            <ol className="expect">
              {EXPECT.map(([b, t], i) => (
                <li key={b}><span className="k">0{i + 1}</span><span><b>{b}</b><span>{t}</span></span></li>
              ))}
            </ol>
            <p className="muted" style={{ fontSize: 15 }}>Prefer email? Write to <span className="mono" style={{ color: "var(--ink)", userSelect: "all" }}>{SITE.email}</span></p>
          </div>
          <div><BookForm /></div>
        </div>
      </div>
    </>
  );
}
