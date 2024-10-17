import React from 'react'
import SideNavAccount from '../components/SideNavAccount/SideNavAccount'
import { Outlet } from 'react-router-dom'

export default function LayoutAccount() {
  return (
    <div className='lg:px-24 py-10  test-sm text-gray-600 bg-[#f7f7f7]'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <div className='md:col-span-2 lg:col-span-3 bg-white rounded-lg'>
          <SideNavAccount />
        </div>
        <div className='md:col-span-10 lg:col-span-9  bg-white rounded-lg'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
