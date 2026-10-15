import type { ComponentType, SVGProps } from 'react'
import { motion, type Variants } from 'motion/react'
import { defineScene } from '../../engine'
import { ease } from '../palette'
import {
  IconBrain,
  IconBuilding,
  IconChat,
  IconChild,
  IconCopyright,
  IconGlobeShield,
  IconLock,
  IconShield,
} from './parts/icons'

interface Area {
  id: string
  title: string
  text: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Card centre on the canvas. */
  x: number
  y: number
}

const CENTER = { x: 960, y: 540 }
const CARD_W = 410
const CARD_H = 128

const DATA_PRIVACY_POS = { x: 1520, y: 280 }

const AREAS: Area[] = [
  { id: 'ip', title: 'Intellectual property', text: 'Who owns code, content and inventions.', icon: IconCopyright, x: 1010, y: 112 },
  { id: 'privacy', title: 'Data privacy', text: 'How companies collect, use and sell personal data.', icon: IconLock, ...DATA_PRIVACY_POS },
  { id: 'security', title: 'National security & trade', text: 'Foreign tech and strategic technology.', icon: IconGlobeShield, x: 1570, y: 590 },
  { id: 'ai', title: 'Artificial intelligence', text: 'Rules for building and using AI, especially "high-risk" uses like hiring or credit.', icon: IconBrain, x: 1440, y: 905 },
  { id: 'cyber', title: 'Cybersecurity', text: 'Protecting systems and reporting attacks and data breaches.', icon: IconShield, x: 800, y: 960 },
  { id: 'antitrust', title: 'Competition (antitrust)', text: 'Stopping big tech companies from abusing their power.', icon: IconBuilding, x: 350, y: 800 },
  { id: 'liability', title: 'Platform liability', text: 'Who is responsible for what users post.', icon: IconChat, x: 330, y: 500 },
  { id: 'children', title: "Children's online safety", text: 'Extra protection for minors: their data, age checks, harmful content.', icon: IconChild, x: 470, y: 190 },
]

const CORE_R = 150

/**
 * Octilinear "PCB" trace: leaves the core's edge towards the card, bends once
 * at 45°, runs straight, then enters the card edge that faces the centre.
 */
function trace(a: Area) {
  const dx = a.x - CENTER.x
  const dy = a.y - CENTER.y
  const side = Math.abs(dx) / CARD_W > Math.abs(dy) / CARD_H
  const end: [number, number] = side ? [a.x - (Math.sign(dx) * CARD_W) / 2, a.y] : [a.x, a.y - (Math.sign(dy) * CARD_H) / 2]
  const APPROACH = 46
  const q: [number, number] = side ? [end[0] - Math.sign(dx) * APPROACH, end[1]] : [end[0], end[1] - Math.sign(dy) * APPROACH]
  const len = Math.hypot(q[0] - CENTER.x, q[1] - CENTER.y)
  const start: [number, number] = [CENTER.x + ((q[0] - CENTER.x) / len) * CORE_R, CENTER.y + ((q[1] - CENTER.y) / len) * CORE_R]
  const rx = q[0] - start[0]
  const ry = q[1] - start[1]
  const diag = Math.min(Math.abs(rx), Math.abs(ry))
  const bend: [number, number] = [start[0] + Math.sign(rx) * diag, start[1] + Math.sign(ry) * diag]
  return { d: `M${start[0]} ${start[1]} L${bend[0]} ${bend[1]} L${q[0]} ${q[1]} L${end[0]} ${end[1]}`, end }
}

const TRACES = AREAS.map(trace)

// Leaving forward: zoom into the Data privacy node.
const zoomIntoPrivacy: Variants = {
  enter: { opacity: 0, originX: DATA_PRIVACY_POS.x / 1920, originY: DATA_PRIVACY_POS.y / 1080 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: (dir: number) =>
    dir > 0
      ? { scale: 4, opacity: 0, filter: 'blur(6px)', transition: { duration: 1, ease: [0.55, 0, 0.9, 0.35] } }
      : { opacity: 0, transition: { duration: 0.35 } },
}

function Areas() {
  return (
    <div className="s-root" style={{ padding: 0 }}>
      <div className="k-grid" aria-hidden="true" />

      <svg className="mm-traces" viewBox="0 0 1920 1080">
        {TRACES.map(({ d, end }, i) => (
          <g key={AREAS[i].id}>
            <path d={d} stroke="rgba(242,239,233,0.08)" strokeWidth={10} fill="none" strokeLinejoin="round" />
            <motion.path
              d={d}
              stroke="#d4002a"
              strokeWidth={3}
              fill="none"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={end[0]}
              cy={end[1]}
              r={7}
              fill="#0a0a0d"
              stroke="#ff2d55"
              strokeWidth={3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 + i * 0.12 }}
            />
            <circle r={5} fill="#ffd9e0" filter="url(#mm-glow)">
              <animateMotion dur="2.2s" begin={`${1.4 + i * 0.27}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
        <defs>
          <filter id="mm-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <motion.div
        className="mm-core"
        style={{ left: CENTER.x, top: CENTER.y }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.1 }}
      >
        <span className="mm-core__ring" />
        <span className="mm-core__ring mm-core__ring--b" />
        <span className="mm-core__label">
          Main areas of
          <br />
          <b>tech regulation</b>
        </span>
      </motion.div>

      {AREAS.map((a, i) => (
        <motion.div
          key={a.id}
          className="mm-card"
          data-area={a.id}
          style={{ left: a.x - CARD_W / 2, top: a.y - CARD_H / 2, width: CARD_W, height: CARD_H }}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.05 + i * 0.12, duration: 0.5, ease }}
        >
          <span className="mm-card__icon">
            <a.icon />
          </span>
          <span className="mm-card__text">
            <b>{a.title}</b>
            <span>{a.text}</span>
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default defineScene({
  id: 'areas',
  title: 'Main areas of tech regulation',
  component: Areas,
  transition: zoomIntoPrivacy,
  notes: 'Eight big areas. Today we focus on one of them: data privacy (→ zooms into it).',
})
