import { AnimatePresence, motion } from 'motion/react'
import { UsMap } from '../../components/usmap'
import { defineScene, useSteps } from '../../engine'
import { Kicker } from '../kit'
import { ease } from '../palette'
import { IconPin, IconShield } from './parts/icons'
import { only } from './parts/fills'
import { FEDERAL_LAWS, STATE_GROUPS } from './parts/laws'

const STATES = ['California', ...STATE_GROUPS.flatMap((g) => g.states)]
const VIEWBOX = { x: -60, y: 0, width: 1060, height: 620 }

/** Wrap-up: federal by sector + state by place. → reveals the equation. */
function ItDepends() {
  const step = useSteps(1)

  return (
    <div className="s-root">
      <div className="dep-head">
        <Kicker>So, in the United States…</Kicker>
        <motion.h2 className="s-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          …it depends<span className="s-accent">.</span>
        </motion.h2>
      </div>

      <div className="dep-cols">
        <motion.section className="dep-panel" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6, ease }}>
          <h3>
            <span>Layer 1</span> Federal · by <b>sector</b>
          </h3>
          <ul className="dep-laws">
            {FEDERAL_LAWS.map((l, i) => (
              <motion.li key={l.acronym} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.15 }}>
                <l.icon />
                <b>{l.acronym}</b>
                <span>{l.sector}</span>
              </motion.li>
            ))}
          </ul>
          <p className="dep-note">Only companies in certain sectors.</p>
        </motion.section>

        <motion.section className="dep-panel dep-panel--map" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6, ease }}>
          <h3>
            <span>Layer 2</span> State · by <b>place</b>
          </h3>
          <div className="dep-map">
            <UsMap viewBox={VIEWBOX} fills={only(STATES)} />
          </div>
          <p className="dep-note">Each state has its own rules — not all apply the same.</p>
        </motion.section>
      </div>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div className="dep-eq" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="dep-eq__term">
              <IconPin /> Where you live
            </span>
            <span className="dep-eq__op">+</span>
            <span className="dep-eq__term">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M9 7V4h6v3" />
              </svg>
              Which sector
            </span>
            <span className="dep-eq__op">=</span>
            <span className="dep-eq__term dep-eq__term--result">
              <IconShield /> Your privacy rights
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default defineScene({
  id: 'it-depends',
  title: 'Conclusion · it depends (1 click)',
  component: ItDepends,
  transition: 'fade',
  notes:
    'As we have seen, federal laws apply only to companies in certain sectors like health, education, banks, etc. The states have their own regulation, but not all states apply the same. (→) So, in the United States, data privacy laws depend on where you live and the sector we are talking about.',
})
