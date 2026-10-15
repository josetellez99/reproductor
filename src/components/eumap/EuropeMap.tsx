import type { CSSProperties } from 'react'
import { COUNTRIES, EU_CENTER } from './geo'
import './eumap.css'

interface EuropeMapProps {
  /** Light up the EU (2018 members), sweeping west → east. */
  highlight?: boolean
  color?: string
}

/** Europe at canvas scale (1920×1080 viewBox). */
export function EuropeMap({ highlight = false, color = '#1f4fa8' }: EuropeMapProps) {
  return (
    <svg className="eumap" viewBox="0 0 1920 1080">
      <g className="eumap__countries">
        {COUNTRIES.map((c) => (
          <path
            key={c.id + c.name}
            d={c.d}
            data-eu={c.eu}
            style={
              {
                '--fill': highlight && c.eu ? color : c.eu ? '#1e1e27' : '#141419',
                transitionDelay: highlight && c.eu ? `${Math.max(0, (c.x - 700) / 1100) * 1.4}s` : '0s',
              } as CSSProperties
            }
          />
        ))}
      </g>
      <g className="eumap__stars" data-on={highlight} transform={`translate(${EU_CENTER[0]} ${EU_CENTER[1]})`}>
        <g className="eumap__ring">
          {Array.from({ length: 12 }, (_, k) => {
            const a = (k / 12) * Math.PI * 2
            return (
              <path
                key={k}
                transform={`translate(${Math.cos(a) * 330} ${Math.sin(a) * 330})`}
                d="M0 -16 L4.7 -6.5 L15.2 -4.9 L7.6 2.5 L9.4 12.9 L0 8 L-9.4 12.9 L-7.6 2.5 L-15.2 -4.9 L-4.7 -6.5 Z"
                fill="#ffcc33"
              />
            )
          })}
        </g>
      </g>
    </svg>
  )
}
