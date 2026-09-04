/* Static site generator. Zero runtime dependencies — `node src/build.mjs` writes dist/. */
import { mkdirSync, writeFileSync, rmSync, cpSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PROTOCOLS, SITE, metaOf, layout, esc } from './kit.mjs';
import { BOARD } from './content/board.mjs';
import { FIELD } from './content/field.mjs';
import { AUTO } from './content/auto.mjs';
import { NET_A } from './content/net-a.mjs';
import { NET_B } from './content/net-b.mjs';
import { protocolPage } from './pages/protocol.mjs';
import { homePage } from './pages/home.mjs';
import { comparePage } from './pages/compare.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SPECS = [...BOARD, ...FIELD, ...AUTO, ...NET_A, ...NET_B];

/* --- integrity: the registry and the content must describe the same 22 things --- */
const specSlugs = SPECS.map((s) => s.slug).sort();
const regSlugs = PROTOCOLS.map((p) => p.slug).sort();
if (specSlugs.join() !== regSlugs.join()) {
  const missing = regSlugs.filter((s) => !specSlugs.includes(s));
  const extra = specSlugs.filter((s) => !regSlugs.includes(s));
  throw new Error(`registry/content mismatch — missing content: [${missing}] · unregistered content: [${extra}]`);
}
for (const s of SPECS) {
  const bad = [];
  if (s.facts.length !== 5) bad.push(`facts=${s.facts.length}`);
  if (s.gotchas.length !== 4) bad.push(`gotchas=${s.gotchas.length}`);
  if (!s.diagram || !s.diagram.steps.length) bad.push('no diagram steps');
  const used = [...s.diagram.svg.matchAll(/data-(?:layer|hl)="(\d)"/g)].map((m) => +m[1]);
  const max = used.length ? Math.max(...used) : 0;
  if (max !== s.diagram.steps.length) bad.push(`${max} diagram layers vs ${s.diagram.steps.length} steps`);
  if (/\{\{/.test(s.diagram.svg)) bad.push('unsubstituted template hole in svg');
  if (bad.length) throw new Error(`${s.slug}: ${bad.join(', ')}`);
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const write = (rel, body) => {
  const p = join(DIST, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, body);
};

/* --- pages --- */
write('index.html', homePage());
write('compare/index.html', comparePage());
for (const s of SPECS) write(`${metaOf(s.slug).url}/index.html`, protocolPage(s));

/* --- 404 --- */
write('404.html', layout({
  title: 'Page not found',
  description: 'That page does not exist on this site.',
  canonical: '404.html',
  nav: '', up: '',
  main: `      <section style="padding:80px 0; display:flex; flex-direction:column; gap:16px; align-items:flex-start">
        <span class="over">404</span>
        <h1 style="font:700 40px/44px var(--font-sans); letter-spacing:-.02em">That page is not here</h1>
        <p class="p" style="max-width:56ch">The protocol you were looking for may have moved, or the link may be wrong. Every protocol on this site is listed in the sidebar and on the index.</p>
        <a class="btn" href="./">Back to the index</a>
      </section>`,
}));

/* --- sitemap + robots + Jekyll opt-out --- */
const urls = ['', 'compare/', ...PROTOCOLS.map((p) => `${p.url}/`)];
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE.base}/${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.base}/sitemap.xml\n`);
write('.nojekyll', '');

/* --- static assets --- */
cpSync(join(ROOT, 'static'), DIST, { recursive: true });

/* --- report --- */
let files = 0, bytes = 0;
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p); else { files++; bytes += st.size; }
  }
})(DIST);
console.log(`built ${urls.length} pages + 404 → dist/  (${files} files, ${(bytes / 1024).toFixed(0)} KB)`);
