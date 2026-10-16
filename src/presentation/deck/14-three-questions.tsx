import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'
import { IconChecklist, IconFingerprint, IconGavel } from './parts/icons'

const QUESTIONS = [
  { icon: IconChecklist, text: 'What are companies required to do?' },
  { icon: IconFingerprint, text: "What are users' rights?" },
  { icon: IconGavel, text: 'What happens if the rules are broken?' },
]

// Going forward, the whole panel lifts out of frame (Sephora takes its place).
const liftOut: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
  exit: (dir: number) =>
    dir > 0 ? { y: '-100%', transition: { duration: 0.7, ease } } : { opacity: 0, transition: { duration: 0.35, ease } },
}

/** A panel drags down from the top and reveals the three questions. */
function ThreeQuestions() {
  const landed = useAfter(1100)

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <Backdrop />

      <motion.section
        className="sq-panel"
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 16, mass: 1.1 }}
      >
        <Kicker>Three questions</Kicker>

        <div className="sq-cards">
          {QUESTIONS.map((q, i) => (
            <motion.article
              key={q.text}
              className="sq-card"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={landed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ delay: i * 0.2, type: 'spring', stiffness: 260, damping: 18 }}
            >
              <motion.div
                className="sq-card__glow"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={landed ? { opacity: [0, 1, 0.55] } : { opacity: 0 }}
                transition={{ delay: i * 0.2 + 0.15, duration: 1.2 }}
              />
              <span className="sq-card__num">0{i + 1}</span>
              <span className="sq-card__icon">
                <q.icon />
              </span>
              <h3>{q.text}</h3>
            </motion.article>
          ))}
        </div>

        {/* the handle the panel was "dragged" by */}
        <div className="sq-handle" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </motion.section>
    </div>
  )
}

export default defineScene({
  id: 'three-questions',
  title: 'Three questions (auto)',
  component: ThreeQuestions,
  transition: liftOut,
  notes:
    'To understand any privacy law, we ask three questions: What are companies required to do? What are users’ rights? And what happens if the rules are broken? Let’s answer the last one with a real case.',
})
