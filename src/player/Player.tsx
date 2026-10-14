import { useCallback, useEffect, useRef, useState } from 'react'
import { exitFullscreen, enterFullscreen, useFullscreenExit, useIsFullscreen } from '../engine/fullscreen'
import { SceneRenderer } from '../engine/SceneRenderer'
import { Stage } from '../engine/Stage'
import { useDeck, useDeckKeyboard } from '../engine/useDeck'
import { scenes } from '../presentation'
import { navigate } from '../router'
import { ArrowLeft, ArrowRight, CloseIcon, ExpandIcon } from '../ui/icons'
import './player.css'

const IDLE_MS = 2200

function useIdle() {
  const [idle, setIdle] = useState(false)
  const timer = useRef(0)
  const wake = useCallback(() => {
    setIdle(false)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setIdle(true), IDLE_MS)
  }, [])
  useEffect(() => {
    timer.current = window.setTimeout(() => setIdle(true), IDLE_MS)
    return () => window.clearTimeout(timer.current)
  }, [])
  return { idle, wake }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function Player({ index }: { index: number }) {
  const total = scenes.length
  const current = Math.min(index, total - 1)
  const onChange = useCallback((i: number) => navigate(`/play/${i}`, { replace: true }), [])
  const deck = useDeck(current, total, onChange)
  const isFullscreen = useIsFullscreen()
  const { idle, wake } = useIdle()

  const exit = useCallback(() => {
    exitFullscreen()
    navigate('/')
  }, [])

  useDeckKeyboard(deck, exit)
  useFullscreenExit(exit)

  const isLast = current === total - 1
  const onNextClick = () => {
    if (!deck.next() && isLast) exit()
  }

  return (
    <div className="player" data-idle={idle} onPointerMove={wake}>
      <Stage className="player__stage">
        <SceneRenderer scenes={scenes} deck={deck} mode="play" />
      </Stage>

      <div className="player__controls">
        <div className="player__top">
          {!isFullscreen && (
            <button type="button" className="player__icon-btn" onClick={() => void enterFullscreen()} title="Pantalla completa">
              <ExpandIcon />
            </button>
          )}
          <button type="button" className="player__icon-btn" onClick={exit} title="Salir (Esc)">
            <CloseIcon />
          </button>
        </div>

        <div className="player__bottom">
          <div className="player__progress" aria-hidden="true">
            {scenes.map((s, i) => (
              <span key={s.id} className="player__seg" data-state={i < current ? 'done' : i === current ? 'now' : 'todo'} />
            ))}
          </div>
          <span className="player__count">
            {pad(current + 1)} / {pad(total)}
          </span>
          <button
            type="button"
            className="player__prev"
            onClick={() => deck.prev()}
            disabled={current === 0}
            aria-label="Escena anterior"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="player__next"
            onClick={onNextClick}
            data-last={isLast}
            aria-label={isLast ? 'Siguiente (al final: salir)' : 'Siguiente escena'}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
