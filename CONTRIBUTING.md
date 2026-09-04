# Contributing

Corrections first. This is a reference: a wrong figure is worse than a missing
page, and we would rather hear about one than not.

## Reporting an error

Open an issue with the page, the claim, and what it should say. If you have a
primary source — an RFC, a standard, a datasheet — link it. "The spec says X"
with a section number settles things much faster than a general objection.

## Making a change

```bash
npm run check
```

That builds the site and runs the verification suite. It must pass before a pull
request can be merged; CI runs the same command.

The checks catch: diagram content clipped outside its viewBox, labels running
past the right edge, degenerate zero-size shapes, step layers without a caption
(or captions without a layer), broken internal links, unsubstituted template
holes, double-escaped entities, unbalanced tags, and pages missing a title,
meta description or `<h1>`.

## Ground rules for content

- **Every number is checkable.** Rates, distances, wire counts, dates, header
  sizes. If a figure depends on another (CAN's reach depends on its bit rate),
  quote both or neither.
- **No folklore.** If a claim is widely repeated but disputed, either leave it
  out or say plainly that it is disputed. The site deliberately does not repeat
  the "IP was designed to survive a nuclear attack" story, because ARPANET's own
  architects rejected it.
- **Diagrams show mechanism, not decoration.** A diagram earns its place by
  making something clearer than the prose can. If it just restates the heading,
  it should not be there.
- **A diagram must not contradict its own labels.** If a waveform is annotated
  `0x6A`, it has to carry `0x6A`. Count the clock pulses.
- **The NETIX block stays separable.** The "In a NETIX deployment" section is
  intentionally its own element on every page so the site can be read — or
  forked — without it.

## Adding a protocol

See "Adding or editing a protocol" in the [README](README.md). Keep the shape
identical to the existing entries: five facts, three "how" blocks, four
gotchas, three NETIX points. The uniformity is what makes the pages comparable.
