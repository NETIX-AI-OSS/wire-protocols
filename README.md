# Wire Protocols

An open reference to the twenty-six protocols that carry data from a sensor on a
plant floor to a number on a screen — each one with the diagram that actually
explains it, written for engineers who have to make them talk to each other.

**→ [netix-ai-oss.github.io/wire-protocols](https://netix-ai-oss.github.io/wire-protocols)**

Published by [NETIX-AI-OSS](https://github.com/NETIX-AI-OSS).

## What is covered

| Layer | Protocols |
| --- | --- |
| On-board buses | UART · SPI · I²C · I3C · 1-Wire |
| Serial & fieldbus | RS-232 · RS-485 · Modbus · Profibus · GPIB · USB |
| Building & industrial | M-Bus · BACnet MS/TP · BACnet/IP · OPC UA |
| In-vehicle | CAN · LIN · FlexRay |
| Internet | IP · TCP · UDP · DNS · HTTP · HTTPS · MQTT · WebSocket |

Each protocol gets a page with a spec strip, a step-through diagram, how it
works, the mistakes that cost people days, and a clearly separated note on where
it sits in a NETIX deployment.

## Running it

No dependencies. Node 20 or newer.

```bash
npm run build     # writes dist/
npm run dev       # builds, then serves dist/ on http://localhost:4173
npm run check     # builds, then verifies geometry, links, markup and step layers
```

`dist/` is a plain static directory. Any host will serve it; GitHub Pages is
wired up in `.github/workflows/pages.yml` and deploys on every push to `main`.

## How it is built

A ~200-line generator (`src/build.mjs`) with no runtime dependencies, so there is
no lockfile to churn and no supply chain to audit.

```
src/
  build.mjs        orchestrates: validates content, writes dist/
  check.mjs        post-build verification, also the CI gate
  kit.mjs          protocol registry, page shell, escaping
  serve.mjs        local preview server
  content/*.mjs    the 26 protocol specs, one module per family
  pages/*.mjs      home, compare, protocol templates
static/            copied verbatim into dist/ — CSS, JS, fonts, the mark
```

### Adding or editing a protocol

1. Edit the spec in the relevant `src/content/*.mjs`. A spec is a plain object:
   `expand`, `oneLine`, five `facts`, a `diagram` (title, sub, `steps`, `svg`),
   two or three `how` blocks, a `netix` note and four `gotchas`.
2. If it is a new protocol, add it to `PROTOCOLS` and `CMP` in `src/kit.mjs`.
3. Run `npm run check`. It fails the build on a clipped diagram, a label running
   past the viewBox, a step layer with no caption, a broken internal link, or a
   page missing a title, description or `<h1>`.

### How the diagrams work

Each diagram is hand-authored SVG on a 1000-unit viewBox. Step layers are marked
`data-layer="N"` (cumulative reveal — lit once the reader reaches step N) or
`data-hl="N"` (spotlight — dimmed once superseded). Opacity is driven entirely by
CSS from a `data-step` attribute, so **with JavaScript disabled every layer is
painted and every step is listed as prose**. The stepper is an enhancement, never
a requirement.

Diagram colours split deliberately: structural colours (surfaces, panels, rules,
on-tint text) follow the theme; series colours come from a small ramp that lifts
in dark mode so line art stays legible. Categorical chart colours elsewhere in
the NETIX design language are held constant across themes; line art is not
chart data, and legibility wins.

## Design system

The colour, type and spacing values express the NETIX design language — brand
`#196796`, Archivo, the Okabe–Ito colour-blind-safe categorical ramp, the same
radii, spacing and elevation ladder used by the NETIX product frontends.

They are **re-authored here as plain CSS custom properties**. This repository
takes no dependency on, and contains no code from, the `netix-frontend` package
(which is AGPL-3.0-only). That keeps this site permissively licensed and
buildable by anyone with Node and nothing else.

## Licensing

- **Code** — Apache-2.0. See [`LICENSE`](LICENSE).
- **Prose and diagrams** — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
  Reuse them with attribution to NETIX-AI-OSS.
- **Archivo** — SIL Open Font License 1.1, see [`static/fonts/OFL.txt`](static/fonts/OFL.txt).
- **The NETIX.AI wordmark** is a trademark and is *not* covered by the code
  licence. See [`NOTICE`](NOTICE).

## Contributing

Corrections are the most valuable contribution here — a wrong number in a
reference is worse than a missing one. See [CONTRIBUTING.md](CONTRIBUTING.md).
