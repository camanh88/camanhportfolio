// Converts the originals listed in photos.mjs to responsive WebP in public/img/ and writes src/data/images.json.
// Originals are only read. HEIC goes through macOS `sips` first (see _lib.mjs).
import sharp from 'sharp';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { PROJECT, ROOT, readable } from './_lib.mjs';
import { photos } from './photos.mjs';

const WIDTHS = [480, 960, 1600];
const OUT = path.join(ROOT, 'public', 'img');
mkdirSync(OUT, { recursive: true });
const manifest = {};

for (const [id, [rel, alt, opts = {}]] of Object.entries(photos)) {
  const src = path.join(PROJECT, rel);
  if (!existsSync(src)) { console.warn('missing', rel); continue; }
  let img = sharp(readable(src)).rotate();
  if (opts.trim) img = sharp(await img.trim({ background: '#000000', threshold: 24 }).toBuffer()); // black screenshot bars
  const meta = await sharp(await img.clone().toBuffer()).metadata();
  const [W, H] = [meta.width, meta.height];
  const widths = WIDTHS.filter((w) => w < W);
  if (!widths.length || widths[widths.length - 1] < Math.min(W, 1600)) widths.push(Math.min(W, 1600));
  for (const w of widths) {
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: w <= 480 ? 72 : 78 }).toFile(path.join(OUT, `${id}-${w}.webp`));
  }
  const top = widths[widths.length - 1];
  manifest[id] = { alt, width: top, height: Math.round((H / W) * top), widths };
  console.log(id, widths.join('/'));
}
mkdirSync(path.join(ROOT, 'src', 'data'), { recursive: true });
writeFileSync(path.join(ROOT, 'src', 'data', 'images.json'), JSON.stringify(manifest, null, 1));
