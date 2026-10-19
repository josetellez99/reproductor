import type { ComponentType, SVGProps } from 'react'
import { motion } from 'motion/react'
import { Backdrop, Kicker } from '../../kit'
import { ease } from '../../palette'

export interface Argument {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  text: string
}

/** One side of the debate: heading on the left, arguments revealed one per → on the right. */
export function DebateList({ tone, title, lead, items, shown }: { tone: 'for' | 'against'; title: string; lead: string; items: Argument[]; shown: number }) {
  return (
    <div className="s-root deb-root" data-tone={tone}>
      <Backdrop />
      <div className="deb-head">
        <Kicker>The debate · Part 1</Kicker>
        <motion.h2 className="deb-title" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }}>
          {title}
        </motion.h2>
        <motion.p className="deb-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {lead}
        </motion.p>
        <motion.span className="deb-count" key={shown} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {shown} / {items.length}
        </motion.span>
      </div>

      <ul className="deb-list">
        {items.map((a, i) => (
          <motion.li
            key={a.title}
            data-active={i === shown - 1}
            initial={false}
            animate={i < shown ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.55, ease }}
          >
            <span className="deb-icon">
              <a.icon />
            </span>
            <div>
              <b>{a.title}</b>
              <span>{a.text}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
