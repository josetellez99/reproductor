import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { defineScene } from '../../engine'
import { ease } from '../palette'

/** APA 7 reference list, alphabetical by first author. Italics follow APA: journal + volume, report titles, site names. */
const REFERENCES: { key: string; entry: ReactNode; url: string }[] = [
  {
    key: 'espere',
    entry: (
      <>
        Espere, R. (2025). Data privacy in the United States: Challenges, proposals, and a bipartisan framework for comprehensive reform.{' '}
        <i>University of St. Thomas Journal of Law &amp; Public Policy, 18</i>(2), 739.
      </>
    ),
    url: 'https://researchonline.stthomas.edu/esploro/outputs/journalArticle/Data-Privacy-in-the-United-States/991015317234203691',
  },
  {
    key: 'lacasse',
    entry: (
      <>
        LaCasse, A. (2026, June 4). US SECURE Data Act faces criticism during first hearing in Congress. <i>IAPP</i>.
      </>
    ),
    url: 'https://iapp.org/news/a/us-secure-data-act-faces-criticism-during-first-hearing-in-Congress',
  },
  {
    key: 'nist',
    entry: (
      <>
        National Institute of Standards and Technology. (2026, September 22). <i>Privacy Framework perspectives and success stories</i>.
      </>
    ),
    url: 'https://www.nist.gov/privacy-framework/getting-started-0/perspectives-and-success-stories',
  },
  {
    key: 'rudden',
    entry: (
      <>
        Rudden, L. (2025). Fragmented data privacy laws: Time for federal legislation. <i>Boston College Intellectual Property and Technology Forum, 2025</i>, 1–18.
      </>
    ),
    url: 'https://lira.bc.edu/works/publication-article/5zdd1-78j83',
  },
  {
    key: 'tong',
    entry: (
      <>
        Tong, H. (2026, June 4). FTC enforcement trends in 2026: What your terms of service and privacy policy must address. <i>TOS Lawyer</i>.
      </>
    ),
    url: 'https://toslawyer.com/ftc-enforcement-trends-in-2026-what-your-terms-of-service-and-privacy-policy-must-address/',
  },
  {
    key: 'gao',
    entry: (
      <>
        U.S. Government Accountability Office. (2022). <i>Consumer data: Increasing use poses risks to privacy</i> (GAO-22-106096).
      </>
    ),
    url: 'https://www.gao.gov/products/gao-22-106096',
  },
  {
    key: 'wilsmann',
    entry: (
      <>
        Wilsmann, M. (2024, October 3). The FTC’s new report reaffirms Big Tech’s personal data overreach – What’s new? <i>Public Knowledge</i>.
      </>
    ),
    url: 'https://publicknowledge.org/the-ftcs-new-report-reaffirms-big-techs-personal-data-overreach-whats-new/',
  },
]

/** References in APA 7th edition. */
function Sources() {
  return (
    <div className="s-root src-root">
      <header className="src-head">
        <motion.h2 className="src-title" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }}>
          SOURCES
        </motion.h2>
        <motion.p className="src-aside" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
          Nobody will read this… but here it is.
        </motion.p>
      </header>

      <ol className="src-list">
        {REFERENCES.map((r, i) => (
          <motion.li key={r.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}>
            {r.entry} <span className="src-url">{r.url}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

export default defineScene({
  id: 'sources',
  title: 'Sources (APA)',
  component: Sources,
  transition: 'fade',
  notes: 'These are the sources we used, in APA format.',
})
