import { createContext, useContext, useState, useEffect } from 'react'
import {
  getUsers,
  registerUser,
  updateUser,
} from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('snackbazaar_user')
      if (stored) setUser(JSON.parse(stored))
    } catch {
      localStorage.removeItem('snackbazaar_user')
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await getUsers()
    const found = res.data.find(
      (u) => u.email === email && u.password === password
    )
    if (!found) {
      throw new Error('Invalid email or password')
    }
    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('snackbazaar_user', JSON.stringify(safeUser))
    return safeUser
  }

  const register = async (userData) => {
    const res = await getUsers()
    const exists = res.data.find((u) => u.email === userData.email)
    if (exists) {
      throw new Error('Email already registered')
    }
    const newUser = {
      ...userData,
      role: 'user',
      address: userData.address || {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
      },
    }
    const created = await registerUser(newUser)
    const { password: _pw, ...safeUser } = created.data
    setUser(safeUser)
    localStorage.setItem('snackbazaar_user', JSON.stringify(safeUser))
    return safeUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('snackbazaar_user')
  }

  const updateProfile = async (id, data) => {
    const updated = await updateUser(id, data)
    const { password: _pw, ...safeUser } = updated.data
    setUser(safeUser)
    localStorage.setItem('snackbazaar_user', JSON.stringify(safeUser))
    return safeUser
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}
