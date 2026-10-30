"""Assemble the 1960 Labs site: shared head, header, footer and logo partials into each page.

Usage: python3 src/build.py   (writes the finished pages to ../site/)
"""
import json, pathlib, re

SRC = pathlib.Path(__file__).parent
OUT = SRC.parent / "site"
WORDMARK = (SRC / "wordmark.d").read_text().strip()
ICONS = json.loads((SRC / "icons.json").read_text())

MARK_6 = "M8 8H18V26H30V56H8Z M15 33H23V49H15Z"
MARK_0 = "M34 8H56V56H34Z M41 15H49V49H41Z"
STOP = "M262.29 44.04H268.58V50.33H262.29Z"


def logo(fill="#0B0B0C", stop="#221FC3", stop_opacity="1", cls="", vb="0 0 320 72"):
    return (
        f'<svg{cls} viewBox="{vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">'
        f'<g transform="translate(4,4)"><path class="b6" d="{MARK_6}" fill="{fill}" fill-rule="evenodd"/>'
        f'<path class="b0" d="{MARK_0}" fill="{fill}" fill-rule="evenodd"/></g>'
        f'<path d="{WORDMARK}" fill="{fill}"/><path class="dot" d="{STOP}" fill="{stop}" opacity="{stop_opacity}"/></svg>'
    )


def icon(name, cls=""):
    c = f' class="{cls}"' if cls else ""
    return (f'<svg{c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[name]}</svg>')


FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E"
           "%3Cpath d='M1 1H4V6H7.5V15H1Z M3 8.5H5.5V13H3Z' fill='%230B0B0C' fill-rule='evenodd'/%3E"
           "%3Cpath d='M8.5 1H15V15H8.5Z M10.5 3H13V13H10.5Z' fill='%230B0B0C' fill-rule='evenodd'/%3E%3C/svg%3E")

NAV = [("work.html", "Work"), ("index.html#sectors", "Sectors"), ("index.html#how", "How we work")]


def head(title, desc):
    return f"""<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="claude:viewport-fit-sides" content="cover">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<link rel="icon" href="{FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap">
<link rel="stylesheet" href="styles.css">"""


def header(active):
    links = "".join(
        f'<li><a href="{h}"{" aria-current=\"page\"" if h == active else ""}>{t}</a></li>' for h, t in NAV)
    sheet = "".join(
        f'<li style="--i:{i}"><a href="{h}">{t}<span class="n">0{i + 1}</span></a></li>'
        for i, (h, t) in enumerate([("index.html", "Home")] + NAV))
    return f"""<a class="skip" href="#main">Skip to content</a>
<header class="hdr gut">
  <div class="wrap bar">
    <a class="logo" href="index.html" aria-label="1960 Labs home">{logo()}</a>
    <nav aria-label="Main"><ul>{links}</ul></nav>
    <div class="acts">
      <a class="btn btn-primary btn-sm" href="diagnostic.html"><span>Book a diagnostic</span></a>
      <button class="btn btn-secondary btn-sm menu-btn" type="button" aria-expanded="false" aria-controls="sheet"><span>Menu</span></button>
    </div>
  </div>
</header>
<div class="sheet gut" id="sheet" hidden>
  <ul>{sheet}</ul>
  <div class="sheet-foot">
    <a class="btn btn-primary" href="diagnostic.html"><span>Book a diagnostic</span>{icon("arrow-right")}</a>
    <span class="mono">work@1960labs.com</span>
  </div>
</div>"""


def footer():
    return f"""<footer class="ftr gut">
  <div class="wrap">
    <div class="f-cols">
      <div><h2>Company</h2><ul><li><a href="index.html">Home</a></li><li><a href="work.html">Work</a></li><li><a href="index.html#sectors">Sectors</a></li><li><a href="index.html#how">How we work</a></li></ul></div>
      <div><h2>Contact</h2><div class="f-mail"><span class="addr">work@1960labs.com</span><button class="copy" type="button" data-copy="work@1960labs.com">Copy</button></div>
        <a class="btn btn-light btn-sm" href="diagnostic.html"><span>Book a diagnostic</span></a></div>
      <div><h2>Social</h2><ul><li><a href="https://www.linkedin.com/" data-todo="1960 Labs LinkedIn URL">LinkedIn</a></li><li><a href="https://x.com/" data-todo="1960 Labs X URL">X</a></li></ul></div>
      <div><h2>Legal</h2><ul><li><a href="legal.html#privacy">Privacy Policy</a></li><li><a href="legal.html#terms">Terms of Use</a></li><li><a href="legal.html#data">How we handle your data</a></li></ul></div>
    </div>
    <div class="f-mark" aria-hidden="true">{logo("#F7F7F5", "#F7F7F5", "0.6", vb="12 12 257 48")}</div>
    <div class="f-base"><span>&copy; 2026 1960 Labs</span><span>We engineer custom solutions to complex problems.</span></div>
  </div>
</footer>
<script src="site.js"></script>"""


CTA = f"""<section class="cta gut" aria-labelledby="cta-h">
  <div class="inner">
    <span class="eyebrow">Book a diagnostic</span>
    <h2 class="d-1" id="cta-h" data-rise>Turn complex work into simple systems<span class="stop" aria-hidden="true"></span><span class="sr">.</span></h2>
    <p>Book a 30-minute diagnostic. We'll tell you plainly whether custom software, automation or AI is the right fix, or whether none of them is.</p>
    <a class="btn btn-primary" href="diagnostic.html"><span>Book a diagnostic</span>{icon("arrow-right")}</a>
  </div>
</section>"""

PAGES = {
    "index.html": ("1960 Labs", "Custom software, automation and AI for finance, telecoms, logistics and marketing teams whose processes don't fit off-the-shelf tools.", "index.html"),
    "work.html": ("Work · 1960 Labs", "Live systems from 1960 Labs: CreditHub embedded credit infrastructure and 1960 Network telecoms quality monitoring.", "work.html"),
    "diagnostic.html": ("Book a diagnostic · 1960 Labs", "Book a 30-minute diagnostic with 1960 Labs.", "diagnostic.html"),
    "legal.html": ("Legal · 1960 Labs", "Privacy Policy, Terms of Use and how 1960 Labs handles your data.", "legal.html"),
}


def render(name):
    title, desc, active = PAGES[name]
    body = (SRC / "pages" / name).read_text()
    body = body.replace("{{CTA}}", CTA)
    vig = re.split(r"<!--VIG(\d)-->", (SRC / "vignettes.html").read_text())
    for n, html in zip(vig[1::2], vig[2::2]):
        body = body.replace("{{VIG%s}}" % n, html.strip())
    body = re.sub(r"\{\{icon:([a-z-]+)\}\}", lambda m: icon(m.group(1)), body)
    body = body.replace("{{LOGO_INTRO}}", (
        f'<svg viewBox="0 0 76 64" aria-hidden="true"><path class="b6" d="{MARK_6}" fill="#F7F7F5" fill-rule="evenodd"/>'
        f'<path class="b0" d="{MARK_0}" fill="#F7F7F5" fill-rule="evenodd"/><rect class="dot" x="61" y="48" width="8" height="8" fill="#221FC3"/></svg>'))
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{head(title, desc)}
</head>
<body>
{header(active)}
<main id="main">
{body}
</main>
{footer()}
</body>
</html>
"""


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for f in ("styles.css", "site.js"):
        (OUT / f).write_text((SRC / f).read_text())
    for name in PAGES:
        (OUT / name).write_text(render(name))
        print("built", name)
