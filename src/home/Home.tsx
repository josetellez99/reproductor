import { useEffect } from 'react'
import { motion, type Variants } from 'motion/react'
import { startPlayback } from '../player/start'
import { navigate } from '../router'
import { MagneticButton } from './MagneticButton'
import './home.css'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function Home() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return
      const key = e.key.toLowerCase()
      if (key === 'p' || key === 'enter') startPlayback(0)
      else if (key === 't') navigate('/test')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className="home">
      <div className="home__grid" aria-hidden="true" />
      <div className="home__beam" aria-hidden="true" />
      <div className="home__glow" aria-hidden="true" />
      <div className="home__grain" aria-hidden="true" />

      <motion.section className="home__center" variants={container} initial="hidden" animate="show">
        <motion.div className="home__actions" variants={item}>
          <MagneticButton label="Let's go" onClick={() => startPlayback(0)} />
        </motion.div>
      </motion.section>
    </main>
  )
}
