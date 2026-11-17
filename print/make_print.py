"""1960 Labs print collateral: CEO business card and event flyer.

Built on the 1960 Labs brand system v1.0 (logo geometry, Inter Tight + JetBrains Mono,
ink / white / one signal blue, square corners, schematic imagery).

Print spec (ISO / West Africa and European presses):
  Business card  85 x 55 mm trim, 3 mm bleed, 4 mm safe zone, double-sided
  Flyer          A5 148 x 210 mm trim, 3 mm bleed, 8 mm safe zone, double-sided
  Colour         CMYK only. Rich black C60 M40 Y40 K100 for large solids,
                 K100 for small black text, signal blue C92 M88 Y0 K0.
  Text           6 pt minimum; white text on black is 7 pt+ and medium weight or heavier.
  Lines          0.25 pt minimum. Fonts embedded (subset). All artwork vector.

Usage: python3 make_print.py   ->  out/*.pdf and out/preview/*.png
"""
import pathlib, re
import segno
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import CMYKColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

HERE = pathlib.Path(__file__).parent
OUT = HERE / "out"

# ---------------------------------------------------------------- content
# Fill these in before printing. Anything in [brackets] prints as-is.
CEO = {
    "name": "Loubao Kraka",
    "title": "Chief Executive Officer",
    "phone": "[+225 phone number]",
    "email": "[CEO email]@1960labs.com",
}
WEB = "1960labs.com"
CONTACT_EMAIL = "work@1960labs.com"

CLIENTS = [
    # name shown in the logo slot, one line, status
    ("VAALCO Energy", "Vessel intelligence for offshore operations.", "Delivered"),
    ("Government of Côte d'Ivoire", "Deploying our telecoms network quality platform.", "Deploying"),
    ("EnvoyX", "Embedded credit infrastructure for platforms.", "Delivered"),
    ("Government of Gabon", "National deployment under discussion.", "In discussion"),
]

# ---------------------------------------------------------------- brand
RICH = CMYKColor(0.60, 0.40, 0.40, 1.00)       # large black areas
K100 = CMYKColor(0, 0, 0, 1)                   # black text, small marks
BLUE = CMYKColor(0.92, 0.88, 0, 0)             # signal blue (#221FC3); match Pantone 2736 C if spot
WHITE = CMYKColor(0, 0, 0, 0)
GREY = CMYKColor(0, 0, 0, 0.62)                # muted text on white
LINE = CMYKColor(0, 0, 0, 0.14)                # hairlines on white
ON_NIGHT = CMYKColor(0, 0, 0, 0.03)            # near-white text on black
ON_NIGHT_MUTED = CMYKColor(0, 0, 0, 0.38)      # muted text on black
NIGHT_LINE = CMYKColor(0, 0, 0, 0.80)          # faint grid on black (knocks out of rich black)
REG = CMYKColor(1, 1, 1, 1)                    # registration colour, crop marks only

for name, file in [("Sans-500", "InterTight-Medium"), ("Sans-600", "InterTight-SemiBold"),
                   ("Sans-700", "InterTight-Bold"), ("Mono-400", "JetBrainsMono-Regular"),
                   ("Mono-500", "JetBrainsMono-Medium")]:
    pdfmetrics.registerFont(TTFont(name, str(HERE / "fonts" / f"{file}.ttf")))

MARK_6 = "M8 8H18V26H30V56H8Z M15 33H23V49H15Z"
MARK_0 = "M34 8H56V56H34Z M41 15H49V49H41Z"
STOP = "M262.29 44.04H268.58V50.33H262.29Z"
WORDMARK = re.search(r'WORDMARK = "([^"]+)"', (HERE.parent.parent / "1960labs-site/lib/logo.ts").read_text()).group(1)


# ---------------------------------------------------------------- svg path -> reportlab
def svg_path(c, d, x0, y0, scale, svg_h):
    """Draw an absolute SVG path (M L H V Q Z) with its top-left at (x0, y0 + svg_h*scale)."""
    p = c.beginPath()
    toks = re.findall(r"[MLHVQZ]|-?\d*\.?\d+", d)
    i, cmd, cx, cy = 0, None, 0.0, 0.0
    X = lambda v: x0 + v * scale
    Y = lambda v: y0 + (svg_h - v) * scale
    while i < len(toks):
        t = toks[i]
        if re.match(r"[MLHVQZ]", t):
            cmd = t; i += 1
            if cmd == "Z":
                p.close(); continue
        nums = lambda n: [float(v) for v in toks[i:i + n]]
        if cmd == "M":
            cx, cy = nums(2); i += 2; p.moveTo(X(cx), Y(cy)); cmd = "L"
        elif cmd == "L":
            cx, cy = nums(2); i += 2; p.lineTo(X(cx), Y(cy))
        elif cmd == "H":
            cx = nums(1)[0]; i += 1; p.lineTo(X(cx), Y(cy))
        elif cmd == "V":
            cy = nums(1)[0]; i += 1; p.lineTo(X(cx), Y(cy))
        elif cmd == "Q":
            qx, qy, ex, ey = nums(4); i += 4
            c1 = (cx + 2 / 3 * (qx - cx), cy + 2 / 3 * (qy - cy))
            c2 = (ex + 2 / 3 * (qx - ex), ey + 2 / 3 * (qy - ey))
            p.curveTo(X(c1[0]), Y(c1[1]), X(c2[0]), Y(c2[1]), X(ex), Y(ey)); cx, cy = ex, ey
    return p


def lockup(c, x, y, width, ink, stop):
    """Full logo lockup, bottom-left at (x, y), drawn from the 320 x 72 artboard trimmed to its artwork."""
    vb_x, vb_y, vb_w, vb_h = 12, 12, 257, 48       # artwork bounds inside the 320 x 72 artboard
    s = width / vb_w
    ox, oy = x - vb_x * s, y - (72 - vb_y - vb_h) * s
    c.setFillColor(ink)
    for d, dx in ((MARK_6, 4), (MARK_0, 4)):
        c.drawPath(svg_path(c, d, ox + dx * s, oy - 4 * s, s, 72), stroke=0, fill=1, fillMode=0)
    c.drawPath(svg_path(c, WORDMARK, ox, oy, s, 72), stroke=0, fill=1, fillMode=0)
    c.setFillColor(stop)
    c.drawPath(svg_path(c, STOP, ox, oy, s, 72), stroke=0, fill=1)
    return vb_h * s


def mark(c, x, y, size, ink):
    """The '60' mark alone: 48-unit live area, bottom-left at (x, y), `size` = live-area height."""
    s = size / 48
    c.setFillColor(ink)
    for d in (MARK_6, MARK_0):
        c.drawPath(svg_path(c, d, x - 8 * s, y - 8 * s, s, 64), stroke=0, fill=1, fillMode=0)


PT = mm  # points per millimetre; the canvas draws in mm, type is specified in pt


def text(c, x, y, s, font, size, color, track=0.0, anchor="start"):
    size = size / PT
    w = pdfmetrics.stringWidth(s, font, size) + track * size * max(len(s) - 1, 0)
    if anchor == "end": x -= w
    if anchor == "middle": x -= w / 2
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(track * size)
    t.textOut(s)
    c.drawText(t)
    return w


def label(c, x, y, s, color, size=6.5, anchor="start"):
    return text(c, x, y, s.upper(), "Mono-500", size, color, track=0.06, anchor=anchor)


def wrap(s, font, size, width, track=0.0):
    size = size / PT
    words, lines, cur = s.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if pdfmetrics.stringWidth(trial, font, size) + track * size * len(trial) <= width: cur = trial
        else: lines.append(cur); cur = w
    return lines + [cur]


# ---------------------------------------------------------------- page setup
class Sheet:
    """A press sheet: trim size + bleed + optional crop marks. Draw in trim coordinates (mm)."""

    def __init__(self, path, trim_w, trim_h, bleed=3, marks=True):
        self.tw, self.th, self.b, self.marks = trim_w, trim_h, bleed, marks
        self.m = bleed + (9 if marks else 0)            # space round the trim
        self.pw, self.ph = trim_w + 2 * self.m, trim_h + 2 * self.m
        self.c = canvas.Canvas(str(path), pagesize=(self.pw * mm, self.ph * mm), initialFontName="Sans-500", initialFontSize=8)
        self.c.setTitle(path.stem); self.c.setAuthor("1960 Labs"); self.c.setCreator("1960 Labs print generator")

    def begin(self):
        c, m = self.c, self.m
        c.setTrimBox((m * mm, m * mm, (m + self.tw) * mm, (m + self.th) * mm))
        c.setBleedBox(((m - self.b) * mm, (m - self.b) * mm, (m + self.tw + self.b) * mm, (m + self.th + self.b) * mm))
        c.saveState()
        c.translate(m * mm, m * mm)
        c.scale(mm, mm)                                  # from here on, units are millimetres
        return c

    def end(self, slug):
        c, m = self.c, self.m
        c.restoreState()
        if self.marks:
            c.saveState()
            c.setStrokeColor(REG); c.setLineWidth(0.25)
            L, gap = 6 * mm, (self.b + 1) * mm
            for x in (m * mm, (m + self.tw) * mm):
                c.line(x, 0.5 * mm, x, m * mm - gap); c.line(x, (m + self.th) * mm + gap, x, self.ph * mm - 0.5 * mm)
            for y in (m * mm, (m + self.th) * mm):
                c.line(0.5 * mm, y, m * mm - gap, y); c.line((m + self.tw) * mm + gap, y, self.pw * mm - 0.5 * mm, y)
            text(c, (m + 1) * mm, 2.2 * mm, slug, "Mono-400", 5, REG)
            c.restoreState()
        c.showPage()

    def bg(self, color):
        self.c.setFillColor(color)
        self.c.rect(-self.b, -self.b, self.tw + 2 * self.b, self.th + 2 * self.b, stroke=0, fill=1)


# ---------------------------------------------------------------- business card
def business_card(path, marks):
    W, H, SAFE = 85, 55, 4.5
    sh = Sheet(path, W, H, marks=marks)

    # Front: white, lockup top-left, name and contacts bottom-left
    c = sh.begin()
    sh.bg(WHITE)
    lockup(c, SAFE, H - SAFE - 6.4, 28.5, K100, BLUE)
    label(c, W - SAFE, H - SAFE - 4.6, "AI & automation lab", GREY, 5.6, anchor="end")
    y = 21.5
    text(c, SAFE, y, CEO["name"], "Sans-600", 12, K100, track=-0.03)
    text(c, SAFE, y - 5.2, CEO["title"], "Sans-500", 7.2, GREY, track=-0.01)
    c.setStrokeColor(LINE); c.setLineWidth(0.25 / mm * 1.0)
    c.line(SAFE, y - 8.6, W - SAFE, y - 8.6)
    rows = [CEO["phone"], CEO["email"], WEB]
    for i, r in enumerate(rows):
        text(c, SAFE, y - 12.4 - i * 3.3, r, "Mono-400", 6.3, K100)
    sh.end(f"1960 Labs · CEO card · front · {W}x{H} mm trim · 3 mm bleed")

    # Back: rich black, the 60 mark large and cropped by the bottom edge, blue square at its baseline
    c = sh.begin()
    sh.bg(RICH)
    size = 30
    sq = size * 8 / 48 * 0.82
    mx, my = W - SAFE - sq - 1.2 - size, SAFE
    mark(c, mx, my, size, ON_NIGHT)
    c.setFillColor(BLUE)
    c.rect(mx + size + 1.2, my, sq, sq, stroke=0, fill=1)
    for i, ln in enumerate(["We engineer", "custom solutions", "to complex problems."]):
        text(c, SAFE, H - SAFE - 4.2 - i * 4.3, ln, "Sans-600", 9.2, ON_NIGHT, track=-0.025)
    label(c, SAFE, SAFE + 0.4, WEB, ON_NIGHT_MUTED, 6)
    sh.end(f"1960 Labs · CEO card · back · {W}x{H} mm trim · 3 mm bleed")
    sh.c.save()


# ---------------------------------------------------------------- flyer
def schematic(c, x, y, w, h, on_dark=True):
    """Process map in the brand's schematic style: grid, square nodes, 45° turns, blue finished step."""
    ink = ON_NIGHT if on_dark else K100
    muted = ON_NIGHT_MUTED if on_dark else GREY
    grid = NIGHT_LINE if on_dark else LINE
    c.saveState()
    p = c.beginPath(); p.rect(x, y, w, h); c.clipPath(p, stroke=0)
    c.setStrokeColor(grid); c.setLineWidth(0.25 / mm * 1.0)
    step = 5
    gx = x
    while gx <= x + w: c.line(gx, y, gx, y + h); gx += step
    gy = y
    while gy <= y + h: c.line(x, gy, x + w, gy); gy += step
    c.restoreState()

    base = y + h * 0.42
    x_l, x_r = 10 + 8, 148 - 10 - 8          # nodes and labels stay inside the safe zone
    xs = [x_l + (x_r - x_l) * f for f in (0, 0.25, 0.5, 0.75, 1)]
    names = ["01 REQUEST", "02 CHECK", "03 APPROVE", "04 SYNC", "05 DONE"]
    # manual loops removed by the redesign (dashed, grey)
    c.setStrokeColor(muted); c.setLineWidth(0.5 / mm * 1.0); c.setDash(0.9, 0.9)
    for a, b2 in ((xs[1] + 4, xs[2] - 4), (xs[3] + 4, xs[4] - 4)):
        top = base + h * 0.32
        p = c.beginPath(); p.moveTo(a, base); p.lineTo(a, top); p.lineTo(b2, top); p.lineTo(b2, base); c.drawPath(p, stroke=1, fill=0)
    c.setDash()
    # main path with one 45° step
    c.setStrokeColor(ink); c.setLineWidth(0.75 / mm * 1.0)
    p = c.beginPath(); p.moveTo(xs[0], base); p.lineTo(xs[4], base); c.drawPath(p, stroke=1, fill=0)
    n = 2.4
    for i, (nx, nm) in enumerate(zip(xs, names)):
        done = i == 4
        c.setLineWidth(0.6 / mm * 1.0)
        c.setStrokeColor(BLUE if done else ink)
        c.setFillColor(BLUE if done else RICH if on_dark else WHITE)
        c.rect(nx - n / 2, base - n / 2, n, n, stroke=1, fill=1)
        text(c, nx, base - 6, nm, "Mono-500", 6, ink if done else muted, track=0.04, anchor="middle")
    for a, b2, t in ((xs[1] + 4, xs[2] - 4, "SPREADSHEET"), (xs[3] + 4, xs[4] - 4, "RE-KEYED BY HAND")):
        mx_ = (a + b2) / 2
        top = base + h * 0.32
        c.setStrokeColor(muted); c.setFillColor(RICH if on_dark else WHITE); c.setLineWidth(0.5 / mm * 1.0)
        c.rect(mx_ - n / 2, top - n / 2, n, n, stroke=1, fill=1)
        text(c, mx_, top + 3.2, t, "Mono-500", 6, muted, track=0.04, anchor="middle")


def flyer(path, marks):
    W, H, SAFE = 148, 210, 10
    sh = Sheet(path, W, H, marks=marks)

    # ---- Front: the positioning
    c = sh.begin()
    sh.bg(RICH)
    lockup(c, SAFE, H - SAFE - 9.4, 42, ON_NIGHT, BLUE)
    label(c, W - SAFE, H - SAFE - 6.2, "AI & automation lab", ON_NIGHT_MUTED, 6.5, anchor="end")

    lines = ["Complex operations,", "engineered to", "run themselves"]
    size, lead = 33, 30.5
    top = H - 62
    for i, ln in enumerate(lines):
        w = text(c, SAFE - 0.6, top - i * lead / 2.835, ln, "Sans-600", size, ON_NIGHT, track=-0.045)
    # the square full stop in signal blue
    stop = size * 0.15 / 2.835
    c.setFillColor(BLUE); c.rect(SAFE - 0.6 + w + 0.5, top - 2 * lead / 2.835, stop, stop, stroke=0, fill=1)

    sub_y = top - 2 * lead / 2.835 - 13
    for i, ln in enumerate(wrap("We automate the most complex workflows inside corporations and governments, with custom software, automation and AI.", "Sans-500", 11, 108, -0.01)):
        text(c, SAFE, sub_y - i * 5.2, ln, "Sans-500", 11, ON_NIGHT_MUTED, track=-0.01)

    schematic(c, -3, 34, W + 6, 46)
    label(c, SAFE, 84, "fig. 01 · a process, before and after we redesign it", ON_NIGHT_MUTED, 6)

    c.setStrokeColor(NIGHT_LINE); c.setLineWidth(0.25 / mm * 1.0); c.line(SAFE, 24, W - SAFE, 24)
    steps = ["Diagnose", "Redesign", "Build", "Run", "Measure"]
    colw = (W - 2 * SAFE) / 5
    for i, s in enumerate(steps):
        label(c, SAFE + i * colw, 19, f"0{i + 1}", BLUE if i == 0 else ON_NIGHT_MUTED, 6)
        text(c, SAFE + i * colw, 13.6, s, "Sans-600", 9, ON_NIGHT, track=-0.02)
    sh.end(f"1960 Labs · event flyer · front · A5 {W}x{H} mm trim · 3 mm bleed")

    # ---- Back: proof and the ask
    c = sh.begin()
    sh.bg(WHITE)
    c.setFillColor(BLUE); c.rect(SAFE, H - SAFE - 4, 2, 2, stroke=0, fill=1)
    label(c, SAFE + 3.6, H - SAFE - 4, "Selected clients", K100, 6.5)
    for i, ln in enumerate(["Trusted inside", "high-stakes operations."]):
        text(c, SAFE - 0.4, H - SAFE - 16 - i * 8.6, ln, "Sans-600", 23, K100, track=-0.04)

    # client rows: logo slot | one line | status
    row_top, row_h = H - 50, 22
    slot_w, slot_h = 40, 14
    c.setStrokeColor(K100); c.setLineWidth(0.5 / mm * 1.0); c.line(SAFE, row_top, W - SAFE, row_top)
    for i, (name, line, status) in enumerate(CLIENTS):
        y0 = row_top - (i + 1) * row_h
        c.setStrokeColor(LINE); c.setLineWidth(0.25 / mm * 1.0); c.line(SAFE, y0, W - SAFE, y0)
        # logo slot: replace with the client's official logo file (see README)
        sy = y0 + (row_h - slot_h) / 2
        c.setStrokeColor(LINE); c.rect(SAFE, sy, slot_w, slot_h, stroke=1, fill=0)
        nl = wrap(name, "Sans-700", 8.6, slot_w - 6, -0.02)
        for j, ln in enumerate(nl):
            text(c, SAFE + slot_w / 2, sy + slot_h / 2 + (len(nl) - 1) * 1.9 - j * 3.8 - 1.2, ln, "Sans-700", 8.6, K100, track=-0.02, anchor="middle")
        tx = SAFE + slot_w + 7
        for j, ln in enumerate(wrap(line, "Sans-600", 10, W - SAFE - tx, -0.015)):
            text(c, tx, y0 + row_h / 2 + 1.6 - j * 4.6, ln, "Sans-600", 10, K100, track=-0.015)
        # status: blue = delivered, ink = deploying, open square = in discussion
        sx, syy = tx, y0 + 4.6
        if status == "Delivered": c.setFillColor(BLUE); c.rect(sx, syy, 1.8, 1.8, stroke=0, fill=1)
        elif status == "Deploying": c.setFillColor(K100); c.rect(sx, syy, 1.8, 1.8, stroke=0, fill=1)
        else: c.setStrokeColor(K100); c.setLineWidth(0.35 / mm * 1.0); c.rect(sx, syy, 1.8, 1.8, stroke=1, fill=0)
        label(c, sx + 3.2, syy + 0.1, status, GREY, 6)

    # the ask: rich black band to the bottom edge
    band = 64
    c.setFillColor(RICH); c.rect(-3, -3, W + 6, band + 3, stroke=0, fill=1)
    label(c, SAFE, band - 11, "Book a diagnostic", ON_NIGHT_MUTED, 6.5)
    for i, ln in enumerate(["30 minutes. One process.", "A plain answer."]):
        text(c, SAFE - 0.3, band - 20 - i * 6.6, ln, "Sans-600", 16, ON_NIGHT, track=-0.035)
    for i, ln in enumerate(wrap("Software, automation, AI, or none of them: we tell you which is the right fix.", "Sans-500", 8, 86)):
        text(c, SAFE, band - 37 - i * 3.8, ln, "Sans-500", 8, ON_NIGHT_MUTED)
    text(c, SAFE, SAFE + 3.6, f"{CEO['name']} · {CEO['title']}", "Sans-600", 7.5, ON_NIGHT)
    label(c, SAFE, SAFE - 0.4, f"{CONTACT_EMAIL}  ·  {WEB}", ON_NIGHT_MUTED, 6.2)

    # QR: opens an email to book; works without the website being live
    qr = segno.make(f"mailto:{CONTACT_EMAIL}?subject=Diagnostic%20request", error="m")
    mat = list(qr.matrix)
    n = len(mat)
    qs = 25                                   # QR size in mm (quiet zone added)
    qx, qy = W - SAFE - qs, SAFE + 0.5
    cell = qs / n
    quiet = 4 * cell                          # ISO 18004 quiet zone: 4 modules
    c.setFillColor(WHITE); c.rect(qx - quiet, qy - quiet, qs + 2 * quiet, qs + 2 * quiet, stroke=0, fill=1)
    c.setFillColor(K100)
    for r, row in enumerate(mat):
        for col, v in enumerate(row):
            if v: c.rect(qx + col * cell, qy + qs - (r + 1) * cell, cell + 0.01, cell + 0.01, stroke=0, fill=1)
    label(c, qx + qs / 2, qy + qs + quiet + 2.4, "Scan to email us", ON_NIGHT_MUTED, 6, anchor="middle")
    sh.end(f"1960 Labs · event flyer · back · A5 {W}x{H} mm trim · 3 mm bleed")
    sh.c.save()


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    business_card(OUT / "1960Labs_CEO-Card_85x55_press.pdf", marks=True)
    business_card(OUT / "1960Labs_CEO-Card_85x55_bleed.pdf", marks=False)
    flyer(OUT / "1960Labs_Flyer_A5_press.pdf", marks=True)
    flyer(OUT / "1960Labs_Flyer_A5_bleed.pdf", marks=False)
    print("written to", OUT)
