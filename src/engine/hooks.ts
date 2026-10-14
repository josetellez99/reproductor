import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { SceneContext, type InterceptKind, type Interceptor, type SceneApi } from './context'

function useSceneContext() {
  const ctx = useContext(SceneContext)
  if (!ctx) throw new Error('Scene hooks must be used inside a scene component')
  return ctx
}

/** Access the deck from inside a scene: mode, index, next/prev… */
export function useScene(): SceneApi {
  return useSceneContext()
}

function useInterceptor(kind: InterceptKind, fn: Interceptor) {
  const { register } = useSceneContext()
  const fnRef = useRef(fn)
  useLayoutEffect(() => {
    fnRef.current = fn
  })
  useEffect(() => register(kind, () => fnRef.current()), [register, kind])
}

/**
 * Runs before the deck moves forward. Return `true` to keep the deck on this
 * scene (e.g. to reveal an internal step instead).
 */
export function useNextInterceptor(fn: Interceptor) {
  useInterceptor('next', fn)
}

/** Same as useNextInterceptor, for going back. */
export function usePrevInterceptor(fn: Interceptor) {
  useInterceptor('prev', fn)
}
