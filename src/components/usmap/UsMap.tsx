import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { BORDERS_PATH, MAP_VIEWBOX, NATION_PATH, STATES, type StateShape, type ViewBox } from './geo'
import './usmap.css'

interface UsMapProps {
  /** Layers drawn on top of the base map, in map space (use <Place>). */
  children?: ReactNode
  /** Visible area in map space. Changing it animates (zoom / pan). */
  viewBox?: ViewBox
  /** Fill per state name, e.g. { Texas: '#d4002a' }. */
  fills?: Partial<Record<string, string>>
  /** Seconds to delay each state's fill change: makes highlights sweep. See `sweepWestToEast`. */
  fillDelay?: (state: StateShape) => number
  onStateClick?: (name: string) => void
  onStateHover?: (name: string | null) => void
  className?: string
}

// Flat base: a few close dark tones so neighbouring states read apart.
const TONES = ['#18181f', '#1b1b23', '#1e1e27', '#16161c']

const toViewBox = (v: ViewBox) => `${v.x} ${v.y} ${v.width} ${v.height}`

/** Flat map of the United States with every state border. */
export function UsMap({
  children,
  viewBox = MAP_VIEWBOX,
  fills,
  fillDelay,
  onStateClick,
  onStateHover,
  className,
}: UsMapProps) {
  const interactive = !!(onStateClick || onStateHover)

  return (
    <motion.svg
      className={className ? `usmap ${className}` : 'usmap'}
      initial={false}
      animate={{ viewBox: toViewBox(viewBox) }}
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      preserveAspectRatio="xMidYMid meet"
      data-interactive={interactive}
    >
      <defs>
        <pattern id="usmap-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="0.55" fill="rgba(242,239,233,0.08)" />
        </pattern>
        <filter id="usmap-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect className="usmap__ocean" x={-400} y={-300} width={1800} height={1200} fill="url(#usmap-dots)" />
      <path className="usmap__halo" d={NATION_PATH} filter="url(#usmap-blur)" />

      <g className="usmap__states">
        {STATES.map((s, i) => (
          <path
            key={s.id}
            d={s.d}
            style={
              {
                '--fill': fills?.[s.name] ?? TONES[i % TONES.length],
                transitionDelay: fillDelay ? `${fillDelay(s)}s` : undefined,
              } as CSSProperties
            }
            data-highlight={!!fills?.[s.name]}
            onClick={onStateClick && (() => onStateClick(s.name))}
            onPointerEnter={onStateHover && (() => onStateHover(s.name))}
            onPointerLeave={onStateHover && (() => onStateHover(null))}
          >
            <title>{s.name}</title>
          </path>
        ))}
      </g>
      <path className="usmap__borders" d={BORDERS_PATH} />
      <path className="usmap__coast" d={NATION_PATH} />

      {children}
    </motion.svg>
  )
}
