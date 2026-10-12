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
export const cover = { hero: cp[0] ?? '', sub: cp[1] ?? '', quote: cp[2] ?? '', label: cp[3] ?? '' };

// ---- Get to know me (contents), shown as one continuous timeline ----
export interface Role { date: string; text: string }
export interface Node { kind: 'chapter' | 'sub'; anchor: string; title: string; hint: string; years: string; roles: Role[]; photo: string }

/** "Role · Place · Type · Aug 2023 – Feb 2024" -> { text: "Role · Place · Type", date: "Aug 2023 – Feb 2024" } */
function splitDate(line: string): Role {
  const i = line.lastIndexOf(' · ');
  const tail = i >= 0 ? line.slice(i + 3) : '';
  return /\d{4}/.test(tail) ? { text: line.slice(0, i), date: tail } : { text: line, date: '' };
}
/** only the years, from the earliest to the latest role: "2024 – 2026" */
function yearsOf(roles: Role[]): string {
  const ys = roles.flatMap((r) => r.date.match(/\d{4}/g) ?? []).map(Number);
  if (!ys.length) return '';
  const [a, b] = [Math.min(...ys), Math.max(...ys)];
  return a === b ? String(a) : `${a} – ${b}`;
}

export const contents = (() => {
  const bs = visible(blocks(readContent('contents.md')));
  const nodes: Node[] = [];
  let num = '';
  let cur: Node | null = null;
  for (const b of bs) {
    if (b.t === 'h2') {
      const [n, ...t] = b.text.split('·');
      num = n.trim();
      cur = { kind: 'chapter', anchor: `ch-${num}`, title: t.join('·').trim(), hint: '', years: '', roles: [], photo: '' };
      nodes.push(cur);
    } else if (b.t === 'h3') {
      cur = { kind: 'sub', anchor: `ch-${num}`, title: b.text, hint: '', years: '', roles: [], photo: '' };
      nodes.push(cur);
    } else if (b.t === 'p' && cur) cur.hint = b.text;
    else if (b.t === 'ul' && cur) cur.roles.push(...b.items.map(splitDate));
  }
  for (const n of nodes) n.years = yearsOf(n.roles);
  // Photos in Cam Anh's numbering: 1 = chapter 01, 2.1 / 2.2 = the two sub-chapters of 02, 3, 4 = chapters 03, 04
  const ids = ['know-1', '', 'know-2-1', 'know-2-2', 'know-3', 'know-4'];
  nodes.forEach((n, i) => { n.photo = ids[i] ?? ''; });
  return { title: (bs.find((b) => b.t === 'h1') as { text: string }).text, nodes };
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

// ---- Chapters that have been designed so far (anchors) ----
export const BUILT = new Set(['ch-01']);

// ---- Chapter 01: It started with culture ----
export const ch01 = (() => {
  const raw = readContent('ch01-it-started-with-culture.md');
  const bs = blocks(raw);
  const vis = visible(bs);
  const h1 = (vis.find((b) => b.t === 'h1') as { text: string }).text;
  const [num, ...t] = h1.split('·');
  const sec: Record<string, Block[]> = {};
  let key = 'top';
  for (const b of vis) {
    if (b.t === 'h2') { key = b.text.toLowerCase(); sec[key] = []; continue; }
    (sec[key] ??= []).push(b);
  }
  const ps = (k: string) => (sec[k] ?? []).filter((b): b is Extract<Block, { t: 'p' }> => b.t === 'p').map((b) => b.text);
  const top = ps('top');
  // bold lead paragraph followed by a list: [{ lead, items }]
  const groups: { lead: string; items: string[] }[] = [];
  const acc = sec['acculturation'] ?? [];
  for (let i = 0; i < acc.length; i++) {
    const b = acc[i];
    if (b.t === 'p' && /^\*\*/.test(b.text)) {
      const nx = acc[i + 1];
      groups.push({ lead: leadSplit(b.text).lead, items: nx && nx.t === 'ul' ? nx.items : [] });
    }
  }
  const note = bs.filter((b) => b.t === 'note').map((b) => (b as { text: string }).text).join(' ');
  return {
    num: num.trim(), title: t.join('·').trim(),
    hint: top[0], role: top[1], where: top[2], story: top[3], story2: top[4],
    accTitle: (vis.find((b) => b.t === 'h2') as { text: string }).text, hlTitle: (vis.filter((b) => b.t === 'h2')[1] as { text: string }).text, accSub: ps('acculturation').find((p) => !/^\*\*/.test(p)) ?? '',
    mission: groups[0], part: groups[1],
    highlights: ps('highlights').map((p) => leadSplit(p)),
    closing: ps('closing'),
    catalogueUrl: /https?:\/\/\S+issuu\S+/.exec(note)?.[0].replace(/[.,;)]+$/, '') ?? '',
  };
})();
export const sidePageBody = (name: string) => sidePages.find((p) => p.slug === slug(name))?.body ?? [];
