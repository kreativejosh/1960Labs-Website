import { Schematic } from "./Schematic";

/* Example UI cards shown for each How we work step. Illustrations, labelled as examples. */

function Diagnose() {
  return (
    <div className="ui" role="img" aria-label="Example process map listing the hidden manual steps in order intake">
      <div className="ui-h"><span>Order intake, as it really runs</span><span className="mono">Example</span></div>
      <div className="ui-row"><span>Orders arrive by email</span><span className="chip-t warn"><i />Manual</span></div>
      <div className="ui-row"><span>Copied into orders_v7_final.xlsx</span><span className="chip-t warn"><i />Workaround</span></div>
      <div className="ui-row"><span>Re-keyed into the ERP</span><span className="chip-t warn"><i />Manual</span></div>
      <div className="ui-row"><span>Approved over the phone</span><span className="chip-t bad"><i />Not documented</span></div>
      <div className="ui-foot">4 handoffs found · 2 not in the manual</div>
    </div>
  );
}

function Redesign() {
  return (
    <div className="ui" role="img" aria-label="Drawing of a seven-step manual process redesigned into three steps">
      <div className="ui-h"><span>Redesign before automation</span><span className="mono">fig. 02</span></div>
      <Schematic kind="redesign" tone="paper" />
    </div>
  );
}

function Build() {
  return (
    <div className="ui" role="img" aria-label="The build is chosen from custom software, automation or AI and fitted to your systems, data and rules">
      <div className="ui-h"><span>What we build</span><span className="mono">Chosen by the problem</span></div>
      <div className="seg"><span>Software</span><span className="on">Automation</span><span>AI</span></div>
      <Schematic kind="build" tone="paper" grid={false} />
    </div>
  );
}

function Run() {
  return (
    <div className="ui" role="img" aria-label="Example production log for a live system we support">
      <div className="ui-h"><span>Order intake · production</span><span className="chip-t ok"><i />Running</span></div>
      <div className="ui-row"><span>Release 1.4 deployed</span><span className="mono">Mon 09:12</span></div>
      <div className="ui-row"><span>New approval rule added for the finance team</span><span className="mono">Tue 14:40</span></div>
      <div className="ui-row"><span>Supplier changed invoice format, parser updated</span><span className="mono">Thu 11:05</span></div>
      <div className="ui-row"><span>Monthly review with operations</span><span className="chip-t blue"><i />Next</span></div>
      <div className="ui-foot">Same team from first workshop to live system</div>
    </div>
  );
}

const MEASURES: [string, number][] = [["Hours", 34], ["Cost", 52], ["Error rate", 18], ["Cycle time", 41]];

function Measure() {
  return (
    <div className="ui" role="img" aria-label="Baseline and current measures for hours, cost, error rate and cycle time">
      <div className="ui-h"><span>Measured against the baseline</span><span className="mono">Agreed before we start</span></div>
      {MEASURES.map(([label, now], i) => (
        <div className="meter" key={label}>
          <span className="lbl">{label}</span>
          <span className="bars">
            <i style={{ ["--i" as string]: i * 2 }} />
            <i className="now" style={{ ["--i" as string]: i * 2 + 1, width: `${now}%` }} />
          </span>
        </div>
      ))}
      <div className="ui-legend"><span><i />Baseline</span><span><i className="now" />Now</span><span>Illustration</span></div>
    </div>
  );
}

export const VIGNETTES = [<Diagnose key="d" />, <Redesign key="r" />, <Build key="b" />, <Run key="u" />, <Measure key="m" />];
