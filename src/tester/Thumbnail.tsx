import { useMemo, useRef } from 'react'
import { LayoutGroup, MotionConfig, useInView } from 'motion/react'
import { SceneFrame } from '../engine/SceneFrame'
import { Stage } from '../engine/Stage'
import type { Scene } from '../engine/types'
import { staticDeck } from '../engine/useDeck'

interface ThumbnailProps {
  scene: Scene
  index: number
  total: number
}

/**
 * Real scene rendered small, in 'thumb' mode, not interactive.
 * Mounted only once visible; its own LayoutGroup keeps layoutIds from
 * leaking between thumbnails.
 */
export function Thumbnail({ scene, index, total }: ThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '200px' })
  const deck = useMemo(() => staticDeck(index, total), [index, total])

  return (
    <div ref={ref} className="thumb" inert>
      {inView && (
        <MotionConfig reducedMotion="always">
          <LayoutGroup id={`thumb-${scene.id}`}>
            <Stage>
              <SceneFrame scene={scene} index={index} mode="thumb" deck={deck} />
            </Stage>
          </LayoutGroup>
        </MotionConfig>
      )}
    </div>
  )
}
