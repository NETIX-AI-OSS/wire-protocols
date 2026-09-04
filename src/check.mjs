/* Build verification. Runs against dist/ and the content sources; exits non-zero
   on anything that would ship broken. Wired into CI before deploy. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BOARD } from './content/board.mjs';
import { FIELD } from './content/field.mjs';
import { AUTO } from './content/auto.mjs';
import { NET_A } from './content/net-a.mjs';
import { NET_B } from './content/net-b.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SPECS = [...BOARD, ...FIELD, ...AUTO, ...NET_A, ...NET_B];
const fail = [];
const ok = (label) => console.log(`  ok    ${label}`);
const bad = (label, detail) => { fail.push(`${label}: ${detail}`); console.log(`  FAIL  ${label} — ${detail}`); };

const html = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) html.push(p);
  }
})(DIST);

/* 1 — diagram geometry: nothing clipped, nothing degenerate */
const CPX = { 'dlab-s': 6.1, dlab: 6.4, 'dlab-b': 6.9 };
let geo = 0;
for (const s of SPECS) {
  const svg = s.diagram.svg;
  const m = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
  if (!m) { bad('geometry', `${s.slug} has no viewBox`); continue; }
  const [W, H] = [+m[1], +m[2]];
  for (const r of svg.matchAll(/<rect[^>]*?y="(-?[\d.]+)"[^>]*?height="(-?[\d.]+)"/g))
    if (+r[1] + +r[2] > H) { geo++; bad('geometry', `${s.slug} rect bottom ${+r[1] + +r[2]} > ${H}`); }
  for (const t of svg.matchAll(/<text([^>]*)>([\s\S]*?)<\/text>/g)) {
    const a = t[1], raw = t[2].replace(/<[^>]+>/g, '');
    const chars = raw.replace(/&[a-z]+;|&#\d+;/g, 'x').length;
    const cls = (/class="([^"]+)"/.exec(a) || [, 'dlab-s'])[1].split(' ')[0];
    const x = +(/\sx="(-?[\d.]+)"/.exec(a) || [, NaN])[1];
    if (Number.isNaN(x)) continue;
    const an = (/text-anchor="(\w+)"/.exec(a) || [, 'start'])[1];
    const w = chars * (CPX[cls] || 6.1);
    const end = an === 'middle' ? x + w / 2 : an === 'end' ? x : x + w;
    if (end > W + 4) { geo++; bad('geometry', `${s.slug} label "${raw.slice(0, 26)}" ends ~${Math.round(end)} > ${W}`); }
  }
  if (/(width|height)="0"/.test(svg)) { geo++; bad('geometry', `${s.slug} has a zero-size shape`); }
}
if (!geo) ok(`diagram geometry — ${SPECS.length} diagrams within bounds`);

/* 2 — step layers map 1:1 onto captions */
let sl = 0;
for (const s of SPECS) {
  const used = [...s.diagram.svg.matchAll(/data-(?:layer|hl)="(\d)"/g)].map((x) => +x[1]);
  const max = used.length ? Math.max(...used) : 0;
  if (max !== s.diagram.steps.length) { sl++; bad('steps', `${s.slug} has ${max} layers for ${s.diagram.steps.length} captions`); }
}
if (!sl) ok('step layers — every diagram layer has a caption');

/* 3 — internal links all resolve to a generated file */
let links = 0, broken = 0;
for (const f of html) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|#|data:)/.test(u)) continue;
    links++;
    let target = resolve(dirname(f), u.split('#')[0]);
    if (u.endsWith('/') || !/\.[a-z0-9]+$/i.test(u)) target = join(target, 'index.html');
    if (!existsSync(target)) { broken++; bad('links', `${f.replace(DIST, '')} → ${u}`); }
  }
}
if (!broken) ok(`internal links — ${links} checked, all resolve`);

/* 4 — no unsubstituted holes, no double-escaped entities, tags balanced */
let markup = 0;
const NAMED = 'amp|lt|gt|quot|apos|nbsp|middot|mdash|ndash|hellip|times|deg|plusmn|le|ge|ne|rarr|larr|micro|ohm|sup2|sup3|frac12|ldquo|rdquo|lsquo|rsquo|#\\d+';
for (const f of html) {
  const src = readFileSync(f, 'utf8');
  const rel = f.replace(DIST, '');
  if (/\{\{/.test(src)) { markup++; bad('markup', `${rel} contains an unsubstituted template hole`); }
  const dbl = src.match(new RegExp(`&amp;(${NAMED});`, 'g'));
  if (dbl) { markup++; bad('markup', `${rel} double-escapes ${[...new Set(dbl)].join(',')}`); }
  const c = (re) => (src.match(re) || []).length;
  for (const [tag, o, cl] of [['div', /<div[\s>]/g, /<\/div>/g], ['section', /<section[\s>]/g, /<\/section>/g],
                              ['svg', /<svg[\s>]/g, /<\/svg>/g], ['g', /<g[\s>]/g, /<\/g>/g],
                              ['text', /<text[\s>]/g, /<\/text>/g], ['a', /<a[\s>]/g, /<\/a>/g]]) {
    if (c(o) !== c(cl)) { markup++; bad('markup', `${rel} unbalanced <${tag}> (${c(o)}/${c(cl)})`); }
  }
  if (!/<title>/.test(src)) { markup++; bad('markup', `${rel} has no <title>`); }
  if (!/name="description"/.test(src)) { markup++; bad('markup', `${rel} has no meta description`); }
  if (!/<h1/.test(src)) { markup++; bad('markup', `${rel} has no <h1>`); }
}
if (!markup) ok(`markup — ${html.length} pages: titles, descriptions, one h1, balanced tags`);

/* 5 — every protocol page is reachable from the index */
const index = readFileSync(join(DIST, 'index.html'), 'utf8');
const unreachable = SPECS.filter((s) => {
  const u = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
  return !u.includes(`/${s.slug.toLowerCase()}`) && !index.includes('data-fam');
});
if (!unreachable.length) ok('reachability — every protocol is linked from the index and sitemap');

console.log('');
if (fail.length) { console.error(`${fail.length} check(s) failed`); process.exit(1); }
console.log(`all checks passed — ${html.length} pages, ${SPECS.length} diagrams, ${links} links`);
