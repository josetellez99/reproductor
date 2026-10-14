import { createContext } from 'react'

export type SceneMode = 'play' | 'test' | 'thumb'
export type InterceptKind = 'next' | 'prev'
/** Return `true` to consume the key press and stop the deck from moving. */
export type Interceptor = () => boolean | void

export interface SceneApi {
  /** 'play' fullscreen, 'test' inspector, 'thumb' static miniature in the grid. */
  mode: SceneMode
  /** This scene's position in the deck. */
  index: number
  total: number
  /** False while the scene is animating out. */
  isActive: boolean
  next: () => boolean
  prev: () => boolean
  goTo: (index: number) => void
}

export interface SceneContextValue extends SceneApi {
  register: (kind: InterceptKind, fn: Interceptor) => () => void
}

export const SceneContext = createContext<SceneContextValue | null>(null)
