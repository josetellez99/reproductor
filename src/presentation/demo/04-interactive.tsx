import { useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { defineScene, toStagePoint } from '../../engine'
import { MadridStar } from '../../ui/MadridStar'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'

interface Burst {
  id: number
  x: number
  y: number
}

function Interactive() {
  const [text, setText] = useState('')
  const [bursts, setBursts] = useState<Burst[]>([])
  const nextId = useRef(0)

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('input')) return
    const { x, y } = toStagePoint(e, e.currentTarget)
    const id = nextId.current++
    setBursts((b) => [...b.slice(-24), { id, x, y }])
  }

  return (
    <div className="s-root s-center" onPointerDown={onPointerDown}>
      <Backdrop />
      <Kicker>Interactiva</Kicker>
      <motion.h2
        className="s-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        Tu turno<span className="s-accent">.</span>
      </motion.h2>

      <input
        className="i-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo…"
        maxLength={18}
        spellCheck={false}
      />

      <div className="i-output" aria-live="polite">
        {[...text].map((ch, i) => (
          <motion.span
            key={`${i}-${ch}`}
            initial={{ opacity: 0, y: 80, rotate: -12, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            className="i-star"
            style={{ left: b.x, top: b.y }}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ scale: 1.6, rotate: 120, opacity: 0 }}
            transition={{ duration: 1.1, ease }}
            onAnimationComplete={() => setBursts((all) => all.filter((x) => x.id !== b.id))}
          >
            <MadridStar />
          </motion.div>
        ))}
      </AnimatePresence>

      <p className="i-hint">Click fuera del campo para soltar el teclado · luego → para seguir</p>
    </div>
  )
}

export default defineScene({
  id: 'interactive',
  title: 'Escena interactiva',
  component: Interactive,
  transition: 'slide',
  notes: 'Mientras el foco está en el campo, las flechas escriben y no cambian de escena. Click en cualquier parte lanza una estrella.',
})
