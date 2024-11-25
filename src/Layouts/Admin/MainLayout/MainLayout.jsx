import React from 'react'
import Header from '../../../Component/AdminHeader'
import Sidebar from '../../../Component/AdminSidebar'
import { useEffect, useRef, createContext, useContext } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const ScrollContext = createContext()
export const useScrollToTop = () => {
  return useContext(ScrollContext)
}

export const useTriggerSidebar = () => {
  return useContext(ScrollContext)
}

export default function MainLayout({ children, scrollBar = 'htmlBar' }) {
  const ref = useRef()
  const sidebarRef = useRef()
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
  return (
    <div className='w-full max-w-[100%] flex'>
      <ScrollContext.Provider value={(scrollToTop, triggerSidebar)}>
        <Sidebar ref={sidebarRef} />
        <div className='w-[calc(100%-256px)] h-[100vh]'>
          <Header />
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
      </ScrollContext.Provider>
    </div>
  )
}
