/* All site copy in one place. Wording follows the 1960 Labs landing page copy doc. */

export const HERO = {
  title: "Complex work, engineered to run itself",
  subhead:
    "We find the work that slows your business down and fix it with custom software, automation or AI, whichever your business is ready for.",
  body: "1960 Labs is the custom solutions partner for finance, telecoms, logistics, marketing and energy teams whose processes don't fit off-the-shelf tools.",
};

export const ABOUT = {
  title: "A lab, not an agency.",
  subhead: "We diagnose before we build, and we stay after we ship.",
  body: "Most firms start from a tool or a template. We start from your process: where it slows down, where it breaks and what it costs you. Then we build the right thing and run it with you until the numbers move.",
};

export const STEPS = [
  { key: "diagnose", title: "Diagnose", cap: "Process map", body: "We map the process as it really runs, including the spreadsheets, handoffs and workarounds that never made it into the manual." },
  { key: "redesign", title: "Redesign", cap: "Fewer steps", body: "We fix the workflow before we automate it. Automating a broken process only gets you broken results faster." },
  { key: "build", title: "Build", cap: "Fitted to you", body: "Custom software, automation or AI, fitted to your systems, your data and your rules." },
  { key: "run", title: "Run", cap: "In production", body: "One team from first workshop to live system, so nothing gets lost in a handover. We support it in production and adapt it as your business changes." },
  { key: "measure", title: "Measure", cap: "Against the baseline", body: "We agree on a baseline before we start: hours, cost, error rate, cycle time. Then we report against it." },
] as const;

export const SERVICES_INTRO = {
  title: "Software, automation or AI. The problem decides.",
  subhead: "Not every business is ready for AI, and not every problem needs it. We meet you where you are and grow with you.",
};

export const SERVICES = [
  { name: "Consultancy", icon: "search", body: "For when you know something's wrong but not what to fix first." },
  { name: "Custom software", icon: "code", body: "For when your process is your edge and no product on the market fits it." },
  { name: "Automation", icon: "automate", body: "For when skilled people spend their day copying data between systems." },
  { name: "AI-powered solutions", icon: "model", body: "For when the data and the process are ready and the judgement calls repeat at volume. We keep a human in the loop where the stakes call for it." },
] as const;

export const SECTORS = [
  {
    id: "finance", name: "Finance", schematic: "t-finance",
    tile: "Automating financial operations for banks and financial institutions",
    body: "We build software that automates financial operations for banks, microfinance institutions and private and public financial institutions. We take complex, manual processes and turn them into workflows that run faster, with fewer errors and a full audit trail.",
  },
  {
    id: "telecoms", name: "Telecoms", schematic: "t-telecoms",
    tile: "Automating network, regulatory and customer operations",
    body: "We build software that automates network, regulatory and customer operations for telecoms operators, regulators and service providers. Complex processes that once ran on spreadsheets and manual checks run reliably at scale.",
  },
  {
    id: "logistics", name: "Logistics", schematic: "t-logistics",
    tile: "Automating how goods move, from dispatch to billing",
    body: "We build software that automates how goods move for logistics companies, fleet operators and distributors. From dispatch and tracking to delivery and billing, every step is visible and nothing is done twice.",
  },
  {
    id: "marketing", name: "Marketing", schematic: "t-marketing",
    tile: "Automating the operations behind marketing teams",
    body: "We build software that automates the operations behind marketing teams and agencies. Lead capture and routing, customer data and reporting run on systems fitted to how the team works, so people spend their time on the work itself.",
  },
  {
    id: "energy", name: "Energy", schematic: "t-energy",
    tile: "Monitoring energy infrastructure and facilities",
    body: "We build software that monitors infrastructure and facilities for energy companies. Readings from plants, pipelines and substations come into one live view, so faults are caught early and every check is on record. We built this for an energy company in Gabon.",
  },
] as const;

export const WORK_INTRO = { title: "Live systems, built for real operating conditions." };

/* Case summaries. `null` = not supplied yet: the work panel shows "To be confirmed" until 1960 Labs fills it in. */
export type Project = {
  id: string; name: string; category: string; headline: string; summary: string;
  sector: string; deliveredAs: string; builtFor: string;
  client: string | null; year: string | null; url: string | null;
  problem: string; solution: string; impact: string | null;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "credithub",
    name: "CreditHub",
    category: "Embedded credit infrastructure",
    headline: "Credit, built into the platforms merchants already use.",
    summary:
      "CreditHub connects platform operators with lenders, so operators can offer their merchant customers access to finance without building a lending business of their own. Operators can integrate the CreditHub SDK to launch quickly, or use the CreditHub APIs to build their own credit product.",
    sector: "Finance",
    deliveredAs: "SDK and APIs",
    builtFor: "Platform operators and lenders",
    client: null, year: null, url: null,
    problem: "Merchants need finance inside the platforms they already use, but platform operators don't want to build a lending business of their own.",
    solution: "CreditHub connects platform operators with lenders. Operators integrate the CreditHub SDK to launch quickly, or use the CreditHub APIs to build their own credit product.",
    impact: null,
  },
  {
    id: "network",
    name: "1960 Network",
    category: "Network quality monitoring for telecoms regulators",
    headline: "See network quality the way subscribers experience it.",
    // "voice, data and SMS" still to be confirmed before launch.
    summary:
      "1960 Network is the dashboard for a network analysis device that measures the signal strength of each telecoms operator across services such as voice, data and SMS. With it, regulators can compare operators side by side, find weak spots and base their oversight on evidence.",
    sector: "Telecoms",
    deliveredAs: "Analytics dashboard for a network analysis device",
    builtFor: "Telecoms regulators",
    client: null, year: null, url: null,
    problem: "Regulators need evidence of how each operator's network performs for subscribers, service by service, to base their oversight on.",
    solution: "A dashboard for a network analysis device that measures each operator's signal strength across services. Regulators compare operators side by side and find weak spots.",
    impact: null,
  },
  {
    // Working name: confirm the product name before launch.
    id: "energy",
    name: "Energy Monitor",
    category: "Infrastructure and facility monitoring for energy",
    headline: "Every site and facility, watched from one place.",
    summary:
      "A monitoring system for an energy company in Gabon. It tracks the condition of the company's infrastructure and facilities in one place, so the team can see problems early and act on them.",
    sector: "Energy",
    deliveredAs: "Monitoring system",
    builtFor: "Energy companies",
    client: "An energy company in Gabon", year: null, url: null,
    problem: "The company runs infrastructure and facilities across several sites and needed one reliable view of their condition.",
    solution: "We built a system that monitors the company's infrastructure and facilities and brings the status of every site into one live view.",
    impact: null,
  },
];

export const CTA = {
  title: "Turn complex work into simple systems",
  body: "Book a 30-minute diagnostic. We'll tell you plainly whether custom software, automation or AI is the right fix, or whether none of them is.",
};
