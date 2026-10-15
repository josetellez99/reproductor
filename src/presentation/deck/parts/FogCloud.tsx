import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface FogCloudProps {
  children: ReactNode
  /** Size in canvas px; centred on (cx, cy). */
  width?: number
  height?: number
  cx?: number
  cy?: number
}

/**
 * Dark blurred cloud that dims whatever is behind it (the map) and holds
 * content on top. Wrap in <AnimatePresence> to fade it in and out.
 */
export function FogCloud({ children, width = 1180, height = 640, cx = 960, cy = 420 }: FogCloudProps) {
  return (
    <motion.div
      className="fog"
      style={{ left: cx - width / 2, top: cy - height / 2, width, height }}
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(24px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(24px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="fog__mist" />
      <div className="fog__content">{children}</div>
    </motion.div>
  )
}
