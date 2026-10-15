import { motion } from 'motion/react'
import { stateCentroid } from '../../../components/usmap'

interface StateLabelProps {
  state: string
  text: string
  /** Offset of the pill from the state's centroid, in map units. */
  dx?: number
  dy?: number
  delay?: number
}

/** Dot on the state + leader line + pill. Lives inside <UsMap> (map units). */
export function StateLabel({ state, text, dx = 0, dy = -60, delay = 0 }: StateLabelProps) {
  const [x, y] = stateCentroid(state)
  const w = text.length * 8.6 + 28
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <motion.path
        d={`M${x} ${y} L${x + dx} ${y + dy}`}
        stroke="#ff2d55"
        strokeWidth={1.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.4 }}
      />
      <circle cx={x} cy={y} r={4} fill="#fff" stroke="#ff2d55" strokeWidth={2} />
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.3, type: 'spring', stiffness: 260, damping: 18 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <rect x={x + dx - w / 2} y={y + dy - 15} width={w} height={30} rx={15} fill="#0a0a0d" stroke="#ff2d55" strokeWidth={1.6} />
        <text x={x + dx} y={y + dy + 5.5} textAnchor="middle" fontSize={15} fontWeight={600} fontFamily="var(--font-sans)" fill="#f4f0e8">
          {text}
        </text>
      </motion.g>
    </motion.g>
  )
}
