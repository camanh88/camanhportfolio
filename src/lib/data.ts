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

// ---- Get to know me (contents), shown as one continuous timeline ----
export interface Role { date: string; text: string }
export interface Node { kind: 'chapter' | 'sub'; anchor: string; title: string; hint: string; date: string; roles: Role[]; photo: string }

/** "Role · Place · Type · Aug 2023 – Feb 2024" -> { text: "Role · Place · Type", date: "Aug 2023 – Feb 2024" } */
function splitDate(line: string): Role {
  const i = line.lastIndexOf(' · ');
  const tail = i >= 0 ? line.slice(i + 3) : '';
  return /\d{4}/.test(tail) ? { text: line.slice(0, i), date: tail } : { text: line, date: '' };
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
      cur = { kind: 'chapter', anchor: `ch-${num}`, title: t.join('·').trim(), hint: '', date: '', roles: [], photo: `know-${num}` };
      nodes.push(cur);
    } else if (b.t === 'h3') {
      cur = { kind: 'sub', anchor: `ch-${num}`, title: b.text, hint: '', date: '', roles: [], photo: '' };
      nodes.push(cur);
    } else if (b.t === 'p' && cur) cur.hint = b.text;
    else if (b.t === 'ul' && cur) cur.roles.push(...b.items.map(splitDate));
  }
  // The year range of the first role moves to the top of its entry; later roles keep their own date in front.
  for (const n of nodes) if (n.roles[0]?.date) { n.date = n.roles[0].date; n.roles[0] = { ...n.roles[0], date: '' }; }
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
