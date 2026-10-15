import { geoAlbers, geoAlbersUsa, geoPath } from 'd3-geo'
import type { FeatureCollection, Geometry } from 'geojson'
import { feature, mesh } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import atlas from 'us-atlas/states-albers-10m.json'

/**
 * Map space = the space us-atlas was pre-projected into (975×610 viewport,
 * d3.geoAlbersUsa().scale(1300).translate([487.5, 305])). Everything drawn on
 * the map uses these units.
 */

type Objects = {
  states: GeometryCollection<{ name: string }>
  nation: GeometryCollection
}
const topo = atlas as unknown as Topology<Objects>

const path = geoPath()

export interface StateShape {
  id: string
  name: string
  d: string
  centroid: [number, number]
}

const stateCollection = feature(topo, topo.objects.states) as FeatureCollection<Geometry, { name: string }>

export const STATES: StateShape[] = stateCollection.features.map((f) => ({
  id: String(f.id),
  name: f.properties.name,
  d: path(f) ?? '',
  centroid: path.centroid(f),
}))

const byName = new Map(STATES.map((s) => [s.name, s]))

/** Map-space centroid of a state, by name ("California"). */
export function stateCentroid(name: string): [number, number] {
  return byName.get(name)?.centroid ?? [0, 0]
}

export const NATION_PATH = path(feature(topo, topo.objects.nation)) ?? ''
export const BORDERS_PATH = path(mesh(topo, topo.objects.states, (a, b) => a !== b)) ?? ''

export interface ViewBox {
  x: number
  y: number
  width: number
  height: number
}

/** Whole country (Alaska and Hawaii insets included) framed at 16:9, with room for landmarks. */
export const MAP_VIEWBOX: ViewBox = { x: -136.7, y: -25, width: 1173.3, height: 660 }

export type LonLat = readonly [number, number]

const usa = geoAlbersUsa().scale(1300).translate([487.5, 305])
// Same projection AlbersUsa uses for the lower 48, but without clipping:
// lets us place things just off the coast (Gulf, Caribbean, oceans).
const lower48 = geoAlbers().scale(1300).translate([487.5, 305])

/** [longitude, latitude] → map space. Alaska and Hawaii land in their insets. */
export function project(p: LonLat): [number, number] {
  const point: [number, number] = [p[0], p[1]]
  const xy = usa(point) ?? lower48(point)
  return xy ? [xy[0], xy[1]] : [0, 0]
}

const r = (n: number) => Math.round(n * 100) / 100

/** Smooth Catmull-Rom curve through map-space points, as an SVG path. */
export function smoothPath(points: [number, number][]) {
  if (points.length < 2) return ''
  let d = `M${r(points[0][0])} ${r(points[0][1])}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${r(p2[0])} ${r(p2[1])}`
  }
  return d
}

/** Smooth path through geographic waypoints. */
export function routeThrough(waypoints: LonLat[]) {
  return smoothPath(waypoints.map(project))
}
