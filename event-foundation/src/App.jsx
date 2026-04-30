import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import OurWork from './pages/OurWork'
import Testimonials from './pages/Testimonials'
import WorkProjectDetails from './pages/WorkProjectDetails'
import ContactUs from './pages/ContactUs'
import TermsAndConditions from './pages/TermsAndConditions'
import LegalPrivacy from './pages/LegalPrivacy'
import NotFound from './pages/NotFound'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
  }, [location.pathname])

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100)
      }
      return
    }

    // Reset scroll to top instantly on page change to avoid jitter
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (isLoading) return

    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [location.pathname, isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key={`loader-${location.pathname}`} onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />

          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="/services/:slug" element={<PageTransition><ServiceDetails /></PageTransition>} />
                <Route path="/our-work" element={<PageTransition><OurWork /></PageTransition>} />
                <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
                <Route path="/our-work/:slug" element={<PageTransition><WorkProjectDetails /></PageTransition>} />
                <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
                <Route path="/terms-and-conditions" element={<PageTransition><TermsAndConditions /></PageTransition>} />
                <Route path="/privacy-policy" element={<PageTransition><LegalPrivacy /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />

          <a href="/contact-us" className="floating-enquiry" aria-label="Enquiry now">
            Enquiry Now
          </a>
          <a
            href="https://wa.me/919511118936"
            className="floating-whatsapp"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp
          </a>
        </>
      )}
    </>
  )
}

export default App
