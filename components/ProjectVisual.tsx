import { NetworkDash } from "./NetworkDash";
import { Schematic } from "./Schematic";

/** The one drawing that stands for each project, on the homepage carousel, the work list and the work panel. */
export function ProjectVisual({ id }: { id: string }) {
  switch (id) {
    case "credithub":
      return <Schematic kind="credithub" tone="night" label="Merchants apply through the platform they already use; the platform connects to CreditHub, and CreditHub connects to several lenders" />;
    case "network":
      return <NetworkDash label="Example 1960 Network dashboard comparing three operators" />;
    case "energy":
      return <Schematic kind="energy" tone="night" label="Readings from a plant, a pipeline and a substation feed one monitoring system, which shows a live view and raises alerts in place of site visits" />;
    default:
      return null;
  }
}
