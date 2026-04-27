import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { workProjects } from '../data/workProjects'

function WorkProjectDetails() {
  const { slug } = useParams()
  const project = useMemo(() => workProjects.find((item) => item.slug === slug), [slug])
  const [activeImage, setActiveImage] = useState(0)

  if (!project) {
    return (
      <section className="section">
        <div className="container detail-not-found">
          <h1>Project Not Found</h1>
          <p>The project you are looking for is currently unavailable.</p>
          <Link to="/our-work" className="btn-gold">Back to Our Work</Link>
        </div>
      </section>
    )
  }

  const showPrev = () => {
    setActiveImage((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const showNext = () => {
    setActiveImage((prev) => (prev + 1) % project.images.length)
  }

  const relatedProjects = workProjects.filter((item) => item.category === project.category && item.slug !== project.slug).slice(0, 3)

  return (
    <div className="work-detail-page">
      <section
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${project.coverImage})`,
        }}
      >
        <div className="container">
          <h1>{project.title}</h1>
          <p>Our Work &gt; {project.title}</p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container work-detail-header">
          <div>
            <span className="section-label">PROJECT CASE STUDY</span>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </div>
          <div className="project-meta-grid">
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

      <section className="section reveal">
        <div className="container">
          <div className="project-carousel-wrap">
            <button type="button" className="project-carousel-nav left" onClick={showPrev} aria-label="Previous image">
              ‹
            </button>
            <img src={project.images[activeImage]} alt={`${project.title} visual ${activeImage + 1}`} loading="lazy" />
            <button type="button" className="project-carousel-nav right" onClick={showNext} aria-label="Next image">
              ›
            </button>
          </div>

          <div className="project-thumbnails" role="tablist" aria-label="Project gallery thumbnails">
            {project.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={activeImage === index ? 'active' : ''}
                onClick={() => setActiveImage(index)}
                aria-label={`Go to image ${index + 1}`}
              >
                <img src={image} alt={`${project.title} thumbnail ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal work-execution-block">
        <div className="container work-execution-grid">
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
        <section className="section reveal">
          <div className="container">
            <h3 className="section-title-center">Related Projects</h3>
            <div className="related-project-grid">
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
    </div>
  )
}

export default WorkProjectDetails
