import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('404 - Page Not Found')
  return (
    <section className="not-found section">
      <div className="container">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn-gold">Back to Home</Link>
      </div>
    </section>
  )
}

export default NotFound
