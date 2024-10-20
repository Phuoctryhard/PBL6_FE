import { clearProfile, getAccessToken, getProfile } from '../until/index.js'
import { createContext, useState } from 'react'

// Context API

const initialAppContext = {
  isAuthenticated: Boolean(getAccessToken()),
  profile: getProfile()
}
export const AuthContext = createContext(initialAppContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [isProfile, setIsProfile] = useState(initialAppContext.profile)

  const login = (user) => {
    // localStorage.setItem('accesstoken', token) // Lưu token vào localStorage
    setIsAuthenticated(true) // Cập nhật trạng thái xác thực
    setIsProfile(user)
  }

  const logout = () => {
    localStorage.removeItem('accesstoken') // Xóa token khỏi localStorage
    clearProfile()
    setIsAuthenticated(false) // Cập nhật trạng thái xác thực
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, setIsProfile, isProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
