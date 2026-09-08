import { PROTOCOLS, FAMILIES, CMP, esc, famOf, layout } from '../kit.mjs';

const COLS = ['Wires', 'Topology', 'Rate', 'Reach', 'Delivery guarantee'];

export function comparePage() {
  const up = '../';
  const tabs = [{ id: 'all', name: 'All', cat: 'var(--text-muted)' }].concat(FAMILIES).map((f, i) => {
    const n = f.id === 'all' ? PROTOCOLS.length : PROTOCOLS.filter((p) => p.fam === f.id).length;
    return `
          <button class="tab" type="button" data-tab="${f.id}" aria-pressed="${i === 0 ? 'true' : 'false'}"><span class="dot" style="background:${f.cat}"></span>${esc(f.name)}<span class="tab-n">${n}</span></button>`;
  }).join('');

  const rows = PROTOCOLS.map((p) => {
    const f = famOf(p.fam);
    return `
            <tr data-fam="${p.fam}">
              <td><a href="${up}${p.url}/"><span class="dot" style="background:${f.cat}"></span>${esc(p.name)}</a></td>
              <td>${esc(f.short)}</td>
              ${CMP[p.slug].map((c) => `<td>${esc(c)}</td>`).join('')}
            </tr>`;
  }).join('');

  const main = `      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:8px">
        <span class="over">Reference</span>
        <h1 style="font:700 clamp(28px,3.4vw,36px)/1.1 var(--font-sans); letter-spacing:-.014em">Compare every protocol</h1>
        <p class="p" style="max-width:74ch">The same five questions asked of all twenty-eight. Rows marked <code>n/a</code> under Wires are software-layer protocols &mdash; they inherit whatever physical layer is underneath them, which is precisely the distinction people collapse when they say &ldquo;we use Modbus&rdquo;.</p>
      </div>

      <div data-compare>
        <div class="tabs" style="margin:24px 0 18px" role="group" aria-label="Filter by family">${tabs}
        </div>

        <div class="tablewrap scrollx">
          <table>
            <caption class="vh">Every protocol compared by wires, topology, rate, reach and delivery guarantee</caption>
            <thead>
              <tr><th scope="col">Protocol</th><th scope="col">Family</th>${COLS.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr>
            </thead>
            <tbody>${rows}
            </tbody>
          </table>
        </div>
      </div>

      <div class="notes">
        <div class="note">
          <span class="over" style="color:var(--cat-1)">Reading the Reach column</span>
          <p class="sm">Distance and speed trade against each other on every electrical bus here. CAN&rsquo;s 40 m is at 1 Mbit/s; drop to 125 kbit/s and it reaches 500 m. Quote both numbers or neither.</p>
        </div>
        <div class="note">
          <span class="over" style="color:var(--cat-3)">Reading the Delivery column</span>
          <p class="sm">&ldquo;None&rdquo; is not a criticism. IP and UDP decline to guarantee delivery so that something above them can choose what guarantee to pay for &mdash; which is the single most reused idea on this site.</p>
        </div>
      </div>`;

  return layout({
    title: 'Compare',
    description: 'All twenty-eight protocols side by side: wires, topology, rate, reach and delivery guarantee.',
    canonical: 'compare/',
    nav: 'compare',
    up,
    main,
  });
}
