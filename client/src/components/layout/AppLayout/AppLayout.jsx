import { Link, NavLink, Outlet } from 'react-router-dom'
import UserProfile from '../../ui/UserProfile/UserProfile'
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle'

function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__left">
          <Link to="/app" className="app-header__brand">
            <span className="app-header__logo" aria-hidden="true">
              S
            </span>
            <h1>CollabBoard</h1>
          </Link>
          <nav className="app-nav">
            <NavLink to="/app" end>
              Board
            </NavLink>
          </nav>
        </div>
        <div className="app-header__right">
          <UserProfile />
        </div>
      </header>
      <main className="app-main">
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
