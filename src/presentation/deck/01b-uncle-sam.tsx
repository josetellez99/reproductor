import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { ease } from '../palette'
import bust from '../../assets/uncle-sam.webp'

const NAVY = '#0e162a'
const BLUE = '#37729a'
const RED = '#d93a2b'
const CREAM = '#f1ead6'
const INK = '#0a1020'

// Star polygon centred on (0,0), outer radius 1.
const STAR = '0,-1 0.235,-0.324 0.951,-0.309 0.38,0.124 0.588,0.809 0,0.4 -0.588,0.809 -0.38,0.124 -0.951,-0.309 -0.235,-0.324'

const COAT_STARS = [
  { x: 560, y: 1010, s: 16 },
  { x: 604, y: 1120, s: 13 },
  { x: 575, y: 1235, s: 15 },
  { x: 630, y: 1290, s: 11 },
]

/** The illustrated bust, extended downwards with a drawn coat, striped trousers and shoes. */
function UncleSamFigure() {
  return (
    <svg className="uncle-sam__figure" viewBox="0 0 854 1900" role="img" aria-label="Uncle Sam pointing at the viewer">
      <defs>
        <pattern id="us-stripes" width="48" height="48" patternUnits="userSpaceOnUse">
          <rect width="48" height="48" fill={CREAM} />
          <rect width="24" height="48" fill={RED} />
        </pattern>
        <linearGradient id="us-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.82" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="us-bust-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="854" height="894">
          <rect width="854" height="894" fill="url(#us-fade)" />
        </mask>
        <linearGradient id="us-coat" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={NAVY} />
          <stop offset="0.6" stopColor="#13203d" />
          <stop offset="1" stopColor="#1b3a5f" />
        </linearGradient>
      </defs>

      {/* trousers */}
      <g stroke={INK} strokeWidth="5" strokeLinejoin="round">
        <path d="M236 1250 L400 1250 L394 1790 L250 1790 Z" fill="url(#us-stripes)" />
        <path d="M414 1250 L598 1250 L586 1790 L420 1790 Z" fill="url(#us-stripes)" />
        {/* shoes */}
        <path d="M248 1780 L396 1780 L400 1846 L166 1852 Q158 1806 248 1780 Z" fill={NAVY} />
        <path d="M418 1780 L584 1780 Q672 1802 666 1852 L414 1846 Z" fill={NAVY} />
      </g>

      {/* shirt wedge and coat */}
      <path
        d="M118 690 L690 690 Q650 880 640 1000 Q640 1000 612 1120 Q632 1240 650 1350 Q420 1395 196 1350 Q216 1240 210 1120 Q180 880 118 690 Z"
        fill="url(#us-coat)"
        stroke={INK}
        strokeWidth="5"
      />
      <path d="M420 690 L566 690 L502 1200 Z" fill={CREAM} />
      <path d="M502 1200 L496 1370" stroke={INK} strokeWidth="4" />
      {/* lapel brushwork */}
      <g fill={BLUE} opacity="0.85">
        <path d="M560 840 Q640 900 626 1020 Q600 940 540 880 Z" />
        <path d="M590 1040 Q640 1120 614 1260 Q590 1170 570 1090 Z" />
        <path d="M230 900 Q300 980 262 1100 Q236 1000 210 930 Z" opacity="0.6" />
      </g>
      <g fill={CREAM}>
        {COAT_STARS.map(({ x, y, s }) => (
          <polygon key={`${x}-${y}`} points={STAR} transform={`translate(${x} ${y}) scale(${s})`} />
        ))}
      </g>

      {/* bust illustration, faded into the coat at the bottom edge */}
      <image href={bust} x="0" y="0" width="854" height="894" mask="url(#us-bust-mask)" />
    </svg>
  )
}

function UncleSam() {
  return (
    <div className="s-root uncle-sam">
      <motion.div
        style={{ height: '80%', display: 'grid', placeItems: 'center' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
      >
        <UncleSamFigure />
      </motion.div>
    </div>
  )
}

export default defineScene({
  id: 'uncle-sam',
  title: 'Uncle Sam',
  component: UncleSam,
  transition: 'fade',
  notes: 'Uncle Sam: the personification of the United States government.',
})
