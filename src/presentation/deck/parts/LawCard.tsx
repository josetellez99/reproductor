import { motion } from 'motion/react'
import type { FederalLaw } from './laws'

/** Law details shown inside the fog cloud. */
export function LawCard({ law }: { law: FederalLaw }) {
  const Icon = law.icon
  return (
    <div className="law-card">
      <motion.span
        className="law-card__icon"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
      >
        <Icon />
      </motion.span>
      <motion.h3
        className="law-card__acronym"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {law.acronym}
      </motion.h3>
      <motion.p className="law-card__name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        {law.name}
      </motion.p>
      <motion.div
        className="law-card__facts"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span>
          <small>Introduced</small>
          {law.year}
        </span>
        <span>
          <small>Data</small>
          {law.data}
        </span>
        <span>
          <small>Sector</small>
          {law.sector}
        </span>
      </motion.div>
    </div>
  )
}
