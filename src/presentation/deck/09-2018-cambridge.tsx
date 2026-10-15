import { useEffect } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { ease } from '../palette'
import { IconBrain, IconMegaphone } from './parts/icons'

// Social graph on a jittered grid (deterministic).
const COLS = 7
const ROWS = 5
const NODES = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS
  const r = Math.floor(i / COLS)
  const jx = Math.sin(i * 12.9898) * 38
  const jy = Math.cos(i * 78.233) * 34
  return { i, c, r, x: 940 + c * 140 + jx, y: 210 + r * 165 + jy }
})
const SEED = 3 + 2 * COLS // middle of the grid
const seed = NODES[SEED]
const hops = (n: (typeof NODES)[number]) => Math.abs(n.c - seed.c) + Math.abs(n.r - seed.r)

const EDGES: [number, number][] = []
NODES.forEach((n) => {
  if (n.c < COLS - 1) EDGES.push([n.i, n.i + 1])
  if (n.r < ROWS - 1) EDGES.push([n.i, n.i + COLS])
  if (n.c < COLS - 1 && n.r < ROWS - 1 && (n.i * 7) % 3 === 0) EDGES.push([n.i, n.i + COLS + 1])
})

// Harvested data ends here.
const DB = { x: 560, y: 790 }

const TARGETS = [2, 8, 12, 16, 22, 26, 30, 33]

const number = new Intl.NumberFormat('en-US')

function Counter({ to }: { to: number }) {
  const v = useMotionValue(0)
  const text = useTransform(v, (n) => number.format(Math.round(n)))
  useEffect(() => {
    const c = animate(v, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [v, to])
  return <motion.span>{text}</motion.span>
}

const CAPTIONS = [
  'A personality quiz on Facebook…',
  '…collected data from users and all their friends,',
  'up to 87 million profiles, without their consent…',
  '…and used it for targeted political ads.',
]

function Cambridge() {
  const quiz = useAfter(1800)
  const spread = useAfter(2400)
  const harvest = useAfter(4800)
  const counter = useAfter(5600)
  const ads = useAfter(7600)
  const caption = ads ? 3 : counter ? 2 : spread ? 1 : 0

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <div className="k-grid" aria-hidden="true" />

      <div className="ca-head">
        <motion.h2
          className="ca-year"
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease }}
        >
          2018
        </motion.h2>
        <motion.p className="ca-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          The Cambridge Analytica scandal
        </motion.p>
      </div>

      <svg className="ca-stage" viewBox="0 0 1920 1080">
        <text x={1360} y={110} textAnchor="middle" className="ca-label">
          FACEBOOK USERS
        </text>

        {EDGES.map(([a, b], k) => {
          const A = NODES[a]
          const B = NODES[b]
          const hot = spread && hops(A) <= 6 && hops(B) <= 6
          return (
            <motion.line
              key={k}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1, stroke: hot ? 'rgba(255,45,85,0.55)' : 'rgba(242,239,233,0.14)' }}
              transition={{
                pathLength: { delay: 0.4 + k * 0.01, duration: 0.5 },
                opacity: { delay: 0.4 + k * 0.01 },
                stroke: { delay: Math.max(hops(A), hops(B)) * 0.32, duration: 0.4 },
              }}
              strokeWidth={2}
            />
          )
        })}

        {/* data flowing to the harvester */}
        {harvest &&
          NODES.map((n) => (
            <motion.circle
              key={`p${n.i}`}
              r={5}
              fill="#ff2d55"
              initial={{ cx: n.x, cy: n.y, opacity: 0 }}
              animate={{ cx: DB.x, cy: DB.y, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.4, delay: (n.i % 9) * 0.18, repeat: Infinity, repeatDelay: 0.8, ease: 'easeIn' }}
            />
          ))}

        {NODES.map((n) => (
          <motion.g
            key={n.i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + n.i * 0.025, type: 'spring', stiffness: 260, damping: 16 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.i === SEED ? 26 : 20}
              initial={{ fill: '#1d1d25' }}
              animate={{ fill: spread || (quiz && n.i === SEED) ? '#c8102e' : '#1d1d25' }}
              transition={{ delay: spread ? hops(n) * 0.32 : 0, duration: 0.4 }}
              stroke="rgba(242,239,233,0.4)"
              strokeWidth={2}
            />
            <circle cx={n.x} cy={n.y - 5} r={6} fill="#f4f0e8" />
            <path d={`M${n.x - 10} ${n.y + 12} a10 8 0 0 1 20 0`} fill="#f4f0e8" />
          </motion.g>
        ))}

        {/* targeted ads */}
        {ads &&
          TARGETS.map((t, k) => {
            const n = NODES[t]
            return (
              <motion.g
                key={`ad${t}`}
                initial={{ x: DB.x - 40, y: DB.y - 26, scale: 0.3, opacity: 0 }}
                animate={{ x: n.x + 14, y: n.y - 64, scale: 1, opacity: 1 }}
                transition={{ delay: k * 0.18, duration: 0.9, ease }}
              >
                <rect width={84} height={50} rx={7} fill="#f4f0e8" />
                <rect width={84} height={16} rx={7} fill="#c8102e" />
                <rect y={9} width={84} height={7} fill="#c8102e" />
                <text x={42} y={12} textAnchor="middle" fontSize={11} fontWeight={800} fill="#fff" fontFamily="var(--font-sans)">
                  VOTE!
                </text>
                <rect x={10} y={24} width={64} height={6} rx={3} fill="#8b8893" />
                <rect x={10} y={35} width={44} height={6} rx={3} fill="#c9c2b4" />
              </motion.g>
            )
          })}
      </svg>

      {/* the quiz app */}
      <AnimatePresence>
        {quiz && (
          <motion.div
            className="ca-quiz"
            style={{ left: seed.x + 40, top: seed.y - 120 }}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <IconBrain />
            <span>
              <b>This Is Your Digital Life</b>
              Personality quiz app
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the harvester */}
      <motion.div
        className="ca-db"
        style={{ left: DB.x, top: DB.y }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={harvest ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.5, ease }}
      >
        <svg viewBox="0 0 80 90" className="ca-db__icon">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path d={`M6 ${20 + i * 24} v18 a34 10 0 0 0 68 0 v-18`} fill={i === 1 ? '#a50d20' : '#c8102e'} />
              <ellipse cx={40} cy={20 + i * 24} rx={34} ry={10} fill="#ff2d55" />
            </g>
          ))}
        </svg>
        <b>Cambridge Analytica</b>
        <AnimatePresence>
          {counter && (
            <motion.span className="ca-db__count" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Counter to={87_000_000} />
              <small>profiles</small>
            </motion.span>
          )}
        </AnimatePresence>
        {ads && (
          <motion.span className="ca-db__ads" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <IconMegaphone /> political ads
          </motion.span>
        )}
      </motion.div>

      <div className="ca-caption">
        <AnimatePresence mode="wait">
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
          >
            {CAPTIONS[caption]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default defineScene({
  id: '2018-cambridge',
  title: '2018 · Cambridge Analytica (auto)',
  component: Cambridge,
  transition: 'fade',
  notes:
    '2018 is a special year for data privacy. It was the year of the Cambridge Analytica scandal, when data from millions of Facebook users was collected without their consent and used for political ads.',
})
