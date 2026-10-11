// Reads the markdown in ../content and turns it into blocks and inline HTML.
// No copy lives here: this only recognises structure and the small markup conventions from CLAUDE.md:
//   BUILD NOTE: ...  (never rendered)   {{Name}} (sidepath)   {{vi: ...}} (handwritten note)   [text] (placeholder)
import { readFileSync } from 'node:fs';
import path from 'node:path';

export type Block =
  | { t: 'h1' | 'h2' | 'h3'; text: string }
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
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      if (/^image map/i.test(h[2])) break;
      out.push({ t: (`h${h[1].length}`) as 'h1' | 'h2' | 'h3', text: h[2] });
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

const TOKEN = /\{\{vi:\s*([^}]+?)\}\}|\{\{([^}]+?)\}\}|\[([^\]]+?)\]|\*\*([^*]+?)\*\*/g;

export function sidepathButton(name: string) {
  return `<button type="button" class="sp" data-sp="${slug(name)}" aria-haspopup="dialog">${esc(name)}<span class="sp-arrow" aria-hidden="true">↗</span></button>`;
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
    else if (m[3] !== undefined) html += `<span class="ph">[${esc(m[3])}]</span>`;
    else if (m[4] !== undefined) html += `<strong>${inline(m[4], opts)}</strong>`;
    last = (m.index ?? 0) + m[0].length;
  }
  html += plain(text.slice(last), opts);
  return html.replace(/\n/g, '<br>');
}

/** Plain text of an inline string (markup removed), used for aria-labels and matching. */
export function textOf(text: string): string {
  return text.replace(/\{\{vi:\s*([^}]+?)\}\}/g, '$1').replace(/\{\{([^}]+?)\}\}/g, '$1').replace(/\*\*([^*]+?)\*\*/g, '$1');
}

/** Splits "**Lead.** rest" into lead + rest (lead keeps its punctuation). */
export function leadSplit(text: string): { lead: string; rest: string } {
  const m = /^\*\*(.+?)\*\*\s*([\s\S]*)$/.exec(text.trim());
  return m ? { lead: m[1], rest: m[2].trim() } : { lead: '', rest: text.trim() };
}
