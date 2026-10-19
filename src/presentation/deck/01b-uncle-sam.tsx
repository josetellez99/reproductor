import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { ease } from '../palette'
import unclesam from '../../assets/uncle-sam.jpg'

function UncleSam() {
  return (
    <div className="s-root uncle-sam">
      <motion.img
        className="uncle-sam__img"
        src={unclesam}
        alt="Uncle Sam: I Want You for U.S. Army, by James Montgomery Flagg (1917)"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
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
  notes: 'Uncle Sam: the iconic "I Want You" poster by James Montgomery Flagg (1917, public domain).',
})
