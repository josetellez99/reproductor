import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface MagneticButtonProps {
  variant: 'primary' | 'ghost'
  icon: ReactNode
  label: string
  hint: string
  kbd: string
  onClick: () => void
}

const spring = { stiffness: 260, damping: 18, mass: 0.6 }

/** Big home button that leans towards the pointer. */
export function MagneticButton({ variant, icon, label, hint, kbd, onClick }: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      type="button"
      className={`mag-btn mag-btn--${variant}`}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onClick={onClick}
    >
      <span className="mag-btn__icon">{icon}</span>
      <span className="mag-btn__text">
        <span className="mag-btn__label">{label}</span>
        <span className="mag-btn__hint">{hint}</span>
      </span>
      <kbd className="mag-btn__kbd">{kbd}</kbd>
    </motion.button>
  )
}
