import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease, palette } from '../palette'

function TitleColor() {
  return (
    <div className="s-root s-center">
      <Backdrop />
      <Kicker layoutId="kicker">Madrid · 2026</Kicker>
      <motion.h1
        layoutId="hero-title"
        className="s-hero-title"
        initial={{ color: palette.ink }}
        animate={{ color: palette.crimson }}
        transition={{ duration: 0.9, ease }}
      >
        Escena
      </motion.h1>
      <motion.p
        className="s-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease }}
      >
        Cada <span className="s-accent">→</span> es una escena. Aunque solo cambie un color.
      </motion.p>
    </div>
  )
}

export default defineScene({
  id: 'title-color',
  title: 'El título cambia de color',
  component: TitleColor,
  notes: 'Misma composición que la intro: solo cambia el color del título y el subtítulo. Así una escena puede ser un único cambio.',
})
