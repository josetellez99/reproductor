/**
 * Blocky everyman (Minecraft-like proportions: head 8, body 12, limbs 4×12)
 * with fake-3D side faces. Drawn in "pixel units": 16 wide × 32 tall,
 * origin at the top-left of the front face. Holds a glowing phone.
 */

const SKIN = '#c4906a'
const SKIN_SHADE = '#9c6e4f'
const HAIR = '#4a2f1b'
const HAIR_TOP = '#5e3c23'
const SHIRT = '#2b9e9b'
const SHIRT_SHADE = '#1f7472'
const PANTS = '#3b4fa0'
const PANTS_SHADE = '#2b3a78'
const SHOES = '#55555f'

const D = { x: 2.4, y: -1.6 } // depth offset for side / top faces

function side(x: number, y: number, h: number, fill: string) {
  return <path d={`M${x} ${y} L${x + D.x} ${y + D.y} V${y + D.y + h} L${x} ${y + h} Z`} fill={fill} />
}

function top(x: number, y: number, w: number, fill: string) {
  return <path d={`M${x} ${y} L${x + D.x} ${y + D.y} H${x + w + D.x} L${x + w} ${y} Z`} fill={fill} />
}

export function Steve() {
  return (
    <g className="steve">
      {/* shadow */}
      <ellipse cx={8.6} cy={32.2} rx={9} ry={1.4} fill="rgba(0,0,0,0.45)" />

      {/* legs */}
      {side(12, 20, 12, PANTS_SHADE)}
      <rect x={4} y={20} width={8} height={12} fill={PANTS} />
      <rect x={4} y={30} width={8} height={2} fill={SHOES} />
      <path d="M8 21 V30" stroke={PANTS_SHADE} strokeWidth={0.25} />

      {/* body */}
      <g className="steve-breathe">
        {top(4, 8, 8, SHIRT)}
        <rect x={4} y={8} width={8} height={12} fill={SHIRT} />
        <path d="M6.5 8 L8 9.6 L9.5 8 Z" fill={SKIN} />
        <rect x={4} y={18.6} width={8} height={1.4} fill={SHIRT_SHADE} />

        {/* left arm (viewer's left) */}
        {top(0, 8, 4, SHIRT)}
        <rect x={0} y={8} width={4} height={4} fill={SHIRT} />
        <rect x={0} y={12} width={4} height={8} fill={SKIN} />
        <rect x={3.2} y={8} width={0.8} height={12} fill="rgba(0,0,0,0.15)" />

        {/* right arm, bent to hold the phone */}
        {side(16, 8, 6, SHIRT_SHADE)}
        {top(12, 8, 4, SHIRT)}
        <rect x={12} y={8} width={4} height={4} fill={SHIRT} />
        <rect x={12} y={12} width={4} height={2.4} fill={SKIN} />
        <rect x={9.6} y={13.4} width={6.4} height={2.4} fill={SKIN_SHADE} />

        {/* phone */}
        <rect x={9.8} y={11} width={2.8} height={4.8} rx={0.4} fill="#16161c" />
        <rect className="steve-screen" x={10.1} y={11.4} width={2.2} height={3.8} rx={0.2} fill="#7fd4ff" />
        <circle className="steve-screen-glow" cx={11.2} cy={13.3} r={4.2} fill="url(#steve-glow)" />
      </g>

      {/* head, slightly tilted towards the phone */}
      <g className="steve-head">
        {side(12, 0, 8, SKIN_SHADE)}
        <path d={`M12 0 L${12 + D.x} ${D.y} V${D.y + 2} L12 2 Z`} fill={HAIR} />
        {top(4, 0, 8, HAIR_TOP)}
        <rect x={4} y={0} width={8} height={8} fill={SKIN} />
        <rect x={4} y={0} width={8} height={2} fill={HAIR} />
        <rect x={4} y={2} width={1} height={1} fill={HAIR} />
        <rect x={11} y={2} width={1} height={1} fill={HAIR} />
        {/* eyes */}
        <rect x={5} y={4} width={1} height={1} fill="#f4f0e8" />
        <rect x={6} y={4} width={1} height={1} fill="#4b3fb0" />
        <rect x={9} y={4} width={1} height={1} fill="#4b3fb0" />
        <rect x={10} y={4} width={1} height={1} fill="#f4f0e8" />
        {/* nose + mouth */}
        <rect x={7} y={5} width={2} height={1} fill={SKIN_SHADE} />
        <rect x={6} y={6} width={4} height={1} fill="#6d4a33" />
      </g>
    </g>
  )
}
