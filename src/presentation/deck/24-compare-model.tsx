import { motion } from 'motion/react'
import { defineScene, useSteps } from '../../engine'
import { ease } from '../palette'
import { CompareTable } from './parts/CompareTable'
import { COMPARE_MODEL } from './parts/compare'

/** Comparison 1/2: how each system works. One row per →. */
function CompareModel() {
  const step = useSteps(COMPARE_MODEL.length)
  return (
    <div className="s-root cmp-root">
      <div className="cmp-head">
        <motion.h2 className="cmp-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          How each system works
        </motion.h2>
        <span className="cmp-page">1 / 2</span>
      </div>
      <CompareTable rows={COMPARE_MODEL} shown={step} />
    </div>
  )
}

export default defineScene({
  id: 'compare-model',
  title: 'Comparison 1/2 · model (5 clicks)',
  component: CompareModel,
  transition: 'fade',
  notes:
    '(→) Legal model: the US is sectoral and fragmented — HIPAA, GLBA, COPPA and about 20 state laws; Spain has the GDPR, which covers almost all personal data. (→) Philosophy: the US is market-oriented, based on notice-and-consent; in Spain data protection is a fundamental right. (→) Legal basis: in the US processing is generally allowed if disclosed; in Spain it needs one of six legal bases. (→) Rights: they vary by state in the US; in Spain they are uniform. (→) Authority: the US has no national data protection authority — the FTC and State Attorneys General enforce; Spain has the AEPD, an independent agency.',
})
