import { motion } from 'motion/react'

/* Small visuals for the three CCPA rights. viewBox 240×140. */

const INK = '#f4f0e8'
const MUTED = '#4a4852'
const CRIMSON = '#e3122c'

const FIELDS = ['Name · Jose', 'Location · Madrid', 'Purchases · 128', 'Interests · tech']

/** Right to know: a magnifier reveals what the company has on you. */
export function KnowVisual() {
  return (
    <svg viewBox="0 0 240 140" className="right-visual">
      <rect x={20} y={10} width={170} height={120} rx={12} fill="#1d1d25" stroke="#3a3a46" />
      <circle cx={46} cy={36} r={13} fill={MUTED} />
      <circle cx={46} cy={32} r={5} fill={INK} />
      <path d="M37 45 a9 7 0 0 1 18 0" fill={INK} />
      {FIELDS.map((f, i) => (
        <g key={f}>
          <rect x={68} y={24 + i * 24} width={104} height={12} rx={4} fill={MUTED} />
          <motion.text
            x={70}
            y={34 + i * 24}
            fontSize={11}
            fontFamily="var(--font-mono)"
            fill={INK}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.35 }}
          >
            {f}
          </motion.text>
        </g>
      ))}
      <motion.g initial={{ x: 0, y: 0 }} animate={{ x: [0, 40, 80, 40], y: [0, 24, 48, 72] }} transition={{ duration: 1.8, ease: 'easeInOut' }}>
        <circle cx={120} cy={30} r={20} fill="rgba(90,209,255,0.12)" stroke="#5ad1ff" strokeWidth={4} />
        <path d="M134 45 l20 20" stroke="#5ad1ff" strokeWidth={7} strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

/** Right to delete: data rows drop into the bin. */
export function DeleteVisual() {
  return (
    <svg viewBox="0 0 240 140" className="right-visual">
      {[0, 1, 2].map((i) => (
        <rect key={i} className="drop-row" style={{ animationDelay: `${i * 0.6}s` }} x={96} y={10} width={48} height={14} rx={5} fill={['#5ad1ff', '#ffd23f', '#a970ff'][i]} />
      ))}
      <g className="bin-lid">
        <rect x={78} y={58} width={84} height={8} rx={3} fill="#8b8893" />
        <rect x={110} y={52} width={20} height={6} rx={2} fill="#8b8893" />
      </g>
      <path d="M84 68 h72 l-7 64 h-58 z" fill="#3a3a46" />
      <path d="M104 80 v40 M120 80 v40 M136 80 v40" stroke="#5a5a66" strokeWidth={4} strokeLinecap="round" />
    </svg>
  )
}

/** Right to opt out: "Don't sell my data" stamp blocks the sale. */
export function NoSaleVisual() {
  return (
    <svg viewBox="0 0 240 140" className="right-visual">
      <rect x={40} y={34} width={110} height={84} rx={8} fill="#1d1d25" stroke="#3a3a46" />
      <path d="M40 46 h40 l8 -12 h-48 z" fill="#2a2a33" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={54} y={60 + i * 16} width={80} height={8} rx={3} fill="#4a4852" />
      ))}
      <g className="price-swing">
        <path d="M158 24 h46 l14 18 -14 18 h-46 z" fill="#ffd23f" />
        <circle cx={166} cy={42} r={4} fill="#1d1d25" />
        <text x={186} y={49} fontSize={20} fontWeight={800} fill="#1d1d25" fontFamily="var(--font-sans)">
          $
        </text>
      </g>
      <motion.g
        initial={{ scale: 2.4, opacity: 0, rotate: -4 }}
        animate={{ scale: 1, opacity: 1, rotate: -12 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 380, damping: 16 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <rect x={50} y={64} width={150} height={40} rx={6} fill="none" stroke={CRIMSON} strokeWidth={4} />
        <text x={125} y={91} textAnchor="middle" fontSize={17} fontWeight={800} letterSpacing={1} fill={CRIMSON} fontFamily="var(--font-sans)">
          DON'T SELL
        </text>
      </motion.g>
    </svg>
  )
}
