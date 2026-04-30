import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getSettings } from '../utils/api'
import '../styles/Navbar.css'

const serviceLinks = [
  { label: 'Wedding Planning', path: '/services/wedding-planning' },
  { label: 'Corporate Events', path: '/services/corporate-events' },
  { label: 'Birthday & Private Parties', path: '/services/birthday-private-parties' },
  { label: 'Celebrity Events', path: '/services/celebrity-events' },
  { label: 'Destination Events', path: '/services/destination-events' },
  { label: 'Floral & Decoration', path: '/services/floral-decoration' },
  { label: 'Catering Coordination', path: '/services/catering-coordination' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [settings, setSettings] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings()
      if (data.success) {
        setSettings(data.data)
      }
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    document.body.classList.toggle('mobile-menu-open', menuOpen)

    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('mobile-menu-open')
    }
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 40) {
        setNavbarVisible(true)
        setScrolled(false)
        setLastScrollY(currentScrollY)
        return
      }

      setScrolled(true)

      if (currentScrollY > lastScrollY) {
        setNavbarVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, false)
    return () => window.removeEventListener('scroll', handleScroll, false)
  }, [lastScrollY])

  useEffect(() => {
    setMenuOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])



  return (
    <header className={`site-header ${!navbarVisible ? 'navbar-hidden' : ''}`}>
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-contact">
            {settings?.contactDetails?.phonePrimary || '+91-9511118936'} | {settings?.contactDetails?.phoneSecondary || '+91-9511118935'}
          </div>
          <div className="top-socials" aria-label="Social media links">
            {settings?.socialLinks?.facebook && <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer">FB</a>}
            {settings?.socialLinks?.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer">IG</a>}
            {settings?.socialLinks?.twitter && <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer">TW</a>}
            {settings?.socialLinks?.linkedin && <a href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer">LI</a>}
            {settings?.socialLinks?.youtube && <a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer">YT</a>}
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
              <NavLink to="/services" className="dropdown-trigger">
                Services <span aria-hidden="true">▾</span>
              </NavLink>
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
              <NavLink to="/testimonials">Testimonials</NavLink>
            </li>
            <li>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </li>
          </ul>

          <div className="nav-right">
            <Link to="/contact-us" className="quote-btn header-quote-btn">
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

      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
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
          <button
            type="button"
            className={`mobile-services-toggle ${mobileServicesOpen ? 'open' : ''}`}
            onClick={() => setMobileServicesOpen((prev) => !prev)}
          >
            <span>Explore Services</span>
            <span className="mobile-arrow" aria-hidden="true">▾</span>
          </button>
          <div className={`mobile-services-list ${mobileServicesOpen ? 'open' : ''}`}>
            <NavLink to="/services">All Services</NavLink>
            {serviceLinks.map((service) => (
              <NavLink key={service.path} to={service.path}>
                {service.label}
              </NavLink>
            ))}
          </div>
          <NavLink to="/our-work">Our Work</NavLink>
          <NavLink to="/testimonials">Testimonials</NavLink>
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
