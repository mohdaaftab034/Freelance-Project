import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    title: 'Wedding Planning',
    path: '/services/wedding-planning',
    description: 'End-to-end wedding planning for ceremonies, receptions, and every pre-wedding detail.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80',
  },
  {
    title: 'Corporate Events',
    path: '/services/corporate-events',
    description: 'Premium corporate productions, conferences, launches, and leadership gatherings.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=80',
  },
  {
    title: 'Birthday & Private Parties',
    path: '/services/birthday-private-parties',
    description: 'Stylish milestone celebrations and intimate private events designed around your guests.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000&q=80',
  },
  {
    title: 'Celebrity Events',
    path: '/services/celebrity-events',
    description: 'High-discretion planning for VIP arrivals, premium hospitality, and red-carpet moments.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=80',
  },
  {
    title: 'Destination Events',
    path: '/services/destination-events',
    description: 'Travel-ready celebrations with logistics, guest care, and destination styling.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80',
  },
  {
    title: 'Floral & Decoration',
    path: '/services/floral-decoration',
    description: 'Bespoke decor, floral installations, and immersive visual styling for every event.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&q=80',
  },
  {
    title: 'Catering Coordination',
    path: '/services/catering-coordination',
    description: 'Menu planning, service flow, and hospitality coordination for smooth dining experiences.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1000&q=80',
  },
]

function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const introItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  const cardAnimations = [
    { initial: { opacity: 0, x: -24, y: 16 }, animate: { opacity: 1, x: 0, y: 0 } },
    { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
    { initial: { opacity: 0, x: 24, y: 16 }, animate: { opacity: 1, x: 0, y: 0 } },
    { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
  ]

  return (
    <div className="services-page services-page-luxe">
      <motion.section
        className="page-hero services-luxe-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80)',
        }}
      >
        <div className="services-luxe-hero-overlay" />
        <div className="container services-luxe-hero-content">
          <motion.div className="services-luxe-hero-rule" initial={{ width: 0, opacity: 0 }} animate={{ width: 80, opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }} />
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Our Services
          </motion.h1>
          <p className="breadcrumb-wrap services-luxe-breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <span className="current">Services</span>
          </p>
        </div>
      </motion.section>

      <section className="section services-luxe-intro">
        <motion.div className="container services-intro-wrap" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span className="section-label" variants={introItem}>SIGNATURE OFFERINGS</motion.span>
          <motion.h2 variants={introItem}>Seven Premium Services for Memorable Celebrations</motion.h2>
          <motion.p variants={introItem}>
            Every event deserves thoughtful strategy, refined aesthetics, and flawless execution. Explore our specialized
            services designed for weddings, corporate occasions, private parties, destination events, decor, and catering.
          </motion.p>
        </motion.div>
      </section>

      <section className="section services-luxe-grid-section">
        <motion.div className="container services-luxe-grid" layout variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          <AnimatePresence mode="popLayout">
            {services.map((service, index) => {
              const variant = cardAnimations[index % cardAnimations.length]
              const isWideCard = index === services.length - 1

              return (
                <motion.article
                  layout
                  key={service.title}
                  className={`service-editorial-card ${isWideCard ? 'wide' : ''}`}
                  initial={variant.initial}
                  whileInView={variant.animate}
                  exit={{ opacity: 0, scale: 0.8 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.4, ease: 'easeOut' } }}
                >
                  <div className="service-editorial-media">
                    <img src={service.image} alt={service.title} loading="lazy" />
                  </div>
                  <div className="service-editorial-body">
                    <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link to={service.path} className="service-explore-link">
                      <span>Explore Service</span>
                      <span className="arrow">→</span>
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <motion.section className="section services-luxe-cta" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div className="container services-luxe-cta-wrap">
          <div className="cta-rule" />
          <h2>Ready to Begin?</h2>
          <p>Let&apos;s create something extraordinary together.</p>
          <div className="services-cta-actions">
            <Link to="/contact-us" className="services-cta-button primary">Get In Touch</Link>
            <Link to="/our-work" className="services-cta-button secondary">View Our Work</Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Services
