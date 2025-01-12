import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaFacebook, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const footerSections = [
    {
      title: 'Về Pbl6',
      links: [{ label: 'Giới thiệu' }, { label: 'Địa chỉ: 67 Nam Cao - Hòa Khánh Nam - Liên Chiểu - Đà Nẵng' }]
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
        </>
      )
    },
    {
      title: 'Theo dõi chúng tôi trên',
      links: [
        {
          label: 'Facebook',
          url: 'https://www.facebook.com/profile.php?id=61571237860020',
          icon: (
            <img
              className='inline-block mb-1 mr-2 w-[1.5rem]'
              src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163158-0-facebook.svg'
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
    }
  ]

  return (
    <div className='w-full bg-neutral-200 pb-24'>
      <div className='hidden h-2 bg-primary md:block'></div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-16 lg:px-32 mt-5'>
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
