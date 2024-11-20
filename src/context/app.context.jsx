import { clearProfile, getAccessToken, getProfile, saveProfile } from '../until/index.js'
import { createContext, useState, useContext } from 'react'
// Context API

const initialAppContext = {
  isAuthenticated: Boolean(getAccessToken()),
  profile: getProfile(),
  checkedProducts: []
}
export const AuthContext = createContext(initialAppContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [isProfile, setIsProfile] = useState(initialAppContext.profile)
  const [checkedProducts, setCheckedProducts] = useState(initialAppContext.checkedProducts)
  const login = (user, token) => {
    localStorage.setItem('accesstoken', token) // Lưu token vào localStorage
    setIsAuthenticated(true) // Cập nhật trạng thái xác thực
    setIsProfile(user)
  }

  const logout = () => {
    localStorage.removeItem('accesstoken') // Xóa token khỏi localStorage
    clearProfile()
    setIsAuthenticated(false) // Cập nhật trạng thái xác thực
  }

  const setProfile = (profile) => {
    setIsProfile(profile)
    saveProfile(profile)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        setIsProfile,
        isProfile,
        setProfile,
        checkedProducts,
        setCheckedProducts
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(AuthContext)
}
