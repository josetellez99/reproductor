import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { Backdrop, Kicker } from '../kit'
import { ease } from '../palette'

// Example companies, smallest to largest (illustrative revenues).
const COMPANIES = [
  { name: 'Corner shop', revenue: '$0.4M', w: 90, h: 60 },
  { name: 'Startup', revenue: '$3M', w: 100, h: 95 },
  { name: 'Local chain', revenue: '$12M', w: 120, h: 130 },
  { name: 'Mid-size', revenue: '$40M', w: 130, h: 175 },
  { name: 'Big retailer', revenue: '$2B', w: 150, h: 225 },
  { name: 'Big Tech', revenue: '$300B', w: 170, h: 280 },
]
const COVERED_FROM = 3
const GROUND = 735

const PLACED = COMPANIES.map((c, i) => ({
  ...c,
  i,
  x: 170 + COMPANIES.slice(0, i).reduce((sum, p) => sum + p.w + 70, 0),
}))
const THRESHOLD_X = PLACED[COVERED_FROM].x - 35

const usd = new Intl.NumberFormat('en-US')

function Count({ to, prefix = '', duration = 1.8 }: { to: number; prefix?: string; duration?: number }) {
  const v = useMotionValue(0)
  const text = useTransform(v, (n) => prefix + usd.format(Math.round(n)))
  useEffect(() => {
    const c = animate(v, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [v, to, duration])
  return <motion.span>{text}</motion.span>
}

function CcpaStandard() {
  const line = useAfter(1700)
  const covered = useAfter(2300)
  const cards = useAfter(2900)

  return (
    <div className="s-root">
      <Backdrop />
      <div className="std-head">
        <Kicker>The California model</Kicker>
        <motion.h2 className="s-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          The CCPA became the standard<span className="s-accent">.</span>
        </motion.h2>
        <motion.p className="s-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          It applies by <b className="s-accent">company size</b>, not by sector.
        </motion.p>
      </div>

      <svg className="std-city" viewBox="0 0 1920 1080">
        <line x1={120} x2={1800} y1={GROUND} y2={GROUND} stroke="rgba(242,239,233,0.2)" strokeWidth={2} />
        {PLACED.map((c) => {
          const on = covered && c.i >= COVERED_FROM
          return (
            <motion.g
              key={c.name}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.6 + c.i * 0.15, duration: 0.6, ease }}
              style={{ originY: 1 }}
            >
              <motion.rect
                x={c.x}
                y={GROUND - c.h}
                width={c.w}
                height={c.h}
                animate={{ fill: on ? '#c8102e' : '#2a2a33' }}
                transition={{ delay: (c.i - COVERED_FROM) * 0.15, duration: 0.5 }}
              />
              <path d={`M${c.x + c.w} ${GROUND - c.h} l18 -12 v${c.h} l-18 12 z`} fill={on ? '#8a0b1f' : '#1b1b22'} style={{ transition: 'fill 0.5s' }} />
              {Array.from({ length: Math.floor(c.h / 34) }, (_, r) =>
                Array.from({ length: Math.floor(c.w / 34) }, (_, k) => (
                  <rect key={`${r}-${k}`} x={c.x + 12 + k * 34} y={GROUND - c.h + 14 + r * 34} width={18} height={14} rx={2} fill={on ? '#ff8fa3' : '#3e3e4a'} opacity={0.6} />
                )),
              )}
              <text x={c.x + c.w / 2} y={GROUND + 34} textAnchor="middle" className="std-name">
                {c.name}
              </text>
              <text x={c.x + c.w / 2} y={GROUND + 62} textAnchor="middle" className="std-rev">
                {c.revenue}/yr
              </text>
            </motion.g>
          )
        })}
        {line && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.line
              x1={THRESHOLD_X}
              x2={THRESHOLD_X}
              y1={GROUND + 10}
              y2={430}
              stroke="#ff2d55"
              strokeWidth={3}
              strokeDasharray="10 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
            <rect x={THRESHOLD_X - 90} y={392} width={180} height={40} rx={20} fill="#ff2d55" />
            <text x={THRESHOLD_X} y={419} textAnchor="middle" className="std-threshold">
              $26M / year
            </text>
          </motion.g>
        )}
        {covered && (
          <motion.text x={1560} y={470} textAnchor="middle" className="std-covered" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            COVERED BY THE CCPA →
          </motion.text>
        )}
      </svg>

      {cards && (
        <motion.div className="std-cards" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <div className="std-card">
            <small>Annual revenue over</small>
            <b>
              <Count to={26_000_000} prefix="$" />
            </b>
          </div>
          <span className="std-or">OR</span>
          <div className="std-card">
            <small>Data of more than</small>
            <b>
              <Count to={100_000} /> Californians
            </b>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default defineScene({
  id: 'ccpa-standard',
  title: 'CCPA · by company size',
  component: CcpaStandard,
  transition: 'fade',
  notes:
    'The CCPA has become the standard for data privacy protection laws. It does not apply by sector but by company size: the California model covers companies that earn more than 26 million dollars per year or have data of more than 100,000 Californians. (Exact figure: $26,625,000 since 2025, adjusted for inflation. A third trigger: companies that make most of their revenue selling personal data.)',
})
