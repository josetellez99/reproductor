import type { ComponentType } from 'react'
import { motion, type Variants } from 'motion/react'
import { defineScene } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'
import { AiArt, InternetArt, PcArt, SmartphoneArt, TransistorArt, WebArt } from './parts/revolutions'

const ITEMS: { title: string; year: number; note: string; Art: ComponentType }[] = [
  { title: 'The Transistor', year: 1947, note: 'Bell Labs', Art: TransistorArt },
  { title: 'The Internet', year: 1969, note: 'ARPANET', Art: InternetArt },
  { title: 'The Personal Computer', year: 1981, note: 'IBM PC', Art: PcArt },
  { title: 'The World Wide Web', year: 1989, note: 'Tim Berners-Lee', Art: WebArt },
  { title: 'The Smartphone', year: 2007, note: 'iPhone', Art: SmartphoneArt },
  { title: 'Artificial Intelligence', year: 2022, note: 'ChatGPT', Art: AiArt },
]

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } } }
const card: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
}

function Revolutions() {
  return (
    <div className="s-root">
      <Backdrop />
      <div className="rev-head">
        <Kicker>From 1947 to today</Kicker>
        <motion.h2
          className="s-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Great Tech Revolutions<span className="s-accent">.</span>
        </motion.h2>
      </div>

      <motion.div className="rev-grid" variants={grid} initial="hidden" animate="show">
        {ITEMS.map(({ title, year, note, Art }, i) => (
          <motion.article key={title} className="rev-card" variants={card}>
            <div className="rev-card__art">
              <Art />
            </div>
            <div className="rev-card__meta">
              <span className="rev-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <span className="rev-card__year">{year}</span>
            </div>
            <span className="rev-card__note">{note}</span>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}

export default defineScene({
  id: 'revolutions',
  title: 'Great Tech Revolutions',
  component: Revolutions,
  transition: 'fade',
  notes: 'Six revolutions that brought us here: transistor, internet, PC, web, smartphone and AI. Each one raised new questions for regulators.',
})
