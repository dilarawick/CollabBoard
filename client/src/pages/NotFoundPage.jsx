import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'

export default function NotFoundPage() {
  return (
    <div className="page">
      <h2>404 - Page Not Found</h2>
      <Button variant="primary" as={Link} to="/">Go to Board</Button>
    </div>
  )
}
