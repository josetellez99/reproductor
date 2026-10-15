/** Isometric data center, ~300×380 canvas px, base at (0,0) bottom-left. */
export function DataCenter({ mirror = false }: { mirror?: boolean }) {
  const racks = Array.from({ length: 4 }, (_, c) => c)
  const rows = Array.from({ length: 9 }, (_, r) => r)
  return (
    <g transform={mirror ? 'scale(-1 1) translate(-300 0)' : undefined}>
      <ellipse cx={160} cy={4} rx={170} ry={18} fill="rgba(0,0,0,0.45)" />
      {/* side face */}
      <path d="M220 0 L300 -40 V-330 L220 -290 Z" fill="#1b1b22" />
      {/* top face */}
      <path d="M0 -290 L80 -330 H300 L220 -290 Z" fill="#33333d" />
      {/* front face */}
      <rect x={0} y={-290} width={220} height={290} fill="#24242c" />
      <rect x={0} y={-290} width={220} height={10} fill="#3a3a46" />
      {/* racks */}
      {racks.map((c) => (
        <g key={c}>
          <rect x={16 + c * 50} y={-266} width={40} height={250} rx={3} fill="#15151b" />
          {rows.map((r) => (
            <g key={r}>
              <rect x={20 + c * 50} y={-258 + r * 27} width={32} height={20} rx={2} fill="#1f1f27" />
              <circle
                className="dc-led"
                style={{ animationDelay: `${((c * 7 + r * 3) % 11) * 0.17}s` }}
                cx={26 + c * 50}
                cy={-248 + r * 27}
                r={2.4}
                fill={(c + r) % 3 === 0 ? '#ff2d55' : '#2ee59d'}
              />
              <rect x={32 + c * 50} y={-249 + r * 27} width={16} height={2} rx={1} fill="#3a3a46" />
            </g>
          ))}
        </g>
      ))}
      {/* roof units */}
      <path d="M40 -300 L60 -310 H110 L90 -300 Z" fill="#4a4a56" />
      <path d="M140 -305 L160 -315 H200 L180 -305 Z" fill="#4a4a56" />
      <path d="M180 -312 V-370" stroke="#6a6a78" strokeWidth={3} />
      <circle className="dc-beacon" cx={180} cy={-374} r={5} fill="#ff2d55" />
      {/* side ports */}
      {[-230, -150, -70].map((y, i) => (
        <rect key={y} x={232} y={y - 8 - i * 2} width={30} height={16} rx={3} fill="#3a3a46" />
      ))}
    </g>
  )
}
