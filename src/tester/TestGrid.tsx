import { useEffect } from 'react'
import { motion } from 'motion/react'
import { scenes } from '../presentation'
import { startPlayback } from '../player/start'
import { navigate } from '../router'
import { ArrowLeft, PlayIcon } from '../ui/icons'
import { Thumbnail } from './Thumbnail'
import './tester.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function TestGrid() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="tester">
      <header className="tester__bar">
        <button type="button" className="tool-btn" onClick={() => navigate('/')}>
          <ArrowLeft /> Inicio
        </button>
        <div className="tester__title">
          <span className="tester__label">Modo test</span>
          <h1>
            Escenas <span className="tester__count">{pad(scenes.length)}</span>
          </h1>
        </div>
        <button type="button" className="tool-btn primary" onClick={() => startPlayback(0)}>
          <PlayIcon /> Reproducir
        </button>
      </header>

      <main className="tester__grid">
        {scenes.map((scene, i) => (
          <motion.button
            key={scene.id}
            type="button"
            className="card"
            onClick={() => navigate(`/test/${i}`)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
          >
            <Thumbnail scene={scene} index={i} total={scenes.length} />
            <span className="card__meta">
              <span className="card__num">{pad(i + 1)}</span>
              <span className="card__title">{scene.title}</span>
              <span className="card__tag">{typeof scene.transition === 'object' ? 'custom' : (scene.transition ?? 'fade')}</span>
            </span>
          </motion.button>
        ))}
      </main>
    </div>
  )
}
