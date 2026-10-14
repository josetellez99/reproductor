import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { defineScene, useNextInterceptor, usePrevInterceptor, useScene } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'

const items = [
  { title: 'Diseña', text: 'Cada escena es un componente React. Sin plantillas, sin límites.' },
  { title: 'Anima', text: 'Motion, morphs entre escenas y timelines encadenadas.' },
  { title: 'Interactúa', text: 'Clicks, teclado, datos en vivo. Es una web, no un PDF.' },
]

function Steps() {
  const { mode } = useScene()
  // Thumbnails show the final state so the grid is informative.
  const [step, setStep] = useState(() => (mode === 'thumb' ? items.length : 0))

  useNextInterceptor(() => {
    if (step >= items.length) return false
    setStep(step + 1)
    return true
  })
  usePrevInterceptor(() => {
    if (step === 0) return false
    setStep(step - 1)
    return true
  })

  return (
    <div className="s-root">
      <Backdrop />
      <Kicker>Pasos internos · useNextInterceptor</Kicker>
      <motion.h2
        className="s-title"
        style={{ marginTop: 32, position: 'relative' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        Una escena, varios <span className="s-accent">→</span>
      </motion.h2>

      <div className="p-cards">
        {items.map((item, i) => (
          <div key={item.title} style={{ position: 'relative' }}>
            <div className="p-slot" />
            <AnimatePresence>
              {step > i && (
                <motion.div
                  className="p-card"
                  style={{ position: 'absolute', inset: 0 }}
                  initial={{ opacity: 0, y: 60, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.96 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <span className="p-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="p-card__title">{item.title}</h3>
                  <p className="p-card__text">{item.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="p-footer">
        <span>
          {step < items.length ? '→ revela el siguiente paso' : '→ ahora sí, siguiente escena'}
        </span>
        <div className="p-dots">
          {items.map((item, i) => (
            <span key={item.title} data-on={step > i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default defineScene({
  id: 'steps',
  title: 'Pasos dentro de una escena',
  component: Steps,
  notes: 'La escena intercepta → para revelar tarjetas una a una; ← las oculta. Cuando no quedan pasos, → avanza de escena con normalidad.',
})
