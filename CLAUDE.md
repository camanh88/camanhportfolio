# PORT 26: Cam Anh's portfolio website

## What this is

A personal portfolio website for Cam Anh (a marketer, Hanoi) for an **open application to the Marketing Department of Maison Marou** (Vietnamese craft chocolate). It is deliberately a *longer read than a CV*: a story told in chapters, read by a recruiter on a phone or a laptop. The site is in English, with a few short handwritten notes in Vietnamese.

The site must feel personal, tasteful and crafted. It is evidence of "a strong sense of taste, design and storytelling, able to translate brand essence into creative expression." It must not look like a template or an agency site.

## Folder layout

```
PORT 26/
  CLAUDE.md              this file
  content/               THE ONLY SOURCE OF TEXT (markdown)
  Design Style/          15 reference images for mood and layout
  02/ 04/                original photos, by chapter (read-only)
  [W] 26. MAROU APPLYING.docx   Cam Anh's working draft (reference only; do not parse it for copy)
  site/                  the website (create it here)
```

## Rules of work (important)

1. **All visible text comes from `content/*.md`.** Never type copy into components. If a sentence must change, change it in `content/`. Cam Anh and Claude (in claude.ai chat) edit the copy; you build around it.
2. **Never write, rewrite, "improve" or translate copy.** Do not invent testimonials, numbers, dates or captions. If you think a sentence has a typo or a mistake, leave it as is and list it in your report.
3. **Square brackets in content mean an unfinished placeholder**, for example `[Photos]` or `[in Hanoi]`. Render them visibly (a brown highlight, e.g. text `#8A4B2A` on `#F6EDE6`), and collect all of them in a generated `site/PLACEHOLDERS.md` at the end of every build session. Do not fill them in.
4. **Lines starting with `BUILD NOTE:` are instructions to you.** Never render them. Section labels written for the builder (for example "Closing") are not rendered either.
5. **`{{Name}}` marks a sidepath.** Render it as dotted-underlined text with a small ↗. Clicking opens a side panel with the text from `content/side-pages.md` (heading = the name). The reader stays on the page. One pattern for every brand and term in the whole site.
6. **`{{vi: …}}`** (not used yet) will mark a short handwritten note in Vietnamese. Build a reusable handwritten-note component (script font, slight rotation, paper or tape feel). The font MUST support Vietnamese diacritics (the `vietnamese` and `latin-ext` subsets).
7. **Original photos are read-only.** Never edit, move, rename or delete anything in `02/`, `04/`, `Design Style/` or the `.docx`. Write optimised copies to `site/public/img/` only.
8. **Do not publish anything.** Initialise git inside `site/`, commit at each milestone, but do not push or deploy until Cam Anh says so (see Tech).

## Design brief

The mood comes from the 15 images in `Design Style/`. **Open and study all of them before designing.** What they share, in words:

- **Printed editorial / zine / scrapbook.** Magazine spreads, cut-out silhouettes, collage, torn and layered paper, tape, postcards, film-strip photo rows, tabbed index dividers (like the "GRID DAILY" archive tabs), a "TABLE OF CONTENTS" spread.
- **Type is the personality.** An elegant serif for reading, paired with an oversized, expressive hand-drawn or brush script that overlaps images and body text ("The Poetry of Place", "Kitchen", the big italic "P" of "PROFILE"). Handwriting for small notes (the pink postcard, the Russian handwritten captions).
- **Warm, tactile colour.** Cream and beige paper tones; deep teal and forest green; tomato and oxblood red; mustard yellow; blush pink; near-black ink. Saturated accents against quiet paper. Starting palette to refine by eye against the references: paper `#F3EBDD`, ink `#1E1B18`, tomato `#C8442F`, oxblood `#7A1F26`, mustard `#E0A82E`, teal `#1F5A66`, forest `#2F5D3A`, blush `#E9B9B0`.
- **Food, craft, culture, human warmth.** Illustrated botanicals, patterned tiles, family photographs. Imperfect on purpose: handwritten, slightly rotated, layered.
- **Chapter pacing differs by chapter.** Chapter 01 is calm and scannable. Chapter 02 is quiet and editorial (gallery, art; "exquisite and so tranquil"). Later chapters get warmer and busier (the kitchen, gifting). Design with that arc in mind, but keep one coherent visual system.

Avoid: generic SaaS or portfolio-template looks, stock gradients, glassmorphism, emoji as decoration, dark-mode tech aesthetics, and anything that copies Maison Marou's own brand. This is Cam Anh's voice, not Marou's.

Interaction ideas that are in scope for the whole site (build the foundation now, add per chapter): sidepath panels; a clickable Contents page with "↑ Contents" back-links; a parallel-bar timeline (chapter 01); a flip-through catalogue (chapter 02); at the very end, a gift-box reveal. Motion should be subtle and purposeful, and must respect `prefers-reduced-motion`.

## Tech

- **Node.js.** Use **Astro** with static output (`output: 'static'`) unless you find a strong reason not to; say why in two lines if you pick something else. Markdown files in `content/` should feed the pages (content collections or direct import) so that editing a `.md` file updates the site.
- The site lives in `site/`. Single long page with anchored chapters (Cover → Contents → 01 → 02 …) is fine; sidepath panels open without a page change.
- **Mobile first.** Recruiters open links on phones. Magazine spreads collapse into elegant single columns. Test at 390 px and 1440 px width.
- **Images:** originals include HEIC, JPEG, WebP and PNG screenshots. Convert to WebP (with a JPEG fallback only if needed), max ~2000 px on the long edge, with responsive sizes and lazy loading. On macOS, `sips` converts HEIC; ImageMagick (`magick`) also works. Name outputs clearly (chapter-subject-n). Write alt text from what you actually see in the photo.
- **Fonts:** self-host or Google Fonts, but with Vietnamese support, `font-display: swap`.
- **Accessibility:** real headings, keyboard-reachable sidepaths (focus trap, Esc to close), sufficient contrast, `alt` on every image.
- **Git:** `git init` in `site/`. Commit at each milestone: foundation, cover, contents, chapter 01, chapter 02. Add a `.gitignore` that also keeps heavy originals out of the repo. Do not push. When Cam Anh is ready, she will create the GitHub repository and say so.
- **Hosting:** the site will be pushed to GitHub and deployed on **Hostinger**. Keep the build a plain static `dist/` folder so that either (a) Hostinger's GitHub deploy or (b) uploading `dist/` to `public_html` works. When you finish, write short step-by-step notes for both in `site/DEPLOY.md`, and ask which Hostinger plan Cam Anh has.

## How to work

- Make design decisions yourself; do not ask questions up front. Show your choices at the end so Cam Anh can react.
- Check your own work: run the dev server, take screenshots at mobile and desktop widths (Playwright is fine), look at them, and fix what looks off before reporting.
- Keep a short final report: how to run it, the main design decisions (palette, fonts, layout ideas), the placeholders still open, suspected typos you left alone, and photos that need permission.
- The chapters to be built are listed in the opening prompt of each session. Chapters not yet built appear as "coming soon" in Contents and as tidy placeholder sections.

## Chapters (status)

| Chapter | File | Status |
|---------|------|--------|
| Cover | `content/cover.md` | build now |
| Contents | `content/contents.md` | build now |
| 01 The short version | `content/ch01-short-version.md` | build now |
| 02 It started with culture | `content/ch02-it-started-with-culture.md` | build now |
| 03 Becoming whole in F&B (Lam Yên; Different kitchens) | not yet in `content/` | later |
| 04 Off the menu (gifting; the florist in me) | not yet in `content/` | later |
| 05 Why Maison Marou? | not yet in `content/` | later |
| 06 Contact | not yet in `content/` | later |
| Sidepaths and glossary | `content/side-pages.md` | used from the start |
