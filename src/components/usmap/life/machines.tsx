import { motion } from 'motion/react'
import { C, SHADOW } from './shared'

/** Red race car #95, side view, facing left (west). Base at y=0. */
export function RaceCar() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={10} ry={1.3} fill={SHADOW} />
      <g className="car-bob">
        {/* spoiler */}
        <rect x={9.2} y={-8.6} width={0.6} height={2.6} fill={C.crimsonShade} />
        <rect x={8.2} y={-9.4} width={3} height={0.9} rx={0.3} fill={C.crimsonShade} />
        {/* body */}
        <path
          d="M-10 -2.2 C-10 -4 -8.5 -4.8 -6 -5 L-3 -5.4 C-1.5 -7.6 1 -8.4 3.6 -8.2 C6 -8 7.5 -6.6 8.6 -5.4 L9.6 -5 C10.2 -4.6 10.4 -3.6 10.2 -2 L10 -1.2 L-9.6 -1.2 Z"
          fill={C.crimson}
        />
        <path d="M-9.9 -2.6 H10.2 L10 -1.2 H-9.6 Z" fill={C.crimsonShade} />
        {/* windshield with the eyes */}
        <path d="M-3 -5.4 C-1.6 -7.4 0.6 -8 2 -8 L2 -5.4 Z" fill={C.glass} />
        <ellipse cx={-0.3} cy={-6.4} rx={1.15} ry={0.9} fill="#fff" />
        <circle cx={-0.75} cy={-6.4} r={0.55} fill="#2a6fdb" />
        <circle cx={-0.85} cy={-6.4} r={0.25} fill="#111" />
        <path d="M2.6 -8 C5 -7.9 6.6 -6.8 7.6 -5.4 L2.6 -5.4 Z" fill="#1d1d25" />
        {/* bolt + 95 */}
        <path d="M-7.4 -3.4 L-1.2 -4.6 L-1.8 -3.8 L4.6 -4.8 L-0.6 -2.5 L0 -3.1 Z" fill={C.gold} />
        <text x={6.6} y={-2.9} textAnchor="middle" fontSize={2.6} fontWeight={800} fill="#fff" fontFamily="var(--font-sans)">
          95
        </text>
        {/* smile + headlight sticker */}
        <path d="M-9.7 -2.9 Q-8.6 -2 -7.4 -2.8" stroke="#3a0a10" strokeWidth={0.35} fill="none" />
        <ellipse cx={-9} cy={-3.9} rx={0.6} ry={0.4} fill={C.gold} />
      </g>
      {[-6.2, 6.4].map((x) => (
        <g key={x}>
          <circle cx={x} cy={-1.7} r={1.9} fill="#111" />
          <circle cx={x} cy={-1.7} r={0.85} fill={C.crimson} />
        </g>
      ))}
    </g>
  )
}

/** US route shield. */
export function RouteShield({ label = '66' }: { label?: string }) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={3} ry={0.8} fill={SHADOW} />
      <rect x={-0.35} y={-5} width={0.7} height={5} fill="#8d877c" />
      <path d="M-4 -13 h8 v1.4 q0 4.6 -4 6.6 q-4 -2 -4 -6.6 z" fill={C.white} stroke="#111" strokeWidth={0.5} />
      <text x={0} y={-8.3} textAnchor="middle" fontSize={3.6} fontWeight={800} fill="#111" fontFamily="var(--font-sans)">
        {label}
      </text>
    </g>
  )
}

/** Road along `d` with a race car driving it in a loop. */
export function Road({ d, dur = 26, carScale = 1 }: { d: string; dur?: number; carScale?: number }) {
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="#0d0d11"
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.4, ease: 'easeInOut' }}
      />
      <path d={d} fill="none" stroke="#33333d" strokeWidth={3.6} strokeLinecap="round" />
      <path className="road-dashes" d={d} fill="none" stroke={C.gold} strokeWidth={0.45} strokeDasharray="2 2" />
      <g>
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.03;0.97;1" dur={`${dur}s`} repeatCount="indefinite" />
        <g transform={`translate(0 1.4) scale(${carScale})`}>
          <RaceCar />
        </g>
      </g>
    </g>
  )
}

export function Rocket() {
  return (
    <g>
      <ellipse cx={0} cy={0.5} rx={10} ry={2.2} fill={SHADOW} />
      {/* pad */}
      <path d="M-8 -1 L0 -4 L8 -1 L0 2 Z" fill="#7a7a86" />
      <path d="M-8 -1 L0 2 L0 3.4 L-8 0.4 Z" fill="#5c5c66" />
      <path d="M0 2 L8 -1 L8 0.4 L0 3.4 Z" fill="#45454e" />
      {/* tower */}
      <g stroke="#9a9aa6" strokeWidth={0.4} fill="none">
        <rect x={4} y={-31} width={2.6} height={29} />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M4 ${-2 - i * 3.2} l2.6 -3.2 M4 ${-2 - i * 3.2 - 3.2} l2.6 3.2`} />
        ))}
      </g>
      <g className="rocket-smoke">
        <circle cx={-5} cy={-2} r={4} fill="rgba(220,215,210,0.85)" />
        <circle cx={4} cy={-1} r={4.6} fill="rgba(200,195,190,0.85)" />
        <circle cx={0} cy={-4} r={5} fill="rgba(235,230,225,0.9)" />
      </g>
      <g className="rocket-fly">
        <rect className="rocket-trail" x={-1.4} y={-5} width={2.8} height={70} fill="url(#lm-trail)" />
        <g className="rocket-flame">
          <path d="M-2.2 -5.2 Q0 5 2.2 -5.2 Z" fill={C.flame} />
          <path d="M-1.1 -5.2 Q0 0.8 1.1 -5.2 Z" fill="#fff1b8" />
        </g>
        {/* fins */}
        <path d="M-2.6 -10 L-5.2 -4.4 L-2.6 -5.4 Z" fill={C.crimson} />
        <path d="M2.6 -10 L5.2 -4.4 L2.6 -5.4 Z" fill={C.crimsonShade} />
        {/* body */}
        <rect x={-2.6} y={-25} width={2.6} height={20} fill={C.white} />
        <rect x={0} y={-25} width={2.6} height={20} fill={C.whiteShade} />
        <path d="M-2.6 -25 Q-2.6 -31 0 -34 L0 -25 Z" fill={C.white} />
        <path d="M0 -34 Q2.6 -31 2.6 -25 L0 -25 Z" fill={C.whiteShade} />
        <path d="M-1.1 -32.4 Q0 -33.6 1.1 -32.4 Z" fill={C.crimson} />
        <rect x={-2.6} y={-22} width={5.2} height={1.5} fill={C.crimson} />
        <circle cx={0} cy={-17.5} r={1.1} fill="#6fb6ff" stroke="#8d877c" strokeWidth={0.3} />
      </g>
    </g>
  )
}

function CubanFlag() {
  return (
    <g className="flag-wave">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={0} y={i * 0.6} width={5} height={0.6} fill={i % 2 ? '#fff' : '#1f4fa8'} />
      ))}
      <path d="M0 0 L2.4 1.5 L0 3 Z" fill="#d21f2b" />
      <circle cx={0.75} cy={1.5} r={0.32} fill="#fff" />
    </g>
  )
}

/** Balseros: makeshift raft with a sail and the Cuban flag. */
export function Raft() {
  const people = [
    { x: -6, shirt: '#e8b04a', skin: '#c68642' },
    { x: -2.6, shirt: '#4a90d9', skin: '#8d5524' },
    { x: 4.8, shirt: '#e05a5a', skin: '#e0ac69', waving: true },
  ]
  return (
    <g>
      <ellipse className="raft-ripple" cx={0} cy={-0.5} rx={12} ry={2.6} fill="none" stroke="rgba(190,225,255,0.55)" strokeWidth={0.5} />
      <g className="raft-bob">
        <ellipse cx={-5} cy={-0.8} rx={3.4} ry={1.3} fill="#1b1b1f" />
        <ellipse cx={5} cy={-0.8} rx={3.4} ry={1.3} fill="#1b1b1f" />
        <path d="M-8 -3.4 L8 -3.4 L9 -2.2 L-9 -2.2 Z" fill="#c08a52" />
        <path d="M-9 -2.2 L9 -2.2 L8 -0.9 L-8 -0.9 Z" fill={C.woodShade} />
        <path d="M-4 -3.4 L-4.4 -2.2 M0 -3.4 V-2.2 M4 -3.4 L4.4 -2.2" stroke={C.woodShade} strokeWidth={0.3} />
        {/* mast, sail, flag */}
        <path d="M1 -3.4 V-17" stroke={C.woodShade} strokeWidth={0.6} />
        <path d="M1.4 -15.6 L7.4 -6 L1.4 -5 Z" fill="#e9e1cf" />
        <path d="M3 -9 h1.6 v1.4 h-1.6 z" fill="#c9b99a" />
        <g transform="translate(1.3 -17)">
          <CubanFlag />
        </g>
        {people.map((p) => (
          <g key={p.x}>
            <rect x={p.x - 1} y={-6.4} width={2} height={3} rx={0.6} fill={p.shirt} />
            <circle cx={p.x} cy={-7.4} r={0.95} fill={p.skin} />
            {p.waving && <path className="arm-wave" d={`M${p.x + 0.8} -5.8 l1.6 -2.4`} stroke={p.skin} strokeWidth={0.6} strokeLinecap="round" />}
          </g>
        ))}
      </g>
    </g>
  )
}

/** Raft that sails along `d` (south → north) in a loop. */
export function RaftCrossing({ d, dur = 30, scale = 1 }: { d: string; dur?: number; scale?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(190,225,255,0.22)" strokeWidth={0.6} strokeDasharray="1 2.2" />
      <g>
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} repeatCount="indefinite" />
        <g transform={`scale(${scale})`}>
          <Raft />
        </g>
      </g>
    </g>
  )
}

/** Jet seen from above, nose to +x. */
function Jet() {
  return (
    <g>
      <path d="M0.6 0 L-1.4 -4.6 L-2.6 -4.6 L-1.6 0 L-2.6 4.6 L-1.4 4.6 Z" fill={C.whiteShade} />
      <path d="M-3.4 0 L-4.6 -1.9 L-5.1 -1.9 L-4.5 0 L-5.1 1.9 L-4.6 1.9 Z" fill={C.whiteShade} />
      <ellipse cx={-0.4} cy={0} rx={4.6} ry={0.85} fill={C.white} />
      <path d="M3.6 -0.5 Q4.6 0 3.6 0.5 Z" fill={C.crimson} />
    </g>
  )
}

export function Flight({ d, dur = 18, scale = 1 }: { d: string; dur?: number; scale?: number }) {
  return (
    <g>
      <path className="flight-trail" d={d} fill="none" stroke="rgba(244,240,232,0.3)" strokeWidth={0.6} strokeDasharray="3 3" />
      <g>
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} rotate="auto" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.95;1" dur={`${dur}s`} repeatCount="indefinite" />
        <g transform={`scale(${scale * 1.3})`}>
          <Jet />
        </g>
      </g>
    </g>
  )
}

export function Steamboat() {
  return (
    <g>
      <ellipse className="raft-ripple" cx={0} cy={0} rx={12} ry={2.4} fill="none" stroke="rgba(190,225,255,0.5)" strokeWidth={0.5} />
      <g className="boat-bob">
        <path d="M-9 -1.2 L8 -1.2 L7 1 L-7.6 1 Z" fill={C.white} />
        <path d="M-8.4 -0.2 H7.6" stroke={C.crimson} strokeWidth={0.6} />
        <rect x={-7} y={-4.2} width={12} height={3} fill={C.white} />
        <rect x={-5} y={-6.8} width={8} height={2.6} fill="#ebe5d9" />
        <path d="M-6 -2.8 h10" stroke="#5a5a66" strokeWidth={0.5} strokeDasharray="0.8 0.8" />
        {[-3.6, -1.2].map((x, i) => (
          <g key={x}>
            <rect x={x} y={-12.4} width={1.2} height={5.6} fill="#1b1b1f" />
            <path d={`M${x - 0.3} -12.4 h1.8`} stroke={C.gold} strokeWidth={0.5} />
            <circle className="stack-smoke" style={{ animationDelay: `${i * 0.9}s` }} cx={x + 0.6} cy={-14} r={1.6} fill="rgba(200,195,190,0.6)" />
          </g>
        ))}
        <g transform="translate(8.6 -2.2)">
          <g>
            <circle r={3} fill={C.crimsonShade} />
            <path d="M-3 0 H3 M0 -3 V3 M-2.1 -2.1 L2.1 2.1 M-2.1 2.1 L2.1 -2.1" stroke={C.crimson} strokeWidth={0.5} />
            <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="3s" repeatCount="indefinite" />
          </g>
        </g>
      </g>
    </g>
  )
}

export function CargoShip() {
  const boxes = [C.crimson, C.water, C.gold, C.white, C.crimsonShade, '#4caf6a']
  return (
    <g className="ship-cruise">
      <ellipse className="raft-ripple" cx={0} cy={0.4} rx={13} ry={2.4} fill="none" stroke="rgba(190,225,255,0.45)" strokeWidth={0.5} />
      <g className="boat-bob">
        <path d="M-11 -1.2 L11 -1.2 L9.4 1.4 L-9 1.4 Z" fill="#2a2a33" />
        <path d="M-10 0.4 L10.2 0.4 L9.4 1.4 L-9 1.4 Z" fill={C.crimsonShade} />
        {boxes.map((c, i) => (
          <rect key={i} x={-8.6 + i * 2.5} y={-3.6 - (i % 2) * 1.6} width={2.3} height={2.4 + (i % 2) * 1.6} fill={c} />
        ))}
        <rect x={7} y={-6.4} width={2.6} height={5.2} fill={C.white} />
        <rect x={7.4} y={-5.6} width={1.8} height={0.7} fill="#1d1d25" />
      </g>
    </g>
  )
}

export function Pumpjack() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={10} ry={2} fill={SHADOW} />
      <rect x={-9} y={-1} width={18} height={1.2} fill="#5c5c66" />
      <path d="M-2.2 -1 L0 -10 L2.2 -1" stroke="#45454e" strokeWidth={1} fill="none" />
      <rect x={4} y={-4.2} width={4.4} height={3.2} fill="#3e3e48" />
      <path d="M-11 -6 V-1" stroke="#8d877c" strokeWidth={0.4} />
      <g>
        <rect x={-9.5} y={-10.8} width={16} height={1.6} fill={C.gold} />
        <path d="M-9.5 -10.8 Q-12.6 -10 -11.8 -6.2 L-9.8 -6.2 Q-10.6 -8.6 -9.5 -9.2 Z" fill="#e0b52f" />
        <rect x={5} y={-10} width={2.4} height={4} fill="#3e3e48" />
        <circle cx={0} cy={-10} r={0.7} fill="#1b1b1f" />
        <animateTransform attributeName="transform" type="rotate" values="-11 0 -10; 11 0 -10; -11 0 -10" dur="2.6s" repeatCount="indefinite" />
      </g>
    </g>
  )
}

export function WindTurbine({ dur = 4 }: { dur?: number }) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={3} ry={0.8} fill={SHADOW} />
      <path d="M-0.7 0 L-0.3 -18 L0 -18 L0 0 Z" fill={C.white} />
      <path d="M0 0 L0 -18 L0.3 -18 L0.7 0 Z" fill={C.whiteShade} />
      <rect x={-0.6} y={-18.8} width={2.2} height={1.4} rx={0.4} fill={C.white} />
      <g transform="translate(0 -18.1)">
        <g>
          {[0, 120, 240].map((a) => (
            <path key={a} d="M0 0 L-0.55 -1.2 L0 -9.5 L0.65 -1.2 Z" fill={C.white} transform={`rotate(${a})`} />
          ))}
          <circle r={0.6} fill={C.whiteShade} />
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur={`${dur}s`} repeatCount="indefinite" />
        </g>
      </g>
    </g>
  )
}
