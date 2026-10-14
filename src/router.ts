import { useSyncExternalStore } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'play'; index: number }
  | { name: 'test' }
  | { name: 'test-scene'; index: number }

function parse(hash: string): Route {
  const [section, rawIndex] = hash.replace(/^#\/?/, '').split('/')
  const index = Math.max(0, Number.parseInt(rawIndex ?? '', 10) || 0)
  switch (section) {
    case 'play':
      return { name: 'play', index }
    case 'test':
      return rawIndex === undefined ? { name: 'test' } : { name: 'test-scene', index }
    default:
      return { name: 'home' }
  }
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash)
  return parse(hash)
}

/** `path` like '/play/3'. `replace` avoids a history entry (scene-to-scene moves). */
export function navigate(path: string, { replace = false } = {}) {
  const hash = `#${path}`
  if (replace) window.location.replace(hash)
  else window.location.hash = hash
}
