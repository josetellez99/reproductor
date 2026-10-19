import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { ease } from '../palette'
import unclesam from '../../assets/uncle-sam.webp'

function UncleSam() {
  return (
    <div className="s-root uncle-sam">
      <motion.img
        className="uncle-sam__figure"
        src={unclesam}
        alt="Uncle Sam pointing at the viewer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
      />
    </div>
  )
}

export default defineScene({
  id: 'uncle-sam',
  title: 'Uncle Sam',
  component: UncleSam,
  transition: 'fade',
  notes: 'Uncle Sam: the personification of the United States government.',
})
