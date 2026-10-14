import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease, palette } from '../palette'

function Intro() {
  return (
    <div className="s-root s-center">
      <Backdrop />
      <Kicker layoutId="kicker">Madrid · 2026</Kicker>
      <motion.h1
        layoutId="hero-title"
        className="s-hero-title"
        initial={{ opacity: 0, y: 60, color: palette.ink }}
        animate={{ opacity: 1, y: 0, color: palette.ink }}
        transition={{ duration: 1, ease }}
      >
        Escena
      </motion.h1>
      <motion.p
        className="s-sub"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease }}
      >
        Presentaciones que no son diapositivas.
      </motion.p>
    </div>
  )
}

export default defineScene({
  id: 'intro',
  title: 'Intro',
  component: Intro,
  notes: 'Título de entrada. El título y la píldora usan layoutId para continuar en la escena siguiente.',
})
