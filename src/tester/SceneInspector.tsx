import { useCallback, useState } from 'react'
import { SceneRenderer } from '../engine/SceneRenderer'
import { Stage } from '../engine/Stage'
import { useDeck, useDeckKeyboard } from '../engine/useDeck'
import { scenes } from '../presentation'
import { startPlayback } from '../player/start'
import { navigate } from '../router'
import { ArrowLeft, ArrowRight, GridIcon, PlayIcon, ReplayIcon } from '../ui/icons'
import './tester.css'

const pad = (n: number) => String(n).padStart(2, '0')
const backToGrid = () => navigate('/test')

export function SceneInspector({ index }: { index: number }) {
  const total = scenes.length
  const current = Math.min(index, total - 1)
  const onChange = useCallback((i: number) => navigate(`/test/${i}`, { replace: true }), [])
  const deck = useDeck(current, total, onChange)
  // Bumping the key remounts the renderer: the scene plays again from zero.
  const [run, setRun] = useState(0)

  useDeckKeyboard(deck, backToGrid)

  const scene = scenes[current]

  return (
    <div className="inspector">
      <header className="tester__bar">
        <button type="button" className="tool-btn" onClick={backToGrid}>
          <GridIcon /> Grid
        </button>
        <div className="tester__title">
          <span className="tester__label">
            Escena {pad(current + 1)} / {pad(total)} · {scene.id}
          </span>
          <h1>{scene.title}</h1>
        </div>
        <div className="inspector__tools">
          <button type="button" className="tool-btn" onClick={() => deck.prev()} title="Anterior (←)">
            <ArrowLeft />
          </button>
          <button type="button" className="tool-btn" onClick={() => deck.next()} title="Siguiente (→)">
            <ArrowRight />
          </button>
          <button type="button" className="tool-btn" onClick={() => setRun((r) => r + 1)} title="Repetir escena">
            <ReplayIcon /> Repetir
          </button>
          <button type="button" className="tool-btn primary" onClick={() => startPlayback(current)}>
            <PlayIcon /> Desde aquí
          </button>
        </div>
      </header>

      <div className="inspector__body">
        <div className="inspector__stage">
          <Stage>
            <SceneRenderer key={run} scenes={scenes} deck={deck} mode="test" />
          </Stage>
        </div>

        <aside className="inspector__side">
          <section>
            <h2 className="inspector__heading">Notas</h2>
            <p className="inspector__notes">{scene.notes ?? 'Sin notas.'}</p>
          </section>
          <section>
            <h2 className="inspector__heading">Escenas</h2>
            <ol className="inspector__list">
              {scenes.map((s, i) => (
                <li key={s.id}>
                  <button type="button" data-active={i === current} onClick={() => deck.goTo(i)}>
                    <span className="mono">{pad(i + 1)}</span> {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </section>
          <p className="inspector__keys mono">→ / Espacio siguiente · ← anterior · Esc grid</p>
        </aside>
      </div>
    </div>
  )
}
