import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { ease } from '../palette'
import { DustText } from './parts/DustText'
import { Typewriter } from './parts/Typewriter'

const CLAUDE_ORANGE = '#d97757'
const MEMBERS = ['Jose Tellez', 'Adair Gonzales', 'Alfredo Medinilla']
const NUMERALS = ['I', 'II', 'III']

// Timeline (ms): "A presentation by" types → the name gathers from dust → members type one by one → Rome.
const PRE_AT = 300
const NAME_AT = 1500
const MEMBERS_AT = 4600
const MEMBER_GAP = 1000
const ROME_AT = MEMBERS_AT + MEMBERS.length * MEMBER_GAP + 300

const ROME_TRIUMVIRATES = [
  { title: 'First Triumvirate · 60 BC', names: 'Caesar · Pompey · Crassus' },
  { title: 'Second Triumvirate · 43 BC', names: 'Octavian · Mark Antony · Lepidus' },
]

/** Fluted Roman column, drawn bottom-up. */
function Column({ side }: { side: 'left' | 'right' }) {
  return (
    <motion.svg
      className={`grp-column grp-column--${side}`}
      viewBox="0 0 120 760"
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease }}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="120" height="22" rx="3" />
      <path d="M8 22 Q60 52 112 22 Z" />
      <rect x="14" y="40" width="92" height="14" rx="2" />
      <rect x="20" y="54" width="80" height="652" />
      {[34, 50, 60, 70, 86].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="700" />
      ))}
      <rect x="10" y="706" width="100" height="22" rx="3" />
      <rect x="0" y="728" width="120" height="32" rx="3" />
    </motion.svg>
  )
}

/** One half of a laurel wreath around the member names; `flip` mirrors it. */
function Laurel({ flip = false }: { flip?: boolean }) {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const a = ((120 + i * 15) * Math.PI) / 180
    return { x: 260 * Math.cos(a), y: 260 * Math.sin(a), rot: (a * 180) / Math.PI + 90, i }
  })
  return (
    <svg className="grp-laurel" viewBox="-300 -300 340 600" style={{ transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <motion.path d="M-130 225 A260 260 0 0 1 -130 -225" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease }} />
      {leaves.map((l) => (
        <g key={l.i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          {[-1, 1].map((s) => (
            <motion.ellipse
              key={s}
              cx={s * 22}
              cy="-6"
              rx="24"
              ry="9"
              transform={`rotate(${s * 35})`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + (8 - l.i) * 0.07, type: 'spring', stiffness: 260, damping: 18 }}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

/** Opening: who we are — the group "Triumvirate" — and a nod to the Roman original. */
function Group() {
  const rome = useAfter(ROME_AT)

  return (
    <div className="s-root grp-root" style={{ '--claude': CLAUDE_ORANGE } as CSSProperties}>
      {rome && (
        <>
          <motion.p className="grp-spqr" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease }} aria-hidden="true">
            SPQR
          </motion.p>
          <Column side="left" />
          <Column side="right" />
        </>
      )}

      <div className="grp-center">
        <Typewriter className="grp-pre" text="A presentation by" delay={PRE_AT} />

        <div className="grp-name">
          <DustText text="TRIUMVIRATE" width={1640} height={260} fontSize={210} color={CLAUDE_ORANGE} delay={NAME_AT} />
        </div>

        <div className="grp-members">
          {rome && (
            <>
              <Laurel />
              <Laurel flip />
            </>
          )}
          {MEMBERS.map((m, i) => (
            <p key={m} className="grp-member">
              {rome && (
                <motion.span className="grp-numeral" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.2 }}>
                  {NUMERALS[i]}
                </motion.span>
              )}
              <Typewriter text={m} delay={MEMBERS_AT + i * MEMBER_GAP} speed={45} />
            </p>
          ))}
        </div>
      </div>

      {rome && (
        <motion.footer className="grp-rome" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }}>
          <span className="grp-rome__latin">
            <i>trium virorum</i> — “of three men”
          </span>
          <span className="grp-rome__list">
            {ROME_TRIUMVIRATES.map((t) => (
              <span key={t.title}>
                <b>{t.title}</b> {t.names}
              </span>
            ))}
          </span>
        </motion.footer>
      )}
    </div>
  )
}

export default defineScene({
  id: 'group',
  title: 'Group · Triumvirate',
  component: Group,
  transition: 'fade',
  notes:
    'We are Triumvirate: Jose Tellez, Adair Gonzales and Alfredo Medinilla. The name comes from Rome — trium virorum, “of three men”. In 60 BC Caesar, Pompey and Crassus shared power in the First Triumvirate; in 43 BC Octavian, Mark Antony and Lepidus formed the Second. Three of us, one topic.',
})
