// Page data derived from content/*.md. Every string that reaches a template comes from here or from content.
import { blocks, visible, readContent, slug, leadSplit, type Block } from './md';
import images from '../data/images.json';

export const imageMeta = images as Record<string, { alt: string; width: number; height: number; widths: number[] }>;

const paras = (bs: Block[]) => bs.filter((b): b is Extract<Block, { t: 'p' }> => b.t === 'p').map((b) => b.text);

// ---- UI labels (content/ui.md) ----
export const ui: Record<string, string> = Object.fromEntries(
  readContent('ui.md').split('\n').filter((l) => /^- [^:]+:/.test(l)).map((l) => { const i = l.indexOf(':'); return [l.slice(2, i).trim(), l.slice(i + 1).trim()]; }),
);

// ---- Cover ----
const cp = paras(visible(blocks(readContent('cover.md'))));
export const cover = { hero: cp[0] ?? '', sub: cp[1] ?? '', quote: cp[2] ?? '', label: cp[3] ?? '', go: cp[4] ?? '' };

// ---- Get to know me (contents) ----
export interface Sub { title: string; hint: string; roles: string[] }
export interface Chapter { num: string; title: string; hint: string; roles: string[]; subs: Sub[]; photo: string }
export const contents = (() => {
  const bs = visible(blocks(readContent('contents.md')));
  const chapters: Chapter[] = [];
  let ch: Chapter | null = null;
  let sub: Sub | null = null;
  for (const b of bs) {
    if (b.t === 'h2') {
      const [num, ...t] = b.text.split('·');
      ch = { num: num.trim(), title: t.join('·').trim(), hint: '', roles: [], subs: [], photo: `know-${num.trim()}` };
      chapters.push(ch); sub = null;
    } else if (b.t === 'h3' && ch) { sub = { title: b.text, hint: '', roles: [] }; ch.subs.push(sub); }
    else if (b.t === 'p' && ch) { (sub ?? ch).hint = b.text; }
    else if (b.t === 'ul' && ch) { (sub ?? ch).roles.push(...b.items); }
  }
  return { title: (bs.find((b) => b.t === 'h1') as { text: string }).text, chapters };
})();

// ---- Introduction: core skills + how I work ----
export const intro = (() => {
  const bs = visible(blocks(readContent('intro-skills.md')));
  const out: Record<'skills' | 'how', { title: string; items: { lead: string; rest: string }[] }> = {
    skills: { title: '', items: [] }, how: { title: '', items: [] },
  };
  let cur: 'skills' | 'how' | null = null;
  for (const b of bs) {
    if (b.t === 'h2') { cur = /skill/i.test(b.text) ? 'skills' : 'how'; out[cur].title = b.text; }
    else if (b.t === 'p' && cur) { const { lead, rest } = leadSplit(b.text); out[cur].items.push({ lead, rest }); }
  }
  return out;
})();

// ---- Side pages (sidepath panel) ----
export interface SidePage { name: string; slug: string; body: string[]; wantsPhoto: boolean }
export const sidePages: SidePage[] = (() => {
  const out: SidePage[] = [];
  let cur: SidePage | null = null;
  for (const b of blocks(readContent('side-pages.md'))) {
    if (b.t === 'h2') { cur = { name: b.text, slug: slug(b.text), body: [], wantsPhoto: false }; out.push(cur); }
    else if (cur && b.t === 'p') cur.body.push(b.text);
    else if (cur && b.t === 'note' && /photo/i.test(b.text)) cur.wantsPhoto = true;
  }
  return out;
})();
