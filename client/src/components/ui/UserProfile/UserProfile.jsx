import { useState, useRef, useEffect } from 'react'
import { useUser } from '../../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import './UserProfile.css'

function UserProfile() {
  const { user, logout } = useUser()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="user-profile" ref={ref}>
      <button
        type="button"
        className="user-profile__avatar-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {initials}
      </button>
      <div className="user-profile__info">
        <p className="user-profile__name">{user.name}</p>
        <p className="user-profile__email">{user.email}</p>
      </div>
      {open && (
        <div className="user-profile__menu">
          <button
            type="button"
            className="user-profile__menu-item"
            onClick={() => {
              setOpen(false)
              navigate('/app')
            }}
          >
            View Profile
          </button>
          <button
            type="button"
            className="user-profile__menu-item user-profile__menu-item--danger"
            onClick={() => {
              setOpen(false)
              logout()
              navigate('/')
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
