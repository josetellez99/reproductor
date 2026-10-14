import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { InterceptKind, Interceptor } from './context'

export interface Deck {
  index: number
  total: number
  /** Returns false when nothing happened (already at the end and not intercepted). */
  next: () => boolean
  prev: () => boolean
  goTo: (index: number) => void
  register: (kind: InterceptKind, sceneIndex: number, fn: Interceptor) => () => void
}

interface Entry {
  kind: InterceptKind
  sceneIndex: number
  fn: Interceptor
}

/** Deck state lives outside (the URL); this hook adds navigation + interceptors. */
export function useDeck(index: number, total: number, onChange: (index: number) => void): Deck {
  const entries = useRef(new Set<Entry>())

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(total - 1, target))
      if (clamped !== index) onChange(clamped)
    },
    [index, total, onChange],
  )

  // Only the current scene may intercept: a scene still animating out keeps
  // its interceptors registered until it unmounts, so filter by index.
  const intercepted = useCallback(
    (kind: InterceptKind) =>
      [...entries.current]
        .filter((e) => e.kind === kind && e.sceneIndex === index)
        .reverse()
        .some((e) => e.fn() === true),
    [index],
  )

  const next = useCallback(() => {
    if (intercepted('next')) return true
    goTo(index + 1)
    return index < total - 1
  }, [intercepted, goTo, index, total])

  const prev = useCallback(() => {
    if (intercepted('prev')) return true
    goTo(index - 1)
    return index > 0
  }, [intercepted, goTo, index])

  const register = useCallback((kind: InterceptKind, sceneIndex: number, fn: Interceptor) => {
    const entry = { kind, sceneIndex, fn }
    entries.current.add(entry)
    return () => {
      entries.current.delete(entry)
    }
  }, [])

  return useMemo(
    () => ({ index, total, next, prev, goTo, register }),
    [index, total, next, prev, goTo, register],
  )
}

/** A deck that never moves, for thumbnails. */
export function staticDeck(index: number, total: number): Deck {
  const noop = () => {}
  const stay = () => false
  return { index, total, next: stay, prev: stay, goTo: noop, register: () => noop }
}

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

function isPressable(target: EventTarget | null) {
  return target instanceof HTMLElement && !!target.closest('button, a, [role="button"]')
}

/**
 * Global keyboard navigation. Ignores keys while typing in a field, and any
 * key a scene already handled with `event.preventDefault()`.
 */
export function useDeckKeyboard(deck: Deck, onEscape?: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (isEditable(e.target)) return

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          deck.next()
          break
        case ' ':
          // Space on a focused button already clicks it.
          if (isPressable(e.target)) return
          deck.next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          deck.prev()
          break
        case 'Home':
          deck.goTo(0)
          break
        case 'End':
          deck.goTo(deck.total - 1)
          break
        case 'Escape':
          if (!onEscape) return
          onEscape()
          break
        default:
          return
      }
      e.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [deck, onEscape])
}
