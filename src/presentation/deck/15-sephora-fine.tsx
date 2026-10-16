import { AnimatePresence, motion } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { ease } from '../palette'
import { Count } from './parts/Count'

// Escalating penalty: a jagged climb from bottom-left to centre-right.
const TREND = [
  [120, 1000],
  [300, 930],
  [430, 955],
  [580, 840],
  [700, 870],
  [850, 720],
  [960, 750],
  [1100, 560],
  [1180, 590],
  [1300, 400],
] as const
const LINE = TREND.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
const AREA = `${LINE} L1300 1080 L120 1080 Z`
const TIP = TREND[TREND.length - 1]

/** Generic state-seal emblem (not the real seal). */
function Seal() {
  return (
    <svg viewBox="0 0 200 200" className="sf-seal" aria-hidden="true">
      <defs>
        <path id="sf-seal-ring" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
      </defs>
      <circle cx={100} cy={100} r={96} fill="none" stroke="currentColor" strokeWidth={3} />
      <circle cx={100} cy={100} r={56} fill="none" stroke="currentColor" strokeWidth={2} opacity={0.6} />
      <text fontSize={15} letterSpacing={3} fill="currentColor" fontFamily="var(--font-mono)">
        <textPath href="#sf-seal-ring">CALIFORNIA · ATTORNEY GENERAL · CALIFORNIA · ATTORNEY GENERAL ·</textPath>
      </text>
      <path d="M100 66l9 22h23l-19 14 7 23-20-14-20 14 7-23-19-14h23z" fill="currentColor" />
    </svg>
  )
}

/** Sephora, August 2022: the green line climbs while the fine ticks up to $1.2M. */
function SephoraFine() {
  const counting = useAfter(1200)
  const settled = useAfter(3800)
  const context = useAfter(4400)

  return (
    <div className="s-root sf-root" style={{ padding: 0 }}>
      <div className="k-grid" aria-hidden="true" />

      <svg className="sf-chart" viewBox="0 0 1920 1080" aria-hidden="true">
        <defs>
          <linearGradient id="sf-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22e07a" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#22e07a" stopOpacity={0} />
          </linearGradient>
          <filter id="sf-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path d={AREA} fill="url(#sf-area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} />
        <motion.path
          d={LINE}
          fill="none"
          stroke="#22e07a"
          strokeWidth={8}
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#sf-glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 2.6, ease: [0.6, 0, 0.3, 1] }}
        />
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.4, type: 'spring', stiffness: 300, damping: 14 }}>
          <circle cx={TIP[0]} cy={TIP[1]} r={30} fill="#22e07a" opacity={0.25} />
          <circle cx={TIP[0]} cy={TIP[1]} r={14} fill="#22e07a" />
        </motion.g>
      </svg>

      <div className="sf-head">
        <motion.h2 className="sf-brand" initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, ease }}>
          SEPHORA
        </motion.h2>
        <motion.p className="sf-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          August 2022
        </motion.p>
      </div>

      <motion.div className="sf-ag" initial={{ opacity: 0, scale: 0.7, rotate: -40 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>
        <Seal />
        <span>
          California
          <b>Attorney General</b>
        </span>
      </motion.div>

      <div className="sf-fine">
        <AnimatePresence mode="wait">
          {counting && !settled && (
            <motion.div key="tick" className="sf-counter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }} transition={{ duration: 0.3 }}>
              <Count to={1_200_000} prefix="$" duration={2.4} />
            </motion.div>
          )}
          {settled && (
            <motion.div key="fine" className="sf-badge" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 15 }}>
              <b>$1.2M</b>
              <span>FINE</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {context && (
        <ul className="sf-context">
          {['No traditional hack. Failure in privacy control.', 'Unannounced data sharing with third parties.'].map((t, i) => (
            <motion.li key={t} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.35, duration: 0.6, ease }}>
              {t}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default defineScene({
  id: 'sephora-fine',
  title: 'Sephora 2022 · $1.2M fine (auto)',
  component: SephoraFine,
  transition: 'fade',
  notes:
    'In August 2022 the California Attorney General fined Sephora 1.2 million dollars — the first public fine under the CCPA. It was not a traditional hack: it was a failure in privacy control. Sephora shared customer data with third parties without telling them, and ignored their opt-out requests.',
})
