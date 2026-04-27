import { useState } from 'react'

function ContactUs() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    event.target.reset()
    setTimeout(() => setSubmitted(false), 3200)
  }

  return (
    <div className="contact-page">
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.24)), url(https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&q=80)',
        }}
      >
        <div className="container">
          <h1>Contact Us</h1>
          <p>Home &gt; Contact Us</p>
        </div>
      </section>

      <section className="section reveal contact-premium-intro">
        <div className="container contact-intro-wrap">
          <span className="section-label">LET'S CONNECT</span>
          <h2>Begin Your Celebration Journey With Event Foundation</h2>
          <p>
            Tell us about your vision, timeline, and expectations. Our planning team will craft a customized roadmap
            tailored to your event style and guest experience goals.
          </p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container info-cards contact-info-premium">
          <article className="contact-info-card">
            <span>📍</span>
            <h3>Address</h3>
            <p>10th Floor, Wing A, Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow - 226010</p>
          </article>
          <article className="contact-info-card">
            <span>📞</span>
            <h3>Phone</h3>
            <p>+91-9511118936</p>
            <p>+91-9511118935</p>
          </article>
          <article className="contact-info-card">
            <span>📧</span>
            <h3>Email</h3>
            <p>contact@eventfoundation.in</p>
            <p>support@eventfoundation.in</p>
          </article>
        </div>
      </section>

      <section className="section reveal">
        <div className="container full-contact-form-wrap contact-form-premium-wrap">
          <form className="contact-form wide" onSubmit={onSubmit}>
            <h3>Plan Your Premium Event Consultation</h3>
            <p className="contact-form-subtext">Share your requirements and our team will connect with a tailored proposal.</p>
            <div className="form-grid">
              <input type="text" placeholder="Name*" required />
              <input type="email" placeholder="Email*" required />
              <input type="tel" placeholder="Phone" />
              <select defaultValue="">
                <option value="" disabled>Select Service</option>
                <option>Wedding Venues</option>
                <option>Destination Wedding</option>
                <option>Corporate Events</option>
                <option>Social Events</option>
                <option>Entertainment Services</option>
                <option>Catering Services</option>
                <option>Photography & Videography</option>
              </select>
            </div>
            <textarea rows="6" placeholder="Message" />
            <button className="btn-gold" type="submit">Submit Enquiry</button>
            {submitted && <p className="form-success">Thanks for contacting us. We will connect with you shortly.</p>}
          </form>

          <div className="map-wrap">
            <iframe
              title="Gomti Nagar map"
              src="https://www.google.com/maps?q=Gomti+Nagar,+Lucknow&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section reveal social-row-section">
        <div className="container social-links-row contact-social-premium">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
    </div>
  )
}

export default ContactUs
