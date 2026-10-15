import { sweepWestToEast } from '../../components/usmap'
import { defineScene, useAfter } from '../../engine'
import { LawMap } from './parts/LawMap'
import { LayerTag } from './parts/LayerTag'
import { WHOLE_COUNTRY } from './parts/fills'

const sweep = sweepWestToEast(1.4)

/** Runs on its own: clean map, then the whole country lights up (federal level). */
function Federal() {
  const lit = useAfter(1200)
  return (
    <div className="s-root" style={{ padding: 0 }}>
      <LawMap layout="full" fills={lit ? WHOLE_COUNTRY : undefined} fillDelay={sweep} />
      <LayerTag layer={lit ? 1 : null} text="Federal laws · the whole country" />
    </div>
  )
}

export default defineScene({
  id: 'federal',
  title: 'Federal level (auto)',
  component: Federal,
  transition: 'fade',
  notes:
    "No click needed: the map lights up by itself. In the US, there is no single privacy law like Europe's GDPR. Instead, there are two layers. First: federal laws, which focus on certain types of data.",
})
