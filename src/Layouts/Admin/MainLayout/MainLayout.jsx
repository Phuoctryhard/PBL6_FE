import React from 'react'
import Header from '../../../Component/AdminHeader'
import Sidebar from '../../../Component/AdminSidebar'
import { AdminErrorInternetConnection } from '../../../Component'
import { useEffect, useRef, createContext, useContext, useState } from 'react'
import { ProductsAPI } from '../../../Api/admin'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminAPI } from '../../../Api/admin'
import { useAuth } from '../../../context/app.context'
import { useNavigate } from 'react-router-dom'
const AdminMainLayoutContext = createContext()

export const useAdminMainLayoutFunction = () => {
  return useContext(AdminMainLayoutContext)
}

export default function MainLayout({ children, scrollBar = 'htmlBar' }) {
  const token = localStorage.getItem('accesstoken')
  const { logout } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleUnauthorized = () => {
    toast.error('Unauthorized or token expired or invalid. Please login again!')
    logout()
    navigate('/admin/login')
  }

  const fetchAdmin = async () => {
    try {
      const res = await AdminAPI.getAdmin(token)
      if (res) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    } catch (error) {
      if (error.message.includes('Network error')) {
        setIsNetworkConnection(false)
        return
      }
    }
  }

  useEffect(() => {
    fetchAdmin()
  }, [])

  useEffect(() => {
    if (!isLogin) {
      handleUnauthorized()
    }
  }, [isLogin])

  const ref = useRef()
  const sidebarRef = useRef()
  const headerRef = useRef()
  const [isNetworkConnection, setIsNetworkConnection] = useState(navigator.onLine)

  useEffect(() => {
    const verifyNetworkStatus = async () => {
      try {
        await ProductsAPI.getProductsNames()
        setIsNetworkConnection(true)
      } catch (e) {
        setIsNetworkConnection(false)
      }
    }

    const handleOnline = () => {
      setIsNetworkConnection(true)
      verifyNetworkStatus() // Xác minh với server khi có mạng lại
    }

    const handleOffline = () => setIsNetworkConnection(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
    .simplebar-scrollbar::before {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .component__content::-webkit-scrollbar {
      width: 0;
    }
  `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.getScrollElement().scrollTop = 0
    }
  }

  const triggerSidebar = (navParentID, navChildrenID = undefined) => {
    const sidebar = sidebarRef.current
    if (sidebar) {
      if (!navChildrenID) {
        sidebar.handleNavClick(navParentID)
        sidebar.setSelectedId(null)
      } else {
        sidebar.handleNavClick(navParentID)
        sidebar.setSelectedId(null)
        sidebar.handleSubNavClick(navChildrenID)
      }
    }
  }

  const setHeaderNotifyData = (data) => {
    const header = headerRef.current
    if (header) {
      header.setNotifyData(data)
    }
  }

  return isNetworkConnection ? (
    isLogin && (
      <div className='w-full max-w-[100%] flex'>
        <AdminMainLayoutContext.Provider value={{ scrollToTop, triggerSidebar, setIsLogin, setHeaderNotifyData }}>
          <Sidebar ref={sidebarRef} />
          <div className='w-[calc(100%-256px)] h-[100vh]'>
            <Header ref={headerRef} />
            <main className='test flex w-full h-[calc(100%-60px)] bg-[#f8f9fb]'>
              {scrollBar === 'simpleBar' ? (
                <SimpleBar style={{ width: '100%', maxHeight: '100%' }} autoHide ref={ref}>
                  <div className='h-full w-full px-[40px] pt-[30px]'>{children}</div>
                </SimpleBar>
              ) : (
                <div className='component__content h-full w-full px-[40px] pt-[30px] overflow-y-auto'>{children}</div>
              )}
            </main>
          </div>
        </AdminMainLayoutContext.Provider>
      </div>
    )
  ) : (
    <AdminErrorInternetConnection />
  )
}
