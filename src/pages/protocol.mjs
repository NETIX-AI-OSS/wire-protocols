import { PROTOCOLS, FAMILIES, esc, attr, famOf, metaOf, ICON, layout } from '../kit.mjs';

export function protocolPage(s) {
  const meta = metaOf(s.slug);
  const f = famOf(meta.fam);
  const i = PROTOCOLS.indexOf(meta);
  const prev = PROTOCOLS[i - 1], next = PROTOCOLS[i + 1];
  const up = '../';

  const facts = s.facts.map(([k, v]) => `
        <div class="fact"><span class="over">${esc(k)}</span><b>${esc(v)}</b></div>`).join('');

  const pills = s.diagram.steps.map((st, n) => `
            <button class="tab" type="button" aria-pressed="${n === 0 ? 'true' : 'false'}"><span class="tab-n">${n + 1}</span>${esc(st.label)}</button>`).join('');

  // Without JS these carry the full explanation; the script hides them and drives the stepper.
  const allCaps = s.diagram.steps.map((st, n) => `
          <li><b>${n + 1}. ${esc(st.label)}.</b> ${esc(st.caption)}</li>`).join('');

  const how = s.how.map((b) => `
          <section><h3 class="h3">${esc(b.h)}</h3><p class="p">${esc(b.p)}</p></section>`).join('');

  const warns = s.gotchas.map((g) => `
          <div class="warn-i">${ICON.alert}<div><b>${esc(g.t)}</b><span class="sm">${esc(g.p)}</span></div></div>`).join('');

  const pts = s.netix.points.map((p) => `
          <li>${esc(p)}</li>`).join('');

  const stepsJson = attr(JSON.stringify(s.diagram.steps.map((st) => [st.label, st.caption])));

  const main = `      <nav class="crumbs" aria-label="Breadcrumb">
        <a class="cap" href="${up}">Protocols</a>
        <span class="cap sep">/</span>
        <a class="cap" href="${up}compare/">${esc(f.name)}</a>
        <span class="cap sep">/</span>
        <span class="cap">${esc(meta.name)}</span>
      </nav>

      <div class="title-row">
        <div class="title-l">
          <div class="title-n">
            <h1>${esc(meta.name)}</h1>
            <span class="chip" style="border-color:${f.cat}; background:color-mix(in srgb, ${f.cat} 12%, transparent); color:${f.cat}"><span class="dot" style="background:${f.cat}"></span>${esc(f.short)}</span>
          </div>
          <p class="p">${esc(s.expand)}</p>
        </div>
        <div class="year"><span class="over">Introduced</span><b>${meta.year}</b></div>
      </div>

      <p class="lede">${esc(s.oneLine)}</p>

      <div class="facts">${facts}
      </div>

      <figure class="card fig" data-diagram data-steps="${stepsJson}">
        <div class="fig-h">
          <div>
            <span class="over">Diagram</span>
            <h2 class="h2">${esc(s.diagram.title)}</h2>
            <p class="sm">${esc(s.diagram.sub)}</p>
          </div>
          <div class="arrows">
            <button class="icon-btn" type="button" data-prev aria-label="Previous step">${ICON.left}</button>
            <button class="icon-btn" type="button" data-next aria-label="Next step">${ICON.right}</button>
          </div>
        </div>

        <div class="steps" role="group" aria-label="Diagram steps">${pills}
        </div>

        <p class="sm scrollhint">Scroll the diagram sideways to follow it — each step brings its own part into view.</p>

        <div class="plate scrollx">
${s.diagram.svg}
        </div>

        <figcaption class="stepcap"><span class="n">STEP 1</span><p></p></figcaption>
        <ol class="stepcap-all">${allCaps}
        </ol>
        <p class="vh" data-live aria-live="polite"></p>
      </figure>

      <div class="two">
        <div class="how">
          <div class="how-h"><span class="over">How it works</span><i></i></div>${how}
        </div>
        <aside class="warn" aria-label="Common pitfalls">
          <span class="over">Watch out for</span>${warns}
        </aside>
      </div>

      <section class="netix">
        <div class="netix-h">${ICON.node}<span class="over">In a NETIX deployment</span></div>
        <p>${esc(s.netix.lead)}</p>
        <ul>${pts}
        </ul>
      </section>

      <nav class="pager" aria-label="Adjacent protocols">
        ${prev ? `<a class="card" href="${up}${prev.url}/"><span class="cap">&larr; Previous</span><b>${esc(prev.name)}</b></a>` : '<span style="flex:1"></span>'}
        ${next ? `<a class="card to-next" href="${up}${next.url}/"><span class="cap">Next &rarr;</span><b>${esc(next.name)}</b></a>` : '<span style="flex:1"></span>'}
      </nav>`;

  return layout({
    title: meta.name,
    description: s.oneLine.replace(/\s+/g, ' ').slice(0, 180),
    canonical: `${meta.url}/`,
    nav: 'home',
    active: s.slug,
    up,
    main,
  });
}
