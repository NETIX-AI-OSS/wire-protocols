import { PROTOCOLS, FAMILIES, HOOK, SITE, esc, attr, famOf, ICON, layout } from '../kit.mjs';

const LADDER = [
  { k: 'Field device', d: 'Sensors, meters, valves. Centimetres of board, then metres of cable.',
    p: ['UART', 'SPI', 'I2C', 'I3C', 'OneWire'], c: 'var(--cat-1)' },
  { k: 'Fieldbus', d: 'The plant floor. Long runs, electrical noise, equipment older than the estate.',
    p: ['RS232', 'RS485', 'Modbus', 'Profibus', 'GPIB', 'USB'], c: 'var(--cat-3)' },
  { k: 'In-vehicle', d: 'A parallel stack, not a rung of this one. Kept here because the deadlines are harder and the answers are instructive.',
    p: ['CAN', 'LIN', 'FlexRay'], c: 'var(--cat-2)' },
  { k: 'Gateway', d: 'Drivers poll the bus and republish. This is where the two halves meet.',
    p: ['MQTT'], c: 'var(--brand-600)' },
  { k: 'Cloud', d: 'Routed, retried and encrypted. Services, dashboards and the last hop to a screen.',
    p: ['IP', 'TCP', 'UDP', 'DNS', 'HTTP', 'HTTPS', 'WebSocket'], c: 'var(--cat-4)' },
];

const JOURNEY = [
  ['Meter', 'Modbus over RS-485', '#009e73'],
  ['Gateway driver', 'publishes to netix/&hellip;', '#4ba3d8'],
  ['Local broker', 'MQTT, bridged upward', '#cc79a7'],
  ['Cloud ingest', 'TCP / TLS / HTTP', '#cc79a7'],
  ['Operator screen', 'WebSocket push', '#cc79a7'],
];

export function homePage() {
  const rungs = LADDER.map((r) => `
          <div class="rung">
            <div class="rung-k"><b><span class="dot" style="background:${r.c}"></span>${esc(r.k)}</b></div>
            <p class="sm rung-d">${esc(r.d)}</p>
            <div class="rung-p">${r.p.map((sl) => {
              const m = PROTOCOLS.find((x) => x.slug === sl);
              return `<a class="chip" style="border-color:${r.c}; background:color-mix(in srgb, ${r.c} 10%, transparent); color:${r.c}" href="${m.url}/">${esc(m.name)}</a>`;
            }).join('')}</div>
          </div>`).join('');

  const journey = JOURNEY.map(([k, v, c], i) => `
            <div class="jrow"><span class="jdot" style="background:${c}; box-shadow:0 0 0 3px ${c}26"></span><b>${k}</b><span>${v}</span></div>${i < JOURNEY.length - 1 ? '\n            <div class="jbar"></div>' : ''}`).join('');

  const tabs = [{ id: 'all', name: 'All', cat: 'var(--text-muted)' }].concat(FAMILIES).map((f, i) => {
    const n = f.id === 'all' ? PROTOCOLS.length : PROTOCOLS.filter((p) => p.fam === f.id).length;
    return `
            <button class="tab" type="button" data-tab="${f.id}" aria-pressed="${i === 0 ? 'true' : 'false'}"><span class="dot" style="background:${f.cat}"></span>${esc(f.name)}<span class="tab-n">${n}</span></button>`;
  }).join('');

  const tiles = PROTOCOLS.map((p) => {
    const f = famOf(p.fam);
    const hay = `${p.name} ${p.tag} ${HOOK[p.slug]}`.toLowerCase();
    return `
            <a class="tile" href="${p.url}/" data-fam="${p.fam}" data-search="${attr(hay)}">
              <span class="tile-h"><span class="dot" style="background:${f.cat}"></span><b>${esc(p.name)}</b><span class="side-y">${p.year}</span></span>
              <p>${esc(HOOK[p.slug])}</p>
              <span class="chip">${esc(p.tag)}</span>
            </a>`;
  }).join('');

  const main = `      <section class="hero">
        <div class="hero-copy">
          <span class="over" style="color:var(--brand-600)">${SITE.org} &middot; Open reference</span>
          <h1>Wire Protocols</h1>
          <p class="hero-lede">${esc(SITE.tagline)} Written for engineers who have to make them talk to each other.</p>
          <div style="display:flex; gap:12px; flex-wrap:wrap; padding-top:2px">
            <a class="btn" href="#directory">Browse the protocols</a>
            <a class="ghost" style="padding:12px 18px" href="${SITE.repo}" rel="noopener">${ICON.github}<span>Source on GitHub</span></a>
          </div>
          <div class="stats">
            <div class="stat"><b>22</b><span class="cap">protocols</span></div>
            <div class="stat"><b>5</b><span class="cap">layers of the stack</span></div>
            <div class="stat"><b>1960&ndash;2016</b><span class="cap">still all in service</span></div>
          </div>
        </div>

        <aside class="journey" aria-label="One reading, end to end">
          <span class="over">One reading, end to end</span>
          <p>A power meter on a plant floor to a number on a screen. Every hop is a different protocol, chosen for a different constraint.</p>
          <div>${journey}
          </div>
        </aside>
      </section>

      <section class="card" style="padding:26px; margin-bottom:44px">
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:6px">
          <span class="over">The stack, bottom up</span>
          <h2 class="h2">Where each protocol actually lives</h2>
          <p class="sm" style="max-width:76ch">Protocols are usually taught as a list. They make far more sense as a ladder &mdash; each rung solving the problem the rung below could not, over a longer distance and a worse link. In-vehicle networks are the exception: a parallel stack rather than a rung, kept here because they answer the same questions under harder deadlines.</p>
        </div>${rungs}
      </section>

      <section id="directory" data-directory style="display:flex; flex-direction:column; gap:20px">
        <div style="display:flex; align-items:flex-end; gap:20px; flex-wrap:wrap">
          <div style="display:flex; flex-direction:column; gap:6px; flex:1 1 260px">
            <span class="over">Directory</span>
            <h2 class="h2"><span data-count>22</span> protocols</h2>
          </div>
          <label class="search">
            <span style="color:var(--text-tertiary); display:flex">${ICON.search}</span>
            <span class="vh">Filter protocols</span>
            <input type="search" placeholder="Filter by name or trait &nbsp; /" autocomplete="off">
          </label>
        </div>

        <div class="tabs" role="group" aria-label="Filter by family">${tabs}
        </div>

        <div class="grid">${tiles}
        </div>

        <p class="sm" data-empty hidden style="padding:32px 0; text-align:center">Nothing matches that filter.</p>
      </section>

      <section class="cta">
        <div>
          <h2 class="h2">Found something wrong?</h2>
          <p class="p">This reference is open source and every page is a file in the repository. Corrections, better diagrams and protocols we have not covered are all welcome &mdash; open an issue or send a pull request.</p>
        </div>
        <a class="ghost" style="padding:12px 18px; background:var(--surface-1)" href="${SITE.repo}" rel="noopener">${ICON.github}<span>Contribute</span></a>
      </section>`;

  return layout({
    title: SITE.name,
    description: SITE.tagline,
    canonical: '',
    nav: 'home',
    up: '',
    main,
  });
}
