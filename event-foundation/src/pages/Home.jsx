import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { submitEnquiry, getHomeContent, getTestimonials, getServices, getProjects } from '../utils/api'
import '../styles/home.css'

// Move static data into a fallback object or handle it in state
const defaultHeroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    label: '#WeddingPlanning #FloralDecoration',
    title: 'Wedding Planning and Floral Design for Signature Celebrations',
    description: 'We design elegant weddings with cohesive planning, thoughtful decor, and smooth coordination from first consultation to final farewell.',
    ctaText: 'Contact Us',
    ctaLink: '/contact-us',
  }
];

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

const defaultPartners = [
  'Golden Tulip', 'Taj Hotel', 'Radisson Blu', 'Vivanta', 'The Grand JBR'
]

const defaultCounterTargets = [
  { value: 10000, label: 'Events', suffix: 'k+' },
  { value: 5000, label: 'Celebrity Events', suffix: 'k+' },
  { value: 3000, label: 'Sweet Couples', suffix: 'k+' },
  { value: 8000, label: 'Best Bouquets', suffix: 'k+' },
]

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeGallerySlide, setActiveGallerySlide] = useState(0)
  const [homeContent, setHomeContent] = useState({
    heroSlides: defaultHeroSlides,
    partners: defaultPartners,
    counters: defaultCounterTargets
  })
  const [testimonials, setTestimonials] = useState([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [services, setServices] = useState([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [galleryImages, setGalleryImages] = useState([])
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [counterStarted, setCounterStarted] = useState(false)
  
  const { heroSlides, partners, counters: counterTargets } = homeContent

  useEffect(() => {
    setActiveSlide(0)
  }, [heroSlides.length])

  const [counterValues, setCounterValues] = useState(counterTargets.map(() => 0))
  const counterSectionRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchContent = async () => {
      console.log('Fetching home content...');
      const data = await getHomeContent()
      console.log('Fetched home content:', data);
      if (data.success && data.data) {
        setHomeContent(data.data)
        setIsDataLoaded(true)
      }
    }

    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials()
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data)
        } else {
          // Use default static testimonials if DB is empty
          const staticTestimonials = [
            { name: 'Sachin', quote: 'Event Foundation brought grace and discipline to every detail of our wedding.' },
            { name: 'Shoib', quote: 'They transformed our corporate annual meet into a world-class production.' },
            { name: 'Priyanshu Verma', quote: 'Creative, responsive, and truly premium in execution.' }
          ];
          setTestimonials(staticTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoadingTestimonials(false);
      }
    }

    const fetchServices = async () => {
      try {
        const data = await getServices()
        if (data.success && data.data.length > 0) {
          setServices(data.data)
        } else {
          // Keep static services if DB is empty (already defined as serviceCards)
          setServices(serviceCards)
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoadingServices(false)
      }
    }

    const fetchGalleryImages = async () => {
      try {
        const data = await getProjects()
        if (data.success && data.data.length > 0) {
          const allImages = []
          data.data.forEach(project => {
            if (project.coverImage) {
              allImages.push({
                url: project.coverImage,
                title: project.title,
                slug: project.slug
              })
            }
            if (project.images && project.images.length > 0) {
              project.images.forEach(imgUrl => {
                allImages.push({
                  url: imgUrl,
                  title: project.title,
                  slug: project.slug
                })
              })
            }
          })
          setGalleryImages(allImages)
        } else {
          // Use default static gallery if DB is empty
          const staticGallery = [
            { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', title: 'Luxury Wedding', slug: 'wedding' },
            { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', title: 'Corporate Gala', slug: 'corporate' },
            { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80', title: 'Floral Design', slug: 'floral' }
          ];
          setGalleryImages(staticGallery)
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error)
      } finally {
        setLoadingGallery(false)
      }
    }

    fetchContent()
    fetchTestimonials()
    fetchServices()
    fetchGalleryImages()
  }, [])

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % (heroSlides.length || 1))
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [heroSlides.length])

  useEffect(() => {
    if (testimonials.length === 0) return;
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(testimonialInterval)
  }, [testimonials.length])

  useEffect(() => {
    if (galleryImages.length === 0) return;
    const galleryInterval = setInterval(() => {
      setActiveGallerySlide((prev) => (prev + 1) % galleryImages.length)
    }, 2000)

    return () => clearInterval(galleryInterval)
  }, [galleryImages.length])

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

      setCounterValues(counterTargets.map((target) => {
        const numValue = parseInt(String(target.value).replace(/[^0-9]/g, '')) || 0;
        return Math.floor(numValue * progress);
      }))

      if (progress >= 1) clearInterval(timer)
    }, 40)

    return () => clearInterval(timer)
  }, [counterStarted, counterTargets])

  const duplicatedPartners = useMemo(() => [...partners, ...partners, ...partners], [partners])
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!formData.service) {
      alert('Please select a service')
      return
    }

    setIsSubmitting(true)
    try {
      const data = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.service,
        message: formData.message,
      })

      if (data.success) {
        setFormSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        })
        setTimeout(() => setFormSubmitted(false), 3000)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      alert('Error connecting to server.')
    } finally {
      setIsSubmitting(false)
    }
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

      <section className="wedding-story-home section reveal">
        <div className="container wedding-story-grid">
          <div className="wedding-story-media">
            <img src="/wedding.png" alt="Wedding Story" className="wedding-png-luxe" />
          </div>
          <div className="wedding-story-content">
            <span className="section-label">OUR WEDDING STORY</span>
            <h2>Crafting the wedding of your dreams with perfection</h2>
            <p>
              At Event Foundation, we believe that every wedding is a unique masterpiece. Our journey starts with your vision, 
              which we meticulously translate into a breathtaking reality. From grand venue transformations to the most delicate 
              floral details, we ensure that your special day reflects your personality and love story.
            </p>
            <p>
              Our expert planners handle everything with a refined touch, allowing you to immerse yourself in the joy of the moment 
              while we orchestrate a seamless celebration that will be cherished for a lifetime.
            </p>
            <Link to="/services/wedding-planning" className="btn-gold">Explore Wedding Services</Link>
          </div>
        </div>
      </section>

      <section className="services-grid section reveal" id="services">
        <div className="container">
          <h2 className="section-title-center">Our Services</h2>
          <div className="services-card-grid">
            {loadingServices ? (
               <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', opacity: 0.7 }}>
                  <p>Loading signature services...</p>
               </div>
            ) : services.map((card) => (
              <article key={card.title} className="service-card" onClick={() => navigate(`/services/${card.slug}`)} role="button" tabIndex={0}>
                <div className="service-card-media">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  <span className="service-icon">{card.serviceIcon || '✦'}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description || card.text}</p>
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
          {loadingGallery ? (
             <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.7 }}>
                <p>Loading visuals...</p>
             </div>
          ) : galleryImages.length > 0 ? (
            <>
              <div className="gallery-slider-shell">
                <button
                  type="button"
                  className="gallery-arrow gallery-arrow-left"
                  aria-label="Previous image"
                  onClick={() => setActiveGallerySlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                >
                  ‹
                </button>

                <div className="gallery-slider-window" aria-roledescription="carousel">
                  <motion.div
                    className="gallery-slider-track"
                    style={{ width: `${galleryImages.length * 100}%` }}
                    animate={{ x: `-${(activeGallerySlide * 100) / galleryImages.length}%` }}
                    transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                  >
                    {galleryImages.map((item, index) => (
                      <div 
                        className="gallery-slide" 
                        key={`${item.url}-${index}`} 
                        style={{ width: `${100 / galleryImages.length}%`, cursor: 'pointer' }}
                        onClick={() => navigate(`/our-work/${item.slug}`)}
                      >
                        <img src={item.url} alt={item.title} loading="lazy" />
                        <div className="gallery-slide-overlay">
                          <span className="gallery-category">Featured Work</span>
                          <h4 className="gallery-project-title">{item.title}</h4>
                          <span className="gallery-view-btn">View Project ⟶</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <button
                  type="button"
                  className="gallery-arrow gallery-arrow-right"
                  aria-label="Next image"
                  onClick={() => setActiveGallerySlide((prev) => (prev + 1) % galleryImages.length)}
                >
                  ›
                </button>
              </div>

              <div className="gallery-slider-dots" aria-label="Gallery navigation">
                {galleryImages.slice(0, 15).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={`gallery-dot ${index === activeGallerySlide ? 'active' : ''}`}
                    aria-label={`Go to image ${index + 1}`}
                    onClick={() => setActiveGallerySlide(index)}
                  />
                ))}
              </div>
            </>
          ) : null}

          <div className="center-btn-wrap">
            <Link to="/our-work" className="btn-outline">Explore Gallery</Link>
          </div>
        </div>
      </section>

      <section className="counter-section reveal" ref={counterSectionRef}>
        <div className="container counter-grid">
          {counterTargets.map((counter, index) => (
            <div key={counter.label}>
              <h3>
                {counterValues[index] >= (parseInt(String(counter.value).replace(/[^0-9]/g, '')) || 0) 
                  ? counter.value 
                  : `${counterValues[index]}${String(counter.value).replace(/[0-9]/g, '')}`}
              </h3>
              <p>{counter.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-section section reveal">
        <div className="container">
          <h2 className="section-title-center">What Our Clients Say</h2>
          {testimonials.length > 0 ? (
            <>
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
                  <p>{testimonials[activeTestimonial]?.quote || testimonials[activeTestimonial]?.review}</p>
                  <h4>{testimonials[activeTestimonial]?.name}</h4>
                  <div className="stars">
                    {Array.from({ length: testimonials[activeTestimonial]?.rating || 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
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
                    key={testimonial._id || index}
                    type="button"
                    className={index === activeTestimonial ? 'active' : ''}
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </>
          ) : (
             <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.7 }}>
                <p>Loading testimonials...</p>
             </div>
          )}
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
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Service</option>
                <option value="Wedding Planning">Wedding Planning</option>
                <option value="Corporate Events">Corporate Events</option>
                <option value="Birthday & Private Parties">Birthday & Private Parties</option>
                <option value="Celebrity Events">Celebrity Events</option>
                <option value="Destination Events">Destination Events</option>
                <option value="Floral & Decoration">Floral & Decoration</option>
                <option value="Catering Coordination">Catering Coordination</option>
              </select>
            </div>
            <textarea
              name="message"
              rows="5"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleChange}
            />
            <button className="btn-gold" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
            {formSubmitted && <p className="form-success">Thank you! Your enquiry has been submitted.</p>}
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
