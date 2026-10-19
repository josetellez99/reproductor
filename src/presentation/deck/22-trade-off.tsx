import { AnimatePresence, motion, useTime, useTransform } from 'motion/react'
import { defineScene, useScene, useSteps } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'

const ARM = 420 // pivot → pan, in SVG units

/** A balance that never settles: flexibility vs rights. → reveals where the sides split. */
function TradeOff() {
  const step = useSteps(1)
  const { mode } = useScene()
  const time = useTime()
  const angle = useTransform(time, (t) => (mode === 'thumb' ? 0 : Math.sin(t / 1100) * 5))
  const leftY = useTransform(angle, (a) => -Math.sin((a * Math.PI) / 180) * ARM)
  const rightY = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * ARM)

  return (
    <div className="s-root tof-root">
      <Backdrop />
      <div className="tof-head">
        <Kicker>Overall</Kicker>
        <motion.h2 className="s-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          A trade-off<span className="s-accent">.</span>
        </motion.h2>
      </div>

      <motion.svg className="tof-scale" viewBox="0 0 1200 470" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <path className="tof-stand" d="M600 110 L565 430 H635 Z" />
        <rect className="tof-stand" x="470" y="430" width="260" height="16" rx="8" />
        <motion.rect className="tof-beam" x={600 - ARM - 20} y="102" width={2 * ARM + 40} height="16" rx="8" style={{ rotate: angle }} />
        <circle className="tof-pivot" cx="600" cy="110" r="16" />

        {[
          { x: 600 - ARM, y: leftY, label: ['Business', 'flexibility'], cls: 'tof-pan--us' },
          { x: 600 + ARM, y: rightY, label: ['Individual', 'rights'], cls: 'tof-pan--es' },
        ].map((p) => (
          <motion.g key={p.cls} className={p.cls} style={{ y: p.y }}>
            <path className="tof-string" d={`M${p.x} 110 L${p.x - 110} 270 M${p.x} 110 L${p.x + 110} 270`} />
            <path className="tof-pan" d={`M${p.x - 130} 270 H${p.x + 130} Q${p.x} 350 ${p.x - 130} 270 Z`} />
            <text x={p.x} y="370" textAnchor="middle">
              <tspan x={p.x} dy="0">
                {p.label[0]}
              </tspan>
              <tspan x={p.x} dy="46">
                {p.label[1]}
              </tspan>
            </text>
          </motion.g>
        ))}
      </motion.svg>

      <div className="tof-foot">
        <motion.p className="tof-agree" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6, ease }}>
          Both sides agree: <b>fragmentation is a problem</b>
        </motion.p>
        <AnimatePresence>
          {step >= 1 && (
            <motion.div className="tof-fork" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
              <span className="tof-fork__q">Fewer rules?</span>
              <span className="tof-fork__or">or</span>
              <span className="tof-fork__q tof-fork__q--es">A stronger federal law?</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default defineScene({
  id: 'trade-off',
  title: 'Overall · a trade-off (1 click)',
  component: TradeOff,
  transition: 'fade',
  notes:
    'Overall, the debate is a trade-off between business flexibility and stronger individual rights. Both sides see fragmentation as a problem, (→) but they disagree on the solution: fewer rules, or a stronger federal law.',
})
