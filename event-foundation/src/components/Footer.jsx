import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const serviceLinks = [
  { label: 'Wedding Planning', path: '/services/wedding-planning' },
  { label: 'Corporate Events', path: '/services/corporate-events' },
  { label: 'Birthday & Private Parties', path: '/services/birthday-private-parties' },
  { label: 'Celebrity Events', path: '/services/celebrity-events' },
  { label: 'Destination Events', path: '/services/destination-events' },
  { label: 'Floral & Decoration', path: '/services/floral-decoration' },
  { label: 'Catering Coordination', path: '/services/catering-coordination' },
]

function Footer() {
  return (
    <footer className="site-footer reveal">
      <div className="container footer-shell">
        <div className="footer-brand-block">
          <span className="section-label">EVENT FOUNDATION</span>
          <Link to="/" className="footer-logo">
            Event Foundation
          </Link>
          <p className="footer-text">
            Premium event planning crafted with elegance, precision, and a refined sense of occasion.
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/our-work">Our Work</Link></li>
              <li><Link to="/contact-us">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p className="footer-contact">Lucknow, Uttar Pradesh</p>
            <p className="footer-contact">+91-9511118936</p>
            <p className="footer-contact">contact@eventfoundation.in</p>
          </div>

          <div className="footer-col">
            <h4>Social</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-pills" aria-label="Featured services">
          {serviceLinks.slice(0, 4).map((service) => (
            <Link key={service.path} to={service.path} className="footer-pill">
              {service.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-bottom-line" />
      <div className="footer-bottom">
        <p>© 2025 Event Foundation. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
