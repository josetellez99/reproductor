import type { Scene } from '../engine'
import intro from './scenes/01-intro'
import titleColor from './scenes/02-color'
import motionTable from './scenes/03-motion-table'
import interactive from './scenes/04-interactive'
import steps from './scenes/05-steps'
import './theme.css'

/** The presentation: scenes in playback order. */
export const scenes: Scene[] = [intro, titleColor, motionTable, interactive, steps]
