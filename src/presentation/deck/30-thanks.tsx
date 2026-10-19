import { useEffect, useRef } from 'react'
import { defineScene, STAGE_H, STAGE_W, useScene } from '../../engine'
import ar from 'flag-icons/flags/4x3/sa.svg'
import br from 'flag-icons/flags/4x3/pt.svg'
import cn from 'flag-icons/flags/4x3/cn.svg'
import cz from 'flag-icons/flags/4x3/cz.svg'
import de from 'flag-icons/flags/4x3/de.svg'
import dk from 'flag-icons/flags/4x3/dk.svg'
import es from 'flag-icons/flags/4x3/es.svg'
import fi from 'flag-icons/flags/4x3/fi.svg'
import fr from 'flag-icons/flags/4x3/fr.svg'
import gr from 'flag-icons/flags/4x3/gr.svg'
import hu from 'flag-icons/flags/4x3/hu.svg'
import id from 'flag-icons/flags/4x3/id.svg'
import il from 'flag-icons/flags/4x3/il.svg'
import inFlag from 'flag-icons/flags/4x3/in.svg'
import it from 'flag-icons/flags/4x3/it.svg'
import jp from 'flag-icons/flags/4x3/jp.svg'
import ke from 'flag-icons/flags/4x3/ke.svg'
import kr from 'flag-icons/flags/4x3/kr.svg'
import nl from 'flag-icons/flags/4x3/nl.svg'
import no from 'flag-icons/flags/4x3/no.svg'
import ph from 'flag-icons/flags/4x3/ph.svg'
import pl from 'flag-icons/flags/4x3/pl.svg'
import ro from 'flag-icons/flags/4x3/ro.svg'
import ru from 'flag-icons/flags/4x3/ru.svg'
import se from 'flag-icons/flags/4x3/se.svg'
import th from 'flag-icons/flags/4x3/th.svg'
import tr from 'flag-icons/flags/4x3/tr.svg'
import ua from 'flag-icons/flags/4x3/ua.svg'
import us from 'flag-icons/flags/4x3/us.svg'
import vn from 'flag-icons/flags/4x3/vn.svg'

// "Thank you" in 30 languages, each with the flag of a country that speaks it.
const THANKS = [
  { word: 'Gracias', flag: es, lang: 'Spanish' },
  { word: 'Thank you', flag: us, lang: 'English' },
  { word: 'Merci', flag: fr, lang: 'French' },
  { word: 'Danke', flag: de, lang: 'German' },
  { word: 'Grazie', flag: it, lang: 'Italian' },
  { word: 'Obrigado', flag: br, lang: 'Portuguese' },
  { word: 'ありがとう', flag: jp, lang: 'Japanese' },
  { word: '谢谢', flag: cn, lang: 'Chinese' },
  { word: '감사합니다', flag: kr, lang: 'Korean' },
  { word: 'Спасибо', flag: ru, lang: 'Russian' },
  { word: 'شكراً', flag: ar, lang: 'Arabic' },
  { word: 'धन्यवाद', flag: inFlag, lang: 'Hindi' },
  { word: 'Dank je', flag: nl, lang: 'Dutch' },
  { word: 'Tack', flag: se, lang: 'Swedish' },
  { word: 'Takk', flag: no, lang: 'Norwegian' },
  { word: 'Tak', flag: dk, lang: 'Danish' },
  { word: 'Kiitos', flag: fi, lang: 'Finnish' },
  { word: 'Dziękuję', flag: pl, lang: 'Polish' },
  { word: 'Teşekkürler', flag: tr, lang: 'Turkish' },
  { word: 'Ευχαριστώ', flag: gr, lang: 'Greek' },
  { word: 'תודה', flag: il, lang: 'Hebrew' },
  { word: 'Köszönöm', flag: hu, lang: 'Hungarian' },
  { word: 'Děkuji', flag: cz, lang: 'Czech' },
  { word: 'Mulțumesc', flag: ro, lang: 'Romanian' },
  { word: 'Дякую', flag: ua, lang: 'Ukrainian' },
  { word: 'Terima kasih', flag: id, lang: 'Indonesian' },
  { word: 'ขอบคุณ', flag: th, lang: 'Thai' },
  { word: 'Cảm ơn', flag: vn, lang: 'Vietnamese' },
  { word: 'Salamat', flag: ph, lang: 'Filipino' },
  { word: 'Asante', flag: ke, lang: 'Swahili' },
]

interface Body {
  el: HTMLDivElement
  w: number
  h: number
  x: number
  y: number
  vx: number
  vy: number
}

/** How much two boxes overlap on each axis, or null if they don't touch. */
function overlap(a: Omit<Body, 'el'>, b: Omit<Body, 'el'>) {
  const x = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
  const y = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
  return x > 0 && y > 0 ? { x, y } : null
}

/** Closing: every "thank you" drifts around the screen, bouncing off the edges and off each other. */
function Thanks() {
  const { mode } = useScene()
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const bodies: Body[] = []
    for (const el of refs.current) {
      if (!el) continue
      const w = el.offsetWidth
      const h = el.offsetHeight
      const angle = Math.random() * Math.PI * 2
      const speed = 70 + Math.random() * 130
      const b = { el, w, h, x: 0, y: 0, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed }
      // Start somewhere free (give up after a few tries rather than loop forever).
      for (let tries = 0; tries < 60; tries++) {
        b.x = Math.random() * (STAGE_W - w)
        b.y = Math.random() * (STAGE_H - h)
        if (!bodies.some((o) => overlap(b, o))) break
      }
      bodies.push(b)
    }
    const place = (b: Body) => {
      b.el.style.transform = `translate(${b.x}px, ${b.y}px)`
    }
    bodies.forEach((b) => {
      place(b)
      b.el.dataset.ready = 'true'
    })
    if (mode === 'thumb') return

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      for (const b of bodies) {
        b.x += b.vx * dt
        b.y += b.vy * dt
        // Bounce: clamp inside the stage and point the velocity back inwards.
        if (b.x < 0 || b.x > STAGE_W - b.w) {
          b.x = Math.min(Math.max(b.x, 0), STAGE_W - b.w)
          b.vx = b.x === 0 ? Math.abs(b.vx) : -Math.abs(b.vx)
        }
        if (b.y < 0 || b.y > STAGE_H - b.h) {
          b.y = Math.min(Math.max(b.y, 0), STAGE_H - b.h)
          b.vy = b.y === 0 ? Math.abs(b.vy) : -Math.abs(b.vy)
        }
      }
      // Words bump into each other like balls: push apart along the shallow axis and swap speeds (equal mass).
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i]
          const c = bodies[j]
          const o = overlap(a, c)
          if (!o) continue
          if (o.x < o.y) {
            const s = a.x < c.x ? -1 : 1
            a.x += (s * o.x) / 2
            c.x -= (s * o.x) / 2
            if ((c.x - a.x) * (c.vx - a.vx) < 0) [a.vx, c.vx] = [c.vx, a.vx]
          } else {
            const s = a.y < c.y ? -1 : 1
            a.y += (s * o.y) / 2
            c.y -= (s * o.y) / 2
            if ((c.y - a.y) * (c.vy - a.vy) < 0) [a.vy, c.vy] = [c.vy, a.vy]
          }
        }
      }
      bodies.forEach(place)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mode])

  return (
    <div className="s-root thx-root">
      {THANKS.map((t, i) => (
        <div
          key={t.lang}
          ref={(el) => {
            refs.current[i] = el
          }}
          className="thx-word"
          data-first={i === 0}
          style={{ transitionDelay: `${i * 60}ms` }}
          title={t.lang}
        >
          <img src={t.flag} alt="" />
          <span>{t.word}</span>
        </div>
      ))}
    </div>
  )
}

export default defineScene({
  id: 'thanks',
  title: 'Thank you · 30 languages',
  component: Thanks,
  transition: 'fade',
  notes: 'Thank you! Gracias! Any questions?',
})
