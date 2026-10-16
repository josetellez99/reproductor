import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { defineScene, useAfter, useScene } from '../../engine'
import { ease } from '../palette'

// Leaked pairs (made up) scrolling in the attacker's terminal.
const LEAK = [
  'j.doe@mail.com:Summer2017!',
  'ana.r@post.net:ana1990',
  'mike77@inbox.io:Password1',
  'lucy.k@mail.com:Lucy*2018',
  'tom.b@web.org:qwerty123',
  'sara.m@mail.com:Sara!Beauty',
  'dan.p@post.net:Dan_2016',
  'eva.l@inbox.io:iloveyou2',
]

const SRC = { x: 560, y: 520 }
const BOT = { x: 900, y: 520 }
const BANKS = [
  { name: 'Bank 1', y: 330 },
  { name: 'Bank 2', y: 590 },
  { name: 'Bank 3', y: 850 },
]
const BANK_X = 1180
const HIT = 1 // the reused password works here
const PACKETS = 12
const PERIOD = 3.6

type Status = 'attempt' | 'denied' | 'granted'

const statusOf = (bank: number, tick: number, hit: boolean): Status => {
  if (hit && bank === HIT) return 'granted'
  return (tick + bank * 2) % 3 === 0 ? 'attempt' : 'denied'
}

const LABEL: Record<Status, string> = { attempt: 'Attempting…', denied: 'Access denied', granted: 'Access granted' }

function Bot() {
  return (
    <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
      <g transform={`translate(${BOT.x} ${BOT.y})`}>
        <line x1={0} y1={-92} x2={0} y2={-66} stroke="#8b8893" strokeWidth={4} />
        <motion.circle cy={-98} r={9} fill="#ff2d55" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
        <rect x={-74} y={-66} width={148} height={112} rx={26} fill="#1d1d25" stroke="rgba(242,239,233,0.4)" strokeWidth={3} />
        <rect x={-54} y={-42} width={108} height={46} rx={14} fill="#0a0a0d" />
        <motion.rect x={-38} y={-28} width={22} height={18} rx={4} fill="#ff2d55" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 2 }} />
        <motion.rect x={16} y={-28} width={22} height={18} rx={4} fill="#ff2d55" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 2 }} />
        {[-30, -10, 10, 30].map((x) => (
          <rect key={x} x={x - 6} y={18} width={12} height={12} rx={2} fill="#3e3e4a" />
        ))}
        <rect x={-96} y={-20} width={22} height={50} rx={8} fill="#2a2a33" />
        <rect x={74} y={-20} width={22} height={50} rx={8} fill="#2a2a33" />
        <text y={92} textAnchor="middle" className="cs-svg-label">
          AUTOMATED SCRIPT
        </text>
      </g>
    </motion.g>
  )
}

function Bank({ y, name }: { y: number; name: string }) {
  const x = BANK_X
  return (
    <g transform={`translate(${x} ${y - 90})`}>
      <path d="M0 50 L110 0 L220 50 Z" fill="#2a2a33" stroke="rgba(242,239,233,0.35)" strokeWidth={2} />
      <rect x={10} y={50} width={200} height={14} fill="#3e3e4a" />
      {[24, 72, 120, 168].map((cx) => (
        <rect key={cx} x={cx} y={70} width={26} height={90} fill="#3e3e4a" />
      ))}
      <rect x={0} y={162} width={220} height={18} fill="#2a2a33" />
      <text x={110} y={210} textAnchor="middle" className="cs-svg-label">
        {name.toUpperCase()}
      </text>
    </g>
  )
}

/** A bot replays leaked email:password pairs against bank logins. */
function CredentialStuffing() {
  const { mode } = useScene()
  const live = mode !== 'thumb'
  const packets = useAfter(1800)
  const hit = useAfter(7200)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!live || !packets) return
    const id = window.setInterval(() => setTick((t) => t + 1), 320)
    return () => window.clearInterval(id)
  }, [live, packets])

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <div className="k-grid" aria-hidden="true" />

      <motion.div
        className="cs-banner"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.04, 1] }}
        transition={{ opacity: { duration: 0.6 }, y: { duration: 0.6, ease }, scale: { delay: 0.8, duration: 1.4, repeat: Infinity } }}
      >
        Number of combinations: <b>1</b>
      </motion.div>

      <motion.div className="cs-term" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease }}>
        <div className="cs-term__bar">
          <i />
          <i />
          <i />
          <span>leak_database.txt</span>
        </div>
        <div className="cs-term__body">
          <div className="cs-term__scroll">
            {[...LEAK, ...LEAK].map((l, i) => (
              <p key={i}>
                <span>&gt;</span> {l}
              </p>
            ))}
          </div>
        </div>
      </motion.div>

      <svg className="cs-stage" viewBox="0 0 1920 1080" aria-hidden="true">
        {BANKS.map((b) => (
          <motion.path
            key={b.name}
            d={`M${BOT.x + 100} ${BOT.y} C ${BOT.x + 260} ${BOT.y}, ${BANK_X - 160} ${b.y}, ${BANK_X - 20} ${b.y}`}
            fill="none"
            stroke="rgba(255,45,85,0.25)"
            strokeWidth={2}
            strokeDasharray="6 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        ))}
        <motion.line x1={SRC.x} y1={SRC.y} x2={BOT.x - 100} y2={BOT.y} stroke="rgba(255,45,85,0.25)" strokeWidth={2} strokeDasharray="6 10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.5 }} />

        <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: 'spring', stiffness: 240, damping: 16 }}>
          <Bot />
        </motion.g>

        {BANKS.map((b, i) => (
          <motion.g key={b.name} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease }}>
            <Bank {...b} />
          </motion.g>
        ))}

        {packets &&
          Array.from({ length: PACKETS }, (_, k) => {
            const bank = BANKS[k % BANKS.length]
            return (
              <motion.g
                key={k}
                initial={{ x: SRC.x, y: SRC.y, opacity: 0 }}
                animate={{ x: [SRC.x, BOT.x, BANK_X + 20], y: [SRC.y, BOT.y, bank.y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.3, delay: (k * PERIOD) / PACKETS, repeat: Infinity, repeatDelay: PERIOD - 1.3, ease: 'easeIn', times: [0, 0.45, 1] }}
              >
                <rect x={-62} y={-16} width={124} height={32} rx={8} fill="#c8102e" />
                <text y={6} textAnchor="middle" className="cs-packet">
                  email:pass
                </text>
              </motion.g>
            )
          })}
      </svg>

      {/* login forms on top of each bank */}
      {BANKS.map((b, i) => {
        const status = packets ? statusOf(i, tick, hit) : 'attempt'
        return (
          <motion.div
            key={b.name}
            className="cs-login"
            data-status={status}
            style={{ top: b.y - 92 }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease }}
          >
            <small>{b.name} · Sign in</small>
            <span className="cs-login__field">{status === 'granted' ? 'j.doe@mail.com' : '••••@••••.com'}</span>
            <span className="cs-login__field">••••••••••</span>
            <AnimatePresence mode="wait">
              <motion.b key={status + (status === 'granted' ? '' : tick)} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                {LABEL[status]}
              </motion.b>
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* "Access denied" spam around the banks */}
      {live && packets && (
        <div className="cs-spam" aria-hidden="true">
          <AnimatePresence>
            <motion.span
              key={tick}
              style={{ left: 1150 + ((tick * 137) % 600), top: 240 + ((tick * 263) % 720) }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], scale: 1, y: -30 }}
              transition={{ duration: 0.9 }}
            >
              {tick % 4 === 0 ? 'Attempting…' : 'ACCESS DENIED'}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default defineScene({
  id: 'credential-stuffing',
  title: 'Credential stuffing (auto)',
  component: CredentialStuffing,
  transition: 'fade',
  notes:
    'This is credential stuffing. Attackers take leaked email and password pairs and a bot tries them on many sites, like banks, very fast. Most attempts fail — but if you reused the exact same password, it works. The number of combinations they need is just one: no guessing at all.',
})
