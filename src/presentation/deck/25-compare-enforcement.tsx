import { motion } from 'motion/react'
import { defineScene, useSteps } from '../../engine'
import { ease } from '../palette'
import { CompareTable } from './parts/CompareTable'
import { COMPARE_ENFORCEMENT } from './parts/compare'

/** Comparison 2/2: enforcement and reach. One row per →. */
function CompareEnforcement() {
  const step = useSteps(COMPARE_ENFORCEMENT.length)
  return (
    <div className="s-root cmp-root">
      <div className="cmp-head">
        <motion.h2 className="cmp-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          Enforcement & reach
        </motion.h2>
        <span className="cmp-page">2 / 2</span>
      </div>
      <CompareTable rows={COMPARE_ENFORCEMENT} shown={step} />
    </div>
  )
}

export default defineScene({
  id: 'compare-enforcement',
  title: 'Comparison 2/2 · enforcement (4 clicks)',
  component: CompareEnforcement,
  transition: 'fade',
  notes:
    '(→) Private right of action: largely absent in US state laws; in Spain you can complain to the AEPD, go to court and claim compensation. (→) Sanctions: in the US they depend on each law; in Spain fines reach 20 million euros or 4% of global turnover. (→) Minors: COPPA protects children under 13; in Spain the consent age is 14. (→) International transfers: the US has few restrictions; data leaving the EU needs an adequacy decision or safeguards.',
})
