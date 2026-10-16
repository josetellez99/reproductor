import { motion } from 'motion/react'
import { defineScene, useAfter } from '../../engine'
import { ease } from '../palette'
import { IconAlert } from './parts/icons'

const HISTORY = [
  ['2015', 'email', 'j.doe@mail.com'],
  ['2017', 'password', 'Summer2017!'],
  ['2019', 'address', '742 Evergreen Ter.'],
  ['2021', 'purchases', '38 orders'],
  ['2022', 'device', 'iPhone · Safari'],
]

/** Old data never expires, and it feeds credential stuffing. */
function WhyRisk() {
  const link = useAfter(1800)
  const exposed = useAfter(2600)
  const stuffing = useAfter(3600)

  return (
    <div className="s-root sr-root">
      <div className="k-grid" aria-hidden="true" />

      <motion.h2 className="sr-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
        Why did this put users <span>at risk?</span>
      </motion.h2>

      <div className="sr-row">
        <motion.div className="sr-profile" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.7, ease }}>
          <div className="sr-profile__bar">
            <i />
            <i />
            <i />
            <span>user_profile_history.db</span>
          </div>
          <ul>
            {HISTORY.map(([year, field, value], i) => (
              <motion.li key={field} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.12 }}>
                <span>{year}</span>
                <span>{field}</span>
                <b>{value}</b>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <svg className="sr-link" viewBox="0 0 420 40" aria-hidden="true">
          {link && (
            <motion.line
              x1={0}
              y1={20}
              y2={20}
              stroke="#ff2d55"
              strokeWidth={4}
              strokeDasharray="4 14"
              strokeLinecap="round"
              initial={{ x2: 0, strokeDashoffset: 0 }}
              animate={{ x2: 420, strokeDashoffset: -180 }}
              transition={{ x2: { duration: 0.7, ease }, strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' } }}
            />
          )}
        </svg>

        <motion.div className="sr-exposed" initial={{ opacity: 0, scale: 0.8 }} animate={exposed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
          <IconAlert />
          <b>Permanently exposed</b>
          <span>Never expires</span>
        </motion.div>
      </div>

      {stuffing && (
        <motion.div className="sr-feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p>Old or leaked information feeds…</p>
          <motion.div
            className="sr-term"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              boxShadow: ['0 0 0 0 rgba(255,45,85,0.7)', '0 0 0 28px rgba(255,45,85,0)', '0 0 0 0 rgba(255,45,85,0)'],
            }}
            transition={{ scale: { type: 'spring', stiffness: 220, damping: 14 }, boxShadow: { duration: 1.6, repeat: Infinity } }}
          >
            Credential stuffing
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default defineScene({
  id: 'why-risk',
  title: 'Why was it a risk? (auto)',
  component: WhyRisk,
  transition: 'fade',
  notes:
    'Why did this put users at risk? Because once your profile history leaves the company, it is permanently exposed — it never expires. Old emails and passwords feed an attack called credential stuffing.',
})
