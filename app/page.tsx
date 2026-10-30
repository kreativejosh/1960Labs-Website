import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/Icon";
import { Intro } from "@/components/Intro";
import { JsonLd } from "@/components/JsonLd";
import { MethodPlayer } from "@/components/MethodPlayer";
import { Rise } from "@/components/Rise";
import { Schematic } from "@/components/Schematic";
import { SectorAccordion } from "@/components/SectorAccordion";
import { Services } from "@/components/Services";
import { Slot } from "@/components/Slot";
import { VIGNETTES } from "@/components/Vignettes";
import { WorkCarousel } from "@/components/WorkCarousel";
import { ABOUT, HERO, PROJECTS, SECTORS, STEPS, WORK_INTRO } from "@/lib/content";
import { homeLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({ description: SITE.description, path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={homeLd()} />
      <Intro />

      {/* 01 Hero */}
      <section className="hero gut" aria-labelledby="hero-h">
        <div className="wrap">
          <Rise as="h1" id="hero-h" className="d-hero" text={HERO.title} stop />
          <div className="hero-foot">
            <p className="kicker">{HERO.subhead}</p>
            <div className="hero-side">
              <p>{HERO.body}</p>
              <div className="btns">
                <Link className="btn btn-primary" href="/diagnostic"><span>Book a diagnostic</span><Icon name="arrow-right" /></Link>
                <a className="btn btn-secondary" href="#work">See our work</a>
              </div>
            </div>
          </div>
          <div className="rule" />
          <div className="tiles4">
            {SECTORS.map((s, i) => (
              <a key={s.id} className="tile" href={`#sector-${s.id}`}>
                <span className="tile-k">{s.name}</span>
                <span className="tile-n">0{i + 1}</span>
                <Schematic kind={s.schematic} tone="night" />
                <span className="tile-d">{s.tile}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 02 What we are */}
      <section className="sec gut" id="about" aria-labelledby="about-h">
        <div className="inner sec-head center">
          <span className="eyebrow">What we are</span>
          <Rise id="about-h" className="d-2" text={ABOUT.title} />
          <p className="sub">{ABOUT.subhead}</p>
        </div>
        <div className="wrap">
          <div className="band">
            <Slot className="win">
              <div className="win-bar"><i /><i /><span>1960labs / diagnostics / order-intake</span><b>fig. 01 · example</b></div>
              <div className="win-scroll">
                <Schematic kind="diagnose" tone="paper"
                  label="Example process map: an order moves from request to done, with two manual workarounds, a spreadsheet and re-keying by hand, that a diagnostic would find and remove" />
              </div>
            </Slot>
          </div>
          <div className="inner below-band">
            <span className="mono">How we start</span>
            <p className="lead">{ABOUT.body}</p>
          </div>
        </div>
      </section>

      {/* 03 How we work */}
      <section className="sec gut" id="how" aria-labelledby="how-h" style={{ paddingTop: 0 }}>
        <div className="inner">
          <div className="sec-head center">
            <span className="eyebrow">How we work</span>
            <Rise id="how-h" className="d-2" text={STEPS.map((s) => `${s.title}.`).join(" ")} />
          </div>
          <MethodPlayer steps={STEPS} panels={VIGNETTES} />
        </div>
      </section>

      {/* 04 Right-sized technology */}
      <Services />

      {/* 05 Sectors */}
      <section className="sec gut" id="sectors" aria-labelledby="sec-h" style={{ paddingTop: 0 }}>
        <div className="inner">
          <h2 className="inline-head" id="sec-h"><span className="eyebrow">Sectors</span>Built inside high-stakes operations.</h2>
          <SectorAccordion sectors={SECTORS} />
        </div>
      </section>

      {/* 06 Our work */}
      <WorkCarousel title={WORK_INTRO.title} projects={PROJECTS} />

      {/* 07 Closing call to action */}
      <CtaSection />
    </>
  );
}
