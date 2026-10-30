import Link from "next/link";
import { Icon } from "./Icon";
import { Rise } from "./Rise";
import { CTA } from "@/lib/content";

export function CtaSection() {
  return (
    <section className="cta gut" aria-labelledby="cta-h">
      <div className="inner">
        <span className="eyebrow">Book a diagnostic</span>
        <Rise id="cta-h" className="d-1" text={CTA.title} stop />
        <p>{CTA.body}</p>
        <Link className="btn btn-primary" href="/diagnostic"><span>Book a diagnostic</span><Icon name="arrow-right" /></Link>
      </div>
    </section>
  );
}
