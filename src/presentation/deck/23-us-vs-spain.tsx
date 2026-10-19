import { motion } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { Kicker } from '../kit'
import { ease } from '../palette'
import { FlagES, FlagUS } from './parts/flags'

// Loose pieces on the US side: where each one lands and how crooked.
const PIECES = [
  { label: 'HIPAA', sub: 'health', x: 30, y: 10, r: -6 },
  { label: 'GLBA', sub: 'finance', x: 330, y: 40, r: 5 },
  { label: 'COPPA', sub: 'children', x: 90, y: 190, r: 4 },
  { label: 'FTC', sub: 'enforcement', x: 390, y: 220, r: -5 },
  { label: '~20 state laws', sub: 'comprehensive', x: 150, y: 370, r: -2 },
]

/** Part 2 opener: scattered pieces vs one solid block. */
function UsVsSpain() {
  const locked = useAfter(1400)
  return (
    <div className="s-root uvs-root">
      <div className="uvs-head">
        <Kicker>Part 2 · Comparison</Kicker>
        <motion.h2 className="uvs-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          Data protection: USA <span className="s-accent">vs</span> Spain
        </motion.h2>
      </div>

      <div className="uvs-cols">
        <section className="uvs-side uvs-side--us">
          <h3>
            <FlagUS className="uvs-flag" /> United States
          </h3>
          <p className="uvs-big">No single federal law</p>
          <div className="uvs-pieces">
            {PIECES.map((p, i) => (
              <motion.div
                key={p.label}
                className="uvs-piece"
                initial={{ opacity: 0, x: p.x + (i % 2 ? 200 : -200), y: p.y - 120, rotate: p.r * 4 }}
                animate={{ opacity: 1, x: p.x, y: p.y, rotate: p.r }}
                transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 120, damping: 14 }}
              >
                <b>{p.label}</b>
                <span>{p.sub}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="uvs-divider" aria-hidden="true" />

        <section className="uvs-side uvs-side--es">
          <h3>
            <FlagES className="uvs-flag" /> Spain
          </h3>
          <p className="uvs-big">One framework</p>
          <div className="uvs-stack" data-locked={locked}>
            <motion.div className="uvs-block uvs-block--gdpr" initial={{ opacity: 0, y: -160 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7, ease }}>
              <small>European Union · directly applicable</small>
              <b>GDPR</b>
              <span>General Data Protection Regulation</span>
            </motion.div>
            <motion.div className="uvs-block uvs-block--lopd" initial={{ opacity: 0, y: 160 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7, ease }}>
              <small>Spain · Organic Law 3/2018</small>
              <b>LOPDGDD</b>
              <span>Personal Data Protection & Guarantee of Digital Rights</span>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default defineScene({
  id: 'us-vs-spain',
  title: 'Part 2 · USA vs Spain',
  component: UsVsSpain,
  transition: 'fade',
  notes:
    'Now let’s compare. Spain applies the European Union’s GDPR, which is directly applicable, together with the national Organic Law 3/2018, the LOPDGDD. The United States, by contrast, has no single federal privacy law: it relies on sector-specific statutes, FTC enforcement and state legislation.',
})
