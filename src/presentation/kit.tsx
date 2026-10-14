import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Rombo } from '../ui/icons'

/** Shared building blocks for scenes. Use them or ignore them. */

export function Backdrop() {
  return (
    <>
      <div className="k-grid" aria-hidden="true" />
      <div className="k-glow" aria-hidden="true" />
    </>
  )
}

export function Kicker({ children, layoutId }: { children: ReactNode; layoutId?: string }) {
  return (
    <motion.div layoutId={layoutId} className="k-kicker">
      <Rombo className="k-kicker__rombo" />
      {children}
    </motion.div>
  )
}
