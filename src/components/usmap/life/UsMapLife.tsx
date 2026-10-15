import type { CSSProperties, JSX } from 'react'
import { project, routeThrough, type LonLat } from '../geo'
import { Place } from '../Place'
import {
  Capitol,
  ChicagoSkyline,
  GoldenGate,
  HollywoodSign,
  Lighthouse,
  MountRushmore,
  SpaceNeedle,
  StatueOfLiberty,
  VegasSign,
} from './landmarks'
import {
  Arch,
  Balloons,
  Bison,
  Canoe,
  CarFactory,
  Cheese,
  Chip,
  Corn,
  GatewayArch,
  Guitar,
  Horse,
  LibertyBell,
  Lobster,
  Peach,
  Potato,
  RainyPines,
  SkiMountain,
  Surfer,
  Trumpet,
  WrightFlyer,
} from './more'
import { CargoShip, Flight, Pumpjack, RaftCrossing, Road, Rocket, RouteShield, Steamboat, WindTurbine } from './machines'
import { Aurora, Cactus, Cloud, Denali, GrandCanyon, OldFaithful, Palms, Tornado, Volcano } from './nature'
import { Tag } from './Tag'
import './life.css'

// Historic Route 66: Chicago → Santa Monica.
const ROUTE_66 = routeThrough([
  [-87.63, 41.88],
  [-89.65, 39.8],
  [-90.2, 38.63],
  [-93.29, 37.21],
  [-95.99, 36.15],
  [-97.52, 35.47],
  [-101.83, 35.22],
  [-106.65, 35.08],
  [-111.65, 35.2],
  [-114.05, 35.19],
  [-117.02, 34.9],
  [-118.49, 34.01],
])

const MISSISSIPPI = routeThrough([
  [-95.2, 47.24],
  [-93.1, 44.95],
  [-91.3, 43.4],
  [-91.1, 40.8],
  [-90.2, 38.7],
  [-89.2, 37.0],
  [-90.05, 35.15],
  [-91.15, 33.0],
  [-91.4, 31.0],
  [-90.1, 29.95],
  [-89.3, 29.15],
])

// Balseros: from off the Cuban coast towards Miami.
const RAFT_ROUTE = routeThrough([
  [-81.3, 22.9],
  [-80.8, 24.0],
  [-80.25, 25.35],
])

const FLIGHT = routeThrough([
  [-118.4, 33.94],
  [-106, 40.5],
  [-92, 43.4],
  [-73.78, 40.64],
])

const WAVES: LonLat[] = [
  [-127, 36],
  [-126, 42.5],
  [-123.5, 31],
  [-128.5, 46.5],
  [-121, 28],
  [-69.5, 36],
  [-65.5, 40.5],
  [-74.5, 32.5],
  [-62.5, 43.5],
  [-71.5, 30],
  [-90.5, 26.8],
  [-86, 26.2],
  [-94.5, 27.2],
  [-84, 24.4],
]

// Second batch: one reference for more states.
const MORE: { at: LonLat; scale: number; el: JSX.Element }[] = [
  { at: [-121.4, 44.2], scale: 1, el: <RainyPines /> },
  { at: [-114.9, 43.4], scale: 1, el: <Potato /> },
  { at: [-108.6, 46.9], scale: 1, el: <Bison /> },
  { at: [-110.4, 39.1], scale: 1, el: <Arch /> },
  { at: [-105.9, 39.4], scale: 1, el: <SkiMountain /> },
  { at: [-106.1, 34.1], scale: 1, el: <Balloons /> },
  { at: [-120.2, 36.6], scale: 1, el: <Chip /> },
  { at: [-99.6, 41.5], scale: 1, el: <Corn /> },
  { at: [-94.4, 46.6], scale: 1, el: <Canoe /> },
  { at: [-89.7, 44.5], scale: 1, el: <Cheese /> },
  { at: [-90.19, 38.62], scale: 1, el: <GatewayArch /> },
  { at: [-83.6, 42.9], scale: 1, el: <CarFactory /> },
  { at: [-84.9, 37.7], scale: 1, el: <Horse /> },
  { at: [-86.6, 35.9], scale: 1, el: <Guitar /> },
  { at: [-92.4, 30.9], scale: 1, el: <Trumpet /> },
  { at: [-83.6, 32.5], scale: 1, el: <Peach /> },
  { at: [-79, 35.6], scale: 1, el: <WrightFlyer /> },
  { at: [-76.9, 40.5], scale: 1, el: <LibertyBell /> },
  { at: [-68.8, 45.6], scale: 1, el: <Lobster /> },
  { at: [-158.2, 21.1], scale: 1, el: <Surfer /> },
]

/** Size of every landmark relative to its drawing. */
const S = 1.3

const CLOUDS = [
  { y: 90, scale: 1.4, dur: 120, delay: -10 },
  { y: 210, scale: 1, dur: 95, delay: -60 },
  { y: 330, scale: 1.7, dur: 140, delay: -95 },
  { y: 440, scale: 1.1, dur: 105, delay: -30 },
  { y: 160, scale: 0.9, dur: 88, delay: -75 },
]

/**
 * The "life" layer for <UsMap>: landmarks, vehicles, weather.
 * Kept apart from the base map so scenes can mix and match.
 */
export function UsMapLife() {
  let i = 0
  const next = () => 0.5 + i++ * 0.07

  return (
    <g className="usmap-life">
      <defs>
        <radialGradient id="lm-glow">
          <stop offset="0" stopColor="#ffd23f" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ff7a2b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lm-beam" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#fff4c2" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff4c2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lm-trail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb02e" stopOpacity="0.9" />
          <stop offset="0.12" stopColor="#f4f0e8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f4f0e8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lm-aurora" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2ee59d" stopOpacity="0" />
          <stop offset="0.3" stopColor="#2ee59d" stopOpacity="0.45" />
          <stop offset="0.7" stopColor="#5ad1ff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a970ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* water */}
      {WAVES.map((p, k) => {
        const [x, y] = project(p)
        return (
          <path
            key={k}
            className="wave"
            style={{ animationDelay: `${(k % 5) * 0.7}s` }}
            d={`M${x - 4} ${y} q2 -1.6 4 0 t4 0`}
            fill="none"
            stroke="rgba(120,175,235,0.4)"
            strokeWidth={0.6}
            strokeLinecap="round"
          />
        )
      })}
      <path d={MISSISSIPPI} fill="none" stroke="rgba(59,143,217,0.55)" strokeWidth={1.4} strokeLinecap="round" />

      {/* routes */}
      <Road d={ROUTE_66} carScale={S} />
      <RaftCrossing d={RAFT_ROUTE} scale={S} />

      {/* west */}
      <Place at={[-150, 66.5]} delay={next()} scale={S * 0.8}>
        <Aurora />
      </Place>
      <Place at={[-151, 63.1]} delay={next()} scale={S}>
        <Denali />
      </Place>
      <Place at={[-155.3, 19.45]} delay={next()} scale={S}>
        <Volcano />
      </Place>
      <Place at={[-122.33, 47.62]} delay={next()} scale={S}>
        <SpaceNeedle />
      </Place>
      <Place at={[-122.6, 37.8]} delay={next()} scale={S}>
        <GoldenGate />
      </Place>
      <Place at={[-118.33, 34.2]} delay={next()} scale={S}>
        <HollywoodSign />
      </Place>
      <Place at={[-121.5, 32.5]} delay={next()} scale={S * 0.9}>
        <CargoShip />
      </Place>
      <Place at={[-115.14, 36.25]} delay={next()} scale={S}>
        <VegasSign />
      </Place>
      <Place at={[-112.1, 36.1]} delay={next()} scale={S * 1.15}>
        <GrandCanyon />
      </Place>
      <Place at={[-111.9, 33.1]} delay={next()} scale={S}>
        <Cactus />
      </Place>
      <Place at={[-107.5, 32.6]} delay={next()} scale={S * 0.85}>
        <Cactus />
      </Place>
      <Place at={[-110.83, 44.46]} delay={next()} scale={S}>
        <OldFaithful />
      </Place>
      <Place at={[-103.46, 43.88]} delay={next()} scale={S}>
        <MountRushmore />
      </Place>

      {/* centre */}
      <Place at={[-102.08, 31.99]} delay={next()} scale={S}>
        <Pumpjack />
      </Place>
      <Place at={[-98.5, 38.4]} delay={next()} scale={S}>
        <Tornado />
      </Place>
      {[
        [-94.4, 42.3],
        [-93.6, 42.6],
        [-92.9, 42.15],
      ].map((p, k) => (
        <Place key={k} at={p as unknown as LonLat} delay={next()} scale={S * 0.9}>
          <WindTurbine dur={3.4 + k * 0.6} />
        </Place>
      ))}
      <Place at={[-95.1, 29.55]} delay={next()} scale={S}>
        <Rocket />
        <Tag text="HOUSTON" y={11} />
      </Place>
      <Place at={[-90.9, 32.6]} delay={next()} scale={S * 0.9}>
        <Steamboat />
      </Place>

      {/* route 66 shields */}
      <Place at={[-87.63, 41.88]} delay={next()} scale={S}>
        <RouteShield />
      </Place>
      <Place at={[-97.6, 35.95]} delay={next()} scale={S}>
        <RouteShield />
      </Place>
      <Place at={[-114.1, 35.65]} delay={next()} scale={S}>
        <RouteShield />
      </Place>

      {/* east */}
      <Place at={[-87.2, 42.1]} delay={next()} scale={S}>
        <ChicagoSkyline />
      </Place>
      <Place at={[-77.01, 38.89]} delay={next()} scale={S}>
        <Capitol />
      </Place>
      <Place at={[-73.6, 40.35]} delay={next()} scale={S * 1.1}>
        <StatueOfLiberty />
      </Place>
      <Place at={[-69.9, 43.75]} delay={next()} scale={S}>
        <Lighthouse />
      </Place>
      <Place at={[-71, 37.2]} delay={next()} scale={S * 0.85}>
        <CargoShip />
      </Place>
      <Place at={[-80.2, 26.05]} delay={next()} scale={S}>
        <Palms />
      </Place>

      {/* more states */}
      {MORE.map(({ at, scale, el }, k) => (
        <Place key={`more-${k}`} at={at} delay={next()} scale={S * scale}>
          {el}
        </Place>
      ))}

      {/* sky */}
      <Flight d={FLIGHT} scale={S} />
      <g className="clouds">
        {CLOUDS.map((c, k) => (
          <g key={k} transform={`translate(0 ${c.y})`}>
            <g className="cloud-drift" style={{ '--dur': `${c.dur}s`, animationDelay: `${c.delay}s` } as CSSProperties}>
              <Cloud scale={c.scale} />
            </g>
          </g>
        ))}
      </g>
    </g>
  )
}
