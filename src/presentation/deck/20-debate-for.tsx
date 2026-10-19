import { defineScene, useSteps } from '../../engine'
import { DebateList, type Argument } from './parts/DebateList'
import { IconBuilding, IconChecklist, IconGavel, IconGlobeShield, IconRocket } from './parts/icons'

const FOR: Argument[] = [
  { icon: IconRocket, title: 'Less regulation', text: 'Helps US firms lead technologically' },
  { icon: IconBuilding, title: 'Uniform national rules', text: 'Plus faster permitting for infrastructure' },
  { icon: IconChecklist, title: 'Voluntary frameworks', text: 'Such as NIST’s: flexibility instead of mandates' },
  { icon: IconGavel, title: 'FTC enforcement', text: 'Action against deceptive practices' },
  { icon: IconGlobeShield, title: 'EU-U.S. Data Privacy Framework', text: 'Legal certainty for transatlantic data' },
]

/** Arguments supporting the US approach, one per →. */
function DebateFor() {
  const step = useSteps(FOR.length)
  return <DebateList tone="for" title="In favour" lead="of the US approach" items={FOR} shown={step} />
}

export default defineScene({
  id: 'debate-for',
  title: 'Debate · in favour (5 clicks)',
  component: DebateFor,
  transition: 'fade',
  notes:
    'Let’s summarise the debate. Supporters of the US approach argue that less regulation (→), uniform national rules and faster permitting for infrastructure help US firms lead technologically (→). Voluntary frameworks such as NIST’s (→), FTC action against deceptive practices (→) and the EU-U.S. Data Privacy Framework (→) provide flexibility and legal certainty.',
})
