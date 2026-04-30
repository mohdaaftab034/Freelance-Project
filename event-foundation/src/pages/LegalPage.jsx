import { motion } from 'framer-motion'

function LegalPage({ title, breadcrumb, intro, sections, updatedAt }) {
  return (
    <div className="legal-page legal-page-luxe">
      <motion.section
        className="page-hero legal-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="legal-hero-overlay" />
        <div className="container legal-hero-content">
          <motion.p
            className="legal-breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {breadcrumb}
          </motion.p>
          <motion.div
            className="hero-rule"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 80 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          />
          <motion.h1
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="legal-intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {intro}
          </motion.p>
        </div>
      </motion.section>

      <section className="section legal-content-section">
        <div className="container legal-layout">
          <aside className="legal-aside reveal">
            <div className="legal-aside-card">
              <span className="section-label">Last Updated</span>
              <p>{updatedAt}</p>
            </div>
            <div className="legal-aside-card">
              <span className="section-label">Navigation</span>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="legal-articles">
            {sections.map((section, index) => (
              <motion.article
                key={section.id}
                id={section.id}
                className="legal-card reveal"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: index * 0.04 }}
              >
                <div className="legal-card-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="legal-card-body">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                  {section.items && section.items.length > 0 && (
                    <ul className="legal-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LegalPage
