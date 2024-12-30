import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaFacebook, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const footerSections = [
    {
      title: 'Về Pbl6',
      links: [
        { label: 'Giới thiệu', url: '#' },
        { label: 'Hệ thống cửa hàng', url: '#' }
      ]
    },
    {
      title: 'Danh mục',
      links: [
        { label: 'Thuốc', url: '/category' },
        { label: 'Tra cứu bệnh', url: '/benh' }
      ]
    },
    {
      title: 'Tổng đài CSKH',
      content: (
        <>
          <p>
            Hỗ trợ đặt hàng <br />
            <a rel='noopener noreferrer' target='_blank' href='tel:18006821'>
              <span className='font-bold text-blue'>0865446276</span>
            </a>
          </p>
          <div className='mt-10'>
            <h4 className='text-[14px] leading-[20px] mb-4 font-bold'>Ngôn ngữ</h4>
            <div className='flex cursor-pointer items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <span className='text-[14px] leading-[20px] ml-2'>Language</span>
            </div>
          </div>
        </>
      )
    },
    {
      title: 'Theo dõi chúng tôi trên',
      links: [
        {
          label: 'Facebook',
          url: '',
          icon: (
            <img
              className='inline-block mb-1 mr-2 w-[1.5rem]'
              src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163158-0-facebook.svg'
              alt=''
            />
          )
        },
        {
          label: 'Youtube',
          url: '',
          icon: (
            <img
              className='inline-block mb-1 mr-2 w-[1.5rem]'
              src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163159-0-youtube.svg'
              alt=''
            />
          )
        },
        {
          label: 'Zalo',
          url: '',
          icon: (
            <img
              className='inline-block mb-1 mr-2 w-[1.5rem]'
              src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240809162128-0-zalo.svg'
              alt=''
            />
          )
        }
      ]
    },
    {
      title: 'Tải ứng dụng PBL6 ngay thôi',
      content: (
        <div className='flex justify-between'>
          <div>
            <img className='w-[100px]' alt='Google Play' src='/path-to-google-play-image' />
          </div>
          <div className='flex flex-col gap-y-4'>
            <img className='object-contain w-[100px]' alt='App Store' src='/path-to-app-store-image' />
          </div>
        </div>
      )
    }
  ]

  return (
    <div className='w-full bg-neutral-200 pb-24'>
      <div className='hidden h-2 bg-primary md:block'></div>
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 px-6 md:px-16 lg:px-32 mt-5'>
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h4 className='text-[14px] leading-[20px] mb-4 font-bold'>{section.title}</h4>
            {section.links ? (
              <ul>
                {section.links.map((link, index) => (
                  <li key={index} className='pb-2 flex items-center gap-2'>
                    {link.icon && link.icon}
                    <a target='_self' href={link.url}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              section.content
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
