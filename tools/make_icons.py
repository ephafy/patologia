#!/usr/bin/env python3
"""tools/make_icons.py — ikony offline appky z book.json (monogram) a assets/styles/palette.css (farby)

  py tools/make_icons.py          zapíše assets/img/icon.svg, icon-maskable.svg a PNG (32, 180, 192, 512, maskable 512)

Zdieľaný súbor všetkých kníh (KNIHY-CORE). Monogram = písmeno z book.json → monogram; pozadie = --color-accent,
písmeno = --color-accent-100, pruh = --color-accent-2. Potrebuje Pillow (py -m pip install pillow).
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
book = json.load(open(os.path.join(ROOT, "book.json"), encoding="utf-8"))
css = open(os.path.join(ROOT, "assets", "styles", "palette.css"), encoding="utf-8").read()


def tok(name):
    m = re.search(r"--" + re.escape(name) + r"\s*:\s*(#[0-9a-fA-F]{6})", css)
    if not m:
        sys.exit(f"palette.css: chýba --{name}")
    return m.group(1)


BG, FG, BAR = tok("color-accent"), tok("color-accent-100"), tok("color-accent-2")
LETTER = book.get("monogram") or book["brand"][0]
OUT = os.path.join(ROOT, "assets", "img")
os.makedirs(OUT, exist_ok=True)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512" fill="{BG}"/>
<text x="256" y="345" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="290" fill="{FG}">{LETTER}</text>
<rect x="176" y="378" width="160" height="14" rx="7" fill="{BAR}"/>
</svg>
'''
mask = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512" fill="{BG}"/>
<g transform="translate(256,256) scale(0.62) translate(-256,-256)">
<text x="256" y="345" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="290" fill="{FG}">{LETTER}</text>
<rect x="176" y="378" width="160" height="14" rx="7" fill="{BAR}"/>
</g>
</svg>
'''
open(os.path.join(OUT, "icon.svg"), "w", encoding="utf-8", newline="\n").write(svg)
open(os.path.join(OUT, "icon-maskable.svg"), "w", encoding="utf-8", newline="\n").write(mask)

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Chýba Pillow – SVG ikony sú zapísané, PNG nie (py -m pip install pillow)")

FONT = next((p for p in (r"C:\Windows\Fonts\georgiab.ttf", r"C:\Windows\Fonts\timesbd.ttf", "/Library/Fonts/Georgia Bold.ttf") if os.path.exists(p)), None)
if not FONT:
    sys.exit("Nenašiel sa písmo Georgia Bold / Times New Roman Bold")


def hexrgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def render(scale_letter, size):
    S = 2048   # kreslí sa veľké a zmenší (hladké hrany)
    k = S / 512
    im = Image.new("RGB", (S, S), hexrgb(BG))
    d = ImageDraw.Draw(im)
    f = ImageFont.truetype(FONT, int(290 * k * scale_letter))
    cx = cy = 256 * k
    # súradnice z SVG (baseline 345, pruh 378–392) transformované okolo stredu
    tx = lambda v: cx + (v - 256) * k * scale_letter
    d.text((tx(256), tx(345)), LETTER, font=f, fill=hexrgb(FG), anchor="ms")
    d.rounded_rectangle((tx(176), tx(378), tx(336), tx(392)), radius=7 * k * scale_letter, fill=hexrgb(BAR))
    return im.resize((size, size), Image.LANCZOS)


for size in (32, 180, 192, 512):
    render(1.0, size).save(os.path.join(OUT, f"icon-{size}.png"))
render(0.62, 512).save(os.path.join(OUT, "icon-maskable-512.png"))
print(f"ikony zapísané do {OUT} (monogram {LETTER}, {BG})")
