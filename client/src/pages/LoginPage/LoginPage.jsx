import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import Button from '../../components/ui/Button/Button'
import './LoginPage.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim() || !name.trim()) {
      setError('Please fill in all fields.')
      return
    }

    // Save user to context and localStorage
    login(email, name)
    navigate('/app')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="login-brand">
          <span className="login-logo" aria-hidden="true">
            S
          </span>
          <h1>SyncBoard</h1>
        </Link>

        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">
          Log in to your account to continue organizing your work.
        </p>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span className="login-label">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              autoComplete="name"
            />
          </label>

          <label className="login-field">
            <span className="login-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="login-field">
            <span className="login-label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <Button type="submit" variant="primary" className="login-submit">
            Log in
          </Button>
        </form>

        <p className="login-footer">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="login-link">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
