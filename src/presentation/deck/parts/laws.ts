import type { ComponentType, SVGProps } from 'react'
import { IconBank, IconChild, IconHealth, IconSchool } from './icons'
import type { Milestone } from './Timeline'

export interface FederalLaw {
  acronym: string
  name: string
  year: number
  data: string
  sector: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  level: number
}

/** Layer 1: federal laws, each for one kind of data. */
export const FEDERAL_LAWS: FederalLaw[] = [
  { acronym: 'FERPA', name: 'Family Educational Rights and Privacy Act', year: 1974, data: 'Student records', sector: 'Education', icon: IconSchool, level: 0 },
  { acronym: 'HIPAA', name: 'Health Insurance Portability and Accountability Act', year: 1996, data: 'Health data', sector: 'Healthcare', icon: IconHealth, level: 0 },
  { acronym: 'COPPA', name: "Children's Online Privacy Protection Act", year: 1998, data: "Children's data (under 13)", sector: 'Online services', icon: IconChild, level: 1 },
  { acronym: 'GLBA', name: 'Gramm-Leach-Bliley Act', year: 1999, data: 'Bank & financial data', sector: 'Finance', icon: IconBank, level: 2 },
]

export const FEDERAL_MILESTONES: Milestone[] = FEDERAL_LAWS.map((l) => ({ year: l.year, label: l.acronym, level: l.level }))

export const CCPA_MILESTONE: Milestone = { year: 2018, label: 'CCPA · California', accent: true }

/** Layer 2: states with their own CCPA-style law, grouped as in the script. */
export const STATE_GROUPS: { year: number; states: string[] }[] = [
  { year: 2021, states: ['Virginia', 'Colorado'] },
  { year: 2023, states: ['Texas'] },
  { year: 2026, states: ['Indiana', 'Kentucky', 'Rhode Island'] },
]
