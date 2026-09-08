const SVG = (h, body) => `<svg class="dgm" viewBox="0 0 1000 ${h}" width="100%" role="img" aria-hidden="true">${body}</svg>`;

export const BAS = [
/* ============================== M-Bus ============================== */
{
  slug: 'MBus', h: 2260,
  expand: 'M-Bus — EN 13757, a two-wire bus designed for one job: walking up to a few hundred utility meters and reading them, without a register map and without a separate power supply.',
  oneLine: 'M-Bus is the answer to a narrow question — how do you read 250 heat, water and gas meters over one cheap pair of wires that also powers them? The two design decisions that follow, powering the slaves from the bus and making every reading carry its own unit, are what separate it from every other fieldbus here.',
  facts: [
    ['Standard', 'EN 13757-2 / -3'],
    ['Wires', '2, non-polarised'],
    ['Signalling', 'Volts down, amps up'],
    ['Devices', '250 per segment'],
    ['Rate', '300 – 9,600 baud'],
  ],
  diagram: {
    title: 'A bus that powers what it reads, and readings that carry their own units',
    sub: 'Two asymmetries make M-Bus work. The master talks by dropping the bus voltage; the slave answers by drawing more current. And unlike a Modbus register, every value comes back tagged with what it is and what it is measured in.',
    steps: [
      { label: 'The bus', caption: 'One master holds roughly 36 V across two wires. Polarity does not matter, which is the single kindest decision in the standard — an installer wiring 250 meters in a riser cannot get it backwards. Each meter draws about 1.5 mA, one "unit load", and runs off that.' },
      { label: 'Master talks', caption: 'The master cannot simply pull the line low, because that line is the slaves’ power. Instead it modulates the voltage: a mark stays at 36 V, a space drops to 24 V. Twelve volts is a big enough step to detect and a small enough dip that every meter downstream stays alive through it.' },
      { label: 'Meter answers', caption: 'A slave has no way to move the bus voltage, so it answers in the other dimension. It increases its own current draw by 11 to 20 mA, and the master senses that as a returning bit. Downlink is voltage, uplink is current, on the same undifferentiated pair.' },
      { label: 'Two frames', caption: 'Almost every exchange is the same pair. The master sends REQ_UD2 — a five-byte short frame carrying only a start byte, the C field, the primary address and a checksum. The meter replies with a long frame: a fixed header identifying the device, then the data records.' },
      { label: 'Self-describing data', caption: 'This is the part worth stealing. Each record begins with a DIF saying how big the value is, and a VIF saying what it measures and at what power of ten. DIF 04 with VIF 06 is "a 32-bit integer of energy in kWh". The meter tells you the unit; you do not look it up in a PDF.' },
    ],
    svg: SVG(470, `
      <g class="dstep" data-layer="1">
        <text x="70" y="26" class="dlab-b">One master, two non-polarised wires, up to 250 meters</text>
        <rect x="70" y="48" width="132" height="52" rx="7" fill="#196796"/>
        <text x="136" y="80" class="dlab-b" text-anchor="middle" fill="#ffffff">M-Bus master</text>
        <path d="M202,64 H930" class="dwire" stroke="var(--dg-a)"/>
        <path d="M202,86 H930" class="dwire" stroke="var(--dg-c)"/>
        <text x="940" y="68" class="dlab-s">36 V</text>
        <text x="940" y="90" class="dlab-s">rtn</text>
        <path d="M343,130 V86 M503,130 V86 M663,130 V86 M823,130 V86" stroke="var(--dg-line)" stroke-width="1.5"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="280" y="130" width="126" height="48" rx="6"/>
          <rect x="440" y="130" width="126" height="48" rx="6"/>
          <rect x="600" y="130" width="126" height="48" rx="6"/>
          <rect x="760" y="130" width="126" height="48" rx="6"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="343" y="151">Heat meter</text>
          <text x="343" y="168">primary 1</text>
          <text x="503" y="151">Water meter</text>
          <text x="503" y="168">primary 2</text>
          <text x="663" y="151">Electricity</text>
          <text x="663" y="168">primary 3</text>
          <text x="823" y="151">Gas meter</text>
          <text x="823" y="168">primary 4</text>
        </g>
        <text x="70" y="199" class="dlab-s">each slave draws one unit load, about 1.5 mA, and is powered by the bus it answers on</text>
      </g>

      <g class="dstep" data-layer="2">
        <text x="70" y="228" class="dlab-b">Master &#8594; meter &#183; modulate the voltage</text>
        <rect x="70" y="240" width="400" height="102" rx="8" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <line x1="140" y1="262" x2="455" y2="262" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <line x1="140" y1="312" x2="455" y2="312" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <text x="84" y="266" class="dlab-s">36 V</text>
        <text x="84" y="316" class="dlab-s">24 V</text>
        <path d="M140,262 H196 V312 H244 V262 H300 V312 H352 V262 H455" class="dwire" stroke="var(--dg-a)"/>
        <text x="140" y="334" class="dlab-s">mark 36 V &#183; space 24 V &#183; slaves stay powered</text>
      </g>

      <g class="dstep" data-layer="3">
        <text x="530" y="228" class="dlab-b">Meter &#8594; master &#183; modulate the current</text>
        <rect x="530" y="240" width="400" height="102" rx="8" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <line x1="614" y1="262" x2="915" y2="262" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <line x1="614" y1="312" x2="915" y2="312" stroke="var(--dg-line)" stroke-dasharray="3 4"/>
        <text x="544" y="266" class="dlab-s">11&#8211;20 mA</text>
        <text x="544" y="316" class="dlab-s">1.5 mA</text>
        <path d="M614,312 H664 V262 H716 V312 H770 V262 H822 V312 H915" class="dwire" stroke="var(--dg-c)"/>
        <text x="614" y="334" class="dlab-s">it cannot drive volts &#8212; only sink amps</text>
      </g>

      <g class="dstep" data-layer="4">
        <text x="70" y="366" class="dlab-b">Short frame asks &#183; long frame answers</text>
        <g stroke="var(--dg-line)" fill="var(--dg-surface)">
          <rect x="70" y="378" width="50" height="32" rx="5"/>
          <rect x="124" y="378" width="50" height="32" rx="5"/>
          <rect x="178" y="378" width="62" height="32" rx="5"/>
          <rect x="244" y="378" width="50" height="32" rx="5"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="95" y="398">10</text>
          <text x="149" y="398">7B</text>
          <text x="209" y="398">addr</text>
          <text x="269" y="398">cs 16</text>
        </g>
        <text x="304" y="398" class="dlab-s">REQ_UD2, 5 bytes</text>
        <text x="530" y="366" class="dlab-b">RSP_UD &#183; variable length</text>
        <g stroke="var(--status-ok)" fill="var(--status-ok-tint)">
          <rect x="530" y="378" width="54" height="32" rx="5"/>
          <rect x="588" y="378" width="76" height="32" rx="5"/>
          <rect x="668" y="378" width="110" height="32" rx="5"/>
          <rect x="782" y="378" width="148" height="32" rx="5"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="557" y="398">68</text>
          <text x="626" y="398">L L 68</text>
          <text x="723" y="398">C A CI</text>
          <text x="856" y="398">header + records</text>
        </g>
      </g>

      <g class="dstep" data-layer="5">
        <text x="70" y="430" class="dlab-b">Every record carries its own type and unit</text>
        <rect x="70" y="440" width="890" height="30" rx="6" fill="var(--brand-100)"/>
        <text x="86" y="459" class="dlab-s" fill="var(--brand-700)">DIF 04 = 32-bit integer &#183; VIF 06 = energy at 10&#179; Wh &#183; 12 345 &#8594; 12 345 kWh, with no register map anywhere in the loop</text>
      </g>`),
  },
  how: [
    { h: 'The bus is the power supply, and that shapes everything', p: 'A meter in a riser cupboard has no mains socket next to it, so M-Bus feeds the slaves from the same pair it talks on. That single constraint explains the rest of the electrical design: the master signals by dipping the voltage rather than shorting the line, because shorting it would brown out every device downstream, and the slave signals by drawing current because raising current is the only thing a bus-powered device can do to a bus it does not control.' },
    { h: 'Unit loads, not device count, is the real limit', p: 'The specification is usually quoted as 250 devices, but the number that binds in practice is the current budget. A standard unit load is about 1.5 mA and a level converter is rated in unit loads, not in meters. A meter that draws three unit loads counts as three, and a repeater that adds distance also adds its own draw. Reach trades against both: roughly 1,000 m at 2,400 baud, considerably less as you push toward 9,600.' },
    { h: 'Two addressing schemes, and you will need the second', p: 'Primary addressing uses a single byte, 1 to 250, set at commissioning — fast, but meters ship with defaults that collide the moment two of them share a bus. Secondary addressing selects a device by its eight-digit fabrication number together with manufacturer, version and medium codes, with wildcards allowed, so a master can enumerate a bus it has never seen. Every real deployment ends up using secondary addressing to discover and primary addressing to poll.' },
  ],
  netix: {
    lead: 'M-Bus is not one of the protocol adapters in libs/netix-protocol-core — the Rust crates there are proto-modbus, proto-bacnet and proto-opcua. M-Bus meters reach a NETIX gateway through a converter, and knowing that changes how you commission them.',
    points: [
      'An M-Bus level converter with a Modbus interface is the usual bridge: it owns the 36 V bus and the polling loop, and exposes each meter reading as holding registers that gateway-drivers picks up with the modbus-rtu or modbus-tcp driver.',
      'That bridge throws away the self-description. The DIF/VIF pair that told you a value was energy in kWh becomes an anonymous 16-bit register pair, so the unit and the scaling have to be re-entered by hand as tag metadata in tag-service — read the converter’s mapping table before trusting a number.',
      'Meter reads are slow by design and that is fine. A heat meter changes on the scale of minutes, so a poll every few minutes is honest data; setting a one-second interval on a 2,400-baud bus with 200 meters just produces timeouts and a tag catalogue full of stale values.',
    ],
  },
  gotchas: [
    { t: 'Primary addresses collide straight out of the box', p: 'Meters ship with a default primary address, often 0. Put two on the same bus and both answer at once. Address them one at a time, or enumerate by secondary address first.' },
    { t: 'Count unit loads, not meters', p: 'The 250-device figure assumes one unit load each. A meter that draws three, or a repeater in the middle of the run, eats the budget far faster than the device count suggests.' },
    { t: 'Never hard-code the scaling factor', p: 'The VIF carries the power of ten. Reading the raw integer and multiplying by a constant you noted during commissioning breaks silently the day a meter is replaced with one that reports in Wh instead of kWh.' },
    { t: 'Wireless M-Bus is a different standard', p: 'EN 13757-4 at 868 MHz shares the application layer and nothing else. A wired M-Bus master will never see a wM-Bus meter; you need a receiver, and usually the encryption keys as well.' },
  ],
},

/* ============================== BACnet MS/TP ============================== */
{
  slug: 'BACnetMSTP', h: 2340,
  expand: 'BACnet MS/TP — the RS-485 half of BACnet, defined in ASHRAE 135 clause 9: masters take turns by passing a token, and one configuration value decides how much of that turn-taking is wasted.',
  oneLine: 'MS/TP is what BACnet looks like when it has to run down a pair of wires to a floor full of VAV boxes. The application layer is identical to BACnet/IP — the same objects, the same services — but the right to transmit is handed round a logical ring, and almost every complaint about a slow BACnet trunk is really a complaint about how that ring is configured.',
  facts: [
    ['Standard', 'ASHRAE 135, clause 9'],
    ['Physical', 'EIA-485, 2 wires'],
    ['Arbitration', 'Token passing'],
    ['Masters', '128 (MAC 0 – 127)'],
    ['Rate', '9.6 k – 115.2 kbaud'],
  ],
  diagram: {
    title: 'The token goes round, and Max_Master decides how much of the trip is wasted',
    sub: 'The wire is an ordinary multidrop bus — the ring exists only in the address numbering. Following the token round once, and counting what it does on the way, explains almost every MS/TP performance problem.',
    steps: [
      { label: 'The trunk', caption: 'One RS-485 pair, up to 1,200 m, with every node hearing every byte. Masters take MAC addresses 0 to 127 and may transmit; slaves take addresses up to 254 and may only answer. Nothing in the wiring says which node goes next — that is entirely a software convention.' },
      { label: 'Passing the token', caption: 'Holding the token is the right to speak. A node sends up to Max_Info_Frames frames — the default is one — and then passes the token to the next master it knows about, in ascending MAC order, wrapping round at the top. Nobody transmits without it, so there are no collisions to detect.' },
      { label: 'Poll For Master', caption: 'A trunk has to notice devices that were not there at power-up. So before passing on, a master sends Poll For Master to the address above its own, looking for someone new. It gets one address per go, and works its way up until somebody answers or it hits the ceiling.' },
      { label: 'Max_Master', caption: 'That ceiling is Max_Master, and it ships set to 127. With twelve devices on the trunk, every master is politely knocking on more than a hundred doors that will never open, and the token spends most of its rotation waiting for timeouts rather than moving data.' },
      { label: 'Sole master', caption: 'If a node polls the whole range and nobody replies at all, it declares itself sole master, keeps the token and carries on — still polling one address per rotation so a device that appears later can join. A single-device trunk is a working trunk, not an error state.' },
      { label: 'Slaves never speak first', caption: 'A slave node never receives the token. It answers when addressed and is silent otherwise, which means it can never send a change-of-value notification or an alarm. If a point has to be event-driven rather than polled, the device holding it has to be a master.' },
    ],
    svg: SVG(480, `
      <g class="dstep" data-layer="1">
        <text x="70" y="26" class="dlab-b">One RS-485 pair &#183; masters share it by taking turns</text>
        <text x="852" y="64" class="dlab-s">RS-485 pair</text>
        <path d="M70,76 H930" class="dwire" stroke="var(--dg-a)"/>
        <path d="M122,90 V76 M298,90 V76 M474,90 V76 M650,90 V76 M826,90 V76" stroke="var(--dg-line)" stroke-width="1.5"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="70" y="90" width="104" height="46" rx="6"/>
          <rect x="246" y="90" width="104" height="46" rx="6"/>
          <rect x="422" y="90" width="104" height="46" rx="6"/>
          <rect x="598" y="90" width="104" height="46" rx="6"/>
        </g>
        <rect x="774" y="90" width="104" height="46" rx="6" fill="var(--dg-panel-2)" stroke="var(--dg-line)"/>
        <g class="dlab-s" text-anchor="middle">
          <text x="122" y="111">AHU ctrl</text>
          <text x="122" y="128">MAC 1</text>
          <text x="298" y="111">VAV box</text>
          <text x="298" y="128">MAC 4</text>
          <text x="474" y="111">VAV box</text>
          <text x="474" y="128">MAC 8</text>
          <text x="650" y="111">Router</text>
          <text x="650" y="128">MAC 12</text>
          <text x="826" y="111">Sensor</text>
          <text x="826" y="128">slave 40</text>
        </g>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M122,136 C122,180 298,180 298,136" class="dwire" stroke="var(--brand-600)"/>
        <path d="M298,136 C298,180 474,180 474,136" class="dwire" stroke="var(--brand-600)"/>
        <path d="M474,136 C474,180 650,180 650,136" class="dwire" stroke="var(--brand-600)"/>
        <path d="M650,140 C650,214 122,214 122,140" class="dwire" stroke="var(--brand-600)" stroke-dasharray="6 5"/>
        <circle cx="210" cy="169" r="6" fill="var(--brand-600)"/>
        <text x="210" y="152" class="dlab-s" text-anchor="middle">token</text>
        <text x="70" y="238" class="dlab-s">only the token holder may transmit, so there is nothing to collide with</text>
      </g>

      <g class="dstep" data-layer="3">
        <text x="70" y="266" class="dlab-b">Poll For Master &#183; one address per rotation</text>
        <g stroke="var(--dg-line)" fill="var(--dg-surface)">
          <rect x="70" y="278" width="24" height="24" rx="4"/>
          <rect x="122" y="278" width="24" height="24" rx="4"/>
          <rect x="148" y="278" width="24" height="24" rx="4"/>
          <rect x="200" y="278" width="24" height="24" rx="4"/>
          <rect x="226" y="278" width="24" height="24" rx="4"/>
          <rect x="252" y="278" width="24" height="24" rx="4"/>
          <rect x="278" y="278" width="24" height="24" rx="4"/>
          <rect x="330" y="278" width="24" height="24" rx="4"/>
          <rect x="356" y="278" width="24" height="24" rx="4"/>
          <rect x="382" y="278" width="24" height="24" rx="4"/>
          <rect x="408" y="278" width="24" height="24" rx="4"/>
          <rect x="434" y="278" width="24" height="24" rx="4"/>
        </g>
        <g fill="var(--brand-600)">
          <rect x="96" y="278" width="24" height="24" rx="4"/>
          <rect x="174" y="278" width="24" height="24" rx="4"/>
          <rect x="304" y="278" width="24" height="24" rx="4"/>
          <rect x="460" y="278" width="24" height="24" rx="4"/>
        </g>
        <text x="82" y="318" class="dlab-s" text-anchor="middle">0</text>
        <text x="108" y="318" class="dlab-s" text-anchor="middle">1</text>
        <text x="186" y="318" class="dlab-s" text-anchor="middle">4</text>
        <text x="316" y="318" class="dlab-s" text-anchor="middle">8</text>
        <text x="472" y="318" class="dlab-s" text-anchor="middle">12</text>
        <text x="500" y="296" class="dlab-s">&#8230;</text>
        <rect x="530" y="278" width="38" height="24" rx="4" fill="none" stroke="var(--dg-line)"/>
        <text x="536" y="295" class="dlab-s">127</text>
        <text x="596" y="295" class="dlab-s">filled = a master that answers &#183; empty = a timeout</text>
      </g>

      <g class="dstep" data-layer="4">
        <text x="70" y="348" class="dlab-b">Max_Master is the ceiling on that search</text>
        <rect x="184" y="360" width="700" height="18" rx="4" fill="var(--status-warning-tint)"/>
        <rect x="184" y="360" width="66" height="18" rx="4" fill="var(--status-ok)"/>
        <text x="70" y="374" class="dlab-s">Max_Master 127</text>
        <text x="896" y="374" class="dlab-s" fill="var(--status-warning-on-tint)">115 dead</text>
        <rect x="184" y="388" width="66" height="18" rx="4" fill="var(--status-ok)"/>
        <text x="70" y="402" class="dlab-s">Max_Master 12</text>
        <text x="266" y="402" class="dlab-s" fill="var(--status-ok-on-tint)">same twelve devices, a fraction of the rotation time</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="70" y="424" width="446" height="30" rx="6" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="86" y="443" class="dlab-s">nobody answers anywhere &#8594; sole master, keeps the token, keeps polling</text>
      </g>

      <g class="dstep" data-layer="6">
        <rect x="540" y="424" width="420" height="30" rx="6" fill="var(--status-warning-tint)"/>
        <text x="556" y="443" class="dlab-s" fill="var(--status-warning-on-tint)">a slave never holds the token &#8212; it can answer, never report</text>
      </g>`),
  },
  how: [
    { h: 'The ring is a numbering convention, not a wiring one', p: 'Nothing about the RS-485 trunk is a ring. Every node is bridged across the same two conductors and hears everything. The ring is purely an agreement that after MAC 4 comes MAC 8, and that whoever holds the token has the exclusive right to transmit until it hands the token on. That is why MS/TP needs no collision detection, and also why a single misbehaving node can stall a whole floor: there is no arbiter to notice that the token never came back.' },
    { h: 'Token rotation time is the real poll budget', p: 'The useful throughput of a trunk is not its baud rate; it is how often the token comes back round to the node you care about. Each rotation costs one turn per master, plus the Poll For Master timeouts spent on empty addresses, plus the turnaround delays the standard mandates between frames. Set Max_Master just above the highest MAC in use, raise Max_Info_Frames on the node doing the integration work, and a trunk that felt broken usually turns out to have been merely polite.' },
    { h: 'Above the token, it is ordinary BACnet', p: 'Once a frame has the bus, everything inside it is the same BACnet you would see on a BACnet/IP capture: the same objects, the same ReadProperty and WriteProperty services, the same priority array. This is the point of the split, and it is why a BACnet router can join an MS/TP trunk to an IP network without translating anything at the application layer — it re-frames the NPDU and forwards it.' },
  ],
  netix: {
    lead: 'There is no MS/TP adapter in libs/netix-protocol-core — proto-bacnet speaks BACnet/IP. An MS/TP trunk reaches a NETIX gateway through a BACnet router, and that indirection is worth understanding before you blame the gateway for slow data.',
    points: [
      'The router presents each MS/TP device on the trunk as an ordinary BACnet/IP device with its own network number, so the bacnet-ip driver in gateway-drivers discovers and polls it exactly as it would a native IP controller.',
      'What the router cannot hide is the token. A ReadPropertyMultiple issued in milliseconds still waits for the trunk’s rotation, so a poll interval shorter than the rotation time simply queues — pick the interval from the trunk, not from what the dashboard would like.',
      'Device instance numbers must be unique across the whole estate, not just per trunk. Two routers each fronting a VAV controller left at the factory default will present two devices claiming the same instance, and discovery will report whichever answered first.',
    ],
  },
  gotchas: [
    { t: 'Max_Master left at the factory 127', p: 'The single most common cause of a sluggish trunk. Every master politely polls every address up to the ceiling. Set it just above the highest MAC actually installed — on every master, not just the router.' },
    { t: 'Duplicate MAC addresses fail intermittently', p: 'Two nodes at the same address both claim the token. The symptom is half the trunk dropping out at random rather than a clean failure, which sends people looking for a cable fault that is not there.' },
    { t: 'A slave-only device cannot raise an alarm', p: 'No token means no unsolicited transmission, so no change-of-value and no event notification. If the point has to be event-driven, the device has to be a master.' },
    { t: 'Autobaud is a commissioning aid, not a setting', p: 'A node still hunting for the baud rate is not passing the token. Pin every device to the same rate once the trunk is stable, and remember that changing it means walking the floor again.' },
  ],
},

/* ============================== BACnet/IP ============================== */
{
  slug: 'BACnetIP', h: 2400,
  expand: 'BACnet/IP — ASHRAE 135 Annex J, which puts BACnet’s named objects onto UDP port 47808 and then has to solve the problem it created: broadcasts do not cross routers.',
  oneLine: 'BACnet’s good idea is that a point describes itself — an object with a name, a present value, engineering units and status flags, rather than an anonymous register you look up in a PDF. Its awkward idea is that devices find each other by shouting on the local subnet, which works beautifully until the estate has more than one subnet.',
  facts: [
    ['Standard', 'ASHRAE 135, Annex J'],
    ['Transport', 'UDP 47808 (0xBAC0)'],
    ['Model', 'Objects and properties'],
    ['Discovery', 'Who-Is / I-Am broadcast'],
    ['Across subnets', 'BBMD + foreign device'],
  ],
  diagram: {
    title: 'Self-describing objects, and the broadcast that stops at the router',
    sub: 'Two halves. The application layer is genuinely pleasant to work with. The network layer inherits one design decision from 1995 — discovery by local broadcast — and BBMDs exist entirely to work around it.',
    steps: [
      { label: 'Objects, not registers', caption: 'A device is a collection of standard objects: analog-input, analog-output, binary-value, schedule, trend-log. Each carries an Object_Name, a Present_Value, Units and Status_Flags. Reading one tells you it is 21.4 degrees Celsius and that the sensor is not in fault — none of which register 40107 could ever tell you.' },
      { label: 'Who-Is, I-Am', caption: 'A client finds devices by broadcasting Who-Is. Every device in earshot answers I-Am with its device instance number, the largest message it can accept, and whether it supports segmentation. This is genuinely lovely: point a tool at a network and the inventory builds itself.' },
      { label: 'Inside the datagram', caption: 'Annex J wraps the BACnet NPDU in a four-byte BVLC header and puts it in a UDP datagram on port 47808 — 0xBAC0, which is the kind of joke that outlives its authors. The function byte says whether this is an ordinary broadcast, a unicast, or one being forwarded on someone else’s behalf.' },
      { label: 'The router says no', caption: 'That Who-Is went to the subnet broadcast address, and a correctly configured IP router will not forward it. Everything on subnet A appears instantly; everything on subnet B is invisible. Nothing is broken, no error is raised, and the discovery tool simply reports fewer devices than exist.' },
      { label: 'BBMD and the BDT', caption: 'The fix is one BACnet Broadcast Management Device per subnet, each holding a Broadcast Distribution Table listing its peers. When BBMD A sees a local broadcast it re-sends it to each peer as a Forwarded-NPDU unicast, which the router is perfectly happy to route, and BBMD B re-broadcasts it locally.' },
      { label: 'Foreign devices', caption: 'A client that lives on no BACnet subnet at all — a gateway in a server rack, a container in a cluster — registers with a BBMD as a foreign device. The BBMD then unicasts broadcast traffic to it for the length of a TTL, and the registration has to be renewed before that TTL expires or the client goes quietly deaf.' },
    ],
    svg: SVG(520, `
      <g class="dstep" data-layer="1">
        <text x="70" y="26" class="dlab-b">A device is a bag of named objects, not a block of registers</text>
        <rect x="70" y="40" width="380" height="110" rx="8" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="86" y="63" class="dlab-s" fill="var(--brand-600)">device:201234 &#183; AHU-2 Controller</text>
        <text x="86" y="86" class="dlab-s">analog-input:1</text>
        <text x="212" y="86" class="dlab-s">21.4</text>
        <text x="286" y="86" class="dlab-s">degrees-celsius</text>
        <text x="86" y="109" class="dlab-s">analog-output:1</text>
        <text x="212" y="109" class="dlab-s">62.0</text>
        <text x="286" y="109" class="dlab-s">percent</text>
        <text x="86" y="132" class="dlab-s">binary-value:4</text>
        <text x="212" y="132" class="dlab-s">active</text>
        <text x="286" y="132" class="dlab-s">no-fault</text>
        <text x="474" y="63" class="dlab-s">every object carries a name, a value,</text>
        <text x="474" y="86" class="dlab-s">its units and its status flags &#8212; so the</text>
        <text x="474" y="109" class="dlab-s">point explains itself, which is exactly</text>
        <text x="474" y="132" class="dlab-s">what a Modbus register never could</text>
      </g>

      <g class="dstep" data-layer="2">
        <text x="70" y="178" class="dlab-b">Discovery is a shout, and an answer from everyone</text>
        <rect x="70" y="190" width="400" height="104" rx="8" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <rect x="86" y="202" width="96" height="34" rx="6" fill="#196796"/>
        <text x="134" y="224" class="dlab-b" text-anchor="middle" fill="#ffffff">Client</text>
        <text x="196" y="216" class="dlab-s">Who-Is &#8594;</text>
        <path d="M196,226 H452" class="dwire" stroke="var(--dg-a)" stroke-dasharray="5 4"/>
        <path d="M232,246 V228 M324,246 V228 M416,246 V228" stroke="var(--dg-line)" stroke-width="1.5"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="196" y="246" width="72" height="32" rx="5"/>
          <rect x="288" y="246" width="72" height="32" rx="5"/>
          <rect x="380" y="246" width="72" height="32" rx="5"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="232" y="266">Dev 1</text>
          <text x="324" y="266">Dev 2</text>
          <text x="416" y="266">Dev 3</text>
        </g>
        <text x="86" y="266" class="dlab-s">&#8592; I-Am</text>
      </g>

      <g class="dstep" data-layer="3">
        <text x="510" y="178" class="dlab-b">Wrapped in BVLC, on UDP 47808</text>
        <g stroke="var(--dg-line)" fill="var(--dg-surface)">
          <rect x="510" y="190" width="450" height="22" rx="4"/>
          <rect x="510" y="216" width="450" height="22" rx="4"/>
          <rect x="510" y="242" width="450" height="22" rx="4"/>
          <rect x="510" y="268" width="450" height="22" rx="4"/>
        </g>
        <text x="526" y="205" class="dlab-s">IP &#183; src 10.20.0.9 &#8594; dst 10.20.0.255</text>
        <text x="526" y="231" class="dlab-s">UDP &#183; sport 47808 &#183; dport 47808</text>
        <text x="526" y="257" class="dlab-s">BVLC &#183; 81 0B Original-Broadcast-NPDU</text>
        <text x="526" y="283" class="dlab-s">NPDU + APDU &#183; unconfirmed Who-Is</text>
      </g>

      <g class="dstep" data-layer="4">
        <text x="70" y="322" class="dlab-b">A local broadcast does not cross a router</text>
        <rect x="70" y="334" width="310" height="62" rx="8" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="86" y="356" class="dlab-s">Subnet A &#183; 10.20.0.0/24</text>
        <rect x="542" y="334" width="310" height="62" rx="8" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="558" y="356" class="dlab-s">Subnet B &#183; 10.30.0.0/24</text>
        <text x="558" y="376" class="dlab-s">silent without a BBMD</text>
        <rect x="406" y="334" width="110" height="62" rx="8" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="461" y="358" class="dlab-s" text-anchor="middle">IP router</text>
        <text x="461" y="378" class="dlab-s" text-anchor="middle" fill="var(--status-critical)">drops it</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="250" y="344" width="118" height="24" rx="5" fill="var(--brand-600)"/>
        <text x="309" y="360" class="dlab-b" text-anchor="middle" fill="var(--brand-on)">BBMD A</text>
        <rect x="722" y="344" width="118" height="24" rx="5" fill="var(--brand-600)"/>
        <text x="781" y="360" class="dlab-b" text-anchor="middle" fill="var(--brand-on)">BBMD B</text>
        <path d="M309,368 C309,420 781,420 781,368" class="dwire" stroke="var(--brand-600)" stroke-dasharray="6 5"/>
        <text x="545" y="430" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">Forwarded-NPDU, unicast &#183; BVLC 81 04</text>
        <text x="70" y="458" class="dlab-s">each BBMD keeps a Broadcast Distribution Table of its peers &#8212; one missing entry and half the estate disappears</text>
      </g>

      <g class="dstep" data-layer="6">
        <rect x="70" y="474" width="890" height="30" rx="6" fill="var(--status-ok-tint)"/>
        <text x="86" y="493" class="dlab-s" fill="var(--status-ok-on-tint)">a client on no BACnet subnet registers as a foreign device &#183; the BBMD unicasts broadcasts to it until the TTL lapses</text>
      </g>`),
  },
  how: [
    { h: 'The object model is the reason to prefer it', p: 'Every BACnet object is an instance of a standard type with standard properties, so a client that has never met a particular device can still read Object_Name, Present_Value, Units and Status_Flags and render something meaningful. Compare the alternative: a Modbus integration begins with a vendor PDF mapping register numbers to meanings, and ends the day that PDF goes out of date. BACnet moves that mapping into the device, where it stays correct.' },
    { h: 'Confirmed and unconfirmed services are a real choice', p: 'ReadProperty and WriteProperty are confirmed — the sender waits for an acknowledgement or an error, and retries. Who-Is, I-Am and unsubscribed COV notifications are unconfirmed: fired and forgotten. That distinction is why a Who-Is sweep is cheap and a ReadPropertyMultiple across two hundred points is not, and why the one you use for discovery is the one you should never rely on for data.' },
    { h: 'BBMDs are infrastructure, and they are stateful', p: 'A BBMD is not a passive relay. It holds a table, it rewrites BVLC function codes, and its peers must all agree about each other. One BBMD per subnet is the rule — two on the same subnet with overlapping tables will happily duplicate every broadcast between them. Treat the BDT as a piece of network configuration under change control, because a Who-Is sweep that suddenly returns fewer devices is far more often a BDT edit than a hardware failure.' },
  ],
  netix: {
    lead: 'BACnet/IP is a first-class adapter in the NETIX edge stack, and the foreign-device path is the one that actually gets used, because a containerised republisher never sits on the building’s own subnet.',
    points: [
      'proto-bacnet in libs/netix-protocol-core provides both sides — a BACnet/IP server for oss/simulators/bacnet-simulator and a discovery-and-polling client for oss/republishers/bacnet-republisher — so the same code is exercised in test and in the field. gateway-drivers ships it as the bacnet-ip driver.',
      'The republisher takes bbmd_address, bbmd_port and bbmd_ttl_secs in its connection config and registers as a foreign device on startup, defaulting to port 47808 and a 300-second TTL. Leave the BBMD address unset and it will only ever see devices on its own segment.',
      'Discovered objects become tags with their units already correct, which is the real operational win over Modbus: the analog-input that reports degrees-celsius arrives in tag-service labelled as such, instead of as a scaled integer somebody has to annotate by hand.',
    ],
  },
  gotchas: [
    { t: 'One BBMD per subnet, and every BDT must agree', p: 'Two BBMDs on the same subnet duplicate broadcasts between them; a BDT missing one peer makes a whole subnet vanish from discovery. The tables are configuration, not autodiscovery — keep them under change control.' },
    { t: 'Foreign device registrations expire silently', p: 'Miss the TTL renewal and unicast reads keep working perfectly while discovery quietly stops. A client that can read the points it already knows but never finds new ones has almost always lapsed its registration.' },
    { t: 'Device instance numbers are estate-wide', p: 'The instance is a 22-bit number that must be unique across the entire BACnet internetwork, not per subnet. Two controllers left at a factory default answer the same Who-Is, and whichever replies first wins.' },
    { t: 'Max APDU and segmentation cap your reads', p: 'A device advertising a 480-byte APDU with no segmentation support will abort a large ReadPropertyMultiple rather than truncate it. Read the I-Am, then size the request to what the device actually said it could take.' },
  ],
},

/* ============================== OPC UA ============================== */
{
  slug: 'OPCUA', h: 2420,
  expand: 'OPC UA — IEC 62541, the standard that replaced Windows-only OPC with a platform-neutral one, and took the opportunity to make the data model a typed graph and the security mandatory rather than optional.',
  oneLine: 'Every other protocol on this page hands you a number and leaves the meaning to a document. OPC UA hands you a node in a graph that points at its own type definition, so a client can walk from a value to what it means without a vendor PDF. The price is a connection sequence with two independent ways to fail before a single value moves.',
  facts: [
    ['Standard', 'IEC 62541'],
    ['Model', 'Typed node graph'],
    ['Transport', 'TCP 4840, or HTTPS'],
    ['Security', 'Channel + session'],
    ['Data delivery', 'Subscriptions, pub/sub'],
  ],
  diagram: {
    title: 'A typed graph, two handshakes, and a server that pushes',
    sub: 'Three things distinguish OPC UA from everything above it on this site: the address space describes itself, security is part of connecting rather than something added later, and the normal way to get data is to subscribe rather than to poll.',
    steps: [
      { label: 'A graph, not a list', caption: 'The address space is nodes joined by typed references. An Objects folder organises a Pump_101 object; that object has components — Speed, Status, Temperature — each a variable node with its own value, data type and engineering unit. Browsing is a graph walk, not an offset calculation.' },
      { label: 'Instances point at types', caption: 'Every instance carries a HasTypeDefinition reference to its type. Follow it and you learn that Pump_101 is a PumpType, and therefore what components it is guaranteed to have. A client written against the type works with every pump on the estate, including ones commissioned after it shipped.' },
      { label: 'Ask what is on offer', caption: 'A session begins with GetEndpoints. The server lists the endpoint URLs it serves, the security policies and modes it will accept, and the kinds of user token it understands. Nothing is assumed — and if that list contains only None, someone has turned the security off rather than configured it.' },
      { label: 'Two handshakes, two failures', caption: 'OpenSecureChannel exchanges certificates: each side must already hold the other’s in its trust list, and neither a password nor a username has been mentioned yet. Only then do CreateSession and ActivateSession carry the user identity. These fail separately, and confusing the two costs an afternoon.' },
      { label: 'Subscribe, do not poll', caption: 'The client creates a subscription with a publishing interval, then adds monitored items with their own sampling intervals and deadbands. The server samples, filters and sends only what changed, in Publish responses. Note that the server returns revised intervals — what you asked for is a request, not a setting.' },
      { label: 'Pub/Sub for the wide area', caption: 'Version 1.04 added a broker-based profile: the same typed payload encoded as UADP or JSON, published over MQTT or raw UDP with no session at all. It gives up per-client sessions to gain many-to-many fan-out, and it is how UA data usually reaches a cloud stack rather than another controller.' },
    ],
    svg: SVG(480, `
      <g class="dstep" data-layer="1">
        <text x="70" y="26" class="dlab-b">The address space is a typed graph, not a point list</text>
        <rect x="70" y="52" width="150" height="38" rx="7" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="145" y="76" class="dlab-s" text-anchor="middle">Objects folder</text>
        <path d="M145,90 V118" stroke="var(--dg-line)" stroke-width="1.5"/>
        <text x="156" y="108" class="dlab-s">Organizes</text>
        <rect x="70" y="118" width="150" height="38" rx="7" fill="#196796"/>
        <text x="145" y="142" class="dlab-b" text-anchor="middle" fill="#ffffff">Pump_101</text>
        <path d="M220,137 C256,137 256,121 290,121" stroke="var(--dg-line)" stroke-width="1.5" fill="none"/>
        <path d="M220,137 C256,137 256,165 290,165" stroke="var(--dg-line)" stroke-width="1.5" fill="none"/>
        <path d="M220,137 C256,137 256,209 290,209" stroke="var(--dg-line)" stroke-width="1.5" fill="none"/>
        <text x="226" y="96" class="dlab-s">HasComponent</text>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="290" y="104" width="170" height="34" rx="6"/>
          <rect x="290" y="148" width="170" height="34" rx="6"/>
          <rect x="290" y="192" width="170" height="34" rx="6"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="375" y="126">Speed &#183; 1450 rpm</text>
          <text x="375" y="170">Status &#183; Running</text>
          <text x="375" y="214">Temp &#183; 62.1 &#176;C</text>
        </g>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M145,156 V192" stroke="var(--brand-600)" stroke-width="1.5" stroke-dasharray="5 4"/>
        <text x="156" y="178" class="dlab-s" fill="var(--brand-600)">HasTypeDefinition</text>
        <rect x="70" y="192" width="150" height="38" rx="7" fill="var(--brand-100)" stroke="var(--brand-600)"/>
        <text x="145" y="216" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">PumpType</text>
        <text x="70" y="252" class="dlab-s">walk to the type and the instance explains itself</text>
      </g>

      <g class="dstep" data-layer="3">
        <text x="530" y="26" class="dlab-b">Two handshakes before one value moves</text>
        <rect x="530" y="40" width="430" height="54" rx="7" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="546" y="62" class="dlab-s" fill="var(--brand-600)">1 &#183; GetEndpoints</text>
        <text x="546" y="82" class="dlab-s">which policies, modes and token types do you take?</text>
      </g>

      <g class="dstep" data-layer="4">
        <rect x="530" y="104" width="430" height="54" rx="7" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="546" y="126" class="dlab-s" fill="var(--brand-600)">2 &#183; OpenSecureChannel</text>
        <text x="546" y="146" class="dlab-s">certificates &#8212; both sides must already trust</text>
        <rect x="530" y="168" width="430" height="54" rx="7" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="546" y="190" class="dlab-s" fill="var(--brand-600)">3 &#183; CreateSession, ActivateSession</text>
        <text x="546" y="210" class="dlab-s">user identity on top &#8212; a separate rejection</text>
        <text x="530" y="252" class="dlab-s" fill="var(--status-warning-on-tint)">BadSecurityChecksFailed is a certificate, not a password</text>
      </g>

      <g class="dstep" data-layer="5">
        <text x="70" y="298" class="dlab-b">Then the server pushes, and the client stops polling</text>
        <rect x="70" y="312" width="130" height="40" rx="7" fill="#196796"/>
        <text x="135" y="337" class="dlab-b" text-anchor="middle" fill="#ffffff">Client</text>
        <rect x="830" y="312" width="130" height="40" rx="7" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="895" y="337" class="dlab-b" text-anchor="middle">Server</text>
        <path d="M200,326 H228" class="dwire" stroke="var(--dg-a)"/>
        <path d="M895,352 V383 H802" class="dwire" stroke="var(--status-ok)" fill="none"/>
        <g stroke="var(--dg-line)" fill="var(--dg-panel)">
          <rect x="230" y="308" width="570" height="26" rx="5"/>
          <rect x="230" y="340" width="570" height="26" rx="5"/>
        </g>
        <rect x="230" y="372" width="570" height="26" rx="5" fill="var(--status-ok-tint)" stroke="var(--status-ok)"/>
        <text x="244" y="325" class="dlab-s">CreateSubscription &#183; publishing interval 1000 ms</text>
        <text x="244" y="357" class="dlab-s">CreateMonitoredItems &#183; sampling 250 ms &#183; deadband 0.5</text>
        <text x="244" y="389" class="dlab-s" fill="var(--status-ok-on-tint)">Publish response &#183; only the items that actually changed</text>
      </g>

      <g class="dstep" data-layer="6">
        <text x="70" y="428" class="dlab-b">And since 1.04, the same model over a broker</text>
        <rect x="70" y="440" width="890" height="30" rx="6" fill="var(--brand-100)"/>
        <text x="86" y="459" class="dlab-s" fill="var(--brand-700)">OPC UA Pub/Sub &#183; the same typed payload as UADP or JSON over MQTT &#183; many-to-many, no session, and the usual road to a cloud stack</text>
      </g>`),
  },
  how: [
    { h: 'Self-description is the whole proposition', p: 'A Modbus integration starts with a register map and a spreadsheet. An OPC UA integration starts with a browse. Because every node carries its data type, its engineering unit and a reference to its type definition, a client can build a usable model of a machine it has never seen, and can be written against PumpType rather than against one particular pump. That is the argument for paying the protocol’s complexity cost, and it only pays off if the server author actually modelled their equipment rather than dumping a flat list of tags into the Objects folder — which, it must be said, plenty do.' },
    { h: 'Security is in the connection sequence, not beside it', p: 'There is no unauthenticated mode that everyone quietly uses in production, the way there is with Modbus or unsecured MQTT. The channel is established with X.509 certificates that both parties must already trust, and the user identity is presented separately once that channel exists. The two layers fail with different status codes, and learning to read them apart — BadSecurityChecksFailed against BadIdentityTokenRejected — is most of what commissioning an OPC UA link consists of.' },
    { h: 'Subscriptions move the filtering to the server', p: 'A monitored item has a sampling interval, a deadband and a queue. The server samples at its own rate, discards values inside the deadband, and only sends what survives, batched into Publish responses at the publishing interval. This is why OPC UA scales to tens of thousands of points where a polling protocol would not: the network carries changes, not readings. Just remember that the server revises the intervals it was asked for and returns the revised numbers, so a client that assumes it got what it requested will silently misreport its own data rate.' },
  ],
  netix: {
    lead: 'OPC UA is the third adapter in libs/netix-protocol-core, alongside Modbus and BACnet, and it is the one that most often fronts packaged plant — chillers, generators and process skids that ship with a UA server built in.',
    points: [
      'proto-opcua implements both sides against async-opcua: a UA server for the simulator and a browsing-and-subscribing client for the republisher. That crate is the one MPL-2.0 dependency in an otherwise Apache-2.0 workspace, deliberately confined to a single crate and recorded in the NOTICE file.',
      'Browse once, then subscribe. Because the address space carries units and data types, discovered nodes arrive in tag-service already labelled, and the subscription does the change filtering on the server rather than at the gateway — a far better fit for a constrained edge box than polling.',
      'Certificate trust is a deployment step, not a code step. The gateway’s client certificate has to be in the server’s trust list before anything works, which means it belongs in commissioning alongside the network configuration and not in a debugging session six weeks later.',
    ],
  },
  gotchas: [
    { t: 'Two rejections that look identical from a distance', p: 'BadSecurityChecksFailed is a certificate trust problem; BadIdentityTokenRejected is credentials. Changing the password will never fix the first, and no amount of certificate work fixes the second.' },
    { t: 'The advertised endpoint URL may not resolve', p: 'GetEndpoints returns the URL the server thinks it has, built from its own hostname. Behind NAT or inside a container that hostname means nothing to the client, so discovery succeeds and the connection that follows it fails.' },
    { t: 'NodeIds are not a stable contract', p: 'Numeric NodeIds can be reshuffled by a firmware update. Resolve by browse path or qualified name and cache the NodeId for the life of a session, rather than hard-coding one into configuration.' },
    { t: 'Your sampling interval is a request', p: 'The server returns revised publishing and sampling intervals, and it is free to give you something slower. A client that logs the value it asked for rather than the value it was given will misreport its own freshness.' },
  ],
},

/* ============================== LON ============================== */
{
  slug: 'LON', h: 2380,
  expand: 'LonWorks — ISO/IEC 14908, Echelon’s 1990 answer to a building full of proprietary controllers: a chip in every device, wire it however you like, and let the devices talk to each other rather than to a master.',
  oneLine: 'LON is the most quietly radical protocol on this site. There is no master and, once it is commissioned, no supervisor either: you bind one device’s output variable to another’s input, and from that moment the two talk directly. Pull the head end out of the rack and the building carries on running.',
  facts: [
    ['Standard', 'ISO/IEC 14908'],
    ['Wires', '2, free topology'],
    ['Rate', '78 kbit/s on FT-10'],
    ['Addressing', 'Domain / subnet / node'],
    ['Model', 'Bound network variables'],
  ],
  diagram: {
    title: 'Wire it any shape, then bind the variables and step out of the way',
    sub: 'Two ideas carry LON. The cable may be any shape an installer finds convenient, and control lives in bindings between devices rather than in a controller above them. The cost of both is a database you must not lose.',
    steps: [
      { label: 'Free topology', caption: 'FT-10 does not care what shape the wire is. Bus, star, loop, or all three on one segment — an installer can spur off wherever it is convenient instead of daisy-chaining a floor in order. The budget is 500 m of wire with a single terminator; doubly terminate it as a plain bus and you get 2,700 m instead.' },
      { label: 'The Neuron', caption: 'Historically every node was built around a Neuron chip carrying a 48-bit ID, burned in at manufacture and unique worldwide. Press the service pin and the node broadcasts that ID, which is how a commissioning tool finds a device it has never seen without anyone typing an address.' },
      { label: 'Network variables', caption: 'Devices expose network variables, and each one has a standard type. An output called nvoSpaceTemp declared as SNVT_temp_p is a temperature in degrees Celsius with its scaling fixed by the type itself. The meaning travels with the variable, which is precisely what a Modbus register number cannot do.' },
      { label: 'Binding', caption: 'This is the idea worth the trip. You bind the sensor’s output variable to the actuator’s input variable, once, at commissioning. After that the two devices exchange values directly, peer to peer, with nothing in the middle. No controller polls them and no supervisor has to be alive for the loop to run.' },
      { label: 'The database', caption: 'The catch is that the bindings were made by a tool and are recorded in an LNS database that lives off the network. The devices know what they are bound to; nothing on the wire tells you why. Lose the database and you can still watch the building work, but you can no longer safely change it.' },
    ],
    svg: SVG(492, `
      <g class="dstep" data-layer="1">
        <text x="70" y="26" class="dlab-b">Free topology &#183; bus, star and loop on one segment</text>
        <text x="70" y="66" class="dlab-s">one terminator</text>
        <rect x="70" y="74" width="16" height="16" fill="var(--dg-c)"/>
        <path d="M86,82 H730" class="dwire" stroke="var(--dg-a)"/>
        <path d="M130,82 V108 M200,82 V108 M270,82 V108" stroke="var(--dg-line)" stroke-width="1.5"/>
        <path d="M510,82 L430,124 M510,82 L510,130 M510,82 L590,124" stroke="var(--dg-line)" stroke-width="1.5"/>
        <path d="M730,82 H890 V122 H730 Z" fill="none" stroke="var(--dg-a)" stroke-width="2"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-a)" stroke-width="2">
          <circle cx="130" cy="108" r="7"/>
          <circle cx="200" cy="108" r="7"/>
          <circle cx="270" cy="108" r="7"/>
          <circle cx="510" cy="82" r="7"/>
          <circle cx="430" cy="124" r="7"/>
          <circle cx="510" cy="130" r="7"/>
          <circle cx="590" cy="124" r="7"/>
          <circle cx="730" cy="82" r="7"/>
          <circle cx="890" cy="82" r="7"/>
          <circle cx="890" cy="122" r="7"/>
          <circle cx="730" cy="122" r="7"/>
        </g>
        <text x="200" y="142" class="dlab-s" text-anchor="middle">bus</text>
        <text x="510" y="154" class="dlab-s" text-anchor="middle">star</text>
        <text x="810" y="142" class="dlab-s" text-anchor="middle">loop</text>
        <text x="70" y="178" class="dlab-s">one segment, three shapes &#8212; FT-10 allows 500 m of free wire and asks for a single terminator</text>
      </g>

      <g class="dstep" data-layer="2">
        <text x="70" y="210" class="dlab-b">Every node is a Neuron, with an identity burned in</text>
        <rect x="70" y="222" width="380" height="30" rx="6" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="86" y="241" class="dlab-s">Neuron ID &#183; 01 2A 4F 90 C3 7E</text>
        <text x="474" y="241" class="dlab-s">48 bits, unique worldwide &#183; the service pin makes a node announce itself</text>
      </g>

      <g class="dstep" data-layer="3">
        <text x="70" y="280" class="dlab-b">Network variables are typed, and the type carries the unit</text>
        <rect x="70" y="292" width="420" height="48" rx="7" fill="var(--brand-100)"/>
        <text x="86" y="312" class="dlab-s" fill="var(--brand-700)">nvoSpaceTemp &#183; SNVT_temp_p</text>
        <text x="86" y="330" class="dlab-s" fill="var(--brand-700)">degrees Celsius, with the scaling fixed by the type</text>
        <rect x="530" y="292" width="430" height="48" rx="7" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="546" y="312" class="dlab-s">the Modbus equivalent &#183; register 40107</text>
        <text x="546" y="330" class="dlab-s">a 16-bit number, and a PDF that explains it</text>
      </g>

      <g class="dstep" data-layer="4">
        <text x="70" y="366" class="dlab-b">Bind once, and the two nodes talk with nothing in between</text>
        <text x="436" y="384" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">binding</text>
        <rect x="70" y="390" width="150" height="42" rx="7" fill="#196796"/>
        <text x="145" y="416" class="dlab-b" text-anchor="middle" fill="#ffffff">Sensor</text>
        <path d="M220,411 H232" class="dwire" stroke="var(--status-ok)"/>
        <path d="M356,411 H516" class="dwire" stroke="var(--status-ok)"/>
        <path d="M640,411 H660" class="dwire" stroke="var(--status-ok)"/>
        <rect x="232" y="398" width="124" height="26" rx="5" fill="var(--brand-100)" stroke="var(--brand-600)"/>
        <text x="294" y="415" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">nvoTemp</text>
        <rect x="516" y="398" width="124" height="26" rx="5" fill="var(--brand-100)" stroke="var(--brand-600)"/>
        <text x="578" y="415" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">nviTemp</text>
        <rect x="660" y="390" width="150" height="42" rx="7" fill="#196796"/>
        <text x="735" y="416" class="dlab-b" text-anchor="middle" fill="#ffffff">Actuator</text>
        <text x="826" y="415" class="dlab-s">no controller in the path</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="70" y="446" width="890" height="30" rx="6" fill="var(--status-warning-tint)"/>
        <text x="86" y="465" class="dlab-s" fill="var(--status-warning-on-tint)">the bindings live in the LNS database, not on the wire &#8212; lose it and you can read the network but not safely change it</text>
      </g>`),
  },
  how: [
    { h: 'Peer-to-peer is the architecture, not an optimisation', p: 'Most protocols on this site have something in the middle: a Modbus master, a BACnet client, an OPC UA server. LON has one only while you are commissioning. A bound network variable update is sent by the producing node straight to the consuming node, so the control loop is distributed across the devices that implement it. The practical consequence is resilience — a failed head end costs you visibility and scheduling, not the building — and the practical cost is that the running logic is spread across a hundred devices instead of being written down in one place.' },
    { h: 'Free topology is a labour-saving decision', p: 'FT-10 transceivers tolerate reflections well enough that the cable may branch anywhere, which is the difference between pulling a neat daisy chain through a finished ceiling and spurring off the nearest run. It is not unconditional: free topology means 500 m of total wire, 400 m between the two most distant nodes and exactly one terminator. Wire it as a doubly terminated bus instead and the budget changes to 2,700 m — the same transceiver, a different set of rules, and confusing the two produces a segment that works until the day someone adds a spur.' },
    { h: 'Addressing has three levels, and only two of them are yours', p: 'A commissioned node has a domain, a subnet and a node number. The domain separates logically independent networks that share a cable; within one there are 255 subnets of 127 nodes, so a domain holds a little over 32,000 devices. The 48-bit Neuron ID underneath all of that is a manufacturing identity, not an address — it is used to find a device and assign it a real address, and then largely forgotten.' },
  ],
  netix: {
    lead: 'There is no LON adapter in libs/netix-protocol-core — the crates are proto-modbus, proto-bacnet and proto-opcua. A LonWorks estate reaches a NETIX gateway through a translating router, and what that router throws away matters more here than for most protocols.',
    points: [
      'The usual bridge is a LON-to-BACnet router that presents each node’s network variables as BACnet objects on a BACnet/IP network, which the bacnet-ip driver in gateway-drivers then discovers exactly as it would a native controller.',
      'The bindings do not survive the translation. What arrives is a point list; the peer-to-peer relationships that actually run the building are invisible from the NETIX side. A loop can be working perfectly while the cloud view shows a value that nothing appears to be driving — check the bindings in the LNS database before treating that as a fault.',
      'SNVT typing survives only if the router was configured to carry it. Done properly, an analog object arrives with its units already correct; done lazily, you get raw counts and you are back to annotating tags by hand in tag-service, the same loss described on the M-Bus page.',
    ],
  },
  gotchas: [
    { t: 'The LNS database is the installation', p: 'Bindings and device configuration live in a tool database, not on the wire. Without a current backup you can watch the network run but cannot safely change it — and rebuilding one from a live network is a survey, not a restore.' },
    { t: 'Free topology and bus wiring have different budgets', p: 'Free topology is 500 m of wire, 400 m node to node, one terminator. A doubly terminated bus is 2,700 m and two terminators. The same transceiver, two rulebooks, and a segment that mixes them works right up until someone adds a spur.' },
    { t: 'A new node out of the box does nothing', p: 'It has a Neuron ID and no domain, no subnet or node address and no bindings. Swapping in a replacement device is a commissioning job, not a wiring job, and it needs the tool and the database to complete.' },
    { t: 'SNVTs constrain rather than convert', p: 'Two variables can only be bound if their types match; there is no implicit conversion. And a vendor’s non-standard type is legal but only its own tool understands it, which is how an estate ends up depending on one piece of software.' },
  ],
},

/* ============================== KNX ============================== */
{
  slug: 'KNX', h: 2400,
  expand: 'KNX — ISO/IEC 14543-3, the 2002 merger of EIB, BatiBUS and EHS: a bus-powered pair, no controller, and devices that talk to a number rather than to each other.',
  oneLine: 'KNX inverts the thing most people assume about a light switch. The switch does not know which lamp it operates and has no way to address one; it sends a value to a group address, and every device that was told to listen to that number reacts. Rewiring the building is then an edit in a project file rather than a change to the cable.',
  facts: [
    ['Standard', 'ISO/IEC 14543-3'],
    ['Wires', '2, bus-powered'],
    ['Rate', '9,600 bit/s on TP1'],
    ['Devices', '64 per segment'],
    ['Model', 'Group addresses'],
  ],
  diagram: {
    title: 'One pair, two kinds of address, and a value sent to a number',
    sub: 'Follow a button press across the bus. The individual address plays no part in it, the group address does all the work, and the datapoint type is the only thing making the bytes mean anything.',
    steps: [
      { label: 'The line', caption: 'A single twisted pair at 9,600 bit/s carries both the data and roughly 29 V of power, so most devices need no supply of their own. Up to 64 sit on a segment, wired in any shape except a ring, and the whole line runs from one power supply with a choke on it.' },
      { label: 'Two addresses', caption: 'Every device has an individual address like 1.1.5 — area, line, device — and it is used only to program and diagnose that device. The address that matters in service is the group address, written 1/2/3, and it belongs to a function rather than to any piece of hardware.' },
      { label: 'A value to a number', caption: 'Press the switch and it puts a value on the bus addressed to 1/2/3. It does not know what will happen. Every device configured to listen to 1/2/3 receives it and acts — three lamps and a fan here, one lamp elsewhere in the building, whatever the project says. There is no controller and no polling.' },
      { label: 'Datapoint types', caption: 'The bus carries bytes, so both ends have to agree what they mean. DPT 1.001 is a one-bit switch; DPT 9.001 is a two-byte float holding degrees Celsius. Get this wrong and nothing errors — a value arrives, it is decoded by the wrong rule, and the number that reaches your dashboard is merely plausible.' },
      { label: 'The project file', caption: 'Nothing on the bus records that 1/2/3 means the lamps in meeting room two. That lives in the ETS project, along with every parameter of every device. It is the single most valuable artefact in a KNX installation and the one most often missing when somebody inherits a building.' },
    ],
    svg: SVG(520, `
      <g class="dstep" data-layer="1">
        <text x="70" y="26" class="dlab-b">One twisted pair, carrying the data and the power</text>
        <rect x="70" y="64" width="120" height="42" rx="7" fill="#196796"/>
        <text x="130" y="90" class="dlab-b" text-anchor="middle" fill="#ffffff">PSU 29 V</text>
        <path d="M190,85 H930" class="dwire" stroke="var(--dg-a)"/>
        <text x="940" y="89" class="dlab-s">TP1</text>
        <path d="M290,120 V85 M460,120 V85 M630,120 V85 M810,120 V85" stroke="var(--dg-line)" stroke-width="1.5"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="230" y="120" width="120" height="46" rx="6"/>
          <rect x="400" y="120" width="120" height="46" rx="6"/>
          <rect x="570" y="120" width="120" height="46" rx="6"/>
          <rect x="750" y="120" width="120" height="46" rx="6"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="290" y="141">Switch</text>
          <text x="290" y="158">1.1.5</text>
          <text x="460" y="141">Dimmer</text>
          <text x="460" y="158">1.1.9</text>
          <text x="630" y="141">Actuator</text>
          <text x="630" y="158">1.1.12</text>
          <text x="810" y="141">Sensor</text>
          <text x="810" y="158">1.1.20</text>
        </g>
        <text x="70" y="186" class="dlab-s">9,600 bit/s, up to 64 devices on a segment, every one of them powered from the pair it talks on</text>
      </g>

      <g class="dstep" data-layer="2">
        <text x="70" y="214" class="dlab-b">Two addresses, two entirely different jobs</text>
        <rect x="70" y="226" width="430" height="46" rx="7" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="86" y="246" class="dlab-s">Individual &#183; 1.1.5 &#183; area . line . device</text>
        <text x="86" y="264" class="dlab-s">used to program and diagnose, never in service</text>
        <rect x="530" y="226" width="430" height="46" rx="7" fill="var(--brand-100)"/>
        <text x="546" y="246" class="dlab-s" fill="var(--brand-700)">Group &#183; 1/2/3 &#183; main / middle / sub</text>
        <text x="546" y="264" class="dlab-s" fill="var(--brand-700)">the only address that carries a value</text>
      </g>

      <g class="dstep" data-layer="3">
        <text x="70" y="298" class="dlab-b">A switch does not address a lamp &#8212; it addresses a number</text>
        <rect x="70" y="310" width="130" height="42" rx="7" fill="#196796"/>
        <text x="135" y="336" class="dlab-b" text-anchor="middle" fill="#ffffff">Switch</text>
        <path d="M200,331 H250" class="dwire" stroke="var(--dg-a)"/>
        <path d="M370,331 H860" class="dwire" stroke="var(--brand-600)"/>
        <path d="M500,362 V331 M660,362 V331 M820,362 V331" stroke="var(--dg-line)" stroke-width="1.5"/>
        <rect x="250" y="317" width="120" height="28" rx="14" fill="var(--brand-600)"/>
        <text x="310" y="336" class="dlab-b" text-anchor="middle" fill="var(--brand-on)">1/2/3</text>
        <g fill="var(--status-ok-tint)" stroke="var(--status-ok)">
          <rect x="430" y="362" width="140" height="34" rx="6"/>
          <rect x="590" y="362" width="140" height="34" rx="6"/>
          <rect x="750" y="362" width="140" height="34" rx="6"/>
        </g>
        <g class="dlab-s" text-anchor="middle">
          <text x="500" y="383">Lamp 1</text>
          <text x="660" y="383">Lamp 2</text>
          <text x="820" y="383">Fan</text>
        </g>
        <text x="70" y="383" class="dlab-s">every subscriber acts at once</text>
      </g>

      <g class="dstep" data-layer="4">
        <text x="70" y="412" class="dlab-b">The payload is typed, and both ends must agree</text>
        <rect x="70" y="424" width="430" height="44" rx="7" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="86" y="444" class="dlab-s">DPT 1.001 &#183; switch &#183; one bit</text>
        <text x="86" y="462" class="dlab-s">on or off, and nothing else fits in it</text>
        <rect x="530" y="424" width="430" height="44" rx="7" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <text x="546" y="444" class="dlab-s">DPT 9.001 &#183; temperature &#183; two bytes</text>
        <text x="546" y="462" class="dlab-s">a float in degrees Celsius</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="70" y="480" width="890" height="30" rx="6" fill="var(--status-warning-tint)"/>
        <text x="86" y="499" class="dlab-s" fill="var(--status-warning-on-tint)">the group addresses and every device parameter live in the ETS project file, not on the bus &#8212; no project, no safe change</text>
      </g>`),
  },
  how: [
    { h: 'A group address is a function, not a device', p: 'This is the whole design. 1/2/3 does not mean "the actuator in cupboard four"; it means "the lights in meeting room two", and any number of devices may send to it or listen to it. Adding a second switch to a room is a project edit and a download, with no new cable. Splitting one room into two is the same. The building’s behaviour is expressed in the assignment of group addresses rather than in the topology of the wire, which is why a KNX installation can be re-purposed so much more cheaply than a conventionally wired one.' },
    { h: 'Areas, lines and the filter tables between them', p: 'A line segment holds 64 devices; repeaters take a line to four segments, line couplers join fifteen lines into an area, and a backbone joins fifteen areas — tens of thousands of devices in one installation. The couplers are not just repeaters: each holds a filter table saying which group addresses are worth passing upward. A coupler that forwards everything turns the entire installation into one broadcast domain, and at 9,600 bit/s that is a small budget to spend on traffic nobody needed.' },
    { h: 'Bus-powered, and that is a design constraint too', p: 'The same pair carries roughly 29 V, and a device draws its operating current from it. That is why a KNX switch needs no local supply and why a line has a power budget as real as its device count. It also means the bus stays alive through a lighting-circuit failure, which is exactly what you want from the network that is supposed to tell you the lighting circuit failed.' },
  ],
  netix: {
    lead: 'Like LON, KNX has no adapter in libs/netix-protocol-core. It reaches a NETIX gateway through a KNX/IP gateway configured by hand, and the quality of that hand-configuration is the whole story.',
    points: [
      'The usual bridge presents selected group addresses as BACnet objects or Modbus registers, picked up by the bacnet-ip or modbus-rtu / modbus-tcp drivers in gateway-drivers. Only the group addresses somebody chose to expose exist as far as NETIX is concerned.',
      'That mapping has to come from the ETS project, because nothing else knows what 1/2/3 means. Ask for the .knxproj file rather than a spreadsheet someone transcribed — the transcription is where wrong units and stale group addresses get introduced, and neither shows up as an error.',
      'The DPT is lost in the same way M-Bus loses its DIF/VIF: a DPT 9.001 temperature arrives as a bare number and the unit has to be re-entered as tag metadata in tag-service. Get the DPT wrong at the gateway and the value still arrives, still looks reasonable, and is wrong.',
    ],
  },
  gotchas: [
    { t: 'No ETS project, no changes', p: 'The project file is the only record of what each group address means and how every device is parameterised. Without it, modifying an installation starts with surveying it device by device.' },
    { t: 'Both ends must agree the datapoint type', p: 'The bus carries bytes and checks nothing. Send DPT 9.001 to something expecting DPT 5.001 and no error is raised anywhere — a plausible wrong number simply appears and stays.' },
    { t: 'Individual addresses are not for control', p: 'Addressing 1.1.5 directly works for diagnostics and is the wrong tool for operation. Couplers filter on group addresses, so point-to-point traffic crosses the installation in a way group traffic would not.' },
    { t: 'An unfiltered coupler slows everything', p: 'A coupler passing all group addresses makes every line carry every telegram. The symptom is a bus that feels sluggish everywhere at once rather than on the line somebody changed, which sends people hunting on the wrong floor.' },
  ],
},
];
