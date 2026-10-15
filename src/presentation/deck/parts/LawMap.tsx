import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { UsMap, type StateShape } from '../../../components/usmap'

export type LawMapLayout = 'full' | 'timeline'

// Canvas boxes. 'timeline' leaves the bottom strip for <Timeline>.
const BOXES: Record<LawMapLayout, { left: number; top: number; width: number; height: number }> = {
  full: { left: 0, top: 0, width: 1920, height: 1080 },
  timeline: { left: 240, top: 10, width: 1440, height: 810 },
}

interface LawMapProps {
  layout: LawMapLayout
  fills?: Partial<Record<string, string>>
  fillDelay?: (s: StateShape) => number
  children?: ReactNode
}

/**
 * The plain map (no life) shared by the law scenes. Same layoutId in every
 * scene, so moving to a scene with another layout morphs it in place.
 */
export function LawMap({ layout, fills, fillDelay, children }: LawMapProps) {
  return (
    <motion.div
      layoutId="law-map"
      layout
      className="law-map"
      style={{ position: 'absolute', ...BOXES[layout] }}
      transition={{ layout: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } }}
    >
      <UsMap fills={fills} fillDelay={fillDelay}>
        {children}
      </UsMap>
    </motion.div>
  )
}
