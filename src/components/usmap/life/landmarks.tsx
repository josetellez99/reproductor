import { C, SHADOW, quadY } from './shared'

/* Static-ish buildings and monuments. Small loops via CSS classes in life.css. */

export function StatueOfLiberty() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={17} ry={5} fill={SHADOW} />
      <ellipse cx={0} cy={-1.5} rx={15} ry={5} fill="#2f6b45" />
      <ellipse cx={0} cy={-2.2} rx={13} ry={4} fill="#43915e" />
      {/* star-fort pedestal */}
      <path d="M-7 -3 L0 -1.5 L0 -16 L-6 -17 Z" fill={C.stone} />
      <path d="M0 -1.5 L7 -3 L6 -17 L0 -16 Z" fill={C.stoneShade} />
      <path d="M-6 -17 L0 -16 L6 -17 L0 -18 Z" fill="#ece5d8" />
      {/* robe */}
      <path d="M-4.2 -17 L0 -16.5 L0 -32 L-3 -31 Z" fill={C.copper} />
      <path d="M0 -16.5 L4.2 -17 L3 -31 L0 -32 Z" fill={C.copperShade} />
      {/* tablet */}
      <path d="M-3 -27 L-5.6 -25 L-4.6 -21.6 L-2.4 -23.8 Z" fill="#5fb59e" />
      {/* raised arm + torch */}
      <path d="M1.8 -30 L4.6 -42 L6.2 -41.6 L3.6 -29.5 Z" fill={C.copperShade} />
      <path d="M4 -42.2 h3.4 l-0.9 2 h-1.6 z" fill="#c9a24a" />
      {/* head + crown */}
      <circle cx={0.3} cy={-34} r={2.6} fill="#6cc2aa" />
      <path
        d="M-2.6 -35.2 l-2 -1.4 M-1.4 -36.4 l-1 -2 M0.3 -36.8 v-2.3 M2 -36.4 l1 -2 M3.2 -35.2 l2 -1.4"
        stroke="#8fe0c8"
        strokeWidth={0.8}
        strokeLinecap="round"
      />
      <g className="lm-flame">
        <circle cx={5.7} cy={-45.5} r={5} fill="url(#lm-glow)" />
        <path d="M5.7 -49 C7.7 -46.4 7.3 -43.8 5.7 -43.1 C4.1 -43.8 3.7 -46.4 5.7 -49Z" fill={C.flame} />
        <path d="M5.7 -46.8 C6.6 -45.2 6.4 -44 5.7 -43.5 C5 -44 4.8 -45.2 5.7 -46.8Z" fill="#fff1b8" />
      </g>
    </g>
  )
}

const ggSuspenders = Array.from({ length: 9 }, (_, i) => -12 + i * 3)

export function GoldenGate() {
  return (
    <g>
      <ellipse cx={0} cy={1} rx={34} ry={3} fill={SHADOW} />
      {/* piers */}
      <rect x={-16} y={-4} width={4} height={4} fill="#7d7a73" />
      <rect x={12} y={-4} width={4} height={4} fill="#7d7a73" />
      {/* towers */}
      {[-14, 14].map((x) => (
        <g key={x}>
          <rect x={x - 1.6} y={-29} width={1.2} height={25} fill={C.orange} />
          <rect x={x + 0.4} y={-29} width={1.2} height={25} fill={C.orangeShade} />
          {[-27.5, -21, -14].map((y) => (
            <rect key={y} x={x - 1.6} y={y} width={3.2} height={0.9} fill={C.orangeShade} />
          ))}
        </g>
      ))}
      {/* cables */}
      <path
        d="M-34 -5.5 Q-22 -10 -14 -28.5 Q0 -6 14 -28.5 Q22 -10 34 -5.5"
        fill="none"
        stroke={C.orange}
        strokeWidth={0.7}
      />
      {ggSuspenders.map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={quadY(x, -14, 14, -28.5, -6)}
          y2={-5}
          stroke={C.orange}
          strokeWidth={0.25}
          opacity={0.8}
        />
      ))}
      {/* deck */}
      <rect x={-35} y={-5.6} width={70} height={2.4} fill={C.orangeShade} />
      <rect x={-35} y={-5.6} width={70} height={0.8} fill="#f07050" />
      {/* traffic */}
      <g className="gg-cars-a">
        <rect x={-30} y={-6.6} width={2.2} height={1.2} rx={0.4} fill={C.white} />
        <rect x={-14} y={-6.6} width={2.2} height={1.2} rx={0.4} fill={C.gold} />
      </g>
      <g className="gg-cars-b">
        <rect x={24} y={-6.6} width={2.2} height={1.2} rx={0.4} fill="#6fb6ff" />
        <rect x={6} y={-6.6} width={2.2} height={1.2} rx={0.4} fill={C.white} />
      </g>
      {/* Karl the fog */}
      <g className="lm-fog">
        <ellipse cx={-22} cy={-8} rx={12} ry={3} fill="rgba(255,255,255,0.18)" />
        <ellipse cx={-8} cy={-6} rx={9} ry={2.4} fill="rgba(255,255,255,0.14)" />
      </g>
    </g>
  )
}

export function SpaceNeedle() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={8} ry={2.4} fill={SHADOW} />
      <path d="M-5.5 0 L-0.9 -24 M5.5 0 L0.9 -24 M0 1 L0 -24" stroke={C.whiteShade} strokeWidth={1} />
      <path d="M-3.3 -12 h6.6" stroke={C.whiteShade} strokeWidth={0.8} />
      <rect x={-1} y={-36} width={1} height={13} fill={C.white} />
      <rect x={0} y={-36} width={1} height={13} fill={C.whiteShade} />
      {/* saucer */}
      <ellipse cx={0} cy={-35.6} rx={7.4} ry={2} fill="#8d877c" />
      <ellipse cx={0} cy={-36.6} rx={8.4} ry={2.2} fill={C.white} />
      <ellipse cx={0} cy={-37} rx={6.6} ry={1.5} fill={C.glass} opacity={0.75} />
      <ellipse cx={0} cy={-38.6} rx={4.2} ry={1.2} fill={C.gold} />
      <path d="M0 -39.5 V-47" stroke={C.white} strokeWidth={0.6} />
      <circle className="lm-blink" cx={0} cy={-47.5} r={0.9} fill={C.crimson} />
    </g>
  )
}

export function HollywoodSign() {
  return (
    <g>
      <ellipse cx={0} cy={0.5} rx={27} ry={3.5} fill={SHADOW} />
      <path d="M-27 0 Q-16 -17 -2 -14 Q12 -19 27 0 Z" fill={C.grass} />
      <path d="M-2 -14 Q12 -19 27 0 L6 0 Q8 -8 -2 -14 Z" fill={C.grassShade} />
      <text
        x={0}
        y={-8.4}
        textAnchor="middle"
        fontSize={4.6}
        fontWeight={800}
        fontFamily="var(--font-sans)"
        letterSpacing={0.5}
        fill={C.white}
        transform="rotate(-3)"
      >
        HOLLYWOOD
      </text>
    </g>
  )
}

export function VegasSign() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={10} ry={2.4} fill={SHADOW} />
      <rect x={-1} y={-11} width={1} height={11} fill={C.whiteShade} />
      <rect x={0} y={-11} width={1} height={11} fill="#8d877c" />
      <path d="M-15 -19 L0 -25 L15 -19 L15 -14 L0 -9 L-15 -14 Z" fill={C.white} />
      <path
        className="lm-bulbs"
        d="M-15 -19 L0 -25 L15 -19 L15 -14 L0 -9 L-15 -14 Z"
        fill="none"
        stroke={C.gold}
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeDasharray="0.01 1.8"
      />
      <text x={0} y={-18.6} textAnchor="middle" fontSize={2.2} fontWeight={700} fill={C.crimsonShade} fontFamily="var(--font-sans)">
        WELCOME TO FABULOUS
      </text>
      <text x={0} y={-13.4} textAnchor="middle" fontSize={5.2} fontWeight={800} fill={C.crimson} fontFamily="var(--font-sans)">
        LAS VEGAS
      </text>
      <path className="lm-blink" d="M0 -30 l1 2.2 2.4 0.3 -1.8 1.6 0.5 2.4 -2.1 -1.2 -2.1 1.2 0.5 -2.4 -1.8 -1.6 2.4 -0.3 z" fill={C.gold} />
    </g>
  )
}

export function Capitol() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={20} ry={3.6} fill={SHADOW} />
      {/* wings */}
      <rect x={-17} y={-7} width={34} height={7} fill={C.white} />
      <rect x={-17} y={-1.6} width={34} height={1.6} fill={C.whiteShade} />
      <path
        d="M-15 -6 v4 M-12 -6 v4 M-9 -6 v4 M9 -6 v4 M12 -6 v4 M15 -6 v4"
        stroke={C.whiteShade}
        strokeWidth={0.6}
      />
      {/* centre block + portico */}
      <rect x={-7} y={-12} width={14} height={5} fill="#ebe5d9" />
      <path d="M-7 -12 L0 -15 L7 -12 Z" fill={C.white} />
      {/* drum + dome */}
      <rect x={-5} y={-19} width={10} height={4} fill={C.white} />
      <path d="M-4 -19 v4 M-2 -19 v4 M0 -19 v4 M2 -19 v4 M4 -19 v4" stroke={C.whiteShade} strokeWidth={0.5} />
      <path d="M-5.6 -19 A5.6 7 0 0 1 5.6 -19 Z" fill="#fbf8f1" />
      <path d="M0 -26 A5.6 7 0 0 1 5.6 -19 L0 -19 Z" fill={C.whiteShade} />
      <rect x={-0.9} y={-29} width={1.8} height={3.2} fill={C.white} />
      <path d="M0 -29 V-31.5" stroke={C.whiteShade} strokeWidth={0.6} />
    </g>
  )
}

const skyline = [
  { x: -16, w: 5, h: 14, c: '#3a3a46' },
  { x: -10.5, w: 5, h: 22, c: '#4a4a58' },
  { x: -5, w: 6, h: 38, c: '#22222a', willis: true },
  { x: 1.5, w: 5, h: 27, c: '#5a5a6a' },
  { x: 7, w: 4.5, h: 18, c: '#3e3e4b' },
  { x: 12, w: 5, h: 31, c: '#2e2e38', antenna: true },
]

export function ChicagoSkyline() {
  return (
    <g>
      <ellipse cx={0} cy={0.5} rx={21} ry={3.4} fill={SHADOW} />
      {skyline.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={-b.h} width={b.w} height={b.h} fill={b.c} />
          <path d={`M${b.x + b.w} ${-b.h} l1.6 -1.2 v${b.h} l-1.6 1.2 z`} fill="#15151b" />
          {Array.from({ length: Math.floor(b.h / 4) }, (_, k) => (
            <rect
              key={k}
              className={(i + k) % 4 === 0 ? 'lm-window' : undefined}
              x={b.x + 1}
              y={-b.h + 2 + k * 4}
              width={b.w - 2}
              height={1}
              fill={(i + k) % 3 === 0 ? C.gold : 'rgba(255,210,63,0.25)'}
            />
          ))}
          {b.willis && <path d={`M${b.x + 1.6} ${-b.h} v-6 M${b.x + 4.2} ${-b.h} v-6`} stroke="#8d8d99" strokeWidth={0.5} />}
          {b.antenna && <path d={`M${b.x + b.w / 2} ${-b.h} v-5`} stroke="#8d8d99" strokeWidth={0.5} />}
        </g>
      ))}
    </g>
  )
}

export function MountRushmore() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={18} ry={3.6} fill={SHADOW} />
      <path d="M-17 0 L-11 -15 L-4 -20 L4 -21 L11 -16 L17 0 Z" fill={C.rock} />
      <path d="M4 -21 L11 -16 L17 0 L5 0 Z" fill={C.rockShade} />
      {/* four faces */}
      {[-8.5, -3.2, 1.8, 6.6].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={-11.5 - (i === 1 ? 1 : 0)} rx={2.1} ry={3} fill="#bdb6a8" />
          <path d={`M${x - 1} ${-12.2} h0.7 M${x + 0.3} ${-12.2} h0.7`} stroke={C.rockShade} strokeWidth={0.4} />
        </g>
      ))}
      {/* pines */}
      {[-14, -11, 12, 15].map((x) => (
        <path key={x} d={`M${x} 0 l-1.8 0 l1.8 -5 l1.8 5 z`} fill={C.grassShade} />
      ))}
    </g>
  )
}

export function Lighthouse() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={7} ry={2} fill={SHADOW} />
      <path d="M-6 0 Q-4 -3 0 -3 Q4 -3 6 0 Z" fill={C.rockShade} />
      <path d="M-2.6 -2 L-1.6 -18 L1.6 -18 L2.6 -2 Z" fill={C.white} />
      <path d="M-2.3 -7 L2.3 -7 L2.1 -10 L-2.1 -10 Z M-1.9 -13 L1.9 -13 L1.8 -16 L-1.8 -16 Z" fill={C.crimson} />
      <path d="M0 -18 L1.6 -18 L2.6 -2 L0 -2 Z" fill="rgba(0,0,0,0.18)" />
      <rect x={-1.8} y={-21} width={3.6} height={3} fill={C.gold} />
      <path d="M-2.2 -21 L0 -23.5 L2.2 -21 Z" fill={C.crimsonShade} />
      {/* beam sweeps left ↔ right: a flip on X fakes the 3D rotation */}
      <g transform="translate(0 -19.5)">
        <g>
          <path d="M0 0 L-28 -4.5 L-28 4.5 Z" fill="url(#lm-beam)" />
          <animateTransform attributeName="transform" type="scale" values="1 1; -1 1; 1 1" dur="4s" repeatCount="indefinite" />
        </g>
      </g>
    </g>
  )
}
