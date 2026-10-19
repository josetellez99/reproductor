import type { Scene } from '../engine'
import group from './deck/00-group'
import title from './deck/01-title'
import unclesam from './deck/01b-uncle-sam'
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
import threeQuestions from './deck/14-three-questions'
import sephoraFine from './deck/15-sephora-fine'
import whyRisk from './deck/16-why-risk'
import credentialStuffing from './deck/17-credential-stuffing'
import bruteForce from './deck/18-brute-force'
import sephoraRemediation from './deck/19-sephora-remediation'
import debateFor from './deck/20-debate-for'
import debateAgainst from './deck/21-debate-against'
import tradeOff from './deck/22-trade-off'
import usVsSpain from './deck/23-us-vs-spain'
import compareModel from './deck/24-compare-model'
import compareEnforcement from './deck/25-compare-enforcement'
import gdprFines from './deck/26-gdpr-fines'
import discussion from './deck/27-discussion'
import bridges from './deck/28-bridges'
import sources from './deck/29-sources'
import thanks from './deck/30-thanks'
import './theme.css'
import './deck/deck.css'

/** The presentation: scenes in playback order. Engine demos live in ./demo. */
export const scenes: Scene[] = [
  group,
  title,
  unclesam,
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
  threeQuestions,
  sephoraFine,
  whyRisk,
  credentialStuffing,
  bruteForce,
  sephoraRemediation,
  debateFor,
  debateAgainst,
  tradeOff,
  usVsSpain,
  compareModel,
  compareEnforcement,
  gdprFines,
  discussion,
  bridges,
  sources,
  thanks,
]
