import React from 'react'
import { useLocation } from 'react-router-dom'
export default function Header() {
  const location = useLocation()
  console.log(location)
  return (
    <div className=' h-[84px] items-center '>
      <div className='flex  justify-between  px-3 lg:justify-between lg:px-32 items-center h-full  '>
        <div className='flex '>
          <a href='' className=''></a>
          <div className=' text-3xl'>{location.pathname === '/Register' ? 'Đăng ký' : 'Đăng nhập'}</div>
        </div>

        <div className='text-[#ee4d2d]'>
          
        </div>
      </div>
    </div>
  )
}
