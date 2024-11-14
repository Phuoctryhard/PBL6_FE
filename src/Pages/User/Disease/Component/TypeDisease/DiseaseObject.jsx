import React from 'react'

export default function DiseaseObject({ disease_by_target_group }) {
  console.log(disease_by_target_group)
  return (
    <>
      <div className='px-24 flex flex-col'>
        <div class=' flex items-center justify-between py-4'>
          <h4 class='font-semibold md:font-semibold md:text-[20px] text-base'>Tra cứu bệnh</h4>
          <a
            class='relative flex justify-center border-0 bg-transparent text-sm font-normal text-hyperLink outline-none md:hover:text-primary-600 md:text-base'
            type='button'
            href='/benh'
          >
            Xem thêm
          </a>
        </div>

        <div className='grid grid-cols-3 gap-3 mt-1 mb-3 '>
          <div className='flex  rounded-md shadow-lg relative gap-0 border py-4'>
            <img
              className='rounded-md  bottom-0 left-0 w-[140px] h-[140px] md:w-[140px] md:h-[140px] object-contain'
              src='https://prod-cdn.pharmacity.io/blog/NguoiCaoTuoi.png'
              alt=''
              loading='lazy'
            />

            <div className='flex flex-col'>
              <div class='capitalize text-base font-semibold mb-1 line-clamp-1 ps-[2px] pe-2'>
                <div class=''>Bệnh Người Cao Tuổi</div>
              </div>
              <div className='text-blue'>
                <ul className='leading-5.5 list-disc text-base font-normal'>
                  <li className=''>
                    <a href=''>Tăng huyết áp </a>{' '}
                  </li>
                  <li>Alzheimer </li>
                  <li>Tai biến mạch máu não </li>
                  <li>Bệnh tim mạch </li>
                  <li>Tai biến mạch máu não </li>
                  <li>Bệnh tim mạch </li>
                </ul>
              </div>
            </div>
          </div>

          <div div className='flex  rounded-md shadow-lg relative gap-0 border py-4'>
            <img
              className='rounded-md  bottom-0 left-0 w-[140px] h-[140px] md:w-[140px] md:h-[140px] object-contain'
              src='https://prod-cdn.pharmacity.io/blog/NguoiCaoTuoi.png'
              alt=''
              loading='lazy'
            />

            <div className='flex flex-col'>
              <div class='capitalize text-base font-semibold mb-1 line-clamp-1 ps-[2px] pe-2'>
                <div class=''>Bệnh Người Cao Tuổi</div>
              </div>
              <div className='text-blue'>
                <ul className='leading-5.5 list-disc text-base font-normal'>
                  <li className=''>
                    <a href=''>Tăng huyết áp </a>{' '}
                  </li>
                  <li>Alzheimer </li>
                  <li>Tai biến mạch máu não </li>
                  <li>Bệnh tim mạch </li>
                  <li>Tai biến mạch máu não </li>
                  <li>Bệnh tim mạch </li>
                </ul>
              </div>
            </div>
          </div>

          <div div className='flex  rounded-md shadow-lg relative gap-0 border py-4'>
            <img
              className='rounded-md  bottom-0 left-0 w-[140px] h-[140px] md:w-[140px] md:h-[140px] object-contain'
              src='https://prod-cdn.pharmacity.io/blog/NguoiCaoTuoi.png'
              alt=''
              loading='lazy'
            />

            <div className='flex flex-col'>
              <div class='capitalize text-base font-semibold mb-1 line-clamp-1 ps-[2px] pe-2'>
                <div class=''>Bệnh Người Cao Tuổi</div>
              </div>
              <div className='text-blue'>
                <ul className='leading-5.5 list-disc text-base font-normal'>
                  <li className=''>
                    <a href=''>Tăng huyết áp </a>{' '}
                  </li>
                  <li>Alzheimer </li>
                  <li>Tai biến mạch máu não </li>
                  <li>Bệnh tim mạch </li>
                  <li>Tai biến mạch máu não </li>
                  <li>Bệnh tim mạch </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='bg-neutral-100 h-3' />
    </>
  )
}
