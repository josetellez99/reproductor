# Escena

Reproductor de presentaciones por **escenas**. Cada `→` pasa a la siguiente escena; una escena puede ser cualquier cosa que React y Motion puedan pintar: cambiar un color, una animación encadenada, una tabla con motion graphics, zonas clicables, campos de texto…

```bash
pnpm install
pnpm dev
```

- **Reproducir** (`P` / `Enter`): pantalla completa + escena 1. Salir de pantalla completa (`Esc`) vuelve al inicio.
- **Testear** (`T`): grid con todas las escenas. Click en una para verla en vivo, interactiva, con notas, repetir y "desde aquí".

## Atajos

| Tecla | Acción |
| --- | --- |
| `→` `Espacio` `PageDown` | Siguiente |
| `←` `PageUp` | Anterior |
| `Inicio` / `Fin` | Primera / última |
| `Esc` | Salir (player) / volver al grid (inspector) |

Las teclas se ignoran mientras escribes en un `input`/`textarea`, y cuando una escena ya ha hecho `event.preventDefault()`. Hacer click dentro del lienzo nunca avanza: solo el botón `→` en pantalla.

## Crear una escena

1. Crea `src/presentation/scenes/06-loquesea.tsx`:

```tsx
import { motion } from 'motion/react'
import { defineScene } from '../../engine'

function MiEscena() {
  return (
    <div className="s-root s-center">
      <motion.h1 className="s-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Hola
      </motion.h1>
    </div>
  )
}

export default defineScene({
  id: 'mi-escena',          // único
  title: 'Mi escena',       // nombre en el grid
  component: MiEscena,
  transition: 'fade',       // 'fade' | 'none' | 'slide' | 'zoom' | Variants propias
  notes: 'Notas del ponente',
})
```

2. Añádela a la lista en `src/presentation/index.ts` (el orden de la lista es el orden de reproducción).

El lienzo mide siempre **1920×1080** y se escala a la pantalla: diseña en esos píxeles.

## API para escenas (`src/engine`)

- `useScene()` → `{ mode, index, total, isActive, next, prev, goTo }`. `mode` es `'play'`, `'test'` o `'thumb'` (miniatura del grid: útil para mostrar el estado final o no arrancar timers).
- `useNextInterceptor(fn)` / `usePrevInterceptor(fn)` → si `fn` devuelve `true`, la escena se queda con la pulsación (pasos internos, bloquear avance…). Ver `05-steps.tsx`.
- `toStagePoint(event, element)` → coordenadas del puntero en píxeles del lienzo.
- **Continuidad entre escenas**: elementos con el mismo `layoutId` en escenas consecutivas se transforman de una a otra (posición, tamaño) en vez de cortar. Ver `01-intro` → `02-color` → `03-motion-table` (la píldora viaja).

Piezas reutilizables opcionales en `src/presentation/kit.tsx` (`Backdrop`, `Kicker`), colores animables en `palette.ts` y estilos compartidos en `theme.css`.

## La presentación

`src/presentation/index.ts` lista las escenas del deck real (`src/presentation/deck/`). Las piezas compartidas viven en `deck/parts/` (mapa de leyes con `layoutId`, timeline, nube, texto bandera, datos de leyes). Las demos del motor siguen en `src/presentation/demo/` como plantilla.

Hooks extra para escenas: `useSteps(n)` (pasos internos con → / ←) y `useAfter(ms)` (momentos temporizados; inmediatos en miniaturas).

## Estructura

```
src/
  engine/         motor: lienzo, transiciones, navegación, hooks
  presentation/   la presentación: escenas + kit + tema
  home/           pantalla de inicio
  player/         reproductor a pantalla completa
  tester/         grid de escenas + inspector
```

## Mapa de EE. UU. (`src/components/usmap`)

Dos piezas separadas:

- `<UsMap>`: mapa base plano con todas las fronteras de estados (datos `us-atlas`, proyección Albers USA con Alaska y Hawái). Props: `fills` (color por nombre de estado), `onStateClick`, `onStateHover`, `viewBox` (cambiarlo anima zoom/paneo).
- `<UsMapLife>`: capa de vida opcional (monumentos, vehículos, clima). Va como hijo de `<UsMap>`.

Para poner cualquier cosa sobre el mapa por coordenadas: `<Place at={[lon, lat]}>…</Place>` (el `0,0` del dibujo cae en ese punto). `routeThrough([[lon, lat], …])` devuelve un path suave para rutas.

```tsx
<UsMap fills={{ Texas: '#d4002a' }}>
  <UsMapLife />
  <Place at={[-74.0, 40.7]}>{/* tu SVG */}</Place>
</UsMap>
```
