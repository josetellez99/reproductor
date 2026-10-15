import { motion, type Variants } from 'motion/react'
import { defineScene, useScene } from '../../engine'
import { ease } from '../palette'
import { DataCenter } from './parts/DataCenter'
import { IconLock } from './parts/icons'
import { Steve } from './parts/Steve'

type Pt = { x: number; y: number }

// Steve: 16 px per "pixel unit", feet on y≈1010.
const STEVE = { x: 832, y: 498, s: 16 }
const at = (u: number, v: number): Pt => ({ x: STEVE.x + u * STEVE.s, y: STEVE.y + v * STEVE.s })

const ORIGINS = {
  head: at(8, 2.5),
  eyes: at(5.5, 4.5),
  heart: at(6, 11),
  phone: at(11.2, 12.5),
  hand: at(2, 19),
  pocket: at(6.5, 23),
  feet: at(9, 31),
}

// Data center ports (where cables plug in) and the loose cable ends near Steve.
const LEFT_PORTS: Pt[] = [
  { x: 355, y: 770 },
  { x: 355, y: 848 },
  { x: 355, y: 926 },
]
const RIGHT_PORTS: Pt[] = LEFT_PORTS.map((p) => ({ x: 1920 - p.x, y: p.y }))
const LEFT_TIPS: Pt[] = [
  { x: 640, y: 560 },
  { x: 600, y: 715 },
  { x: 650, y: 870 },
]
const RIGHT_TIPS: Pt[] = [
  { x: 1290, y: 560 },
  { x: 1330, y: 715 },
  { x: 1280, y: 870 },
]

function cable(port: Pt, tip: Pt, side: 1 | -1) {
  return { c1: { x: port.x + side * 170, y: port.y }, c2: { x: tip.x - side * 130, y: tip.y + 50 } }
}

const CABLES = [
  ...LEFT_PORTS.map((p, i) => ({ port: p, tip: LEFT_TIPS[i], side: 1 as const })),
  ...RIGHT_PORTS.map((p, i) => ({ port: p, tip: RIGHT_TIPS[i], side: -1 as const })),
].map((c) => ({ ...c, ...cable(c.port, c.tip, c.side) }))

const cablePath = (c: (typeof CABLES)[number]) =>
  `M${c.port.x} ${c.port.y} C${c.c1.x} ${c.c1.y} ${c.c2.x} ${c.c2.y} ${c.tip.x} ${c.tip.y}`

/** From a point on Steve, arc to the loose end, then ride the cable into the data center. */
function particlePath(from: Pt, c: (typeof CABLES)[number]) {
  const qx = (from.x + c.tip.x) / 2
  const qy = Math.min(from.y, c.tip.y) - 70
  return `M${from.x} ${from.y} Q${qx} ${qy} ${c.tip.x} ${c.tip.y} C${c.c2.x} ${c.c2.y} ${c.c1.x} ${c.c1.y} ${c.port.x} ${c.port.y}`
}

type Kind = 'like' | 'heart' | 'dollar' | 'pin' | 'at' | 'camera' | 'cart' | 'chat' | 'finger' | 'pulse'

const KIND_COLOR: Record<Kind, string> = {
  like: '#3b82f6',
  heart: '#e3122c',
  dollar: '#22b573',
  pin: '#ff8a3d',
  at: '#a970ff',
  camera: '#e0b52f',
  cart: '#0ea5c6',
  chat: '#6b7280',
  finger: '#14b8a6',
  pulse: '#ff2d55',
}

const PARTICLES: { kind: Kind; from: keyof typeof ORIGINS; cable: number }[] = [
  { kind: 'like', from: 'phone', cable: 3 },
  { kind: 'heart', from: 'heart', cable: 1 },
  { kind: 'dollar', from: 'pocket', cable: 2 },
  { kind: 'pin', from: 'feet', cable: 5 },
  { kind: 'at', from: 'head', cable: 0 },
  { kind: 'camera', from: 'eyes', cable: 0 },
  { kind: 'cart', from: 'phone', cable: 4 },
  { kind: 'chat', from: 'phone', cable: 3 },
  { kind: 'finger', from: 'hand', cable: 2 },
  { kind: 'pulse', from: 'heart', cable: 4 },
  { kind: 'like', from: 'phone', cable: 4 },
  { kind: 'dollar', from: 'pocket', cable: 5 },
  { kind: 'heart', from: 'phone', cable: 3 },
  { kind: 'pin', from: 'phone', cable: 1 },
  { kind: 'chat', from: 'head', cable: 0 },
  { kind: 'cart', from: 'pocket', cable: 2 },
  { kind: 'camera', from: 'phone', cable: 3 },
  { kind: 'finger', from: 'hand', cable: 1 },
]

const DUR = 5.4

function Glyphs() {
  // 24×24 white glyphs, used through <use href="#dp-…">
  const s = { fill: 'none', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  return (
    <defs>
      <symbol id="dp-like" viewBox="0 0 24 24">
        <path {...s} d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 3 2l-1 4h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7" />
      </symbol>
      <symbol id="dp-heart" viewBox="0 0 24 24">
        <path fill="#fff" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
      </symbol>
      <symbol id="dp-dollar" viewBox="0 0 24 24">
        <path {...s} d="M15 8.5c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2s1.2 1.8 3 2.3 3 1 3 2.3-1.3 2.2-3 2.2c-1.3 0-2.5-.6-3.1-1.5M12 5v2M12 17v2" />
      </symbol>
      <symbol id="dp-pin" viewBox="0 0 24 24">
        <path {...s} d="M12 21s-6-6.2-6-11a6 6 0 0 1 12 0c0 4.8-6 11-6 11z" />
        <circle {...s} cx="12" cy="10" r="2.2" />
      </symbol>
      <symbol id="dp-at" viewBox="0 0 24 24">
        <circle {...s} cx="12" cy="12" r="3.5" />
        <path {...s} d="M15.5 9v4a2 2 0 0 0 4 0v-1a7.5 7.5 0 1 0-3 6" />
      </symbol>
      <symbol id="dp-camera" viewBox="0 0 24 24">
        <path {...s} d="M4 8h3l2-2h6l2 2h3v11H4z" />
        <circle {...s} cx="12" cy="13" r="3" />
      </symbol>
      <symbol id="dp-cart" viewBox="0 0 24 24">
        <path {...s} d="M3 4h2l2.5 11h10l2-8H6.2" />
        <circle fill="#fff" cx="9" cy="19" r="1.3" />
        <circle fill="#fff" cx="17" cy="19" r="1.3" />
      </symbol>
      <symbol id="dp-chat" viewBox="0 0 24 24">
        <path {...s} d="M4 5h16v11H9l-5 4z" />
      </symbol>
      <symbol id="dp-finger" viewBox="0 0 24 24">
        <path {...s} d="M8 20c1-2 1.5-4.5 1.5-7a2.5 2.5 0 0 1 5 0c0 3-.5 5.5-1.5 8M5.5 17c.6-1.4 1-3 1-4.5a5.5 5.5 0 0 1 11 0c0 1.2-.1 2.4-.3 3.5M12 13c0 3-.6 5.6-2 8" />
      </symbol>
      <symbol id="dp-pulse" viewBox="0 0 24 24">
        <path {...s} d="M3 12h4l2-4 3 9 2-5h7" />
      </symbol>
      <radialGradient id="steve-glow">
        <stop offset="0" stopColor="#7fd4ff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#7fd4ff" stopOpacity="0" />
      </radialGradient>
      {/* cables fade out as they reach Steve */}
      <linearGradient id="fade-l" gradientUnits="userSpaceOnUse" x1="380" x2="700" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" />
        <stop offset="0.55" stopColor="#fff" stopOpacity="0.6" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="fade-r" gradientUnits="userSpaceOnUse" x1="1540" x2="1220" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" />
        <stop offset="0.55" stopColor="#fff" stopOpacity="0.6" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <mask id="mask-l" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080">
        <rect x="0" y="0" width="1920" height="1080" fill="url(#fade-l)" />
      </mask>
      <mask id="mask-r" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080">
        <rect x="0" y="0" width="1920" height="1080" fill="url(#fade-r)" />
      </mask>
    </defs>
  )
}

const intro: Variants = {
  enter: { opacity: 0, scale: 0.7 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
}

function DataPrivacy() {
  const { mode } = useScene()
  const start = mode === 'thumb' ? 0 : 1.6

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <div className="k-grid" aria-hidden="true" />

      {/* the node we zoomed into dissolves into the canvas */}
      <motion.div
        className="mm-card dp-node"
        initial={{ opacity: 1, scale: 1.5 }}
        animate={{ opacity: 0, scale: 5, filter: 'blur(10px)' }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.55, 0, 0.9, 0.35] }}
      >
        <span className="mm-card__icon">
          <IconLock />
        </span>
        <span className="mm-card__text">
          <b>Data privacy</b>
          <span>How companies collect, use and sell personal data.</span>
        </span>
      </motion.div>

      <header className="dp-head">
        <motion.h2
          className="dp-title"
          initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(12px)' }}
          animate={{ opacity: 1, letterSpacing: '0.12em', filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.1, ease }}
        >
          DATA PRIVACY
        </motion.h2>
        <motion.p
          className="dp-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease }}
        >
          Our data is the core of the digital economy.
        </motion.p>
      </header>

      <motion.svg
        className="dp-stage"
        viewBox="0 0 1920 1080"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <Glyphs />

        <g transform="translate(100 1000)">
          <DataCenter />
        </g>
        <g transform="translate(1520 1000)">
          <DataCenter mirror />
        </g>
        <text className="dp-dc-label" x={260} y={1050} textAnchor="middle">
          DATA CENTER
        </text>
        <text className="dp-dc-label" x={1660} y={1050} textAnchor="middle">
          DATA CENTER
        </text>

        {/* cables: loose ends hang in the air and fade before reaching him */}
        {(['l', 'r'] as const).map((side) => (
          <g key={side} mask={`url(#mask-${side})`}>
            {CABLES.filter((c) => (c.side === 1) === (side === 'l')).map((c) => (
              <g key={`${c.port.y}`}>
                <path d={cablePath(c)} stroke="#2a2a33" strokeWidth={14} fill="none" strokeLinecap="round" />
                <path d={cablePath(c)} stroke="#3e3e4a" strokeWidth={8} fill="none" strokeLinecap="round" />
                <path className="dp-flow" d={cablePath(c)} stroke="#ff2d55" strokeWidth={2.4} fill="none" strokeDasharray="10 22" />
              </g>
            ))}
          </g>
        ))}

        <g transform={`translate(${STEVE.x} ${STEVE.y}) scale(${STEVE.s})`}>
          <Steve />
        </g>

        {/* data leaving him */}
        {PARTICLES.map((p, i) => (
          <g key={i} opacity={0}>
            <animateMotion dur={`${DUR}s`} begin={`${start + (i * DUR) / PARTICLES.length}s`} repeatCount="indefinite" path={particlePath(ORIGINS[p.from], CABLES[p.cable])} />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.08;0.85;1"
              dur={`${DUR}s`}
              begin={`${start + (i * DUR) / PARTICLES.length}s`}
              repeatCount="indefinite"
            />
            <circle r={22} fill={KIND_COLOR[p.kind]} stroke="rgba(255,255,255,0.85)" strokeWidth={2} />
            <use href={`#dp-${p.kind}`} x={-12} y={-12} width={24} height={24} />
          </g>
        ))}
      </motion.svg>
    </div>
  )
}

export default defineScene({
  id: 'data-privacy',
  title: 'Data privacy',
  component: DataPrivacy,
  transition: intro,
  notes:
    'Why this area? It is a very important area nowadays: our data is the core of the digital economy and we are not aware of that importance.',
})
