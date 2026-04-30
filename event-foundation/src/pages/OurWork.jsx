import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { workFilters } from '../data/workProjects'
import { getProjects } from '../utils/api'

function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        if (data.success) {
          setProjects(data.data)
        }
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const cardAnimations = [
    { initial: { opacity: 0, x: -24, y: 18 }, animate: { opacity: 1, x: 0, y: 0 } },
    { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } },
    { initial: { opacity: 0, x: 24, y: 18 }, animate: { opacity: 1, x: 0, y: 0 } },
    { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } },
    { initial: { opacity: 0, x: -14, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 } },
  ]

  const filterReveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

  const filteredWorks = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((item) => item.category === activeFilter)
  }, [activeFilter, projects])

  return (
    <div className="our-work-page our-work-page-luxe">
      <motion.section
        className="page-hero our-work-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80)',
        }}
      >
        <div className="our-work-hero-overlay" />
        <div className="container our-work-hero-content">
          <motion.div className="our-work-hero-rule" initial={{ width: 0, opacity: 0 }} animate={{ width: 80, opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }} />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.55, duration: 0.6 }}
            className="our-work-breadcrumb"
          >
            HOME / OUR WORK
          </motion.p>
        </div>
      </motion.section>

      <section className="section our-work-intro-section">
        <div className="container work-intro-copy">
          <motion.span className="section-label our-work-label" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            PROJECT PORTFOLIO
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Signature Work Across Premier Venues
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            Explore selected projects from weddings, corporate productions, social evenings, and destination celebrations.
            Each card is treated like an editorial spread and opens a dedicated case-study page.
          </motion.p>
        </div>
      </section>

      <section className="section our-work-filter-section">
        <div className="container filter-tabs filter-tabs-bar">
          <motion.div className="filter-tabs-inner" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {workFilters.map((filter) => (
              <motion.button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'active' : ''}
                onClick={() => setActiveFilter(filter)}
                variants={filterReveal}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section our-work-grid-section">
        <div className="container">
          <motion.div layout className="work-project-grid">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <motion.div
                  key="loading"
                  className="loading-state-luxe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0' }}
                >
                  <div className="luxe-loader"></div>
                  <p style={{ marginTop: '20px', color: 'var(--color-gold)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>Curating Portfolio...</p>
                </motion.div>
              ) : filteredWorks.length === 0 ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '80px 0',
                    color: 'var(--text-muted)',
                    fontFamily: 'Cormorant Garamond',
                    fontStyle: 'italic',
                    fontSize: '1.5rem',
                  }}
                >
                  No projects found in this category yet.
                </motion.div>
              ) : (
                filteredWorks.map((item, index) => {
                  const variant = cardAnimations[index % cardAnimations.length]

                  return (
                    <motion.article
                      layout
                      key={item.slug}
                      className="work-project-card"
                      initial={variant.initial}
                      whileInView={variant.animate}
                      exit={{ opacity: 0, scale: 0.8 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        duration: 0.8,
                        delay: (index % 3) * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.4, ease: 'easeOut' },
                      }}
                    >
                      <div className="work-project-media">
                        <img src={item.coverImage} alt={item.title} loading="lazy" />
                        <span className="category-tag">{item.category}</span>
                        <div className="card-overlay" />
                      </div>
                      <div className="work-project-body">
                        <em className="year-tag">{item.year}</em>
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                        <div className="work-project-meta">
                          <div className="location">
                            <span className="icon">•</span>
                            <strong>{item.location}</strong>
                          </div>
                        </div>
                        <Link to={`/our-work/${item.slug}`} className="case-study-link">
                          <span>View Case Study</span>
                          <span className="arrow">→</span>
                        </Link>
                      </div>
                    </motion.article>
                  )
                })
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <motion.section className="section our-work-cta" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div className="container our-work-cta-wrap">
          <div className="cta-rule" />
          <span className="section-label">Every Event is a Story Worth Telling</span>
          <h2>Every Event is a Story Worth Telling</h2>
          <p>
            Let&apos;s collaborate on your next celebration or production.
          </p>
          <div className="our-work-cta-actions">
            <Link to="/contact-us" className="our-work-cta-button primary">
              Start Planning
            </Link>
            <Link to="/services" className="our-work-cta-button secondary">
              View All Services
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default OurWork
