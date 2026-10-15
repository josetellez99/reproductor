import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { UsMap, UsMapLife } from '../../components/usmap'
import { defineScene } from '../../engine'
import { Kicker } from '../kit'
import { ease, palette } from '../palette'

function Usa() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [picked, setPicked] = useState<Record<string, string>>({})

  const toggle = (name: string) =>
    setPicked(({ [name]: was, ...rest }) => (was ? rest : { ...rest, [name]: palette.crimson }))

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <UsMap fills={picked} onStateClick={toggle} onStateHover={setHovered}>
          <UsMapLife />
        </UsMap>
      </motion.div>

      <div className="usa-hud">
        <Kicker>Estados Unidos</Kicker>
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.span
              key={hovered}
              className="usa-hud__state"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {hovered}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default defineScene({
  id: 'usa',
  title: 'Mapa vivo de EE. UU.',
  component: Usa,
  transition: 'zoom',
  notes:
    'Mapa base plano (UsMap) + capa de vida (UsMapLife): Libertad, balseros hacia Florida, Ruta 66 con el #95, Gran Cañón, cohete en Houston, Golden Gate… Click en un estado para marcarlo.',
})
