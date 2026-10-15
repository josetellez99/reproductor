import { AnimatePresence, motion } from 'motion/react'

export interface Milestone {
  year: number
  label: string
  /** Stem height level, to keep close years from overlapping. */
  level?: number
  accent?: boolean
  /** 'left': label grows rightwards from the stem; 'right': it grows leftwards. Default depends on position. */
  align?: 'left' | 'right'
}

interface TimelineProps {
  items: Milestone[]
  from?: number
  to?: number
  /** Animate the axis in. False when continuing from a previous scene. */
  appear?: boolean
}

const LEFT = 90
const WIDTH = 1740
const AXIS_Y = 1010

/** Full-width timeline along the bottom of the canvas. */
export function Timeline({ items, from = 1970, to = 2026, appear = true }: TimelineProps) {
  const x = (year: number) => LEFT + ((year - from) / (to - from)) * WIDTH
  const decades = []
  for (let y = Math.ceil(from / 10) * 10; y <= to; y += 10) decades.push(y)

  return (
    <motion.div
      layoutId="timeline"
      className="tl"
      initial={appear ? { opacity: 0, y: 60 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="tl__axis" style={{ left: LEFT, width: WIDTH, top: AXIS_Y }} />
      {decades.map((d) => (
        <div key={d} className="tl__tick" style={{ left: x(d), top: AXIS_Y }}>
          <span>{d}</span>
        </div>
      ))}
      <div className="tl__tick tl__tick--end" style={{ left: x(to), top: AXIS_Y }}>
        <span>{to}</span>
      </div>

      <AnimatePresence initial={appear}>
        {items.map((m) => {
          const stem = 46 + (m.level ?? 0) * 42
          const left = x(m.year)
          return (
            <motion.div
              key={`${m.year}-${m.label}`}
              className="tl__item"
              data-accent={m.accent ?? false}
              data-align={m.align ?? (left > 1480 ? 'right' : 'left')}
              style={{ left, top: AXIS_Y }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.35 } }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <span className="tl__dot" />
              <span className="tl__stem" style={{ height: stem }} />
              <span className="tl__label" style={{ bottom: stem }}>
                <b>{m.year}</b>
                {m.label}
              </span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}
