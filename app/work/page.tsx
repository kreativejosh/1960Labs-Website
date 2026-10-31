import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { Heat, NetworkDash } from "@/components/NetworkDash";
import { Rise } from "@/components/Rise";
import { Schematic } from "@/components/Schematic";
import { PROJECTS, WORK_INTRO } from "@/lib/content";
import { pageMeta, workLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Work",
  description:
    "Live systems from 1960 Labs: CreditHub, embedded credit infrastructure for platforms and lenders, and 1960 Network, network quality monitoring for telecoms regulators.",
  path: "/work",
});

const [credithub, network] = PROJECTS;

function Facts({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <dl className="facts">
      <div><dt>Sector</dt><dd>{p.sector}</dd></div>
      <div><dt>Delivered as</dt><dd>{p.deliveredAs}</dd></div>
      <div><dt>Built for</dt><dd>{p.builtFor}</dd></div>
    </dl>
  );
}

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

      <article aria-labelledby="ch-h">
        <section className="sec gut" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="inner sec-head center" style={{ marginBottom: "clamp(32px,5vw,56px)" }}>
            <span className="eyebrow">{credithub.name}</span>
            <Rise id="ch-h" className="d-2" text={`${credithub.category}.`} />
          </div>
        </section>
        <div className="rows gut">
          <div className="wrap" style={{ display: "grid", gap: "clamp(16px,2.5vw,40px)" }}>
            <section className="row" id="credithub">
              <div className="row-vis"><span className="tag">fig. 01 · how it connects</span>
                <Schematic kind="credithub" tone="night" label="Merchants apply through the platform they already use; the platform connects to CreditHub, and CreditHub connects to several lenders" /></div>
              <div className="row-txt">
                <span className="k">/1 · {credithub.sector}</span>
                <h3 className="d-3">{credithub.headline}</h3>
                <p>CreditHub connects platform operators with lenders, so operators can offer their merchant customers access to finance without building a lending business of their own.</p>
              </div>
            </section>
            <section className="row rev">
              <div className="row-vis"><span className="tag">fig. 02 · two ways to launch</span>
                <Schematic kind="credithub-paths" tone="night" label="An operator can launch through the CreditHub SDK or build its own credit product on the CreditHub APIs" /></div>
              <div className="row-txt">
                <span className="k">/2 · SDK or APIs</span>
                <h3 className="d-3">Launch fast, or build your own.</h3>
                <p>Operators can integrate the CreditHub SDK to launch quickly, or use the CreditHub APIs to build their own credit product.</p>
                <Facts p={credithub} />
              </div>
            </section>
          </div>
        </div>
      </article>

      <article aria-labelledby="nw-h">
        <section className="sec gut" style={{ paddingBottom: 0 }}>
          <div className="inner sec-head center" style={{ marginBottom: "clamp(32px,5vw,56px)" }}>
            <span className="eyebrow">{network.name}</span>
            <Rise id="nw-h" className="d-2" text={`${network.category}.`} />
          </div>
        </section>
        <div className="rows gut">
          <div className="wrap" style={{ display: "grid", gap: "clamp(16px,2.5vw,40px)" }}>
            <section className="row" id="network">
              <div className="row-vis"><span className="tag">fig. 03 · what it measures</span>
                <Schematic kind="network" tone="night" label="A network analysis device measures each operator and sends the results to the 1960 Network dashboard" /></div>
              <div className="row-txt">
                <span className="k">/1 · {network.sector}</span>
                <h3 className="d-3">{network.headline}</h3>
                <p>1960 Network is the dashboard for a network analysis device that measures the signal strength of each telecoms operator across services such as voice, data and SMS.</p>
              </div>
            </section>
            <section className="row rev">
              <div className="row-vis">
                <span className="tag">fig. 04 · compare and find weak spots</span>
                <div style={{ display: "grid", gap: 12, width: "100%" }}>
                  <NetworkDash label="Example 1960 Network dashboard comparing three operators" />
                  <div className="dash" role="img" aria-label="Example coverage grid with one weak spot outlined">
                    <div className="ui-h"><span>Coverage by area</span><span className="mono">1 weak spot</span></div>
                    <Heat />
                  </div>
                </div>
              </div>
              <div className="row-txt">
                <span className="k">/2 · Evidence for oversight</span>
                <h3 className="d-3">Compare operators side by side.</h3>
                <p>With it, regulators can compare operators side by side, find weak spots and base their oversight on evidence.</p>
                <Facts p={network} />
              </div>
            </section>
          </div>
        </div>
      </article>

      <CtaSection />
    </>
  );
}
