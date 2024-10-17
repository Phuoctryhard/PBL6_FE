import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [date, setDate] = useState('2002-02-12')
  return (
    <div className=' px-3 py-3 '>
      <div className='border-b border-b-gray-300'>
        <p className='text-lg capitalize text-[#333]'>Hồ sơ của tôi </p>

        <div className='mt-1 pb-3 text-sm'>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
      </div>

      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start text-sm'>
        <form action='' className='mt-6 flex-grow pr-10 md:mt-1'>
          <div className=' flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <input
                type='text'
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className=' mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <div className='text-gray-700 w-full px-3 py-2'>ngo***@gmail.com</div>
            </div>
          </div>
          <div className='mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4  capitalize text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <input
                type='text'
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>

          <div className='mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Ngày Sinh</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <input
                type='date'
                onChange={(event) => {
                  setDate(event.target.value)
                }}
                value={date}
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>

          <div className='mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Giới tính</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <select name='gender' id='' className='px-3 py-2 w-full border border-gray-300 rounded-sm outline-none  '>
                <option value=''>Nam</option>
                <option value=''>Nữ</option>
                <option value=''>Khác</option>
              </select>
            </div>
          </div>

          <div className='mt-8 flex flex-wrap sm:flex-row items-center justify-between'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5 flex justify-end items-center text-blue  '>
              <Link to='/account/profile/update-password' className='py-2'>
                Cập nhật
              </Link>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </div>
          </div>
        </form>

        <div className='justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center '>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/static-website/20240706162835-0-user-avatar.svg'
                alt=''
                className='w-full h-full rounded-full object-cover'
              />
            </div>

            <input type='file' accept='.jpg,.jpeg,.png' className='hidden' />
            <button className=' px-4 py-2 rounded-sm shadow-sm  border border-gray-400 bg-white text-sm text-gray-600 text-center hover:bg-gray-100'>
              Chọn Ảnh{' '}
            </button>
            <div className='mt-2 text-gray-400 '>Dụng lượng file tối đa 1 MB</div>
            <div className='mt-1 text-gray-400 '>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
        <div className=''></div>
      </div>
    </div>
  )
}
