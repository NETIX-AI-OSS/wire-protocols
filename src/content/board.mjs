const SVG = (h, body) => `<svg class="dgm" viewBox="0 0 1000 ${h}" width="100%" role="img" aria-hidden="true">${body}</svg>`;

export const BOARD = [
/* ============================== UART ============================== */
{
  slug: 'UART', h: 2180,
  expand: 'Universal Asynchronous Receiver/Transmitter — two wires, no shared clock, and a baud rate both ends agreed on in advance.',
  oneLine: 'UART is the simplest way two chips can hold a conversation: one wire each direction, and a pre-agreed speed standing in for a clock line. It is not the fastest protocol available, but it is dead simple to set up, which is why it is still everywhere.',
  facts: [
    ['Wires', '2 (TX, RX)'],
    ['Clocking', 'Asynchronous'],
    ['Typical rate', '9.6k – 115.2k baud'],
    ['Topology', 'Point-to-point'],
    ['Devices', '2'],
  ],
  diagram: {
    title: 'One UART frame, bit by bit',
    sub: 'The character 0x41 ("A") on the wire at 8-N-1. With no clock to follow, the receiver locks onto the falling edge of the start bit and then counts.',
    steps: [
      { label: 'Idle', caption: 'With nothing to send, the line rests at logic high. That resting state is what makes the next falling edge unambiguous — a break in the idle is always the start of a frame.' },
      { label: 'Start bit', caption: 'The transmitter pulls the line low for exactly one bit time. The receiver sees the falling edge, starts its own timer, and from here on it is counting rather than following.' },
      { label: '8 data bits', caption: 'The byte goes out least-significant bit first. 0x41 becomes 1,0,0,0,0,0,1,0 on the wire — read the waveform left to right and you are reading the byte backwards.' },
      { label: 'Parity + stop', caption: 'An optional parity bit (even parity here, so 0 for the two set bits in 0x41), then the stop bit returns the line high — which doubles as the idle state for whatever comes next.' },
      { label: 'Sampling', caption: 'The receiver samples in the middle of each cell, where the signal is most settled. This is also where UART fails: timing error accumulates from the start edge, and once the drift passes half a bit the sample lands in the wrong cell. That is around 5% total error for an 8-N-1 frame — which is why 2% per end is the conventional design margin.' },
    ],
    svg: SVG(310, `
      <g opacity="0.9">
        <line x1="70" y1="90" x2="960" y2="90" stroke="var(--dg-line)" stroke-width="1" stroke-dasharray="3 4"/>
        <line x1="70" y1="150" x2="960" y2="150" stroke="var(--dg-line)" stroke-width="1" stroke-dasharray="3 4"/>
        <text x="42" y="94" class="dlab-s" text-anchor="end">1</text>
        <text x="42" y="154" class="dlab-s" text-anchor="end">0</text>
        <text x="70" y="42" class="dlab-b">TX line</text>
        <text x="150" y="42" class="dlab-s">8 data bits &#183; even parity &#183; 1 stop &#183; 115200 baud &#8594; 8.68 &#181;s per bit</text>
      </g>
      <g opacity="0.55">
        <path d="M142,60 V196 M214,60 V196 M790,60 V196 M862,60 V196 M934,60 V196" stroke="var(--dg-line)" stroke-width="1"/>
        <path d="M286,66 V190 M358,66 V190 M430,66 V190 M502,66 V190 M574,66 V190 M646,66 V190 M718,66 V190" stroke="var(--dg-line-soft)" stroke-width="1"/>
      </g>

      <g class="dstep" data-layer="1">
        <path d="M70,90 H142" class="dwire" stroke="var(--text-tertiary)"/>
        <text x="106" y="214" class="dlab-s" text-anchor="middle">idle</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M142,90 V150 H214" class="dwire" stroke="var(--dg-c)"/>
        <rect x="142" y="60" width="72" height="136" fill="#d55e00" opacity="0.07"/>
        <text x="178" y="214" class="dlab-s" text-anchor="middle" fill="var(--dg-c)">START</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M214,150 V90 H286 V150 H646 V90 H718 V150 H790" class="dwire" stroke="var(--dg-a)"/>
        <text x="250" y="214" class="dlab-s" text-anchor="middle">d0</text>
        <text x="322" y="214" class="dlab-s" text-anchor="middle">d1</text>
        <text x="394" y="214" class="dlab-s" text-anchor="middle">d2</text>
        <text x="466" y="214" class="dlab-s" text-anchor="middle">d3</text>
        <text x="538" y="214" class="dlab-s" text-anchor="middle">d4</text>
        <text x="610" y="214" class="dlab-s" text-anchor="middle">d5</text>
        <text x="682" y="214" class="dlab-s" text-anchor="middle">d6</text>
        <text x="754" y="214" class="dlab-s" text-anchor="middle">d7</text>
        <text x="250" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">1</text>
        <text x="322" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0</text>
        <text x="394" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0</text>
        <text x="466" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0</text>
        <text x="538" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0</text>
        <text x="610" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0</text>
        <text x="682" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">1</text>
        <text x="754" y="232" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0</text>
        <text x="502" y="262" class="dlab" text-anchor="middle" fill="var(--dg-a)">0x41 &#8594; LSB first &#8594; 1 0 0 0 0 0 1 0</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M790,150 H862 V90 H934" class="dwire" stroke="var(--dg-b)"/>
        <text x="826" y="214" class="dlab-s" text-anchor="middle" fill="var(--dg-b)">PAR</text>
        <text x="898" y="214" class="dlab-s" text-anchor="middle" fill="var(--dg-b)">STOP</text>
      </g>

      <g class="dstep" data-layer="5">
        <g stroke="var(--status-ok)" stroke-width="1.5" fill="none">
          <path d="M250,196 V178 M322,196 V178 M394,196 V178 M466,196 V178 M538,196 V178 M610,196 V178 M682,196 V178 M754,196 V178"/>
        </g>
        <g fill="#16a34a">
          <circle cx="250" cy="176" r="3"/><circle cx="322" cy="176" r="3"/><circle cx="394" cy="176" r="3"/>
          <circle cx="466" cy="176" r="3"/><circle cx="538" cy="176" r="3"/><circle cx="610" cy="176" r="3"/>
          <circle cx="682" cy="176" r="3"/><circle cx="754" cy="176" r="3"/>
        </g>
        <rect x="640" y="272" width="320" height="28" rx="6" fill="var(--status-critical-tint)"/>
        <text x="656" y="290" class="dlab-s" fill="var(--status-critical)">&#9888; ~5% total baud error misses the cell by d7</text>
      </g>`),
  },
  how: [
    { h: 'No clock line, so both ends guess in step', p: 'Every other synchronous bus ships a clock alongside the data. UART does not — the "A" in UART is asynchronous. Instead both ends are configured to the same baud rate beforehand, and each reconstructs the bit boundaries locally from the start-bit edge. It is two people agreeing to speak at the same pace before a conversation starts.' },
    { h: 'The frame carries its own framing', p: 'Because there is no clock and no addressing, everything the receiver needs is inside the frame: a start bit to trigger on, a fixed number of data bits, an optional parity bit, and one or two stop bits to guarantee the line returns high before the next start edge can be recognised.' },
    { h: 'Two wires, and they are not symmetrical', p: 'TX on one device goes to RX on the other, and vice versa. Getting that crossover wrong is the single most common UART bring-up failure, which is why null-modem cables and TX/RX swap jumpers exist. The link is inherently point-to-point: there is no address field, so a third listener can only eavesdrop.' },
  ],
  netix: {
    lead: 'UART is the bring-up and recovery path on NETIX edge hardware rather than a production data path. When a gateway will not boot far enough to bring up its network stack, the serial console is what is left.',
    points: [
      'Raspberry Pi gateways provisioned by platform/edge expose a serial console for first-boot diagnosis before networking comes up.',
      'Several field devices a gateway driver talks to are UART underneath — RS-485 is a UART frame with different electrical levels bolted on top.',
      'Rule of thumb on site: if a device speaks "serial", ask whether that means the frame format (UART) or the electrical standard (RS-232, RS-485). They are separate choices and both must match.',
    ],
  },
  gotchas: [
    { t: 'Baud mismatch looks like corruption', p: 'Wrong baud does not error — it delivers plausible-looking wrong bytes. Check the rate before you debug the payload.' },
    { t: 'TX/RX crossover', p: 'Device-to-device needs a crossover; device-to-adapter usually does not. Half of all "dead" UART links are this.' },
    { t: 'Voltage levels are not part of UART', p: '3.3 V and 5 V logic both call themselves UART. Wiring one to the other can destroy the 3.3 V part.' },
    { t: 'No flow control by default', p: 'Without RTS/CTS a fast sender silently overruns a slow receiver. The bytes are simply gone.' },
  ],
},

/* ============================== SPI ============================== */
{
  slug: 'SPI', h: 2260,
  expand: 'Serial Peripheral Interface — four wires, a shared clock, and full-duplex data at tens of megahertz.',
  oneLine: 'SPI is what you reach for when you need speed and you can spare the pins. A clock line keeps both ends locked in step, so there is no baud rate to agree on and no framing overhead — but every extra device costs another chip-select wire.',
  facts: [
    ['Wires', '3 + 1 CS per device'],
    ['Clocking', 'Synchronous'],
    ['Typical rate', '1 – 100 MHz'],
    ['Topology', 'Single controller'],
    ['Duplex', 'Full'],
  ],
  diagram: {
    title: 'A single-byte SPI transfer, and what a second device costs',
    sub: 'Clock, data out, data in and chip select. The controller drives the clock, so there is nothing to agree on in advance — everyone follows the same beat.',
    steps: [
      { label: 'Idle', caption: 'Chip select rests high, the clock is parked, and nothing on the bus is listening. A peripheral with CS high must leave MISO in high-impedance so it does not fight the others.' },
      { label: 'Assert CS', caption: 'The controller pulls one peripheral’s chip select low. That single line is the entire addressing scheme in SPI — there are no address bytes, so whichever device is selected is the one in the conversation.' },
      { label: 'Clock runs', caption: 'Eight clock pulses leave the controller. This is what "synchronous" buys: no start bit, no stop bit, no parity, no baud agreement. The clock edge is the timing reference for both directions.' },
      { label: 'Data both ways', caption: 'MOSI and MISO shift simultaneously — SPI is genuinely full duplex. Every byte the controller sends clocks a byte back, which is why reads are written as "send a dummy byte, keep what comes back".' },
      { label: 'Release CS', caption: 'Chip select returns high, the peripheral releases MISO, and the transaction is over. Framing is entirely positional: the CS window is the frame.' },
      { label: 'A second device', caption: 'Adding peripherals adds a chip-select line each, straight back to the controller. Four sensors is seven wires, and this is exactly the wire count that pushes designs toward I²C.' },
    ],
    svg: SVG(400, `
      <g opacity="0.9">
        <text x="70" y="30" class="dlab-b">Timing</text>
        <text x="145" y="30" class="dlab-s">mode 0 &#183; CPOL=0 &#183; CPHA=0 &#183; sample on rising edge</text>
      </g>
      <g opacity="0.6">
        <text x="60" y="66" class="dlab" text-anchor="end">SCLK</text>
        <text x="60" y="122" class="dlab" text-anchor="end">MOSI</text>
        <text x="60" y="178" class="dlab" text-anchor="end">MISO</text>
        <text x="60" y="234" class="dlab" text-anchor="end">CS</text>
      </g>

      <g class="dstep" data-layer="1">
        <path d="M76,60 H900" class="dwire" stroke="var(--dg-line)"/>
        <path d="M76,116 H900" class="dwire" stroke="var(--dg-line)"/>
        <path d="M76,172 H900" class="dwire" stroke="var(--dg-line)"/>
        <text x="916" y="64" class="dlab-s">parked</text>
        <text x="916" y="176" class="dlab-s">Hi-Z</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M76,222 H150 V250 H820 V222 H900" class="dwire" stroke="var(--dg-c)"/>
        <rect x="150" y="40" width="670" height="222" fill="#d55e00" opacity="0.05"/>
        <text x="485" y="278" class="dlab-s" text-anchor="middle" fill="var(--dg-c)">CS low &#8212; this window is the whole frame</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M150,60 H190 V38 H230 V60 H270 V38 H310 V60 H350 V38 H390 V60 H430 V38 H470 V60 H510 V38 H550 V60 H590 V38 H630 V60 H670 V38 H710 V60 H750 V38 H790 V60 H820" class="dwire" stroke="var(--dg-b)"/>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M150,116 H230 V94 H390 V116 H470 V94 H550 V116 H630 V94 H710 V116 H820" class="dwire" stroke="var(--dg-a)"/>
        <path d="M150,172 H310 V150 H470 V172 H550 V150 H630 V172 H710 V150 H820" class="dwire" stroke="var(--dg-d)"/>
        <text x="836" y="120" class="dlab-s" fill="var(--dg-a)">0x6A out</text>
        <text x="836" y="176" class="dlab-s" fill="var(--dg-d)">0x35 in</text>
        <g opacity="0.85">
          <path d="M190,300 V286 M270,300 V286 M350,300 V286 M430,300 V286 M510,300 V286 M590,300 V286 M670,300 V286 M750,300 V286" stroke="var(--status-ok)" stroke-width="1.5"/>
          <text x="470" y="316" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">both ends latch on the same rising edge &#8212; full duplex, no dead time</text>
        </g>
      </g>

      <g class="dstep" data-layer="5">
        <circle cx="820" cy="236" r="5" fill="#d55e00"/>
        <text x="836" y="240" class="dlab-s" fill="var(--dg-c)">frame ends</text>
      </g>

      <g class="dstep" data-layer="6">
        <line x1="70" y1="336" x2="960" y2="336" stroke="var(--dg-line-soft)" stroke-width="1"/>
        <rect x="70" y="352" width="112" height="40" rx="7" fill="#196796"/>
        <text x="126" y="376" class="dlab-b" text-anchor="middle" fill="#ffffff">Controller</text>
        <g stroke="var(--dg-a)" class="dwire">
          <path d="M182,362 H300"/><path d="M182,368 H520"/><path d="M182,374 H740"/>
        </g>
        <g stroke="var(--dg-c)" class="dwire" stroke-dasharray="4 3">
          <path d="M182,382 H300 V368"/><path d="M182,386 H520 V368"/><path d="M182,390 H740 V368"/>
        </g>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="300" y="352" width="96" height="34" rx="7"/>
          <rect x="520" y="352" width="96" height="34" rx="7"/>
          <rect x="740" y="352" width="96" height="34" rx="7"/>
        </g>
        <text x="348" y="373" class="dlab-s" text-anchor="middle">Flash</text>
        <text x="568" y="373" class="dlab-s" text-anchor="middle">Display</text>
        <text x="788" y="373" class="dlab-s" text-anchor="middle">SD card</text>
        <text x="860" y="373" class="dlab-s" fill="var(--dg-c)">+1 CS wire each</text>
      </g>`),
  },
  how: [
    { h: 'The clock removes every guess', p: 'One device is always the controller and it owns SCLK. Peripherals do not need a timebase of their own — they shift a bit out and latch a bit in on edges the controller provides. Think of a conductor leading an orchestra: everyone follows the same beat, so nobody has to keep time independently.' },
    { h: 'Full duplex falls out of the shift register', p: 'SPI is physically two shift registers wired into a ring. Clocking a bit out of the controller necessarily clocks a bit in, so send and receive are the same operation. This is why an SPI "read" is written as a write of dummy bytes — you cannot clock the bus without transmitting something.' },
    { h: 'Addressing is a wire, not a byte', p: 'There is no address field anywhere in SPI, and no acknowledgement either. Selection is done in hardware with a dedicated chip-select line per peripheral, which is what makes it fast and also what makes it scale badly. Four peripherals cost seven pins on the controller.' },
  ],
  netix: {
    lead: 'SPI shows up inside NETIX edge hardware rather than between devices — it is a board-level bus, and a gateway integrator normally meets it as a driver detail rather than a wiring decision.',
    points: [
      'Gateway storage and display peripherals on the Raspberry Pi-class hardware provisioned by platform/edge sit on SPI.',
      'Where a protocol driver in gateway/gateway-drivers reads a locally attached radio or ADC, SPI is the usual link — the driver publishes to local Mosquitto, so nothing above the gateway ever sees it.',
      'If you are choosing a bus for a new sensor board and you have the pins, SPI removes a whole class of timing bugs that I²C bring-up tends to produce.',
    ],
  },
  gotchas: [
    { t: 'Four clock modes, no negotiation', p: 'CPOL/CPHA must match at both ends. Mismatched mode reads data half a bit late and returns convincing garbage.' },
    { t: 'No acknowledgement at all', p: 'A dead peripheral is indistinguishable from one returning zeroes. Build a known register read into bring-up.' },
    { t: 'Pin cost grows linearly', p: 'Every peripheral is another CS line. Past three or four devices, reconsider I²C or a decoder.' },
    { t: 'Bus length is short', p: 'SPI assumes centimetres on a board. It has no differential signalling and no noise budget for a cable run.' },
  ],
},

/* ============================== I2C ============================== */
{
  slug: 'I2C', h: 2260,
  expand: 'Inter-Integrated Circuit — two wires, up to 112 addressable devices, and an acknowledgement after every byte.',
  oneLine: 'I²C is the smart middle ground between UART and SPI. Two wires carry a whole bus of devices, each with its own address, so adding a sensor costs no pins at all. It is slower than SPI, but when you need many devices without many wires it is your best friend.',
  facts: [
    ['Wires', '2 (SDA, SCL)'],
    ['Clocking', 'Synchronous'],
    ['Typical rate', '100k / 400k / 1M'],
    ['Addresses', '7-bit (112 usable)'],
    ['Drive', 'Open-drain + pull-ups'],
  ],
  diagram: {
    title: 'Reading a temperature register, one condition at a time',
    sub: 'Everything on I²C is defined by how SDA moves relative to SCL. Data may only change while the clock is low — which is precisely what makes START and STOP unambiguous.',
    steps: [
      { label: 'Idle', caption: 'Both lines are released and the pull-up resistors hold them high. No device ever drives a line high on I²C — they only pull low, which is what lets many devices share the pair without damaging each other.' },
      { label: 'START', caption: 'The controller pulls SDA low while SCL is still high. That is illegal for a data bit, so it can never be mistaken for one — it is the bus grabbing everyone’s attention.' },
      { label: 'Address + R/W', caption: 'Seven address bits then a direction bit. Every device on the bus hears this and compares it against its own address. It is a group chat: everyone is on the same line, but each device only answers when its name is called.' },
      { label: 'ACK', caption: 'The addressed device pulls SDA low for one clock. This is the acknowledgement SPI lacks — a missing ACK is a positive, immediate signal that nothing at that address is listening.' },
      { label: 'Data byte', caption: 'Eight bits of payload, then another ACK. Every byte in both directions is acknowledged, so a broken transfer is detected within one byte rather than at the end of a frame.' },
      { label: 'STOP', caption: 'SDA rises while SCL is high — the mirror of START, and equally illegal as data. The bus returns to idle and is free for the next controller.' },
    ],
    svg: SVG(348, `
      <g opacity="0.6">
        <text x="60" y="80" class="dlab" text-anchor="end">SCL</text>
        <text x="60" y="180" class="dlab" text-anchor="end">SDA</text>
        <text x="70" y="30" class="dlab-b">Bus conditions</text>
        <text x="200" y="30" class="dlab-s">SDA may only change while SCL is low &#8212; violations are control, not data</text>
      </g>

      <g class="dstep" data-layer="1">
        <path d="M76,56 H150" class="dwire" stroke="var(--text-tertiary)"/>
        <path d="M76,156 H150" class="dwire" stroke="var(--text-tertiary)"/>
        <text x="112" y="230" class="dlab-s" text-anchor="middle">idle</text>
        <path d="M112,54 V42" stroke="var(--dg-line)" stroke-width="1"/>
        <text x="126" y="48" class="dlab-s">pull-ups hold both lines high</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M150,56 H175 V96 H185" class="dwire" stroke="var(--dg-b)"/>
        <path d="M150,156 V196 H185" class="dwire" stroke="var(--dg-c)"/>
        <circle cx="150" cy="156" r="4.5" fill="#d55e00"/>
        <text x="152" y="230" class="dlab-s" text-anchor="middle" fill="var(--dg-c)">START</text>
        <text x="152" y="246" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">SDA&#8595; while SCL high</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M185,96 H193.8 V56 H211.3 V96 H228.8 V56 H246.3 V96 H263.8 V56 H281.3 V96 H298.8 V56 H316.3 V96 H333.8 V56 H351.3 V96 H368.8 V56 H386.3 V96 H403.8 V56 H421.3 V96 H438.8 V56 H456.3 V96 H465" class="dwire" stroke="var(--dg-b)"/>
        <path d="M185,196 V156 H220 V196 H255 H290 V156 H325 V196 H360 H395 H430 V156 H465" class="dwire" stroke="var(--dg-a)"/>
        <rect x="185" y="40" width="245" height="176" fill="#0072b2" opacity="0.05"/>
        <text x="307" y="230" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">7-bit address 0x48</text>
        <text x="307" y="246" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">1 0 0 1 0 0 0</text>
        <text x="447" y="230" class="dlab-s" text-anchor="middle">R/W</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M465,96 H473.8 V56 H491.3 V96 H500" class="dwire" stroke="var(--dg-b)"/>
        <path d="M465,156 V196 H500" class="dwire" stroke="var(--status-ok)"/>
        <rect x="465" y="40" width="35" height="176" fill="#16a34a" opacity="0.1"/>
        <text x="482" y="230" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">ACK</text>
        <text x="482" y="246" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">device pulls low</text>
      </g>

      <g class="dstep" data-layer="5">
        <path d="M500,96 H508.8 V56 H526.3 V96 H543.8 V56 H561.3 V96 H578.8 V56 H596.3 V96 H613.8 V56 H631.3 V96 H648.8 V56 H666.3 V96 H683.8 V56 H701.3 V96 H718.8 V56 H736.3 V96 H753.8 V56 H771.3 V96 H788.8 V56 H806.3 V96 H815" class="dwire" stroke="var(--dg-b)"/>
        <path d="M500,196 H535 H570 V156 H605 V196 H640 V156 H675 V196 H710 V156 H745 H780 V196 H815" class="dwire" stroke="var(--dg-d)"/>
        <rect x="500" y="40" width="280" height="176" fill="#a8437f" opacity="0.05"/>
        <text x="640" y="230" class="dlab-s" text-anchor="middle" fill="var(--dg-d)">data byte 0x2B</text>
        <text x="797" y="230" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">ACK</text>
      </g>

      <g class="dstep" data-layer="6">
        <path d="M815,96 H825 V56 H900" class="dwire" stroke="var(--dg-b)"/>
        <path d="M815,196 H850 V156 H900" class="dwire" stroke="var(--dg-c)"/>
        <circle cx="850" cy="156" r="4.5" fill="#d55e00"/>
        <text x="856" y="230" class="dlab-s" text-anchor="middle" fill="var(--dg-c)">STOP</text>
        <text x="856" y="246" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">SDA&#8593; while SCL high</text>
      </g>

      <g>
        <line x1="70" y1="272" x2="960" y2="272" stroke="var(--dg-line-soft)"/>
        <rect x="70" y="292" width="112" height="38" rx="7" fill="#196796"/>
        <text x="126" y="315" class="dlab-b" text-anchor="middle" fill="#ffffff">Controller</text>
        <path d="M182,304 H900" class="dwire" stroke="var(--dg-b)"/>
        <path d="M182,320 H900" class="dwire" stroke="var(--dg-a)"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="300" y="292" width="120" height="38" rx="7"/>
          <rect x="470" y="292" width="120" height="38" rx="7"/>
          <rect x="640" y="292" width="120" height="38" rx="7"/>
        </g>
        <text x="360" y="309" class="dlab-s" text-anchor="middle">Temp sensor</text>
        <text x="360" y="323" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0x48</text>
        <text x="530" y="309" class="dlab-s" text-anchor="middle">OLED</text>
        <text x="530" y="323" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0x3C</text>
        <text x="700" y="309" class="dlab-s" text-anchor="middle">Gyroscope</text>
        <text x="700" y="323" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">0x6B</text>
        <text x="916" y="308" class="dlab-s" fill="var(--dg-b)">SCL</text>
        <text x="916" y="324" class="dlab-s" fill="var(--dg-a)">SDA</text>
      </g>`),
  },
  how: [
    { h: 'Open-drain is what makes sharing safe', p: 'No device on I²C ever drives a line high. Every output can only pull to ground or let go, and external pull-up resistors do the rest. Two devices pulling at once is harmless, which is what allows a genuine multi-drop bus on two wires — and it is also why the pull-up value sets your maximum speed.' },
    { h: 'Addressing lives in the first byte', p: 'Each device gets a unique 7-bit address, so the controller knows exactly who it is talking to. The address space is 128 slots, with 16 reserved, leaving 112 usable — plenty until you install two identical sensors and discover the part has only two selectable addresses.' },
    { h: 'Acknowledgement after every byte', p: 'The receiving device pulls SDA low for the ninth clock. That single bit is worth a great deal in the field: it distinguishes "device answered with zero" from "no device there", which is a distinction SPI simply cannot make.' },
  ],
  netix: {
    lead: 'I²C is a board-internal bus in NETIX hardware, and the ancestor of the addressing idea that runs all the way up the stack: an address in the first byte, so many devices share one medium.',
    points: [
      'Environmental sensors and the real-time clock on gateway boards sit on I²C; a driver reads them and publishes under the local netix/ topic tree like any other point.',
      'The same shape recurs at every layer above: Modbus unit IDs, IP addresses, MQTT topics. Learn it once here and the rest of this site is variations on it.',
      'When adding a sensor to gateway hardware, check the part’s selectable-address options before ordering two of them — this is the most common integration surprise.',
    ],
  },
  gotchas: [
    { t: 'Address collisions are a hardware problem', p: 'Two identical parts on one bus need a strap pin or a mux. There is no software fix.' },
    { t: 'Pull-up sizing sets your ceiling', p: 'Too weak and the rising edge is slow, capping speed; too strong and devices cannot pull low. Budget for total bus capacitance.' },
    { t: 'A stuck-low SDA wedges the bus', p: 'A peripheral reset mid-byte can hold SDA down forever. Recovery means clocking SCL manually until it releases.' },
    { t: 'Clock stretching is optional and often unsupported', p: 'Slow peripherals may hold SCL low; some controllers ignore it entirely and corrupt the transfer.' },
  ],
},

/* ============================== I3C ============================== */
{
  slug: 'I3C', h: 2200,
  expand: 'Improved Inter-Integrated Circuit — the MIPI Alliance’s successor to I²C: same two wires, ten times the speed, a fraction of the power, and interrupts that no longer need their own pin.',
  oneLine: 'I²C was invented in 1982 and modern smartphones are pushing it to its breaking point. I3C keeps the two wires and stays backwards compatible with legacy parts, but runs up to ten times faster — and its killer feature is that a sensor can raise an interrupt over the data wire instead of a dedicated one.',
  facts: [
    ['Wires', '2 (SDA, SCL)'],
    ['Compatibility', 'Legacy I²C on-bus'],
    ['Typical rate', '12.5 MHz SDR'],
    ['Interrupts', 'In-band, no extra pin'],
    ['Drive', 'Push-pull + open-drain'],
  ],
  diagram: {
    title: 'The pin count that I3C deletes',
    sub: 'The headline is speed, but the reason phone designers moved is the wire count. Every I²C sensor that needs to wake the CPU costs a dedicated interrupt line back to the host.',
    steps: [
      { label: 'I²C bus', caption: 'Four sensors share SDA and SCL. So far this is the classic arrangement, and it costs the host exactly two pins no matter how many sensors hang off it.' },
      { label: 'Plus one IRQ each', caption: 'But a pedometer that wants to register a step cannot wait to be polled — it needs to wake the CPU now. On I²C that means a dedicated physical interrupt wire per sensor. Four sensors, six host pins. Multiply by twenty and the board gets messy.' },
      { label: 'I3C: same two wires', caption: 'I3C carries the same SDA and SCL pair, so the board routing is unchanged and the host spends two pins. Everything that follows happens inside those two wires.' },
      { label: 'In-band interrupt', caption: 'When the bus is idle, a sensor may itself drive SDA low to request attention. The controller sees it, arbitrates by address if several ask at once, and reads the highest-priority one. The interrupt has become a bus transaction.' },
      { label: 'Mixed bus', caption: 'Legacy I²C parts sit on the same bus and are simply addressed the old way. This is what made adoption possible — nobody had to respin an entire sensor catalogue to start using I3C.' },
    ],
    svg: SVG(330, `
      <g opacity="0.55"><line x1="500" y1="16" x2="500" y2="314" stroke="var(--dg-line-soft)" stroke-width="1" stroke-dasharray="5 5"/></g>
      <text x="70" y="30" class="dlab-b">I&#178;C &#183; 1982</text>
      <text x="540" y="30" class="dlab-b" fill="var(--brand-600)">I3C &#183; 2016</text>

      <g class="dstep" data-layer="1">
        <rect x="70" y="56" width="92" height="180" rx="8" fill="#64748b"/>
        <text x="116" y="140" class="dlab-b" text-anchor="middle" fill="#ffffff">Host</text>
        <text x="116" y="158" class="dlab-s" text-anchor="middle" fill="#cbd5e1">CPU</text>
        <path d="M162,84 H430" class="dwire" stroke="var(--dg-b)"/>
        <path d="M162,98 H430" class="dwire" stroke="var(--dg-a)"/>
        <text x="440" y="88" class="dlab-s" fill="var(--dg-b)">SCL</text>
        <text x="440" y="102" class="dlab-s" fill="var(--dg-a)">SDA</text>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="260" y="58" width="86" height="24" rx="5"/>
          <rect x="260" y="106" width="86" height="24" rx="5"/>
          <rect x="260" y="146" width="86" height="24" rx="5"/>
          <rect x="260" y="186" width="86" height="24" rx="5"/>
        </g>
        <text x="303" y="74" class="dlab-s" text-anchor="middle">Pedometer</text>
        <text x="303" y="122" class="dlab-s" text-anchor="middle">Gyro</text>
        <text x="303" y="162" class="dlab-s" text-anchor="middle">Baro</text>
        <text x="303" y="202" class="dlab-s" text-anchor="middle">Light</text>
        <path d="M260,118 H200 V98 M260,158 H200 V98 M260,198 H200 V98" class="dwire" stroke="var(--dg-a)" opacity="0.4"/>
        <text x="116" y="240" class="dlab-s" text-anchor="middle">2 host pins</text>
      </g>

      <g class="dstep" data-layer="2">
        <g stroke="var(--status-critical)" class="dwire" stroke-dasharray="5 3">
          <path d="M346,70 H392 V128 H162"/>
          <path d="M346,118 H406 V142 H162"/>
          <path d="M346,158 H420 V156 H162"/>
          <path d="M346,198 H434 V170 H162"/>
        </g>
        <text x="400" y="234" class="dlab-s" fill="var(--status-critical)" text-anchor="middle">4 &#215; IRQ</text>
        <rect x="70" y="252" width="360" height="30" rx="6" fill="var(--status-critical-tint)"/>
        <text x="86" y="271" class="dlab-s" fill="var(--status-critical)">6 host pins for 4 sensors &#183; 22 pins for 20 sensors</text>
      </g>

      <g class="dstep" data-layer="3">
        <rect x="540" y="56" width="92" height="180" rx="8" fill="#196796"/>
        <text x="586" y="140" class="dlab-b" text-anchor="middle" fill="#ffffff">Host</text>
        <text x="586" y="158" class="dlab-s" text-anchor="middle" fill="#c7ddec">CPU</text>
        <path d="M632,84 H900" class="dwire" stroke="var(--dg-b)"/>
        <path d="M632,98 H900" class="dwire" stroke="var(--dg-a)"/>
        <text x="910" y="88" class="dlab-s" fill="var(--dg-b)">SCL</text>
        <text x="910" y="102" class="dlab-s" fill="var(--dg-a)">SDA</text>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="730" y="58" width="86" height="24" rx="5"/>
          <rect x="730" y="106" width="86" height="24" rx="5"/>
          <rect x="730" y="146" width="86" height="24" rx="5"/>
          <rect x="730" y="186" width="86" height="24" rx="5"/>
        </g>
        <text x="773" y="74" class="dlab-s" text-anchor="middle">Pedometer</text>
        <text x="773" y="122" class="dlab-s" text-anchor="middle">Gyro</text>
        <text x="773" y="162" class="dlab-s" text-anchor="middle">Baro</text>
        <text x="773" y="202" class="dlab-s" text-anchor="middle">Light</text>
        <path d="M730,118 H670 V98 M730,158 H670 V98 M730,198 H670 V98" class="dwire" stroke="var(--dg-a)" opacity="0.4"/>
        <text x="586" y="240" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">2 host pins</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M773,58 V40 H700 V98" class="dwire" stroke="var(--dg-d)"/>
        <circle cx="700" cy="98" r="4.5" fill="#a8437f"/>
        <text x="712" y="36" class="dlab-s" fill="var(--dg-d)">in-band interrupt on SDA</text>
        <rect x="540" y="252" width="360" height="30" rx="6" fill="var(--ml-accent-tint)"/>
        <text x="556" y="271" class="dlab-s" fill="var(--dg-d)">2 host pins for 4 sensors &#183; still 2 for 20</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="730" y="212" width="86" height="24" rx="5" fill="var(--dg-panel)" stroke="var(--dg-line)" stroke-dasharray="4 3"/>
        <text x="773" y="228" class="dlab-s" text-anchor="middle">Legacy I&#178;C</text>
        <path d="M730,224 H670 V98" class="dwire" stroke="var(--text-tertiary)" opacity="0.5"/>
        <rect x="540" y="292" width="420" height="30" rx="6" fill="var(--status-ok-tint)"/>
        <text x="556" y="311" class="dlab-s" fill="var(--status-ok)">legacy parts keep working on the same two wires &#8212; no respin needed</text>
      </g>`),
  },
  how: [
    { h: 'Backwards compatibility was the design constraint', p: 'I3C had to run on the same two wires as I²C and tolerate legacy parts on the bus, because no phone maker was going to replace an entire sensor catalogue at once. The controller detects what each device is during dynamic address assignment and speaks the right dialect to each.' },
    { h: 'Push-pull is where the speed comes from', p: 'I²C’s speed ceiling is a physics problem: open-drain outputs can only pull down, so the rising edge is an RC curve set by the pull-up. I3C drives push-pull for most of the transfer, squaring the edges and lifting standard-mode signalling to 12.5 MHz while drawing less power.' },
    { h: 'In-band interrupts change the wiring, not just the protocol', p: 'A sensor may drive SDA low while the bus is idle to request service, and simultaneous requests arbitrate by address exactly as a bus should. That single feature deletes a wire per interrupting sensor, cuts chip pin counts, and is why I3C is becoming standard in mobile devices and wearables.' },
  ],
  netix: {
    lead: 'I3C is not yet in NETIX gateway hardware — it is a mobile and wearable technology first — but the pattern it fixes is one worth recognising, because the same mistake appears at plant scale.',
    points: [
      'The I²C interrupt problem is the board-level version of polling a fieldbus: asking every device whether anything changed, rather than letting devices report changes themselves.',
      'That is exactly the trade MQTT makes at the top of the stack — see the pub/sub model on the MQTT page, which solves the same problem four layers up.',
      'Worth tracking for future gateway sensor boards: a design with more than a handful of interrupting sensors is where the pin savings start to matter.',
    ],
  },
  gotchas: [
    { t: 'Not a drop-in for every I²C part', p: 'Devices with clock stretching or certain reserved addresses cannot join a mixed bus. Check the compatibility table, not the marketing.' },
    { t: 'Addresses become dynamic', p: 'I3C assigns addresses at runtime. Firmware that hard-codes a static address needs rework.' },
    { t: 'Push-pull removes the free-for-all', p: 'Once the bus is push-pull, two drivers really can fight. Bus handover rules must be respected exactly.' },
    { t: 'Controller support is the gate', p: 'The host silicon must have an I3C controller. An I²C peripheral block cannot be coaxed into it.' },
  ],
},

/* ============================== 1-Wire ============================== */
{
  slug: 'OneWire', h: 2220,
  expand: '1-Wire — one conductor that carries data and, in parasite mode, the power to run the device as well.',
  oneLine: 'The name says everything: this protocol communicates over a single wire, and that same wire also powers the device connected to it. It is slow — much slower than SPI or I²C — but when you only need to read a simple sensor and want the absolute minimum wiring, nothing beats it.',
  facts: [
    ['Wires', '1 (+ ground)'],
    ['Power', 'Parasitic from data line'],
    ['Typical rate', '15.4 kbit/s'],
    ['Addressing', 'Factory 64-bit ROM ID'],
    ['Cable reach', '~100 m'],
  ],
  diagram: {
    title: 'Timing is the entire protocol',
    sub: 'With one conductor and no clock, a bit is distinguished purely by how long the line is held low. Everything — data, power, addressing — happens on this single wire.',
    steps: [
      { label: 'Idle high', caption: 'A pull-up resistor, typically 4.7 kΩ, holds the line high whenever nobody is talking. That resting high state is not just idle — it is the power supply.' },
      { label: 'Parasite power', caption: 'While the line is high, each device charges an internal capacitor through it. That stored charge runs the device through the low periods that follow, which is how a temperature sensor works with no supply pin of its own.' },
      { label: 'Master pulls low', caption: 'Every time slot begins the same way: the master pulls the line low. From that falling edge, both ends are counting microseconds — the edge is the only synchronisation there is.' },
      { label: 'Write 1 vs write 0', caption: 'The duration of the low decides the bit. A short pull — under 15 µs — then release is a 1. Holding low for the whole 60 µs slot is a 0. Nothing else distinguishes them.' },
      { label: 'Read slot', caption: 'To read, the master pulls low briefly and releases. A device answering 0 keeps holding the line down; a device answering 1 simply lets the pull-up take it high. The master samples at 15 µs.' },
      { label: '64-bit ROM ID', caption: 'Each device is burned at the factory with a unique 64-bit identifier, so multiple devices share the one wire and the master still knows exactly who it is talking to. A binary search walks the ID tree to enumerate a bus it has never seen.' },
    ],
    svg: SVG(340, `
      <g opacity="0.6">
        <text x="70" y="28" class="dlab-b">Time slots</text>
        <text x="176" y="28" class="dlab-s">60 &#181;s per slot &#183; master samples a read at 15 &#181;s</text>
        <text x="60" y="66" class="dlab" text-anchor="end">DQ</text>
      </g>

      <g class="dstep" data-layer="1">
        <path d="M76,60 H190" class="dwire" stroke="var(--text-tertiary)"/>
        <g opacity="0.9">
          <path d="M120,60 V52" stroke="var(--dg-line)" stroke-width="1"/>
          <rect x="128" y="34" width="98" height="18" rx="4" fill="var(--dg-panel)"/>
          <text x="136" y="47" class="dlab-s">4.7 k&#8486; pull-up</text>
        </g>
      </g>

      <g class="dstep" data-layer="2">
        <rect x="76" y="46" width="114" height="28" rx="4" fill="#16a34a" opacity="0.12"/>
        <text x="133" y="98" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">charging C</text>
        <path d="M133,80 V74" stroke="var(--status-ok)" stroke-width="1.5"/>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M190,60 V116" class="dwire" stroke="var(--dg-c)"/>
        <circle cx="190" cy="60" r="4" fill="#d55e00"/>
        <text x="190" y="140" class="dlab-s" text-anchor="middle" fill="var(--dg-c)">slot starts</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M190,116 H222 V60 H330" class="dwire" stroke="var(--dg-a)"/>
        <rect x="190" y="52" width="140" height="72" rx="5" fill="#0072b2" opacity="0.06"/>
        <text x="260" y="170" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">WRITE 1 &#183; low &lt; 15 &#181;s</text>
        <path d="M330,60 V116 H438 V60 H470" class="dwire" stroke="var(--dg-d)"/>
        <rect x="330" y="52" width="140" height="72" rx="5" fill="#a8437f" opacity="0.06"/>
        <text x="400" y="170" class="dlab-s" text-anchor="middle" fill="var(--dg-d)">WRITE 0 &#183; low 60 &#181;s</text>
        <path d="M222,132 H330" stroke="var(--text-tertiary)" stroke-width="1" marker-start="url(#nw-t)" marker-end="url(#nw-t)"/>
      </g>

      <g class="dstep" data-layer="5">
        <path d="M470,60 V116 H494" class="dwire" stroke="var(--dg-c)"/>
        <path d="M494,116 H560 V60 H610" class="dwire" stroke="var(--status-ok)"/>
        <path d="M494,116 V60 H560" class="dwire" stroke="var(--dg-b)" stroke-dasharray="4 3" fill="none" stroke-width="2"/>
        <rect x="470" y="52" width="140" height="72" rx="5" fill="#16a34a" opacity="0.06"/>
        <text x="540" y="170" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">READ slot</text>
        <path d="M505,132 V124" stroke="var(--status-critical)" stroke-width="1.5"/>
        <text x="511" y="140" class="dlab-s" fill="var(--status-critical)">sample @ 15 &#181;s</text>
        <text x="622" y="64" class="dlab-s" fill="var(--dg-b)">device releases = 1</text>
        <text x="622" y="80" class="dlab-s" fill="var(--status-ok)">device holds low = 0</text>
      </g>

      <g class="dstep" data-layer="6">
        <rect x="70" y="224" width="104" height="40" rx="7" fill="#196796"/>
        <text x="122" y="248" class="dlab-b" text-anchor="middle" fill="#ffffff">Master</text>
        <path d="M174,244 H880" class="dwire" stroke="var(--brand-600)"/>
        <path d="M300,244 V222 M520,244 V222 M740,244 V222" stroke="var(--brand-600)" stroke-width="2"/>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="252" y="188" width="96" height="34" rx="6"/>
          <rect x="472" y="188" width="96" height="34" rx="6"/>
          <rect x="692" y="188" width="96" height="34" rx="6"/>
        </g>
        <text x="300" y="203" class="dlab-s" text-anchor="middle">DS18B20</text>
        <text x="300" y="216" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">28-F1&#8230;A3</text>
        <text x="520" y="203" class="dlab-s" text-anchor="middle">DS18B20</text>
        <text x="520" y="216" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">28-2C&#8230;07</text>
        <text x="740" y="203" class="dlab-s" text-anchor="middle">iButton</text>
        <text x="740" y="216" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">01-9B&#8230;5E</text>
        <text x="896" y="248" class="dlab-s">one wire</text>
        <rect x="70" y="284" width="520" height="30" rx="6" fill="var(--brand-100)"/>
        <text x="86" y="303" class="dlab-s" fill="var(--brand-700)">8-bit family code &#183; 48-bit serial &#183; 8-bit CRC = unique, forever, from the factory</text>
      </g>
      <defs><marker id="nw-t" markerWidth="6" markerHeight="6" refX="3" refY="3"><circle cx="3" cy="3" r="2" fill="#8096a3"/></marker></defs>`),
  },
  how: [
    { h: 'The wire is the power supply', p: 'In parasite mode a device draws current from the data line while it rests high and stores it in an internal capacitor, running from that charge through the low periods. This is why a DS18B20 can be wired with two conductors — data and ground — and no supply at all, and why long temperature runs are so cheap to install.' },
    { h: 'A bit is a duration, not a level', p: 'With no clock and no second wire, timing carries all the information. Both write-1 and write-0 begin with the master pulling low; only how long it stays low distinguishes them. That makes 1-Wire unusually sensitive to interrupts on the master — a delayed release turns a 1 into a 0.' },
    { h: 'Identity is burned in at the factory', p: 'Every device leaves the factory with a unique 64-bit ROM code: a family byte, a 48-bit serial number and a CRC. No addresses to assign, no collisions to resolve. The master enumerates an unknown bus by walking the ID space with a binary search, which is how you can add a sensor to a running installation and simply find it.' },
  ],
  netix: {
    lead: 'This is the classic HVAC temperature-monitoring bus, and it is the shape of installation NETIX gateways are frequently asked to absorb — dozens of cheap probes on long runs, already installed, with no intention of being replaced.',
    points: [
      'A 1-Wire probe chain reaches NETIX through a gateway adapter; the driver reads each ROM ID and publishes it as a distinct point under the local netix/ topic tree.',
      'The 64-bit ROM ID is a genuinely good tag key — it is globally unique and physically attached to the sensor, so a probe keeps its identity across rewiring.',
      'Long parasite-powered runs are where 1-Wire installations misbehave; if a chain reports intermittently, budget the cable before suspecting the gateway.',
    ],
  },
  gotchas: [
    { t: 'Timing is not interrupt-tolerant', p: 'A master that is preempted mid-slot corrupts the bit. Bit-banged implementations need interrupts masked.' },
    { t: 'Parasite power has a current budget', p: 'A DS18B20 temperature conversion draws far more than idle. Long chains need a strong pull-up during conversion.' },
    { t: 'Topology matters more than length', p: 'Star wiring causes reflections that a long daisy chain would not. Keep it linear.' },
    { t: 'It is genuinely slow', p: 'At roughly 15 kbit/s, a large chain takes seconds to poll. Do not plan a fast control loop on it.' },
  ],
},
];
