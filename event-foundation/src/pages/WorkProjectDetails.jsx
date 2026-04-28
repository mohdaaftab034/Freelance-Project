import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { workProjects } from '../data/workProjects'

function WorkProjectDetails() {
  const { slug } = useParams()
  const project = useMemo(() => workProjects.find((item) => item.slug === slug), [slug])
  const [activeImage, setActiveImage] = useState(0)

  if (!project) {
    return (
      <div className="work-detail-page-luxe">
        <section className="section work-detail-not-found">
          <div className="container detail-not-found">
            <span className="section-label">PROJECT CASE STUDY</span>
            <h1>Project Not Found</h1>
            <p>The project you are looking for is currently unavailable.</p>
            <Link to="/our-work" className="btn-gold">Back to Our Work</Link>
          </div>
        </section>
      </div>
    )
  }

  const showPrev = () => {
    setActiveImage((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const showNext = () => {
    setActiveImage((prev) => (prev + 1) % project.images.length)
  }

  const slideStep = 100 / project.images.length

  const relatedProjects = workProjects.filter((item) => item.category === project.category && item.slug !== project.slug).slice(0, 3)

  return (
    <div className="work-detail-page-luxe">
      <section
        className="work-detail-hero"
        style={{
          backgroundImage: `url(${project.coverImage})`,
        }}
      >
        <div className="work-detail-hero-overlay" />
        <div className="container work-detail-hero-content">
          <span className="work-detail-label">PROJECT CASE STUDY</span>
          <div className="work-detail-hero-rule" />
          <h1>{project.title}</h1>
          <p className="work-detail-hero-copy">{project.summary}</p>
          <p className="breadcrumb-wrap work-detail-breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <Link to="/our-work">Our Work</Link>
            <span className="sep">&gt;</span>
            <span className="current">{project.title}</span>
          </p>
        </div>
      </section>

      <section className="section work-detail-intro-section reveal">
        <div className="container work-detail-intro-grid">
          <div className="work-detail-intro-copy">
            <span className="section-label">OVERVIEW</span>
            <h2>{project.title}</h2>
            <p>
              Every case study is shaped as a tightly orchestrated editorial story, balancing planning precision,
              premium styling, guest flow, and production discipline.
            </p>
            <p>
              This project reflects the same dark luxury language used throughout the site: minimal hierarchy, gold
              accents, high-contrast imagery, and a refined sense of spatial rhythm.
            </p>
          </div>

          <div className="project-meta-grid luxe-meta-grid">
            <article>
              <h4>Location</h4>
              <p>{project.location}</p>
            </article>
            <article>
              <h4>Category</h4>
              <p>{project.category}</p>
            </article>
            <article>
              <h4>Scale</h4>
              <p>{project.guests}</p>
            </article>
            <article>
              <h4>Year</h4>
              <p>{project.year}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section work-detail-gallery-section reveal">
        <div className="container">
          <div className="project-carousel-wrap luxe-carousel-wrap">
            <div className="project-carousel-header">
              <div>
                <span className="section-label">GALLERY</span>
                <h3>Visual Story</h3>
              </div>
              <p>
                {String(activeImage + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
              </p>
            </div>

            <div className="project-carousel-window">
              <motion.div
                className="project-carousel-track"
                style={{ width: `${project.images.length * 100}%` }}
                animate={{ x: `-${activeImage * slideStep}%` }}
                transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.9 }}
              >
                {project.images.map((image, index) => (
                  <div key={image} className="project-carousel-slide" style={{ width: `${slideStep}%` }}>
                    <img src={image} alt={`${project.title} visual ${index + 1}`} loading="lazy" />
                    <span className="project-slide-index">0{index + 1}</span>
                  </div>
                ))}
              </motion.div>

              <button type="button" className="project-carousel-nav left" onClick={showPrev} aria-label="Previous image">
                ‹
              </button>
              <button type="button" className="project-carousel-nav right" onClick={showNext} aria-label="Next image">
                ›
              </button>
            </div>

            <div className="project-carousel-dots" role="tablist" aria-label="Project gallery navigation">
              {project.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={activeImage === index ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section work-detail-execution-section reveal">
        <div className="container work-execution-grid luxe-execution-grid">
          <article>
            <h3>Execution Highlights</h3>
            <p>
              This project was delivered through a tightly coordinated planning model, blending premium design direction with
              on-ground operational control and hospitality excellence.
            </p>
            <ul>
              <li>End-to-end vendor and logistics orchestration</li>
              <li>Experience-focused guest journey mapping</li>
              <li>Real-time production, styling, and quality supervision</li>
            </ul>
          </article>
          <article>
            <h3>Scope Delivered</h3>
            <p>{project.services}</p>
            <Link to="/contact-us" className="btn-gold">Plan a Similar Event</Link>
          </article>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section work-detail-related-section reveal">
          <div className="container">
            <h3 className="section-title-center">Related Projects</h3>
            <div className="related-project-grid luxe-related-grid">
              {relatedProjects.map((item) => (
                <Link key={item.slug} to={`/our-work/${item.slug}`} className="related-project-card">
                  <img src={item.coverImage} alt={item.title} loading="lazy" />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section work-detail-cta reveal">
        <div className="container work-detail-cta-wrap">
          <span className="section-label">LET'S CREATE</span>
          <h2>Bring a similar level of polish to your next event</h2>
          <p>From concept to completion, we can shape your celebration with the same premium attention to detail.</p>
          <div className="work-detail-cta-actions">
            <Link to="/contact-us" className="btn-gold">Plan Your Event</Link>
            <Link to="/our-work" className="btn-outline">Browse More Work</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkProjectDetails
