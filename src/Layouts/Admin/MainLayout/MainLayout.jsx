import React from 'react'
import Header from '../../../Component/AdminHeader'
import Sidebar from '../../../Component/AdminSidebar'
export default function MainLayout({ children }) {
  return (
    <div className='bg-[#f8f9fb] max-w-[100%] flex'>
      <Sidebar />
      <div className='container max-w-[calc(100%-256px)] h-[100vh]'>
        <Header />
        <main className='flex w-full h-[calc(100%-60px)]'>
          <div className='content h-full w-full px-[40px] pt-[30px] overflow-y-auto'>{children}</div>
        </main>
      </div>
    </div>
  )
}
