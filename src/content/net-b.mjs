const SVG = (h, body) => `<svg class="dgm" viewBox="0 0 1000 ${h}" width="100%" role="img" aria-hidden="true">${body}</svg>`;

export const NET_B = [
/* ============================== HTTP ============================== */
{
  slug: 'HTTP', h: 2280,
  expand: 'Hypertext Transfer Protocol — invented by Tim Berners-Lee in 1989 at CERN, and now the default way almost any two pieces of software talk to each other.',
  oneLine: 'HTTP works on a simple request and response model: your browser asks for a resource with a method, and the server answers with a three-digit status code and a body. Everything since has been about doing more of that at once, faster.',
  facts: [
    ['Model', 'Request / response'],
    ['Transport', 'TCP, or QUIC in h3'],
    ['State', 'Stateless per request'],
    ['Methods', 'GET, POST, PUT, DELETE…'],
    ['Versions', '1.1 &middot; 2 (2015) &middot; 3 (2022)'],
  ],
  diagram: {
    title: 'One exchange, then thirty years of making it concurrent',
    sub: 'The request/response shape has not changed since 1989. What changed is how many can be in flight on one connection, and what that connection runs over.',
    steps: [
      { label: 'The request', caption: 'A method, a path and a set of headers. GET means give me this resource; POST means process this data; PUT means update it; DELETE means remove it. The method is a promise about side effects, which is why GET must be safe to retry and POST must not.' },
      { label: 'The response', caption: 'A status line, headers and a body. The status code is the part that carries meaning for machines — 200 means success, 404 means not found, 500 means the server broke — and getting it right is most of what makes an API pleasant to consume.' },
      { label: 'Status classes', caption: 'The first digit is the class, and it is worth treating as a contract. 2xx succeeded, 3xx go elsewhere, 4xx the caller is wrong, 5xx the server is wrong. A client can decide whether to retry from the first digit alone, without understanding the specific code.' },
      { label: 'HTTP/1.1 blocks', caption: 'One request at a time per connection. A slow response holds up everything queued behind it, so browsers opened six connections per host as a workaround. That is head-of-line blocking, and it is the problem the next two versions exist to solve.' },
      { label: 'HTTP/2 multiplexes', caption: 'From 2015, many requests share one connection as independent streams, interleaved frame by frame. One slow response no longer blocks the others at the HTTP layer — though a lost TCP segment still stalls every stream, because they share one byte stream underneath.' },
      { label: 'HTTP/3 on QUIC', caption: 'From 2022, TCP is replaced by QUIC over UDP, giving each stream its own delivery guarantee. A lost packet now stalls only the stream it belonged to. It also folds the TLS handshake into the connection setup, which is why it helps most on mobile networks.' },
    ],
    svg: SVG(410, `
      <g class="dstep" data-layer="1">
        <rect x="70" y="44" width="400" height="128" rx="8" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="86" y="66" class="dlab-s" fill="var(--text-tertiary)">request</text>
        <text x="86" y="92" class="dlab-b" fill="var(--dg-a)">GET /api/tag/?asset=412 HTTP/1.1</text>
        <text x="86" y="116" class="dlab-s">Host: api.netixai.dev</text>
        <text x="86" y="136" class="dlab-s">Accept: application/json</text>
        <text x="86" y="156" class="dlab-s">Authorization: Bearer &#8230;</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M486,108 h34 m-8,-8 8,8 -8,8" class="dwire" stroke="var(--text-tertiary)"/>
        <rect x="546" y="44" width="414" height="128" rx="8" fill="var(--dg-surface)" stroke="var(--dg-line)"/>
        <text x="562" y="66" class="dlab-s" fill="var(--text-tertiary)">response</text>
        <text x="562" y="92" class="dlab-b" fill="var(--status-ok)">HTTP/1.1 200 OK</text>
        <text x="562" y="116" class="dlab-s">Content-Type: application/json</text>
        <text x="562" y="136" class="dlab-s">Cache-Control: max-age=30</text>
        <text x="562" y="156" class="dlab-s" fill="var(--dg-d)">{"count": 412, "results": [ &#8230; ]}</text>
      </g>

      <g class="dstep" data-layer="3">
        <line x1="70" y1="194" x2="960" y2="194" stroke="var(--dg-line-soft)"/>
        <g>
          <rect x="70" y="210" width="212" height="42" rx="7" fill="var(--status-ok-tint)"/>
          <rect x="294" y="210" width="212" height="42" rx="7" fill="var(--status-info-tint)"/>
          <rect x="518" y="210" width="212" height="42" rx="7" fill="var(--status-warning-tint)"/>
          <rect x="742" y="210" width="218" height="42" rx="7" fill="var(--status-critical-tint)"/>
        </g>
        <text x="86" y="228" class="dlab-b" fill="var(--status-ok)">2xx succeeded</text>
        <text x="86" y="245" class="dlab-s" fill="var(--status-ok-on-tint)">200 OK &#183; 201 Created</text>
        <text x="310" y="228" class="dlab-b" fill="var(--status-info)">3xx go elsewhere</text>
        <text x="310" y="245" class="dlab-s" fill="var(--status-info-on-tint)">301 Moved &#183; 304 Not Modified</text>
        <text x="534" y="228" class="dlab-b" fill="var(--status-warning-on-tint)">4xx caller is wrong</text>
        <text x="534" y="245" class="dlab-s" fill="var(--status-warning-on-tint)">400 &#183; 401 &#183; 403 &#183; 404 &#183; 429</text>
        <text x="758" y="228" class="dlab-b" fill="var(--status-critical)">5xx server is wrong</text>
        <text x="758" y="245" class="dlab-s" fill="var(--status-critical-on-tint)">500 &#183; 502 &#183; 503 &#183; 504</text>
      </g>

      <g class="dstep" data-layer="4">
        <text x="70" y="292" class="dlab-b">HTTP/1.1</text>
        <rect x="180" y="278" width="700" height="20" rx="4" fill="var(--dg-panel)"/>
        <rect x="182" y="280" width="120" height="16" rx="3" fill="#0072b2"/>
        <rect x="306" y="280" width="330" height="16" rx="3" fill="#8096a3"/>
        <rect x="640" y="280" width="110" height="16" rx="3" fill="#0072b2"/>
        <text x="471" y="293" class="dlab-s" text-anchor="middle" fill="#ffffff">slow response holds the line</text>
        <text x="896" y="293" class="dlab-s" fill="var(--status-critical)">blocked</text>
      </g>

      <g class="dstep" data-layer="5">
        <text x="70" y="330" class="dlab-b">HTTP/2</text>
        <rect x="180" y="316" width="700" height="20" rx="4" fill="var(--dg-panel)"/>
        <g fill="#196796">
          <rect x="182" y="318" width="60" height="16" rx="3"/><rect x="266" y="318" width="60" height="16" rx="3"/>
          <rect x="350" y="318" width="60" height="16" rx="3"/><rect x="434" y="318" width="60" height="16" rx="3"/>
        </g>
        <g fill="#a8437f">
          <rect x="246" y="318" width="16" height="16" rx="3"/><rect x="330" y="318" width="16" height="16" rx="3"/>
          <rect x="414" y="318" width="16" height="16" rx="3"/><rect x="498" y="318" width="60" height="16" rx="3"/>
        </g>
        <g fill="#009e73">
          <rect x="562" y="318" width="90" height="16" rx="3"/><rect x="656" y="318" width="90" height="16" rx="3"/>
          <rect x="750" y="318" width="128" height="16" rx="3"/>
        </g>
        <text x="896" y="331" class="dlab-s" fill="var(--brand-600)">multiplexed</text>
      </g>

      <g class="dstep" data-layer="6">
        <text x="70" y="368" class="dlab-b">HTTP/3</text>
        <rect x="180" y="354" width="700" height="20" rx="4" fill="var(--dg-panel)"/>
        <g fill="#196796"><rect x="182" y="356" width="200" height="16" rx="3"/></g>
        <g fill="#a8437f"><rect x="386" y="356" width="160" height="16" rx="3"/></g>
        <g fill="#009e73"><rect x="550" y="356" width="180" height="16" rx="3"/></g>
        <rect x="734" y="356" width="60" height="16" rx="3" fill="var(--status-critical-tint)" stroke="var(--status-critical)" stroke-dasharray="3 2"/>
        <g fill="#009e73"><rect x="798" y="356" width="80" height="16" rx="3"/></g>
        <text x="896" y="369" class="dlab-s" fill="var(--status-ok)">one stream stalls</text>
        <text x="70" y="398" class="dlab-s" fill="var(--text-tertiary)">QUIC runs on UDP and carries TLS inside the connection setup &#8212; fewer round trips, and a connection that survives a network change</text>
      </g>`),
  },
  how: [
    { h: 'Statelessness is what let it scale', p: 'Every HTTP request carries everything the server needs to handle it. Nothing is remembered between requests, which is why any request can go to any server in a pool and why horizontal scaling works at all. Sessions and cookies are a layer built on top precisely because the protocol refuses to hold state.' },
    { h: 'The method is a contract about side effects', p: 'GET is safe and idempotent, PUT and DELETE are idempotent but not safe, POST is neither. Every retry policy, cache and proxy in the path relies on those promises, which is why a GET endpoint that mutates data breaks infrastructure well outside your own service.' },
    { h: 'Three versions, one semantic model', p: 'HTTP/2 and HTTP/3 changed the wire format completely — binary framing, header compression, a different transport — while keeping methods, headers and status codes identical. An application written against HTTP/1.1 semantics runs unchanged over HTTP/3, which is why adoption could happen at the infrastructure layer.' },
  ],
  netix: {
    lead: 'HTTP is the contract layer of the NETIX platform. Every backend service publishes an OpenAPI schema, and every frontend consumes a client generated from it — so the protocol is where the cross-repo contract is actually enforced.',
    points: [
      'Django REST Framework services generate OpenAPI schemas with drf-spectacular; the schema-sync tooling copies each into its mapped consumers and regenerates their clients, so a changed endpoint is a tracked, checkable event rather than a surprise.',
      'Error payloads are normalised across services to a single envelope shape, so a frontend can render a 400 from any service without service-specific handling.',
      'Status codes carry real operational meaning here: a 403 stays in-app while a 401 triggers reauthentication, and the shared client library encodes that distinction once rather than per app.',
    ],
  },
  gotchas: [
    { t: 'A 200 with an error body is a trap', p: 'Clients, proxies and retry logic all read the status line. Errors must carry a 4xx or 5xx.' },
    { t: 'GET must not mutate', p: 'Prefetchers, caches and crawlers will issue it without a user. Side effects will happen unasked.' },
    { t: 'Retrying a POST can duplicate work', p: 'Non-idempotent by definition. Use an idempotency key if the caller needs to retry safely.' },
    { t: 'Version is negotiated, not chosen', p: 'You may write HTTP/1.1 and be served over HTTP/2 by a proxy. Debug the hop you are actually on.' },
  ],
},

/* ============================== HTTPS ============================== */
{
  slug: 'HTTPS', h: 2260,
  expand: 'HTTP Secure — the same protocol running inside an encrypted tunnel created by TLS, which authenticates the server, agrees a key without ever sending it, and encrypts everything after.',
  oneLine: 'Without HTTPS, every byte you send travels as plain readable text — every password, every card number, visible to anyone intercepting the traffic. The TLS handshake fixes that with three jobs done in one exchange.',
  facts: [
    ['Adds', 'TLS beneath HTTP'],
    ['Port', '443'],
    ['Identity', 'X.509 certificate chain'],
    ['Cipher', 'AES-GCM / ChaCha20'],
    ['Handshake', '1-RTT in TLS 1.3'],
  ],
  diagram: {
    title: 'Three jobs in one handshake — and what stays visible afterwards',
    sub: 'TLS authenticates the server, establishes a shared key that is never transmitted, and encrypts everything that follows. Each of those is a separate problem with a separate solution.',
    steps: [
      { label: 'Without it', caption: 'Plain HTTP puts every header and every byte of body on the wire in the clear. Anyone on the path — a network operator, a compromised access point, anyone with a tap — reads it exactly as the server does.' },
      { label: 'ClientHello', caption: 'The client opens with the TLS versions it supports, the cipher suites it will accept, a random value and its key-share. Offering the key material immediately is what lets TLS 1.3 complete in a single round trip.' },
      { label: 'Certificate', caption: 'The server answers with its own key-share and a certificate chain. The client checks that chain up to a certificate authority it already trusts, and that the name on it matches the site requested. This is the step that stops an impostor, and it is what a browser warning is complaining about.' },
      { label: 'Key agreement', caption: 'Both sides now derive the same session key from their two key-shares. The key itself is never transmitted in any form, so recording the entire handshake and cracking the certificate later still does not reveal it — that property is forward secrecy.' },
      { label: 'Encrypted records', caption: 'From here the HTTP request and response travel as authenticated, encrypted records. AES-GCM is not merely scrambling — it also detects tampering, so an attacker cannot modify a byte in flight without the change being rejected.' },
      { label: 'Still visible', caption: 'Encryption is not invisibility. The destination IP address, the size and timing of every message, and in most deployments the server name in the handshake remain observable. HTTPS protects the content, not the fact of the conversation.' },
    ],
    svg: SVG(400, `
      <g opacity="0.75">
        <text x="130" y="30" class="dlab-b" text-anchor="middle">Browser</text>
        <text x="790" y="30" class="dlab-b" text-anchor="middle">Server</text>
        <path d="M130,42 V330 M790,42 V330" stroke="var(--dg-line)" stroke-dasharray="4 4"/>
      </g>

      <g class="dstep" data-hl="1">
        <rect x="180" y="52" width="560" height="40" rx="7" fill="var(--status-critical-tint)"/>
        <text x="200" y="70" class="dlab-s" fill="var(--status-critical)">plain HTTP &#183; readable by anyone on the path</text>
        <text x="200" y="86" class="dlab-s" fill="var(--status-critical-on-tint)">POST /login  password=hunter2</text>
        <path d="M470,100 V116" stroke="var(--status-critical)" stroke-width="1.5"/>
        <text x="482" y="114" class="dlab-s" fill="var(--status-critical)">tap</text>
      </g>

      <g class="dstep" data-layer="2">
        <path d="M130,146 H782" class="dwire" stroke="var(--dg-a)" marker-end="url(#hs-b)"/>
        <text x="456" y="138" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">ClientHello &#183; versions &#183; ciphers &#183; random &#183; key-share</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M790,182 H138" class="dwire" stroke="var(--dg-b)" marker-end="url(#hs-g)"/>
        <text x="464" y="174" class="dlab-s" text-anchor="middle" fill="var(--dg-b)">ServerHello &#183; key-share &#183; certificate chain &#183; Finished</text>
        <rect x="256" y="192" width="400" height="34" rx="6" fill="var(--status-ok-tint)"/>
        <text x="272" y="213" class="dlab-s" fill="var(--status-ok-on-tint)">chain verified to a trusted CA &#183; name matches the request</text>
      </g>

      <g class="dstep" data-layer="4">
        <rect x="70" y="240" width="230" height="52" rx="7" fill="var(--brand-100)"/>
        <text x="86" y="262" class="dlab-s" fill="var(--brand-700)">derives session key</text>
        <text x="86" y="280" class="dlab-s" fill="var(--brand-700)">from both key-shares</text>
        <rect x="700" y="240" width="260" height="52" rx="7" fill="var(--brand-100)"/>
        <text x="716" y="262" class="dlab-s" fill="var(--brand-700)">derives the same key</text>
        <text x="716" y="280" class="dlab-s" fill="var(--brand-700)">independently</text>
        <path d="M306,266 H694" stroke="var(--dg-d)" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="500" y="258" class="dlab-s" text-anchor="middle" fill="var(--dg-d)">the key itself never crosses the wire</text>
      </g>

      <g class="dstep" data-layer="5">
        <rect x="180" y="304" width="560" height="40" rx="7" fill="var(--dg-inverse)"/>
        <text x="200" y="322" class="dlab-s" fill="#7bc0ea">encrypted + authenticated records</text>
        <text x="200" y="338" class="dlab-s" fill="#4b5d68">a7 3f 91 e2 0c bb 45 &#8230; tampering is detected, not just hidden</text>
      </g>

      <g class="dstep" data-layer="6">
        <line x1="70" y1="360" x2="960" y2="360" stroke="var(--dg-line-soft)"/>
        <rect x="70" y="372" width="430" height="26" rx="6" fill="var(--status-ok-tint)"/>
        <text x="86" y="389" class="dlab-s" fill="var(--status-ok-on-tint)">hidden: URL path, headers, cookies, body</text>
        <rect x="516" y="372" width="444" height="26" rx="6" fill="var(--status-warning-tint)"/>
        <text x="532" y="389" class="dlab-s" fill="var(--status-warning-on-tint)">still visible: destination IP, message sizes, timing, usually the SNI</text>
      </g>
      <defs>
        <marker id="hs-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0072b2"/></marker>
        <marker id="hs-g" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#009e73"/></marker>
      </defs>`),
  },
  how: [
    { h: 'Authentication is the hard part, not encryption', p: 'Encrypting to a stranger is easy and useless — you would simply be talking privately to an attacker. The certificate chain is what binds a public key to a name, and the entire security of HTTPS rests on your device’s trust store and on certificate authorities behaving. Encryption is the easy half.' },
    { h: 'The key is derived, never sent', p: 'Both sides contribute a key-share and independently compute the same secret from them. An observer who records the whole handshake learns nothing usable, and because a fresh share is used per session, compromising the server’s long-term key later does not decrypt yesterday’s traffic.' },
    { h: 'It is now the floor, not a feature', p: 'HTTPS is the absolute minimum standard for any site handling user data, and browsers now treat plain HTTP as an anomaly to warn about rather than a normal option. Several browser capabilities — service workers, geolocation, HTTP/2 in practice — are simply unavailable without it.' },
  ],
  netix: {
    lead: 'Every external NETIX surface is HTTPS-terminated at the ingress, and certificate and CORS problems are among the most common causes of a failure that presents to a user as something else entirely.',
    points: [
      'TLS terminates at the ingress; internal service-to-service traffic runs behind it. That boundary is why an internal service can be healthy while every browser request fails.',
      'A browser reporting a CORS error is frequently not a CORS problem at all — a 503 from a wedged upstream, or a preflight rejected for a missing allowed header, both surface in the console as CORS.',
      'When adding a new frontend origin, the allowed-origin list is application configuration, not ingress configuration. Changing the wrong layer produces a fix that appears to do nothing.',
    ],
  },
  gotchas: [
    { t: 'Expiry is an outage with a date on it', p: 'Certificates expire on a known schedule and still take services down. Monitor the expiry, not just the endpoint.' },
    { t: 'Chain order matters', p: 'A server serving a leaf without its intermediate works in browsers that cached it and fails everywhere else.' },
    { t: 'Clock skew breaks validation', p: 'A gateway with a wrong clock rejects valid certificates. On devices without an RTC this appears after every power cut.' },
    { t: 'HTTPS does not authenticate the client', p: 'It proves the server is who it says. Client identity is a separate problem needing mTLS or tokens.' },
  ],
},

/* ============================== MQTT ============================== */
{
  slug: 'MQTT', h: 2320,
  expand: 'Message Queuing Telemetry Transport — created in 1999 by Andy Stanford-Clark of IBM and Arlen Nipper of Arcom to monitor oil pipelines over satellite links that were expensive, unreliable, and attached to devices with almost no processing power.',
  oneLine: 'MQTT was built for a world HTTP was never designed for. Devices publish to a central broker; other devices subscribe and receive only what they care about; nobody talks directly to anyone. Its fixed header is two bytes, against hundreds of bytes of headers on every HTTP request.',
  facts: [
    ['Model', 'Publish / subscribe'],
    ['Transport', 'TCP (or TLS)'],
    ['Fixed header', '2 bytes'],
    ['QoS', '0, 1, 2'],
    ['Topics', 'Hierarchical, wildcards'],
  ],
  diagram: {
    title: 'A broker, a topic tree, and three delivery guarantees',
    sub: 'The topic tree below is a real NETIX gateway shape: drivers publish under netix/, and everything upstream subscribes rather than polls.',
    steps: [
      { label: 'The 1999 problem', caption: 'Remote desert pipeline sensors, satellite links charged by the byte, links that dropped constantly, and controllers with kilobytes of memory. A protocol that assumed a reliable, cheap, always-on connection was not usable — so they wrote one that assumed the opposite.' },
      { label: 'Broker in the middle', caption: 'Devices never address each other. A publisher sends to the broker and a subscriber receives from the broker, so neither needs to know the other exists, be online at the same time, or be reachable from the internet. That decoupling is the whole architecture.' },
      { label: 'Publish to a topic', caption: 'A message carries a topic string rather than a recipient. A Modbus driver reading a power meter publishes to a path describing what the value is — the driver has no idea who, if anyone, is listening.' },
      { label: 'Subscribe with wildcards', caption: 'Subscribers ask for topic patterns. A plus matches one level, a hash matches everything below. The cloud bridge takes netix/# and forwards the lot; a dashboard takes one meter; an alarm rule takes one point across every gateway.' },
      { label: 'Quality of service', caption: 'QoS 0 sends once and forgets. QoS 1 retries until acknowledged, so a message may arrive twice. QoS 2 does a four-part exchange guaranteeing exactly once. Higher is not better — it is more round trips, and a temperature sample resent late is worth less than the next one.' },
      { label: 'Two bytes', caption: 'The MQTT fixed header is two bytes, and a keepalive is exactly that. A PUBLISH adds only its topic and payload — no header block, no re-sent authentication, no re-negotiated connection. On a metered cellular or satellite link with a thousand points sampled every ten seconds, that difference is the entire operating cost of the deployment.' },
    ],
    svg: SVG(430, `
      <g class="dstep" data-hl="1">
        <rect x="70" y="42" width="890" height="46" rx="8" fill="var(--dg-panel)"/>
        <text x="86" y="64" class="dlab-b">1999 &#183; oil pipelines, satellite backhaul</text>
        <text x="86" y="82" class="dlab-s">links charged by the byte &#183; drops constantly &#183; controllers with kilobytes of RAM &#183; no inbound reachability</text>
      </g>

      <g class="dstep" data-layer="2">
        <rect x="410" y="176" width="180" height="64" rx="10" fill="#196796"/>
        <text x="500" y="202" class="dlab-b" text-anchor="middle" fill="#ffffff">Broker</text>
        <text x="500" y="222" class="dlab-s" text-anchor="middle" fill="#c7ddec">Mosquitto</text>
        <text x="500" y="264" class="dlab-s" text-anchor="middle" fill="var(--text-tertiary)">publishers and subscribers never learn about each other</text>
      </g>

      <g class="dstep" data-layer="3">
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="70" y="120" width="150" height="34" rx="6"/>
          <rect x="70" y="166" width="150" height="34" rx="6"/>
          <rect x="70" y="212" width="150" height="34" rx="6"/>
        </g>
        <text x="145" y="141" class="dlab-s" text-anchor="middle">Modbus driver</text>
        <text x="145" y="187" class="dlab-s" text-anchor="middle">BACnet driver</text>
        <text x="145" y="233" class="dlab-s" text-anchor="middle">1-Wire driver</text>
        <g stroke="var(--dg-a)" class="dwire">
          <path d="M220,137 L402,190" marker-end="url(#mq-b)"/>
          <path d="M220,183 L402,200" marker-end="url(#mq-b)"/>
          <path d="M220,229 L402,214" marker-end="url(#mq-b)"/>
        </g>
        <rect x="240" y="90" width="450" height="24" rx="5" fill="var(--brand-100)"/>
        <text x="256" y="107" class="dlab-s" fill="var(--brand-700)">PUBLISH netix/gw-04/meter-12/active_power &#8594; 41.8</text>
      </g>

      <g class="dstep" data-layer="4">
        <g fill="var(--dg-surface)" stroke="var(--dg-line)">
          <rect x="780" y="120" width="180" height="34" rx="6"/>
          <rect x="780" y="166" width="180" height="34" rx="6"/>
          <rect x="780" y="212" width="180" height="34" rx="6"/>
        </g>
        <text x="870" y="141" class="dlab-s" text-anchor="middle">Cloud bridge</text>
        <text x="870" y="187" class="dlab-s" text-anchor="middle">Local dashboard</text>
        <text x="870" y="233" class="dlab-s" text-anchor="middle">Alarm engine</text>
        <g stroke="var(--dg-d)" class="dwire">
          <path d="M598,190 L772,137" marker-end="url(#mq-p)"/>
          <path d="M598,202 L772,183" marker-end="url(#mq-p)"/>
          <path d="M598,214 L772,229" marker-end="url(#mq-p)"/>
        </g>
        <text x="608" y="292" class="dlab-s" fill="var(--dg-d)">netix/#</text>
        <text x="608" y="308" class="dlab-s" fill="var(--dg-d)">netix/gw-04/meter-12/+</text>
        <text x="608" y="324" class="dlab-s" fill="var(--dg-d)">netix/+/+/temperature</text>
        <text x="608" y="276" class="dlab-s" fill="var(--text-tertiary)">subscriptions</text>
      </g>

      <g class="dstep" data-layer="5">
        <text x="70" y="292" class="dlab-b">Delivery guarantees</text>
        <g stroke="var(--dg-line)" fill="var(--dg-surface)">
          <rect x="70" y="302" width="170" height="32" rx="6"/>
          <rect x="70" y="340" width="170" height="32" rx="6"/>
          <rect x="70" y="378" width="170" height="32" rx="6"/>
        </g>
        <text x="86" y="322" class="dlab-s"><tspan fill="var(--status-ok)">QoS 0</tspan>  at most once</text>
        <text x="86" y="360" class="dlab-s"><tspan fill="var(--status-warning)">QoS 1</tspan>  at least once</text>
        <text x="86" y="398" class="dlab-s"><tspan fill="var(--dg-d)">QoS 2</tspan>  exactly once</text>
        <text x="252" y="322" class="dlab-s" fill="var(--text-tertiary)">fire and forget &#183; 1 packet</text>
        <text x="252" y="360" class="dlab-s" fill="var(--text-tertiary)">retries until acked &#183; may duplicate</text>
        <text x="252" y="398" class="dlab-s" fill="var(--text-tertiary)">four-part exchange &#183; costliest</text>
      </g>

      <g class="dstep" data-layer="6">
        <line x1="600" y1="340" x2="600" y2="428" stroke="var(--dg-line-soft)"/>
        <text x="628" y="350" class="dlab-b">Header overhead</text>
        <text x="628" y="376" class="dlab-s">HTTP</text>
        <rect x="700" y="364" width="248" height="16" rx="3" fill="#8096a3"/>
        <text x="628" y="400" class="dlab-s">MQTT</text>
        <rect x="700" y="388" width="10" height="16" rx="2" fill="#196796"/>
        <text x="722" y="401" class="dlab-s" fill="var(--brand-600)">2-byte fixed header</text>
        <text x="628" y="424" class="dlab-s" fill="var(--text-tertiary)">1,000 points &#215; every 10 s on a metered link = the bill</text>
      </g>
      <defs>
        <marker id="mq-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0072b2"/></marker>
        <marker id="mq-p" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#a8437f"/></marker>
      </defs>`),
  },
  how: [
    { h: 'Decoupling in three dimensions at once', p: 'Publisher and subscriber are separated in space (neither knows the other’s address), in time (a subscriber can be offline when a message is published and still receive it, with retained messages or a persistent session) and in synchronisation (publishing does not block). Every one of those matters when the far end is a device on a flaky link.' },
    { h: 'Built for the worst link you have, not the best', p: 'Session state survives disconnection, the last-will message tells subscribers when a device dropped without saying goodbye, and the keepalive is tuned in seconds rather than assumed. These are not optimisations — they are what let the protocol work at all over satellite, and they are why it works so well over cellular.' },
    { h: 'The topic tree is your data model', p: 'Because subscribers select by pattern, the shape of your topic hierarchy determines what is cheap to consume later. A tree organised by physical location makes site queries trivial and cross-site ones awkward; one organised by measurement type does the reverse. This is a design decision that is expensive to change once devices are deployed.' },
  ],
  netix: {
    lead: 'MQTT is the spine of the NETIX edge-to-cloud path. Every protocol driver publishes to local Mosquitto under the netix/ topic tree, and that local broker is bridged upward to the cloud, ultimately landing in data-service.',
    points: [
      'Publishing locally first is deliberate: a gateway that loses its uplink keeps collecting and keeps serving its local dashboard, and the bridge drains the backlog when connectivity returns.',
      'The topic tree is the contract between drivers and everything above them. A new protocol adapter becomes useful to the whole platform simply by publishing into it — no service above the broker needs to know the adapter exists.',
      'Choose QoS per data class, not globally: sampled telemetry is fine at QoS 0 or 1, while a control-tag write that must not be duplicated needs QoS 2 or an idempotency key of its own.',
    ],
  },
  gotchas: [
    { t: 'QoS 2 is not free correctness', p: 'Four packets per message and broker state per in-flight message. On a large fleet it is a capacity decision.' },
    { t: 'Wildcard subscriptions can be enormous', p: 'A subscriber on netix/# receives everything, including whatever a new driver starts publishing tomorrow.' },
    { t: 'Retained messages go stale silently', p: 'A retained value from an offline device still delivers to new subscribers and looks live. Pair it with a last-will.' },
    { t: 'Topics are not access control', p: 'Structure does not restrict anything by itself. Broker ACLs have to be configured to match the tree.' },
  ],
},

/* ============================== WebSocket ============================== */
{
  slug: 'WebSocket', h: 2240,
  expand: 'WebSocket — standardised in December 2011 in RFC 6455. It starts as an ordinary HTTP request, then asks the server to upgrade the connection into a persistent, full-duplex channel.',
  oneLine: 'HTTP was never designed for applications that need data pushed the instant it changes. The old workaround was polling — your browser asking the server every second whether anything happened. Wasteful, slow, and unnecessary.',
  facts: [
    ['Layer', 'Application, over TCP'],
    ['Opens as', 'HTTP GET + Upgrade'],
    ['Confirms with', '101 Switching Protocols'],
    ['Direction', 'Full duplex'],
    ['Framing', 'Binary or text frames'],
  ],
  diagram: {
    title: 'From polling to a channel that stays open',
    sub: 'The upgrade handshake is ordinary HTTP, which is exactly why WebSocket traverses the proxies and firewalls that a new port never would.',
    steps: [
      { label: 'Polling', caption: 'The workaround WebSocket replaced: ask every second whether anything changed. Almost every answer is "no", so you pay a full request and response — headers, and a TCP round trip — for nothing, and you are still up to a second behind.' },
      { label: 'Upgrade request', caption: 'A WebSocket connection opens as a normal HTTP GET carrying an Upgrade header and a random key. Because it is ordinary HTTP on port 443, it passes through corporate proxies and firewalls that would drop traffic on any new port.' },
      { label: '101 Switching', caption: 'The server answers with status 101, Switching Protocols, and a hash of the client’s key proving it understood the request rather than blindly echoing. From this response onward, the bytes on this connection are no longer HTTP.' },
      { label: 'Full duplex', caption: 'The connection is now a persistent channel where both sides may send at any time without waiting for the other. No request has to precede a response, and no response has to follow a request — the request/response pairing is simply gone.' },
      { label: 'Server pushes', caption: 'The instant something changes, the server sends. No polling, no delay, no wasted requests. This is what makes live chat, trading platforms, multiplayer browser games and collaborative tools like a shared document possible in a browser at all.' },
    ],
    svg: SVG(410, `
      <g class="dstep" data-hl="1">
        <text x="70" y="28" class="dlab-b" fill="var(--status-critical)">Polling &#183; the workaround</text>
        <path d="M130,44 V150 M700,44 V150" stroke="var(--dg-line)" stroke-dasharray="4 4"/>
        <g stroke="var(--text-tertiary)" class="dwire">
          <path d="M130,62 H692" marker-end="url(#ws-s)"/><path d="M700,80 H138" marker-end="url(#ws-s)"/>
          <path d="M130,102 H692" marker-end="url(#ws-s)"/><path d="M700,120 H138" marker-end="url(#ws-s)"/>
        </g>
        <text x="720" y="66" class="dlab-s" fill="var(--text-tertiary)">anything new?</text>
        <text x="720" y="84" class="dlab-s" fill="var(--text-tertiary)">no</text>
        <text x="720" y="106" class="dlab-s" fill="var(--text-tertiary)">anything new?</text>
        <text x="720" y="124" class="dlab-s" fill="var(--text-tertiary)">no</text>
        <rect x="70" y="162" width="620" height="26" rx="6" fill="var(--status-critical-tint)"/>
        <text x="86" y="180" class="dlab-s" fill="var(--status-critical)">full headers each time &#183; a round trip per question &#183; still up to a second stale</text>
      </g>

      <g class="dstep" data-layer="2">
        <line x1="70" y1="208" x2="960" y2="208" stroke="var(--dg-line-soft)"/>
        <text x="130" y="234" class="dlab-b" text-anchor="middle">Browser</text>
        <text x="700" y="234" class="dlab-b" text-anchor="middle">Server</text>
        <path d="M130,246 V396 M700,246 V396" stroke="var(--dg-line)" stroke-dasharray="4 4"/>
        <path d="M130,272 H692" class="dwire" stroke="var(--dg-a)" marker-end="url(#ws-b)"/>
        <text x="406" y="264" class="dlab-s" text-anchor="middle" fill="var(--dg-a)">GET /live  Upgrade: websocket &#183; Sec-WebSocket-Key</text>
        <rect x="748" y="252" width="212" height="44" rx="7" fill="var(--brand-100)"/>
        <text x="764" y="272" class="dlab-s" fill="var(--brand-700)">ordinary HTTP on 443</text>
        <text x="764" y="288" class="dlab-s" fill="var(--brand-700)">&#8594; proxies let it through</text>
      </g>

      <g class="dstep" data-layer="3">
        <path d="M700,308 H138" class="dwire" stroke="var(--status-ok)" marker-end="url(#ws-k)"/>
        <text x="414" y="300" class="dlab-s" text-anchor="middle" fill="var(--status-ok)">101 Switching Protocols &#183; Sec-WebSocket-Accept</text>
      </g>

      <g class="dstep" data-layer="4">
        <rect x="130" y="324" width="570" height="14" rx="7" fill="#196796"/>
        <text x="415" y="335" class="dlab-s" text-anchor="middle" fill="#ffffff">persistent full-duplex channel</text>
        <text x="748" y="336" class="dlab-s" fill="var(--brand-600)">no longer HTTP on this socket</text>
      </g>

      <g class="dstep" data-layer="5">
        <path d="M130,360 H400" class="dwire" stroke="var(--dg-a)" marker-end="url(#ws-b)"/>
        <path d="M700,360 H430" class="dwire" stroke="var(--dg-d)" marker-end="url(#ws-p)"/>
        <path d="M700,384 H138" class="dwire" stroke="var(--dg-d)" marker-end="url(#ws-p)"/>
        <text x="748" y="364" class="dlab-s" fill="var(--dg-d)">either side, any time</text>
        <text x="748" y="388" class="dlab-s" fill="var(--dg-d)">pushed the instant it changes</text>
      </g>
      <defs>
        <marker id="ws-s" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8096a3"/></marker>
        <marker id="ws-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0072b2"/></marker>
        <marker id="ws-k" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#16a34a"/></marker>
        <marker id="ws-p" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#a8437f"/></marker>
      </defs>`),
  },
  how: [
    { h: 'It borrows HTTP’s entry, then leaves', p: 'Starting as an HTTP request is a deployment decision rather than a technical necessity. It means WebSocket inherits port 443, TLS, cookies, authentication headers and every proxy that already passes web traffic — which is why it succeeded where earlier push mechanisms that wanted their own port did not.' },
    { h: 'The request/response pairing disappears', p: 'Once upgraded, there is no correlation between what each side sends. The server pushes an update because something changed, not because it was asked. Applications therefore need their own message framing and correlation if they want request/response semantics back.' },
    { h: 'A persistent connection is state you now own', p: 'HTTP’s statelessness let any request go to any server. A WebSocket pins a client to one server process for the life of the connection, so scaling out means sticky routing, a shared pub/sub backplane, and a reconnection strategy for when a pod is replaced.' },
  ],
  netix: {
    lead: 'WebSocket is how live data reaches a NETIX operator’s screen. Everything below the browser is MQTT or HTTP; the last hop to a dashboard that must update the instant a value changes is a socket.',
    points: [
      'Live dashboards and real-time views subscribe over a socket rather than polling an API, which is what makes a floor-plan view update as points change instead of on a timer.',
      'It has the same shape as MQTT one layer up: subscribe to what you care about, receive on change. If MQTT carries the value from the field to the cloud, WebSocket carries it the last hop to the screen.',
      'A dashboard that is slow to load and a dashboard that is slow to update are different faults — the first is an HTTP path, the second is the socket. Establish which before investigating.',
    ],
  },
  gotchas: [
    { t: 'Idle connections get reaped', p: 'Proxies and load balancers close quiet sockets, often at 60 seconds. Send application-level pings.' },
    { t: 'Reconnection needs backoff and resync', p: 'A reconnecting client has missed messages. Without a resync it shows stale data and looks live.' },
    { t: 'Sticky sessions become a requirement', p: 'The connection is pinned to one process. Horizontal scaling needs a backplane, not just more replicas.' },
    { t: 'Authentication happens once, at upgrade', p: 'A token that expires mid-connection is not re-checked unless you do it yourself.' },
  ],
},
];
