# 1960 Labs print collateral

This folder holds the CEO business card and the A5 event flyer, both built on the 1960 Labs brand system v1.0.

- `out/*_press.pdf` are print-ready files with crop marks. `out/*_bleed.pdf` are the same files at trim + bleed, with no marks.
- `out/PRINT-SPEC.md` is the spec sheet for the print shop: sizes, bleed, stock and CMYK values.
- `out/preview/` holds PNG previews.

## Regenerate

Edit the `CEO` details or the `CLIENTS` list at the top of `make_print.py`, then run:

```bash
pip install reportlab segno
python3 print/make_print.py
```

To make the previews again, install poppler and run `pdftoppm -r 220 -png out/<file>.pdf out/preview/<name>`.

Fonts: Inter Tight and JetBrains Mono, both under the SIL Open Font License 1.1.
