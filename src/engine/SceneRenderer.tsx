import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import type { SceneMode } from './context'
import { SceneFrame } from './SceneFrame'
import { resolveTransition } from './transitions'
import type { Scene } from './types'
import type { Deck } from './useDeck'

interface SceneRendererProps {
  scenes: Scene[]
  deck: Deck
  mode: SceneMode
}

/**
 * Shows the deck's current scene and animates between scenes.
 * Old and new scene overlap during the transition, so elements sharing a
 * `layoutId` across consecutive scenes morph instead of popping.
 */
export function SceneRenderer({ scenes, deck, mode }: SceneRendererProps) {
  const [shown, setShown] = useState(deck.index)
  const [direction, setDirection] = useState(1)
  if (shown !== deck.index) {
    setDirection(deck.index > shown ? 1 : -1)
    setShown(deck.index)
  }

  const scene = scenes[deck.index]
  if (!scene) return null

  return (
    <LayoutGroup id="deck">
      <AnimatePresence custom={direction}>
        <motion.div
          key={scene.id}
          className="scene-layer"
          custom={direction}
          variants={resolveTransition(scene.transition)}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <SceneFrame scene={scene} index={deck.index} mode={mode} deck={deck} />
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}
