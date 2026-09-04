const SVG = (h, body) => `<svg class="dgm" viewBox="0 0 1000 ${h}" width="100%" role="img" aria-hidden="true">${body}</svg>`;

export const FIELD = [
/* ============================== RS-232 ============================== */
{
  slug: 'RS232', h: 2180,
  expand: 'RS-232 — one of the oldest communication standards still in daily use, defined in 1960 and still bolted to the side of factory equipment everywhere.',
  oneLine: 'RS-232 connects two devices point to point, using large voltage swings to represent data. That bigger swing was designed to fight noise over longer cables — and it is still the reason a USB-to-RS-232 adapter is in every commissioning engineer’s bag.',
  facts: [
    ['Wires', '3 minimum (TX, RX, GND)'],
    ['Signalling', 'Single-ended vs ground'],
    ['Levels', '+15 V = 0, −15 V = 1'],
    ['Reach', '~15 m at 19.2 k'],
    ['Devices', '2, point-to-point'],
  ],
  diagram: {
    title: 'Why the voltages are so large — and where that stops working',
    sub: 'RS-232 is not a different frame from UART; it is the same frame at different electrical levels. The logic is inverted and the swing is enormous, which buys noise margin and costs everything else.',
    steps: [
      { label: 'TTL logic', caption: 'The UART inside the chip swings between 0 V and 3.3 V. That is fine for centimetres of board trace, but the gap between a 1 and a 0 is only 3.3 V — a modest amount of induced noise eats it entirely.' },
      { label: 'Level shift', caption: 'An RS-232 driver inverts the signal and re-launches it at up to ±15 V. Note the inversion: a logic 1 is a negative voltage. This trips people up on a scope more than any other detail of the standard.' },
      { label: 'Noise margin', caption: 'The receiver decides at ±3 V, so there is roughly 12 V of headroom on each side. Noise has to be enormous before it flips a bit — which is exactly the point of the design.' },
      { label: 'Where it fails', caption: 'The margin is measured against a shared ground, and ground is not the same potential at both ends of a long cable. Ground shift, not noise, is what caps RS-232 at tens of metres — and it is what RS-485 was built to fix.' },
      { label: 'DB9', caption: 'The nine-pin connector that used to be on the back of every PC. Three pins do the work; the rest are hardware flow control and modem-era status lines that most equipment ignores.' },
    ],
    svg: SVG(340, `
      <g opacity="0.6">
        <text x="70" y="28" class="dlab-b">Same byte, two electrical worlds</text>
        <text x="60" y="86" class="dlab" text-anchor="end">TTL</text>
        <text x="60" y="196" class="dlab" text-anchor="end">RS-232</text>
      </g>

      <g class="dstep" data-layer="1">
        <line x1="76" y1="104" x2="470" y2="104" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <line x1="76" y1="62" x2="470" y2="62" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <text x="484" y="66" class="dlab-s">+3.3 V</text>
        <text x="484" y="108" class="dlab-s">0 V</text>
        <path d="M76,62 H130 V104 H184 V62 H238 V104 H346 V62 H400 V104 H470" class="dwire" stroke="var(--dg-a)"/>
        <rect x="76" y="54" width="394" height="58" fill="#0072b2" opacity="0.04"/>
        <path d="M500,62 V104" stroke="var(--text-tertiary)" stroke-width="1"/>
        <text x="510" y="87" class="dlab-s">3.3 V of margin</text>
      </g>

      <g class="dstep" data-layer="2">
        <line x1="76" y1="150" x2="470" y2="150" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <line x1="76" y1="252" x2="470" y2="252" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <text x="484" y="154" class="dlab-s">+15 V &#8594; logic 0</text>
        <text x="484" y="256" class="dlab-s">&#8722;15 V &#8594; logic 1</text>
        <path d="M76,252 H130 V150 H184 V252 H238 V150 H346 V252 H400 V150 H470" class="dwire" stroke="var(--dg-c)"/>
        <rect x="70" y="292" width="470" height="30" rx="6" fill="var(--status-warning-tint)"/>
        <text x="86" y="311" class="dlab-s" fill="var(--status-warning-on-tint)">inverted &#8212; a logic 1 sits at the NEGATIVE rail</text>
      </g>

      <g class="dstep" data-layer="3">
        <line x1="76" y1="184" x2="470" y2="184" stroke="var(--status-ok)" stroke-dasharray="4 3"/>
        <line x1="76" y1="218" x2="470" y2="218" stroke="var(--status-ok)" stroke-dasharray="4 3"/>
        <rect x="76" y="184" width="394" height="34" fill="#64748b" opacity="0.1"/>
        <text x="484" y="205" class="dlab-s" fill="var(--status-ok)">&#177;3 V decision band</text>
        <path d="M556,150 V184 M556,218 V252" stroke="var(--status-ok)" stroke-width="1.5"/>
        <text x="566" y="172" class="dlab-s" fill="var(--status-ok)">12 V margin</text>
        <text x="566" y="240" class="dlab-s" fill="var(--status-ok)">12 V margin</text>
      </g>

      <g class="dstep" data-layer="4">
        <rect x="650" y="54" width="310" height="140" rx="10" fill="var(--status-critical-tint)"/>
        <text x="668" y="80" class="dlab-b" fill="var(--status-critical)">The ground assumption</text>
        <text x="668" y="104" class="dlab-s" fill="var(--status-critical-on-tint)">Every level is measured against a ground</text>
        <text x="668" y="120" class="dlab-s" fill="var(--status-critical-on-tint)">both ends are assumed to share. Over 50 m</text>
        <text x="668" y="136" class="dlab-s" fill="var(--status-critical-on-tint)">of plant floor they do not: welders, VFDs</text>
        <text x="668" y="152" class="dlab-s" fill="var(--status-critical-on-tint)">and motors shift local ground by volts.</text>
        <text x="668" y="176" class="dlab-s" fill="var(--status-critical)">&#8594; RS-485 drops the shared-ground assumption</text>
      </g>

      <g class="dstep" data-layer="5">
        <line x1="600" y1="212" x2="960" y2="212" stroke="var(--dg-line-soft)"/>
        <text x="620" y="240" class="dlab-b">DB9 &#183; DE-9 connector</text>
        <path d="M628,254 h300 l-14,54 h-272 z" fill="var(--dg-panel)" stroke="var(--dg-line)" stroke-width="1.5"/>
        <g fill="#8096a3">
          <circle cx="656" cy="272" r="5"/><circle cx="700" cy="272" r="5"/><circle cx="744" cy="272" r="5"/>
          <circle cx="788" cy="272" r="5"/><circle cx="832" cy="272" r="5"/>
          <circle cx="678" cy="294" r="5"/><circle cx="722" cy="294" r="5"/><circle cx="766" cy="294" r="5"/><circle cx="810" cy="294" r="5"/>
        </g>
        <g fill="#196796">
          <circle cx="700" cy="272" r="5"/><circle cx="744" cy="272" r="5"/><circle cx="832" cy="272" r="5"/>
        </g>
        <text x="700" y="258" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">2</text>
        <text x="744" y="258" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">3</text>
        <text x="832" y="258" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">5</text>
        <text x="946" y="276" class="dlab-s" text-anchor="end" fill="var(--brand-600)">2 RX &#183; 3 TX &#183; 5 GND</text>
        <text x="946" y="292" class="dlab-s" text-anchor="end">the other six are flow control</text>
      </g>`),
  },
  how: [
    { h: 'It is an electrical standard, not a frame format', p: 'This is the distinction that causes the most confusion in the field. The bit pattern on an RS-232 line is a UART frame — start bit, data bits, parity, stop bit. RS-232 governs only the voltages, the connector and the control lines. You can change one without changing the other, and often must.' },
    { h: 'Big swings buy margin, and cost speed', p: 'Driving ±12 V into cable capacitance takes real current and real time, so the edges are slow. That is the trade: RS-232 tolerates far more noise than TTL but tops out at low rates over short distances, because every transition has to drag the cable across 24 V.' },
    { h: 'It refuses to die because it does not need to', p: 'You rarely see RS-232 on consumer devices now, but it is still everywhere in industrial machines, factory equipment, old scientific instruments and point-of-sale terminals. Equipment built decades ago works, so it was never replaced — and a USB-to-RS-232 adapter bridges it to a modern laptop for a few pounds.' },
  ],
  netix: {
    lead: 'RS-232 is a commissioning and legacy-integration protocol in NETIX deployments. It is rarely the production data path, but it is often the only way into a piece of equipment nobody wants to replace.',
    points: [
      'Serial-attached meters and controllers reach a gateway through a USB-to-RS-232 adapter, with the driver publishing to local Mosquitto exactly as a native driver would.',
      'On site, always confirm three things separately: the electrical standard (RS-232 vs RS-485), the frame settings (baud, parity, stop bits), and the application protocol on top (usually Modbus RTU).',
      'A device advertised as "Modbus serial" tells you nothing about the wiring. Ask which one it is before ordering the cable.',
    ],
  },
  gotchas: [
    { t: 'Logic is inverted', p: 'A logic 1 is negative. Scope traces read backwards compared with TTL, which sends people hunting for faults that are not there.' },
    { t: 'DB9 pinout is not universal', p: 'DTE and DCE swap TX and RX. Null-modem versus straight-through is a coin flip until you check.' },
    { t: 'Ground loops are real damage', p: 'Tying grounds between distant equipment can push current through the cable shield. Isolated adapters exist for a reason.' },
    { t: 'Flow control silently differs', p: 'One end using RTS/CTS and the other using none looks like an intermittent overrun, not a configuration error.' },
  ],
},

/* ============================== RS-485 ============================== */
{
  slug: 'RS485', h: 2260,
  expand: 'RS-485 — differential signalling on a twisted pair: 1200 metres, 32 devices, and near-immunity to the electrical noise of a working plant.',
  oneLine: 'RS-232 fails if the cable gets too long or passes near heavy, noisy electric motors. RS-485 fixes both with one idea: send the data across two wires simultaneously, flipping the voltage on one of them, and let the receiver subtract. The noise cancels out and the clean data remains.',
  facts: [
    ['Wires', '2 (A/B twisted pair)'],
    ['Signalling', 'Differential'],
    ['Reach', '1,200 m (~3/4 mile)'],
    ['Devices', '32 standard loads'],
    ['Termination', '120 Ω at each end'],
  ],
  diagram: {
    title: 'Noise cancellation, step by step',
    sub: 'This is the whole reason RS-485 is the ironclad backbone of industrial hardware. Watch what a motor spike does to a single-ended signal, then what it does to a differential pair.',
    steps: [
      { label: 'Single-ended', caption: 'RS-232 measures one wire against ground. If ground moves — and near a variable-frequency drive it moves a great deal — the measurement moves with it, and there is nothing to subtract it against.' },
      { label: 'Two wires, mirrored', caption: 'RS-485 sends the same data on two conductors, but inverts the voltage on one of them. A is the signal, B is its mirror image. Nothing has been transmitted twice; the information is in the difference between them.' },
      { label: 'Noise strikes', caption: 'A contactor closes nearby and couples a spike into the cable. Because the two conductors are twisted together and run the same physical path, the interference hits both wires equally — this is the property the whole design rests on.' },
      { label: 'Receiver subtracts', caption: 'The receiver does not look at either wire on its own. It computes A minus B. The noise, being identical on both, cancels completely; the data, being opposite on both, doubles. Common-mode rejection in one subtraction.' },
      { label: 'The result', caption: 'Clean data out the other end, over 1,200 metres — more than half a mile — with no shared-ground assumption anywhere in the path. That is the trick that made a plant-wide serial bus practical.' },
      { label: 'Multidrop', caption: 'And because the pair is a shared medium rather than a link, up to 32 standard-load devices sit on the exact same two wires. Terminate 120 Ω at each far end; do not terminate in the middle.' },
    ],
    svg: SVG(430, `
      <g class="dstep" data-hl="1">
        <text x="70" y="28" class="dlab-b">Single-ended reference &#183; RS-232</text>
        <path d="M76,66 H150 V96 H224 V66 H298 V96 H372 V66 H446" class="dwire" stroke="var(--text-tertiary)"/>
        <path d="M76,124 H446" class="dwire" stroke="var(--dg-line)" stroke-dasharray="4 3"/>
        <text x="458" y="128" class="dlab-s">GND (assumed)</text>
        <path d="M520,96 h44 m-8,-8 8,8 -8,8" stroke="var(--text-tertiary)" class="dwire"/>
        <rect x="590" y="60" width="330" height="76" rx="8" fill="var(--status-critical-tint)"/>
        <text x="606" y="86" class="dlab-s" fill="var(--status-critical)">ground shifts &#8594; the reference shifts</text>
        <text x="606" y="106" class="dlab-s" fill="var(--status-critical-on-tint)">nothing in the signal path can undo it</text>
        <text x="606" y="126" class="dlab-s" fill="var(--status-critical-on-tint)">caps the cable at tens of metres</text>
      </g>

      <g class="dstep" data-layer="2">
        <text x="70" y="182" class="dlab-b" fill="var(--brand-600)">Differential pair &#183; RS-485</text>
        <text x="60" y="228" class="dlab" text-anchor="end">A</text>
        <text x="60" y="292" class="dlab" text-anchor="end">B</text>
        <path d="M76,208 H150 V246 H224 V208 H298 V246 H372 V208 H446" class="dwire" stroke="var(--dg-a)"/>
        <path d="M76,310 H150 V272 H224 V310 H298 V272 H372 V310 H446" class="dwire" stroke="var(--dg-c)"/>
        <text x="458" y="212" class="dlab-s" fill="var(--dg-a)">signal</text>
        <text x="458" y="314" class="dlab-s" fill="var(--dg-c)">mirror</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M180,352 V330 M180,352 h-9 l9,-12 9,12 z" fill="#dc2626" stroke="none"/>
        <text x="196" y="352" class="dlab-s" fill="var(--status-critical)">contactor / VFD spike couples into BOTH conductors</text>
        <path d="M150,208 q10,-22 20,0 q10,-22 20,0 q10,-22 20,0" stroke="var(--status-critical)" stroke-width="2" fill="none"/>
        <path d="M150,310 q10,-22 20,0 q10,-22 20,0 q10,-22 20,0" stroke="var(--status-critical)" stroke-width="2" fill="none"/>
        <path d="M298,208 q10,-22 20,0 q10,-22 20,0" stroke="var(--status-critical)" stroke-width="2" fill="none"/>
        <path d="M298,310 q10,-22 20,0 q10,-22 20,0" stroke="var(--status-critical)" stroke-width="2" fill="none"/>
        <text x="500" y="262" class="dlab-s" fill="var(--status-critical)">identical on both &#8594; common mode</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M600,196 h56 l0,-14 34,32 -34,32 0,-14 -56,0 z" fill="var(--dg-surface)" stroke="var(--brand-600)" stroke-width="1.5"/>
        <text x="628" y="222" class="dlab-b" text-anchor="middle" fill="var(--brand-600)">A &#8722; B</text>
        <path d="M470,228 H600 M470,292 H600 M600,246 V270" stroke="var(--dg-line)" class="dwire"/>
        <rect x="712" y="182" width="248" height="64" rx="8" fill="var(--status-ok-tint)"/>
        <text x="728" y="206" class="dlab-s" fill="var(--status-ok-on-tint)">noise: N &#8722; N = 0</text>
        <text x="728" y="228" class="dlab-s" fill="var(--status-ok-on-tint)">data: (+V) &#8722; (&#8722;V) = 2V</text>
      </g>

      <g class="dstep" data-layer="5">
        <path d="M712,272 H786 V310 H860 V272 H934" class="dwire" stroke="var(--status-ok)"/>
        <text x="712" y="334" class="dlab-s" fill="var(--status-ok)">clean data recovered at 1,200 m</text>
      </g>

      <g class="dstep" data-layer="6">
        <line x1="70" y1="360" x2="960" y2="360" stroke="var(--dg-line-soft)"/>
        <path d="M140,392 H860" class="dwire" stroke="var(--dg-a)"/>
        <path d="M140,406 H860" class="dwire" stroke="var(--dg-c)"/>
        <path d="M128,388 v22 M118,388 v22" stroke="var(--dg-d)" stroke-width="3"/>
        <path d="M872,388 v22 M882,388 v22" stroke="var(--dg-d)" stroke-width="3"/>
        <text x="112" y="426" class="dlab-s" fill="var(--dg-d)">120 &#8486;</text>
        <text x="876" y="426" class="dlab-s" fill="var(--dg-d)">120 &#8486;</text>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="176" y="368" width="86" height="26" rx="5"/>
          <rect x="330" y="368" width="86" height="26" rx="5"/>
          <rect x="484" y="368" width="86" height="26" rx="5"/>
          <rect x="638" y="368" width="86" height="26" rx="5"/>
        </g>
        <text x="219" y="385" class="dlab-s" text-anchor="middle">Meter 1</text>
        <text x="373" y="385" class="dlab-s" text-anchor="middle">Meter 2</text>
        <text x="527" y="385" class="dlab-s" text-anchor="middle">VFD</text>
        <text x="681" y="385" class="dlab-s" text-anchor="middle">Valve</text>
        <text x="768" y="385" class="dlab-s" fill="var(--text-tertiary)">&#8230; up to 32</text>
      </g>`),
  },
  how: [
    { h: 'The noise never has to be small — only equal', p: 'This is the elegance of the design. RS-485 makes no attempt to keep interference out of the cable; it accepts that a plant floor will inject volts of noise and arranges for that noise to arrive identically on both conductors. Twisting the pair is what guarantees the equality, which is why untwisted RS-485 cable quietly destroys the benefit.' },
    { h: 'No shared ground in the decision', p: 'Because the receiver compares the two conductors against each other rather than against ground, a ground potential difference between the ends is simply another common-mode voltage — rejected along with the noise. Removing that assumption is what takes the reach from 15 metres to 1,200.' },
    { h: 'A bus, not a link', p: 'The same two wires carry every device. That makes it cheap to extend an installation, and it makes termination and topology matter: a linear run with 120 Ω at each far end behaves; a star or a mid-run terminator produces reflections that look exactly like a failing device.' },
  ],
  netix: {
    lead: 'RS-485 is the physical layer most NETIX gateway installations actually meet. When a site says it has a Modbus network, this pair of wires is almost always what is under the label.',
    points: [
      'A gateway running gateway-drivers polls Modbus RTU over RS-485 and republishes each register as a point on local Mosquitto under netix/, which is bridged up to data-service.',
      'Distinguish carefully: RS-485 is the copper highway, Modbus is the language spoken on it. They are separate choices and the pages are separate for a reason.',
      'Commissioning order that saves days: confirm A/B polarity, then termination, then baud and parity, then unit IDs. Every one of those failures presents as "the device does not answer".',
    ],
  },
  gotchas: [
    { t: 'A/B polarity is not standardised in practice', p: 'Vendors label the pair inconsistently. Swapping A and B is the first thing to try on a silent bus.' },
    { t: 'Termination is positional', p: 'Exactly two terminators, at the two physical ends. A third in the middle causes reflections that mimic intermittent devices.' },
    { t: 'Idle-state biasing is often missing', p: 'With no device driving, an unbiased pair floats and the receiver sees noise as framing errors. Fail-safe bias resistors fix it.' },
    { t: 'Star topology looks fine until it does not', p: 'Stubs off a main run reflect. Symptoms appear only at higher baud rates or with more devices online.' },
  ],
},

/* ============================== Modbus ============================== */
{
  slug: 'Modbus', h: 2330,
  expand: 'Modbus — a software-level protocol invented in 1979 for PLCs: one master, a strict request-response cycle, and registers of raw binary.',
  oneLine: 'People often lump RS-485 and Modbus together, but they are entirely different things. If RS-485 is the physical copper highway, Modbus is the language spoken by the cars driving on it. It is beautiful because it is incredibly simple and completely open.',
  facts: [
    ['Layer', 'Application'],
    ['Model', 'Request / response'],
    ['Masters', 'One on serial, many on TCP'],
    ['Unit IDs', '1 – 247'],
    ['Transports', 'RTU, ASCII, TCP'],
  ],
  diagram: {
    title: 'One poll, one reply, and the four register spaces',
    sub: 'A Modbus master yells an instruction onto the shared pair. Every device hears it; only the addressed one answers. That is the entire arbitration scheme.',
    steps: [
      { label: 'Master asks', caption: 'The master builds a frame: unit ID, function code, a starting address and a quantity, then a CRC. Function 03 is "read holding registers" — the workhorse of every Modbus integration you will ever do.' },
      { label: 'Everyone hears', caption: 'On a shared RS-485 pair, the frame reaches every device simultaneously. There is no switching, no routing and no addressing in the medium — the bus is genuinely a shared broadcast domain.' },
      { label: 'Only #5 replies', caption: 'Each device compares the unit ID against its own and discards the frame if it does not match. Device five recognises its number, reads its registers, and prepares an answer. Nobody else transmits, which is what keeps the pair collision-free.' },
      { label: 'The response', caption: 'Back comes unit ID, the echoed function code, a byte count and the register values, with its own CRC. The master matches it to the outstanding request purely by timing — there is no transaction ID in RTU framing.' },
      { label: 'Register model', caption: 'Modbus does not care about data formats. It reads and writes raw bits and 16-bit words in four spaces: coils and discrete inputs for bits, input and holding registers for words. Anything richer — a float, a timestamp, a string — is a convention layered on top by the vendor.' },
      { label: 'Exceptions', caption: 'An error comes back as the function code with the high bit set, plus an exception code. 02 means the address does not exist; 03 means the quantity is wrong. These two account for most first-day integration failures.' },
    ],
    svg: SVG(422, `
      <g class="dstep" data-layer="1">
        <text x="70" y="26" class="dlab-b">Request frame &#183; Modbus RTU</text>
        <g stroke="var(--dg-line)" fill="var(--dg-surface)">
          <rect x="70" y="42" width="110" height="46" rx="6"/>
          <rect x="184" y="42" width="130" height="46" rx="6"/>
          <rect x="318" y="42" width="180" height="46" rx="6"/>
          <rect x="502" y="42" width="150" height="46" rx="6"/>
          <rect x="656" y="42" width="110" height="46" rx="6"/>
        </g>
        <text x="125" y="62" class="dlab-s" text-anchor="middle">Unit ID</text>
        <text x="125" y="79" class="dlab-b" text-anchor="middle" fill="var(--brand-600)">05</text>
        <text x="249" y="62" class="dlab-s" text-anchor="middle">Function</text>
        <text x="249" y="79" class="dlab-b" text-anchor="middle" fill="var(--dg-a)">03</text>
        <text x="408" y="62" class="dlab-s" text-anchor="middle">Start address</text>
        <text x="408" y="79" class="dlab-b" text-anchor="middle">00 6B</text>
        <text x="577" y="62" class="dlab-s" text-anchor="middle">Quantity</text>
        <text x="577" y="79" class="dlab-b" text-anchor="middle">00 01</text>
        <text x="711" y="62" class="dlab-s" text-anchor="middle">CRC16</text>
        <text x="711" y="79" class="dlab-b" text-anchor="middle" fill="var(--dg-d)">F4 52</text>
        <text x="784" y="62" class="dlab-s">&#8220;device 5, read one</text>
        <text x="784" y="78" class="dlab-s">holding register at 107&#8221;</text>
      </g>

      <g class="dstep" data-layer="2">
        <rect x="70" y="112" width="104" height="42" rx="7" fill="#196796"/>
        <text x="122" y="138" class="dlab-b" text-anchor="middle" fill="#ffffff">Master</text>
        <path d="M174,126 H900" class="dwire" stroke="var(--dg-a)"/>
        <path d="M174,140 H900" class="dwire" stroke="var(--dg-c)"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="260" y="170" width="104" height="40" rx="6"/>
          <rect x="420" y="170" width="104" height="40" rx="6"/>
          <rect x="580" y="170" width="104" height="40" rx="6"/>
          <rect x="740" y="170" width="104" height="40" rx="6"/>
        </g>
        <path d="M312,170 V140 M472,170 V140 M632,170 V140 M792,170 V140" stroke="var(--dg-line)" stroke-width="1.5"/>
        <text x="312" y="186" class="dlab-s" text-anchor="middle">Meter</text>
        <text x="312" y="201" class="dlab-s" text-anchor="middle">ID 3</text>
        <text x="472" y="186" class="dlab-s" text-anchor="middle">Meter</text>
        <text x="472" y="201" class="dlab-s" text-anchor="middle">ID 4</text>
        <text x="632" y="186" class="dlab-s" text-anchor="middle">Meter</text>
        <text x="632" y="201" class="dlab-s" text-anchor="middle">ID 5</text>
        <text x="792" y="186" class="dlab-s" text-anchor="middle">Valve</text>
        <text x="792" y="201" class="dlab-s" text-anchor="middle">ID 6</text>
        <text x="916" y="134" class="dlab-s">RS-485</text>
      </g>

      <g class="dstep" data-layer="3">
        <rect x="580" y="164" width="104" height="52" rx="7" fill="none" stroke="var(--status-ok)" stroke-width="2"/>
        <text x="632" y="238" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">match &#8594; answers</text>
        <g fill="#8096a3" opacity="0.7">
          <text x="312" y="238" class="dlab-s" text-anchor="middle">&#8800; discard</text>
          <text x="472" y="238" class="dlab-s" text-anchor="middle">&#8800; discard</text>
          <text x="792" y="238" class="dlab-s" text-anchor="middle">&#8800; discard</text>
        </g>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M632,252 V266 H122 V160" class="dwire" stroke="var(--status-ok)" stroke-dasharray="5 4"/>
        <g stroke="var(--status-ok)" fill="var(--status-ok-tint)">
          <rect x="70" y="284" width="90" height="40" rx="6"/>
          <rect x="164" y="284" width="90" height="40" rx="6"/>
          <rect x="258" y="284" width="120" height="40" rx="6"/>
          <rect x="382" y="284" width="140" height="40" rx="6"/>
          <rect x="526" y="284" width="90" height="40" rx="6"/>
        </g>
        <text x="115" y="300" class="dlab-s" text-anchor="middle">Unit</text>
        <text x="115" y="316" class="dlab-b" text-anchor="middle">05</text>
        <text x="209" y="300" class="dlab-s" text-anchor="middle">Func</text>
        <text x="209" y="316" class="dlab-b" text-anchor="middle">03</text>
        <text x="318" y="300" class="dlab-s" text-anchor="middle">Byte count</text>
        <text x="318" y="316" class="dlab-b" text-anchor="middle">02</text>
        <text x="452" y="300" class="dlab-s" text-anchor="middle">Value</text>
        <text x="452" y="316" class="dlab-b" text-anchor="middle" fill="var(--brand-600)">02 2B = 555</text>
        <text x="571" y="300" class="dlab-s" text-anchor="middle">CRC</text>
        <text x="571" y="316" class="dlab-b" text-anchor="middle" fill="var(--dg-d)">08 FB</text>
      </g>

      <g class="dstep" data-layer="5">
        <text x="656" y="284" class="dlab-b">Four register spaces</text>
        <g stroke="var(--dg-line)" fill="var(--dg-surface)">
          <rect x="656" y="294" width="150" height="30" rx="5"/>
          <rect x="814" y="294" width="146" height="30" rx="5"/>
          <rect x="656" y="330" width="150" height="30" rx="5"/>
          <rect x="814" y="330" width="146" height="30" rx="5"/>
        </g>
        <text x="668" y="313" class="dlab-s">Coils &#183; 1 bit &#183; R/W</text>
        <text x="826" y="313" class="dlab-s">Discrete in &#183; 1 bit &#183; R</text>
        <text x="668" y="349" class="dlab-s">Holding &#183; 16 bit &#183; R/W</text>
        <text x="826" y="349" class="dlab-s">Input &#183; 16 bit &#183; R</text>
        <rect x="70" y="340" width="560" height="30" rx="6" fill="var(--brand-100)"/>
        <text x="86" y="359" class="dlab-s" fill="var(--brand-700)">no types &#8212; a 32-bit float is two registers and a vendor-specific word order</text>
      </g>

      <g class="dstep" data-layer="6">
        <rect x="70" y="378" width="890" height="30" rx="6" fill="var(--status-warning-tint)"/>
        <text x="86" y="397" class="dlab-s" fill="var(--status-warning-on-tint)">exception reply: function 03 &#8594; 83 &#183; code 02 = illegal data address &#183; code 03 = illegal data value</text>
      </g>`),
  },
  how: [
    { h: 'One master, and that is the arbitration', p: 'On a serial link Modbus operates on a strict request-response model. A single master — usually an industrial computer or a gateway — issues every request, and slaves speak only when spoken to. There is no collision detection because there can be no collisions: nothing transmits unless it was asked to. Modbus TCP relaxes this, since the network arbitrates instead: several clients may address the same server concurrently.' },
    { h: 'Registers, not objects', p: 'It does not care about complex data formats. It reads and writes binary ones and zeros directly into numbered registers, and the meaning of register 40107 is whatever the device vendor decided. This is why every Modbus integration begins with a register map PDF, and why two meters from different vendors share no vocabulary at all.' },
    { h: 'Simplicity is why it survived', p: 'The specification is short enough to implement in an afternoon on an 8-bit microcontroller, and it is completely open with no licensing body to pay. That combination is why almost every industrial sensor, power meter and automated valve on earth still speaks Modbus today, four decades after it was written for PLCs.' },
  ],
  netix: {
    lead: 'Modbus is a first-class citizen in the NETIX edge stack: it is one of the two protocol adapters implemented in the shared Rust crates, and it is the most common thing a new gateway is pointed at.',
    points: [
      'proto-modbus in libs/netix-protocol-core provides the adapter that gateway drivers, simulators and republishers all build on, so the same implementation is exercised in test and in production.',
      'Each polled register becomes a tag in tag-service and a point published under netix/ on the gateway’s Mosquitto, bridged up to data-service — the register map is where a deployment’s tag catalogue actually comes from.',
      'Poll budget is the design constraint nobody plans for: one master, sequential requests, and a serial line. Two hundred registers at 9600 baud is a slow loop, and it caps how fresh the cloud data can possibly be.',
    ],
  },
  gotchas: [
    { t: 'Addressing is off by one, sometimes', p: 'Documentation may use 1-based register numbers (40001) while the wire uses 0-based offsets. Half of all "illegal data address" errors are this.' },
    { t: 'Word order for 32-bit values is vendor-specific', p: 'Big-endian, little-endian and both byte-swapped variants all exist. Expect to try all four.' },
    { t: 'Silent timeouts hide two faults', p: 'A wrong unit ID and a dead device look identical. Scan the ID range before assuming hardware failure.' },
    { t: 'Modbus TCP is not Modbus RTU', p: 'TCP framing adds a transaction ID and drops the CRC. Tunnelling RTU frames over TCP is a third, incompatible thing.' },
  ],
},

/* ============================== Profibus ============================== */
{
  slug: 'Profibus', h: 2200,
  expand: 'Profibus — a heavy-duty, high-speed industrial network developed in Germany, where the arrival time of a packet can be calculated in advance.',
  oneLine: 'What happens when a factory needs more than simple temperature readings — high-speed robotic arms that must stay perfectly synchronised in real time? Modbus is too slow for that. Profibus replaces polite polling with a token that circulates at speed, and makes the worst-case delivery time a number you can calculate.',
  facts: [
    ['Model', 'Token passing + polling'],
    ['Rate', 'Up to 12 Mbit/s'],
    ['Determinism', 'Calculable cycle time'],
    ['Nodes', '126 addressable'],
    ['Physical', 'RS-485 or fibre'],
  ],
  diagram: {
    title: 'The token, and why the cycle time is a number you can calculate',
    sub: 'Masters form a logical ring and pass a token between them. Only the token holder may initiate traffic, so bus access is scheduled rather than contended.',
    steps: [
      { label: 'Logical ring', caption: 'Every master on the segment knows its successor, forming a logical ring that has nothing to do with the physical wiring — the cable is still a linear RS-485 run. The ring exists only in the address ordering.' },
      { label: 'Token holder', caption: 'Whichever device holds the digital token gets total control of the bus and can blast its data instantly. No other master may transmit, so there is no contention to resolve and no back-off to wait through.' },
      { label: 'Poll the slaves', caption: 'While it holds the token, the master runs its slave cycle: each I/O device is addressed in turn and exchanges its inputs and outputs in a single message. Slaves never initiate; they are pure responders.' },
      { label: 'Pass it on', caption: 'When the master has finished, or its token hold time expires, it passes the token to its successor. The hold time is bounded, which is precisely what makes the next step possible.' },
      { label: 'Deterministic', caption: 'Because every hold time is bounded and the ring membership is known, the worst-case time before a device gets the bus back can be calculated in advance rather than measured and hoped for. That bound is the property Modbus cannot offer, and it is why Profibus runs assembly lines and water treatment plants — though functional safety itself is a further layer, PROFIsafe, rather than the bus.' },

    ],
    svg: SVG(360, `
      <g class="dstep" data-layer="1">
        <text x="70" y="28" class="dlab-b">Logical token ring over a linear cable</text>
        <path d="M140,120 H860" class="dwire" stroke="var(--dg-line)" stroke-width="3"/>
        <g fill="#196796">
          <rect x="150" y="76" width="112" height="44" rx="8"/>
          <rect x="444" y="76" width="112" height="44" rx="8"/>
          <rect x="738" y="76" width="112" height="44" rx="8"/>
        </g>
        <text x="206" y="103" class="dlab-b" text-anchor="middle" fill="#ffffff">Master 1</text>
        <text x="500" y="103" class="dlab-b" text-anchor="middle" fill="#ffffff">Master 2</text>
        <text x="794" y="103" class="dlab-b" text-anchor="middle" fill="#ffffff">Master 3</text>
        <g stroke="var(--dg-d)" fill="none" stroke-width="1.5" stroke-dasharray="5 4">
          <path d="M262,64 H444" marker-end="url(#pb-a)"/>
          <path d="M556,64 H738" marker-end="url(#pb-a)"/>
          <path d="M850,52 q40,-30 -20,-38 H236 q-60,8 -30,38" marker-end="url(#pb-a)"/>
        </g>
        <text x="500" y="34" class="dlab-s" text-anchor="middle" fill="var(--dg-d)">logical ring &#8212; not the wiring</text>
      </g>

      <g class="dstep" data-layer="2">
        <circle cx="206" cy="98" r="30" fill="none" stroke="var(--dg-e)" stroke-width="3"/>
        <rect x="140" y="140" width="132" height="24" rx="6" fill="var(--status-warning-tint)"/>
        <text x="206" y="157" class="dlab-s" text-anchor="middle" fill="var(--status-warning-on-tint)">holds the token</text>
      </g>

      <g class="dstep" data-layer="3">
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="150" y="196" width="96" height="36" rx="6"/>
          <rect x="266" y="196" width="96" height="36" rx="6"/>
          <rect x="382" y="196" width="96" height="36" rx="6"/>
        </g>
        <path d="M198,196 V120 M314,196 V120 M430,196 V120" stroke="var(--dg-line)"/>
        <text x="198" y="218" class="dlab-s" text-anchor="middle">Drive</text>
        <text x="314" y="218" class="dlab-s" text-anchor="middle">I/O rack</text>
        <text x="430" y="218" class="dlab-s" text-anchor="middle">Encoder</text>
        <g stroke="var(--dg-a)" stroke-width="2" fill="none">
          <path d="M206,132 q-20,32 -8,60" marker-end="url(#pb-b)"/>
          <path d="M212,132 q60,32 100,60" marker-end="url(#pb-b)"/>
          <path d="M216,132 q120,32 212,60" marker-end="url(#pb-b)"/>
        </g>
        <text x="500" y="216" class="dlab-s" fill="var(--dg-a)">slave cycle &#8212; each addressed once per pass</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M262,98 H444" stroke="var(--dg-e)" stroke-width="3" fill="none" marker-end="url(#pb-c)"/>
        <circle cx="500" cy="98" r="30" fill="none" stroke="var(--dg-e)" stroke-width="3"/>
        <text x="353" y="88" class="dlab-s" text-anchor="middle" fill="var(--status-warning-on-tint)">token passes</text>
      </g>

      <g class="dstep" data-layer="5">
        <line x1="70" y1="256" x2="960" y2="256" stroke="var(--dg-line-soft)"/>
        <text x="70" y="286" class="dlab-b">Bus cycle</text>
        <g>
          <rect x="150" y="298" width="200" height="26" rx="5" fill="#0072b2" opacity="0.75"/>
          <rect x="354" y="298" width="26" height="26" rx="5" fill="#e69f00"/>
          <rect x="384" y="298" width="200" height="26" rx="5" fill="#0072b2" opacity="0.55"/>
          <rect x="588" y="298" width="26" height="26" rx="5" fill="#e69f00"/>
          <rect x="618" y="298" width="200" height="26" rx="5" fill="#0072b2" opacity="0.35"/>
          <rect x="822" y="298" width="26" height="26" rx="5" fill="#e69f00"/>
        </g>
        <text x="250" y="316" class="dlab-s" text-anchor="middle" fill="#ffffff">M1 slave cycle</text>
        <text x="484" y="316" class="dlab-s" text-anchor="middle" fill="#ffffff">M2 slave cycle</text>
        <text x="718" y="316" class="dlab-s" text-anchor="middle" fill="#ffffff">M3 slave cycle</text>
        <path d="M150,338 H848" stroke="var(--status-ok)" stroke-width="1.5"/>
        <path d="M150,332 v12 M848,332 v12" stroke="var(--status-ok)" stroke-width="1.5"/>
        <text x="499" y="356" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">worst-case rotation time is bounded &#8212; so the arrival time is a calculation, not a hope</text>
      </g>
      <defs>
        <marker id="pb-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#a8437f"/></marker>
        <marker id="pb-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0072b2"/></marker>
        <marker id="pb-c" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#e69f00"/></marker>
      </defs>`),
  },
  how: [
    { h: 'Scheduled access beats polite polling', p: 'Unlike Modbus, which lazily waits for a master to ask questions, Profibus gives bus ownership to exactly one device at a time and moves that ownership on a schedule. Devices pass a digital token down the line at lightning speeds; whichever device has the token gets total control to blast its data instantly.' },
    { h: 'Determinism is a calculable property', p: 'Because token hold times are bounded and the ring membership is known, the worst-case time for the token to come back round can be computed before the plant is built. Engineers size the network against a target cycle time rather than measuring and hoping — which is what makes it usable in a safety-relevant control loop.' },
    { h: 'Two roles, cleanly separated', p: 'Masters own the token and initiate; slaves are I/O devices that only ever respond. This keeps the deterministic guarantee intact, because a slave can never inject unscheduled traffic. It also means adding I/O does not change the timing analysis, while adding a master does.' },
  ],
  netix: {
    lead: 'Profibus is not natively supported in the NETIX protocol core — proto-bacnet and proto-modbus are the adapters that exist today. In deployments it appears as an upstream network that a PLC already owns.',
    points: [
      'The usual integration is indirect: the Profibus segment terminates at a PLC, and the gateway takes data from that PLC over Modbus TCP or BACnet rather than joining the Profibus ring.',
      'That boundary is deliberate. Joining a deterministic control network with a polling gateway risks the timing guarantee the plant was engineered around.',
      'If a site asks for direct Profibus ingest, the honest answer is a protocol gateway appliance in front of the NETIX gateway, not a new adapter.',
    ],
  },
  gotchas: [
    { t: 'Determinism is an engineering result, not a default', p: 'Add masters or extend hold times and the calculated cycle time changes. The guarantee has to be re-derived.' },
    { t: 'Termination is powered', p: 'Profibus connectors contain active termination that needs bus power. An unpowered end station silently degrades the segment.' },
    { t: 'GSD files are the integration contract', p: 'Device capability lives in a vendor GSD file. Wrong version, wrong I/O map, no useful error.' },
    { t: 'Not the same as Profinet', p: 'Profinet is Ethernet-based and a different protocol entirely, despite the name and the same standards body.' },
  ],
},

/* ============================== GPIB ============================== */
{
  slug: 'GPIB', h: 2280,
  expand: 'GPIB — the General Purpose Interface Bus, also known as IEEE-488: Hewlett-Packard’s 1960s answer to automating a workbench full of test equipment.',
  oneLine: 'A true vintage legend, designed for one specific job: letting an engineer use a central computer to automate a bench of instruments. Its iconic trick is that the cables are stackable — you plug one into an oscilloscope, then plug the next straight into the back of that first cable.',
  facts: [
    ['Connector', '24-pin, stackable'],
    ['Bus width', '8 data + 8 control'],
    ['Instruments', 'Up to 15'],
    ['Rate', '~1 MB/s'],
    ['Total cable', '20 m maximum'],
  ],
  diagram: {
    title: 'Stackable cables and the talker / listener / controller model',
    sub: 'A parallel bus with a role-assignment scheme: exactly one device talks, any number listen, and a controller decides who is which.',
    steps: [
      { label: 'Controller', caption: 'A central computer sits at the head of the bus. It never has to carry the data itself — its job is to assign roles, then get out of the way while two instruments exchange readings directly.' },
      { label: 'Daisy chain', caption: 'This is the trick people remember. Each GPIB connector has a socket on its own back, so you plug a cable into the oscilloscope and the next cable into that first connector — chaining up to fifteen instruments without a hub anywhere.' },
      { label: 'Assign roles', caption: 'The controller addresses one device as talker and one or more as listeners. Exactly one talker at a time, which is how a parallel bus with no arbitration avoids two instruments driving the same eight data lines.' },
      { label: 'Three-wire handshake', caption: 'Every byte is transferred with a three-line handshake — data valid, ready for data, data accepted. It is fully interlocked, so the bus automatically runs at the speed of the slowest listener rather than dropping bytes.' },
      { label: 'Still in service', caption: 'Fifty-year-old calibration gear ends up on a modern laptop through a GPIB-to-USB adapter. Multimillion-pound calibration labs, aerospace test facilities and physics departments still run on this, because the instruments are more accurate than their replacements and there is no reason to retire them.' },
    ],
    svg: SVG(420, `
      <g class="dstep" data-layer="1">
        <rect x="70" y="80" width="128" height="60" rx="8" fill="#196796"/>
        <text x="134" y="106" class="dlab-b" text-anchor="middle" fill="#ffffff">Controller</text>
        <text x="134" y="124" class="dlab-s" text-anchor="middle" fill="#c7ddec">HP 9825 / PC</text>
      </g>

      <g class="dstep" data-layer="2">
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="264" y="80" width="150" height="60" rx="8"/>
          <rect x="480" y="80" width="150" height="60" rx="8"/>
          <rect x="696" y="80" width="150" height="60" rx="8"/>
        </g>
        <text x="339" y="106" class="dlab-b" text-anchor="middle">Oscilloscope</text>
        <text x="339" y="124" class="dlab-s" text-anchor="middle">addr 04</text>
        <text x="555" y="106" class="dlab-b" text-anchor="middle">DMM</text>
        <text x="555" y="124" class="dlab-s" text-anchor="middle">addr 07</text>
        <text x="771" y="106" class="dlab-b" text-anchor="middle">Signal gen</text>
        <text x="771" y="124" class="dlab-s" text-anchor="middle">addr 12</text>
        <g fill="#8096a3">
          <rect x="198" y="98" width="16" height="24" rx="2"/>
          <rect x="248" y="98" width="16" height="24" rx="2"/>
          <rect x="414" y="98" width="16" height="24" rx="2"/>
          <rect x="464" y="98" width="16" height="24" rx="2"/>
          <rect x="630" y="98" width="16" height="24" rx="2"/>
          <rect x="680" y="98" width="16" height="24" rx="2"/>
        </g>
        <path d="M214,110 H248 M430,110 H464 M646,110 H680" stroke="var(--text-tertiary)" stroke-width="6" stroke-linecap="round"/>
        <text x="500" y="168" class="dlab-s" text-anchor="middle">each connector carries a socket on its back &#8212; stack up to 15 instruments</text>
      </g>

      <g class="dstep" data-layer="3">
        <rect x="264" y="72" width="150" height="76" rx="9" fill="none" stroke="var(--dg-a)" stroke-width="2"/>
        <rect x="480" y="72" width="150" height="76" rx="9" fill="none" stroke="var(--status-ok)" stroke-width="2"/>
        <rect x="696" y="72" width="150" height="76" rx="9" fill="none" stroke="var(--status-ok)" stroke-width="2"/>
        <text x="339" y="62" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">TALKER</text>
        <text x="555" y="62" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">LISTENER</text>
        <text x="771" y="62" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">LISTENER</text>
        <text x="134" y="62" class="dlab-s" text-anchor="middle" fill="var(--dg-d)">CONTROLLER</text>
        <text x="70" y="34" class="dlab-s">exactly one talker at a time &#8212; the bus has no arbitration to fall back on</text>
      </g>

      <g class="dstep" data-layer="4">
        <line x1="70" y1="192" x2="960" y2="192" stroke="var(--dg-line-soft)"/>
        <text x="70" y="222" class="dlab-b">24-pin bus</text>
        <g stroke="var(--dg-line)" fill="var(--dg-surface)">
          <rect x="70" y="234" width="250" height="34" rx="6"/>
          <rect x="336" y="234" width="290" height="34" rx="6"/>
          <rect x="642" y="234" width="318" height="34" rx="6"/>
        </g>
        <text x="86" y="256" class="dlab-s" fill="var(--dg-a)">DIO1&#8211;8 &#183; parallel data</text>
        <text x="352" y="256" class="dlab-s" fill="var(--status-ok)">DAV / NRFD / NDAC &#183; handshake</text>
        <text x="658" y="256" class="dlab-s" fill="var(--dg-d)">ATN / IFC / SRQ / REN / EOI &#183; control</text>
        <text x="120" y="290" class="dlab-s" fill="var(--status-ok)">DAV &#8595; data valid</text>
        <text x="340" y="302" class="dlab-s">&#8594; NRFD &#8595; ready</text>
        <text x="500" y="302" class="dlab-s">&#8594; NDAC &#8595; accepted</text>
        <text x="660" y="302" class="dlab-s" fill="var(--status-ok)">&#8594; bus runs at the slowest listener</text>
      </g>

      <g class="dstep" data-layer="5">
        <line x1="70" y1="330" x2="960" y2="330" stroke="var(--dg-line-soft)"/>
        <rect x="70" y="348" width="168" height="46" rx="7" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="154" y="368" class="dlab-s" text-anchor="middle">1974 calibrator</text>
        <text x="154" y="384" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">still in tolerance</text>
        <path d="M238,371 H300" class="dwire" stroke="var(--text-tertiary)"/>
        <rect x="300" y="352" width="148" height="38" rx="7" fill="var(--brand-100)" stroke="var(--brand-500)"/>
        <text x="374" y="376" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">GPIB &#8594; USB</text>
        <path d="M448,371 H510" class="dwire" stroke="var(--text-tertiary)"/>
        <rect x="510" y="348" width="168" height="46" rx="7" fill="#196796"/>
        <text x="594" y="376" class="dlab-b" text-anchor="middle" fill="#ffffff">Modern laptop</text>
        <text x="700" y="366" class="dlab-s">the instrument outlives every</text>
        <text x="700" y="382" class="dlab-s">computer that was ever bolted to it</text>
      </g>`),
  },
  how: [
    { h: 'A parallel bus in a serial world', p: 'GPIB moves eight bits at once over a massively heavy, chunky 24-pin ribbon connector — an approach that looks archaic next to two-wire differential buses, but which delivers about a megabyte per second with no serialisation logic at either end — extraordinary for a design HP began in the 1960s and had standardised as IEEE-488 by 1975.' },
    { h: 'Roles are assigned, not negotiated', p: 'The brilliant talker, listener and controller model means the bus never has to resolve a conflict. The controller asserts an attention line, names one talker and any number of listeners, then releases the bus so the data flows directly between the instruments without passing through the computer.' },
    { h: 'Interlocked handshake, no timing assumptions', p: 'Because every byte is acknowledged by all listeners before the next is sent, the bus self-regulates to the slowest participant. There is no baud rate to configure and no buffer to overrun — a property that ages remarkably well when the instruments on one bus were built thirty years apart.' },
  ],
  netix: {
    lead: 'GPIB is out of scope for a NETIX gateway — it is a laboratory bus, not a building or plant one — but it is worth knowing when a calibration lab appears inside a facilities estate.',
    points: [
      'Where a site has a metrology or calibration room, its instruments are frequently on GPIB and are not candidates for NETIX ingest.',
      'The integration path, when one is genuinely needed, is a bench PC with a GPIB-to-USB adapter publishing to MQTT — not a gateway driver.',
      'Its role-assignment model is a useful contrast with Modbus: both avoid collisions, one by assigning roles, the other by permitting only one master.',
    ],
  },
  gotchas: [
    { t: 'Total cable length is the hard limit', p: 'Twenty metres across the whole chain, and two metres per device. Stacking far-apart instruments quietly breaks it.' },
    { t: 'Addresses are set with DIP switches', p: 'Physical switches on the instrument rear panel. Two instruments on the same address produce silent, undebuggable corruption.' },
    { t: 'Connector weight is a real mechanical load', p: 'A stack of four cables can pull a lightweight instrument off a bench or strain the port.' },
    { t: 'Adapter drivers are the fragile part', p: 'The bus outlives its host software. Vendor GPIB drivers are frequently the first thing to break on an OS upgrade.' },
  ],
},

/* ============================== USB ============================== */
{
  slug: 'USB', h: 2260,
  expand: 'Universal Serial Bus — the protocol that replaced every other port on the back of a computer, and is now tunnelling display, data and 240 watts down one cable.',
  oneLine: 'We use USB every day, and almost nobody realises how ridiculously complex the protocol is under the hood. Unlike SPI or UART, USB is entirely host-driven and packet-based: your computer acts as supreme master, constantly polling every connected device.',
  facts: [
    ['Topology', 'Tiered star, 127 devices'],
    ['Model', 'Host-driven, packet-based'],
    ['Signalling', 'Differential D+ / D−'],
    ['Rate', '1.5 Mbit/s – 40 Gbit/s'],
    ['Power', 'Up to 240 W (USB-PD)'],
  ],
  diagram: {
    title: 'One transaction, and the tree it travels through',
    sub: 'Nothing on a USB bus transmits until the host asks it to. Every transfer is three packets — token, data, handshake — issued on the host’s schedule.',
    steps: [
      { label: 'Host is supreme', caption: 'A USB bus has exactly one host, and through USB 2.0 devices are strictly reactive. A keyboard does not send a keystroke when you press a key; it holds it until the host next polls, on a fixed schedule measured in milliseconds. USB 3.x softened this — a device may raise an asynchronous notification — but the host still owns the schedule.' },
      { label: 'Tiered star', caption: 'Hubs fan the single host port out into a tree up to seven tiers deep and 127 devices wide. The tree is logical as well as physical — the host enumerates every device, assigns it an address, and reads its descriptors to learn what it is.' },
      { label: 'Token packet', caption: 'The transaction opens with a token: what kind of transfer, which device address, which endpoint within that device. Endpoints are the reason one physical webcam can present separate video, audio and control streams over a single cable.' },
      { label: 'Data packet', caption: 'Then the data itself, with a DATA0/DATA1 toggle that alternates every packet. That single toggle bit is how the receiver distinguishes a genuine retransmission from a new packet after a lost handshake.' },
      { label: 'Handshake', caption: 'Finally the receiver answers: ACK for success, NAK for "not ready, ask again", or STALL for an error condition needing host intervention. NAK is not a failure — a device that is not ready simply gets polled again.' },
      { label: 'USB-C', caption: 'With USB-C and USB4 the protocol became a juggernaut, tunnelling DisplayPort and PCIe alongside USB data and negotiating up to 240 watts, all on one reversible connector. The cable now carries several protocols that have very little to do with the original bus.' },
    ],
    svg: SVG(400, `
      <g class="dstep" data-layer="1">
        <rect x="70" y="76" width="130" height="56" rx="8" fill="#196796"/>
        <text x="135" y="100" class="dlab-b" text-anchor="middle" fill="#ffffff">Host</text>
        <text x="135" y="118" class="dlab-s" text-anchor="middle" fill="#c7ddec">owns the schedule</text>
        <text x="70" y="52" class="dlab-s">through USB 2.0, devices never initiate &#8212; they answer polls</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M200,104 H262" class="dwire" stroke="var(--dg-a)"/>
        <rect x="262" y="86" width="76" height="36" rx="7" fill="var(--brand-100)" stroke="var(--brand-500)"/>
        <text x="300" y="108" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">Hub</text>
        <path d="M338,104 H392 M392,60 V148 M392,60 H452 M392,104 H452 M392,148 H452" class="dwire" stroke="var(--dg-a)"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="452" y="44" width="120" height="32" rx="6"/>
          <rect x="452" y="88" width="120" height="32" rx="6"/>
          <rect x="452" y="132" width="120" height="32" rx="6"/>
        </g>
        <text x="512" y="64" class="dlab-s" text-anchor="middle">Keyboard</text>
        <text x="512" y="108" class="dlab-s" text-anchor="middle">Webcam</text>
        <text x="512" y="152" class="dlab-s" text-anchor="middle">Hub</text>
        <path d="M572,148 H616 M616,132 V176 M616,132 H660 M616,176 H660" class="dwire" stroke="var(--dg-a)"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="660" y="116" width="120" height="32" rx="6"/>
          <rect x="660" y="160" width="120" height="32" rx="6"/>
        </g>
        <text x="720" y="136" class="dlab-s" text-anchor="middle">SSD</text>
        <text x="720" y="180" class="dlab-s" text-anchor="middle">RS-485 adapter</text>
        <text x="800" y="140" class="dlab-s">up to 7 tiers &#183; 127 addresses</text>
      </g>

      <g class="dstep" data-layer="3">
        <line x1="70" y1="216" x2="960" y2="216" stroke="var(--dg-line-soft)"/>
        <text x="70" y="246" class="dlab-b">One IN transaction</text>
        <rect x="70" y="260" width="264" height="52" rx="7" fill="#0072b2"/>
        <text x="86" y="280" class="dlab-s" fill="#c7e2f5">TOKEN &#183; host &#8594; device</text>
        <text x="86" y="300" class="dlab-b" fill="#ffffff">IN &#183; addr 12 &#183; endpoint 1</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M334,286 H360" class="dwire" stroke="var(--dg-line)"/>
        <rect x="360" y="260" width="264" height="52" rx="7" fill="#a8437f"/>
        <text x="376" y="280" class="dlab-s" fill="#f3d6e6">DATA &#183; device &#8594; host</text>
        <text x="376" y="300" class="dlab-b" fill="#ffffff">DATA1 &#183; payload &#183; CRC16</text>
      </g>

      <g class="dstep" data-layer="5">
        <path d="M624,286 H650" class="dwire" stroke="var(--dg-line)"/>
        <rect x="650" y="260" width="200" height="52" rx="7" fill="#16a34a"/>
        <text x="666" y="280" class="dlab-s" fill="#d3f0dd">HANDSHAKE</text>
        <text x="666" y="300" class="dlab-b" fill="#ffffff">ACK</text>
        <text x="866" y="278" class="dlab-s">NAK &#8594; not ready</text>
        <text x="866" y="296" class="dlab-s">STALL &#8594; error</text>
      </g>

      <g class="dstep" data-layer="6">
        <rect x="70" y="336" width="890" height="52" rx="8" fill="var(--dg-inverse)"/>
        <text x="86" y="358" class="dlab-s" fill="#7bc0ea">USB-C / USB4 &#183; one connector, several protocols</text>
        <text x="86" y="378" class="dlab-s" fill="#a6b6bf">USB data &#183; DisplayPort alt mode &#183; PCIe tunnelling &#183; Power Delivery up to 240 W</text>
      </g>`),
  },
  how: [
    { h: 'Host-driven means no surprises on the wire', p: 'The host constantly polls every connected device using a hierarchy of token packets, data packets and handshakes. Nothing arrives unrequested, so there is no contention to arbitrate — the cost is latency, because a device with urgent data waits for its next scheduled poll.' },
    { h: 'Enumeration turns a cable into a driver', p: 'When you plug something in, the host assigns it an address and reads descriptors describing its class, endpoints and power needs. That handshake is why USB replaced the nightmare of separate ports for keyboards, mice, printers and joysticks: the port stopped being specific to the device.' },
    { h: 'Differential signalling, borrowed from the fieldbus world', p: 'D+ and D− carry the same mirrored-pair trick that makes RS-485 work, which is what lets USB run at gigabit rates over consumer-grade cable while delivering power on the other pins. USB did not invent it — the industrial world had been shipping it for over a decade by 1996.' },
  ],
  netix: {
    lead: 'USB is the workhorse of NETIX field commissioning: it is how a laptop reaches serial equipment, and how a gateway reaches devices that have no network interface of their own.',
    points: [
      'USB-to-RS-485 and USB-to-RS-232 adapters are the standard way a gateway or a commissioning laptop attaches to legacy field equipment.',
      'On Linux gateways, bind adapters by stable device path rather than /dev/ttyUSB0 — enumeration order changes across reboots and silently reassigns which bus a driver polls.',
      'USB power budgets bite on gateway hardware: several bus-powered adapters on one Raspberry Pi-class board can brown out under load, presenting as random driver dropouts.',
    ],
  },
  gotchas: [
    { t: 'Enumeration order is not stable', p: 'Device node names change across reboots. Pin adapters by serial number or physical port in a udev rule.' },
    { t: 'Cable quality is protocol-relevant', p: 'Above USB 2.0 speeds, a cheap cable fails in ways that look like a device fault.' },
    { t: 'Bus power is a shared budget', p: 'Several adapters on one host port can exceed it. Symptoms are intermittent and look like software bugs.' },
    { t: 'USB-C says nothing about capability', p: 'The connector is universal; the protocols behind it are not. A cable may carry power only, or data at three very different rates.' },
  ],
},
];
