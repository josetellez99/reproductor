import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { STAGE_H, STAGE_W } from './stage'
import './stage.css'

interface StageProps {
  children: ReactNode
  className?: string
}

/**
 * Fixed 1920×1080 canvas scaled (letterboxed) to its parent.
 * The canvas is a motion element on purpose: Motion then knows about the
 * scale and layout animations inside it stay correct at any size.
 */
export function Stage({ children, className }: StageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scale = box.w && box.h ? Math.min(box.w / STAGE_W, box.h / STAGE_H) : 0

  return (
    <div ref={ref} className={className ? `stage ${className}` : 'stage'}>
      {scale > 0 && (
        <motion.div
          className="stage-canvas"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            originX: 0,
            originY: 0,
            scale,
            x: (box.w - STAGE_W * scale) / 2,
            y: (box.h - STAGE_H * scale) / 2,
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}
