import { C, SHADOW } from './shared'
import { Tag } from './Tag'

export function GrandCanyon() {
  return (
    <g>
      <ellipse className="lm-pulse" cx={0} cy={-2} rx={26} ry={9} fill="none" stroke="#ff2d55" strokeWidth={0.8} />
      <ellipse cx={0} cy={1} rx={24} ry={5} fill={SHADOW} />
      {/* iso mesa: left / right faces with strata, then the top */}
      <path d="M-22 -10 L0 -2 L0 3 L-22 -5 Z" fill="#c75b2b" />
      <path d="M0 -2 L22 -10 L22 -5 L0 3 Z" fill="#8f3d1d" />
      <path d="M-22 -8.4 L0 -0.4 M-22 -6.6 L0 1.4" stroke="#e8894c" strokeWidth={0.5} />
      <path d="M0 -0.4 L22 -8.4 M0 1.4 L22 -6.6" stroke="#b25330" strokeWidth={0.5} />
      <path d="M-22 -10 L0 -18 L22 -10 L0 -2 Z" fill="#e8955a" />
      {/* the canyon cut + Colorado river */}
      <path d="M-15 -12.5 L-9 -11 L-6 -14 L0 -12 L4 -10 L9 -12.5 L15 -9" fill="none" stroke="#7a2f16" strokeWidth={3.4} strokeLinejoin="round" />
      <path d="M-15 -12.5 L-9 -11 L-6 -14 L0 -12 L4 -10 L9 -12.5 L15 -9" fill="none" stroke={C.water} strokeWidth={0.8} strokeLinejoin="round" />
      {/* pin pointing at it */}
      <g className="lm-bounce">
        <path d="M0 -20 C-4 -25 -5 -28 -5 -30 A5 5 0 0 1 5 -30 C5 -28 4 -25 0 -20 Z" fill="#d4002a" />
        <circle cx={0} cy={-30} r={1.9} fill={C.white} />
        <Tag text="GRAND CANYON" y={-37} accent />
      </g>
    </g>
  )
}

export function OldFaithful() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={12} ry={3} fill={SHADOW} />
      <ellipse cx={0} cy={-1} rx={10} ry={3} fill="#d9d2c2" />
      <ellipse cx={0} cy={-1.4} rx={4} ry={1.2} fill="#6fc3e8" />
      <path className="geyser-jet" d="M-1.4 -1.4 C-2 -10 -1.8 -20 0 -28 C1.8 -20 2 -10 1.4 -1.4 Z" fill="rgba(235,248,255,0.9)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="geyser-steam" style={{ animationDelay: `${i * 0.35}s` }} cx={0} cy={-26} r={3.5} fill="rgba(255,255,255,0.5)" />
      ))}
      {[-9, -7, 8, 10].map((x) => (
        <path key={x} d={`M${x} -1 l-1.6 0 l1.6 -5.5 l1.6 5.5 z`} fill={C.grassShade} />
      ))}
    </g>
  )
}

export function Tornado() {
  return (
    <g className="tornado-wander">
      <ellipse cx={0} cy={0} rx={6} ry={1.6} fill={SHADOW} />
      <g className="tornado-sway">
        {Array.from({ length: 9 }, (_, i) => {
          const y = -i * 3.4
          const rx = 1.2 + i * 0.95
          return <ellipse key={i} cx={Math.sin(i * 0.9) * 0.8} cy={y} rx={rx} ry={rx * 0.3 + 0.6} fill={i % 2 ? '#8e8a93' : '#a9a5ad'} opacity={0.85} />
        })}
        <ellipse cx={0} cy={-30} rx={11} ry={3.6} fill="#76727c" opacity={0.9} />
      </g>
      <g className="tornado-debris">
        <rect x={5} y={-6} width={1.2} height={0.8} fill={C.wood} />
        <rect x={-6} y={-12} width={0.9} height={0.9} fill={C.wood} />
        <circle cx={7} cy={-17} r={0.5} fill={C.grass} />
      </g>
    </g>
  )
}

function Palm({ x = 0, h = 14, lean = 3, delay = 0 }) {
  const top = { x: x + lean, y: -h }
  return (
    <g className="palm-sway" style={{ animationDelay: `${delay}s` }}>
      <path d={`M${x} 0 Q${x + lean * 0.2} ${-h * 0.6} ${top.x} ${top.y}`} stroke="#8b5a2b" strokeWidth={1.3} fill="none" strokeLinecap="round" />
      {[-150, -110, -60, -20, 20].map((a) => {
        const rad = (a * Math.PI) / 180
        const ex = top.x + Math.cos(rad) * 7
        const ey = top.y + Math.sin(rad) * 4 + 2.5
        return (
          <path
            key={a}
            d={`M${top.x} ${top.y} Q${(top.x + ex) / 2} ${top.y - 3} ${ex} ${ey}`}
            stroke={a > -90 ? C.grassShade : C.grass}
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx={top.x} cy={top.y + 0.6} r={0.9} fill="#6b4220" />
    </g>
  )
}

export function Palms() {
  return (
    <g>
      <ellipse cx={0} cy={0.5} rx={13} ry={3} fill={SHADOW} />
      <ellipse cx={0} cy={-0.2} rx={12} ry={2.6} fill="#e8cf96" />
      <Palm x={-6} h={13} lean={-3} />
      <Palm x={1} h={17} lean={3} delay={0.6} />
      <Palm x={7} h={11} lean={2} delay={1.1} />
    </g>
  )
}

export function Volcano() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={18} ry={3.4} fill={SHADOW} />
      <path d="M-17 0 L-4 -16 L4 -16 L17 0 Z" fill="#5a4a44" />
      <path d="M0 -16 L4 -16 L17 0 L2 0 Z" fill="#3e322e" />
      <path d="M-1 -16 Q-2 -10 -6 -6 Q-8 -3 -10 0" stroke="#ff5a1f" strokeWidth={1.4} fill="none" className="lava-glow" />
      <ellipse cx={0} cy={-16} rx={4} ry={1.2} fill="#ff7a2b" className="lava-glow" />
      <circle cx={0} cy={-17} r={7} fill="url(#lm-glow)" className="lava-glow" />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="volcano-smoke" style={{ animationDelay: `${i * 1.6}s` }} cx={0} cy={-19} r={3.2} fill="rgba(160,150,150,0.55)" />
      ))}
    </g>
  )
}

export function Denali() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={26} ry={4} fill={SHADOW} />
      {[
        { x: -12, h: 16, w: 11 },
        { x: 9, h: 18, w: 12 },
        { x: -1, h: 26, w: 14 },
      ].map((m) => (
        <g key={m.x}>
          <path d={`M${m.x - m.w} 0 L${m.x} ${-m.h} L${m.x + m.w} 0 Z`} fill="#8a92a6" />
          <path d={`M${m.x} ${-m.h} L${m.x + m.w} 0 L${m.x + 1} 0 Z`} fill="#5e6578" />
          <path d={`M${m.x - m.w * 0.35} ${-m.h * 0.65} L${m.x} ${-m.h} L${m.x + m.w * 0.35} ${-m.h * 0.65} L${m.x + 1} ${-m.h * 0.7} Z`} fill={C.white} />
        </g>
      ))}
    </g>
  )
}

/** Northern lights: wide band, meant to sit above Alaska. */
export function Aurora() {
  return (
    <g className="aurora">
      <path d="M-60 0 C-40 -14 -20 6 0 -8 C20 -20 40 2 60 -10 L60 -22 C40 -10 20 -32 0 -20 C-20 -6 -40 -26 -60 -12 Z" fill="url(#lm-aurora)" />
    </g>
  )
}

export function Cactus() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={5} ry={1.4} fill={SHADOW} />
      <path d="M-1.3 0 V-13 A1.3 1.3 0 0 1 1.3 -13 V0 Z" fill="#4c9a5a" />
      <path d="M-1.3 -6 H-3.6 V-10 A1 1 0 0 1 -1.6 -10 V-7.6" fill="none" stroke="#4c9a5a" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M1.3 -8 H3.4 V-11.5" fill="none" stroke="#3c7d48" strokeWidth={1.8} strokeLinecap="round" />
    </g>
  )
}

export function Cloud({ scale = 1 }: { scale?: number }) {
  const shape = 'M-10 0 A5 5 0 0 1 -6 -6 A7 7 0 0 1 6 -7 A5 5 0 0 1 11 0 Z'
  return (
    <g transform={`scale(${scale})`}>
      <path d={shape} transform="translate(5 22) scale(1 0.5)" fill="rgba(0,0,0,0.28)" />
      <path d={shape} fill="rgba(244,240,232,0.82)" />
      <path d="M-10 0 H11 A5 5 0 0 0 9 -2.5 H-9.5 A5 5 0 0 0 -10 0 Z" fill="rgba(200,195,210,0.6)" />
    </g>
  )
}
