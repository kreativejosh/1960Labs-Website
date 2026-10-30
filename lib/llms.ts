import { ABOUT, CTA, HERO, PROJECTS, SECTORS, SERVICES, SERVICES_INTRO, STEPS } from "./content";
import { SITE } from "./site";

/* Plain-text summaries for AI assistants and answer engines (llmstxt.org convention). Built from the same content as the pages. */

export function llmsTxt() {
  const u = SITE.url;
  return `# ${SITE.name}

> ${SITE.description} We diagnose a process before we build anything, choose between custom software, automation or AI based on the problem, and run the system with the client after launch.

${SITE.name} is a custom solutions lab, not an agency. Contact: ${SITE.email}. The main way to start working together is a free 30-minute diagnostic call.

## Pages

- [Home](${u}/): what we do, how we work, sectors we serve and selected work
- [Work](${u}/work): CreditHub (embedded credit infrastructure) and 1960 Network (telecoms network quality monitoring)
- [Book a diagnostic](${u}/diagnostic): request a 30-minute diagnostic call

## Services

${SERVICES.map((s) => `- ${s.name}: ${s.body}`).join("\n")}

## Sectors

${SECTORS.map((s) => `- ${s.name}: ${s.body}`).join("\n")}

## Optional

- [Full text for language models](${u}/llms-full.txt)
`;
}

export function llmsFullTxt() {
  return `# ${SITE.name}: full site text

Website: ${SITE.url}
Contact: ${SITE.email}
Positioning: ${SITE.shortPositioning}

## ${HERO.title}.

${HERO.subhead}

${HERO.body}

## ${ABOUT.title}

${ABOUT.subhead}

${ABOUT.body}

## How we work: ${STEPS.map((s) => s.title).join(", ")}

${STEPS.map((s, i) => `${i + 1}. ${s.title}. ${s.body}`).join("\n")}

## ${SERVICES_INTRO.title}

${SERVICES_INTRO.subhead}

${SERVICES.map((s) => `- ${s.name}. ${s.body}`).join("\n")}

## Sectors: built inside high-stakes operations

${SECTORS.map((s) => `### ${s.name}\n\n${s.body}`).join("\n\n")}

## Work: live systems, built for real operating conditions

${PROJECTS.map((p) => `### ${p.name}: ${p.category}\n\n${p.headline} ${p.summary}\n\n- Sector: ${p.sector}\n- Delivered as: ${p.deliveredAs}\n- Built for: ${p.builtFor}\n- Page: ${SITE.url}/work#${p.id}`).join("\n\n")}

## ${CTA.title}.

${CTA.body}

Book at ${SITE.url}/diagnostic or email ${SITE.email}.
`;
}
