'use client';

import { createContext, useContext, useEffect, useState } from 'react'
import { getAuthData } from '../utils/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authData = getAuthData()
      setUser(authData)
      setLoading(false)
    }

    checkAuth()

    // Listen for auth changes (for when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check periodically
    const interval = setInterval(checkAuth, 5000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user?.token,
    isAdmin: user?.userRole === 'admin',
    isReseller: user?.userRole === 'reseller'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}