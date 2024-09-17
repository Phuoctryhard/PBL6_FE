import React from 'react'
import Header from '../../Component/Header'
import { NavLink } from 'react-router-dom'

export default function MainLayout({ children }) {
  return (
    <div className=''>
      <div className='bg-red-600 sticky top-0 z-10 h-10 fixed'>Header</div>
      <div className='grid grid-cols-4 min-h-screen '>
        {/* Sidebar */}
        <div className='col-span-1 bg-white fixed w-[250px]'>
          <div className='flex-1 overflow-y-scroll h-[calc(100vh)] '>
            <div className='h-[1000px]'>
              <div className='flex flex-col mt-5 ml-5 gap-y-5'>
                <NavLink to='/admin/overview' className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
                  Tổng quan
                </NavLink>

                <NavLink
                  to='/admin/post'
                  className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'text-red-500' : '')}
                >
                  Bài Viết
                </NavLink>

                <NavLink
                  to='/admin/products'
                  className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'text-red-500 ' : '')}
                >
                  Sản phẩm
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}

        {children}
      </div>
    </div>
  )
}
// <div className='col-span-3 bg-gray-light  '>
// {/* Scrollable content */}
// <div className='flex-1 overflow-y-scroll h-[calc(100vh)]'>
//   {/* Adjust the height according to your header's height */}
//   <div className='h-[1000px] flex items-center justify-center'>Content Message </div>
// </div>
// </div>
