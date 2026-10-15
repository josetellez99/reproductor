import { geoAzimuthalEqualArea, geoPath } from 'd3-geo'
import type { FeatureCollection, Geometry, MultiPoint } from 'geojson'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import world from 'world-atlas/countries-110m.json'

type Objects = { countries: GeometryCollection<{ name: string }> }
const topo = world as unknown as Topology<Objects>

/** EU member states in 2018 (28, United Kingdom included), ISO 3166 numeric. */
export const EU_2018 = new Set([
  '040', '056', '100', '191', '196', '203', '208', '233', '246', '250', '276', '300', '348', '372',
  '380', '428', '440', '442', '470', '528', '616', '620', '642', '703', '705', '724', '752', '826',
])

/** Frame: what must be visible. Canvas px box the map is fitted into. */
const FRAME: MultiPoint = {
  type: 'MultiPoint',
  coordinates: [
    [-10, 35.5],
    [32, 35],
    [-24, 64],
    [32, 70],
  ],
}
export const EU_BOX = { x0: 660, y0: 40, x1: 1880, y1: 1040 }

const projection = geoAzimuthalEqualArea()
  .rotate([-10, -52])
  .fitExtent(
    [
      [EU_BOX.x0, EU_BOX.y0],
      [EU_BOX.x1, EU_BOX.y1],
    ],
    FRAME,
  )
const path = geoPath(projection)

const collection = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>

export interface Country {
  id: string
  name: string
  d: string
  x: number
  eu: boolean
}

export const COUNTRIES: Country[] = collection.features
  .map((f) => ({
    id: String(f.id),
    name: f.properties.name,
    d: path(f) ?? '',
    x: path.centroid(f)[0],
    eu: EU_2018.has(String(f.id)),
  }))
  .filter((c) => c.d)

/** Centre of the EU stars ring (around Brussels / Luxembourg). */
export const EU_CENTER = projection([8, 50]) ?? [1200, 500]
