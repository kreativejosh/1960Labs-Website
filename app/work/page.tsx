import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { Rise } from "@/components/Rise";
import { WorkList } from "@/components/WorkList";
import { PROJECTS, WORK_INTRO } from "@/lib/content";
import { pageMeta, workLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Work",
  description:
    "Live systems from 1960 Labs: CreditHub, embedded credit infrastructure for platforms and lenders; 1960 Network, network quality monitoring for telecoms regulators; and infrastructure monitoring for an energy company in Gabon.",
  path: "/work",
});

export default function Work() {
  return (
    <>
      <JsonLd data={workLd()} />
      <section className="page-hero gut" aria-labelledby="ph">
        <div className="inner">
          <span className="eyebrow">Our work</span>
          <Rise as="h1" id="ph" className="d-1" text={WORK_INTRO.title} />
        </div>
      </section>

      <WorkList projects={PROJECTS} />

      <CtaSection />
    </>
  );
}
