# DESIGN.md — Cam Anh's portfolio (PORT 26)

Handover for the next Claude Code session. Read this together with `../CLAUDE.md` (working rules, still valid) and `README.md` / `DEPLOY.md`.
Last updated: 14 Oct 2026. All numbers below were copied from the source files named next to them; if code and this file disagree, the code wins, then fix this file.

---

## 1. What this is, and where it stands

An open application to the **Marketing Department of Maison Marou**, told as a magazine, not a CV. Static Astro site (`output: 'static'`), English only, built to `dist/` and deployed later to Hostinger (Business plan). **Nothing has been pushed or deployed.**

**Built (5 static pages):**

| URL | Content | Component(s) |
|---|---|---|
| `/` | Cover, "I believe…" picture cloud, Get to know me (timeline), Core skills, How I work | `Cover`, `Believe`, `Contents`, `CoreSkills`, `HowIWork` |
| `/in-the-making/` | 01 It started with culture · 02 Becoming whole in F&B (Lam Yên, 9 pages) · Different kitchens (Golden Gate, Lam Yên & 123, Mono Coffee Lab) | `Ch01`, `Ch02`, `Ch03` |
| `/off-the-menu/` | My love language: gifting (emphasis) · The florist in me | `OffMenu` |
| `/why-marou/` | Why Marou? · values · story · vision · gift-box reveal · **Contact** (`#contact`) | `WhyMarou` |
| `/404.html` | Plain 404 | `pages/404.astro` |

**Not done yet:** every photo/video slot is empty on purpose (Cam Anh wanted to approve the layouts first); contact details are filled (Gmail, Phone; no LinkedIn); tablet width (768 px) has not been screenshot-tested since Chapter 01; no Lighthouse run; nothing deployed.

**Restore points (git tags in `site/`):**
- `lamyen-before-oct19` — Chapter 02 exactly as it was before Cam Anh's Oct 19 edits (new Word text, comments, page 1-3 changes). Restore with `git checkout lamyen-before-oct19 -- src/components/Ch02.astro ../content/ch02-becoming-whole-in-fb.md` (the content folder is outside git: keep a copy of the .md too).
- `lamyen-v1` — the Chapter 02 Lam Yên layout **Cam Anh approved and asked to keep**. If it is ever changed and she wants it back: `git checkout lamyen-v1 -- src/components/Ch02.astro content/ch02-becoming-whole-in-fb.md`. Do not restyle Ch02 without asking.
- `kitchens-v1` — Chapter 03 first layout draft.
- `pages-v1` — four-page structure with header, Off the menu and Why Marou.

---

## 2. Tone and mood

**One sentence:** a quiet, serious, expensive-feeling magazine; one large idea per screen, lots of white; colour arrives in whole blocks, never as decoration.

- **Magazine / editorial**: oversized thin serif titles, numbered lists with hairline rules, spreads that split 5/7 or 4/8 across a 12-column grid, pull quotes in italic, photos at precise ratios Cam Anh drew herself.
- **Quiet breathing room**: sections are separated by `--section` (6–13 rem) and headlines stand alone in white space. The brief was "tối giản, khoảng thở, khoảng tập trung cho tiêu đề".
- **Serious but warm**: Cormorant Garamond (thin, high-contrast) for voice, Inter for facts. Warmth comes from the Girly Shimmer palette and from handwriting used sparingly (cover signature only).
- **Chapter rhythm** (from CLAUDE.md): 01 calm; 02 Lam Yên is the busiest and most inventive; 03 Different kitchens is crisp and equal across three projects with Mono as the star; Off the menu is playful (menu card, ribbons); Why Marou is adventurous (road, jeep, gift box).
- **Why not scrapbook:** the first build used tape, polaroids, rotated cards, script type everywhere and a cream paper texture. Cam Anh rejected it as "rời rạc & chưa sang". Everything since is flat, grid-based, unrotated (exceptions: the hero mooncake halves, the gift-box lid, the die-cut photo shadow).
- **Voice is Cam Anh's.** Never write, translate, "improve" or shorten copy. Typos are left and reported (see §13).

---

## 3. Colour

Source of truth: `src/styles/tokens.css`. Palette = **Girly Shimmer** (`../*Design Style/girly-shimmer-color-scheme.jpg`), chosen by Cam Anh (she reminded us once: "NHỚ THEME MÀU tôi đã input!").

| Token | Hex | Role |
|---|---|---|
| `--pink` | `#F33F71` | main accent: numbers, italics, "gifting" and "contact" blocks, hover |
| `--blush` | `#EBDBD7` | soft backgrounds, quote panels, empty-slot default |
| `--cream` | `#FCEFDB` | warm paper blocks, menu card page, data rows |
| `--lime` | `#BDCC30` | highlighter underline, Golden Gate, florist, small accents on dark |
| `--plum` | `#61216A` | deep blocks (Core skills, Chapter 01 page 1, Mono café), links hover |
| `--dark` | `#2B1030` | plum darkened: night sections, photo shade, hero stages |
| `--paper` | `#FFFFFF` | **page background** (Cam Anh: "NỀN TRẮNG, trơn, đơn giản, sạch") |
| `--paper-2` | `#F6F5F2` | rare off-white |
| `--ink` | `#141312` | text |
| `--ink-soft` | `#57524B` | secondary text, hints |
| `--hair` | `rgb(20 19 18 / .16)` | hairline rules |
| `--hair-light` | `rgb(245 241 234 / .28)` | hairlines on dark |
| `--ph-bg` / `--ph-ink` | `#F6EDE6` / `#8A4B2A` | `[placeholder]` chip (CLAUDE.md rule 3) |
| `--accent` | `var(--plum)` | focus ring, `.sp:hover` |

**Legacy aliases** still referenced by older components, all remapped to the new scheme so nothing breaks: `--tomato → pink`, `--oxblood → plum`, `--mustard → lime`, `--teal → plum`, `--forest → plum`. Prefer the new names in new code; clean the old ones up only if you touch those components.

**Rules**
- Page is white. Colour comes as **full-bleed blocks** (a whole section or a tile), not as tinted cards on a tinted page.
- Text on pink / plum / dark = white or cream; on lime / blush / cream / white = `--ink`. White-on-pink is large text only (contrast ≈ 3.6:1): never use it for body copy under ~24 px. Body copy on pink in Off the menu is 1.05–1.4 rem and is the weakest contrast spot; check it if you touch it.
- Max one saturated colour per screen besides the block colour (e.g. pink block + cream accents).
- Photos that carry text are dimmed with `filter: brightness(.42–.52)` (Core skills, ACCULTURATION), not tinted with colour (Cam Anh asked to remove the pink/green overlay).

**Colour map by page (what each section already uses)**
- Home: white, Believe white with pink script, Contents white (dots teal→plum / pink / plum / lime), Core skills plum, How I work white with pink/plum rules.
- Ch01: p1 plum · p2 big photo + `--dark` · p3 cream · p4 white · p5 white · p6 white · closing `--dark`.
- Ch02: p1 cream · p2 pink + white · p3 white · p4 plum wall + cream card · p5 `--dark` hero, blush signature strip, white, pink voice panel · p6 lime/plum cards, ink strip · p7 blush/lime/plum panels · p8 cream · p9 `--dark`.
- Ch03: opener white · Golden Gate lime · Lam Yên & 123 blush · Mono: plum hero, `--dark`, plum café band, pink close.
- Off the menu: cream card · gifting pink / cream / plum / white / pink · florist lime.
- Why Marou: `--dark` road · cream values (pink / plum / lime cards) · blush story · white vision · `--dark` box · pink contact.

---

## 4. Typography

Self-hosted with `@fontsource` (imports in `src/layouts/Base.astro`, `font-display: swap`). Every family is loaded with `latin`, `latin-ext` **and `vietnamese`** subsets (CLAUDE.md rule: Vietnamese diacritics must work: "Lam Yên", "cốm", "Cô bán hàng đon đả…").

| Token | Family | Weights loaded | Use |
|---|---|---|---|
| `--display` | **Cormorant Garamond** | 300, 400, 600 + italics 300, 400 | all headings, big numbers, pull quotes, hints |
| `--sans` | **Inter** | 400, 500, 600 | body copy, labels, roles, buttons |
| `--script` | **Allura** | 400 | the cover's "I believe good food is where connection begins." (and nothing else) |
| `--hand` | **Mynerve** | 400 | `{{vi: …}}` handwritten Vietnamese notes (e.g. "Cô bán hàng đon đả, mến khách & tự tin.") |

**Why:** a very thin high-contrast serif is what made the type feel "sang & nghiêm túc" next to Cam Anh's references (Studio Eighteen "VELLA/LUCE", Floema, Helly Tống); Inter is a neutral partner that stays readable at 11–16 px. Cormorant's italic is the emotional voice. Script is limited to one line so it stays special.

**Scale (real values)**
- `body`: `clamp(1rem, .96rem + .2vw, 1.0625rem)`, `line-height: 1.65`, weight 400.
- `h1–h4` base: `--display`, weight 300 (set in `base.css`); `strong` = 500 (Ch02/03 override to 600 where a name must stand out).
- `.label`: Inter 500, `.72rem`, `line-height 1.5`, `letter-spacing .16em`, uppercase.
- Page titles: Cover hero `clamp(3.4rem, 13vw, 11.5rem)`, line-height `.92`, letter-spacing `-.035em`; Different kitchens `clamp(4.4rem, 20vw, 17rem)`; Why Marou? `clamp(4.4rem, 17vw, 16rem)`; Off the menu `clamp(3.4rem, 12vw, 10rem)`; chapter "giant" name (Lam Yên) `clamp(5.4rem, 24vw, 19rem)` → `clamp(8rem, 17vw, 17rem)` at ≥900.
- Big numerals (01, 02…): Cormorant 300, `clamp(5rem, 14vw, 12rem)`, line-height `.75`, letter-spacing `-.04em`.
- Rule of thumb: titles use **negative tracking** (`-.02em` to `-.05em`) and `line-height .84–1.05`; body never below 1 rem except `.label` and small captions (`.88–.95rem`).
- `text-wrap: balance` on hero lines.

---

## 5. Spacing, grid, motion

- `--gutter: clamp(1.25rem, 5vw, 4rem)` (page side padding). Chapter components redefine a local `--pad: clamp(1.25rem, 4vw, 4rem)`.
- `--wide: 84rem` (global `.wrap`); chapters/pages use a local `.wrap` of **`min(100% - 2*var(--pad), 88rem)`**.
- `--section: clamp(6rem, 14vw, 13rem)` between major blocks (Contents, Core skills, How I work, Ch01 highlights…). Inside a chapter, blocks use `clamp(3rem, 6vw, 6rem)` to `clamp(5rem, 11vw, 9rem)`.
- **Grid:** mobile-first single column; from **900 px** a 12-column grid (`grid-template-columns: repeat(12, 1fr)`, `column-gap: 2rem`) with common splits 5/7, 4/8, 6/6, 3/9. Breakpoints used in code: **700, 760, 800, 900, 1200 px** (900 is by far the main one: 34 rules). Header switches to a drawer at `max-width: 800px`.
- **Targets:** every button/link ≥ 44 px high (`min-height: 44px` on back button, header Contact, burger 3 rem, album/gallery buttons).
- **Easing:** `--ease: cubic-bezier(.22, .7, .2, 1)`. Typical durations: hover `.3–.4s`, reveals `1–1.1s`, scroll scenes are scroll-driven (no time).
- **Reduced motion:** every animation has a `@media (prefers-reduced-motion: reduce)` branch (17 of them): reveals show immediately, sticky scenes collapse to static (`height: auto`, `--p` fixed), the cover quote shows fully, dialogs skip fades.
- **Reveal pattern:** add class `.reveal`; `base.css` + an `IntersectionObserver` in `Base.astro` adds `.in`; `.js` class on `<html>` is set by an inline script so no-JS users see everything.

---

## 6. Component patterns

All components are Astro files in `src/components/`, with scoped `<style>`; JS is a small `<script>` per component (no framework).

**Header (`Header.astro`)** — modelled on helly-tống.com (Cam Anh's reference): white bar, name **"Cam Anh"** centred (Cormorant 400, `clamp(1.7rem, 3vw, 2.6rem)`), four links centred below (`Home`, `In the making`, `Off the menu`, `Why Marou`, Inter .95 rem), outlined **Contact** button at the right (where the reference has the language selector). Hovering or focusing a link fades in an italic **sub text** under it (labels and sub texts live in `content/nav.md`). Current page gets `aria-current="page"`, pink text and an underline. Sticky; **slides away when scrolling down, returns on scroll up**; it sets `--back-top` on `<html>` so the sticky "↑ Contents" buttons sit under it. ≤ 800 px: name + burger, full-screen drawer with large links and always-visible sub texts. Also contains the script that jumps to `#anchors` after load (tall pages otherwise land at the top).

**Footer (`Footer.astro`)** — name, the cover label ("Open application · Marketing Department"), links incl. Contact. Exists so Contact is never hidden.

**Slot (`Slot.astro`)** — an **empty place for a photo/video**: hatched fill (`repeating-linear-gradient(135deg, …)`), tone prop (`blush|cream|lime|pink|plum`), `a` prop = CSS aspect ratio (e.g. `"4 / 5"`), `kind="video"`, and a small `tag` label (`G1`, `F3`, `M5`, `5.2`…) so Cam Anh can say "put photo X in slot M5". When a real photo arrives, replace `<Slot …/>` with `<Photo id="…"/>` and add the id to `scripts/photos.mjs` (§9). Delete the `tag` when everything is filled.

**Photo (`Photo.astro`)** — `<img>` with `srcset` from `src/data/images.json` (widths 480/960/1600…), real `width/height` (no layout shift), `loading="lazy"` unless `loading="eager"`, alt text from the manifest.

**Sidepath panel (`Base.astro` + `md.ts`)** — any `{{Name}}` in content becomes a dotted-underline button with a small `↗`; clicking opens one shared native `<dialog id="sp">` (right-hand sheet ≥ 760 px, bottom sheet below), filled from `<template id="sp-tpl-slug">` made from `content/side-pages.md` (heading = name). Esc / backdrop / X close it, focus returns to the link. One pattern for every brand and term (Indochine House, Acculturation, Full-stack Marketer, Cốm, Lam Yên, …).

**"↑ Contents" button** — sticky outlined box (`border: 1px solid var(--ink)`, `padding .7rem 1rem`, `top: var(--back-top, .75rem)`, `z-index: 30`) at the top right of every chapter; links to `/#contents` (`pages.home + '#contents'`).

**Timeline (Contents.astro, "Get to know me")** — one continuous 1 px vertical line (`--p` fills it with ink as you scroll), a dot per entry (pink→filled when revealed), photo and text alternating sides ≥ 900 px. Per entry: small **year range** (Inter 500, `.95rem`, underlined, colour = theme colour), big Cormorant title (a link to the chapter), italic hint, roles each with a dated line (uppercase, plum). Photo widths are set per id (`know-1 88%`, `know-2-1 62%`, `know-2-2 92%`, `know-3 58%`, `know-4 70%`).

**Core skills (`CoreSkills.astro`)** — plum band, 2×2 tiles (1 col on phones), photo dimmed (`brightness(.42)`), heading + list on top; tile click opens a full-screen `<dialog>` with the full list (Esc closes). No colour overlay.

**Believe (`Believe.astro`)** — the "I believe…" line in Allura (`clamp(3rem, 7.2vw, 6.2rem)`, pink) centred in a sticky 100 svh frame; ~48 existing photos drift around it (3 tiers: 5 big, 13 medium, 30 tiny), each moving at its own speed with scroll (`--p`, `--s`). Pictures come from the manifest; swap the `source` ids at the top of the file when new photos arrive. The label block "Open application · Marketing Department" (`var(--oxblood)` = plum fill, white text, `.8rem`, tracking `.18em`) sits right after.

**Cover (`Cover.astro`)** — full-width 16:9 collage `COVER.jpg` shown whole (no crop), then "Hi, I'm Cam Anh." (Cormorant 300) and the marketer line with **bold** "a bigger kitchen" and "home" (no highlighter: Cam Anh removed it). A video version exists (`scripts/video.mjs`, `COVER.mp4`) but is not used.

**Album gallery (`Ch01.astro`)** — clicking either "Two living spaces" picture opens the **whole album at once** as a masonry grid (2/3/4 columns) in a full-screen `<dialog>`; header shows name + count. (Cam Anh: "không phải từng ảnh 1".)

**Sticky-track scenes** (a tall `*-track` section with a `position: sticky; height: 100svh` stage; JS writes scroll progress to `--p`, CSS moves things):
- Ch02 P5 hero "Show it the way it's meant to be enjoyed": a round slot (5.1) splits into two halves that travel `min(54vw, 36rem)` apart while a pink→lime "filling" glow grows; title fades in (`opacity .25→1`). Track `230svh`, progress held at 100 % for the last 20 %.
- Why Marou: (a) road scene, track `230svh`: two plum hills + a dotted lime road; a small SVG jeep follows `getPointAtLength` as you scroll (idea from Cam Anh's note on Marou's "Adventures in Chocolate"; shapes are drawn here, none of Marou's artwork is used); (b) gift box, track `300svh`: lid flies off (`translateY(-70svh) rotate(-24deg)`), the sentence rises, `TASTING GOOD` (lime) and `CONNECTING GOOD` (pink) in italic.

**Recurring typographic devices** (reuse, don't reinvent): big-number + title heading; highlighter underline (`linear-gradient(transparent 58%, var(--lime) 58% 92%, transparent 92%)`); drop cap (Ch01, Cormorant 500, 5.6 em); staggered closing lines (each line indented +1.5 em, last line italic lime); vertical title (`writing-mode: vertical-rl`, Golden Gate); ghost outline numeral (`-webkit-text-stroke: 1.5px var(--blush)`, "360°"); die-cut photo (arch `border-radius: 50% 50% 0 0 / 38% 38% 0 0`, white `padding`, `drop-shadow(8px 10px 0 var(--plum))`); menu card with dotted leaders (`border-bottom: 2px dotted`, Off the menu); ribbon cross (cream bands over a slot).

---

## 7. Page and section flow

```
/  (Home)
  Cover → Believe (I believe… + label) → Get to know me (#contents, timeline) → Core skills (#skills) → How I work (#how)
/in-the-making/
  Ch01 #ch-01   P1 plum spread → P2 ACCULTURATION → P3 my part → P4 Studio visits → P5 Two living spaces (albums) → P6 Catalogue 03 + In the gallery → closing "But my true dream was…"
  Ch02 #ch-02   P1 Lam Yên → P2 brief → P3 gift worth owning → P4 brand image wall → P5 HERO + kitchen + signature quotes + reels + brand image/voice → P6 season going → P7 Mid-Autumn 2024/25/26 → P8 What changed → P9 Rooted
  Ch03 #ch-02-kitchens   opener + index → #k-gg Golden Gate → #k-ly Lam Yên & 123 → #k-mono Mono Coffee Lab (hero, heart, brief, 3 photo groups, close)
/off-the-menu/   menu-card opener → #florist (01; one tall lime block laid out as Cam Anh's third mock-up (Oct 17): box photo, lily cut-out, bouquet video, window video, woman cut-out, and the F1 hero video at the END of the block (percent coordinates, same proportions at every width); node scripts/video-florist.mjs encodes the tiles (drum and hydrangea clips were dropped from the layout) → #gifting (02; G1 I give, G2 box of cake, G3 book, G4 sharing/caring, G5 connection; gifting photos placed as G1 parcel with the ribbon cross + small square card (G2), the Honestly spread (one collage PNG by Cam Anh, *Photo/04/thay thế.png), closing trio and a click-to-enlarge book photo; cut-outs are Cam Anh's own PNGs in *Photo/04/cutout (option `alpha` in photos.mjs trims them; `knockout` removes a white screenshot background)). Order follows the markdown file. Display text is wrapped in phrase units but flows as plain text (the phrase-per-line rule was tried and reverted)
/why-marou/      road hero → values → story (die-cut photo) → vision (360°) → gift box → #contact
```

- Contents links are built in `src/lib/data.ts` (`hrefFor`): `ch-01`, `ch-02`, `ch-02-kitchens` → `/in-the-making/#…`; "Off the menu" → `/off-the-menu/`; "Why Marou" → `/why-marou/`.
- End of each chapter has a hairline "next" line that points to the next page/chapter (`Ch01→#ch-02`, `Ch02→#ch-02-kitchens`, `Ch03→/off-the-menu/`).
- **Numbering mismatch:** the Word file numbers chapters 01–05 (Lam Yên = 02, Different kitchens = 03, Off the menu = 04, Why Marou = 05) while `content/contents.md` shows 01 culture, 02 Becoming whole (+ Lam Yên, Different kitchens), 03 Off the menu, 04 Why Marou. The site follows Contents; Ch03/OffMenu/WhyMarou therefore show **no number**. Ask Cam Anh before changing.

---

## 8. Content pipeline (all text lives in `../content/`)

Rule: **no copy typed in components.** Components read markdown through `src/lib/data.ts` → `src/lib/md.ts`.

| File | Feeds |
|---|---|
| `cover.md` | Cover, Believe (quote + label), page `<title>` |
| `contents.md` | Get to know me timeline (years are computed from role dates) |
| `intro-skills.md` | Core skills, How I work |
| `ch01-it-started-with-culture.md` | Ch01 |
| `ch02-becoming-whole-in-fb.md` | Ch02 (sections `## P1 … ## P9`) |
| `ch03-different-kitchens.md` | Ch03 (one `##` per project) |
| `ch04-off-the-menu.md` | Off the menu |
| `ch05-why-marou.md` | Why Marou + Contact (`## Values/Story/Vision/Gift box/Contact` are builder labels) |
| `side-pages.md` | Sidepath panels |
| `nav.md` | Header: `- key: label \| sub text` |
| `ui.md` | tiny labels: `- key: value` (Close, Expand, scroll, …) |
| `ch01-short-version.md`, `ch02-it-started-with-culture.md` | **unused** (first version; safe to delete) |

**Markup conventions** (`md.ts`): `BUILD NOTE:` lines and the `## Image map` section are never rendered · `{{Name}}` = sidepath · `{{vi: text}}` = handwritten Vietnamese note (Mynerve, rotated −2°) · `[text]` = unfinished placeholder (brown chip, collected into `PLACEHOLDERS.md` by `scripts/placeholders.mjs`, which runs before `dev` and `build`; add new content files to its `USED` list) · `**bold**` · `_italic_` · `++underline++` · `[text](https://…)` = external link (new tab, underlined with a small ↗, `.xl`; the "opens in a new tab" words come from `ui.md`). Draft marks from the Word file (`~?`, `->`, `*`) were stripped and noted in each file's BUILD NOTE.

---

## 9. Images and video

- **Originals are read-only** and live outside `site/`: `../*Photo/` (`01/Page 1…6`, `01/PHOTOSHOOT/*`, `04/Gifting`, `Cover & Introduction/*`) and `../*Design Style/` (references). The folders have a leading `*` — Cam Anh's own marker; keep the paths as they are.
- **Manifest:** `scripts/photos.mjs` — `id: [original path relative to PORT 26/, alt text written from the real picture, options]`. Options: `crop: { aspect, x, y, zoom }` (largest box of that ratio, positioned 0–1), `trim` (cut black screenshot bars), `hero` (widths 960/1600/2400), `max` (cap output width).
- **Build:** `npm run images` → `scripts/word-images.mjs` (extracts the one photo from the Word file into `tmp-img/`) then `scripts/optimize-images.mjs` → `public/img/<id>-<w>.webp` (widths 480/960/1600, quality 72 at 480 else 78) and `src/data/images.json`. HEIC goes through macOS `sips`, cached in `tmp-img/` by path+mtime+size (the cache bug that showed old photos was fixed this way).
- **Crops Cam Anh specified** (Get to know me): 1 → 3:2; 2.1 → 5:8; 2.2 → 33:20; 3 and 4 → her own pre-cropped files, untouched.
- **Filling a slot:** add the id + path + alt to `photos.mjs`, run `npm run images`, replace the `<Slot>` with `<Photo id="…" sizes="…" />` (give a `sizes` that matches the layout, e.g. `(min-width: 900px) 40vw, 100vw`).
- Cover video: `npm run video` makes 720p/540p MP4 + poster (not used right now).
- Alt text must describe what is really in the picture; decorative duplicates use `alt=""`.

---

## 10. Do / don't

**Do**
- Keep every sentence exactly as Cam Anh wrote it; list suspected typos in the report instead of fixing.
- Build from tokens (`var(--pink)` …) and the type scale above; reuse the devices in §6.
- One idea per screen; let the headline sit alone; vary layouts page by page but keep the same colours, fonts, hairlines.
- Test at **390, 768 and 1440 px**, no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`), screenshots viewed before reporting.
- Provide an `@media (prefers-reduced-motion: reduce)` branch for every animation.
- Commit per milestone with the trailer `Co-Authored-By: Claude …`; tag a milestone when Cam Anh approves a layout.
- Ask before touching anything under `lamyen-v1`.

**Don't**
- No emoji as decoration (the 😋 in the gifting text is Cam Anh's own word), no stock gradients (the only gradients are the cover shade, the jeep scene hills, the lime→pink "filling", and highlighter strokes), no glassmorphism, no dark-mode tech look, no template-y cards with shadows.
- No tape/polaroid/rotated "scrapbook" pieces (rejected).
- Don't copy Maison Marou's branding or artwork; Cam Anh's note asks for the road-and-car idea only, drawn fresh in our colours.
- Don't invent numbers, dates, testimonials or captions; don't fill `[placeholders]`.
- Don't edit, move, rename or delete originals in `../*Photo`, `../*Design Style`, or the `.docx`.
- Don't push or deploy until Cam Anh says so; don't enable analytics/cookies.
- Don't reintroduce the old chapter files (`Ch01` short-version timeline, `Catalogue` flip-book): they were replaced on purpose.

---

## 11. Accessibility and performance

- Skip link `.skip` → `#main`; one `<h1>` per page (Cover's name, Different kitchens uses `h2` inside the long page, Off the menu and Why Marou have their own `h1`); real heading order inside sections.
- Focus ring: `outline: 2px solid var(--accent); outline-offset: 4px`. Dialogs are native `<dialog>` (focus trap, Esc, focus returns to the opener).
- Sidepath buttons: `aria-haspopup="dialog"`; external links use `target="_blank" rel="noopener noreferrer"` plus an `aria-label` that says "(opens in a new tab)".
- Empty slots and decorative SVGs are `aria-hidden="true"`; the Believe photos are decorative (`alt=""`) and the section carries the quote as its `aria-label`.
- Performance: WebP only, `loading="lazy"`, intrinsic `width/height`, fonts subsetted, no JS framework. `dist/` is ≈ 13–17 MB mostly images (the photos in `public/img/` are committed so the server needs no originals).

---

## 12. File structure and commands

```
PORT 26/
  CLAUDE.md                     working rules (read first)
  content/                      THE ONLY SOURCE OF TEXT (see §8)
  *Photo/                       original photos (read-only)   *Design Style/   references (read-only)
  [W] 26. MAROU APPLYING.docx   Cam Anh's working draft (reference only)
  LamYen_full_read.docx         nine-page Lam Yên draft
  site/
    DESIGN.md  README.md  DEPLOY.md  PLACEHOLDERS.md (generated)
    astro.config.mjs  package.json  tsconfig.json  .gitignore
    public/.htaccess            Apache: gzip, cache, 404
    public/img/                 optimised WebP (generated, committed)
    scripts/                    _lib.mjs · photos.mjs (manifest) · optimize-images.mjs · word-images.mjs ·
                                placeholders.mjs · video.mjs · contact.mjs (contact sheets for reviewing folders)
    src/
      layouts/Base.astro        <head>, fonts, Header/Footer, sidepath dialog + templates, reveal observer
      pages/                    index.astro · in-the-making/ · off-the-menu/ · why-marou/ · 404.astro
      components/               Header Footer Cover Believe Contents CoreSkills HowIWork Ch01 Ch02 Ch03
                                OffMenu WhyMarou Photo Slot
      lib/md.ts                 markdown + inline markup parser
      lib/data.ts               everything the templates read (cover, contents, nav, ch01–ch05, url helpers)
      data/images.json          generated by optimize-images.mjs
      styles/tokens.css  base.css
```

Commands: `npm run dev` (http://localhost:4321) · `npm run build` (→ `dist/`) · `npm run preview` · `npm run images` · `npm run placeholders` · `npm run video`.
Git: repo is **inside `site/`** only; `.gitignore` keeps `node_modules`, `dist`, `.astro`, `tmp-img`, HEIC out. Never push (see CLAUDE.md rule 8).
Hosting: plain static `dist/` for Hostinger **Business** (`DEPLOY.md`: manual upload first, GitHub Git deploy later; the repo root must then contain both `content/` and `site/` because the build reads `../content`).

---

## 13. Known gaps, decisions waiting for Cam Anh, next steps

1. **Fill the photo/video slots** (tags): Ch02 `1.1…9.1` (+ 5.x videos), Ch03 `G1–G2`, `L1–L3`, `M1–M15` (Mono is the one to show off: hero video M1, three groups M2–M11, closing M12–M15), Off the menu `G1–G10` and `F1–F16`, Why Marou `W1–W7`. Existing photos that could go in: `*Photo/04/Gifting` (kraft-paper parcel) → gifting slots.
2. **Contact details**: `[Email] [Phone] [LinkedIn]` in `content/ch05-why-marou.md`; the header Contact button, footer and Why Marou `#contact` all point there.
3. **Copy left as written** (report, don't fix): "(to apply to Marou)", "move to Sai Gon", "myside" (ch05); "abt Cốm" (ch02 Collab with Gia); "its hard" (ch02 P4); P8 mixes Vietnamese into English ("đi đầu trong sáng tạo…", "qua mỗi mùa trung thu") and the heading "Kết luận / Nhìn lại / What changed"; ch03 punctuation tweak (" - with" → ", with") in the 123 line; `[views]`, `[image]`, `[…]`, "About Lam Yen" empty (ch02).
4. **Side pages still "[coming soon]"**: Lam Yên, Mono Coffee Lab, Golden Gate JSC, 123 Restaurant; Indochine House has `[in Hanoi]` and `[One line…]`.
5. **Nav sub texts** in `content/nav.md` are the builder's proposal (e.g. "My working experience"); Cam Anh may rewrite.
6. **Low-res photo**: `w-bike` (Why Marou) is 327×440 from the Word file; ask for the original.
7. **Photos to clear for permission before going public:** artists' works and people in Studio Visit images, the villa and apartment, the Marou-style product references (none are used), gift/Lam Yên packaging shots.
8. **Housekeeping**: delete unused `content/ch01-short-version.md` and `ch02-it-started-with-culture.md`; remove legacy colour aliases once no component uses them; `scripts/video.mjs` and `Believe`'s reuse of existing photos are placeholders for Cam Anh's own images.
9. **Before launch:** test at 768 px, run Lighthouse, check Vietnamese diacritics in headings, fill Contact, then follow `DEPLOY.md` (ask which GitHub repo layout she wants).

---

## 14. Lam Yên chapter, round 3 (21 Oct 2026): what changed and the new building blocks

Source: Cam Anh's note "LAM YEN R3" and the layouts she drew (`*Photo/02/Layout/`). Photos from `*Photo/02/Photo/<page>`; the old slots 1.1 to 9.1 are now photos, except 5.5 to 5.9 and 6.1 to 6.3 (links to videos, see below).

- **New inline marks (`src/lib/md.ts`)**: `{{tip: words | message}}` = small message on hover, focus or tap, with a small "i" (used for "Cốm Đặc Sản" in the 2026 panel); `{{link: words}}` = a link whose address is still missing (dotted underline and arrow like a sidepath, not clickable; used for "Mei Chan", the sentence ends with the placeholder `[link]`); nested bullets (an indented `  - item` belongs to the item above, `Block.subs`).
- **Video addresses** live in `BUILD NOTE: LINKS <name>: url url …` lines of `content/ch02-becoming-whole-in-fb.md` (`ch02.links` in `data.ts`): `reels` (5 tiles of page 5), `season` (the two cards of page 6, the card title is the link), `mochi` (3 tiles). Tiles show a hatched slot with a play button and an arrow; the picture comes later.
- **Page 4**: full-page wall (three rows, columns as fr from her screenshot, rows keep a fixed aspect ratio) around the cream card. **Page 5**: the real mooncake (`Break.png`, white knocked out) splits in two; kitchen photo column = percentage collage (298 × 853 frame) with the looping video `lyv-pull-*.mp4` (`node scripts/video-ly.mjs`). **Page 6**: "The challenge" has a thin red hand-drawn ring (SVG, drawn on scroll); the Tết paragraph is grey and sits under the heading; the green arrow is placed by script from "Summer, our quiet season" to "We have led the way…"; four Gia photos in a stepped collage (709 × 820 frame). **Page 7**: each panel cover (`ly-7-1..3`) opens a native `<dialog>` gallery (`.gal`): 7.1 justified rows, 7.2 two columns (caption = the old "Store Opening" side page), 7.3 rows + a horizontally scrolling strip. **Page 8**: six lines with their own styles (01 big plum, 02 plain, 03 italic pink, 04 and 05 indented small sans, 06 italic with the Mei Chan link). **Page 9**: new text, photo `9..jpg`.
- **Bag page background** now comes from the PDF (`node scripts/ly-bag-bg.mjs`, renders `LAMYEN-túi-NHỎ & VỪA.pdf` large with macOS Quick Look, keeps the pattern above the logo and fades it to cream `#FDF9E1`).
- **Changed on purpose**: "About Lam Yen" panel is plum (was pink); only the "Full Stack Marketer" title is plum (the other job titles are bold ink); the line "I worked directly with…" sits under the photo; "So I said…" is italic pink; the luxury / Marou line is a small italic note.
- Backups of the previous content: `content/ch02-becoming-whole-in-fb.BEFORE-oct21.md`, `content/side-pages.BEFORE-oct21.md`.

---

## 15. Different kitchens round 1 (22 Oct 2026) and the next-page links

Source: note "DIFFERENT KITCHEN R1" and `*Photo/03` (folders Golden gate, L..., M..., Mono feedback, Chỉnh sửa, each with Cam Anh's layout picture).

- **Golden Gate**: three numbered lines, then two "learned" lines (small sans, arrow); the old G1/G2 slots became a collage of her five documents (percent positions from her layout, `.gg-collage`, sticky on desktop). `gg-proposal` is cropped to hide the white margin of the screenshot (`crop` in `photos.mjs`). `IMG_0027.PNG` (a phone screenshot of the Instagram page) is in the folder but not in her layout: unused.
- **Lam Yên & 123**: photos `k-l1`, `k-l2` (4:3 crop of portrait originals).
- **Mono, 01 On social**: scattered collage of 13 photos on cream (`socTiles`, positions in pixels of her layout; two-column wall on phones); each photo opens in a large viewer (`#mono-lb`, arrows and arrow keys). The Before → After pair (M2/M3) and `[Gallery link]` stay below, still empty. **03 Summer Brunch launch**: the nine guest opinion cards in a stepped, tilted row that scrolls sideways (`.fb`, skewY(-9deg), `--i` steps), each opens large. **Conclusion**: the two old phrases on the left, the sentence "And it showed me…" on the right (pink italic).
- **Next-page link** (`Base.astro`, `.pg-next`): at the foot of every page, above the footer: Home → In the making → Off the menu → Why Marou → Home. Labels and sub texts come from `content/nav.md`, the word "Next" from `ui.md` (`next page`).
- **Lam Yên (from the "Chỉnh sửa" folder)**: photo 2 of page 3 is replaced (`ly-3-2`, 4:5 crop of the pink boxes); the last page (P9) now sits on a blurred, darkened photo (`ly-p9-bg`) with the text left and the street photo right, no big quotation mark.
- Backup: `content/ch03-different-kitchens.BEFORE-oct22.md`.

---

## 16. Overview round 1 (23 Oct 2026, note "TONG QUAN R1")

- **Shared picture viewer** (`Base.astro`, `#lb`): any element with `data-lb-group="name"` opens the photos of that group in order, over a light, blurred wash of the page (not black), with arrows, arrow keys and a slide transition. Used by the Ch01 album galleries, Lam Yên page 4 (Brand's image) and Mono (the 13 photos and the 9 guest cards).
- **`{{pic: words | id}}`** (`md.ts`): a picture appears next to the pointer (mouse), or under a tap; ids start with `pic-` and are listed in `photos.mjs` (first one: `pic-illustration` = "this illustration.jpg", square like the bag pictures).
- **Product-name marks** (`DISH_RE` in `md.ts`): in the dev server and in `PUBLIC_REVIEW` builds the names (cốm, mochi, bánh …) are highlighted in orange; never in the public build. `node scripts/dish-names.mjs` writes `DISH-NAMES.md` (every place). Open question for Cam Anh: Vietnamese or English for each.
- **Header**: "Marketing Applicant" under "Cam Anh" (`nav.md`, key `role`). **Next-page link**: small, at the right, no hover colour change. **Core skills** background is green (`--green: #2F5D3A`).
- **Home**: greeting "Hi Marou, I'm Cam Anh."; the "I believe" cloud uses mostly food photos with some people (`source` in `Believe.astro`). The cover photo is NOT changed yet (no new file received).
- **Chapter 01**: bold role line; marks in the story and in "Two living spaces" (bold, underline, bold-italic-underline); ACCULTURATION cover = `Accul - ẢNH ĐỔI.jpg`; mission lines bigger and bold; living-spaces text moved down and the vertical photo's white border thinner (.22rem); album galleries = two columns on full width (villa on cream, apartment on white); catalogue link fixed (the address was not found before: regex in `data.ts`) and the title turns plum on hover; the closing lines turn up one by one as the page is scrolled (`[data-close]`).
- **Lam Yên**: "Make it a gift worth owning" in one column (photos side by side, arrow →); the signature-bag page follows her layout (plum panel with the three bags, pairs of seasonal bags, front over back; fronts are cut from the PDFs by `scripts/ly-bag-faces.mjs` into `scripts/derived/`); new video `1023.mov` (`scripts/video-ly.mjs`); links only on "Cốm Milk Tea" and "Snow Skin Mooncake (Bánh Dẻo)"; Gia Restaurant opens its website; Mid-Autumn bold words; What changed: 01 italic, 03 upright, no link on Mei Chan; last page photo brighter and sharp.
- **Different kitchens**: Sakura Yakiniku on its own line; collage no longer sticky (it could cover the closing line); L photos landscape (the class was not reaching the image: use `:global` for classes passed to `<Photo>`); Mono: no Before/After, two tiles re-centred, the guest cards are a fanned, overlapping row, the closing sentence is smaller.
- **Why Marou**: the statement and the three values turn up one after another (sticky scenes on wide screens, per-item on phones); the dotted road in the story is drawn downwards while scrolling; the vision text appears only after scrolling further.
- Backups: `content/*.BEFORE-oct23.md`.


---

## 17. Overview round 2 (26 Oct 2026, note "TONG QUAN R2", folder `TONG QUAN R2/`)

- **Home**: the cover is her new `COVER final.jpg` (white ground, no red-to-green gradient behind it; the page is white, so it sits flush). The gradient layer that used to sit under the collage is gone with the old file.
- **Side panels** (`side-pages.md`, `data.ts` `sidePages`, `Base.astro`): a heading written `## [Name](url)` makes the panel title a link (dotted underline avoided, small arrow); `BUILD NOTE: IMAGES id id …` puts cover photos in the panel (the first on top, the next ones before the second, third paragraph …; `loading="eager"`). New panels: Indochine House (cover + her text + link), Full Stack Marketer (two lines, bold, bolder inside panels), About Lam Yen (sidenote 1 cut to a landscape, sidenote 2 under the first paragraph), 123 Restaurant (cover + text + link), Mono Coffee Lab (cover).
- **Lam Yên, "Make it a gift worth owning"**: runs the full width from the left under its headline; from 1100 px the packaging text is on the left and the before → after photos on the right. The three parts get a **coloured tab** (`.part`): THE PACKAGING (pink), BRAND'S IMAGE (plum), BRAND'S VOICE (lime); the second BRAND'S IMAGE, on the "show it" page, is an outlined reminder tab with a small ↺. "Let's play with pattern…" is a true semi-bold italic (Cormorant 600 italic added), about a fifth lighter than before. The Marou line sits on the left and slides in when scrolled to. Reels: her screenshots, order 3-2-1-4-5 (links go with the pictures); Mochi: main video and two small ones (screenshots), main 19 rem wide.
- **Different kitchens**: L3 and M1 photos placed (M1 is the full-bleed Mono hero, number 03 moved up so it does not touch the title); "[Gallery link]" removed; **03 Summer Brunch launch** = one main photo on the left (opens large) and the nine guest cards huddled on the right (phones: photo, then the cards in a sideways-scrolling row).
- **Why Marou**: "I do!" pink on the same line; the three value cards hold photo collages in her proportions (`collages` in `WhyMarou.astro`, percent boxes; the width is limited by the screen height so the three cards fit one screen); the story is text on the left and the W4 photo on the right with the dotted road over both; the vision is set over the cacao photo (W5): lead sentence top-left, "as the best chocolate in Asia," right, "and as the sweetest way…" bottom-left, each turning up as scrolled (phones: stacked).
- Backups: `content/*.BEFORE-oct26.md`.

---

## 18. Overview round 3 (26 Oct 2026, note "TONG QUAN R3")

- **Get to know me**: every job title is bold (700), the brand name is plain (`contents.md`).
- **Side panels**: every photo is a button (`.sp-zoom`, group `sp-<name>`) that opens the shared blurred viewer. `BUILD NOTE: IMAGES AFTER a b` puts photo n after paragraph n (About Lam Yen: bold **Lam Yên**, photo 1, paragraph 2 with its last phrase underlined, photo 2).
- **ACCULTURATION block**: the big photo again, blurred and darkened, behind the title and the mission (`.p2-bgblur`). NOTE: `scripts/optimize-images.mjs` now also looks for the decomposed (NFD) spelling of a file name; without it "Accul - ẢNH ĐỔI.jpg" was silently dropped when the images were rebuilt in round 2.
- **Lam Yên**: "Make it a gift worth owning" is three steps (headline / THE PACKAGING with its three things and a rule under it / photos with "Renewed the whole packaging…"); reels show pictures 1 to 5 in order with their own links; Tết 2025 is back to the first layout and the two small videos have swapped links; "Gia Restaurant" is on one line; the Mei Chan line has no link on the name but a separate "link" at the end; the last page's three paragraphs turn up one after another (timed, 2.2 s apart, after the page is reached).
- **Different kitchens**: "That's where I started thinking beyond marketing." is a square-bracket placeholder (to be rewritten).
- **Why Marou**: the story section is white; "as the best chocolate in Asia," is bigger and moved left of the right edge.
- Backups: `content/*.BEFORE-oct26.md` (taken at the start of round 2).

---

## 19. Overview round 4 (27 Oct 2026, note "TONG QUAN R4", folder `TONG QUAN R4 `)

- **Get to know me**: the Mono Coffee Lab and Golden Gate JSC role lines link to `/in-the-making/#k-mono` and `#k-gg` (dotted underline and an arrow, `.rlink`).
- **Galleries of "Two living spaces"**: photos in the order the files were added to her folders (`villaOrder`, `aptOrder` in `Ch01.astro`; the villa order starts with the console, the rocking chair and the jar with the hibiscus, as in her sample); big gaps and margins (`--g: clamp(.9rem, 4vw, 4.2rem)`), the grid is at most 84 rem wide.
- **Side panels**: `{{Name | words shown}}` in `md.ts` (a sidepath whose label differs from its name); `BUILD NOTE: IMAGES END id` puts photos after the last paragraph. About Lam Yen: photo 1 at the top, the last phrase italic, "Cốm Tú Lệ" opens **About Cốm** (her new text, photo 2 at the end). A panel opened from inside another panel keeps the side it opened from and shows a small "← name" link back (`.sp-back`). Mono panel: her new line under the cover. Photos in panels are real buttons that open the blurred viewer.
- **Names**: product names unified in `ch02` (Cốm Xào Mooncake / Mooncakes, Cốm Milk Tea, Cốm Mochi; only the headline keeps "Mochi"); "Snow Skin Mooncake (Bánh Dẻo Cốm Xào)"; "(seasonal product)" italic. The orange review marks (`DISH_RE`) and `DISH-NAMES.md` are removed.
- **Lam Yên**: the wall of "Shaping the brand's image" shows its photos one after another (`.rvl`; NOTE: the class `.rv` is taken by the review note, never reuse it); the hand note is moved 2 cm right; the arrows under RESULTS are smaller, sans-serif; more air under "What changed"; the Tết 2025 right-hand text starts level with the grey paragraph (her sketch).
- **Different kitchens**: 01 On social: photos turn up one after another; the focaccia tile is her new photo (`mono-9`); 02 In the café: clipboard menu photo → Brunch cover (page 1 of her `.ai`, rendered with macOS Quick Look into `scripts/derived/brunch-cover.png`) which opens the viewer, the five menu pages stacked and jumping up in turn, then the four design pictures as a collage with the caption "Creative Direction & Design Refinement" (in `content`, italic); 03: main photo on the right, the nine guest cards as a deck that moves with the scroll (sticky track, `data-deck`); the closing page writes itself in three steps; "Different roles got me thinking beyond marketing." replaces the placeholder.
- **Off the menu**: "arranging flowers." italic; the "We don't just give a gift…" page: three lines, then three photos, one after another.
- **Why Marou**: cards 01 and 02 share one frame (883 x 1125 in her units), the third photo of card 03 is cut higher; the contact page has a gift box on wheels that drives from left to right along the hills while the words appear behind it (mask driven by the box; the "Contact" link lands on the finished state, `#contact` is a marker at the end of the track).
- **Home**: the woman-in-yellow photo `ly-4-2` is out of the "I believe" cloud.
- Fixed on the way: `:global()` inside the `is:global` style of `Base.astro` (two warnings, rules were ignored).

---

## 20. Overview round 5 (27 Oct 2026, note "TONG QUAN R5", folder `TONG QUAN R5`) and the spelling pass

- **Spelling and punctuation** (all of `content/`, not BUILD NOTE lines): "aming" → "aiming", "its hard" → "it's hard", "that is hard" → "that are hard", "I weren't" → "I wasn't", missing closing quote after "a gift worth owning", "launch/ relaunch" → "launch/relaunch", the trailing full stop of "Organise the Acculturation exhibitions" removed (the other bullets have none), US spellings in her new text unified to British (savour, flavours), "Full-stack Marketer" → "Full Stack Marketer" in `contents.md`, "..." → "…", a spaced hyphen → en dash in the Mono line. Straight apostrophes and quotes (Off the menu, Why Marou, nav, contents, a few lines elsewhere) became curly (’ “ ”). Left as she asked: "không bứ", "U.S. Embassy in Vietnam", and the text inside the catalogue pictures.
- **Get to know me**: the two role lines that lead to the projects have no dotted line or arrow; colour change and underline on hover, like the other links.
- **About Lam Yen**: only the word "Cốm" is the link to About Cốm: dotted underline, lime highlight, no arrow (`#sp-content .sp[data-sp="about-com"]` in `Base.astro`).
- **Lam Yên**: "How a traditional gift became a daily sweet treat" is a small italic line under the Lam Yên picture (page 2); results 02 and 03 are set in the sans-serif.
- **Different kitchens, 02 In the café**: split into the finished product on plum (clipboard menu photo, a closed pile of the five white menu pages, an arrow, the Brunch book) and the creative process on its own cream band (a closed pile of the four design pictures + the caption). Everything else opens only on click. The **Brunch book opens the whole catalogue**: Cam Anh's `Mono Brunch Menu (draft).pdf` (29 pages) rendered with macOS PDFKit (`scripts/pdf-pages.js`) into `scripts/derived/catalogue/cat-NN.jpg`, ids `mono-cat-01..29`, group `cat` in the blurred viewer (pages 2–29 are hidden buttons in `.cat-rest`).
- **03 Summer Brunch launch**: as her input: text and a small **deck of guest cards** on the left, the main photo on the right. The deck is a widget of its own (buttons, swipe or drag, arrow keys when it has focus; no wheel, no scroll tie-in), so the page scroll is never touched. The front card opens the viewer; a click on a card behind brings it forward.
- **Off the menu**: the last three photos appear at the same time (after the three lines).
- **Why Marou**: card 01's first photo is a closer, lower crop on the chocolate stacks (`w1-a`, crop in `photos.mjs`); card 03's lower photo is cut a little lower (object-position 80%).

---

## 21. In the café, tuned to Cam Anh's picture, and the Brunch book (27 Oct 2026, third message)

- **Layout of 02** (`Ch03.astro`): heading and list on the left; clipboard photo over the pile of white menu pages, an arrow (lime), the big Brunch cover with a soft glow; the creative process is a cream card (max 52 rem) under them on the left. Caption "Mono Brunch Menu (Draft)" (her words, in `content/ch03-…md`, italic) sits right under the cover.
- **The Brunch book** (`#bk` dialog, script at the foot of `Ch03.astro`): opens from the cover and turns like a book. Two-page spread on wide screens (the cover alone on the first turn, the last leaf is the back cover), one page at a time under 760 px. 3D leaf flip (`rotateY`, 1 s), buttons, arrow keys, a click on the right or left page, or a swipe; Esc or the cross closes; counter "2–3 / 29". The 29 pages are `mono-cat-01..29` (rendered from her PDF with `scripts/pdf-pages.js`). Pages are built by the script, so the leaf and face CSS uses `:global()` inside `.bk-book`.
- UI labels added to `ui.md`: previous page, next catalogue page, close catalogue.

---

## 22. 02 In the café, layout R6 (27 Oct 2026, folder `R6`)

The whole section is the menu spread itself: `R6/Screenshot 2026-10-27 at 14.35.28.png` (id `cafe-spread`, full-bleed, `object-position: 50% 80%`, a dark left half and a warmer, dimmer right half, a soft glow behind the book). On wide screens everything sits in her positions, as percentages of a 1604 x 940 stage: heading and the three lines (no dashes) on the photo, the clipboard menu photo and the pile of white menu pages across the seam, the lime arrow, the Brunch cover on the brown page with "Mono Brunch Menu (Draft)" under it (opens the book), and the creative-process pile with its caption lower left on the photo. Phones: the same pieces stacked on the spread, darkened. The cream card is gone.

- Tweaks (same day): background 30% darker (`filter: brightness(.7)` on the spread), the three lines have their dashes back and are set at the body size like the sub text of the other parts, the Creative Direction pile and caption are 15% smaller.

---

## 23. Background music (27 Oct 2026)

`Music.astro` (in `Base.astro`, so on every main page): one track for the whole site, **off by default**. A round button, bottom-right just left of the review note, plays and pauses it (fade 1.8 s in, 0.9 s out). The audio is created only when the button is pressed (nothing is downloaded before). It loops, pauses while the tab is hidden, and the choice and the position are remembered in `localStorage` (`port26-music`) so that the next page carries on; if the browser still wants a click, it starts at the first click or key press. Labels "Play music" / "Pause music" are in `content/ui.md`. **The button only exists when the file `public/audio/music.mp3` (or `.m4a`) is present**; the file is not in the repo yet (needs Cam Anh's track and its licence). Tested with a temporary tone, which was removed.

- **Music source (29 Oct)**: Cam Anh chose a YouTube video ("a quiet playlist for a quiet heart (calm/relax piano)", Little Thing, id `BBz7-F9mdUE`, `content/ui.md` key `music youtube`). It is not copied or downloaded: the same button starts YouTube's own embedded player (nocookie host, loaded only on the first press), shown as a small 200 x 200 card above the button while the music plays (YouTube's rules do not allow hiding its player). If a file `public/audio/music.mp3` exists it takes over and the card is not used. Not Cam Anh's track: its use depends on YouTube and on the owner keeping embedding on.
- Results lines 02 and 03 of the Mochi block are another 30% smaller (`.574em`, arrows kept readable).
- The review note is saved in the browser (`localStorage` key `port26-review-note`) and, from the dev server, in `site/review-note.md` (git-ignored). A copy of the file is in `Review notes archive/` at the project root.

---

## 24. Music behaviour, review note, Contact (29 Oct 2026)

- **Review note removed from the site** (`<ReviewNote />` is no longer in `Base.astro`; the component file stays, it only renders with `PUBLIC_REVIEW=1` and the line added back). Her notes: `site/review-note.md` and `Review notes archive/`.
- **Music** (`Music.astro`): the track starts by itself when a page opens (muted, because browsers refuse sound before a gesture) and turns audible at the first click, tap or key press anywhere (a click on the music button itself also does it). Button at the bottom right: pressed while playing = fade out (0.9 s) and stop, the note icon shows a diagonal slash; pressed again = fade in and continue. No YouTube picture is visible any more (the player is kept transparent in the corner: this goes against YouTube's own rules for its player, Cam Anh's choice). "Off" is remembered on the other pages; the position of the track too.
- **Contact** (header, footer, menu): on the Why Marou page it jumps straight to the closing page (instant scroll, no run through the whole page); from the other pages the link opens Why Marou at the closing page.

---

## 25. Overview R6 (30 Oct 2026, folder `TONG QUAN R6`)

- **Store Opening line** (gallery 2025): "Four years of selling online, a year of brand building, and one team pulling together: Lam Yên opened its first physical store in Hanoi." (`side-pages.md`); one photo added to that gallery (`ly-72-i`, the "Cốm xào vảy vàng" card, end of the second column).
- **Music**: it no longer starts by itself. The first press of the button plays the track from the beginning (fade in); the button is off (slash) until then. A quiet hint, italic grey in a pale pill, "For a better experience ↘" (text in `ui.md`, key `music hint`), shows once (about 14 s) near the button until it is pressed; it is not shown again on other pages. If the button was left on, the next page tries to carry on from the same place; if the browser refuses, the button stays off.
- **My contact / My CV** (Why Marou, closing page): "Contact:" is "My contact:", and under the list a "My CV" link opens `site/public/cv/CV_Nguyen_Cam_Anh.pdf` (her `CV_Nguyen Cam Anh.pdf`) in a new tab. To change the CV, replace that file.
- **Golden Gate**: the collage is at most 64% of the screen height (`.gg-collage`), so the whole cluster stays in view.
