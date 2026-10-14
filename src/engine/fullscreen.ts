import { useEffect, useSyncExternalStore } from 'react'

/** Must be called from a user gesture (click / key). Fails silently: the deck still plays windowed. */
export async function enterFullscreen() {
  if (document.fullscreenElement) return
  try {
    await document.documentElement.requestFullscreen({ navigationUI: 'hide' })
  } catch {
    // Denied or unsupported (e.g. inside an iframe).
  }
}

export function exitFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
}

function subscribe(cb: () => void) {
  document.addEventListener('fullscreenchange', cb)
  return () => document.removeEventListener('fullscreenchange', cb)
}

export function useIsFullscreen() {
  return useSyncExternalStore(subscribe, () => !!document.fullscreenElement)
}

/** Calls `cb` when the document leaves fullscreen. */
export function useFullscreenExit(cb: () => void) {
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) cb()
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [cb])
}
