/* Local preview. Builds, then serves dist/ on :4173 with directory-index resolution. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT || 4173);

execFileSync(process.execPath, [join(ROOT, 'src', 'build.mjs')], { stdio: 'inherit' });

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let p = join(DIST, normalize(url).replace(/^(\.\.[/\\])+/, ''));
  try {
    const st = await stat(p).catch(() => null);
    if (!st || st.isDirectory()) p = join(p, 'index.html');
    const body = await readFile(p);
    res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
  } catch {
    const body = await readFile(join(DIST, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(body);
  }
}).listen(PORT, () => console.log(`serving dist/ on http://localhost:${PORT}`));
