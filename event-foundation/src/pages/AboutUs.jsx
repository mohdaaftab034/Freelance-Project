import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const team = [
  { name: 'Aarav Singh', role: 'Founder & Creative Director' },
  { name: 'Neha Kapoor', role: 'Head of Weddings' },
  { name: 'Rohan Malhotra', role: 'Operations Lead' },
  { name: 'Sara Khan', role: 'Client Experience Manager' },
]

const values = [
  {
    icon: '✦',
    title: 'Excellence',
    text: 'We deliver elevated experiences with flawless execution and exceptional service standards.',
  },
  {
    icon: '✺',
    title: 'Creativity',
    text: 'Every event is imagined with bold artistry, thoughtful design, and personalized storytelling.',
  },
  {
    icon: '❖',
    title: 'Integrity',
    text: 'Transparency, commitment, and trust are at the core of every relationship we build.',
  },
]

function AboutUs() {
  const cardAnimations = [
    { initial: { opacity: 0, x: -30, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },
    { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    { initial: { opacity: 0, x: 30, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },
    { initial: { opacity: 0, scale: 0.9, rotate: -1 }, animate: { opacity: 1, scale: 1, rotate: 0 } },
    { initial: { opacity: 0, scale: 0.9, rotate: 1 }, animate: { opacity: 1, scale: 1, rotate: 0 } },
  ]

  const getAnimation = (index) => cardAnimations[index % cardAnimations.length]
  const getInitials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('')

  return (
    <div className="about-page about-page-luxe">
      <motion.section
        className="page-hero about-luxe-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80)',
        }}
      >
        <div className="about-luxe-hero-overlay" />
        <div className="container about-luxe-hero-content">
          <div className="about-luxe-hero-rule" />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="about-luxe-breadcrumb"
          >
            HOME / ABOUT US
          </motion.p>
        </div>
      </motion.section>

      <section className="section about-story-section">
        <div className="container about-story-grid">
          <motion.div className="about-story-copy"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="about-luxe-label">Our Story</span>
            <h2>Crafting Signature Celebrations Since Day One</h2>
            <p>
              Event Foundation was founded with one clear intention: to redefine event planning in Lucknow through design-led thinking,
              disciplined execution, and deeply personalized hospitality.
            </p>
            <p>
              Our mission is to transform your milestones into soulful, immersive experiences that honor tradition while embracing modern elegance.
              We collaborate with trusted partners, top venues, and exceptional creators to deliver events that feel effortless and unforgettable.
            </p>
            <p>
              Our vision is to become India’s most admired planning house for weddings and premium events by setting benchmarks in creativity,
              reliability, and emotional impact.
            </p>
          </motion.div>
          <motion.div className="about-story-media"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80"
              alt="Team planning event"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <section className="section about-experience">
        <div className="container">
          <div className="about-luxe-header centered">
            <motion.span 
              className="about-luxe-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              EXPERIENCE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Built on a Legacy of Trust, Refined Through Excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Over the years, Event Foundation has delivered memorable celebrations for families, brands, and communities.
              Our experience combines creative direction, operational precision, and hospitality standards that inspire confidence.
            </motion.p>
          </div>
          <div className="experience-metrics">
            {[
              { val: '10+', label: 'Years of Planning Excellence' },
              { val: '500+', label: 'Premium Events Delivered' },
              { val: '1000+', label: 'Delighted Families and Hosts' },
              { val: '50+', label: 'Industry Recognitions and Awards' }
            ].map((m, i) => {
              const anim = getAnimation(i);
              return (
                <motion.article 
                  key={m.label}
                  className="metric-card"
                  initial={anim.initial}
                  whileInView={anim.animate}
                  whileHover={{ 
                    borderColor: 'rgba(201,169,110,0.5)',
                    boxShadow: '0 0 30px rgba(201,169,110,0.06)',
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3>{m.val}</h3>
                  <p>{m.label}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section about-mission-vision">
        <div className="container mission-vision-grid">
          <motion.article 
            className="mission-vision-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ 
              y: -8,
              borderColor: 'rgba(201,169,110,0.45)',
              boxShadow: '0 0 30px rgba(201,169,110,0.06)',
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="about-card-line" />
            <span className="about-luxe-label">OUR MISSION</span>
            <h3>Creating Seamless, Meaningful Celebrations</h3>
            <p>
              Our mission is to transform every event into a beautifully orchestrated experience where design, emotion, and
              hospitality come together effortlessly. We focus on thoughtful planning, transparent collaboration, and impeccable
              execution so every host can celebrate with confidence and joy.
            </p>
          </motion.article>

          <motion.article 
            className="mission-vision-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ 
              y: -8,
              borderColor: 'rgba(201,169,110,0.45)',
              boxShadow: '0 0 30px rgba(201,169,110,0.06)',
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="about-card-line" />
            <span className="about-luxe-label">OUR VISION</span>
            <h3>Setting the Benchmark for Premium Event Experiences</h3>
            <p>
              We envision Event Foundation as a trusted symbol of excellence in event planning across India. By continuously
              elevating creativity, client care, and operational quality, we aim to define how modern, high-end celebrations
              should feel and function.
            </p>
          </motion.article>
        </div>
      </section>

      <section className="section about-strength">
        <div className="container">
          <div className="about-luxe-header centered">
            <span className="about-luxe-label">EXPERTISE</span>
            <h2>Experience and Skill Make Us Great</h2>
            <p>
              Our strength lies in combining artistic vision with disciplined event management. From concept to execution,
              every element is curated with strategic clarity and premium craftsmanship.
            </p>
          </div>

          <div className="strength-grid">
            {[
              { t: 'Strategic Planning', p: 'Detailed timelines, risk-ready execution plans, and vendor governance for flawless delivery.' },
              { t: 'Design-Led Storytelling', p: 'Immersive event environments crafted around your personality, values, and guest experience goals.' },
              { t: 'Operational Precision', p: 'Experienced on-ground teams, quality controls, and real-time coordination across every event touchpoint.' },
              { t: 'Hospitality Excellence', p: 'Guest-focused service standards that ensure comfort, warmth, and elevated engagement throughout the event.' },
            ].map((s, i) => {
              const anim = getAnimation(i + 2)
              return (
                <motion.article 
                  key={s.t}
                  className="strength-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    borderColor: 'rgba(201,169,110,0.5)',
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="strength-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="strength-title-wrap">
                    <h3>{s.t}</h3>
                  </div>
                  <p>{s.p}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section about-team">
        <div className="container">
          <div className="about-luxe-header centered">
            <span className="about-luxe-label">Leadership</span>
            <h2>Meet Our Team</h2>
          </div>
          <div className="team-grid">
            {team.map((member, i) => {
              const anim = getAnimation(i);
              return (
                <motion.article 
                  key={member.name} 
                  className="team-card"
                  initial={anim.initial}
                  whileInView={anim.animate}
                  whileHover={{ 
                    y: -8,
                    borderColor: 'rgba(201,169,110,0.45)',
                    boxShadow: '0 0 30px rgba(201,169,110,0.06)',
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div className="team-initials" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    {getInitials(member.name)}
                  </motion.div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="about-luxe-header centered">
            <span className="about-luxe-label">Values</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((value, i) => {
              const anim = getAnimation(i + 1);
              return (
                <motion.article 
                  key={value.title} 
                  className="value-card"
                  initial={anim.initial}
                  whileInView={anim.animate}
                  whileHover={{ 
                    y: -6,
                    backgroundColor: 'rgba(201,169,110,0.04)',
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                    {value.icon}
                  </motion.span>
                  <div className="value-divider" />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-wrap">
          <span className="about-luxe-label centered-label">Event Foundation</span>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Ready to Plan Your Dream Event?
          </motion.h3>
          <p>Tell us your vision and our team will craft a celebration worthy of your story.</p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link to="/contact-us" className="about-cta-button">Contact Us</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
