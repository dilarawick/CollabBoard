import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className="not-found">
      <div className="not-found__card">
        <div className="not-found__icon" aria-hidden="true">
          🔍
        </div>
        <h2>404 — Page not found</h2>
        <p>The page you requested does not exist or may have been moved.</p>
        <div className="not-found__actions">
          <Button onClick={() => navigate('/')}>Go to board</Button>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage