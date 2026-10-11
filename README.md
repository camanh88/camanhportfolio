# PORT 26: Cam Anh's portfolio

Open application to the Marketing Department of Maison Marou. Astro, static output.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serve dist/ locally
npm run images     # re-optimise photos (macOS: needs `sips` for HEIC) -> public/img/ + src/data/images.json
npm run placeholders   # regenerate PLACEHOLDERS.md
```

- **All words** live in `../content/*.md` (chapter text, side pages, and the few interface labels in `ui.md`). Edit there; the site updates.
- Photos: manifest and alt text in `scripts/photos.mjs`. Originals in `../02` and `../04` are never touched.
- `{{Name}}` = sidepath (text in `content/side-pages.md`), `[text]` = open placeholder, `{{vi: …}}` = handwritten Vietnamese note, `BUILD NOTE:` lines are never rendered.
- Deploy notes: `DEPLOY.md`. Open placeholders: `PLACEHOLDERS.md`.
