import { C, SHADOW } from './shared'
import { Tag } from './Tag'

/* Second batch of state references. Same conventions as landmarks.tsx. */

export function GatewayArch() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={11} ry={2.2} fill={SHADOW} />
      <path d="M-9 0 Q-8.4 -34 0 -34 Q8.4 -34 9 0" fill="none" stroke="#e6e9ef" strokeWidth={2.2} />
      <path d="M0 -34 Q8.4 -34 9 0" fill="none" stroke="#9aa1ad" strokeWidth={2.2} />
    </g>
  )
}

export function LibertyBell() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={8} ry={1.8} fill={SHADOW} />
      <rect x={-7} y={-16} width={14} height={1.4} fill={C.woodShade} />
      <path d="M-1 -14.6 h2 v1.6 h-2z" fill="#6b5a3a" />
      <path d="M-5.4 -1 Q-5 -4 -4.2 -9 Q-3.6 -13 0 -13 Q3.6 -13 4.2 -9 Q5 -4 5.4 -1 Z" fill="#b98a3e" />
      <path d="M0 -13 Q3.6 -13 4.2 -9 Q5 -4 5.4 -1 L0 -1 Z" fill="#8a6428" />
      <rect x={-5.8} y={-2} width={11.6} height={1.4} rx={0.6} fill="#9a7230" />
      <path d="M0.6 -8 l-0.8 2 l0.9 1.2 l-0.6 1.8" stroke="#3a2a12" strokeWidth={0.4} fill="none" />
    </g>
  )
}

/** Wright Flyer, flying back and forth. */
export function WrightFlyer() {
  return (
    <g className="flyer-path">
      <ellipse cx={0} cy={6} rx={7} ry={1.2} fill="rgba(0,0,0,0.25)" />
      <g className="flyer-bob">
        <rect x={-9} y={-6} width={18} height={1} fill="#e9dcc0" />
        <rect x={-9} y={-1.6} width={18} height={1} fill="#d8c7a2" />
        <path d="M-6 -5 V-1.6 M0 -5 V-1.6 M6 -5 V-1.6" stroke={C.woodShade} strokeWidth={0.4} />
        <path d="M-9 -3.6 h-4 M-13 -5 v3" stroke={C.woodShade} strokeWidth={0.5} />
        <rect x={9} y={-4.6} width={3} height={0.8} fill="#e9dcc0" />
        <circle cx={-1} cy={-2.6} r={0.7} fill="#7a512b" />
      </g>
    </g>
  )
}

function Balloon({ color, shade, x = 0, delay = 0, size = 1 }: { color: string; shade: string; x?: number; delay?: number; size?: number }) {
  return (
    <g className="balloon-float" style={{ animationDelay: `${delay}s` }} transform={`translate(${x} 0) scale(${size})`}>
      <path d="M0 -24 C-6 -24 -7 -18 -6 -15 C-5 -12 -2 -10 -1.2 -8 L1.2 -8 C2 -10 5 -12 6 -15 C7 -18 6 -24 0 -24 Z" fill={color} />
      <path d="M0 -24 C6 -24 7 -18 6 -15 C5 -12 2 -10 1.2 -8 L0 -8 Z" fill={shade} />
      <path d="M-2 -23.4 Q-1 -16 -1.2 -8 M2 -23.4 Q1 -16 1.2 -8" stroke="rgba(255,255,255,0.45)" strokeWidth={0.5} fill="none" />
      <path d="M-1.2 -8 L-1 -6 M1.2 -8 L1 -6" stroke={C.woodShade} strokeWidth={0.3} />
      <rect x={-1.2} y={-6} width={2.4} height={1.8} fill={C.wood} />
    </g>
  )
}

export function Balloons() {
  return (
    <g>
      <Balloon color={C.crimson} shade={C.crimsonShade} x={-7} />
      <Balloon color={C.gold} shade="#d9a91c" x={3} delay={1.3} size={1.2} />
      <Balloon color="#5ad1ff" shade="#2b93c4" x={11} delay={2.4} size={0.8} />
    </g>
  )
}

export function Peach() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={6} ry={1.4} fill={SHADOW} />
      <circle cx={0} cy={-6} r={5.6} fill="#ffad6b" />
      <path d="M0 -11.6 A5.6 5.6 0 0 1 0 -0.4 A5.6 5.6 0 0 0 0 -11.6" fill="#f07c4a" />
      <path d="M0 -11.4 Q-0.6 -7 0 -1" stroke="#e8694a" strokeWidth={0.5} fill="none" />
      <path d="M0 -11.6 q0.6 -1.6 1.4 -2.2" stroke="#6b4220" strokeWidth={0.6} fill="none" />
      <path d="M1.2 -13 q3.6 -2 5 0.6 q-3 1.6 -5 -0.6z" fill={C.grass} />
    </g>
  )
}

export function Guitar() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={6} ry={1.4} fill={SHADOW} />
      <g transform="rotate(18 0 -10)">
        <rect x={-0.7} y={-26} width={1.4} height={14} fill="#5a3a1c" />
        <rect x={-1.4} y={-28.4} width={2.8} height={2.6} rx={0.5} fill="#3a2410" />
        <path d="M0 -13 C-4.8 -13 -5 -9.6 -3.6 -7.6 C-6 -5.6 -5.4 -0.6 0 -0.6 C5.4 -0.6 6 -5.6 3.6 -7.6 C5 -9.6 4.8 -13 0 -13 Z" fill="#e0a052" />
        <path d="M0 -13 C4.8 -13 5 -9.6 3.6 -7.6 C6 -5.6 5.4 -0.6 0 -0.6 Z" fill="#b97a34" />
        <circle cx={0} cy={-7} r={1.6} fill="#2a1a0c" />
        <path d="M-0.4 -26 V-3 M0.4 -26 V-3" stroke="#f4f0e8" strokeWidth={0.15} />
      </g>
      <Notes x={6} y={-20} />
    </g>
  )
}

function Notes({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1].map((i) => (
        <g key={i} className="note-float" style={{ animationDelay: `${i * 1.1}s` }}>
          <path d="M0 0 V-4 L2.6 -4.8 V-0.8" stroke={C.white} strokeWidth={0.45} fill="none" />
          <ellipse cx={-0.6} cy={0.2} rx={0.9} ry={0.65} fill={C.white} />
          <ellipse cx={2} cy={-0.6} rx={0.9} ry={0.65} fill={C.white} />
        </g>
      ))}
    </g>
  )
}

export function Horse() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={9} ry={1.6} fill={SHADOW} />
      <g className="horse-gallop">
        <path d="M-6 -1 L-5.4 -6 M-3.4 -1 L-3.8 -6 M3.6 -1 L4 -6 M6 -1 L5.6 -6" stroke="#5c3a1e" strokeWidth={0.9} strokeLinecap="round" />
        <path d="M-6.6 -9.6 Q-7 -6 -5 -5.6 L5.6 -5.6 Q7 -6 7 -8.4 Q6.6 -10.4 4 -10.4 L-4 -10.4 Q-6.4 -10.4 -6.6 -9.6 Z" fill="#8b5a2b" />
        <path d="M4.4 -10 L7 -15 Q8 -16 9.4 -15 L10.6 -12.6 Q10.6 -11.6 9.4 -11.8 L8.2 -12.6 L6.4 -8.6 Z" fill="#8b5a2b" />
        <path d="M5 -10.4 L7.4 -15.4" stroke="#2a1a0c" strokeWidth={0.9} />
        <path d="M-6.6 -9.4 Q-9.6 -9 -9.4 -5" stroke="#2a1a0c" strokeWidth={0.9} fill="none" />
        <circle cx={8.8} cy={-14.2} r={0.35} fill="#111" />
      </g>
    </g>
  )
}

export function CarFactory() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={15} ry={2.6} fill={SHADOW} />
      <path d="M-13 0 V-8 L-9 -11 V-8 L-5 -11 V-8 L-1 -11 V-8 L3 -11 V0 Z" fill="#6a6a78" />
      <path d="M-13 -8 L-9 -11 V-8 Z M-5 -11 V-8 L-9 -8Z" fill="#8a8a98" />
      <rect x={3} y={-14} width={10} height={14} fill="#4a4a56" />
      <rect x={6} y={-20} width={2} height={6} fill="#3a3a44" />
      <circle className="stack-smoke" cx={7} cy={-22} r={1.6} fill="rgba(200,195,190,0.6)" />
      {[-11, -7, -3, 1].map((x) => (
        <rect key={x} x={x} y={-6} width={2.4} height={2} fill={C.gold} opacity={0.8} />
      ))}
      <g transform="translate(8 -8)">
        <g>
          <circle r={3} fill={C.whiteShade} />
          {Array.from({ length: 8 }, (_, k) => (
            <rect key={k} x={-0.6} y={-4} width={1.2} height={1.6} fill={C.whiteShade} transform={`rotate(${k * 45})`} />
          ))}
          <circle r={1.1} fill="#4a4a56" />
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="6s" repeatCount="indefinite" />
        </g>
      </g>
      <g className="factory-car">
        <rect x={-14} y={-2.2} width={4.4} height={1.6} rx={0.6} fill={C.water} />
        <circle cx={-13} cy={-0.5} r={0.6} fill="#111" />
        <circle cx={-10.6} cy={-0.5} r={0.6} fill="#111" />
      </g>
    </g>
  )
}

export function Cheese() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={8} ry={1.8} fill={SHADOW} />
      <path d="M-7 -1 L-7 -7 L6 -10 L6 -4 Z" fill="#f7c948" />
      <path d="M6 -10 L8 -8 L8 -2 L6 -4 Z" fill="#d9a91c" />
      <path d="M-7 -7 L6 -10 L8 -8 L-5 -5.4 Z" fill="#ffe08a" />
      <circle cx={-3} cy={-3.6} r={1} fill="#d9a91c" />
      <circle cx={2} cy={-5.6} r={0.7} fill="#d9a91c" />
      <circle cx={0} cy={-2.6} r={0.5} fill="#d9a91c" />
    </g>
  )
}

export function Bison() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={9} ry={1.6} fill={SHADOW} />
      <path d="M-5.6 -1 V-4 M-3.6 -1 V-4 M4 -1 V-4 M6 -1 V-4" stroke="#2a1a0c" strokeWidth={1} strokeLinecap="round" />
      <path d="M-7 -6 Q-7 -9 -4 -9 L1 -9 Q3 -13 6 -12 Q9 -11 9 -7 Q9 -4 6.6 -3.6 L-5.4 -3.6 Q-7 -4 -7 -6 Z" fill="#5c3a1e" />
      <path d="M1 -9 Q3 -13 6 -12 Q9 -11 9 -7 L5 -6 Q3 -8 1 -9 Z" fill="#3e2612" />
      <path d="M8.4 -9.6 q1.2 -0.6 1 -1.8" stroke={C.white} strokeWidth={0.5} fill="none" />
      <circle cx={8} cy={-7.6} r={0.35} fill="#111" />
    </g>
  )
}

export function Arch() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={12} ry={2.2} fill={SHADOW} />
      <path d="M-11 0 V-9 Q-11 -17 0 -17 Q11 -17 11 -9 V0 H6 V-8 Q6 -12 0 -12 Q-6 -12 -6 -8 V0 Z" fill="#d9783f" />
      <path d="M11 -9 V0 H6 V-8 Q6 -12 0 -12 V-17 Q11 -17 11 -9 Z" fill="#a8532a" />
      <path d="M-11 -6 H-6 M6 -5 H11" stroke="#b8622f" strokeWidth={0.5} />
    </g>
  )
}

export function SkiMountain() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={15} ry={2.6} fill={SHADOW} />
      <path d="M-14 0 L-2 -22 L14 0 Z" fill="#8a92a6" />
      <path d="M-2 -22 L14 0 L2 0 Z" fill="#5e6578" />
      <path d="M-8 -11 L-2 -22 L4 -13.6 L1 -12 L-2 -14 L-5 -11 Z" fill={C.white} />
      <path d="M-11 -1 L-6 -7 L-2 -5 L2 -10" stroke="rgba(255,255,255,0.5)" strokeWidth={0.4} strokeDasharray="1 1" fill="none" />
      <g className="skier">
        <circle cx={0} cy={-0.6} r={0.7} fill={C.crimson} />
        <path d="M-1.2 0.4 h2.4" stroke="#111" strokeWidth={0.4} />
      </g>
    </g>
  )
}

export function Potato() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={7} ry={1.6} fill={SHADOW} />
      <path d="M-6.6 -4 Q-7 -8.4 -2 -8.6 Q2 -9.6 5.4 -8 Q7.4 -6 6.4 -3 Q5 -0.6 0 -1 Q-6 -0.6 -6.6 -4 Z" fill="#c9965a" />
      <path d="M5.4 -8 Q7.4 -6 6.4 -3 Q5 -0.6 0 -1 Q4 -3 5.4 -8 Z" fill="#a0723e" />
      <circle cx={-3} cy={-5} r={0.4} fill="#7a512b" />
      <circle cx={1.4} cy={-6.4} r={0.4} fill="#7a512b" />
      <circle cx={3} cy={-3.4} r={0.4} fill="#7a512b" />
    </g>
  )
}

export function RainyPines() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={10} ry={2} fill={SHADOW} />
      {[
        { x: -5, h: 13 },
        { x: 1, h: 17 },
        { x: 6, h: 11 },
      ].map((t) => (
        <g key={t.x}>
          <rect x={t.x - 0.5} y={-2} width={1} height={2} fill="#5c3a1e" />
          <path d={`M${t.x} ${-t.h} L${t.x - 3.6} -2 H${t.x + 3.6} Z`} fill={C.grassShade} />
          <path d={`M${t.x} ${-t.h} L${t.x + 3.6} -2 H${t.x} Z`} fill="#245e38" />
        </g>
      ))}
      <g transform="translate(0 -24)">
        <path d="M-7 0 A3 3 0 0 1 -4 -3.6 A4 4 0 0 1 4 -4 A3 3 0 0 1 7 0 Z" fill="#9aa1ad" />
        {[-5, -2, 1, 4].map((x, i) => (
          <path key={x} className="rain" style={{ animationDelay: `${i * 0.2}s` }} d={`M${x} 1 l-0.6 2`} stroke="#6fb6ff" strokeWidth={0.5} strokeLinecap="round" />
        ))}
      </g>
    </g>
  )
}

export function Lobster() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={8} ry={1.6} fill={SHADOW} />
      <g className="lobster-wave">
        <path d="M-6 -3 Q-6 -6 -2 -6 L4 -6 Q7 -5 7.6 -3 Q7 -1.4 4 -1.6 L-2 -1.6 Q-6 -1.6 -6 -3 Z" fill="#e2432c" />
        <path d="M-6 -3.8 L-9.4 -5.6 L-9 -2.6 Z" fill="#c03420" />
        <path d="M6 -5.4 Q8 -9 10 -8 Q11 -6.4 9 -6 Z M6 -2 Q9 0 10.6 -1.6 Q10 -3.4 8 -3 Z" fill="#c03420" />
        <path d="M-2 -6 V-1.6 M1 -6 V-1.6" stroke="#b02e1a" strokeWidth={0.4} />
        <circle cx={5.4} cy={-4.6} r={0.4} fill="#111" />
      </g>
    </g>
  )
}

export function Corn() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={6} ry={1.4} fill={SHADOW} />
      <path d="M-2.4 -2 Q-3.4 -10 0 -16 Q3.4 -10 2.4 -2 Z" fill="#ffd23f" />
      <path d="M0 -16 Q3.4 -10 2.4 -2 L0 -2 Z" fill="#e0b52f" />
      <path d="M-1.6 -12 h3.2 M-2.2 -9 h4.4 M-2.4 -6 h4.8" stroke="#d9a91c" strokeWidth={0.35} />
      <path d="M0 0 Q-6 -4 -5 -12 Q-3 -6 -1 -2 Z" fill={C.grass} />
      <path d="M0 0 Q6 -4 5 -12 Q3 -6 1 -2 Z" fill={C.grassShade} />
    </g>
  )
}

/** Silicon Valley: a chip with pulsing traces. */
export function Chip() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={11} ry={2.6} fill={SHADOW} />
      <g transform="translate(0 -8)">
        <path className="chip-traces" d="M-12 -4 H-7 M-12 0 H-7 M-12 4 H-7 M7 -4 H12 M7 0 H12 M7 4 H12 M-4 -9 V-6 M0 -9 V-6 M4 -9 V-6" stroke="#5ad1ff" strokeWidth={0.6} strokeDasharray="1.2 1.2" />
        <path d="M-7 -6 L7 -6 L7 6 L-7 6 Z" fill="#2a2a33" />
        <path d="M-7 4 L7 4 L7 6 L-7 6 Z" fill="#1b1b22" />
        <rect className="chip-core" x={-3.6} y={-3.6} width={7.2} height={6.4} rx={0.8} fill={C.crimson} />
        <path d="M-1.6 -1.6 h3.2 v2.4 h-3.2z" fill="none" stroke="#fff" strokeWidth={0.4} opacity={0.7} />
      </g>
      <Tag text="SILICON VALLEY" y={-17} />
    </g>
  )
}

export function Trumpet() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={8} ry={1.6} fill={SHADOW} />
      <g transform="translate(0 -6) rotate(-14)">
        <rect x={-8} y={-0.7} width={10} height={1.4} fill="#ffcc4d" />
        <path d="M2 -0.7 L7 -3.4 L7 3.4 L2 0.7 Z" fill="#ffcc4d" />
        <path d="M2 0.7 L7 3.4 L7 0 Z" fill="#d9a91c" />
        <path d="M-5 -0.7 v-2.4 M-3.4 -0.7 v-2.4 M-1.8 -0.7 v-2.4" stroke="#d9a91c" strokeWidth={0.6} />
        <rect x={-9.4} y={-0.9} width={1.6} height={1.8} rx={0.4} fill="#d9a91c" />
      </g>
      <Notes x={9} y={-12} />
    </g>
  )
}

export function Canoe() {
  return (
    <g>
      <ellipse cx={0} cy={-1} rx={12} ry={3.6} fill="#2d6fa3" />
      <ellipse cx={0} cy={-1.4} rx={10} ry={2.8} fill={C.water} />
      <g className="boat-bob">
        <path d="M-6 -2.4 Q0 0.4 6 -2.4 Q0 -1.4 -6 -2.4 Z" fill={C.crimson} />
        <circle cx={1} cy={-3.6} r={0.7} fill="#e0ac69" />
        <path d="M1 -3 v1" stroke={C.gold} strokeWidth={1} />
        <path d="M-0.6 -5 L3 0" stroke={C.wood} strokeWidth={0.4} />
      </g>
    </g>
  )
}

export function Surfer() {
  return (
    <g>
      <path d="M-10 0 Q-4 -1 0 -6 Q3 -9 6 -7 Q4 -5 4 -2 Q6 0 10 0 Z" fill="#3b8fd9" />
      <path d="M0 -6 Q3 -9 6 -7 Q4.6 -6.4 3.6 -5.4 Z" fill={C.white} />
      <g className="surfer-ride">
        <path d="M-3 -4 L2 -5.6" stroke={C.gold} strokeWidth={0.9} strokeLinecap="round" />
        <circle cx={-0.4} cy={-8.4} r={0.7} fill="#c68642" />
        <path d="M-0.4 -7.8 V-6 M-1.8 -7 H1 M-0.4 -6 L-1.4 -4.6 M-0.4 -6 L0.8 -5" stroke="#c68642" strokeWidth={0.45} strokeLinecap="round" />
      </g>
    </g>
  )
}
