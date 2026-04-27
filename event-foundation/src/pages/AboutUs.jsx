import { Link } from 'react-router-dom'

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
  return (
    <div className="about-page">
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.65)), url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80)',
        }}
      >
        <div className="container">
          <h1>About Us</h1>
          <p>Home &gt; About Us</p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container about-story-grid">
          <div>
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
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80"
              alt="Team planning event"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section reveal about-experience">
        <div className="container">
          <div className="about-experience-head">
            <span className="section-label">EXPERIENCE</span>
            <h2>Built on a Legacy of Trust, Refined Through Excellence</h2>
            <p>
              Over the years, Event Foundation has delivered memorable celebrations for families, brands, and communities.
              Our experience combines creative direction, operational precision, and hospitality standards that inspire confidence.
            </p>
          </div>
          <div className="experience-metrics">
            <article>
              <h3>10+</h3>
              <p>Years of Planning Excellence</p>
            </article>
            <article>
              <h3>500+</h3>
              <p>Premium Events Delivered</p>
            </article>
            <article>
              <h3>1000+</h3>
              <p>Delighted Families and Hosts</p>
            </article>
            <article>
              <h3>50+</h3>
              <p>Industry Recognitions and Awards</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container mission-vision-grid">
          <article className="mission-vision-card">
            <span className="section-label">OUR MISSION</span>
            <h3>Creating Seamless, Meaningful Celebrations</h3>
            <p>
              Our mission is to transform every event into a beautifully orchestrated experience where design, emotion, and
              hospitality come together effortlessly. We focus on thoughtful planning, transparent collaboration, and impeccable
              execution so every host can celebrate with confidence and joy.
            </p>
          </article>

          <article className="mission-vision-card">
            <span className="section-label">OUR VISION</span>
            <h3>Setting the Benchmark for Premium Event Experiences</h3>
            <p>
              We envision Event Foundation as a trusted symbol of excellence in event planning across India. By continuously
              elevating creativity, client care, and operational quality, we aim to define how modern, high-end celebrations
              should feel and function.
            </p>
          </article>
        </div>
      </section>

      <section className="section reveal about-strength">
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
            <article>
              <h3>Strategic Planning</h3>
              <p>Detailed timelines, risk-ready execution plans, and vendor governance for flawless delivery.</p>
            </article>
            <article>
              <h3>Design-Led Storytelling</h3>
              <p>Immersive event environments crafted around your personality, values, and guest experience goals.</p>
            </article>
            <article>
              <h3>Operational Precision</h3>
              <p>Experienced on-ground teams, quality controls, and real-time coordination across every event touchpoint.</p>
            </article>
            <article>
              <h3>Hospitality Excellence</h3>
              <p>Guest-focused service standards that ensure comfort, warmth, and elevated engagement throughout the event.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section dark-section reveal">
        <div className="container">
          <h2 className="section-title-center">Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member) => (
              <article key={member.name} className="team-card">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=c9a96e&color=0a0a0a&size=200`}
                  alt={member.name}
                  loading="lazy"
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <h2 className="section-title-center">Our Core Values</h2>
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title} className="value-card">
                <span>{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta reveal">
        <div className="container about-cta-wrap">
          <h3>Ready to Plan Your Dream Event?</h3>
          <Link to="/contact-us" className="btn-dark">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
