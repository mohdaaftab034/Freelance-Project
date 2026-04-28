import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Event Foundation brought structure, warmth, and a refined eye for detail to our celebration. Everything felt seamless, elevated, and deeply personal.',
    name: 'Shivani & Arjun',
    role: 'Wedding Clients',
    event: 'Luxury Wedding Reception',
  },
  {
    quote:
      'Their team transformed a complex corporate launch into a polished experience with flawless coordination and strong creative direction.',
    name: 'Amit Verma',
    role: 'Brand Marketing Lead',
    event: 'Product Launch Event',
  },
  {
    quote:
      'The hospitality, visual styling, and calm execution were exceptional. Our guests noticed every thoughtful detail and loved the atmosphere.',
    name: 'Nandini Rao',
    role: 'Private Celebration Host',
    event: 'Birthday Celebration',
  },
  {
    quote:
      'Working with them felt effortless from planning through execution. They understood our vision quickly and elevated it with premium taste.',
    name: 'Kabir Singh',
    role: 'Destination Client',
    event: 'Destination Event',
  },
  {
    quote:
      'The decor, artist coordination, and guest flow were handled with rare precision. We could relax because every moving part was already under control.',
    name: 'Maya Khanna',
    role: 'Family Host',
    event: 'Engagement Celebration',
  },
  {
    quote:
      'They delivered a premium experience without feeling overproduced. The event was tasteful, composed, and exactly what we hoped for.',
    name: 'Rohan Mehta',
    role: 'Corporate Client',
    event: 'Annual Gathering',
  },
]

const stats = [
  { value: '500+', label: 'Events Delivered' },
  { value: '1000+', label: 'Happy Hosts' },
  { value: '10+', label: 'Years of Experience' },
  { value: '4.9/5', label: 'Average Satisfaction' },
]

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <div className="testimonials-page-luxe">
      <motion.section
        className="page-hero testimonials-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80)',
        }}
      >
        <div className="testimonials-hero-overlay" />
        <div className="container testimonials-hero-content">
          <div className="testimonials-hero-rule" />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Testimonials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="testimonials-breadcrumb"
          >
            HOME / TESTIMONIALS
          </motion.p>
        </div>
      </motion.section>

      <section className="section testimonials-intro-section">
        <div className="container testimonials-intro-wrap">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.28em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            CLIENT STORIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Premium Event Planning, Reflected Through Real Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our clients trust us with weddings, private celebrations, and corporate events because we combine design,
            coordination, and hospitality into one seamless premium service.
          </motion.p>
        </div>
      </section>

      <section className="section testimonials-stats-section">
        <motion.div
          className="container testimonials-stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((item) => (
            <motion.article key={item.label} className="testimonials-stat-card" variants={cardVariants}>
              <span className="testimonials-stat-line" />
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section testimonials-grid-section">
        <div className="container testimonials-grid-wrap">
          <div className="testimonials-grid-header">
            <span className="section-label">WHAT PEOPLE SAY</span>
            <h2>Client Feedback That Reflects Our Standard</h2>
            <p>
              Each testimonial highlights the same values that guide every project: refined aesthetics, structured planning,
              responsive communication, and premium execution.
            </p>
          </div>

          <motion.div
            className="testimonials-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((item) => (
              <motion.article key={item.name} className="testimonial-card-luxe" variants={cardVariants}>
                <div className="testimonial-card-top">
                  <span className="testimonial-monogram" aria-hidden="true">
                    {getInitials(item.name)}
                  </span>
                  <span className="testimonial-event-pill">{item.event}</span>
                </div>
                <div className="testimonial-card-body">
                  <span className="testimonial-quote-mark">❝</span>
                  <p>{item.quote}</p>
                  <div className="testimonial-divider" />
                  <h3>{item.name}</h3>
                  <span>{item.role}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section testimonials-cta-section">
        <div className="container testimonials-cta-wrap">
          <span className="section-label">LET'S TALK</span>
          <h2>Ready to Create Your Own 5-Star Experience?</h2>
          <p>
            If you want the same level of care and polish that our clients describe here, we’d be happy to design your next event.
          </p>
          <div className="testimonials-cta-actions">
            <Link to="/contact-us" className="btn-gold">Plan Your Event</Link>
            <Link to="/our-work" className="btn-outline">View Our Work</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
