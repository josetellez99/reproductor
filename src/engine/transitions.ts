import type { Variants } from 'motion/react'
import type { SceneTransition } from './types'

const ease = [0.22, 1, 0.36, 1] as const

// Every variant set uses the same three labels: enter → center → exit.
// `custom` is the navigation direction: 1 forward, -1 backward.
export const transitions = {
  fade: {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.45, ease } },
    exit: { opacity: 0, transition: { duration: 0.35, ease } },
  },
  none: {
    enter: { opacity: 1 },
    center: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0 } },
  },
  slide: {
    enter: (dir: number) => ({ x: `${dir * 100}%` }),
    center: { x: '0%', transition: { duration: 0.7, ease } },
    exit: (dir: number) => ({ x: `${dir * -100}%`, transition: { duration: 0.7, ease } }),
  },
  zoom: {
    enter: { opacity: 0, scale: 1.08, filter: 'blur(16px)' },
    center: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
    exit: { opacity: 0, scale: 0.94, filter: 'blur(8px)', transition: { duration: 0.4, ease } },
  },
} satisfies Record<string, Variants>

export type TransitionName = keyof typeof transitions

export function resolveTransition(transition: SceneTransition = 'fade'): Variants {
  return typeof transition === 'string' ? transitions[transition] : transition
}
