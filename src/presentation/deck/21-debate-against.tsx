import { defineScene, useSteps } from '../../engine'
import { DebateList, type Argument } from './parts/DebateList'
import { IconAlert, IconBuilding, IconEye, IconGavel, IconPuzzle } from './parts/icons'

const AGAINST: Argument[] = [
  { icon: IconAlert, title: 'Self-regulation has failed', text: 'Voluntary rules have not protected people' },
  { icon: IconPuzzle, title: 'State-by-state patchwork', text: 'Costly for companies, unequal for people' },
  { icon: IconGavel, title: 'Weak enforcement', text: 'And individuals cannot sue directly' },
  { icon: IconEye, title: 'Notice-and-consent', text: 'Allows excessive data collection' },
  { icon: IconBuilding, title: 'Federal agencies', text: 'Have their own privacy shortcomings' },
]

/** Criticism of the US approach, one per →. */
function DebateAgainst() {
  const step = useSteps(AGAINST.length)
  return <DebateList tone="against" title="Against it" lead="what the critics reply" items={AGAINST} shown={step} />
}

export default defineScene({
  id: 'debate-against',
  title: 'Debate · against (5 clicks)',
  component: DebateAgainst,
  transition: 'fade',
  notes:
    'Critics reply that self-regulation has failed (→), the state-by-state patchwork is costly and unequal (→), enforcement is weak and individuals cannot sue directly (→), notice-and-consent allows excessive data collection (→), and federal agencies themselves have privacy shortcomings (→).',
})
