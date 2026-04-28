import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.css'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    label: '#WeddingPlanning #FloralDecoration',
    title: 'Wedding Planning and Floral Design for Signature Celebrations',
    description:
      'We design elegant weddings with cohesive planning, thoughtful decor, and smooth coordination from first consultation to final farewell.',
    ctaText: 'Contact Us',
    ctaLink: '/contact-us',
  },
  {
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80',
    label: '#CorporateEvents #CelebrityEvents',
    title: 'Corporate Events and VIP Experiences Planned with Precision',
    description:
      'From boardroom launches to high-profile occasions, we deliver polished events with discretion, structure, and impact.',
    ctaText: 'Our Services',
    ctaLink: '/#services',
  },
  {
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80',
    label: '#BirthdayPrivateParties #DestinationEvents #CateringCoordination',
    title: 'Private Parties and Destination Events with Seamless Hospitality',
    description: 'We coordinate intimate celebrations, destination gatherings, and guest-ready hospitality with a refined touch.',
    ctaText: 'Explore Our Work',
    ctaLink: '/our-work',
  },
]

const serviceCards = [
  {
    icon: '✦',
    title: 'Wedding Planning',
    text: 'Full-service planning for ceremonies, receptions, and every meaningful wedding moment.',
    path: '/services/wedding-planning',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
  },
  {
    icon: '▣',
    title: 'Corporate Events',
    text: 'Brand-led conferences, launches, and executive gatherings delivered with precision.',
    path: '/services/corporate-events',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80',
  },
  {
    icon: '✺',
    title: 'Birthday & Private Parties',
    text: 'Stylish milestone celebrations and intimate private gatherings tailored to your guest list.',
    path: '/services/birthday-private-parties',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80',
  },
  {
    icon: '⌘',
    title: 'Celebrity Events',
    text: 'High-discretion event planning for premium arrivals, red-carpet moments, and VIP service.',
    path: '/services/celebrity-events',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80',
  },
  {
    icon: '◈',
    title: 'Destination Events',
    text: 'Travel-ready celebrations with logistics, guest care, and destination styling.',
    path: '/services/destination-events',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80',
  },
  {
    icon: '❖',
    title: 'Floral & Decoration',
    text: 'Bespoke decor, floral installations, and immersive event styling.',
    path: '/services/floral-decoration',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80',
  },
  {
    icon: '◉',
    title: 'Catering Coordination',
    text: 'Menu planning, service flow, and hospitality coordination for smooth dining experiences.',
    path: '/services/catering-coordination',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=80',
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
  'https://images.unsplash.com/photo-1587271339318-2e78b7c86088?w=600&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
  'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=600&q=80',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',
  'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80',
]

const testimonials = [
  {
    name: 'Sachin',
    review:
      'Event Foundation brought grace and discipline to every detail of our wedding. The experience was effortless and extraordinary.',
  },
  {
    name: 'Shoib',
    review:
      'They transformed our corporate annual meet into a world-class production. Every guest walked away impressed.',
  },
  {
    name: 'Priyanshu Verma',
    review:
      'Creative, responsive, and truly premium in execution. We trusted them once and now recommend them to everyone.',
  },
  {
    name: 'Piyush',
    review:
      'From venue styling to artist management, everything was coordinated flawlessly. Incredible team and hospitality.',
  },
  {
    name: 'Ayush Kumar',
    review:
      'Their attention to aesthetics and punctual delivery made our destination celebration feel magical and stress-free.',
  },
  {
    name: 'Shama Khan',
    review:
      'The team captured our vision perfectly. Elegant decor, smooth planning, and memories we will cherish forever.',
  },
]

const partners = [
  'Golden Tulip',
  'Taj Hotel',
  'Radisson Blu',
  'Vivanta',
  'The Grand JBR',
  'Piccadily',
  'Hyatt Regency',
  'Holiday Inn',
]

const counterTargets = [
  { value: 10000, label: 'Events', suffix: 'k+' },
  { value: 5000, label: 'Celebrity Events', suffix: 'k+' },
  { value: 3000, label: 'Sweet Couples', suffix: 'k+' },
  { value: 8000, label: 'Best Bouquets', suffix: 'k+' },
]

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeGallerySlide, setActiveGallerySlide] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [counterStarted, setCounterStarted] = useState(false)
  const [counterValues, setCounterValues] = useState([0, 0, 0, 0])
  const counterSectionRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [])

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(testimonialInterval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounterStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    if (counterSectionRef.current) {
      observer.observe(counterSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!counterStarted) return

    const duration = 1600
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCounterValues(counterTargets.map((target) => Math.floor(target.value * progress)))

      if (progress >= 1) clearInterval(timer)
    }, 40)

    return () => clearInterval(timer)
  }, [counterStarted])

  const duplicatedPartners = useMemo(() => [...partners, ...partners], [])
  const galleryTotal = galleryImages.length

  const handleHeroCta = (link) => {
    if (link.includes('#services')) {
      navigate('/')
      setTimeout(() => {
        const section = document.getElementById('services')
        if (section) section.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }

    navigate(link)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    event.target.reset()
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <div className="home-page-luxe">
      <section className="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[activeSlide].image}
            className="hero-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ backgroundImage: `url(${heroSlides[activeSlide].image})` }}
          />
        </AnimatePresence>

        <div className="hero-overlay" />

        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[activeSlide].title}
            className="hero-content"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="hero-label">{heroSlides[activeSlide].label}</span>
            <h1>{heroSlides[activeSlide].title}</h1>
            <p>{heroSlides[activeSlide].description}</p>
            <button type="button" className="btn-gold" onClick={() => handleHeroCta(heroSlides[activeSlide].ctaLink)}>
              {heroSlides[activeSlide].ctaText}
            </button>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          className="hero-arrow left"
          aria-label="Previous slide"
          onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        >
          ‹
        </button>
        <button
          type="button"
          className="hero-arrow right"
          aria-label="Next slide"
          onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
        >
          ›
        </button>

        <div className="hero-dots">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={activeSlide === index ? 'active' : ''}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="about-intro section reveal">
        <div className="container about-intro-grid">
          <div>
            <span className="section-label">ABOUT US</span>
            <h2>Bring Every Celebration to Life with Premium Event Planning</h2>
            <p>
              Event Foundation is a premium event planning company that transforms special occasions into timeless memories.
              Our team blends artistry with logistics to create celebrations that are deeply personal and beautifully executed.
            </p>
            <p>
              Based in Lucknow, we are known for our signature style, elevated hospitality, and attention to detail. From private parties
              to grand productions, we design each event with precision, elegance, and passion.
            </p>

            <div className="stats-row">
              <div>
                <strong>10+</strong>
                <span>Years</span>
              </div>
              <div>
                <strong>500+</strong>
                <span>Events</span>
              </div>
              <div>
                <strong>1000+</strong>
                <span>Happy Couples</span>
              </div>
              <div>
                <strong>50+</strong>
                <span>Awards</span>
              </div>
            </div>

            <Link to="/about-us" className="btn-outline">Know More About Us</Link>
          </div>

          <div className="about-image-stack">
            <div className="main-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80"
                alt="Wedding decor setup"
                loading="lazy"
              />
            </div>
            <img
              className="accent-image"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
              alt="Event portrait"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="services-grid section reveal" id="services">
        <div className="container">
          <h2 className="section-title-center">Our Services</h2>
          <div className="services-card-grid">
            {serviceCards.map((card) => (
              <article key={card.title} className="service-card" onClick={() => navigate(card.path)} role="button" tabIndex={0}>
                <div className="service-card-media">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  <span className="service-icon">{card.icon}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-us section reveal">
        <div className="why-overlay" />
        <div className="container why-grid">
          <div>
            <h2>The objective of ours is to spend every second of our lives together</h2>
          </div>
          <div className="why-features">
            <article>
              <h3>🔮 Wedding Vision</h3>
              <p>We decode your expectations into a cohesive experience that reflects your story and style.</p>
            </article>
            <article>
              <h3>🌸 Decoration Plan</h3>
              <p>From palette to florals and installations, each layer of decor is designed with purpose.</p>
            </article>
            <article>
              <h3>📷 Photography</h3>
              <p>Our curated teams document every meaningful frame through cinematic photography and films.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="featured-gallery section reveal">
        <div className="container">
          <h2 className="section-title-center">Featured Gallery</h2>
          <div className="gallery-slider-shell">
            <button
              type="button"
              className="gallery-arrow gallery-arrow-left"
              aria-label="Previous image"
              onClick={() => setActiveGallerySlide((prev) => (prev - 1 + galleryTotal) % galleryTotal)}
            >
              ‹
            </button>

            <div className="gallery-slider-window" aria-roledescription="carousel">
              <motion.div
                className="gallery-slider-track"
                style={{ width: `${galleryTotal * 100}%` }}
                animate={{ x: `-${(activeGallerySlide * 100) / galleryTotal}%` }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                {galleryImages.map((image, index) => (
                  <div className="gallery-slide" key={image} style={{ width: `${100 / galleryTotal}%` }}>
                    <img src={image} alt={`Featured event ${index + 1}`} loading="lazy" />
                    <div className="gallery-slide-overlay">
                      <span className="gallery-icon">✦</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              type="button"
              className="gallery-arrow gallery-arrow-right"
              aria-label="Next image"
              onClick={() => setActiveGallerySlide((prev) => (prev + 1) % galleryTotal)}
            >
              ›
            </button>
          </div>

          <div className="gallery-slider-dots" aria-label="Gallery navigation">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`gallery-dot ${index === activeGallerySlide ? 'active' : ''}`}
                aria-label={`Go to image ${index + 1}`}
                onClick={() => setActiveGallerySlide(index)}
              />
            ))}
          </div>

          <div className="center-btn-wrap">
            <Link to="/our-work" className="btn-outline">Explore Gallery</Link>
          </div>
        </div>
      </section>

      <section className="counter-section reveal" ref={counterSectionRef}>
        <div className="container counter-grid">
          {counterTargets.map((counter, index) => (
            <div key={counter.label}>
              <h3>{Math.floor(counterValues[index] / 1000)}{counter.suffix}</h3>
              <p>{counter.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-section section reveal">
        <div className="container">
          <h2 className="section-title-center">What Our Clients Say</h2>
          <div className="testimonial-slider">
            <button
              type="button"
              className="testimonial-arrow"
              aria-label="Previous testimonial"
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              ‹
            </button>
            <div className="testimonial-card">
              <span className="quote-mark">❝</span>
              <p>{testimonials[activeTestimonial].review}</p>
              <h4>{testimonials[activeTestimonial].name}</h4>
              <div className="stars">★★★★★</div>
            </div>
            <button
              type="button"
              className="testimonial-arrow"
              aria-label="Next testimonial"
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              ›
            </button>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                className={index === activeTestimonial ? 'active' : ''}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="venue-section section reveal">
        <div className="container">
          <h2 className="section-title-center">Our Venue Partners</h2>
        </div>
        <div className="venue-marquee">
          <div className="venue-track">
            {duplicatedPartners.map((partner, index) => (
              <div className="venue-item" key={`${partner}-${index}`}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-contact section reveal">
        <div className="container contact-grid">
          <div className="contact-info-panel">
            <div className="contact-overlay" />
            <div className="contact-content">
              <h3>Get In Touch</h3>
              <p>Event Foundation</p>
              <p>10th Floor, Wing A, Summit Building</p>
              <p>Vibhuti Khand, Gomti Nagar, Lucknow - 226010</p>
              <p>+91-9511118936 | +91-9511118935</p>
              <p>contact@eventfoundation.in</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h3>Send Enquiry</h3>
            <div className="form-grid">
              <input type="text" placeholder="Name*" required />
              <input type="email" placeholder="Email*" required />
              <input type="tel" placeholder="Phone" />
              <select defaultValue="">
                <option value="" disabled>Select Service</option>
                <option>Wedding Planning</option>
                <option>Corporate Events</option>
                <option>Birthday & Private Parties</option>
                <option>Celebrity Events</option>
                <option>Destination Events</option>
                <option>Floral & Decoration</option>
                <option>Catering Coordination</option>
              </select>
            </div>
            <textarea rows="5" placeholder="Message" />
            <button className="btn-gold" type="submit">Submit Enquiry</button>
            {formSubmitted && <p className="form-success">Thank you! Your enquiry has been submitted.</p>}
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
