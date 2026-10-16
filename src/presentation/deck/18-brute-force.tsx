import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { defineScene, useAfter, useScene } from '../../engine'
import { Kicker } from '../kit'
import { ease } from '../palette'
import { Count } from './parts/Count'

// 26 lowercase letters, 8 characters long.
const C = 26
const L = 8
const TOTAL = C ** L // 208,827,064,576

const HEX = '0123456789abcdef'
const noiseRow = (seed: number) =>
  Array.from({ length: 22 }, (_, i) => HEX[Math.abs(Math.floor(Math.sin(seed * 91.7 + i * 12.3) * 9973)) % 16]).join('')

/** Seconds ticking up from 0 while the rack works. */
function Timer({ duration }: { duration: number }) {
  const v = useMotionValue(0)
  const text = useTransform(v, (n) => `${n.toFixed(3)} s`)
  useEffect(() => {
    const c = animate(v, 0.97, { duration, ease: 'linear' })
    return () => c.stop()
  }, [v, duration])
  return <motion.span>{text}</motion.span>
}

function Rack({ on, tick }: { on: boolean; tick: number }) {
  return (
    <div className="bf-rack" data-on={on}>
      {Array.from({ length: 6 }, (_, u) => (
        <div key={u} className="bf-unit">
          <span className="bf-unit__leds">
            {Array.from({ length: 6 }, (_, k) => (
              <i key={k} data-lit={on && (tick + u * 3 + k * 5) % 4 !== 0} />
            ))}
          </span>
          <span className="bf-unit__noise">{on ? noiseRow(tick * 7 + u) : '·'.repeat(22)}</span>
          <span className="bf-unit__vent" />
        </div>
      ))}
      <svg className="bf-circuits" viewBox="0 0 400 600" aria-hidden="true">
        {[60, 140, 220, 300, 380, 460, 540].map((y, k) => (
          <motion.path
            key={y}
            d={`M0 ${y} h${80 + k * 20} l30 -30 h${120 - k * 10}`}
            fill="none"
            stroke="#ff2d55"
            strokeWidth={3}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: [0.3, 1, 0.3] } : { pathLength: 0, opacity: 0 }}
            transition={{ pathLength: { duration: 0.6, delay: k * 0.08 }, opacity: { duration: 0.8, repeat: Infinity, delay: k * 0.1 } }}
          />
        ))}
      </svg>
    </div>
  )
}

/** C^L: when guessing is needed, raw hardware does the work. */
function BruteForce() {
  const { mode } = useScene()
  const live = mode !== 'thumb'
  const formula = useAfter(800)
  const labels = useAfter(1600)
  const example = useAfter(2400)
  const powered = useAfter(3000)
  const counting = useAfter(3400)
  const locked = useAfter(5600)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!live || !powered || locked) return
    const id = window.setInterval(() => setTick((t) => t + 1), 90)
    return () => window.clearInterval(id)
  }, [live, powered, locked])

  return (
    <div className="s-root bf-root">
      <div className="k-grid" aria-hidden="true" />

      <div className="bf-head">
        <Kicker>Brute force</Kicker>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          If they have your past patterns, they attempt <b>brute force</b>.
        </motion.p>
      </div>

      <div className="bf-math">
        <motion.div
          className="bf-formula"
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(16px)' }}
          animate={formula ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
        >
          C<sup>L</sup>
        </motion.div>
        <motion.p className="bf-say" initial={{ opacity: 0 }} animate={formula ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
          “C to the power of L”
        </motion.p>

        <motion.dl className="bf-legend" initial={{ opacity: 0, y: 20 }} animate={labels ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
          <div>
            <dt>C</dt>
            <dd>Available characters</dd>
          </div>
          <div>
            <dt>L</dt>
            <dd>Password length</dd>
          </div>
        </motion.dl>

        <motion.p className="bf-example" initial={{ opacity: 0, y: 20 }} animate={example ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
          <span>
            {C}
            <sup>{L}</sup>
          </span>
          = {TOTAL.toLocaleString('en-US')}
          <small>a–z only · 8 characters</small>
        </motion.p>
      </div>

      <motion.div className="bf-machine" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.8, ease }}>
        <Rack on={powered} tick={tick} />

        <div className="bf-readout">
          <AnimatePresence mode="wait">
            {counting && !locked && (
              <motion.span key="run" className="bf-count" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Count to={TOTAL} duration={2.2} />
              </motion.span>
            )}
            {locked && (
              <motion.span key="done" className="bf-count bf-count--done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 15 }}>
                208 billion <small>combinations tested</small>
              </motion.span>
            )}
          </AnimatePresence>
          <div className="bf-timer" data-done={locked}>
            Time:{' '}
            {locked ? <b>&lt; 1 second</b> : counting ? <Timer duration={2.2} /> : <span>0.000 s</span>}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default defineScene({
  id: 'brute-force',
  title: 'Brute force · C^L (auto)',
  component: BruteForce,
  transition: 'fade',
  notes:
    'If they don’t have the exact password but know your past patterns, they use brute force. The number of combinations is C to the power of L: C is the number of available characters and L is the password length. With only lowercase letters and 8 characters, that is 26 to the power of 8 — about 208 billion combinations. Modern hardware can test all of them in less than a second against a fast hash.',
})
