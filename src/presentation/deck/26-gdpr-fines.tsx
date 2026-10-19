import { motion } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { Kicker } from '../kit'
import { ease } from '../palette'
import { Count } from './parts/Count'
import { FlagES, FlagUS } from './parts/flags'

const US_SANCTIONS = ['Set by each statute or state law', 'Civil penalties per violation', 'FTC consent orders']

/** Spotlight on sanctions: one clear ceiling vs a patchwork. */
function GdprFines() {
  const orShown = useAfter(2000)
  return (
    <div className="s-root fine-root">
      <div className="fine-eu">
        <Kicker>Sanctions</Kicker>
        <p className="fine-who">
          <FlagES className="fine-flag" /> Spain · GDPR
        </p>
        <p className="fine-amount">
          <span className="fine-upto">up to</span>
          <Count to={20_000_000} prefix="€" duration={2} />
        </p>
        <motion.p className="fine-or" initial={{ opacity: 0, y: 20 }} animate={orShown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6, ease }}>
          or <b>4%</b> of global annual turnover
        </motion.p>
        <motion.p className="fine-higher" initial={{ opacity: 0 }} animate={{ opacity: orShown ? 1 : 0 }} transition={{ delay: 0.5 }}>
          whichever is higher
        </motion.p>
      </div>

      <motion.aside className="fine-us" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7, ease }}>
        <p className="fine-who">
          <FlagUS className="fine-flag" /> United States
        </p>
        <ul>
          {US_SANCTIONS.map((s, i) => (
            <motion.li key={s} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.2 }}>
              {s}
            </motion.li>
          ))}
        </ul>
        <p className="fine-example">e.g. Sephora · $1.2M · California, 2022</p>
      </motion.aside>
    </div>
  )
}

export default defineScene({
  id: 'gdpr-fines',
  title: 'Sanctions · €20M or 4%',
  component: GdprFines,
  transition: 'fade',
  notes:
    'The difference in sanctions is striking. Under the GDPR, fines can reach 20 million euros or 4% of a company’s global annual turnover, whichever is higher. In the US, penalties are set by each statute or state law: civil penalties per violation and FTC consent orders — like the 1.2 million dollars Sephora paid in California.',
})
