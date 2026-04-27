import { Link } from 'react-router-dom'

function ServiceTemplate({ title, image, breadcrumb, overview, overviewImage, included, gallery }) {
  return (
    <div className="service-page">
      <section
        className="page-hero"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="container">
          <h1>{title}</h1>
          <p className="breadcrumb-wrap">
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <Link to="/services">Services</Link>
            <span className="sep">&gt;</span>
            <span className="current">{title}</span>
          </p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container service-overview-grid">
          <div>
            <h2>Service Overview</h2>
            {overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div>
            <img src={overviewImage} alt={title} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section dark-section reveal">
        <div className="container">
          <h2 className="section-title-center">What’s Included</h2>
          <div className="included-grid">
            {included.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <h2 className="section-title-center">Our Process</h2>
          <div className="timeline">
            {['Consultation', 'Planning', 'Execution', 'Celebration'].map((step, index) => (
              <div key={step} className="timeline-item">
                <strong>{index + 1}</strong>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal service-gallery-strip-wrap">
        <div className="container service-gallery-strip">
          {gallery.map((item, index) => (
            <img key={`${item}-${index}`} src={item} alt={`${title} ${index + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="section reveal service-cta">
        <div className="container service-cta-wrap">
          <h3>Ready to Elevate Your Event Experience?</h3>
          <Link className="btn-gold" to="/contact-us">Book This Service</Link>
        </div>
      </section>
    </div>
  )
}

export default ServiceTemplate
