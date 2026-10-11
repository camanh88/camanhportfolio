// Page data derived from content/*.md. Every string that reaches a template comes from here or from content.
import { blocks, visible, readContent, slug, type Block } from './md';
import images from '../data/images.json';

export const imageMeta = images as Record<string, { alt: string; width: number; height: number; widths: number[] }>;

const paras = (bs: Block[]) => bs.filter((b): b is Extract<Block, { t: 'p' }> => b.t === 'p').map((b) => b.text);

// ---- UI labels (content/ui.md) ----
export const ui: Record<string, string> = Object.fromEntries(
  readContent('ui.md').split('\n').filter((l) => /^- [^:]+:/.test(l)).map((l) => { const i = l.indexOf(':'); return [l.slice(2, i).trim(), l.slice(i + 1).trim()]; }),
);

// ---- Cover ----
const coverP = paras(visible(blocks(readContent('cover.md'))));
export const cover = { hero: coverP[0] ?? '', quote: coverP[1] ?? '', label: coverP[2] ?? '' };

// ---- Contents ----
const cb = visible(blocks(readContent('contents.md')));
export const contents = {
  title: (cb.find((b) => b.t === 'h1') as any)?.text ?? 'Contents',
  intro: paras(cb)[0] ?? '',
  rows: ((cb.find((b) => b.t === 'table') as any)?.rows ?? []).slice(1).map(([num, title, teaser]: string[]) => ({
    num: num.replace(/\s*↳.*/, ''),
    sub: /↳/.test(num),
    title,
    teaser,
  })) as { num: string; sub: boolean; title: string; teaser: string }[],
};
export const BUILT = new Set(['01', '02']);
export const backLabel = `↑ ${contents.title}`;

// ---- Side pages ----
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
export const sidePage = (name: string) => sidePages.find((s) => s.slug === slug(name));

// ---- Chapter 01 ----
const c1 = blocks(readContent('ch01-short-version.md'));
const c1v = visible(c1);
export interface Bar { role: string; where: string; type: string; start: string; end: string; label: string; group: string }
export const ch01 = (() => {
  const h1 = (c1v.find((b) => b.t === 'h1') as any).text as string;
  const [num, ...t] = h1.split('·');
  const sections: { h: string; level: 2 | 3; ps: string[]; ul: string[] }[] = [];
  let cur: (typeof sections)[number] | null = null;
  for (const b of c1v) {
    if (b.t === 'h2' || b.t === 'h3') { cur = { h: b.text, level: b.t === 'h2' ? 2 : 3, ps: [], ul: [] }; sections.push(cur); }
    else if (cur && b.t === 'p') cur.ps.push(b.text);
    else if (cur && b.t === 'ul') cur.ul.push(...b.items);
  }
  const table = ((c1.find((b) => b.t === 'table') as any)?.rows ?? []).slice(1) as string[][];
  const items = sections.flatMap((s) => s.ul.map((label) => ({ label, group: s.h })));
  const bars: Bar[] = table.map(([role, where, type, start, end]) => {
    const it = items.find((i) => i.label.replace(/\{\{|\}\}/g, '').startsWith(role));
    return { role, where, type, start, end, label: it?.label ?? role, group: it?.group ?? '' };
  });
  const experience = sections.find((s) => s.level === 2 && s.ps.length && s.ul.length);
  const skills = sections.find((s) => s.h === 'Core skills') ?? sections.find((s) => s.level === 2 && s.ps.length > 2 && !s.ul.length);
  const how = sections.filter((s) => s.level === 2).find((s) => s !== experience && s !== skills);
  return {
    num: num.trim(), title: t.join('·').trim(),
    teaser: paras(c1v)[0],
    sections, bars, experience, skills, how,
  };
})();

// ---- Chapter 02 ----
const c2 = visible(blocks(readContent('ch02-it-started-with-culture.md')));
export const ch02 = (() => {
  const h1 = (c2.find((b) => b.t === 'h1') as any).text as string;
  const [num, ...t] = h1.split('·');
  const idx = (pred: (b: Block) => boolean) => c2.findIndex(pred);
  const iAcc = idx((b) => b.t === 'h2');
  const iCat = idx((b) => b.t === 'h3');
  const iHi = c2.findIndex((b, i) => b.t === 'h3' && i > iCat);
  const iClose = c2.findIndex((b, i) => b.t === 'h3' && i > iHi);
  const intro = paras(c2.slice(1, iAcc));
  const accBlocks = c2.slice(iAcc + 1, iCat);
  const catBlocks = c2.slice(iCat + 1, iHi);
  const hiBlocks = c2.slice(iHi + 1, iClose);
  return {
    num: num.trim(), title: t.join('·').trim(),
    teaser: intro[0], role: intro[1], where: intro[2], story: intro.slice(3),
    accTitle: (c2[iAcc] as any).text as string, accSub: paras(accBlocks)[0], accTerm: paras(accBlocks)[1],
    catTitle: (c2[iCat] as any).text as string, mission: paras(catBlocks)[0], partLead: paras(catBlocks)[1],
    part: (catBlocks.find((b) => b.t === 'ul') as any)?.items as string[],
    hiTitle: (c2[iHi] as any).text as string, highlights: paras(hiBlocks),
    closingParas: paras(c2.slice(iClose + 1)),
  };
})();

export const photoIds = (prefix: string) => Object.keys(imageMeta).filter((k) => k.startsWith(prefix)).sort((a, b) => parseInt(a.split('-').pop()!) - parseInt(b.split('-').pop()!));
