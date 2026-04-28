import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

function ServiceTemplate({
  title,
  image,
  breadcrumb,
  overview = [],
  overviewImage,
  included = [],
  gallery = [],
  features = [],
  styleVariant = '',
  timelineSteps = ['Discover', 'Design', 'Deliver', 'Delight'],
}) {
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [hoveredIncluded, setHoveredIncluded] = useState(null)
  const crumbItems = breadcrumb ? breadcrumb.split('>').map((item) => item.trim()) : ['Home', 'Services', title]
  const detailSections = [
    {
      label: 'About This Service',
      heading: `${title} Overview`,
      text: overview.slice(1, 3),
      image: overviewImage,
    },
    {
      label: 'Why Choose Us',
      heading: 'Tailored Excellence',
      text: overview.slice(3),
      image: overviewImage,
    },
  ].filter((section) => section.text.length > 0 && section.image)

  const sectionContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.12 },
    },
  }
  const sectionItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }
  const featureItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }
  const galleryItem = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <div className={`service-page service-page-luxe ${styleVariant}`}>
      <motion.section
        className="page-hero luxe-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="luxe-hero-overlay" />
        <div className="container luxe-hero-content">
          <motion.p className="luxe-breadcrumb" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            {crumbItems.map((item, index) => (
              <span key={`${item}-${index}`}>
                {item}
                {index < crumbItems.length - 1 && <span className="sep">/</span>}
              </span>
            ))}
          </motion.p>
          <motion.div className="hero-rule" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 80 }} transition={{ duration: 0.8, delay: 0.25 }} />
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}>
            {title}
          </motion.h1>
          <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}>
            <span className="scroll-line" />
          </motion.div>
        </div>
      </motion.section>

      {overview.length > 0 && (
        <motion.section className="section service-hero-overview luxe-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionContainer}>
          <div className="container">
            <motion.h2 className="hero-overview-text" variants={sectionItem}>
              {overview[0]}
            </motion.h2>
          </div>
        </motion.section>
      )}

      {detailSections.length > 0 && (
        <>
          {detailSections.map((section, index) => (
            <motion.section
              key={section.label}
              className="section alternating-section luxe-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={sectionContainer}
            >
              <div className={`container alternating-grid ${index % 2 === 0 ? 'alternating-left' : 'alternating-right'}`}>
                <motion.div className="alternating-content" variants={sectionItem}>
                  <div className="section-label">{section.label}</div>
                  <h3>{section.heading}</h3>
                  <div className="overview-paragraphs">
                    {section.text.map((para, paraIndex) => (
                      <motion.p key={`${section.label}-${paraIndex}`} variants={sectionItem}>
                        {para}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
                <motion.div className="alternating-image" variants={sectionItem}>
                  <img src={section.image} alt={`${title} ${section.label}`} loading="lazy" />
                </motion.div>
              </div>
            </motion.section>
          ))}
        </>
      )}

      {features && features.length > 0 && (
        <motion.section className="section features-premium-section luxe-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionContainer}>
          <div className="container">
            <motion.div className="section-header" variants={sectionItem}>
              <div className="section-label">Our Expertise</div>
              <h2>What We Deliver</h2>
            </motion.div>
            <motion.div className="feature-list" variants={sectionContainer}>
              {features.map((f, idx) => (
                <motion.div
                  key={idx}
                  className={`feature-list-item ${hoveredFeature === idx ? 'hovered' : ''}`}
                  variants={featureItem}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="feature-number">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="feature-copy">
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                  <motion.div className="feature-arrow" animate={{ x: hoveredFeature === idx ? 8 : 0 }} transition={{ duration: 0.28 }}>→</motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      <motion.section className="section included-premium-section luxe-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionContainer}>
        <div className="container">
          <motion.div className="section-header" variants={sectionItem}>
            <div className="section-label">Complete Package</div>
            <h2>What's Included</h2>
          </motion.div>
          <div className="included-premium-grid">
            {included.map((inc, idx) => (
              <motion.div
                key={idx}
                className={`included-premium-card ${hoveredIncluded === idx ? 'hovered' : ''}`}
                variants={sectionItem}
                onMouseEnter={() => setHoveredIncluded(idx)}
                onMouseLeave={() => setHoveredIncluded(null)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="included-icon-box" animate={{ scale: hoveredIncluded === idx ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
                  {inc.icon}
                </motion.div>
                <h3>{inc.title}</h3>
                <p>{inc.text}</p>
                <motion.div className="included-badge" animate={{ opacity: hoveredIncluded === idx ? 1 : 0.6 }} transition={{ duration: 0.3 }}>
                  ✓
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="section process-timeline-section luxe-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionContainer}>
        <div className="container">
          <motion.div className="section-header" variants={sectionItem}>
            <div className="section-label">Our Approach</div>
            <h2>How We Work</h2>
          </motion.div>
          <div className="process-timeline">
            {timelineSteps.map((step, index) => (
              <motion.div key={step} className="process-step" variants={sectionItem}>
                <motion.div
                  className="step-number"
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                >
                  {index + 1}
                </motion.div>
                <h3>{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {gallery && gallery.length > 0 && (
        <motion.section className="section service-gallery-section luxe-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionContainer}>
          <div className="container">
            <motion.div className="section-header" variants={sectionItem}>
              <div className="section-label">Our Work</div>
              <h2>Gallery</h2>
            </motion.div>
            <div className="service-gallery-scroll-wrap">
              <motion.div className="service-gallery-scroll" variants={sectionContainer}>
                {gallery.map((galleryImage, index) => (
                  <motion.div key={`${galleryImage}-${index}`} className="gallery-scroll-item" variants={galleryItem}>
                    <img src={galleryImage} alt={`${title} ${index + 1}`} loading="lazy" />
                    <div className="gallery-overlay" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      <motion.section className="section service-cta-premium luxe-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={sectionContainer}>
        <div className="cta-bg" style={{ backgroundImage: `url(${overviewImage || image})` }} />
        <div className="container service-cta-wrap">
          <motion.div variants={sectionItem}>
            <h2>Ready to elevate your event?</h2>
            <p>Let's bring your vision to life with expert planning and flawless execution.</p>
          </motion.div>
          <motion.div className="cta-actions" variants={sectionItem}>
            <Link className="btn-gold" to="/contact-us">
              <span className="btn-label">Book This Service</span>
            </Link>
            <Link className="btn-outline" to="/contact-us">
              <span className="btn-label">Request A Proposal</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default ServiceTemplate
