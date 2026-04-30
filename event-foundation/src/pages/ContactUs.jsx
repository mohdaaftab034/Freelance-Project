import { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { submitEnquiry, getSettings } from '../utils/api'

function ContactUs() {
  useDocumentTitle('Contact Us')
  const [submitted, setSubmitted] = useState(false)
  const [service, setService] = useState('')
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings()
      if (data.success) {
        setSettings(data.data)
      }
    }
    fetchSettings()
  }, [])


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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!service) {
      alert('Please select a service')
      return
    }

    setIsSubmitting(true)
    try {
      const data = await submitEnquiry({
        ...formData,
        eventType: service,
      })

      if (data.success) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })
        setService('')
        setTimeout(() => setSubmitted(false), 3200)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      alert('Error connecting to server.')
    } finally {
      setIsSubmitting(false)
    }
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
            <p>{settings?.contactDetails?.address || '10th Floor, Wing A, Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow - 226010'}</p>
          </motion.article>
          <motion.article className="contact-info-card" variants={cardVariants}>
            <div className="premium-card-header">
              <span className="accent-line" />
            </div>
            <h3>Phone</h3>
            <p>{settings?.contactDetails?.phonePrimary || '+91-9511118936'}</p>
            <p>{settings?.contactDetails?.phoneSecondary || '+91-9511118935'}</p>
          </motion.article>
          <motion.article className="contact-info-card" variants={cardVariants}>
            <div className="premium-card-header">
              <span className="accent-line" />
            </div>
            <h3>Email</h3>
            <p>{settings?.contactDetails?.email || 'contact@eventfoundation.in'}</p>
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
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
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
              <textarea
                name="message"
                rows="6"
                placeholder="Message"
                required
                value={formData.message}
                onChange={handleChange}
              />
              <motion.button
                className="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
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
            {settings?.socialLinks?.facebook && <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href={settings.socialLinks.facebook} target="_blank" rel="noreferrer">Facebook</motion.a>}
            {settings?.socialLinks?.instagram && <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href={settings.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</motion.a>}
            {settings?.socialLinks?.youtube && <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href={settings.socialLinks.youtube} target="_blank" rel="noreferrer">YouTube</motion.a>}
            {settings?.socialLinks?.linkedin && <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</motion.a>}
            {settings?.socialLinks?.twitter && <motion.a whileHover={{ y: -5, color: 'var(--color-gold)' }} href={settings.socialLinks.twitter} target="_blank" rel="noreferrer">Twitter</motion.a>}
          </motion.div>
      </section>
    </div>
  )
}

export default ContactUs
