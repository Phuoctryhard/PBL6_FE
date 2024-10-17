import React from 'react'
import { Link } from 'react-router-dom'
export default function SideNavAccount() {
  const active = window.location.pathname
  return (
    <div className=''>
      <div className=' flex border-b border-b-gray-300 py-4 px-3  '>
        <Link to='' className='w-12 h-12 rounded-full overflow-hidden'>
          <img
            src='https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/static-website/20240706162835-0-user-avatar.svg'
            alt=''
            className='w-full h-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-3'>
          <div className='text-neutral-900  font-bold capitalize mb-1'>Khách hàng</div>
          <Link to='/account/profile' className='flex items-center capitalize'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      <div className='mt-5   font-bold '>
        <Link
          to='/account/profile'
          className={`flex items-center px-3 py-3  ${active.startsWith('/account/profile') ? ' bg-[#ebf3fa] text-[#1a51a2]' : ''}`}
        >
          <div className='w-7 h-7  mr-3 '>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 7.09923C10.5053 7.09923 9.29339 8.31114 9.29339 9.80584V11.5001C9.29339 12.9948 10.5053 14.2067 12 14.2067C13.4947 14.2067 14.7066 12.9948 14.7066 11.5001V9.80584C14.7066 8.31114 13.4947 7.09923 12 7.09923ZM7.92976 9.80584C7.92976 7.55803 9.75219 5.7356 12 5.7356C14.2478 5.7356 16.0703 7.55803 16.0703 9.80584V11.5001C16.0703 13.7479 14.2478 15.5703 12 15.5703C9.75219 15.5703 7.92976 13.7479 7.92976 11.5001V9.80584Z'
                fill='currentColor'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6.31036 18.8101C7.36688 17.5511 8.95451 16.7478 10.7293 16.7478H13.2707C15.0372 16.7478 16.6369 17.5756 17.6885 18.8127L16.6496 19.6959C15.8375 18.7406 14.6079 18.1114 13.2707 18.1114H10.7293C9.37494 18.1114 8.16373 18.7228 7.35492 19.6866L6.31036 18.8101Z'
                fill='currentColor'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 2.86364C7.23027 2.86364 3.36364 6.73027 3.36364 11.5C3.36364 16.2697 7.23027 20.1364 12 20.1364C16.7697 20.1364 20.6364 16.2697 20.6364 11.5C20.6364 6.73027 16.7697 2.86364 12 2.86364ZM2 11.5C2 5.97715 6.47715 1.5 12 1.5C17.5228 1.5 22 5.97715 22 11.5C22 17.0228 17.5228 21.5 12 21.5C6.47715 21.5 2 17.0228 2 11.5Z'
                fill='currentColor'
              />
            </svg>
          </div>
          Thông tin cá nhân
        </Link>
      </div>
      <div className='mt-4   font-bold '>
        <Link
          to='/account/address'
          className={`flex items-center px-3 py-3  ${active == '/account/address' ? ' bg-[#ebf3fa] text-[#1a51a2]' : ''}`}
        >
          <div className='w-7 h-7  mr-3 '>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 37 36'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M10.46 22.622c.49.284.688.975.443 1.543L8.092 30.7h20.316l-2.812-6.534c-.244-.568-.046-1.26.443-1.543.49-.284 1.084-.054 1.328.514l3.528 8.2c.154.356.137.78-.043 1.118-.18.34-.499.546-.842.546H6.49c-.343 0-.662-.206-.842-.546a1.314 1.314 0 01-.043-1.119l3.528-8.199c.244-.568.839-.798 1.328-.514z'
                clipRule='evenodd'
              />
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M18.25 5.14c-3.733 0-7.657 2.89-7.657 7.83 0 1.116.454 2.523 1.243 4.084.778 1.538 1.828 3.12 2.896 4.558a57.136 57.136 0 003.518 4.266 57.136 57.136 0 003.518-4.266c1.068-1.438 2.118-3.02 2.896-4.558.79-1.56 1.243-2.968 1.243-4.085 0-4.939-3.924-7.829-7.657-7.829zm0 22.29l-.743.753-.003-.002-.005-.006-.02-.021-.077-.08-.285-.303a59.33 59.33 0 01-4.053-4.865c-1.107-1.49-2.233-3.18-3.087-4.869C9.134 16.372 8.5 14.598 8.5 12.97 8.5 6.645 13.57 3 18.25 3S28 6.644 28 12.97c0 1.628-.634 3.402-1.477 5.067-.854 1.688-1.98 3.378-3.088 4.87a59.33 59.33 0 01-4.337 5.167l-.076.08-.02.021-.006.006-.002.002-.744-.753zm0 0l.744.753a1.038 1.038 0 01-.744.317c-.279 0-.547-.114-.743-.317l.743-.753z'
                clipRule='evenodd'
              />
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M18.25 11.222a1.528 1.528 0 100 3.056 1.528 1.528 0 000-3.056zM14.5 12.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          Số địa chỉ nhận hàng
        </Link>
      </div>

      <div className='mt-4   font-bold '>
        <Link
          to='/account/order-history'
          className={`flex items-center px-3 py-3  ${active == '/account/order-history' ? ' bg-[#ebf3fa] text-[#1a51a2]' : ''}`}
        >
          <div className='w-7 h-7  mr-3 '>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' clipRule='evenodd' d='M7 11H17V12.5H7V11Z' fill='currentColor' />
              <path fillRule='evenodd' clipRule='evenodd' d='M7 15H17V16.5H7V15Z' fill='currentColor' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3 4H6.03464V5.37182H4.37182V20.6282H19.6282V5.37182H17.9654V4H21V22H3V4Z'
                fill='currentColor'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7 2H17V8H13.0086V7.35294C13.0086 6.84364 12.5574 6.43137 12 6.43137C11.4426 6.43137 10.9914 6.84364 10.9914 7.35294V8H7V2ZM8.41631 3.29412V6.70588H9.68007C9.98292 5.79769 10.9068 5.13725 12 5.13725C13.0932 5.13725 14.0171 5.79769 14.3199 6.70588H15.5837V3.29412H8.41631Z'
                fill='currentColor'
              />
            </svg>
          </div>
          Lịch sử đơn hàng
        </Link>
      </div>
    </div>
  )
}
