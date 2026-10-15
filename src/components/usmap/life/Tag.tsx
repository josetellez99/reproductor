interface TagProps {
  text: string
  /** Vertical offset of the tag above the base. */
  y?: number
  accent?: boolean
}

/** Small mono label floating above a place. */
export function Tag({ text, y = -10, accent = false }: TagProps) {
  const w = text.length * 2.45 + 7
  return (
    <g className="lm-tag" transform={`translate(0 ${y})`}>
      <rect
        x={-w / 2}
        y={-7}
        width={w}
        height={7}
        rx={3.5}
        fill={accent ? '#d4002a' : 'rgba(10,10,13,0.85)'}
        stroke={accent ? 'none' : 'rgba(242,239,233,0.25)'}
        strokeWidth={0.4}
      />
      <text
        y={-2.3}
        textAnchor="middle"
        fontSize={3.6}
        fontFamily="var(--font-mono)"
        fontWeight={600}
        letterSpacing={0.4}
        fill="#f4f0e8"
      >
        {text}
      </text>
    </g>
  )
}
