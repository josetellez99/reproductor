import { AnimatePresence, motion } from 'motion/react'

/** Small HUD label at the top of the map scenes ("Layer 1 · Federal laws"). */
export function LayerTag({ layer, text }: { layer: number | null; text: string }) {
  return (
    <div className="layer-tag-slot">
      <AnimatePresence mode="wait">
        {layer !== null && (
          <motion.div
            key={`${layer}-${text}`}
            className="layer-tag"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35 }}
          >
            <span className="layer-tag__n">Layer {layer}</span>
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
