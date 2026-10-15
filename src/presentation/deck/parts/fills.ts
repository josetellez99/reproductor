import { STATES } from '../../../components/usmap'
import { HIGHLIGHT } from '../../palette'

/** Every state in one colour: "the whole country". */
export const WHOLE_COUNTRY: Record<string, string> = Object.fromEntries(STATES.map((s) => [s.name, HIGHLIGHT]))

/** Only these states highlighted. */
export function only(names: string[], color: string = HIGHLIGHT): Record<string, string> {
  return Object.fromEntries(names.map((n) => [n, color]))
}
