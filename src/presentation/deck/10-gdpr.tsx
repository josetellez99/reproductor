import { motion } from 'motion/react'
import { EuropeMap } from '../../components/eumap/EuropeMap'
import { defineScene, useAfter } from '../../engine'
import { Kicker } from '../kit'
import { ease } from '../palette'

function Gdpr() {
  const lit = useAfter(900)
  return (
    <div className="s-root" style={{ padding: 0 }}>
      <EuropeMap highlight={lit} />
      <div className="gdpr-text">
        <Kicker>Meanwhile, in Europe</Kicker>
        <motion.h2
          className="gdpr-title"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
        >
          GDPR
        </motion.h2>
        <motion.p className="gdpr-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          General Data Protection Regulation
        </motion.p>
        <motion.ul
          className="gdpr-facts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease }}
        >
          <li>
            <b>25 May 2018</b> in force
          </li>
          <li>
            <b>One law</b> for all personal data
          </li>
          <li>
            <b>28 countries</b> of the EU at the time
          </li>
        </motion.ul>
      </div>
    </div>
  )
}

export default defineScene({
  id: 'gdpr',
  title: 'GDPR in Europe',
  component: Gdpr,
  transition: 'fade',
  notes: 'In Europe the GDPR law was being introduced (in force since May 25, 2018): one single law for all personal data.',
})
