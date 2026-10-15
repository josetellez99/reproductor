import type { Scene } from '../engine'
import title from './deck/01-title'
import revolutions from './deck/02-revolutions'
import areas from './deck/03-areas'
import dataPrivacy from './deck/04-data-privacy'
import federal from './deck/05-federal'
import federalLaws from './deck/06-federal-laws'
import ccpa2018 from './deck/07-ccpa-2018'
import ccpaRights from './deck/08-ccpa-rights'
import cambridge from './deck/09-2018-cambridge'
import gdpr from './deck/10-gdpr'
import statesFollow from './deck/11-states-follow'
import ccpaStandard from './deck/12-ccpa-standard'
import itDepends from './deck/13-it-depends'
import './theme.css'
import './deck/deck.css'

/** The presentation: scenes in playback order. Engine demos live in ./demo. */
export const scenes: Scene[] = [
  title,
  revolutions,
  areas,
  dataPrivacy,
  federal,
  federalLaws,
  ccpa2018,
  ccpaRights,
  cambridge,
  gdpr,
  statesFollow,
  ccpaStandard,
  itDepends,
]
