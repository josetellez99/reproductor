/** USA vs Spain (EU): the comparison table from the summary, one row per aspect. */

export interface Side {
  lead: string
  detail: string
}

export interface CompareRow {
  aspect: string
  us: Side
  es: Side
}

export const COMPARE_MODEL: CompareRow[] = [
  {
    aspect: 'Legal model',
    us: { lead: 'Sectoral & fragmented', detail: 'HIPAA, GLBA, COPPA… plus about 20 comprehensive state laws' },
    es: { lead: 'Comprehensive & horizontal', detail: 'GDPR covers almost all personal data, complemented by the LOPDGDD' },
  },
  {
    aspect: 'Philosophy',
    us: { lead: 'Market-oriented', detail: 'Notice-and-consent and self-regulation; FTC acts against deception' },
    es: { lead: 'Rights-based', detail: 'A fundamental right (EU Charter, Art. 8): minimisation, purpose limitation' },
  },
  {
    aspect: 'Legal basis',
    us: { lead: 'Allowed if disclosed', detail: 'Consent mainly for sensitive data or in specific state laws' },
    es: { lead: 'One of six legal bases', detail: 'Consent · contract · legal obligation · vital interests · public interest · legitimate interest' },
  },
  {
    aspect: 'Individual rights',
    us: { lead: 'Vary by state', detail: 'Typically access, deletion, correction, opt-out of sales or targeted ads' },
    es: { lead: 'Uniform rights', detail: 'Access, rectification, erasure, restriction, portability, objection, no automated decisions' },
  },
  {
    aspect: 'Supervisory authority',
    us: { lead: 'No national authority', detail: 'The FTC (federal) and State Attorneys General enforce' },
    es: { lead: 'AEPD', detail: 'Independent Spanish agency, coordinated through the European Data Protection Board' },
  },
]

export const COMPARE_ENFORCEMENT: CompareRow[] = [
  {
    aspect: 'Private right of action',
    us: { lead: 'Largely absent', detail: 'Limited exceptions, e.g. certain data breaches in California' },
    es: { lead: 'Yes', detail: 'Complain to the AEPD, go to court and claim damages (GDPR Art. 82)' },
  },
  {
    aspect: 'Sanctions',
    us: { lead: 'Set by each statute or state', detail: 'Civil penalties per violation and FTC consent orders' },
    es: { lead: 'Up to €20M or 4%', detail: 'Of global annual turnover, whichever is higher' },
  },
  {
    aspect: 'Minors',
    us: { lead: 'Under 13 · COPPA', detail: 'Some states add design codes and limits on teen data' },
    es: { lead: 'Consent age: 14', detail: 'The LOPDGDD also recognises digital rights, such as digital education' },
  },
  {
    aspect: 'International transfers',
    us: { lead: 'Few restrictions', detail: 'Data from the EU arrives through the EU-U.S. Data Privacy Framework' },
    es: { lead: 'Adequacy or safeguards', detail: 'Needed to leave the EU (e.g. standard contractual clauses)' },
  },
]
