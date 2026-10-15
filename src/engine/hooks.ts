import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
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

/**
 * Internal steps driven by → / ←. Returns the current step (0…count).
 * Step 0 is the scene as it enters; each → reveals one more until `count`,
 * then → moves to the next scene. Thumbnails show `thumb` (default: last).
 */
export function useSteps(count: number, { thumb = count }: { thumb?: number } = {}) {
  const { mode } = useSceneContext()
  const [step, setStep] = useState(() => (mode === 'thumb' ? thumb : 0))

  useNextInterceptor(() => {
    if (step >= count) return false
    setStep(step + 1)
    return true
  })
  usePrevInterceptor(() => {
    if (step === 0) return false
    setStep(step - 1)
    return true
  })

  return step
}

/** True once `ms` have passed since mount (immediately in thumbnails). Handy for timed beats. */
export function useAfter(ms: number) {
  const { mode } = useSceneContext()
  const [done, setDone] = useState(mode === 'thumb')
  useEffect(() => {
    if (done) return
    const id = window.setTimeout(() => setDone(true), ms)
    return () => window.clearTimeout(id)
  }, [ms, done])
  return done
}
