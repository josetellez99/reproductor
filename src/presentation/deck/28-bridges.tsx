import { AnimatePresence, motion } from 'motion/react'
import { defineScene, useScene, useSteps } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'
import { FlagES, FlagUS } from './parts/flags'

const BORROWED = ['Data minimisation', 'Profiling opt-outs', 'Impact assessments']
const ARC = 'M330 330 C 700 40, 1220 40, 1590 330'

/** The two systems are connected: data flows one way, ideas the other. → shows the open question. */
function Bridges() {
  const step = useSteps(1)
  const { mode } = useScene()

  return (
    <div className="s-root brg-root">
      <Backdrop />
      <div className="brg-head">
        <Kicker>Not completely separate</Kicker>
      </div>

      <svg className="brg-svg" viewBox="0 0 1920 520" aria-hidden="true">
        <motion.path className="brg-arc" d={ARC} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 1.2, ease }} />
        {mode !== 'thumb' && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }}>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} className="brg-dot" r="9">
                <animateMotion calcMode="linear" dur="3.2s" begin={`-${i * 0.8}s`} repeatCount="indefinite" path={ARC} keyPoints="1;0" keyTimes="0;1" />
              </circle>
            ))}
          </motion.g>
        )}
      </svg>

      <motion.p className="brg-arc-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <b>EU-U.S. Data Privacy Framework</b>
        <span>commercial data flows</span>
      </motion.p>

      <motion.div className="brg-node brg-node--us" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }}>
        <FlagUS className="brg-flag" />
        United States
      </motion.div>
      <motion.div className="brg-node brg-node--es" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.6, ease }}>
        <FlagES className="brg-flag" />
        Spain / EU
      </motion.div>

      <div className="brg-borrow">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          US states increasingly borrow GDPR ideas <span className="brg-arrow">←</span>
        </motion.p>
        <div className="brg-chips">
          {BORROWED.map((b, i) => (
            <motion.span key={b} initial={{ opacity: 0, x: 220 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.1 + i * 0.25, duration: 0.8, ease }}>
              {b}
            </motion.span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div className="brg-open" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="brg-open__lead">A federal US law could bring them closer…</span>
            <span className="brg-open__q">Preemption?</span>
            <span className="brg-open__q">Private right of action?</span>
            <span className="brg-open__tag">Unresolved</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default defineScene({
  id: 'bridges',
  title: 'Bridges & open question (1 click)',
  component: Bridges,
  transition: 'fade',
  notes:
    'The two systems are not completely separate. The EU-U.S. Data Privacy Framework connects them for commercial data flows, and US states increasingly borrow GDPR concepts such as data minimisation, profiling opt-outs and impact assessments. (→) A federal US law could move the two models closer, but the debate over preemption and the private right of action remains unresolved.',
})
