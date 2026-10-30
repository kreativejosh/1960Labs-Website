# 1960 Labs website

Static marketing site for 1960 Labs, built on the 1960 Labs brand system v1.0. Page layouts are adapted from poetic.com.

## Pages

- `index.html` - Home, including the Sectors (`#sectors`) and How we work (`#how`) sections
- `work.html` - CreditHub and 1960 Network
- `diagnostic.html` - Book a diagnostic (form not yet wired to a backend)
- `legal.html` - Privacy, terms, data handling (placeholders)

## Structure

- `site/` - the built site. Deploy this folder as-is to any static host.
- `src/pages/` - page bodies
- `src/vignettes.html` - example UI cards for the How we work section
- `src/styles.css`, `src/site.js` - shared styles and behaviour
- `src/build.py` - adds the shared head, header, footer and logo to each page

## Build

```bash
python3 src/build.py
```

## Before launch

- Confirm which services 1960 Network measures (currently "voice, data and SMS").
- Connect the booking form: set `data-endpoint` on `#book-form` and send the form in `site.js`.
- Replace the LinkedIn and X links in `src/build.py` with the real profile URLs.
- Supply the Privacy Policy, Terms of Use and data-handling text in `src/pages/legal.html`.
- Replace example dashboard figures with real results once they can be published.
