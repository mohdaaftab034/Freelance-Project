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
    { initial: { opacity: 0, scale: 0.9, rotate: 1 }, animate: { opacity: 1, scale: 1, rotate: 0 } }
  ];

  const getAnimation = (index) => cardAnimations[index % cardAnimations.length];

  return (
    <div className="about-page">
      <motion.section
        className="page-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80)',
        }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="breadcrumb-wrap"
          >
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <span className="current">About Us</span>
          </motion.p>
        </div>
      </motion.section>

      <section className="section">
        <div className="container about-story-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
          <motion.div
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

      <section className="section about-experience bg-soft">
        <div className="container">
          <div className="about-experience-head">
            <motion.span 
              className="section-label"
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
                  initial={anim.initial}
                  whileInView={anim.animate}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(186, 149, 86, 0.15)",
                    borderColor: "var(--color-gold)" 
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

      <section className="section">
        <div className="container mission-vision-grid">
          <motion.article 
            className="mission-vision-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ 
              y: -8, 
              rotate: -1,
              boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">OUR MISSION</span>
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
              rotate: 1,
              boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">OUR VISION</span>
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
          <div className="about-experience-head">
            <span className="section-label">EXPERTISE</span>
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
              { t: 'Hospitality Excellence', p: 'Guest-focused service standards that ensure comfort, warmth, and elevated engagement throughout the event.' }
            ].map((s, i) => {
              const anim = getAnimation(i + 2); // Vary starting animation
              return (
                <motion.article 
                  key={s.t}
                  initial={anim.initial}
                  whileInView={anim.animate}
                  whileHover={{ 
                    x: 10,
                    backgroundColor: "rgba(186, 149, 86, 0.03)",
                    borderColor: "var(--color-gold)"
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <h2 className="section-title-center">Meet Our Team</h2>
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
                    y: -15,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.12)"
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=c9a96e&color=0a0a0a&size=200`}
                    alt={member.name}
                    loading="lazy"
                  />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title-center">Our Core Values</h2>
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
                    scale: 0.98,
                    backgroundColor: "#fdf8f0"
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >{value.icon}</motion.span>
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
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Ready to Plan Your Dream Event?
          </motion.h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact-us" className="btn-dark">Contact Us</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
