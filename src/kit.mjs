/* Site registry and page shell. */

export const SITE = {
  name: 'Wire Protocols',
  org: 'NETIX-AI-OSS',
  repo: 'https://github.com/NETIX-AI-OSS/wire-protocols',
  base: process.env.SITE_BASE || 'https://netix-ai-oss.github.io/wire-protocols',
  tagline: 'Twenty-two protocols, from two centimetres of board trace to the public internet — each with the diagram that actually explains it.',
};

export const FAMILIES = [
  { id: 'board', name: 'On-board buses',    short: 'On-board',   cat: 'var(--cat-1)', dot: '#0072b2' },
  { id: 'field', name: 'Serial & fieldbus', short: 'Fieldbus',   cat: 'var(--cat-3)', dot: '#009e73' },
  { id: 'auto',  name: 'Automotive',        short: 'Automotive', cat: 'var(--cat-2)', dot: '#e69f00' },
  { id: 'net',   name: 'Internet',          short: 'Internet',   cat: 'var(--cat-4)', dot: '#cc79a7' },
];

export const PROTOCOLS = [
  { slug: 'UART',      url: 'uart',      name: 'UART',      fam: 'board', tag: 'Async serial',      year: '1960s' },
  { slug: 'SPI',       url: 'spi',       name: 'SPI',       fam: 'board', tag: 'Sync 4-wire',       year: '1979' },
  { slug: 'I2C',       url: 'i2c',       name: 'I²C',       fam: 'board', tag: 'Sync 2-wire',       year: '1982' },
  { slug: 'I3C',       url: 'i3c',       name: 'I3C',       fam: 'board', tag: 'Sync 2-wire',       year: '2016' },
  { slug: 'OneWire',   url: '1-wire',    name: '1-Wire',    fam: 'board', tag: 'Single wire',       year: '1990s' },
  { slug: 'RS232',     url: 'rs-232',    name: 'RS-232',    fam: 'field', tag: 'Point-to-point',    year: '1960' },
  { slug: 'RS485',     url: 'rs-485',    name: 'RS-485',    fam: 'field', tag: 'Differential bus',  year: '1983' },
  { slug: 'Modbus',    url: 'modbus',    name: 'Modbus',    fam: 'field', tag: 'Request/response',  year: '1979' },
  { slug: 'Profibus',  url: 'profibus',  name: 'Profibus',  fam: 'field', tag: 'Token passing',     year: '1989' },
  { slug: 'GPIB',      url: 'gpib',      name: 'GPIB',      fam: 'field', tag: 'Instrument bus',    year: '1965' },
  { slug: 'USB',       url: 'usb',       name: 'USB',       fam: 'field', tag: 'Host-driven',       year: '1996' },
  { slug: 'CAN',       url: 'can',       name: 'CAN',       fam: 'auto',  tag: 'Arbitrated bus',    year: '1983' },
  { slug: 'LIN',       url: 'lin',       name: 'LIN',       fam: 'auto',  tag: 'Single-wire',       year: '1999' },
  { slug: 'FlexRay',   url: 'flexray',   name: 'FlexRay',   fam: 'auto',  tag: 'Time-triggered',    year: '2000' },
  { slug: 'IP',        url: 'ip',        name: 'IP',        fam: 'net',   tag: 'Packet routing',    year: '1981' },
  { slug: 'TCP',       url: 'tcp',       name: 'TCP',       fam: 'net',   tag: 'Reliable stream',   year: '1981' },
  { slug: 'UDP',       url: 'udp',       name: 'UDP',       fam: 'net',   tag: 'Datagram',          year: '1980' },
  { slug: 'DNS',       url: 'dns',       name: 'DNS',       fam: 'net',   tag: 'Name resolution',   year: '1983' },
  { slug: 'HTTP',      url: 'http',      name: 'HTTP',      fam: 'net',   tag: 'Request/response',  year: '1989' },
  { slug: 'HTTPS',     url: 'https',     name: 'HTTPS',     fam: 'net',   tag: 'TLS transport',     year: '1994' },
  { slug: 'MQTT',      url: 'mqtt',      name: 'MQTT',      fam: 'net',   tag: 'Publish/subscribe', year: '1999' },
  { slug: 'WebSocket', url: 'websocket', name: 'WebSocket', fam: 'net',   tag: 'Full duplex',       year: '2011' },
];

export const HOOK = {
  UART: 'Two wires, no clock, an agreed baud rate. The simplest conversation two chips can have.',
  SPI:  'A shared clock removes every guess — at the cost of one select wire per device.',
  I2C:  'Two wires, 112 addresses, and an acknowledgement after every single byte.',
  I3C:  'I²C at ten times the speed, with the interrupt wire folded into the data line.',
  OneWire: 'One conductor carries the data and powers the device that sends it.',
  RS232: 'Huge voltage swings to beat noise — until ground stops being the same at both ends.',
  RS485: 'Send it twice, inverted. The noise cancels and 1,200 metres becomes possible.',
  Modbus: 'The language spoken on the copper. Registers, one master, and a four-decade install base.',
  Profibus: 'A token circulating at speed, so arrival time is a calculation rather than a hope.',
  GPIB: 'Stackable cables and a talker/listener model, still running calibration labs.',
  USB: 'Host-driven, packet-based, and now tunnelling display and 240 watts down one cable.',
  CAN: 'Two nodes transmit at once and nothing is lost. The arbitration trick worth studying.',
  LIN: 'One wire and a sync byte, so a window switch does not need a crystal.',
  FlexRay: 'Slots on a shared clock. Your braking data has a timeslot nothing can take.',
  IP: 'Best-effort packets with no memory, which is exactly why the network survives damage.',
  TCP: 'Handshake, sequence, acknowledge, retransmit — everything IP declines to promise.',
  UDP: 'Eight bytes and no apologies. A late frame is worth less than the next one.',
  DNS: 'A database nobody holds a copy of, answered from cache in under 50 ms.',
  HTTP: 'A method, a path, a status code — and thirty years of making it concurrent.',
  HTTPS: 'Prove who you are, agree a key without sending it, then encrypt everything.',
  MQTT: 'Publish to a topic, subscribe to a pattern. Built for links that keep dropping.',
  WebSocket: 'Open as HTTP, upgrade, and never ask again — the server pushes when it changes.',
};

export const CMP = {
  UART:      ['2', 'Point-to-point', '115.2 kbaud', 'Set by levels', 'None'],
  SPI:       ['3 + 1 CS each', 'Single controller', '1–100 Mbit/s', '~0.3 m', 'None'],
  I2C:       ['2', 'Multi-drop, 112 addr', '100k–1 Mbit/s', '~1 m', 'Per-byte ACK'],
  I3C:       ['2', 'Multi-drop, dynamic', '12.5 Mbit/s', '~1 m', 'Per-byte ACK'],
  OneWire:   ['1', 'Multi-drop, 64-bit ID', '15.4 kbit/s', '100 m', 'CRC'],
  RS232:     ['3', 'Point-to-point', '115.2 kbaud', '15 m', 'None'],
  RS485:     ['2', 'Multi-drop, 32 loads', '100 k – 10 Mbit/s', '1,200 m at 100 k', 'None (electrical)'],
  Modbus:    ['n/a', 'One master, 247 IDs', 'Link-limited', 'Link-limited', 'CRC + exception'],
  Profibus:  ['2', 'Token ring + poll', '9.6 k – 12 Mbit/s', '1,200 m at 9.6 k', 'Bounded worst case'],
  GPIB:      ['24', 'Daisy chain, 15 max', '~1 MByte/s', '20 m total', 'Interlocked'],
  USB:       ['4+', 'Tiered star, 127', '1.5 Mbit–40 Gbit/s', '0.8 – 5 m by rate', 'ACK / NAK / STALL'],
  CAN:       ['2', 'Multi-master bus', '1 Mbit/s', '40 m at 1 M', 'ACK + error counters'],
  LIN:       ['1', 'Master + 16 slaves', '20 kbit/s', '40 m', 'Checksum'],
  FlexRay:   ['2 × 2', 'TDMA, dual channel', '10 Mbit/s ×2', '24 m', 'Time-guaranteed'],
  IP:        ['n/a', 'Routed, global', 'Link-limited', 'Global', 'None by design'],
  TCP:       ['n/a', 'Point-to-point', 'Link-limited', 'Global', 'Guaranteed, ordered'],
  UDP:       ['n/a', 'Datagram, any', 'Link-limited', 'Global', 'None by design'],
  DNS:       ['n/a', 'Hierarchical', '2 packets typical', 'Global', 'Cached, TTL-bound'],
  HTTP:      ['n/a', 'Client / server', 'Link-limited', 'Global', 'Inherits TCP'],
  HTTPS:     ['n/a', 'Client / server', 'Link-limited', 'Global', 'TCP + integrity'],
  MQTT:      ['n/a', 'Pub/sub via broker', '2-byte fixed header', 'Global', 'QoS 0 / 1 / 2'],
  WebSocket: ['n/a', 'Persistent duplex', 'Link-limited', 'Global', 'Inherits TCP'],
};

const NAMED = 'amp|lt|gt|quot|apos|nbsp|middot|mdash|ndash|hellip|times|deg|plusmn|le|ge|ne|rarr|larr|micro|ohm|sup2|sup3|frac12|ldquo|rdquo|lsquo|rsquo';
export const esc = (s) => String(s).replace(new RegExp('&(?!(' + NAMED + '|#\\d+);)', 'g'), '&amp;');
export const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
export const famOf = (id) => FAMILIES.find((f) => f.id === id);
export const metaOf = (slug) => PROTOCOLS.find((p) => p.slug === slug);

export const ICON = {
  github: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  left:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  right: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  alert: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  node:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  menu:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  sun:   '<svg class="theme-light" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>',
  moon:  '<svg class="theme-dark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
};

const WORDMARK = '<svg width="94" height="18" viewBox="0 0 94 18" fill="none" role="img" aria-label="NETIX.AI"><path d="M11.306 8.45275V0.870388H15.8281V17.4608L5.19262 9.40324V17H0.670567V0.409542L11.306 8.45275ZM19.2096 0.870388H28.7506V4.75878H23.7389V6.86139H27.9513V10.7498H23.7389V13.1116H29.0962V17H19.2096V0.870388ZM30.0349 0.870388H41.5849V4.75878H38.0709V17H33.5489V4.75878H30.0349V0.870388ZM43.0996 0.870388H47.6217V17H43.0996V0.870388ZM59.502 17L56.8377 12.7228L54.1663 17H48.9745L54.2383 8.57516L49.4354 0.870388H54.6271L56.8377 4.40594L59.0411 0.870388H64.2545L59.43 8.57516L64.6937 17H59.502ZM68.3125 12.6724C69.5654 12.6724 70.5879 13.7021 70.5879 14.955C70.5879 16.2079 69.5654 17.2304 68.3125 17.2304C67.0667 17.2304 66.037 16.2079 66.037 14.955C66.037 13.7021 67.0667 12.6724 68.3125 12.6724ZM83.3529 17L82.6472 15.2862H77.4339L76.6562 17H71.7381L80.2926 0.409542L88.1774 17H83.3529ZM78.838 12.1827H81.3583L80.1486 9.25203L78.838 12.1827ZM89.4121 0.870388H93.9342V17H89.4121V0.870388Z" fill="currentColor"/></svg>';

function sidebar(active, up) {
  let out = '';
  for (const f of FAMILIES) {
    out += `\n        <div class="side-h">${esc(f.name)}</div>`;
    for (const p of PROTOCOLS.filter((x) => x.fam === f.id)) {
      const on = p.slug === active ? ' aria-current="page"' : '';
      out += `\n        <a class="side-l"${on} href="${up}${p.url}/"><span class="dot" style="background:${f.cat}"></span>${esc(p.name)}<span class="side-y">${p.year}</span></a>`;
    }
  }
  return out;
}

/** Render one page. `up` is the relative prefix back to the site root. */
export function layout({ title, description, canonical, nav, active = '', up = '', main }) {
  const navlink = (id, label, href) =>
    `<a href="${href}"${nav === id ? ' aria-current="page"' : ''}>${label}</a>`;
  const full = title === SITE.name ? `${SITE.name} — an open protocol reference from ${SITE.org}` : `${title} — ${SITE.name}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${attr(full)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${SITE.base}/${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(SITE.name)}">
<meta property="og:title" content="${attr(full)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${SITE.base}/${canonical}">
<meta name="twitter:card" content="summary">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#196796" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0f0f0f" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${up}img/netix-mark.svg" type="image/svg+xml">
<link rel="preload" href="${up}fonts/archivo-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${up}fonts/archivo-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}styles.css">
<script>try{var t=localStorage.getItem('netix-wp-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="top">
  <button class="icon-btn menu-btn" data-menu aria-expanded="false" aria-controls="side" aria-label="Open protocol navigation">${ICON.menu}</button>
  <a class="mark" href="${up}" aria-label="${attr(SITE.name)} home">${WORDMARK}<span class="oss">OSS</span></a>
  <nav class="nav" aria-label="Primary">
    ${navlink('home', 'Protocols', up || './')}
    ${navlink('compare', 'Compare', `${up}compare/`)}
  </nav>
  <div class="top-right">
    <button class="icon-btn" data-theme-toggle aria-label="Switch theme">${ICON.sun}${ICON.moon}</button>
    <a class="ghost" href="${SITE.repo}" rel="noopener">${ICON.github}<span>${SITE.org}</span></a>
  </div>
</header>

<div class="shell">
  <aside class="side" id="side" aria-label="All protocols">${sidebar(active, up)}
  </aside>
  <main class="main" id="main">
    <div class="wrap">
${main}
    </div>
  </main>
</div>

<footer class="foot">
  <div class="foot-in">
    <span class="mark">${WORDMARK}</span>
    <span class="cap">${esc(SITE.name)} — an open reference from ${SITE.org}. Prose CC BY 4.0, code Apache-2.0.</span>
    <span style="margin-left:auto; display:flex; gap:18px; flex-wrap:wrap">
      <a class="cap" style="color:var(--brand-600)" href="${SITE.repo}" rel="noopener">Source</a>
      <a class="cap" style="color:var(--brand-600)" href="${SITE.repo}/blob/main/CONTRIBUTING.md" rel="noopener">Contribute</a>
      <a class="cap" style="color:var(--brand-600)" href="https://github.com/NETIX-AI-OSS" rel="noopener">NETIX-AI-OSS</a>
    </span>
  </div>
</footer>

<script src="${up}site.js" defer></script>
</body>
</html>
`;
}
