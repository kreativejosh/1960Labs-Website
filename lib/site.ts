export const SITE = {
  name: "1960 Labs",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://1960labs.com").replace(/\/$/, ""),
  email: "work@1960labs.com",
  tagline: "Complex work, engineered to run itself.",
  shortPositioning: "We engineer custom solutions to complex problems.",
  description:
    "1960 Labs builds custom software, automation and AI for finance, telecoms, logistics, marketing and energy teams whose processes don't fit off-the-shelf tools.",
  locale: "en",
  // Replace with the real profile URLs before launch.
  social: { linkedin: "https://www.linkedin.com/", x: "https://x.com/" },
} as const;

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/#sectors", label: "Sectors" },
  { href: "/#how", label: "How we work" },
] as const;
