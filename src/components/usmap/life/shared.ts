// Drawing conventions for map life:
// - each drawing has its base at (0,0) and grows upwards (negative y)
// - light comes from the top-left: left faces light, right faces dark
// - units are map units (~1.75px each on a 1920px canvas)

export const SHADOW = 'rgba(0,0,0,0.45)'

export const C = {
  white: '#f4f0e8',
  whiteShade: '#c9c2b4',
  stone: '#d8d0c0',
  stoneShade: '#a49b8b',
  copper: '#7fcdb6',
  copperShade: '#4a9e88',
  crimson: '#e3122c',
  crimsonShade: '#a50d20',
  orange: '#e8532f',
  orangeShade: '#b33a20',
  gold: '#ffd23f',
  flame: '#ffb02e',
  grass: '#4caf6a',
  grassShade: '#2f7d4a',
  wood: '#a8743f',
  woodShade: '#7a512b',
  water: '#3b8fd9',
  glass: '#bfe3ff',
  dark: '#26262e',
  rock: '#9a9488',
  rockShade: '#6d685f',
} as const

/** Quadratic bezier y at x, for cables between (x0,y0)–(x1,y1) with control cy at the midpoint. */
export function quadY(x: number, x0: number, x1: number, yEnds: number, cy: number) {
  const t = (x - x0) / (x1 - x0)
  return (1 - t) ** 2 * yEnds + 2 * (1 - t) * t * cy + t ** 2 * yEnds
}
