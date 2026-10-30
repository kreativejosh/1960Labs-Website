import type { Metadata } from "next";
import { PROJECTS, SECTORS, SERVICES, STEPS } from "./content";
import { SITE } from "./site";

/** Per-page metadata with canonical URL and matching Open Graph / X card. */
export function pageMeta({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const url = SITE.url + path;
  const ogTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · Custom software, automation and AI`;
  return {
    title: title ?? { absolute: `${SITE.name} · Custom software, automation and AI` },
    description,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description, url, type: "website", siteName: SITE.name, locale: "en" },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}

const ORG_ID = `${SITE.url}/#organization`;

/* ---------- schema.org structured data ---------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/icon.svg`,
        image: `${SITE.url}/opengraph-image`,
        email: SITE.email,
        slogan: SITE.shortPositioning,
        description: SITE.description,
        knowsAbout: [
          "Custom software development", "Business process automation", "Workflow redesign", "Applied AI",
          ...SECTORS.map((s) => `${s.name} operations`),
        ],
        contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, availableLanguage: "English" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.body, provider: { "@id": ORG_ID } },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": ORG_ID },
        inLanguage: "en",
      },
    ],
  };
}

export function homeLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...SECTORS.map((s) => ({
        "@type": "Service",
        "@id": `${SITE.url}/#sector-${s.id}`,
        name: `Software and automation for ${s.name.toLowerCase()}`,
        serviceType: `${s.name} process automation`,
        description: s.body,
        provider: { "@id": ORG_ID },
      })),
      {
        "@type": "HowTo",
        name: "How 1960 Labs takes a process from first workshop to live system",
        step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
      },
    ],
  };
}

export function workLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb([["Work", "/work"]]),
      {
        "@type": "ItemList",
        name: "1960 Labs work",
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}/work#${p.id}`,
          item: {
            "@type": "SoftwareApplication",
            "@id": `${SITE.url}/work#${p.id}`,
            name: p.name,
            applicationCategory: "BusinessApplication",
            description: p.summary,
            audience: { "@type": "BusinessAudience", name: p.builtFor },
            creator: { "@id": ORG_ID },
          },
        })),
      },
    ],
  };
}

export function breadcrumb(trail: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...trail].map(([name, path], i) => ({
      "@type": "ListItem", position: i + 1, name, item: SITE.url + path,
    })),
  };
}
