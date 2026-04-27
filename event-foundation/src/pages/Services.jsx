import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Wedding Venues',
    path: '/services/wedding-venues',
    description: 'Luxury venue discovery, shortlisting, negotiation, and full booking assistance.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80',
  },
  {
    title: 'Destination Wedding',
    path: '/services/destination-wedding',
    description: 'End-to-end planning for breathtaking destination celebrations with hospitality excellence.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80',
  },
  {
    title: 'Corporate Events',
    path: '/services/corporate-events',
    description: 'Premium corporate productions, conferences, launches, and leadership summits.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=80',
  },
  {
    title: 'Social Events',
    path: '/services/social-events',
    description: 'Thoughtful planning for private milestones, celebrations, and curated social gatherings.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000&q=80',
  },
  {
    title: 'Entertainment Services',
    path: '/services/entertainment-services',
    description: 'Artist curation, live acts, show-flow design, and immersive guest experiences.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=80',
  },
  {
    title: 'Catering Services',
    path: '/services/catering-services',
    description: 'Signature menus, culinary storytelling, and flawless hospitality-led food service.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1000&q=80',
  },
  {
    title: 'Photography & Videography',
    path: '/services/photography-videography',
    description: 'Editorial photography and cinematic films that preserve every meaningful detail.',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1000&q=80',
  },
]

function Services() {
  return (
    <div className="services-page">
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80)',
        }}
      >
        <div className="container">
          <h1>Our Services</h1>
          <p className="breadcrumb-wrap">
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <span className="current">Services</span>
          </p>
        </div>
      </section>

      <section className="section reveal services-premium-intro">
        <div className="container services-intro-wrap">
          <span className="section-label">SIGNATURE OFFERINGS</span>
          <h2>Premium Event Services Crafted for Distinctive Celebrations</h2>
          <p>
            Every event deserves thoughtful strategy, refined aesthetics, and flawless execution. Explore our specialized
            services designed to deliver unforgettable moments with elegance and precision.
          </p>
        </div>
      </section>

      <section className="section reveal services-premium-grid-section">
        <div className="container services-premium-grid">
          {services.map((service) => (
            <article key={service.title} className="services-premium-card">
              <div className="services-premium-media">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className="services-premium-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.path} className="btn-outline">Explore Service</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Services
