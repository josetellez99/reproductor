import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { ease } from '../palette'
import { IconCheck } from './parts/icons'

const STEPS = ['Agreed to clearly disclose data-sharing practices', 'Implement consumer opt-out controls']

/** Back to Sephora: what the settlement made them do. */
function SephoraRemediation() {
  return (
    <div className="s-root rem-root">
      <div className="k-grid" aria-hidden="true" />

      <motion.p className="rem-brand" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }}>
        SEPHORA
      </motion.p>
      <motion.h2 className="rem-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease }}>
        Sephora’s remediation
      </motion.h2>

      <ul className="rem-list">
        {STEPS.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.4, duration: 0.6, ease }}>
            <IconCheck />
            {s}
          </motion.li>
        ))}
      </ul>

      <motion.p className="rem-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        + $1.2M fine · California Attorney General · 2022
      </motion.p>
    </div>
  )
}

export default defineScene({
  id: 'sephora-remediation',
  title: 'Sephora · remediation',
  component: SephoraRemediation,
  transition: 'fade',
  notes:
    'Back to Sephora. Besides paying the 1.2 million dollar fine, Sephora agreed to clearly disclose that it shares customer data, and to implement opt-out controls so consumers can say no — including honoring the Global Privacy Control signal from the browser.',
})
