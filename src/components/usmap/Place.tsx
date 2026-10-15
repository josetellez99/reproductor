import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { project, type LonLat } from './geo'

interface PlaceProps {
  /** [longitude, latitude]. The child's (0,0) lands here. */
  at?: LonLat
  /** Or directly in map space (e.g. stateCentroid('Texas')). */
  xy?: [number, number]
  scale?: number
  /** Pop-in delay in seconds. */
  delay?: number
  children: ReactNode
}

/** Pins a drawing (whose base sits at 0,0) to a geographic point. */
export function Place({ at, xy, scale = 1, delay = 0, children }: PlaceProps) {
  const [x, y] = xy ?? (at ? project(at) : [0, 0])
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale})`}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, type: 'spring', stiffness: 240, damping: 16 }}
        style={{ originX: 0.5, originY: 1 }}
      >
        {children}
      </motion.g>
    </g>
  )
}
