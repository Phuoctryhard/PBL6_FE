import React from 'react'
import Header from '../../../Component/AdminHeader'
import Sidebar from '../../../Component/AdminSidebar'
import { useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
export default function MainLayout({ children, scrollBar = 'htmlBar' }) {
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
  return (
    <div className='w-full max-w-[100%] flex'>
      <Sidebar />
      <div className='w-[calc(100%-256px)] h-[100vh]'>
        <Header />
        <main className='test flex w-full h-[calc(100%-60px)] bg-[#f8f9fb]'>
          {scrollBar === 'simpleBar' ? (
            <SimpleBar style={{ width: '100%', maxHeight: '100%' }} autoHide>
              <div className='h-full w-full px-[40px] pt-[30px]'>{children}</div>
            </SimpleBar>
          ) : (
            <div className='component__content h-full w-full px-[40px] pt-[30px] overflow-y-auto'>{children}</div>
          )}
        </main>
      </div>
    </div>
  )
}
