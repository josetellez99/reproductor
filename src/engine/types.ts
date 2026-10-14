import type { ComponentType } from 'react'
import type { Variants } from 'motion/react'
import type { TransitionName } from './transitions'

export type SceneTransition = TransitionName | Variants

export interface Scene {
  /** Stable id. Also used as React key, so two scenes must never share it. */
  id: string
  /** Name shown in the test grid and inspector. */
  title: string
  /** Renders the whole 1920×1080 canvas for this scene. */
  component: ComponentType
  /** How this scene enters and leaves. Defaults to 'fade'. */
  transition?: SceneTransition
  /** Speaker notes, visible in the inspector. */
  notes?: string
}

export function defineScene(scene: Scene): Scene {
  return scene
}
