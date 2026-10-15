import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform, type Variants } from 'motion/react'
import { defineScene } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease, palette } from '../palette'

// Demo data, made up.
const rows = [
  { district: 'Centro', value: 48200, delta: 12.4 },
  { district: 'Salamanca', value: 36100, delta: 8.1 },
  { district: 'Chamberí', value: 29800, delta: 5.6 },
  { district: 'Retiro', value: 27400, delta: -2.3 },
  { district: 'Arganzuela', value: 18900, delta: 15.9 },
  { district: 'Moncloa', value: 15300, delta: 3.2 },
]
const max = Math.max(...rows.map((r) => r.value))
const number = new Intl.NumberFormat('es-ES')

function Counter({ to, delay }: { to: number; delay: number }) {
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => number.format(Math.round(v)))
  useEffect(() => {
    const controls = animate(value, to, { duration: 1.6, delay, ease })
    return () => controls.stop()
  }, [value, to, delay])
  return <motion.span>{text}</motion.span>
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
}
const row: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

function MotionTable() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="s-root">
      <Backdrop />
      <div className="t-head">
        <Kicker layoutId="kicker">Datos de ejemplo · ficticios</Kicker>
        <motion.h2
          className="s-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
        >
          Visitantes por distrito<span className="s-accent">.</span>
        </motion.h2>
      </div>

      <motion.div className="t-table" variants={list} initial="hidden" animate="show">
        <motion.div className="t-row t-row--labels" variants={row}>
          <span>#</span>
          <span>Distrito</span>
          <span>Visitas / día</span>
          <span>Peso</span>
          <span style={{ textAlign: 'right' }}>Δ año</span>
        </motion.div>
        {rows.map((r, i) => (
          <motion.div
            key={r.district}
            className="t-row"
            variants={row}
            data-selected={selected === i}
            data-dim={selected !== null && selected !== i}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
            <span>{r.district}</span>
            <span className="t-value">
              <Counter to={r.value} delay={0.6 + i * 0.1} />
            </span>
            <div className="t-bar">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: r.value / max }}
                transition={{ delay: 0.8 + i * 0.1, duration: 1.2, ease }}
              />
            </div>
            <span className="t-delta" style={{ color: r.delta >= 0 ? '#2ee59d' : palette.crimsonHi }}>
              {r.delta >= 0 ? '+' : ''}
              {r.delta.toLocaleString('es-ES')}%
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default defineScene({
  id: 'motion-table',
  title: 'Tabla con motion graphics',
  component: MotionTable,
  transition: 'zoom',
  notes: 'Filas en cascada, contadores y barras animadas. Click en una fila para destacarla. La píldora viaja desde el centro gracias a layoutId.',
})
