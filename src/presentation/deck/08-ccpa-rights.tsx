import type { ComponentType } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { defineScene, useSteps } from '../../engine'
import { ease } from '../palette'
import { FogCloud } from './parts/FogCloud'
import { LawMap } from './parts/LawMap'
import { LayerTag } from './parts/LayerTag'
import { StateLabel } from './parts/StateLabel'
import { Timeline } from './parts/Timeline'
import { only } from './parts/fills'
import { CCPA_MILESTONE } from './parts/laws'
import { DeleteVisual, KnowVisual, NoSaleVisual } from './parts/rights'

const RIGHTS: { verb: string; text: string; Visual: ComponentType }[] = [
  { verb: 'Know', text: 'what data a company has about them', Visual: KnowVisual },
  { verb: 'Delete', text: 'ask the company to delete it', Visual: DeleteVisual },
  { verb: "Don't sell", text: "tell it: 'don't sell my data'", Visual: NoSaleVisual },
]

/** Cloud over the map with the CCPA rights; one → per right. */
function CcpaRights() {
  const step = useSteps(RIGHTS.length)

  return (
    <div className="s-root" style={{ padding: 0 }}>
      <LawMap layout="timeline" fills={only(['California'])}>
        <StateLabel state="California" text="California · CCPA 2018" dx={-150} dy={30} />
      </LawMap>
      <LayerTag layer={2} text="State laws · personal data in general" />
      <Timeline items={[CCPA_MILESTONE]} appear={false} />

      <FogCloud width={1440} height={860} cy={420}>
        <div className="ccpa">
          <header className="ccpa__head">
            <span className="ccpa__kicker">CCPA · 2018</span>
            <h3>California Consumer Privacy Act</h3>
            <p>
              For the first time, people control their <b>personal data in general</b> — not just one sector.
            </p>
          </header>
          <ul className="ccpa__rights">
            <AnimatePresence>
              {RIGHTS.slice(0, step).map(({ verb, text, Visual }, i) => (
                <motion.li
                  key={verb}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <span className="ccpa__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ccpa__text">
                    <b>{verb}</b>
                    {text}
                  </span>
                  <Visual />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </FogCloud>
    </div>
  )
}

export default defineScene({
  id: 'ccpa-rights',
  title: 'CCPA rights (3 clicks)',
  component: CcpaRights,
  transition: 'none',
  notes:
    "A general personal data law that gave users control over their own data for the first time. People can now know what data a company has about them, ask the company to delete it, and tell it 'don't sell my data'. For the first time in the US, these rights covered personal data in general, not just one sector like health or banking.",
})
