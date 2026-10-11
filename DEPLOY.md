# Deploying PORT 26 to Hostinger

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

## Which Hostinger plan do you have?

Please tell me your plan (Premium / Business / Cloud / VPS). Route B's built-in build step needs Business or higher; on Premium route A is the reliable one.
