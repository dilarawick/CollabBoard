import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-header">
        <Link to="/" className="landing-brand">
          <span className="landing-logo" aria-hidden="true"> 
            S
          </span>
          <h1>CollabBoard</h1>
        </Link>
        <nav className="landing-nav">
          <Link to="/login" className="nav-link">
            Log in
          </Link>
          <Link to="/signup" className="btn btn--primary">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <h2 className="hero-title">
              Organize work. <span className="hero-accent">Ship faster.</span>
            </h2>
            <p className="hero-subtitle">
              CollabBoard brings your tasks, team, and timeline together in one
              visual workspace. Track progress, assign work, and hit deadlines
              without the chaos.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn--primary btn--lg">
                Create free account
              </Link>
              <Link to="/login" className="btn btn--secondary btn--lg">
                Log in
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card hero-card--1">
              <div className="hero-card__dot" />
              <div className="hero-card__line" />
              <div className="hero-card__line hero-card__line--short" />
            </div>
            <div className="hero-card hero-card--2">
              <div className="hero-card__dot" />
              <div className="hero-card__line" />
              <div className="hero-card__line hero-card__line--short" />
            </div>
            <div className="hero-card hero-card--3">
              <div className="hero-card__dot" />
              <div className="hero-card__line" />
              <div className="hero-card__line hero-card__line--short" />
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <div className="feature-icon">📋</div>
            <h3 className="feature-title">Kanban Boards</h3>
            <p className="feature-desc">
              Organize tasks into columns, track status at a glance, and keep
              everyone aligned.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">👥</div>
            <h3 className="feature-title">Team Collaboration</h3>
            <p className="feature-desc">
              Assign tasks, mention teammates, and stay in sync with shared
              project views.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Real-time Updates</h3>
            <p className="feature-desc">
              See changes instantly as your team moves tasks forward without
              refreshing.
            </p>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2026 CollabBoard. Built for better workflows.</p>
      </footer>
    </div>
  )
}

export default LandingPage
