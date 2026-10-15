import { AnimatePresence } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { FogCloud } from './parts/FogCloud'
import { LawCard } from './parts/LawCard'
import { LawMap } from './parts/LawMap'
import { LayerTag } from './parts/LayerTag'
import { StateLabel } from './parts/StateLabel'
import { Timeline } from './parts/Timeline'
import { WHOLE_COUNTRY, only } from './parts/fills'
import { CCPA_MILESTONE, FEDERAL_LAWS, FEDERAL_MILESTONES } from './parts/laws'

/**
 * Starts exactly where the previous scene ended, then on its own:
 * clears cloud + milestones + highlight → adds 2018 → lights up California.
 */
function Ccpa2018() {
  const cleared = useAfter(350)
  const year = useAfter(1500)
  const california = useAfter(2100)

  const items = year ? [CCPA_MILESTONE] : cleared ? [] : FEDERAL_MILESTONES
  const fills = california ? only(['California']) : cleared ? undefined : WHOLE_COUNTRY

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <LawMap layout="timeline" fills={fills}>
        {california && <StateLabel state="California" text="California · CCPA 2018" dx={-150} dy={30} />}
      </LawMap>
      <LayerTag layer={cleared ? 2 : 1} text={cleared ? 'State laws · personal data in general' : 'Federal laws · the whole country'} />
      <Timeline items={items} appear={false} />
      <AnimatePresence initial={false}>
        {!cleared && (
          <FogCloud key="glba">
            <LawCard law={FEDERAL_LAWS[FEDERAL_LAWS.length - 1]} />
          </FogCloud>
        )}
      </AnimatePresence>
    </div>
  )
}

export default defineScene({
  id: 'ccpa-2018',
  title: 'State layer · California 2018 (auto)',
  component: Ccpa2018,
  transition: 'none',
  notes:
    'And in the second layer we have the state laws, which cover personal data in general and not just one sector. A big change happened in 2018, just 8 years ago, when California passed the CCPA.',
})
