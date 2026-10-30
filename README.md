# 1960 Labs website

Marketing site for 1960 Labs, built with Next.js 16 (App Router, TypeScript) on the 1960 Labs brand system v1.0. Page layouts are adapted from poetic.com.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill it in (see Environment below). Node 20.9 or newer.

## Pages

| Route | What it is |
|---|---|
| `/` | Home: hero, What we are, How we work (`#how`), Right-sized technology, Sectors (`#sectors`), Our work, call to action |
| `/work` | CreditHub and 1960 Network |
| `/diagnostic` | Book a diagnostic form, posting to `/api/diagnostic` |
| `/legal` | Privacy, terms, data handling (placeholders, `noindex` until filled) |
| `/brand` | The brand system, served from `public/brand.html`. Linked only from the footer, `noindex`. |

## Where things live

- `lib/content.ts`: all page copy (hero, steps, services, sectors, projects, CTA). Edit copy here.
- `lib/site.ts`: site name, URL, email, nav, social links.
- `lib/seo.ts`: per-page metadata and schema.org structured data.
- `lib/schematics.ts`: the animated process drawings.
- `components/`: header, footer and each interactive section. Components that animate or respond to clicks are client components.
- `app/globals.css`: the full stylesheet, built from the brand tokens.

## SEO and AI search

- Every page is statically pre-rendered, with all text in the HTML, including closed sector rows.
- Each page has a unique title and description, a canonical URL, and Open Graph / X card tags.
- `app/opengraph-image.tsx` generates the 1200×630 share image. `icon.svg` and `apple-icon` provide the favicons.
- `/sitemap.xml` and `/robots.txt` are generated. Robots explicitly allows AI search and assistant crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others) and blocks `/api/`.
- Structured data (JSON-LD):
  - Organization + ProfessionalService, with the service catalogue and contact point
  - WebSite
  - a Service for each sector
  - HowTo for the five-step method
  - SoftwareApplication entries for the projects on `/work`
  - breadcrumbs and ContactPage
- `/llms.txt` and `/llms-full.txt`: plain-text summaries for AI assistants, generated from `lib/content.ts` so they stay in sync with the pages.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The live domain. Used in canonical links, the sitemap, the share image URL and structured data. Defaults to `https://1960labs.com`. |
| `RESEND_API_KEY`, `DIAGNOSTIC_TO`, `DIAGNOSTIC_FROM` | Booking form email delivery through Resend. If they're missing, the form tells visitors to email work@1960labs.com instead. |

## Deploy

Vercel is the simplest option: import the repo, set the environment variables, and deploy. Any Node host that runs `next start` works too.

## Before launch

- Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- Set up Resend (or swap the provider in `app/api/diagnostic/route.ts`), and verify the sending domain.
- Confirm which services 1960 Network measures (currently "voice, data and SMS").
- Replace the LinkedIn and X URLs in `lib/site.ts`.
- Supply the legal text in `app/legal/page.tsx`, then remove its `noindex`.
- Replace the example dashboard figures with real results once they can be published.
- After launch, submit the sitemap in Google Search Console and Bing Webmaster Tools.
