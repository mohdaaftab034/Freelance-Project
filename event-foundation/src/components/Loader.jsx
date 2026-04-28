import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/Loader.css'

function Loader({ onComplete }) {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const duration = 1400
    const startTime = performance.now()
    let frameId = 0

    const animate = (now) => {
      const elapsed = now - startTime
      const ratio = Math.min(elapsed / duration, 1)
      setProgress(Math.max(1, Math.ceil(ratio * 100)))

      if (ratio < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
    const timer = setTimeout(() => {
      onComplete()
    }, duration)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frameId)
    }
  }, [onComplete])

  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <div className="loader-content">
        <span className="loader-dot loader-dot-1" />
        <span className="loader-dot loader-dot-2" />
        <span className="loader-dot loader-dot-3" />
        <span className="loader-dot loader-dot-4" />

        <h1>Event Foundation</h1>
        <p>Crafting Unforgettable Moments</p>
        <div
          className="loader-bar"
          style={{ '--loader-progress': `${progress}%` }}
        />
        <div className="loader-percent-wrap" aria-live="polite" aria-label={`Loading ${progress}%`}>
          <span className="loader-percent">{progress}%</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Loader
