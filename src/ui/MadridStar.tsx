import type { SVGProps } from 'react'

// Six-pointed star from the flag of Madrid: 12 vertices alternating
// between the outer radius and the inner one (R / √3).
const R = 50
const points = Array.from({ length: 12 }, (_, k) => {
  const r = k % 2 === 0 ? R : R / Math.sqrt(3)
  const a = ((-90 + k * 30) * Math.PI) / 180
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`
}).join(' ')

export function MadridStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <polygon points={points} fill="currentColor" />
    </svg>
  )
}
