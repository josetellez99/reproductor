// Public API for scene authors.
export { defineScene, type Scene, type SceneTransition } from './types'
export { useScene, useNextInterceptor, usePrevInterceptor } from './hooks'
export { STAGE_W, STAGE_H, toStagePoint } from './stage'
export type { SceneApi, SceneMode } from './context'
