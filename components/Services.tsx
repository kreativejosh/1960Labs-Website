import { Icon } from "./Icon";
import { Rise } from "./Rise";
import { SERVICES, SERVICES_INTRO } from "@/lib/content";

export function Services() {
  return (
    <section className="sec gut" id="services" aria-labelledby="svc-h" style={{ paddingTop: 0 }}>
      <div className="inner">
        <span className="eyebrow">Right-sized technology</span>
        <div className="split" style={{ marginTop: 22 }}>
          <Rise id="svc-h" className="d-2" text={SERVICES_INTRO.title} />
          <p className="kicker" style={{ paddingTop: 6 }}>{SERVICES_INTRO.subhead}</p>
        </div>
        <div className="ladder">
          {SERVICES.map((s, i) => (
            <div className="rung" key={s.name}>
              <span className="ico"><Icon name={s.icon} /></span>
              <span className="k">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
