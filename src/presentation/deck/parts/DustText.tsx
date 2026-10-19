import { useEffect, useRef } from 'react'
import { useScene } from '../../../engine'

interface DustTextProps {
  text: string
  /** Canvas size in canvas px. */
  width: number
  height: number
  fontSize: number
  color: string
  /** ms before the dust starts gathering. */
  delay?: number
}

const STEP = 3 // sampling grid: one particle every STEP px of glyph
const FLY = 1.3 // seconds each particle takes to land
const SWEEP = 1.1 // seconds between the first and last letters starting
const SETTLE = 0.5 // crossfade from dust to solid text

/** Reverse "snap": a cloud of dust drifts in from the right and settles into solid, glowing text. */
export function DustText({ text, width, height, fontSize, color, delay = 0 }: DustTextProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const { mode } = useScene()

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    const font = `700 ${fontSize}px "Space Grotesk Variable"`
    let raf = 0
    let cancelled = false

    const setFont = (c: CanvasRenderingContext2D) => {
      c.font = font
      c.textAlign = 'center'
      c.textBaseline = 'middle'
    }
    const drawSolid = (alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      setFont(ctx)
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 50
      ctx.fillText(text, width / 2, height / 2)
      ctx.shadowBlur = 0
      ctx.fillText(text, width / 2, height / 2)
      ctx.restore()
    }

    document.fonts.load(font).then(() => {
      if (cancelled) return
      if (mode === 'thumb') return drawSolid(1)

      // Where the glyphs are: sample an offscreen copy.
      const off = document.createElement('canvas')
      off.width = width
      off.height = height
      const o = off.getContext('2d')!
      setFont(o)
      o.fillText(text, width / 2, height / 2)
      const px = o.getImageData(0, 0, width, height).data
      const dust: { tx: number; ty: number; sx: number; sy: number; d: number }[] = []
      for (let y = 0; y < height; y += STEP) {
        for (let x = 0; x < width; x += STEP) {
          if (px[(y * width + x) * 4 + 3] < 128) continue
          const r = Math.random()
          dust.push({
            tx: x,
            ty: y,
            sx: x + 120 + Math.random() * 520,
            sy: y - 220 + Math.random() * 300 - r * 120,
            d: (x / width) * SWEEP + Math.random() * 0.35,
          })
        }
      }

      const assembled = SWEEP + 0.35 + FLY
      const t0 = performance.now() + delay
      const tick = (now: number) => {
        const t = (now - t0) / 1000
        const settle = Math.min(1, Math.max(0, (t - assembled + 0.2) / SETTLE))
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = color
        for (const p of dust) {
          const k = Math.min(1, Math.max(0, (t - p.d) / FLY))
          if (k <= 0) continue
          const e = 1 - (1 - k) ** 3
          ctx.globalAlpha = k * (1 - settle)
          ctx.fillRect(p.sx + (p.tx - p.sx) * e, p.sy + (p.ty - p.sy) * e, 2.4, 2.4)
        }
        ctx.globalAlpha = 1
        if (settle > 0) drawSolid(settle)
        if (settle < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [mode, text, width, height, fontSize, color, delay])

  return <canvas ref={ref} width={width} height={height} className="dust-text" role="img" aria-label={text} />
}
