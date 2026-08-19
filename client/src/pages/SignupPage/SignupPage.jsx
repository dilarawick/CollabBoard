import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button'
import './SignupPage.css'

function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    navigate('/app')
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <Link to="/" className="signup-brand">
          <span className="signup-logo" aria-hidden="true">
            S
          </span>
          <h1>SyncBoard</h1>
        </Link>

        <h2 className="signup-title">Create your account</h2>
        <p className="signup-subtitle">
          Start organizing your team&apos;s work in minutes.
        </p>

        {error && <p className="signup-error">{error}</p>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-field">
            <span className="signup-label">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </label>

          <label className="signup-field">
            <span className="signup-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="signup-field">
            <span className="signup-label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </label>

          <label className="signup-field">
            <span className="signup-label">Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
          </label>

          <Button type="submit" variant="primary" className="signup-submit">
            Create account
          </Button>
        </form>

        <p className="signup-footer">
          Already have an account?{' '}
          <Link to="/login" className="signup-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
