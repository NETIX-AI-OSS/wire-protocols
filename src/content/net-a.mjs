const SVG = (h, body) => `<svg class="dgm" viewBox="0 0 1000 ${h}" width="100%" role="img" aria-hidden="true">${body}</svg>`;

export const NET_A = [
/* ============================== IP ============================== */
{
  slug: 'IP', h: 2260,
  expand: 'Internet Protocol — the foundation of the entire internet, and a deliberately unreliable one. Specified in September 1981 in RFC 791, prepared for DARPA.',
  oneLine: 'IP is routinely said to have been built to survive a nuclear attack. It was not — that was Paul Baran’s separate 1964 RAND work on distributed communications, and ARPANET’s own architects spent years denying the connection. What IP was actually built for is subtler and more useful: joining networks nobody controlled centrally, across links assumed to be unreliable.',
  facts: [
    ['Layer', 'Network (3)'],
    ['Delivery', 'Best-effort, unreliable'],
    ['IPv4 space', '32-bit &middot; 4.3 billion'],
    ['IPv6 space', '128-bit &middot; 3.4 × 10³⁸'],
    ['State', 'Connectionless'],
  ],
  diagram: {
    title: 'Tear the book apart, post the pages separately',
    sub: 'IP takes your data and breaks it into small chunks called packets, each routed independently. Nothing in the protocol promises they arrive, arrive intact, or arrive in the order you sent them.',
    steps: [
      { label: 'Break into packets', caption: 'Think of sending a book through the mail by tearing out each page, putting each page in a separate envelope, and posting them all individually to the same address. Each envelope is now a separate problem for the postal system.' },
      { label: 'Address each one', caption: 'Every packet carries a header with the source address, the destination address, a time-to-live value and a checksum. Crucially, the full destination is on every packet — no router needs to remember anything about the ones that came before.' },
      { label: 'Independent routing', caption: 'Each router looks only at the destination and forwards toward it. Two packets from the same message can take entirely different paths, which is exactly what makes the network survivable: remove a router and traffic reroutes without anyone renegotiating anything.' },
      { label: 'TTL counts down', caption: 'Every router decrements the time-to-live. At zero the packet is discarded and an ICMP message goes back to the sender. Without it, a routing loop would circulate packets forever — this single counter is what keeps a misconfiguration from becoming a permanent one.' },
      { label: 'No guarantees', caption: 'RFC 791 states plainly that IP limits its scope to delivering packets from source to destination. It does not guarantee they arrive, that they arrive in order, or that they arrive at all. IP routes and moves on — everything reliable about the internet is built on top by other protocols.' },
      { label: 'Running out of v4', caption: 'In 1981, 4.3 billion addresses seemed infinite. By 2011, IANA had handed out the last available IPv4 block. IPv6 answers with 128-bit addresses — give every atom on the surface of the earth an address and you would still have trillions left over.' },
    ],
    svg: SVG(400, `
      <g class="dstep" data-layer="1">
        <rect x="70" y="52" width="96" height="120" rx="6" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <g stroke="var(--dg-line)"><path d="M84,74 H152 M84,90 H152 M84,106 H152 M84,122 H152 M84,138 H152"/></g>
        <text x="118" y="192" class="dlab-s" text-anchor="middle">payload</text>
        <path d="M182,112 h34 m-8,-8 8,8 -8,8" class="dwire" stroke="var(--text-tertiary)"/>
        <g fill="var(--brand-100)" stroke="var(--brand-500)">
          <rect x="238" y="56" width="90" height="46" rx="5"/>
          <rect x="238" y="112" width="90" height="46" rx="5"/>
          <rect x="238" y="168" width="90" height="46" rx="5"/>
        </g>
        <text x="283" y="84" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">packet 1</text>
        <text x="283" y="140" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">packet 2</text>
        <text x="283" y="196" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">packet 3</text>
      </g>

      <g class="dstep" data-layer="2">
        <rect x="380" y="44" width="300" height="130" rx="8" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="396" y="66" class="dlab-b">IPv4 header</text>
        <g class="dlab-s">
          <text x="396" y="90">source</text><text x="560" y="90" fill="var(--brand-600)">10.42.0.7</text>
          <text x="396" y="110">destination</text><text x="560" y="110" fill="var(--brand-600)">142.250.72.14</text>
          <text x="396" y="130">TTL</text><text x="560" y="130" fill="var(--dg-c)">64</text>
          <text x="396" y="150">checksum</text><text x="560" y="150" fill="var(--dg-d)">0x1a2f</text>
        </g>
        <text x="396" y="196" class="dlab-s" fill="var(--text-tertiary)">every packet is self-describing &#8212; routers hold no state</text>
      </g>

      <g class="dstep" data-layer="3">
        <line x1="70" y1="222" x2="960" y2="222" stroke="var(--dg-line-soft)"/>
        <g fill="#64748b">
          <circle cx="140" cy="300" r="20"/><circle cx="880" cy="300" r="20"/>
        </g>
        <text x="140" y="345" class="dlab-s" text-anchor="middle">source</text>
        <text x="880" y="345" class="dlab-s" text-anchor="middle">destination</text>
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <circle cx="330" cy="256" r="17"/><circle cx="520" cy="256" r="17"/><circle cx="700" cy="256" r="17"/>
          <circle cx="330" cy="344" r="17"/><circle cx="520" cy="344" r="17"/><circle cx="700" cy="344" r="17"/>
          <circle cx="430" cy="300" r="17"/><circle cx="610" cy="300" r="17"/>
        </g>
        <g stroke="var(--dg-line)" class="dwire">
          <path d="M160,292 L313,262 M347,256 H503 M537,258 L594,292 M627,296 L683,260 M717,262 L862,292"/>
          <path d="M160,308 L313,338 M347,344 H503 M537,342 L594,306 M627,304 L683,340 M717,338 L862,308"/>
          <path d="M447,300 H593"/>
        </g>
        <g stroke="var(--dg-a)" stroke-width="2.5" fill="none">
          <path d="M160,292 L313,262 M347,256 H503 M537,258 L594,292 M627,304 L683,340 M717,338 L862,308"/>
        </g>
        <g stroke="var(--dg-d)" stroke-width="2.5" fill="none" stroke-dasharray="6 4">
          <path d="M160,308 L313,338 M347,344 H503 M537,342 L594,306 M627,296 L683,260 M717,262 L862,292"/>
        </g>
        <text x="500" y="382" class="dlab-s" text-anchor="middle">two packets, same destination, different paths &#8212; and neither knows about the other</text>
      </g>

      <g class="dstep" data-layer="4">
        <g class="dlab-s" fill="#d55e00" text-anchor="middle">
          <text x="330" y="240">63</text><text x="520" y="240">62</text><text x="700" y="240">61</text>
        </g>
        <text x="740" y="240" class="dlab-s" fill="var(--dg-c)">&#8230; 0 &#8594; discarded, ICMP home</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="700" y="42" width="260" height="132" rx="8" fill="var(--status-critical-tint)"/>
        <text x="716" y="66" class="dlab-b" fill="var(--status-critical)">IP does not promise</text>
        <text x="716" y="92" class="dlab-s" fill="var(--status-critical-on-tint)">&#10007; that the packet arrives</text>
        <text x="716" y="114" class="dlab-s" fill="var(--status-critical-on-tint)">&#10007; that they arrive in order</text>
        <text x="716" y="136" class="dlab-s" fill="var(--status-critical-on-tint)">&#10007; that each arrives once</text>
        <text x="716" y="160" class="dlab-s" fill="var(--status-critical)">&#8594; TCP adds all three back</text>
      </g>

      <g class="dstep" data-layer="6">
        <text x="700" y="200" class="dlab-s" fill="var(--brand-700)">IPv4 exhausted 2011 &#8594; IPv6, 128-bit</text>
      </g>`),
  },
  how: [
    { h: 'Statelessness is the survivability feature', p: 'Because every packet carries its full destination, no router needs to remember a conversation. Remove a router mid-transfer and the next packet simply takes another path — there is no session to re-establish, because there was never a session in the network to begin with. That is what "no single point of failure" actually means in practice.' },
    { h: 'Unreliability is a design decision, not a defect', p: 'Pushing reliability out of the network and into the endpoints is the end-to-end principle, and it is why the internet could carry protocols nobody had invented when it was specified. A network that guaranteed delivery would have had to make assumptions about what delivery meant.' },
    { h: 'An address identifies a location, not a device', p: 'An IP address is a numerical label identifying a device on a network, exactly like a home address identifies a house on a street — and like a street address, it describes where something is rather than what it is. Move the device and the address changes, which is the root of every mobility and NAT complication that followed.' },
  ],
  netix: {
    lead: 'IP is the boundary between the two halves of a NETIX deployment. Everything below the gateway is fieldbus; everything above it is IP, and the gateway is the translation point.',
    points: [
      'Gateways sit on customer networks with addresses the customer controls, which is why gateway-tunnel exists: outbound connections through an frp relay rather than inbound reachability that would require the customer to open firewall ports.',
      'Field-side devices generally have no IP address at all — a Modbus unit ID is not an address in this sense, and cannot be routed to. Everything they say reaches the cloud because the gateway republishes it.',
      'When a site reports "the gateway is offline", separate the layers before debugging: link, IP reachability, then MQTT session. They fail differently and the symptoms overlap.',
    ],
  },
  gotchas: [
    { t: 'NAT breaks the addressing model', p: 'Most gateways sit behind NAT with no routable address. Anything requiring inbound connection has to be redesigned around outbound.' },
    { t: 'MTU mismatches present as partial failures', p: 'Small requests work, large ones hang. Path MTU discovery fails silently when ICMP is filtered.' },
    { t: 'Fragmentation is best avoided', p: 'A single lost fragment discards the whole packet, and IPv6 removed router fragmentation entirely.' },
    { t: 'Address does not mean identity', p: 'DHCP reassignment changes it. Never key a device record on IP alone.' },
  ],
},

/* ============================== TCP ============================== */
{
  slug: 'TCP', h: 2300,
  expand: 'Transmission Control Protocol — everything IP declines to guarantee, added back on top: a connection, ordering, acknowledgement and retransmission.',
  oneLine: 'IP drops packets, reorders them, duplicates them, and does not care at all. For real-time streaming that is acceptable, but a missing byte in a firmware update can break a device and a missing byte in a financial transaction can cost millions. TCP’s entire purpose is to fix that.',
  facts: [
    ['Layer', 'Transport (4)'],
    ['Delivery', 'Guaranteed, ordered'],
    ['Header', '20 bytes minimum'],
    ['Setup', '3-way handshake'],
    ['Flow control', 'Sliding window'],
  ],
  diagram: {
    title: 'Connection, sequencing, acknowledgement — and what happens when a segment is lost',
    sub: 'Three mechanisms turn an unreliable packet service into a reliable byte stream. The fourth — congestion control — is what stops it from destroying the network in the process.',
    steps: [
      { label: 'Handshake', caption: 'Before any data moves, both sides confirm they are ready. SYN, SYN-ACK, ACK — three messages, but only one full round trip of added delay, because the client’s first data can ride along with that final ACK. This is the cost UDP refuses to pay.' },
      { label: 'Sequencing', caption: 'Every byte in the stream gets a sequence number, so the receiver knows exactly what arrived and what did not. Out-of-order arrival stops being a problem — the receiver simply holds segment 3 until segment 2 turns up, then delivers both in order.' },
      { label: 'Acknowledgement', caption: 'The receiver confirms every segment it gets. An ACK is cumulative: acknowledging byte 4,001 means everything before it arrived safely, so a single ACK can cover many segments and a lost ACK is usually repaired by the next one.' },
      { label: 'Loss and retransmit', caption: 'Segment 3 goes missing. The sender does not hear back within its retransmission timeout, so it resends automatically — and separately, the three duplicate ACKs the receiver sends for the gap trigger a fast retransmit without waiting for the timer.' },
      { label: 'Sliding window', caption: 'The receiver advertises how much buffer it has left, and the sender may never have more than that unacknowledged in flight. This is flow control: it stops a fast sender from flooding a slow receiver, which on a constrained gateway is a real failure mode.' },
      { label: 'Congestion control', caption: 'Separately, the sender watches for loss as a signal that the network itself is saturated, and backs off. Flow control protects the receiver; congestion control protects everyone else. Together they are why the internet does not collapse under its own load.' },
    ],
    svg: SVG(430, `
      <g opacity="0.75">
        <text x="120" y="30" class="dlab-b" text-anchor="middle">Client</text>
        <text x="700" y="30" class="dlab-b" text-anchor="middle">Server</text>
        <path d="M120,42 V400 M700,42 V400" stroke="var(--dg-line)" stroke-dasharray="4 4"/>
      </g>

      <g class="dstep" data-layer="1">
        <path d="M120,68 H692" class="dwire" stroke="var(--dg-a)" marker-end="url(#tc-b)"/>
        <text x="406" y="60" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">SYN &#183; seq=0</text>
        <path d="M700,100 H128" class="dwire" stroke="var(--dg-b)" marker-end="url(#tc-g)"/>
        <text x="414" y="92" class="dlab-s" text-anchor="middle" fill="var(--dg-b)">SYN-ACK &#183; seq=0 ack=1</text>
        <path d="M120,132 H692" class="dwire" stroke="var(--dg-a)" marker-end="url(#tc-b)"/>
        <text x="406" y="124" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">ACK &#183; ack=1</text>
        <rect x="760" y="56" width="200" height="88" rx="7" fill="var(--brand-100)"/>
        <text x="776" y="80" class="dlab-s" fill="var(--brand-700)">1 added round trip</text>
        <text x="776" y="102" class="dlab-s" fill="var(--brand-700)">before payload flows</text>
        <text x="776" y="128" class="dlab-s" fill="var(--text-tertiary)">data can ride the final ACK</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M120,176 H692" class="dwire" stroke="var(--brand-600)" marker-end="url(#tc-n)"/>
        <text x="406" y="168" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">seq 1&#8211;1000</text>
        <path d="M120,204 H692" class="dwire" stroke="var(--brand-600)" marker-end="url(#tc-n)"/>
        <text x="406" y="196" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">seq 1001&#8211;2000</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M700,232 H128" class="dwire" stroke="var(--status-ok)" marker-end="url(#tc-k)"/>
        <text x="414" y="224" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">ACK 2001 &#8212; cumulative</text>
      </g>

      <g class="dstep" data-layer="4">
        <path d="M120,264 H420" class="dwire" stroke="var(--status-critical)"/>
        <path d="M410,254 l20,20 M430,254 l-20,20" stroke="var(--status-critical)" stroke-width="2.5"/>
        <text x="452" y="268" class="dlab-s" fill="var(--status-critical)">seq 2001&#8211;3000 lost in the network</text>
        <path d="M700,296 H128" class="dwire" stroke="var(--status-warning)" marker-end="url(#tc-o)" stroke-dasharray="5 3"/>
        <text x="414" y="288" class="dlab-s" text-anchor="middle" fill="var(--status-warning)">dup ACK 2001 &#215;3</text>
        <path d="M120,328 H692" class="dwire" stroke="var(--brand-600)" marker-end="url(#tc-n)"/>
        <text x="406" y="320" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">retransmit 2001&#8211;3000</text>
      </g>

      <g class="dstep" data-layer="5">
        <line x1="70" y1="352" x2="960" y2="352" stroke="var(--dg-line-soft)"/>
        <text x="70" y="378" class="dlab-s">receiver window</text>
        <rect x="190" y="364" width="420" height="20" rx="4" fill="var(--dg-panel)" stroke="var(--dg-line)"/>
        <rect x="192" y="366" width="230" height="16" rx="3" fill="#196796"/>
        <text x="307" y="379" class="dlab-s" text-anchor="middle" fill="#ffffff">in flight, unacknowledged</text>
        <text x="516" y="379" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">free</text>
        <text x="626" y="379" class="dlab-s" fill="var(--brand-600)">sender may never exceed the advertised window</text>
      </g>

      <g class="dstep" data-layer="6">
        <text x="70" y="412" class="dlab-s">congestion</text>
        <path d="M190,414 L240,398 L290,384 L340,368 L350,410 L400,398 L450,388 L500,376 L510,412 L560,402 L610,394" stroke="var(--dg-d)" stroke-width="2" fill="none"/>
        <text x="626" y="406" class="dlab-s" fill="var(--dg-d)">loss is read as saturation &#8212;</text>
        <text x="626" y="420" class="dlab-s" fill="var(--dg-d)">the sender halves its rate, then climbs again</text>
      </g>
      <defs>
        <marker id="tc-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0072b2"/></marker>
        <marker id="tc-g" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#009e73"/></marker>
        <marker id="tc-k" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#16a34a"/></marker>
        <marker id="tc-n" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#196796"/></marker>
        <marker id="tc-o" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#d97706"/></marker>
      </defs>`),
  },
  how: [
    { h: 'A connection is shared state, not a circuit', p: 'The handshake does not reserve anything in the network — routers remain oblivious. What it establishes is agreement between the two endpoints about sequence numbers and window sizes. The "connection" exists only in two memory structures, which is exactly why it survives a route change.' },
    { h: 'Cumulative acknowledgement is quietly clever', p: 'An ACK names the next byte expected, so it implicitly confirms everything before it. One ACK can cover a dozen segments, and a lost ACK is repaired by the next one rather than triggering a retransmission. Selective acknowledgement extends this to report holes precisely.' },
    { h: 'Two different back-pressure systems', p: 'Flow control and congestion control are frequently confused. The window advertised by the receiver protects the receiver’s buffer; the congestion window the sender computes protects the network. The sender obeys whichever is smaller, and only the second one reacts to packet loss.' },
  ],
  netix: {
    lead: 'TCP carries almost everything above the gateway in a NETIX deployment, and its guarantee is exactly why the stack is built this way — MQTT, HTTP and the service-to-service traffic all inherit it.',
    points: [
      'MQTT runs over TCP, which is why a gateway can lose connectivity for minutes and resume without losing buffered telemetry: the retry is at the MQTT session layer, and the byte stream underneath is already reliable.',
      'The handshake cost is real on constrained links. A gateway on a metered cellular connection should hold one long-lived MQTT session rather than reconnecting per publish.',
      'When debugging a slow API path, separate connection setup from transfer. A slow TLS handshake and a slow response look identical in a wall-clock timing, and the fixes are unrelated.',
    ],
  },
  gotchas: [
    { t: 'Head-of-line blocking is inherent', p: 'One lost segment stalls delivery of everything behind it, even data that already arrived. This is why HTTP/3 moved to QUIC.' },
    { t: 'A dead peer looks like a quiet one', p: 'Without keepalives, a half-open connection can persist for hours. Application-level heartbeats are not optional on gateways.' },
    { t: 'Nagle plus delayed ACK adds latency', p: 'The two interact badly for small request/response traffic, producing consistent 40 ms stalls.' },
    { t: 'Reliable does not mean timely', p: 'TCP guarantees eventual, ordered delivery. It makes no promise about when, which is precisely what real-time traffic needs.' },
  ],
},

/* ============================== UDP ============================== */
{
  slug: 'UDP', h: 2240,
  expand: 'User Datagram Protocol — the deliberate opposite of TCP. Specified in RFC 768, August 1980, by Jon Postel, who also edited the TCP and IP specifications.',
  oneLine: 'TCP guarantees delivery, order and completeness. UDP throws all of that away on purpose, and the reason is more important than you might think: for some applications, the delay reliability costs is worse than the loss it prevents.',
  facts: [
    ['Layer', 'Transport (4)'],
    ['Delivery', 'Best-effort'],
    ['Header', '8 bytes'],
    ['Setup', 'None'],
    ['State', 'Connectionless'],
  ],
  diagram: {
    title: 'Eight bytes, no handshake, and a dropped video frame',
    sub: 'UDP removes every reliability mechanism TCP adds: no handshake, no sequence numbers, no acknowledgements, no retransmission, no flow control, no congestion control.',
    steps: [
      { label: 'Header size', caption: 'The TCP header is a minimum of 20 bytes; the UDP header is eight — source port, destination port, length, checksum. That difference matters enormously at scale, when a server is handling millions of flows simultaneously.' },
      { label: 'No handshake', caption: 'TCP spends one and a half round trips before the first byte of data. UDP’s first packet is data. On a link with 40 ms of latency, that is 60 ms saved before anything useful has even been sent.' },
      { label: 'A frame is lost', caption: 'Now the real argument. Somewhere between the sender and receiver of a live video call, one frame is dropped. What should happen next is the entire design question.' },
      { label: 'What TCP would do', caption: 'Stop everything. Detect the missing acknowledgement, wait out the retransmission timeout, resend the frame, and deliver it to your screen half a second late — by which point the conversation has moved on, and showing an old frame makes everything worse.' },
      { label: 'What UDP does', caption: 'Nothing. The next frame arrives on time and is displayed. The human eye handles a dropped frame far better than half a second of freezing, so accepting imperfection in exchange for speed is the correct trade here.' },
      { label: 'The DNS case', caption: 'The same argument, differently shaped. A UDP DNS query requires just two packets. The same query over TCP requires a minimum of seven. For a resolver handling 100,000 queries per second, that difference is enormous.' },
    ],
    svg: SVG(400, `
      <g class="dstep" data-layer="1">
        <text x="70" y="28" class="dlab-b">Header overhead</text>
        <text x="70" y="62" class="dlab-s">TCP</text>
        <rect x="130" y="46" width="400" height="22" rx="4" fill="#8096a3"/>
        <text x="330" y="62" class="dlab-s" text-anchor="middle" fill="#ffffff">20 bytes minimum</text>
        <text x="70" y="98" class="dlab-s">UDP</text>
        <rect x="130" y="82" width="160" height="22" rx="4" fill="#196796"/>
        <text x="210" y="98" class="dlab-s" text-anchor="middle" fill="#ffffff">8 bytes</text>
        <g class="dlab-s" fill="#8096a3">
          <text x="306" y="98">src port &#183; dst port &#183; length &#183; checksum. That is the whole header.</text>
        </g>
      </g>

      <g class="dstep" data-layer="2">
        <line x1="70" y1="126" x2="960" y2="126" stroke="var(--dg-line-soft)"/>
        <text x="70" y="154" class="dlab-s">TCP setup</text>
        <g fill="#8096a3">
          <rect x="180" y="142" width="60" height="16" rx="3"/><rect x="248" y="142" width="60" height="16" rx="3"/>
          <rect x="316" y="142" width="60" height="16" rx="3"/>
        </g>
        <rect x="384" y="142" width="120" height="16" rx="3" fill="#196796"/>
        <text x="444" y="155" class="dlab-s" text-anchor="middle" fill="#ffffff">data</text>
        <text x="520" y="155" class="dlab-s" fill="var(--text-tertiary)">SYN &#183; SYN-ACK &#183; ACK, then payload</text>
        <text x="70" y="186" class="dlab-s">UDP setup</text>
        <rect x="180" y="174" width="120" height="16" rx="3" fill="#196796"/>
        <text x="240" y="187" class="dlab-s" text-anchor="middle" fill="#ffffff">data</text>
        <text x="316" y="187" class="dlab-s" fill="var(--brand-600)">the first packet is the payload</text>
      </g>

      <g class="dstep" data-layer="3">
        <line x1="70" y1="212" x2="960" y2="212" stroke="var(--dg-line-soft)"/>
        <text x="70" y="240" class="dlab-b">Live video call &#183; one frame is lost</text>
        <g fill="#196796">
          <rect x="70" y="256" width="52" height="40" rx="4"/><rect x="128" y="256" width="52" height="40" rx="4"/>
        </g>
        <rect x="186" y="256" width="52" height="40" rx="4" fill="var(--status-critical-tint)" stroke="var(--status-critical)" stroke-dasharray="4 3"/>
        <path d="M198,268 l28,16 M226,268 l-28,16" stroke="var(--status-critical)" stroke-width="2"/>
        <g fill="#196796">
          <rect x="244" y="256" width="52" height="40" rx="4"/><rect x="302" y="256" width="52" height="40" rx="4"/>
          <rect x="360" y="256" width="52" height="40" rx="4"/>
        </g>
        <g class="dlab-s" fill="var(--dg-surface)" text-anchor="middle">
          <text x="96" y="280">f1</text><text x="154" y="280">f2</text>
          <text x="270" y="280">f4</text><text x="328" y="280">f5</text><text x="386" y="280">f6</text>
        </g>
        <text x="212" y="312" class="dlab-s" text-anchor="middle" fill="var(--status-critical)">f3</text>
      </g>

      <g class="dstep" data-layer="4">
        <rect x="460" y="248" width="240" height="72" rx="8" fill="var(--status-critical-tint)"/>
        <text x="476" y="270" class="dlab-s" fill="var(--status-critical)">TCP: hold everything</text>
        <text x="476" y="290" class="dlab-s" fill="var(--status-critical-on-tint)">detect &#8594; wait RTO &#8594; resend</text>
        <text x="476" y="310" class="dlab-s" fill="var(--status-critical-on-tint)">f3 arrives ~500 ms stale</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="716" y="248" width="244" height="72" rx="8" fill="var(--status-ok-tint)"/>
        <text x="732" y="270" class="dlab-s" fill="var(--status-ok)">UDP: keep going</text>
        <text x="732" y="290" class="dlab-s" fill="var(--status-ok-on-tint)">f4 displays on time</text>
        <text x="732" y="310" class="dlab-s" fill="var(--status-ok-on-tint)">one glitch beats a freeze</text>
      </g>

      <g class="dstep" data-layer="6">
        <line x1="70" y1="340" x2="960" y2="340" stroke="var(--dg-line-soft)"/>
        <text x="70" y="368" class="dlab-s">DNS over UDP</text>
        <g fill="#196796"><rect x="200" y="356" width="44" height="16" rx="3"/><rect x="252" y="356" width="44" height="16" rx="3"/></g>
        <text x="312" y="369" class="dlab-s" fill="var(--brand-600)">2 packets</text>
        <text x="70" y="392" class="dlab-s">DNS over TCP</text>
        <g fill="#8096a3">
          <rect x="200" y="380" width="44" height="16" rx="3"/><rect x="252" y="380" width="44" height="16" rx="3"/>
          <rect x="304" y="380" width="44" height="16" rx="3"/><rect x="356" y="380" width="44" height="16" rx="3"/>
          <rect x="408" y="380" width="44" height="16" rx="3"/><rect x="460" y="380" width="44" height="16" rx="3"/>
          <rect x="512" y="380" width="44" height="16" rx="3"/>
        </g>
        <text x="572" y="393" class="dlab-s" fill="var(--text-tertiary)">7 packets minimum &#8212; at 100k queries/s that is the whole design</text>
      </g>`),
  },
  how: [
    { h: 'The point is latency, not efficiency', p: 'The smaller header is a pleasant side effect; the real reason UDP exists is that TCP’s handshake, acknowledgements and retransmission all introduce delay. For a live call or a competitive game, a single millisecond of extra latency can determine the outcome, and a retransmitted frame is worthless by the time it lands.' },
    { h: 'Reliability moves into the application', p: 'UDP does not forbid reliability; it declines to impose it. Applications that need some of it build exactly the parts they want — a sequence number for reordering, perhaps, but no retransmission. QUIC is the fullest expression of this: a complete reliable transport built on UDP because TCP could not be changed.' },
    { h: 'Connectionless changes server economics', p: 'With no per-connection state to hold, a single socket can serve enormous numbers of clients. That is why DNS resolvers, game servers and telemetry collectors reach for UDP: the state a TCP server must keep for each peer is itself the scaling limit.' },
  ],
  netix: {
    lead: 'UDP appears in NETIX deployments mostly underneath other things — but where it does appear directly, it is because the data is worth less than the delay.',
    points: [
      'BACnet/IP, one of the two protocol families in the NETIX protocol core, runs over UDP — including the broadcast discovery that BBMD forwarding exists to work around across subnets.',
      'Metrics and traces from gateways and services use UDP-based OTLP paths where a dropped sample is preferable to back-pressure on the thing being measured.',
      'The rule of thumb across the stack: telemetry that is sampled continuously can tolerate loss; commands and configuration cannot. Control-tag writes go over TCP paths, always.',
    ],
  },
  gotchas: [
    { t: 'No congestion control is antisocial', p: 'A UDP flood does not back off and will starve TCP traffic sharing the link. Rate-limit it yourself.' },
    { t: 'Datagram size interacts with MTU', p: 'Oversized datagrams fragment, and one lost fragment loses the whole datagram. Keep them under the path MTU.' },
    { t: 'Firewalls and NAT treat it as second class', p: 'With no connection to track, NAT bindings expire quickly. Long-idle UDP paths go quiet without warning.' },
    { t: 'Checksum is optional in IPv4', p: 'A zero checksum means unverified. Some stacks send it that way and corruption reaches the application.' },
  ],
},

/* ============================== DNS ============================== */
{
  slug: 'DNS', h: 2240,
  expand: 'Domain Name System — the reason you type a name rather than an address. A distributed, cached, hierarchical database that answers in tens of milliseconds.',
  oneLine: 'DNS works like the phone book of the internet, except no single copy of the book exists anywhere. You ask a resolver; it asks the root, then the top-level domain, then the authoritative server for that domain, and caches what it learns on the way back — which is why almost every lookup you make never leaves your resolver.',
  facts: [
    ['Transport', 'UDP 53, TCP for large'],
    ['Structure', 'Hierarchical, delegated'],
    ['Typical latency', 'Cached ~0 &middot; cold 10s–100s ms'], 
    ['Caching', 'TTL per record'],
    ['Privacy', 'Plaintext by default'],
  ],
  diagram: {
    title: 'A cold lookup walks the hierarchy; a warm one never leaves the resolver',
    sub: 'Delegation is what makes this scale. No server knows every name — each one knows only who to ask next, and the answers are cached at every step.',
    steps: [
      { label: 'The query', caption: 'Your device asks its configured resolver — usually your ISP’s, your router’s, or a public one. The stub resolver on your machine does almost nothing itself; it delegates the whole problem in one question.' },
      { label: 'Cache first', caption: 'The resolver checks its cache. If it has a valid answer it returns it immediately and the rest of this diagram never happens. In practice this is the overwhelming majority of lookups, which is what keeps the root servers survivable.' },
      { label: 'Ask the root', caption: 'On a miss, the resolver asks a root server. The root does not know the answer and does not pretend to — it replies with a referral: here are the nameservers for .dev. Thirteen root server addresses serve the entire internet, anycast to hundreds of physical sites.' },
      { label: 'Ask the TLD', caption: 'The .dev servers likewise refuse to answer directly. They return the nameservers that were registered as authoritative for the domain. Each step narrows the question rather than solving it.' },
      { label: 'Authoritative answer', caption: 'Finally the domain’s own nameserver returns the actual record — the address, and a TTL saying how long it may be reused. This is the only server in the chain that holds the truth.' },
      { label: 'Cache and reuse', caption: 'The resolver stores the answer for the TTL and returns it. Every subsequent lookup for that name, from any client it serves, is answered from memory. The cold path costs several round trips and can run to hundreds of milliseconds; warm, it is a memory lookup, and it stays warm for hours.' },
    ],
    svg: SVG(390, `
      <g opacity="0.9">
        <rect x="70" y="150" width="120" height="52" rx="8" fill="#64748b"/>
        <text x="130" y="172" class="dlab-b" text-anchor="middle" fill="#ffffff">Your device</text>
        <text x="130" y="190" class="dlab-s" text-anchor="middle" fill="#cbd5e1">stub resolver</text>
        <rect x="290" y="150" width="140" height="52" rx="8" fill="#196796"/>
        <text x="360" y="172" class="dlab-b" text-anchor="middle" fill="#ffffff">Resolver</text>
        <text x="360" y="190" class="dlab-s" text-anchor="middle" fill="#c7ddec">recursive + cache</text>
      </g>

      <g class="dstep" data-layer="1">
        <path d="M190,166 H282" class="dwire" stroke="var(--dg-a)" marker-end="url(#dn-b)"/>
        <text x="236" y="156" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">A? netixai.dev</text>
      </g>

      <g class="dstep" data-layer="2">
        <rect x="290" y="228" width="140" height="60" rx="8" fill="var(--status-ok-tint)" stroke="var(--status-ok)"/>
        <text x="360" y="250" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">cache</text>
        <text x="360" y="270" class="dlab-s" text-anchor="middle" fill="var(--status-ok-on-tint)">hit &#8594; answer now</text>
        <path d="M360,202 V222" stroke="var(--status-ok)" stroke-width="1.5" stroke-dasharray="3 3"/>
        <path d="M290,258 H210 V186 H282" class="dwire" stroke="var(--status-ok)" marker-end="url(#dn-k)" stroke-dasharray="5 4"/>
        <text x="150" y="252" class="dlab-s" fill="var(--status-ok)">most lookups end here</text>
      </g>

      <g class="dstep" data-layer="3">
        <rect x="540" y="42" width="150" height="46" rx="8" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="615" y="62" class="dlab-b" text-anchor="middle">Root</text>
        <text x="615" y="78" class="dlab-s" text-anchor="middle">13 anycast sets</text>
        <path d="M430,158 L532,80" class="dwire" stroke="var(--dg-d)" marker-end="url(#dn-p)"/>
        <path d="M540,92 L436,166" class="dwire" stroke="var(--text-tertiary)" stroke-dasharray="4 3" marker-end="url(#dn-s)"/>
        <text x="700" y="62" class="dlab-s" fill="var(--text-tertiary)">&#8220;ask the .dev servers&#8221;</text>
      </g>

      <g class="dstep" data-layer="4">
        <rect x="540" y="150" width="150" height="46" rx="8" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="615" y="170" class="dlab-b" text-anchor="middle">.dev TLD</text>
        <text x="615" y="186" class="dlab-s" text-anchor="middle">registry</text>
        <path d="M430,170 H532" class="dwire" stroke="var(--dg-d)" marker-end="url(#dn-p)"/>
        <path d="M540,186 H438" class="dwire" stroke="var(--text-tertiary)" stroke-dasharray="4 3" marker-end="url(#dn-s)"/>
        <text x="700" y="176" class="dlab-s" fill="var(--text-tertiary)">&#8220;ask ns1.netixai.dev&#8221;</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="540" y="258" width="150" height="46" rx="8" fill="var(--brand-100)" stroke="var(--brand-500)"/>
        <text x="615" y="278" class="dlab-b" text-anchor="middle" fill="var(--brand-700)">Authoritative</text>
        <text x="615" y="294" class="dlab-s" text-anchor="middle" fill="var(--brand-700)">ns1.netixai.dev</text>
        <path d="M430,192 L532,266" class="dwire" stroke="var(--dg-d)" marker-end="url(#dn-p)"/>
        <path d="M540,296 L436,200" class="dwire" stroke="var(--brand-600)" marker-end="url(#dn-n)"/>
        <text x="700" y="284" class="dlab-s" fill="var(--brand-600)">A 20.31.44.9 &#183; TTL 300</text>
        <text x="700" y="304" class="dlab-s" fill="var(--text-tertiary)">the only server that actually knows</text>
      </g>

      <g class="dstep" data-layer="6">
        <path d="M290,176 H198" class="dwire" stroke="var(--brand-600)" marker-end="url(#dn-n)"/>
        <text x="240" y="196" class="dlab-s" text-anchor="middle" fill="var(--brand-600)">answer</text>
        <line x1="70" y1="330" x2="960" y2="330" stroke="var(--dg-line-soft)"/>
        <rect x="70" y="346" width="430" height="30" rx="6" fill="var(--status-ok-tint)"/>
        <text x="86" y="365" class="dlab-s" fill="var(--status-ok-on-tint)">cached for TTL &#8594; the next 300 seconds of lookups cost nothing</text>
        <rect x="516" y="346" width="444" height="30" rx="6" fill="var(--status-warning-tint)"/>
        <text x="532" y="365" class="dlab-s" fill="var(--status-warning-on-tint)">every hop above is plaintext &#8212; DoH/DoT encrypt the first hop only</text>
      </g>
      <defs>
        <marker id="dn-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0072b2"/></marker>
        <marker id="dn-k" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#16a34a"/></marker>
        <marker id="dn-p" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#a8437f"/></marker>
        <marker id="dn-s" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8096a3"/></marker>
        <marker id="dn-n" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#196796"/></marker>
      </defs>`),
  },
  how: [
    { h: 'Delegation, not replication', p: 'No server holds the whole namespace. Each level knows only which servers are responsible for the level below, and answers a question it cannot resolve with a referral rather than a failure. That is what lets a distributed database of hundreds of millions of names stay consistent enough to be useful.' },
    { h: 'Caching is what makes the latency acceptable', p: 'The full recursive walk is three round trips to servers that may be continents away, yet lookups feel instant because almost none of them do that walk. Every resolver, every operating system and every browser caches, so the cost is paid once per TTL per resolver rather than once per user.' },
    { h: 'Plaintext by default, and that has consequences', p: 'The queries are small and fast partly because nothing is encrypted, which means your internet provider — and anyone on the path — can see every domain you look up, even when the traffic that follows is HTTPS. DNS over HTTPS was developed to fix this by hiding queries inside ordinary web traffic.' },
  ],
  netix: {
    lead: 'DNS is quietly load-bearing in NETIX deployments, and it fails in ways that look like other problems entirely.',
    points: [
      'Gateways resolve their broker and API endpoints by name, so a site with a captive or misconfigured resolver produces "gateway offline" symptoms that have nothing to do with the gateway.',
      'In-cluster service discovery is DNS too. A stage service pointed at a name that only resolves in one namespace fails identically to a service that is genuinely down.',
      'TTL is a deployment tool: shortening it before a planned endpoint migration, and restoring it afterwards, is the difference between a cutover measured in minutes and one measured in days.',
    ],
  },
  gotchas: [
    { t: 'Cached negative answers persist too', p: 'An NXDOMAIN is cached like any other result. Creating a record does not immediately fix clients that already asked.' },
    { t: 'TTL is advice, not enforcement', p: 'Some resolvers and applications cache far longer, and some JVMs cache forever by default.' },
    { t: 'Split-horizon DNS confuses debugging', p: 'The same name resolving differently inside and outside a network is common and rarely documented.' },
    { t: 'Large responses fall back to TCP', p: 'DNSSEC and long record sets exceed the UDP limit. A firewall blocking TCP 53 breaks exactly those lookups.' },
  ],
},
];
