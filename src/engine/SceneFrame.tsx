import { useCallback, useMemo } from 'react'
import { SceneContext, type InterceptKind, type Interceptor, type SceneMode } from './context'
import type { Deck } from './useDeck'
import type { Scene } from './types'

interface SceneFrameProps {
  scene: Scene
  index: number
  mode: SceneMode
  deck: Deck
}

/** Renders one scene with its SceneContext. */
export function SceneFrame({ scene, index, mode, deck }: SceneFrameProps) {
  const { register: deckRegister, total, next, prev, goTo } = deck
  const register = useCallback(
    (kind: InterceptKind, fn: Interceptor) => deckRegister(kind, index, fn),
    [deckRegister, index],
  )
  const isActive = deck.index === index

  const value = useMemo(
    () => ({ mode, index, total, isActive, next, prev, goTo, register }),
    [mode, index, total, isActive, next, prev, goTo, register],
  )

  const Component = scene.component
  return (
    <SceneContext.Provider value={value}>
      <Component />
    </SceneContext.Provider>
  )
}
