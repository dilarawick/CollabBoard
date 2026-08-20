import { createContext, useContext, useState, useMemo, useEffect } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      login: (email, name) => {
        const userData = { email, name, id: Date.now().toString() }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      },
      logout: () => {
        setUser(null)
        localStorage.removeItem('user')
      },
    }),
    [user],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
