import { motion } from 'motion/react'
import { ease } from '../../palette'
import type { CompareRow } from './compare'
import { FlagES, FlagUS } from './flags'

/**
 * USA vs Spain table. Aspect labels are always visible (the agenda);
 * the cells of the first `shown` rows are revealed, the latest one highlighted.
 */
export function CompareTable({ rows, shown }: { rows: CompareRow[]; shown: number }) {
  return (
    <div className="cmp-table">
      <motion.div className="cmp-row cmp-row--head" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <span>Aspect</span>
        <span>
          <FlagUS className="cmp-flag" /> United States
        </span>
        <span>
          <FlagES className="cmp-flag" /> Spain (EU)
        </span>
      </motion.div>

      {rows.map((r, i) => {
        const on = i < shown
        return (
          <motion.div
            key={r.aspect}
            className="cmp-row"
            data-active={i === shown - 1}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease }}
          >
            <span className="cmp-aspect">{r.aspect}</span>
            {(['us', 'es'] as const).map((side, j) => (
              <motion.div
                key={side}
                className={`cmp-cell cmp-cell--${side}`}
                initial={false}
                animate={on ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0.12, y: 10, filter: 'blur(6px)' }}
                transition={{ delay: on ? j * 0.25 : 0, duration: 0.5, ease }}
              >
                <b>{r[side].lead}</b>
                <span>{r[side].detail}</span>
              </motion.div>
            ))}
          </motion.div>
        )
      })}
    </div>
  )
}
