import { useEffect, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { scenes } from '../presentation'
import { startPlayback } from '../player/start'
import { navigate } from '../router'
import { MadridStar } from '../ui/MadridStar'
import { GridIcon, PlayIcon, Rombo } from '../ui/icons'
import { MagneticButton } from './MagneticButton'
import './home.css'

const madridTime = new Intl.DateTimeFormat('es-ES', {
  timeZone: 'Europe/Madrid',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})
const madridZone = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Madrid',
  timeZoneName: 'short',
})

function useMadridClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const zone = madridZone.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? ''
  return { time: madridTime.format(now), zone }
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const pad = (n: number) => String(n).padStart(2, '0')

export function Home() {
  const { time, zone } = useMadridClock()

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
      <div className="home__postal" aria-hidden="true">
        28013
      </div>
      <div className="home__grain" aria-hidden="true" />

      <div className="hud hud--tl">
        <span className="hud__strong">
          <Rombo className="hud__rombo" /> ESCENA
        </span>
        <span>v0.1 · motor de presentaciones</span>
      </div>
      <div className="hud hud--tr">
        <span className="hud__strong">MAD {time}</span>
        <span>{zone} · Europe/Madrid</span>
      </div>
      <div className="hud hud--bl">
        <span className="hud__strong">KM 0 · PUERTA DEL SOL</span>
        <span>40.4168° N · 3.7038° W</span>
      </div>
      <div className="hud hud--br">
        <span className="hud__strong">
          <i className="hud__dot" /> {pad(scenes.length)} ESCENAS · LISTO
        </span>
        <span>→ avanza · ← retrocede</span>
      </div>

      <motion.section className="home__center" variants={container} initial="hidden" animate="show">
        <motion.div className="home__kicker" variants={item}>
          <Rombo className="home__kicker-rombo" />
          <span>Hecho en Madrid</span>
          <span className="home__kicker-sep" />
          <span>Escenas, no diapositivas</span>
        </motion.div>

        <motion.h1 className="home__title" variants={item}>
          Escena<span className="home__dot">.</span>
        </motion.h1>

        <motion.div className="home__actions" variants={item}>
          <MagneticButton
            variant="primary"
            icon={<PlayIcon />}
            label="Reproducir"
            hint="Pantalla completa"
            kbd="P"
            onClick={() => startPlayback(0)}
          />
          <MagneticButton
            variant="ghost"
            icon={<GridIcon />}
            label="Testear"
            hint="Grid de escenas"
            kbd="T"
            onClick={() => navigate('/test')}
          />
        </motion.div>

        <motion.div className="home__stars" variants={item} aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <MadridStar key={i} className="home__star" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </motion.div>
      </motion.section>
    </main>
  )
}
