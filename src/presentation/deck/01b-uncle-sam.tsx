import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { palette, ease } from '../palette'

const STAR = '300,120 304.5,131.5 316.8,132.2 307.3,140 310.4,152 300,145.2 289.6,152 292.7,140 283.2,132.2 295.5,131.5'

/** Near full-body silhouette of Uncle Sam: top hat, goatee, frock coat, pointing arm. */
function UncleSamSilhouette() {
  return (
    <svg className="uncle-sam__figure" viewBox="0 0 600 1000" role="img" aria-label="Uncle Sam silhouette">
      <defs>
        <linearGradient id="us-fill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
          <stop offset="0" stopColor={palette.ink} />
          <stop offset="1" stopColor="#bdb9b1" />
        </linearGradient>
      </defs>
      <g fill="url(#us-fill)">
        {/* hat */}
        <path d="M240 32 Q300 14 360 32 L368 158 L232 158 Z" />
        <path d="M188 154 Q300 140 412 154 Q420 178 300 184 Q180 178 188 154 Z" />
        {/* head, hair, goatee, neck */}
        <ellipse cx="300" cy="226" rx="50" ry="56" />
        <path d="M252 190 Q226 200 232 236 Q226 262 248 262 Q244 232 256 214 Z" />
        <path d="M348 190 Q374 200 368 236 Q374 262 352 262 Q356 232 344 214 Z" />
        <path d="M270 262 Q300 254 330 262 Q318 300 308 340 L300 372 L292 340 Q282 300 270 262 Z" />
        <rect x="284" y="272" width="32" height="48" />
        {/* coat with tails */}
        <path d="M205 324 Q300 296 395 324 Q410 400 402 500 Q396 560 400 612 L432 728 Q300 750 168 728 L200 612 Q204 560 198 500 Q190 400 205 324 Z" />
        {/* legs and shoes */}
        <path d="M212 700 L298 700 L290 956 L222 956 Z" />
        <path d="M302 700 L388 700 L378 956 L310 956 Z" />
        <path d="M214 950 L292 950 L294 984 L168 986 Q166 962 214 950 Z" />
        <path d="M308 950 L386 950 Q434 962 432 986 L306 984 Z" />
        {/* hanging arm */}
        <path d="M204 322 Q166 332 156 364 L146 556 L186 564 L216 404 Z" />
        <ellipse cx="166" cy="586" rx="22" ry="30" />
        {/* pointing arm */}
        <path d="M392 316 L498 288 L508 330 L404 376 Z" />
        <ellipse cx="526" cy="304" rx="28" ry="25" />
        <path d="M540 292 L584 292 Q594 297 584 304 L540 308 Z" />
        <ellipse cx="520" cy="278" rx="12" ry="9" />
      </g>
      {/* hat band + star, cut out of the silhouette */}
      <rect x="233" y="118" width="134" height="36" fill="#000" />
      <polygon points={STAR} fill={palette.ink} />
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
        <UncleSamSilhouette />
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
