import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const serviceLinks = [
  { label: 'Wedding Venues', path: '/services/wedding-venues' },
  { label: 'Destination Wedding', path: '/services/destination-wedding' },
  { label: 'Corporate Events', path: '/services/corporate-events' },
  { label: 'Social Events', path: '/services/social-events' },
  { label: 'Entertainment Services', path: '/services/entertainment-services' },
  { label: 'Catering Services', path: '/services/catering-services' },
  { label: 'Photography & Videography', path: '/services/photography-videography' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-contact">+91-9511118936 | +91-9511118935</div>
          <div className="top-socials" aria-label="Social media links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              FB
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              IG
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              YT
            </a>
          </div>
        </div>
      </div>

      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <Link to="/" className="brand-logo" aria-label="Event Foundation Home">
            Event Foundation
          </Link>

          <ul className="desktop-nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li className="nav-dropdown">
              <NavLink to="/services" className="dropdown-trigger">Services</NavLink>
              <div className="dropdown-menu">
                {serviceLinks.map((service) => (
                  <NavLink key={service.path} to={service.path}>
                    {service.label}
                  </NavLink>
                ))}
              </div>
            </li>
            <li>
              <NavLink to="/our-work">Our Work</NavLink>
            </li>
            <li>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </li>
          </ul>

          <div className="nav-right">
            <Link to="/contact-us" className="quote-btn desktop-only">
              Get a Quote
            </Link>
            <button
              type="button"
              className={`hamburger ${menuOpen ? 'active' : ''}`}
              aria-label="Toggle mobile menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <span>Menu</span>
            <button
              type="button"
              className="mobile-close"
              aria-label="Close mobile menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about-us">About Us</NavLink>
          <NavLink to="/services">Services</NavLink>
          <button
            type="button"
            className={`mobile-services-toggle ${mobileServicesOpen ? 'open' : ''}`}
            onClick={() => setMobileServicesOpen((prev) => !prev)}
          >
            <span>Services</span>
            <span className="mobile-arrow" aria-hidden="true">▾</span>
          </button>
          <div className={`mobile-services-list ${mobileServicesOpen ? 'open' : ''}`}>
            {serviceLinks.map((service) => (
              <NavLink key={service.path} to={service.path}>
                {service.label}
              </NavLink>
            ))}
          </div>
          <NavLink to="/our-work">Our Work</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
          <Link to="/contact-us" className="quote-btn">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
