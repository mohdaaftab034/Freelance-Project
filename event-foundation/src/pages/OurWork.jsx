import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { workFilters, workProjects } from '../data/workProjects'

function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredWorks = useMemo(() => {
    if (activeFilter === 'All') return workProjects
    return workProjects.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="our-work-page">
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80)',
        }}
      >
        <div className="container">
          <h1>Our Work</h1>
          <p>Home &gt; Our Work</p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container work-intro-copy">
          <span className="section-label">PROJECT PORTFOLIO</span>
          <h2>Signature Work Across Premier Venues</h2>
          <p>
            Explore selected projects from weddings, corporate productions, social evenings, and destination celebrations.
            Each card highlights where the work was delivered and opens a dedicated case-study page.
          </p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container filter-tabs">
          {workFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'active' : ''}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <div className="container work-project-grid">
          {filteredWorks.map((item) => (
            <article key={item.slug} className="work-project-card">
              <div className="work-project-media">
                <img src={item.coverImage} alt={item.title} loading="lazy" />
                <span>{item.category}</span>
              </div>
              <div className="work-project-body">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="work-project-meta">
                  <strong>{item.location}</strong>
                  <em>{item.year}</em>
                </div>
                <Link to={`/our-work/${item.slug}`} className="btn-outline">View Project</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default OurWork
