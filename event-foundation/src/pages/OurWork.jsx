import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { workFilters, workProjects } from '../data/workProjects'

function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredWorks = useMemo(() => {
    if (activeFilter === 'All') return workProjects
    return workProjects.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="our-work-page">
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80)',
        }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="breadcrumb-wrap"
          >
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <span className="current">Our Work</span>
          </motion.p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container work-intro-copy">
          <span className="section-label">PROJECT PORTFOLIO</span>
          <h2>Signature Work Across Premier Venues</h2>
          <p>
            Explore selected projects from weddings, corporate productions, social evenings, and destination celebrations.
            Each card highlights where the work was delivered and opens a dedicated case-study page.
          </p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container filter-tabs">
          {workFilters.map((filter) => (
            <motion.button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'active' : ''}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <motion.div 
            layout
            className="work-project-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((item, index) => {
                // Unique variants for a more premium, varied entrance
                const cardAnimations = [
                  { initial: { opacity: 0, x: -30, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },
                  { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
                  { initial: { opacity: 0, x: 30, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },
                  { initial: { opacity: 0, scale: 0.9, rotate: -2 }, animate: { opacity: 1, scale: 1, rotate: 0 } },
                  { initial: { opacity: 0, scale: 0.9, rotate: 2 }, animate: { opacity: 1, scale: 1, rotate: 0 } }
                ];
                
                const variant = cardAnimations[index % cardAnimations.length];

                return (
                  <motion.article
                    layout
                    key={item.slug}
                    className="work-project-card"
                    initial={variant.initial}
                    whileInView={variant.animate}
                    exit={{ opacity: 0, scale: 0.8 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (index % 3) * 0.1, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    whileHover={{ 
                      y: -12,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  >
                    <div className="work-project-media">
                      <img src={item.coverImage} alt={item.title} loading="lazy" />
                      <span className="category-tag">{item.category}</span>
                      <div className="card-overlay" />
                    </div>
                    <div className="work-project-body">
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <div className="work-project-meta">
                        <div className="location">
                          <span className="icon">📍</span>
                          <strong>{item.location}</strong>
                        </div>
                        <em className="year-tag">{item.year}</em>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link to={`/our-work/${item.slug}`} className="btn-gold-card">
                          View Case Study
                          <span className="arrow">→</span>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default OurWork
