const SVG = (h, body) => `<svg class="dgm" viewBox="0 0 1000 ${h}" width="100%" role="img" aria-hidden="true">${body}</svg>`;

export const AUTO = [
/* ============================== CAN ============================== */
{
  slug: 'CAN', h: 2280,
  expand: 'Controller Area Network — invented by Bosch in 1983 for one specific environment: a car, where dozens of computers must talk constantly and reliably over two shared wires.',
  oneLine: 'Think about your car: engine control, brakes, airbags, dashboard, transmission — all of them need to talk. CAN lets them share just two wires, and the clever part is how it handles conflicts. If two devices transmit at once, a built-in priority system decides who goes first without losing any data.',
  facts: [
    ['Wires', '2 (CAN_H, CAN_L)'],
    ['Signalling', 'Differential'],
    ['Rate', '125 k – 1 Mbit/s'],
    ['Arbitration', 'Bitwise, non-destructive'],
    ['Payload', '8 bytes (64 in CAN FD)'],
  ],
  diagram: {
    title: 'Two nodes transmit at once — and nothing is lost',
    sub: 'Non-destructive bitwise arbitration is the idea that makes CAN worth studying. Watch what happens at the exact bit where two identifiers diverge.',
    steps: [
      { label: 'Dominant vs recessive', caption: 'A CAN bit is not symmetric. A 0 is dominant: a node driving it pulls the pair apart and wins. A 1 is recessive: the node simply lets the bus float. Wire an AND gate across every node and you have the bus level.' },
      { label: 'Both start together', caption: 'The engine controller and the dashboard both find the bus idle and begin transmitting their identifiers in the same bit time. On any other shared bus this is a collision, and both messages would be destroyed.' },
      { label: 'Bit 3 diverges', caption: 'For the first two bits both send 0, and the bus reads 0 — no information yet. On bit three the engine node sends a dominant 0 while the dashboard sends a recessive 1. Because dominant always wins, the bus reads 0.' },
      { label: 'The loser withdraws', caption: 'Every transmitting node monitors the bus while it sends. The dashboard sent 1 and reads back 0, so it knows something more important is talking. It stops immediately and becomes a listener — mid-message, without any error being raised.' },
      { label: 'Nothing was lost', caption: 'The engine controller never noticed. Its message continues uncorrupted and arrives on time, and the dashboard automatically retries once the bus is idle. This is why a lower identifier means higher priority, and why the ID field is chosen at design time as a priority scheme rather than a name.' },
    ],
    svg: SVG(400, `
      <g class="dstep" data-layer="1">
        <text x="70" y="28" class="dlab-b">Bit levels</text>
        <rect x="70" y="42" width="230" height="34" rx="6" fill="#196796"/>
        <text x="86" y="64" class="dlab-s" fill="#ffffff">0 = DOMINANT &#183; actively driven</text>
        <rect x="312" y="42" width="230" height="34" rx="6" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="328" y="64" class="dlab-s">1 = RECESSIVE &#183; bus left to float</text>
        <text x="562" y="64" class="dlab-s" fill="var(--text-tertiary)">bus level = logical AND of every node</text>
      </g>

      <g opacity="0.6">
        <text x="150" y="130" class="dlab" text-anchor="end">Engine ECU</text>
        <text x="150" y="178" class="dlab" text-anchor="end">Dashboard</text>
        <text x="150" y="234" class="dlab-b" text-anchor="end">Bus</text>
      </g>
      <g opacity="0.5">
        <path d="M166,100 V256 M234,100 V256 M302,100 V256 M370,100 V256 M438,100 V256 M506,100 V256 M574,100 V256 M642,100 V256 M710,100 V256 M778,100 V256 M846,100 V256 M914,100 V256" stroke="var(--dg-line-soft)"/>
      </g>

      <g class="dstep" data-layer="2">
        <g fill="#196796">
          <rect x="170" y="112" width="60" height="26" rx="4"/><rect x="238" y="112" width="60" height="26" rx="4"/>
          <rect x="306" y="112" width="60" height="26" rx="4"/><rect x="442" y="112" width="60" height="26" rx="4"/>
          <rect x="578" y="112" width="60" height="26" rx="4"/><rect x="646" y="112" width="60" height="26" rx="4"/>
          <rect x="714" y="112" width="60" height="26" rx="4"/><rect x="782" y="112" width="60" height="26" rx="4"/>
        </g>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="374" y="112" width="60" height="26" rx="4"/><rect x="510" y="112" width="60" height="26" rx="4"/>
          <rect x="850" y="112" width="60" height="26" rx="4"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="200" y="130" fill="#ffffff">0</text><text x="268" y="130" fill="#ffffff">0</text>
          <text x="336" y="130" fill="#ffffff">0</text><text x="404" y="130">1</text>
          <text x="472" y="130" fill="#ffffff">0</text><text x="540" y="130">1</text>
          <text x="608" y="130" fill="#ffffff">0</text><text x="676" y="130" fill="#ffffff">0</text>
          <text x="744" y="130" fill="#ffffff">0</text><text x="812" y="130" fill="#ffffff">0</text>
          <text x="880" y="130">1</text>
        </g>
        <text x="932" y="130" class="dlab-s" fill="var(--brand-600)">ID 0x0A1</text>

        <g fill="#196796">
          <rect x="170" y="160" width="60" height="26" rx="4"/><rect x="238" y="160" width="60" height="26" rx="4"/>
          <rect x="374" y="160" width="60" height="26" rx="4"/><rect x="510" y="160" width="60" height="26" rx="4"/>
          <rect x="578" y="160" width="60" height="26" rx="4"/><rect x="646" y="160" width="60" height="26" rx="4"/>
          <rect x="714" y="160" width="60" height="26" rx="4"/>
        </g>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="306" y="160" width="60" height="26" rx="4"/><rect x="442" y="160" width="60" height="26" rx="4"/>
          <rect x="782" y="160" width="60" height="26" rx="4"/><rect x="850" y="160" width="60" height="26" rx="4"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="200" y="178" fill="#ffffff">0</text><text x="268" y="178" fill="#ffffff">0</text>
          <text x="336" y="178">1</text><text x="404" y="178" fill="#ffffff">0</text>
          <text x="472" y="178">1</text><text x="540" y="178" fill="#ffffff">0</text>
          <text x="608" y="178" fill="#ffffff">0</text><text x="676" y="178" fill="#ffffff">0</text>
          <text x="744" y="178" fill="#ffffff">0</text><text x="812" y="178">1</text>
          <text x="880" y="178">1</text>
        </g>
        <text x="932" y="178" class="dlab-s">ID 0x143</text>
      </g>

      <g class="dstep" data-layer="3">
        <rect x="302" y="100" width="68" height="156" rx="6" fill="#d55e00" opacity="0.1"/>
        <path d="M336,100 V88" stroke="var(--dg-c)" stroke-width="2"/>
        <text x="336" y="80" class="dlab-s" text-anchor="middle" fill="var(--dg-c)">bit 3</text>
        <g fill="#196796">
          <rect x="170" y="216" width="60" height="26" rx="4"/><rect x="238" y="216" width="60" height="26" rx="4"/>
          <rect x="306" y="216" width="60" height="26" rx="4"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="200" y="234" fill="#ffffff">0</text><text x="268" y="234" fill="#ffffff">0</text>
          <text x="336" y="234" fill="#ffffff">0</text>
        </g>
        <text x="380" y="262" class="dlab-s" fill="var(--dg-c)">dominant wins the wire</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M336,192 V206" stroke="var(--status-critical)" stroke-width="2"/>
        <text x="352" y="204" class="dlab-s" fill="var(--status-critical)">dashboard sent 1, reads back 0 &#8594; stops transmitting, becomes a listener</text>
        <g opacity="0.3">
          <rect x="374" y="152" width="536" height="42" rx="6" fill="var(--dg-panel-2)"/>
        </g>
      </g>

      <g class="dstep" data-layer="5">
        <g fill="#196796">
          <rect x="442" y="216" width="60" height="26" rx="4"/><rect x="578" y="216" width="60" height="26" rx="4"/>
          <rect x="646" y="216" width="60" height="26" rx="4"/><rect x="714" y="216" width="60" height="26" rx="4"/>
          <rect x="782" y="216" width="60" height="26" rx="4"/>
        </g>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="374" y="216" width="60" height="26" rx="4"/><rect x="510" y="216" width="60" height="26" rx="4"/>
          <rect x="850" y="216" width="60" height="26" rx="4"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="404" y="234">1</text><text x="472" y="234" fill="#ffffff">0</text>
          <text x="540" y="234">1</text><text x="608" y="234" fill="#ffffff">0</text>
          <text x="676" y="234" fill="#ffffff">0</text><text x="744" y="234" fill="#ffffff">0</text>
          <text x="812" y="234" fill="#ffffff">0</text><text x="880" y="234">1</text>
        </g>
        <rect x="70" y="276" width="890" height="34" rx="6" fill="var(--status-ok-tint)"/>
        <text x="86" y="298" class="dlab-s" fill="var(--status-ok-on-tint)">the engine message completes uncorrupted &#183; the dashboard retries automatically &#183; zero bytes lost, zero errors raised</text>
        <line x1="70" y1="330" x2="960" y2="330" stroke="var(--dg-line-soft)"/>
        <text x="70" y="358" class="dlab-b">Consequence for design</text>
        <text x="70" y="380" class="dlab-s">the identifier is not a name &#8212; it is a priority. Brake and airbag messages are given low IDs at design time so they always win the wire.</text>
      </g>`),
  },
  how: [
    { h: 'Everyone talks and listens at the same time', p: 'CAN lets every controller share just two wires, called CAN high and CAN low, with each device transmitting and monitoring simultaneously. That simultaneous read-back is not a diagnostic feature — it is the arbitration mechanism itself, and removing it would break the protocol.' },
    { h: 'Messages are addressed by content, not destination', p: 'A CAN frame carries no destination address. It carries an identifier describing what the message is — engine RPM, wheel speed — and every node decides for itself whether it cares. Adding a new module that needs wheel speed requires no change to the module that transmits it.' },
    { h: 'Built to be assumed faulty', p: 'Every node counts its own transmit and receive errors and progressively removes itself from the bus as those counters climb: error-active, then error-passive, then bus-off. A failing module quiets itself rather than jamming the network for everyone else, which is a large part of why CAN is one of the most battle-tested protocols ever built.' },
  ],
  gotchas: [
    { t: 'ID assignment is a priority decision', p: 'Choosing identifiers by convenience rather than urgency can starve a critical message under bus load.' },
    { t: 'Termination is 120 Ω at both ends', p: 'Same discipline as RS-485. A missing terminator produces errors that rise with bus load.' },
    { t: 'Bit timing must match exactly', p: 'Sample point and segment configuration, not just bit rate. Close-but-wrong timing works until the bus gets busy.' },
    { t: 'Reading a bus is not the same as decoding it', p: 'Frames are vendor-defined. Without a DBC file the payload is meaningless bytes.' },
  ],
},

/* ============================== LIN ============================== */
{
  slug: 'LIN', h: 2200,
  expand: 'Local Interconnect Network — the cheap and cheerful little sibling of CAN: one wire, one master, sixteen slaves, and a fraction of the cost.',
  oneLine: 'Using CAN for every single button inside a vehicle is a massive waste of money. LIN runs on one wire at a much slower speed, with one master commanding up to sixteen slaves — which is exactly what a car door needs.',
  facts: [
    ['Wires', '1 (+ chassis ground)'],
    ['Model', 'Master / slave, scheduled'],
    ['Rate', 'Up to 20 kbit/s'],
    ['Slaves', 'Up to 16'],
    ['Cost vs CAN', 'Roughly one third'],
  ],
  diagram: {
    title: 'A LIN frame, and the door that pays for it',
    sub: 'The master transmits a header; the addressed slave supplies the response. Even that split is a cost decision — slaves need no crystal, because they resynchronise from the sync byte in every frame.',
    steps: [
      { label: 'Break', caption: 'Every frame opens with a dominant break of at least thirteen bit times — longer than any legal byte, so it can never be mistaken for data. It is a hard reset that gets every slave on the wire listening from the same instant.' },
      { label: 'Sync', caption: 'Then the byte 0x55: alternating ones and zeros. A slave measures the edges of this known pattern and calibrates its own clock against the master. That is why LIN slaves can ship without a crystal, and it is where a good part of the cost saving comes from.' },
      { label: 'Protected ID', caption: 'Six bits of frame identifier plus two parity bits. The ID names the frame, not the device — the schedule table in the master decides which slave is expected to answer each one.' },
      { label: 'Slave response', caption: 'The addressed slave appends up to eight data bytes and a checksum. Master and slave have jointly produced a single frame — the master supplied the header, the slave supplied the body.' },
      { label: 'In the door', caption: 'Instead of running heavy bundles back to the dashboard for the lock, the window switches and the mirror adjusters, they all join a tiny local LIN bus inside the door, with one node bridging to the car’s CAN backbone. It saves weight, cuts manufacturing cost, and keeps the interior electronics affordable.' },
    ],
    svg: SVG(390, `
      <g class="dstep" data-layer="1">
        <text x="70" y="28" class="dlab-b">Frame &#183; master header + slave response</text>
        <text x="60" y="86" class="dlab" text-anchor="end">LIN</text>
        <line x1="76" y1="60" x2="900" y2="60" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <path d="M76,60 H120 V110 H236 V60" class="dwire" stroke="var(--dg-c)"/>
        <rect x="120" y="52" width="116" height="66" rx="5" fill="#d55e00" opacity="0.08"/>
        <text x="178" y="140" class="dlab-s" text-anchor="middle" fill="var(--dg-c)">BREAK</text>
        <text x="178" y="156" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">&#8805; 13 bit times</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M236,60 V110 H266 V60 H296 V110 H326 V60 H356 V110 H386 V60 H416 V110 H446 V60" class="dwire" stroke="var(--dg-b)"/>
        <rect x="236" y="52" width="210" height="66" rx="5" fill="#009e73" opacity="0.07"/>
        <text x="341" y="140" class="dlab-s" text-anchor="middle" fill="var(--dg-b)">SYNC 0x55</text>
        <text x="341" y="156" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">slaves calibrate here</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M446,60 V110 H506 V60 H536 V110 H596 V60 H626" class="dwire" stroke="var(--dg-a)"/>
        <rect x="446" y="52" width="180" height="66" rx="5" fill="#0072b2" opacity="0.07"/>
        <text x="536" y="140" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">PID</text>
        <text x="536" y="156" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">6 id + 2 parity</text>
        <rect x="120" y="176" width="506" height="24" rx="5" fill="var(--brand-100)"/>
        <text x="373" y="193" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">master transmits the header</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M626,60 V110 H686 V60 H746 V110 H806 V60 H836 V110 H866 V60 H900" class="dwire" stroke="var(--dg-d)"/>
        <rect x="626" y="52" width="240" height="66" rx="5" fill="#a8437f" opacity="0.07"/>
        <text x="746" y="140" class="dlab-s" text-anchor="middle" fill="var(--dg-d)">DATA &#183; up to 8 bytes</text>
        <text x="866" y="140" class="dlab-s" text-anchor="middle" fill="var(--dg-d)">CHK</text>
        <rect x="626" y="176" width="274" height="24" rx="5" fill="var(--ml-accent-tint)"/>
        <text x="763" y="193" class="dlab-s" text-anchor="middle" fill="var(--ml-accent)">slave supplies the response</text>
      </g>

      <g class="dstep" data-layer="5">
        <line x1="70" y1="226" x2="960" y2="226" stroke="var(--dg-line-soft)"/>
        <text x="70" y="254" class="dlab-b">Inside one car door</text>
        <rect x="70" y="268" width="330" height="108" rx="10" fill="var(--dg-panel)" stroke="var(--dg-line)" stroke-dasharray="5 4"/>
        <text x="86" y="290" class="dlab-s" fill="var(--text-tertiary)">door module boundary</text>
        <rect x="94" y="300" width="104" height="34" rx="6" fill="#196796"/>
        <text x="146" y="322" class="dlab-s" text-anchor="middle" fill="#ffffff">LIN master</text>
        <path d="M146,334 V354 H372" class="dwire" stroke="var(--brand-600)"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="216" y="292" width="76" height="26" rx="5"/>
          <rect x="300" y="292" width="76" height="26" rx="5"/>
          <rect x="258" y="326" width="76" height="26" rx="5"/>
        </g>
        <text x="254" y="309" class="dlab-s" text-anchor="middle">Lock</text>
        <text x="338" y="309" class="dlab-s" text-anchor="middle">Window</text>
        <text x="296" y="343" class="dlab-s" text-anchor="middle">Mirror</text>
        <path d="M254,318 V354 M338,318 V354 M296,352 V354" stroke="var(--dg-line)"/>
        <path d="M198,317 H70 M70,317 V317" class="dwire" stroke="var(--dg-e)"/>
        <text x="416" y="300" class="dlab-s" fill="var(--status-warning-on-tint)">one node bridges to the CAN backbone</text>
        <path d="M400,322 H470" class="dwire" stroke="var(--dg-e)"/>
        <rect x="470" y="304" width="128" height="36" rx="7" fill="#e69f00"/>
        <text x="534" y="327" class="dlab-s" text-anchor="middle" fill="#2a1a03">CAN backbone</text>
        <rect x="628" y="268" width="332" height="108" rx="10" fill="var(--status-ok-tint)"/>
        <text x="646" y="292" class="dlab-s" fill="var(--status-ok-on-tint)">3 wires into the door hinge, not 12</text>
        <text x="646" y="314" class="dlab-s" fill="var(--status-ok-on-tint)">less copper, less weight, less cost</text>
        <text x="646" y="336" class="dlab-s" fill="var(--status-ok-on-tint)">a window switch does not need 1 Mbit/s</text>
        <text x="646" y="358" class="dlab-s" fill="var(--status-ok-on-tint)">and it does not need to be safety-rated</text>
      </g>`),
  },
  how: [
    { h: 'Cost is the design goal, not a side effect', p: 'Every decision in LIN trades performance for unit price: one wire instead of a twisted pair, 20 kbit/s instead of a megabit, and a sync byte in every frame so slave microcontrollers can use a cheap on-chip oscillator instead of a crystal. For a window switch, none of that is a compromise.' },
    { h: 'A schedule, not a bus fight', p: 'The master runs a fixed schedule table, sending one header per slot. There is no arbitration and no collision handling because there can be no collisions — a slave transmits only into the response slot of a frame whose ID it owns.' },
    { h: 'It exists so CAN does not have to be everywhere', p: 'A car has a hierarchy of networks and the skill is putting each function on the cheapest one that meets its requirement. LIN sits at the bottom of that hierarchy: local, slow, cheap, and bridged into CAN by a single node when the rest of the car needs to know.' },
  ],
  gotchas: [
    { t: 'The schedule is the contract', p: 'Response slots are sized in advance. A slave that answers late corrupts the following frame, not just its own.' },
    { t: 'Two checksum versions exist', p: 'Classic covers data only; enhanced includes the PID. Mixing them across a bus produces silent, intermittent failures.' },
    { t: 'Ground is the return path', p: 'Single-wire means chassis ground carries the return. Corroded body grounds present as protocol faults.' },
    { t: 'LDF files define the network', p: 'Without the vendor LIN description file, IDs and signal layout have to be reverse-engineered.' },
  ],
},

/* ============================== FlexRay ============================== */
{
  slug: 'FlexRay', h: 2240,
  expand: 'FlexRay — the ultra-premium end of the automotive spectrum: time-triggered, dual-channel and deterministic, built for cars where the steering wheel is no longer connected to the wheels by a steel shaft.',
  oneLine: 'As cars adopted drive-by-wire, CAN stopped being fast or safe enough. If a CAN bus is overloaded a brake packet can be delayed by a few milliseconds, and in an emergency that is unacceptable. FlexRay fixes it by giving every device an absolute, unmovable time slot.',
  facts: [
    ['Rate', '10 Mbit/s per channel'],
    ['Channels', '2, for redundancy'],
    ['Access', 'Time-triggered (TDMA)'],
    ['Cycle', 'Typically 1 – 5 ms'],
    ['Jitter', 'Sub-microsecond'],
  ],
  diagram: {
    title: 'Slots on a clock, not a queue',
    sub: 'CAN decides who transmits by priority at the moment of contention. FlexRay decided months earlier, at design time, and wrote it into a schedule every node shares.',
    steps: [
      { label: 'The CAN problem', caption: 'On CAN, a low-priority message loses arbitration and retries. Under heavy load it keeps losing, and its delivery time becomes a statistical property rather than a guarantee. For a steering command, a statistical guarantee is not a guarantee.' },
      { label: 'A shared clock', caption: 'Every FlexRay node runs a synchronised global clock, maintained by dedicated sync frames. The whole network agrees what time it is to within a fraction of a microsecond — everything else depends on this.' },
      { label: 'The static segment', caption: 'The cycle is divided into fixed slots, and each slot belongs to exactly one node, permanently. The steering node’s slot arrives at the same offset in every cycle whether the bus is idle or the rest of the car is in electrical meltdown.' },
      { label: 'The dynamic segment', caption: 'The remainder of the cycle is a mini-slot region for event-driven traffic that does not need a guarantee — diagnostics, configuration, infotainment. Priority applies here, but it cannot borrow a microsecond from the static segment.' },
      { label: 'Dual channel', caption: 'Channels A and B run the same schedule. A design may duplicate every frame on both for full redundancy, or split them for double the bandwidth. Safety-critical functions take the redundancy; that is the entire point of paying for FlexRay.' },
    ],
    svg: SVG(400, `
      <g class="dstep" data-hl="1">
        <text x="70" y="28" class="dlab-b">CAN under load</text>
        <rect x="70" y="42" width="600" height="30" rx="5" fill="var(--dg-panel)"/>
        <g fill="#0072b2">
          <rect x="74" y="45" width="70" height="24" rx="3"/><rect x="150" y="45" width="70" height="24" rx="3"/>
          <rect x="226" y="45" width="70" height="24" rx="3"/><rect x="302" y="45" width="70" height="24" rx="3"/>
          <rect x="378" y="45" width="70" height="24" rx="3"/>
        </g>
        <rect x="454" y="45" width="90" height="24" rx="3" fill="#dc2626"/>
        <text x="499" y="62" class="dlab-s" text-anchor="middle" fill="#ffffff">brake</text>
        <path d="M74,86 H454" stroke="var(--status-critical)" stroke-width="1.5"/>
        <path d="M74,80 v12 M454,80 v12" stroke="var(--status-critical)" stroke-width="1.5"/>
        <text x="264" y="104" class="dlab-s" text-anchor="middle" fill="var(--status-critical)">delay depends on what else is talking</text>
        <text x="690" y="62" class="dlab-s" fill="var(--status-critical)">unbounded in the worst case</text>
      </g>

      <g class="dstep" data-layer="2">
        <line x1="70" y1="126" x2="960" y2="126" stroke="var(--dg-line-soft)"/>
        <text x="70" y="154" class="dlab-b" fill="var(--brand-600)">FlexRay &#183; every node shares one clock</text>
        <g fill="#196796">
          <circle cx="120" cy="186" r="16"/><circle cx="220" cy="186" r="16"/>
          <circle cx="320" cy="186" r="16"/><circle cx="420" cy="186" r="16"/>
        </g>
        <path d="M136,186 H204 M236,186 H304 M336,186 H404" stroke="var(--brand-500)" stroke-width="1.5" stroke-dasharray="4 3"/>
        <text x="450" y="190" class="dlab-s" fill="var(--brand-600)">global time agreed to sub-&#181;s by sync frames</text>
      </g>

      <g class="dstep" data-layer="3">
        <text x="70" y="240" class="dlab-s">One communication cycle</text>
        <rect x="70" y="250" width="560" height="38" rx="5" fill="var(--brand-100)"/>
        <g fill="#196796" stroke="#ffffff" stroke-width="1.5">
          <rect x="74" y="253" width="90" height="32" rx="3"/><rect x="168" y="253" width="90" height="32" rx="3"/>
          <rect x="262" y="253" width="90" height="32" rx="3"/><rect x="356" y="253" width="90" height="32" rx="3"/>
          <rect x="450" y="253" width="90" height="32" rx="3"/><rect x="544" y="253" width="82" height="32" rx="3"/>
        </g>
        <g class="dlab-s" text-anchor="middle" fill="var(--dg-surface)">
          <text x="119" y="273">steer</text><text x="213" y="273">brake</text><text x="307" y="273">susp</text>
          <text x="401" y="273">steer</text><text x="495" y="273">brake</text><text x="585" y="273">susp</text>
        </g>
        <text x="350" y="308" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">STATIC SEGMENT &#8212; slot ownership is permanent, assigned at design time</text>
      </g>

      <g class="dstep" data-layer="4">
        <rect x="638" y="250" width="240" height="38" rx="5" fill="var(--status-warning-tint)"/>
        <g fill="#e69f00" stroke="#ffffff" stroke-width="1.5">
          <rect x="642" y="253" width="30" height="32" rx="3"/><rect x="676" y="253" width="30" height="32" rx="3"/>
          <rect x="710" y="253" width="72" height="32" rx="3"/><rect x="786" y="253" width="30" height="32" rx="3"/>
          <rect x="820" y="253" width="54" height="32" rx="3"/>
        </g>
        <text x="758" y="308" class="dlab-s" text-anchor="middle" fill="var(--status-warning-on-tint)">DYNAMIC &#8212; event-driven, priority applies</text>
        <path d="M630,240 V296" stroke="var(--text-tertiary)" stroke-width="2" stroke-dasharray="4 3"/>
        <text x="886" y="273" class="dlab-s">&#8230;</text>
        <rect x="70" y="324" width="890" height="30" rx="6" fill="var(--status-ok-tint)"/>
        <text x="86" y="343" class="dlab-s" fill="var(--status-ok-on-tint)">the dynamic segment can never borrow time from the static one &#8212; that boundary is the safety guarantee</text>
      </g>

      <g class="dstep" data-layer="5">
        <text x="70" y="382" class="dlab-b">Channel A</text>
        <rect x="164" y="368" width="330" height="18" rx="4" fill="#196796"/>
        <text x="524" y="382" class="dlab-b">Channel B</text>
        <rect x="618" y="368" width="330" height="18" rx="4" fill="#2a8ac0"/>
        <text x="164" y="360" class="dlab-s" fill="var(--text-tertiary)">same schedule on both &#8594; duplicate for redundancy, or split for bandwidth</text>
      </g>`),
  },
  how: [
    { h: 'Time-triggered means the schedule is fixed before the car is built', p: 'Every device on a FlexRay network gets an absolute, unmovable time slot measured in fractions of a millisecond. Nothing negotiates at runtime. Even if the rest of the car is experiencing an electrical meltdown, the steering and braking data are guaranteed their exact slot on the network.' },
    { h: 'Determinism is bought with flexibility', p: 'The price of a fixed schedule is that adding a node means recomputing and reflashing the schedule across the network. This is entirely acceptable in a vehicle programme, where the node set is frozen years before production, and entirely unacceptable in a building, where devices are added on a Tuesday.' },
    { h: 'Two channels, two different uses', p: 'FlexRay is dual-channel, and a designer chooses per function what that means: mirror every frame on both channels so a severed cable changes nothing, or run different traffic on each and double the bandwidth. Drive-by-wire functions take redundancy; that is what justifies the cost.' },
  ],
  gotchas: [
    { t: 'The schedule is a build artefact', p: 'Slot assignment is generated by tooling and flashed into every node. There is no runtime discovery.' },
    { t: 'Clock sync is a single point of dependency', p: 'Sync nodes are special. Lose enough of them and the cluster cannot form a schedule at all.' },
    { t: 'Topology is constrained by timing', p: 'Propagation delay is part of the slot budget, so cable lengths and star couplers are engineered, not chosen.' },
    { t: 'Cost is why it stayed rare', p: 'Most manufacturers reached automotive Ethernet instead. FlexRay is largely confined to high-end chassis systems.' },
  ],
},
];
