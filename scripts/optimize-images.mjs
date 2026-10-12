// Converts the originals listed in photos.mjs to responsive WebP in public/img/ and writes src/data/images.json.
// Originals are only read. HEIC goes through macOS `sips` first (see _lib.mjs).
import sharp from 'sharp';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { PROJECT, ROOT, readable } from './_lib.mjs';
import { photos } from './photos.mjs';

const WIDTHS = [480, 960, 1600];
const HERO_WIDTHS = [960, 1600, 2400];
const OUT = path.join(ROOT, 'public', 'img');
mkdirSync(OUT, { recursive: true });
const manifest = {};

for (const [id, [rel, alt, opts = {}]] of Object.entries(photos)) {
  const src = path.join(PROJECT, rel);
  if (!existsSync(src)) { console.warn('missing', rel); continue; }
  let img = sharp(readable(src)).rotate();
  if (opts.trim) img = sharp(await img.trim({ background: '#000000', threshold: 24 }).toBuffer()); // black screenshot bars
  if (opts.crop) { // largest box of the wanted aspect; x / y place it inside the leftover space (0..1)
    const buf = await img.toBuffer(); const m = await sharp(buf).metadata();
    const a = opts.crop.aspect;
    let cw = m.width, ch = Math.round(m.width / a);
    if (ch > m.height) { ch = m.height; cw = Math.round(m.height * a); }
    const z = opts.crop.zoom ?? 1; cw = Math.round(cw / z); ch = Math.round(ch / z); // zoom > 1 = tighter crop
    img = sharp(buf).extract({ left: Math.round((m.width - cw) * (opts.crop.x ?? 0.5)), top: Math.round((m.height - ch) * (opts.crop.y ?? 0.5)), width: cw, height: ch });
  }
  const meta = await sharp(await img.clone().toBuffer()).metadata();
  const [W, H] = [meta.width, meta.height];
  const widths = (opts.hero ? HERO_WIDTHS : WIDTHS).filter((w) => w < W && (!opts.max || w <= opts.max));
  const cap = Math.min(W, opts.max ?? 1600);
  if (!widths.length || widths[widths.length - 1] < cap) widths.push(cap);
  for (const w of widths) {
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: w <= 480 ? 72 : 78 }).toFile(path.join(OUT, `${id}-${w}.webp`));
  }
  const top = widths[widths.length - 1];
  manifest[id] = { alt, width: top, height: Math.round((H / W) * top), widths };
  console.log(id, widths.join('/'));
}
mkdirSync(path.join(ROOT, 'src', 'data'), { recursive: true });
writeFileSync(path.join(ROOT, 'src', 'data', 'images.json'), JSON.stringify(manifest, null, 1));
