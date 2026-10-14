import { enterFullscreen } from '../engine/fullscreen'
import { navigate } from '../router'

/** Call from a click/key handler: fullscreen needs a user gesture. */
export function startPlayback(index = 0) {
  void enterFullscreen()
  navigate(`/play/${index}`)
}
