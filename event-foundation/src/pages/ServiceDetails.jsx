import { useState, useEffect } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useParams, Link } from 'react-router-dom'
import ServiceTemplate from './services/ServiceTemplate'
import { getServiceBySlug } from '../utils/api'

function ServiceDetails() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useDocumentTitle(service ? service.title : 'Loading Service...')

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const data = await getServiceBySlug(slug)
        if (data.success) {
          setService(data.data)
          setError(false)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching service details:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [slug])

  if (loading) {
    return (
      <div className="loading-state" style={{ padding: '200px 0', textAlign: 'center' }}>
        <p>Loading service details...</p>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="error-state" style={{ padding: '200px 0', textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <p>The service you are looking for does not exist or has been moved.</p>
        <Link to="/services" className="btn-gold" style={{ marginTop: '20px', display: 'inline-block' }}>Back to Services</Link>
      </div>
    )
  }

  return (
    <ServiceTemplate
      title={service.title}
      image={service.image}
      breadcrumb={service.breadcrumb}
      overview={service.overview}
      overviewImage={service.overviewImage}
      excellenceImage={service.excellenceImage}
      included={service.included}
      features={service.features}
      timelineSteps={service.timelineSteps}
      styleVariant={service.styleVariant}
      gallery={service.gallery}
    />
  )
}

export default ServiceDetails
