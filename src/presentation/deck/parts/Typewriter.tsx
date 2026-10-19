import { useEffect, useState } from 'react'
import { useScene } from '../../../engine'

/**
 * Types `text` one character at a time after `delay` ms, with a blinking caret.
 * The untyped rest is kept invisible so centred text never shifts. Thumbnails show it whole.
 */
export function Typewriter({ text, delay = 0, speed = 55, className }: { text: string; delay?: number; speed?: number; className?: string }) {
  const { mode } = useScene()
  const [typed, setTyped] = useState(mode === 'thumb' ? text.length : -1)

  useEffect(() => {
    if (mode === 'thumb') return
    let iv = 0
    const t = window.setTimeout(() => {
      let i = 0
      setTyped(0)
      iv = window.setInterval(() => {
        i++
        setTyped(i)
        if (i >= text.length) window.clearInterval(iv)
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(t)
      window.clearInterval(iv)
    }
  }, [mode, text, delay, speed])

  const n = Math.max(0, typed)
  return (
    <span className={className}>
      {text.slice(0, n)}
      {typed >= 0 && typed < text.length && <span className="tw-caret" aria-hidden="true" />}
      <span style={{ visibility: 'hidden' }}>{text.slice(n)}</span>
    </span>
  )
}
