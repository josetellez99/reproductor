import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useScene } from '../../../engine'

const usd = new Intl.NumberFormat('en-US')

/** Number that ticks from 0 to `to` on mount (lands instantly in thumbnails). */
export function Count({ to, prefix = '', duration = 1.8 }: { to: number; prefix?: string; duration?: number }) {
  const { mode } = useScene()
  const v = useMotionValue(mode === 'thumb' ? to : 0)
  const text = useTransform(v, (n) => prefix + usd.format(Math.round(n)))
  useEffect(() => {
    const c = animate(v, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [v, to, duration])
  return <motion.span>{text}</motion.span>
}
