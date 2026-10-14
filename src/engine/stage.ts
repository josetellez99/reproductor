/** Every scene is designed on this fixed canvas and scaled to fit the screen. */
export const STAGE_W = 1920
export const STAGE_H = 1080

/**
 * Converts a pointer event to canvas coordinates (0–1920 × 0–1080),
 * relative to `el` (usually the element that received the event).
 */
export function toStagePoint(e: { clientX: number; clientY: number }, el: Element) {
  const rect = el.getBoundingClientRect()
  const scale = rect.width / el.clientWidth || 1
  return {
    x: (e.clientX - rect.left) / scale,
    y: (e.clientY - rect.top) / scale,
  }
}
