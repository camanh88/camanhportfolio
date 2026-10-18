// Reads the markdown in ../content and turns it into blocks and inline HTML.
// No copy lives here: this only recognises structure and the small markup conventions from CLAUDE.md:
//   [text](https://...) (external link, opens in a new tab, shown with an arrow)
//   BUILD NOTE: ...  (never rendered)   {{Name}} (sidepath)   {{vi: ...}} (handwritten note)   [text] (placeholder)   ++text++ (underline)
import { readFileSync } from 'node:fs';
import path from 'node:path';

export type Block =
  | { t: 'h1' | 'h2' | 'h3' | 'h4'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'table'; rows: string[][] }
  | { t: 'note'; text: string };

const CONTENT_DIR = path.resolve(process.cwd(), '..', 'content');

export function readContent(file: string): string {
  return readFileSync(path.join(CONTENT_DIR, file), 'utf8');
}

/** Splits markdown into blocks. Drops everything from a "## Image map" heading on (builder-only). */
export function blocks(md: string): Block[] {
  const out: Block[] = [];
  const lines = md.replace(/\r/g, '').split('\n');
  let para: string[] = [];
  let list: string[] | null = null;
  let table: string[][] | null = null;
  const flush = () => {
    if (para.length) out.push({ t: 'p', text: para.join('\n') });
    if (list) out.push({ t: 'ul', items: list });
    if (table) out.push({ t: 'table', rows: table });
    para = []; list = null; table = null;
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    if (/^BUILD NOTE:/.test(line)) { flush(); out.push({ t: 'note', text: line }); continue; }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      if (/^image map/i.test(h[2])) break;
      out.push({ t: (`h${h[1].length}`) as 'h1' | 'h2' | 'h3' | 'h4', text: h[2] });
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      if (para.length || table) flush();
      (list ??= []).push(line.replace(/^\s*[-*]\s+/, ''));
      continue;
    }
    if (line.startsWith('|')) {
      if (para.length || list) flush();
      const cells = line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue;
      (table ??= []).push(cells);
      continue;
    }
    if (list || table) flush();
    para.push(line);
  }
  flush();
  return out;
}

/** Visible blocks only (BUILD NOTE lines removed). */
export const visible = (bs: Block[]) => bs.filter((b) => b.t !== 'note');

export const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export interface InlineOpts {
  /** terms that should always become sidepaths when they appear as plain text (e.g. a role title) */
  link?: string[];
  /** wrap these words in <span class="accent-word"> (typographic emphasis only) */
  accent?: string[];
}

const TOKEN = /\{\{vi:\s*([^}]+?)\}\}|\{\{([^}]+?)\}\}|\[([^\]]+?)\]\((https?:\/\/[^)\s]+)\)|\[([^\]]+?)\]|\*\*([^*]+?)\*\*|\+\+([^+]+?)\+\+|(?<![A-Za-z0-9])_([^_\s][^_]*?)_(?![A-Za-z0-9])/g;

export function sidepathButton(name: string) {
  return `<button type="button" class="sp" data-sp="${slug(name)}" aria-haspopup="dialog">${esc(name)}<span class="sp-arrow" aria-hidden="true">↗</span></button>`;
}

// the words "opens in a new tab" come from content/ui.md (key "new tab"), read once
let newTab: string | null = null;
const newTabLabel = () => (newTab ??= (/^- new tab:\s*(.*)$/m.exec(readContent('ui.md'))?.[1] ?? '').trim());
export function externalLink(text: string, url: string) {
  return `<a class="xl" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)}<span class="xl-arrow" aria-hidden="true">↗</span><span class="sr-only"> (${esc(newTabLabel())})</span></a>`;
}

function plain(text: string, opts: InlineOpts): string {
  let html = esc(text);
  for (const term of opts.link ?? []) {
    html = html.split(esc(term)).join(sidepathButton(term));
  }
  for (const w of opts.accent ?? []) {
    html = html.replace(new RegExp(`\\b(${w})\\b`, 'gi'), '<span class="accent-word">$1</span>');
  }
  return html;
}

export function inline(text: string, opts: InlineOpts = {}): string {
  let html = '';
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    html += plain(text.slice(last, m.index), opts);
    if (m[1] !== undefined) html += `<span class="hand-note" lang="vi">${esc(m[1])}</span>`;
    else if (m[2] !== undefined) html += sidepathButton(m[2].trim());
    else if (m[3] !== undefined) html += externalLink(m[3], m[4]);
    else if (m[5] !== undefined) html += `<span class="ph">[${esc(m[5])}]</span>`;
    else if (m[6] !== undefined) html += `<strong>${inline(m[6], opts)}</strong>`;
    else if (m[7] !== undefined) html += `<u class="ul">${inline(m[7], opts)}</u>`;
    else if (m[8] !== undefined) html += `<em>${inline(m[8], opts)}</em>`;
    last = (m.index ?? 0) + m[0].length;
  }
  html += plain(text.slice(last), opts);
  return html.replace(/\n/g, '<br>');
}

/** Plain text of an inline string (markup removed), used for aria-labels and matching. */
export function textOf(text: string): string {
  return text.replace(/\[([^\]]+?)\]\(https?:\/\/[^)\s]+\)/g, '$1').replace(/\{\{vi:\s*([^}]+?)\}\}/g, '$1').replace(/\{\{([^}]+?)\}\}/g, '$1').replace(/\*\*([^*]+?)\*\*/g, '$1').replace(/\+\+([^+]+?)\+\+/g, '$1');
}

/** Splits "**Lead.** rest" into lead + rest (lead keeps its punctuation). */
export function leadSplit(text: string): { lead: string; rest: string } {
  const m = /^\*\*(.+?)\*\*\s*([\s\S]*)$/.exec(text.trim());
  return m ? { lead: m[1], rest: m[2].trim() } : { lead: '', rest: text.trim() };
}

/** Sentences of a paragraph (a sentence ends at . ! ? ; or an ellipsis, followed by a space). */
export const sentences = (text: string) => text.trim().split(/(?<=[.!?;…]["”]?)\s+/).filter(Boolean);

/**
 * Line-break rules for display-size text, so a phrase that carries one meaning stays on one line:
 * the text is cut into units after every comma and sentence end; a very short unit that ends in a comma
 * ("Honestly," "well," "Family,") stays with the next one; the last two words of a unit are tied together so
 * no line ends on a lone word. Each unit is a <span class="u">; the stylesheet decides whether units stack.
 * Only wraps the author's own words: nothing is added or changed.
 */
export function phrases(text: string, opts: InlineOpts = {}): string {
  const words = (t: string) => t.trim().split(/\s+/).length;
  const open = (t: string) => (t.match(/_/g)?.length ?? 0) % 2 === 1 || (t.match(/\+\+/g)?.length ?? 0) % 2 === 1 || (t.match(/\*\*/g)?.length ?? 0) % 2 === 1 || t.includes('[') !== t.includes(']') || t.includes('{{') !== t.includes('}}');
  const raw = text.trim().split(/(?<=[.!?;,…]["”]?)\s+/).filter(Boolean);
  const units: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    let cur = raw[i];
    while (i + 1 < raw.length && (open(cur) || (/,$/.test(cur) && words(cur) <= 2))) cur += ' ' + raw[++i];
    units.push(cur);
  }
  return units.map((u) => {
    return `<span class="u">${inline(u, opts)}</span>`;
  }).join(' ');
}
