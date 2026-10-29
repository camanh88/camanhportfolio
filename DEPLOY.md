# Deploying PORT 26 to Hostinger

## Quick start (29 Oct 2026): going live in 10 minutes
A ready-made zip is in `PORT 26/Upload to Hostinger/port26-website.zip` (the built site: pages, photos, videos, `.htaccess`).
1. hPanel → **Websites → Manage → File Manager → public_html**. Delete Hostinger's default files (`default.php`, `index.php`…).
2. **Upload** the zip into `public_html`, right-click it → **Extract** here. Check that `index.html` and `.htaccess` sit directly in `public_html` (not inside a sub-folder). Delete the zip.
3. Open the domain; open the four pages and the "Contact" button; test the music button and the Brunch book on your phone.
4. To update later: edit `content/` or the site, run `npm run build` in `site/`, zip the **contents** of `dist/` again and repeat.


The build is a plain static folder: `dist/`. Nothing runs on a server. Either route below works.

Before anything: `npm install` once, then `npm run build`. The result is `site/dist/`.

## A. Upload `dist/` by hand (simplest, works on every Hostinger plan)

1. Run `npm run build` on your computer.
2. In Hostinger hPanel open **Websites → Manage → File Manager** (or connect with FTP).
3. Open `public_html`. Delete the default `index.php` / placeholder files Hostinger put there.
4. Upload the **contents** of `dist/` (not the `dist` folder itself) into `public_html`: `index.html`, `404.html`, `_astro/`, `img/`, `.htaccess`.
   Tip: zip the contents of `dist/`, upload the zip, then use *Extract* in File Manager.
5. Open your domain. Hard refresh (Cmd+Shift+R) if you still see the old page.
6. Repeat steps 1–5 each time the text in `content/` or the photos change.

## B. Deploy from GitHub (Hostinger Git integration)

You create the GitHub repository; nothing has been pushed yet.

1. On GitHub create an empty repository (private is fine). Tell Claude, who will then run `git remote add origin …` and `git push` from `site/`.
2. Make sure `dist/` is **not** committed (it is in `.gitignore`). Hostinger builds it.
3. In hPanel open **Websites → Manage → Git** (or **Deployments → Node.js / Websites from GitHub**, wording depends on the plan) and connect the repository.
4. Build settings:
   - Framework: Astro (or "Other")
   - Node version: 20 or newer (the project was built with Node 24)
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output / publish directory: `dist`
5. Deploy. After this, every push to the main branch redeploys.

If your plan has no build step for GitHub (plain Shared hosting), use the GitHub deploy only to copy files and commit a built `dist/` to a separate `deploy` branch, or just use route A.

### Important for both routes
- `content/` and the photo originals (`02/`, `04/`) live **outside** `site/`. Build on a machine that has the whole `PORT 26` folder, or copy `content/` next to `site/` in the repository. The build reads `../content/*.md`.
- Optimised photos are already in `site/public/img/` and are committed, so the server never needs the originals.
- `public/.htaccess` turns on compression and caching on Apache (Hostinger shared plans).

## Your plan: Hostinger Business

Business includes Git deployment in hPanel, so route B is available. Recommended order:

1. First go live with **route A** (upload `dist/`): it needs nothing but File Manager and is the quickest way to see the real domain.
2. When you create the GitHub repository, switch to **route B** so every push redeploys.

Because the build reads `../content/*.md`, route B only works if the repository root contains both `content/` and `site/` (the whole `PORT 26` folder minus the heavy originals `Photo/`, `Design Style/` and the `.docx`). When you are ready, tell Claude and the repository will be set up that way; the build directory in hPanel is then `site` and the output is `site/dist`. The exact menu names in hPanel change from time to time, so check them when you get there.
