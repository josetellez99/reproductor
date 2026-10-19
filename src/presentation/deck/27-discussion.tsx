import { motion } from 'motion/react'
import { defineScene, useSteps } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'
import { FlagES, FlagUS } from './parts/flags'
import { IconCheck, IconCross } from './parts/icons'

const SIDES = [
  {
    key: 'es',
    flag: FlagES,
    name: 'Spain / EU',
    pros: ['One set of rules across member states', 'Independent authority with resources', 'Enforceable individual rights', 'Real data minimisation'],
    cons: ['Administrative burden on organisations', 'Slower innovation, say some critics'],
  },
  {
    key: 'us',
    flag: FlagUS,
    name: 'United States',
    pros: ['More flexible', 'Business-friendly'],
    cons: ['Uneven protection for individuals', 'Relies on disclosure, not limits on collection'],
  },
]

/** Discussion: strengths first, → adds the costs. */
function Discussion() {
  const step = useSteps(1)
  return (
    <div className="s-root disc-root">
      <Backdrop />
      <div className="disc-head">
        <Kicker>Discussion</Kicker>
        <motion.h2 className="cmp-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          Strengths <span className="s-accent">&</span> costs
        </motion.h2>
      </div>

      <div className="disc-cols">
        {SIDES.map((s, si) => (
          <motion.section
            key={s.key}
            className={`disc-panel disc-panel--${s.key}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + si * 0.2, duration: 0.6, ease }}
          >
            <h3>
              <s.flag className="disc-flag" /> {s.name}
            </h3>
            <ul>
              {s.pros.map((p, i) => (
                <motion.li key={p} className="disc-pro" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + si * 0.2 + i * 0.12 }}>
                  <IconCheck /> {p}
                </motion.li>
              ))}
              {s.cons.map((c, i) => (
                <motion.li
                  key={c}
                  className="disc-con"
                  initial={false}
                  animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: step >= 1 ? si * 0.3 + i * 0.15 : 0, duration: 0.5, ease }}
                >
                  <IconCross /> {c}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

export default defineScene({
  id: 'discussion',
  title: 'Discussion · strengths & costs (1 click)',
  component: Discussion,
  transition: 'fade',
  notes:
    'The Spanish and European model addresses most of the weaknesses that US critics identify: a single set of rules, an independent authority, enforceable rights and real data minimisation. The US model is more flexible and business-friendly. (→) But there are costs: in Europe, administrative burden and, according to some critics, slower innovation; in the US, uneven protection and a reliance on disclosure rather than limits on collection.',
})
