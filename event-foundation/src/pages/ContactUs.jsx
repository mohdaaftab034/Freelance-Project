import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function ContactUs() {
  const [submitted, setSubmitted] = useState(false)
  const [service, setService] = useState('')
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  useEffect(() => {
    const closeSelect = () => setIsSelectOpen(false)
    if (isSelectOpen) {
      window.addEventListener('click', closeSelect)
    }
    return () => window.removeEventListener('click', closeSelect)
  }, [isSelectOpen])

  const servicesList = [
    'Wedding Planning',
    'Corporate Events',
    'Birthday & Private Parties',
    'Celebrity Events',
    'Destination Events',
    'Floral & Decoration',
    'Catering Coordination',
  ]

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    event.target.reset()
    setService('')
    setTimeout(() => setSubmitted(false), 3200)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <div className="contact-page contact-page-luxe">
      <motion.section
        className="page-hero contact-luxe-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&q=80)',
        }}
      >
        <div className="contact-luxe-hero-overlay" />
        <div className="container contact-luxe-hero-content">
          <div className="contact-luxe-hero-rule" />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="breadcrumb-wrap contact-luxe-breadcrumb"
          >
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <span className="current">Contact Us</span>
          </motion.p>
        </div>
      </motion.section>

      <section className="section contact-premium-intro contact-luxe-intro">
        <div className="container contact-intro-wrap">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.28em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            LET'S CONNECT
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Begin Your Celebration Journey With Event Foundation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tell us about your vision, timeline, and expectations. Our planning team will craft a customized roadmap
            tailored to your event style and guest experience goals.
          </motion.p>
        </div>
      </section>

      <section className="section contact-info-section">
        <motion.div
          className="container info-cards contact-info-premium"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.article className="contact-info-card" variants={cardVariants}>
            <div className="premium-card-header">
              <span className="accent-line" />
            </div>
            <h3>Address</h3>
            <p>10th Floor, Wing A, Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow - 226010</p>
          </motion.article>
          <motion.article className="contact-info-card" variants={cardVariants}>
            <div className="premium-card-header">
              <span className="accent-line" />
            </div>
            <h3>Phone</h3>
            <p>+91-9511118936</p>
            <p>+91-9511118935</p>
          </motion.article>
          <motion.article className="contact-info-card" variants={cardVariants}>
            <div className="premium-card-header">
              <span className="accent-line" />
            </div>
            <h3>Email</h3>
            <p>contact@eventfoundation.in</p>
            <p>support@eventfoundation.in</p>
          </motion.article>
        </motion.div>
      </section>

      <section className="section contact-form-section">
        <div className="container full-contact-form-wrap contact-form-premium-wrap">
          <motion.div
            className="contact-form-side"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <form className="contact-form wide" onSubmit={onSubmit}>
              <h3>Plan Your Premium Event Consultation</h3>
              <p className="contact-form-subtext">Share your requirements and our team will connect with a tailored proposal.</p>
              <div className="form-grid">
                <input type="text" placeholder="Name*" required />
                <input type="email" placeholder="Email*" required />
                <input type="tel" placeholder="Phone" />
                <div className="custom-select-wrap">
                  <div 
                    className={`custom-select-trigger ${isSelectOpen ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsSelectOpen(!isSelectOpen)
                    }}
                  >
                    <span>{service || 'Select Service'}</span>
                    <motion.span 
                      animate={{ rotate: isSelectOpen ? 180 : 0 }}
                      className="select-arrow"
                    >
                      ▾
                    </motion.span>
                  </div>
                  
                  <AnimatePresence>
                    {isSelectOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="custom-select-options"
                      >
                        {servicesList.map((item) => (
                          <div 
                            key={item}
                            className={`custom-select-option ${service === item ? 'selected' : ''}`}
                            onClick={() => {
                              setService(item)
                              setIsSelectOpen(false)
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <textarea rows="6" placeholder="Message" />
              <motion.button
                className="contact-submit-btn"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Enquiry
              </motion.button>
              {submitted && <p className="form-success">Thanks for contacting us. We will connect with you shortly.</p>}
            </form>
          </motion.div>

          <motion.div
            className="map-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <iframe
              title="Gomti Nagar map"
              src="https://www.google.com/maps?q=Gomti+Nagar,+Lucknow&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      <section className="section social-row-section contact-social-section">
        <motion.div
          className="container social-links-row contact-social-premium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</motion.a>
          <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</motion.a>
          <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</motion.a>
          <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</motion.a>
        </motion.div>
      </section>
    </div>
  )
}

export default ContactUs
