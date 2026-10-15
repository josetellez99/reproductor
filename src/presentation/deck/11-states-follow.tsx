import { AnimatePresence } from 'motion/react'
import type { StateShape } from '../../components/usmap'
import { defineScene, useSteps } from '../../engine'
import { LawMap } from './parts/LawMap'
import { LayerTag } from './parts/LayerTag'
import { StateLabel } from './parts/StateLabel'
import { Timeline, type Milestone } from './parts/Timeline'
import { only } from './parts/fills'
import { CCPA_MILESTONE, STATE_GROUPS } from './parts/laws'

// Where each label sits relative to its state (map units).
const OFFSETS: Record<string, [number, number]> = {
  California: [-150, 30],
  Virginia: [140, 50],
  Colorado: [0, -95],
  Texas: [-60, 120],
  Indiana: [-40, -120],
  Kentucky: [60, 110],
  'Rhode Island': [110, 50],
}

// 2023 "Texas" is short enough to sit to the right of its stem; the rest stack on the left.
const LAYOUT: Pick<Milestone, 'level' | 'align'>[] = [
  { level: 1, align: 'right' },
  { level: 0, align: 'left' },
  { level: 2, align: 'right' },
]
const GROUP_MILESTONES: Milestone[] = STATE_GROUPS.map((g, i) => ({
  year: g.year,
  label: g.states.join(' · '),
  ...LAYOUT[i],
}))

// Within a group, states light up one after another.
const DELAY: Record<string, number> = Object.fromEntries(STATE_GROUPS.flatMap((g) => g.states.map((s, i) => [s, i * 0.7])))
const fillDelay = (s: StateShape) => DELAY[s.name] ?? 0

/** Back to the US: each → lights up the next group of states with their own CCPA-style law. */
function StatesFollow() {
  const step = useSteps(STATE_GROUPS.length)
  const groups = STATE_GROUPS.slice(0, step)
  const states = ['California', ...groups.flatMap((g) => g.states)]

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <LawMap layout="timeline" fills={only(states)} fillDelay={fillDelay}>
        <AnimatePresence>
          {groups.flatMap((g) =>
            g.states.map((s) => {
              const [dx, dy] = OFFSETS[s]
              return <StateLabel key={s} state={s} text={`${s} · ${g.year}`} dx={dx} dy={dy} delay={DELAY[s] + 0.3} />
            }),
          )}
        </AnimatePresence>
        <StateLabel state="California" text="California · 2018" dx={OFFSETS.California[0]} dy={OFFSETS.California[1]} />
      </LawMap>
      <LayerTag layer={2} text="States follow California" />
      <Timeline items={[CCPA_MILESTONE, ...GROUP_MILESTONES.slice(0, step)]} />
    </div>
  )
}

export default defineScene({
  id: 'states-follow',
  title: 'States follow California (3 clicks)',
  component: StatesFollow,
  transition: 'fade',
  notes:
    'In following years other states introduced their own versions of the CCPA: Virginia and Colorado in 2021 (→), Texas in 2023 (→), and the newest ones, Indiana, Kentucky and Rhode Island, in January 2026 (→).',
})
