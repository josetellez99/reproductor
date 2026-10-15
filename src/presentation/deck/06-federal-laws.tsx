import { AnimatePresence } from 'motion/react'
import { defineScene, useSteps } from '../../engine'
import { FogCloud } from './parts/FogCloud'
import { LawCard } from './parts/LawCard'
import { LawMap } from './parts/LawMap'
import { LayerTag } from './parts/LayerTag'
import { Timeline } from './parts/Timeline'
import { WHOLE_COUNTRY } from './parts/fills'
import { FEDERAL_LAWS, FEDERAL_MILESTONES } from './parts/laws'

/** Map shrinks up, timeline appears; each → adds one federal law. */
function FederalLaws() {
  const step = useSteps(FEDERAL_LAWS.length)
  const law = step > 0 ? FEDERAL_LAWS[step - 1] : null

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <LawMap layout="timeline" fills={WHOLE_COUNTRY} />
      <LayerTag layer={1} text="Federal laws · the whole country" />
      <Timeline items={FEDERAL_MILESTONES.slice(0, step)} />
      <AnimatePresence mode="wait">
        {law && (
          <FogCloud key={law.acronym}>
            <LawCard law={law} />
          </FogCloud>
        )}
      </AnimatePresence>
    </div>
  )
}

export default defineScene({
  id: 'federal-laws',
  title: 'Federal laws by sector (4 clicks)',
  component: FederalLaws,
  transition: 'none',
  notes:
    'Each → adds one: student records with FERPA (1974), health data with HIPAA (1996), children’s data with COPPA (1998), bank data with GLBA (1999).',
})
