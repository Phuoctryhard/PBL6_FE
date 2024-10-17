import { getAccessToken } from '../until/index.js'
import { createContext, useState } from 'react'

// Context API

const initialAppContext = {
  isAuthenticated: Boolean(getAccessToken())
}

export const AuthContext = createContext(initialAppContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)

  const login = (token) => {
    localStorage.setItem('accesstoken', token) // Lưu token vào localStorage
    setIsAuthenticated(true) // Cập nhật trạng thái xác thực
  }

  const logout = () => {
    localStorage.removeItem('accesstoken') // Xóa token khỏi localStorage
    setIsAuthenticated(false) // Cập nhật trạng thái xác thực
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
