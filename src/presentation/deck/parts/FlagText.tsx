import { useId } from 'react'
import { motion } from 'motion/react'

interface FlagTextProps {
  text: string
  /** Rendered width and height in canvas px. */
  width: number
  height: number
  delay?: number
}

const STRIPES = 13
const RED = '#c8102e'
const BLUE = '#1f3f8f'

/** Text filled with the US flag: stripes, plus the blue canton with stars on the first letters. */
export function FlagText({ text, width, height, delay = 0 }: FlagTextProps) {
  const id = useId().replace(/:/g, '')
  const stripeH = height / STRIPES
  const cantonW = width * 0.36
  const cantonH = stripeH * 7
  const stars: [number, number][] = []
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 12; c++) {
      if ((r + c) % 2) continue
      stars.push([cantonW * ((c + 0.75) / 12.5), cantonH * ((r + 0.7) / 5.4)])
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <clipPath id={`clip-${id}`}>
          <text
            x={width / 2}
            y={height * 0.84}
            textAnchor="middle"
            textLength={width}
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-sans)"
            fontWeight={700}
            fontSize={height * 1.02}
            letterSpacing="-0.02em"
          >
            {text}
          </text>
        </clipPath>
        <linearGradient id={`shine-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.g
        clipPath={`url(#clip-${id})`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {Array.from({ length: STRIPES }, (_, i) => (
          <rect key={i} x={0} y={i * stripeH} width={width} height={stripeH + 0.5} fill={i % 2 ? '#f4f0e8' : RED} />
        ))}
        <rect x={0} y={0} width={cantonW} height={cantonH} fill={BLUE} />
        {stars.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={stripeH * 0.32} fill="#fff" />
        ))}
        <rect className="flag-shine" x={-width * 0.3} y={0} width={width * 0.3} height={height} fill={`url(#shine-${id})`} />
      </motion.g>
    </svg>
  )
}
