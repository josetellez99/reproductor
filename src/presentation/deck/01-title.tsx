import { motion } from 'motion/react'
import { UsMap, UsMapLife } from '../../components/usmap'
import { defineScene } from '../../engine'
import { ease } from '../palette'
import { FlagText } from './parts/FlagText'

// Tighter frame than the default so the map is as big as possible between title and credits.
const VIEWBOX = { x: -75, y: -30, width: 1100, height: 660 }

const AUTHORS = ['Jose Tellez', 'Adair Gonzales', 'Alfredo Medinilla']

function Title() {
  return (
    <div className="s-root" style={{ padding: 0 }}>
      <motion.div
        className="title-map"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <UsMap viewBox={VIEWBOX}>
          <UsMapLife />
        </UsMap>
      </motion.div>

      <header className="title-head">
        <motion.p
          className="title-head__pre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
        >
          Tech Regulations in the
        </motion.p>
        <FlagText text="United States of America" width={1360} height={104} delay={0.45} />
      </header>

      <motion.footer
        className="title-credits"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease }}
      >
        <span className="title-credits__by">A presentation by:</span>
        <span className="title-credits__names">
          {AUTHORS.map((name, i) => (
            <span key={name}>
              {i > 0 && <span className="title-credits__sep">{i === AUTHORS.length - 1 ? ' and ' : ', '}</span>}
              {name}
            </span>
          ))}
        </span>
      </motion.footer>
    </div>
  )
}

export default defineScene({
  id: 'title',
  title: 'Title · Tech Regulations in the USA',
  component: Title,
  transition: 'fade',
  notes: 'Opening. Living map of the US while we introduce ourselves.',
})
