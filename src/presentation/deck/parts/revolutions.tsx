/* Six small animated illustrations, viewBox 200×130. Loops live in deck.css (rev-*). */

const INK = '#f4f0e8'
const CRIMSON = '#e3122c'
const CYAN = '#5ad1ff'

export function TransistorArt() {
  return (
    <svg viewBox="0 0 200 130">
      <ellipse cx={100} cy={124} rx={46} ry={4} fill="rgba(0,0,0,0.4)" />
      {[82, 100, 118].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 80 V100 L${x + (i - 1) * 10} 112 V124`} stroke="#b9bcc4" strokeWidth={3} fill="none" />
          <circle className="rev-electron" style={{ animationDelay: `${i * 0.35}s` }} cx={x} cy={84} r={2.6} fill={CYAN} />
        </g>
      ))}
      <path d="M70 80 V40 A30 30 0 0 1 130 40 V80 Z" fill="#2a2a33" />
      <path d="M100 10 A30 30 0 0 1 130 40 V80 H112 V40 A28 28 0 0 0 100 10 Z" fill="#1b1b22" />
      <text x={86} y={58} fontSize={11} fontFamily="var(--font-mono)" fill="#8b8893">
        NPN
      </text>
      <circle cx={100} cy={40} r={44} fill="none" stroke={CYAN} strokeWidth={1} opacity={0.3} className="rev-ping" />
    </svg>
  )
}

const globeNodes: [number, number][] = [
  [68, 46],
  [118, 34],
  [136, 74],
  [92, 92],
  [80, 66],
]

export function InternetArt() {
  return (
    <svg viewBox="0 0 200 130">
      <circle cx={100} cy={65} r={52} fill="#14141b" stroke="#3a3a46" strokeWidth={1.5} />
      {[18, 36].map((rx) => (
        <ellipse key={rx} cx={100} cy={65} rx={rx} ry={52} fill="none" stroke="#3a3a46" />
      ))}
      <path d="M48 65 H152 M56 40 H144 M56 90 H144" stroke="#3a3a46" />
      <g className="rev-spin">
        {globeNodes.map(([x1, y1], i) => {
          const [x2, y2] = globeNodes[(i + 2) % globeNodes.length]
          return (
            <path
              key={i}
              className="rev-dash"
              d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 24} ${x2} ${y2}`}
              stroke={CYAN}
              strokeWidth={1.4}
              fill="none"
              strokeDasharray="4 4"
            />
          )
        })}
      </g>
      {globeNodes.map(([x, y], i) => (
        <circle key={i} className="rev-blink" style={{ animationDelay: `${i * 0.3}s` }} cx={x} cy={y} r={3.6} fill={CRIMSON} />
      ))}
    </svg>
  )
}

export function PcArt() {
  return (
    <svg viewBox="0 0 200 130">
      <ellipse cx={100} cy={124} rx={66} ry={4} fill="rgba(0,0,0,0.4)" />
      <rect x={52} y={10} width={96} height={78} rx={6} fill="#d8cfb8" />
      <rect x={140} y={10} width={8} height={78} fill="#b5ab92" />
      <rect x={60} y={18} width={78} height={56} rx={3} fill="#0b1a0f" />
      <text x={66} y={34} fontSize={9} fontFamily="var(--font-mono)" fill="#4ce07a">
        C:\&gt; RUN
      </text>
      <text x={66} y={47} fontSize={9} fontFamily="var(--font-mono)" fill="#4ce07a">
        READY.
      </text>
      <rect className="rev-cursor" x={66} y={53} width={6} height={9} fill="#4ce07a" />
      <rect x={88} y={88} width={24} height={8} fill="#b5ab92" />
      <path d="M40 104 H160 L168 120 H32 Z" fill="#d8cfb8" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={44 + i * 9.6} y={108} width={7} height={4} rx={1} fill="#b5ab92" />
      ))}
    </svg>
  )
}

export function WebArt() {
  return (
    <svg viewBox="0 0 200 130">
      <rect x={26} y={12} width={148} height={106} rx={8} fill="#1d1d25" stroke="#3a3a46" />
      <path d="M26 30 H174" stroke="#3a3a46" />
      {[38, 48, 58].map((x, i) => (
        <circle key={x} cx={x} cy={21} r={3} fill={[CRIMSON, '#ffd23f', '#2ee59d'][i]} />
      ))}
      <rect x={70} y={16} width={96} height={10} rx={5} fill="#0f0f14" />
      <text x={76} y={24} fontSize={8} fontFamily="var(--font-mono)" fill={INK} className="rev-type">
        http://www
      </text>
      <rect className="rev-load" style={{ animationDelay: '0s' }} x={38} y={40} width={90} height={10} rx={2} fill="#3a3a46" />
      <rect className="rev-load" style={{ animationDelay: '0.2s' }} x={38} y={58} width={124} height={6} rx={2} fill="#2a2a33" />
      <rect className="rev-load" style={{ animationDelay: '0.4s' }} x={38} y={70} width={110} height={6} rx={2} fill="#2a2a33" />
      <text className="rev-load" style={{ animationDelay: '0.6s' }} x={38} y={94} fontSize={10} fill={CYAN} textDecoration="underline">
        hyperlink
      </text>
      <path className="rev-click" d="M118 88 l0 14 l4 -4 l3 6 l3 -1.4 l-3 -6 l5 0 z" fill={INK} />
    </svg>
  )
}

const APP_COLORS = [CRIMSON, CYAN, '#ffd23f', '#2ee59d', '#a970ff', '#ff8a3d', INK, CRIMSON, CYAN, '#2ee59d', '#ffd23f', '#a970ff']

export function SmartphoneArt() {
  return (
    <svg viewBox="0 0 200 130">
      <rect x={70} y={4} width={60} height={122} rx={10} fill="#2a2a33" />
      <rect x={74} y={12} width={52} height={106} rx={5} fill="#0f0f14" />
      <rect x={92} y={7} width={16} height={2.5} rx={1.2} fill="#0f0f14" />
      {APP_COLORS.map((c, i) => (
        <rect
          key={i}
          className="rev-pop"
          style={{ animationDelay: `${i * 0.12}s` }}
          x={79 + (i % 3) * 15.5}
          y={22 + Math.floor(i / 3) * 16}
          width={11}
          height={11}
          rx={3}
          fill={c}
        />
      ))}
      <g className="rev-notif">
        <rect x={136} y={22} width={50} height={20} rx={6} fill={INK} />
        <circle cx={145} cy={32} r={4} fill={CRIMSON} />
        <rect x={152} y={27} width={28} height={3} rx={1.5} fill="#8b8893" />
        <rect x={152} y={34} width={18} height={3} rx={1.5} fill="#c9c2b4" />
      </g>
    </svg>
  )
}

const LAYERS = [
  [30, 65, 100],
  [22, 51, 79, 108],
  [45, 85],
]

export function AiArt() {
  const xs = [52, 100, 148]
  const edges: string[] = []
  LAYERS.forEach((layer, li) => {
    const next = LAYERS[li + 1]
    if (!next) return
    layer.forEach((y1) => next.forEach((y2) => edges.push(`M${xs[li]} ${y1} L${xs[li + 1]} ${y2}`)))
  })
  return (
    <svg viewBox="0 0 200 130">
      {edges.map((d, i) => (
        <path key={i} d={d} stroke="#3a3a46" strokeWidth={1} />
      ))}
      {edges.map((d, i) => (
        <path
          key={`s${i}`}
          className="rev-signal"
          style={{ animationDelay: `${(i % 7) * 0.25}s` }}
          d={d}
          stroke={CRIMSON}
          strokeWidth={2}
          strokeDasharray="6 120"
          fill="none"
        />
      ))}
      {LAYERS.map((layer, li) =>
        layer.map((y) => <circle key={`${li}-${y}`} cx={xs[li]} cy={y} r={7} fill="#1d1d25" stroke={li === 2 ? CRIMSON : CYAN} strokeWidth={2} />),
      )}
      <path className="rev-blink" d="M172 22 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#ffd23f" />
    </svg>
  )
}
