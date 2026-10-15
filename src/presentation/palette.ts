// Literal colours for animating in scenes (Motion can't tween CSS variables).
export const palette = {
  ink: '#f2efe9',
  muted: '#8b8893',
  crimson: '#d4002a',
  crimsonHi: '#ff2d55',
  bg: '#0a0a0d',
} as const

export const ease = [0.22, 1, 0.36, 1] as const

/** Highlight used for "this is the area we're talking about" on maps. */
export const HIGHLIGHT = '#c8102e'
