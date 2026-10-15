import type { StateShape } from './geo'

/** fillDelay helper: highlight travels west → east over `duration` seconds. */
export function sweepWestToEast(duration = 1.2, start = 0) {
  return (s: StateShape) => start + Math.max(0, Math.min(1, (s.centroid[0] - 40) / 880)) * duration
}
