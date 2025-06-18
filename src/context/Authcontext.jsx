// src/context/Authcontext.jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    // For now, simulate success:
    if (email === 'test@example.com' && password === 'password') {
      const userData = { email }
      setUser(userData)
      return { success: true }
    } else {
      return { success: false, message: 'Invalid credentials' }
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
