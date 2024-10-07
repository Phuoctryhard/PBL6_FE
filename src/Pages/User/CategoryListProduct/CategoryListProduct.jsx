import React from 'react'
import { useState } from 'react'
import anh1 from './anh1.jpg'
export default function CategoryListProduct() {
  const [value, setValue] = useState('')
  return (
    <div className=''>
      <div className='px-24 grid grid-cols-12 gap-2'>
        <div className='col-span-2 flex flex-col'>
          <div className='flex justify-between px-3 py-4'>
            <p className='p-3 font-semibold'>Bộ lọc</p>
            <p className='text-blue p-3'>Thiết lập lại</p>
          </div>
          <div className='border border-l-1 opacity-65'></div>

          <div className='p-3 '>
            <p className=' font-semibold'>Khoảng giá</p>
            <div class='relative flex mt-4 '>
              <input
                min='0'
                className='w-full border text-neutral-900 rounded-lg focus:ring-neutral-500 focus:border-neutral-700 outline-none p-2.5 h-9 truncate border-neutral-700 text-base font-medium placeholder:text-neutral-700 md:text-sm pr-10'
                placeholder='Tối thiểu'
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <span class='absolute right-0 flex h-full items-center px-3'>
                <span class='text-base font-normal text-neutral-700 md:text-sm'>₫</span>
              </span>
            </div>

            <div class='relative flex mt-4'>
              <input
                min='0'
                className='w-full border text-neutral-900 rounded-lg focus:ring-neutral-500 focus:border-neutral-700 outline-none p-2.5 h-9 truncate border-neutral-700 text-base font-medium placeholder:text-neutral-700 md:text-sm pr-10'
                placeholder='Tối đa'
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <span class='absolute right-0 flex h-full items-center px-3'>
                <span class='text-base font-normal text-neutral-700 md:text-sm'>₫</span>
              </span>
            </div>

            <button
              data-size='sm'
              type='button'
              className='mt-4 relative justify-center outline-none font-semibold text-white bg-blue border-0 hover:bg-blue  text-sm px-4 py-2 h-9 items-center rounded-lg hidden md:block w-full'
            >
              <span>Áp dụng</span>
            </button>

            <div className='mt-4'>
              <input type='radio' name='' />
              <label> Dưới 100.000 đ</label>
            </div>

            <div className='mt-4'>
              <input type='radio' name='' />
              <label> 100.000 đ - 300.000 đ</label>
            </div>
          </div>
        </div>

        <div className='col-span-10 '>
          <div className='flex  px-3 py-4  gap-x-2'>
            <p className='p-3 font-medium'>Sắp xếp theo: </p>
            <button className='p-3 border border-2 rounded-lg text-[#787878] hover:text-black'>Giảm giá dần </button>
            <button className='p-3 border border-2 rounded-lg text-[#787878] hover:text-black'>Giá tăng dần </button>
          </div>

          <div className='grid grid-cols-5 px-3 py-4  gap-3'>
            <div className='border border-1 shadow-lg rounded-lg overflow-hidden'>
              <div className=' '>
                <img src={anh1} alt='' />
              </div>
              <div className='p-3'>
                <h3 class='line-clamp-2  font-semibold text-base'>AtiSalbu 2mg (30 ống x 5ml/hộp)</h3>
                <del class='block h-5 text-sm font-semibold text-neutral-600 mt-2'>115.000 đ</del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue mt-1'>20.000&nbsp;₫/Chai</span>
                <div class='flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 min-w-[16px] max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>35.2k</span>
                  <span class='text-neutral-600'>|</span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>Đã bán 7.8k</span>
                </div>
              </div>
            </div>
            <div className='border border-1 shadow-lg rounded-lg overflow-hidden'>
              <div className=' '>
                <img src={anh1} alt='' />
              </div>
              <div className='p-3'>
                <h3 class='line-clamp-2  font-semibold text-base'>AtiSalbu 2mg (30 ống x 5ml/hộp)</h3>
                <del class='block h-5 text-sm font-semibold text-neutral-600 mt-2'>115.000 đ</del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue mt-1'>20.000&nbsp;₫/Chai</span>
                <div class='flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 min-w-[16px] max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>35.2k</span>
                  <span class='text-neutral-600'>|</span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>Đã bán 7.8k</span>
                </div>
              </div>
            </div>
            <div className='border border-1 shadow-lg rounded-lg overflow-hidden'>
              <div className=' '>
                <img src={anh1} alt='' />
              </div>
              <div className='p-3'>
                <h3 class='line-clamp-2  font-semibold text-base'>AtiSalbu 2mg (30 ống x 5ml/hộp)</h3>
                <del class='block h-5 text-sm font-semibold text-neutral-600 mt-2'>115.000 đ</del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue mt-1'>20.000&nbsp;₫/Chai</span>
                <div class='flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 min-w-[16px] max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>35.2k</span>
                  <span class='text-neutral-600'>|</span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>Đã bán 7.8k</span>
                </div>
              </div>
            </div>
            <div className='border border-1 shadow-lg rounded-lg overflow-hidden'>
              <div className=' '>
                <img src={anh1} alt='' />
              </div>
              <div className='p-3'>
                <h3 class='line-clamp-2  font-semibold text-base'>AtiSalbu 2mg (30 ống x 5ml/hộp)</h3>
                <del class='block h-5 text-sm font-semibold text-neutral-600 mt-2'>115.000 đ</del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue mt-1'>20.000&nbsp;₫/Chai</span>
                <div class='flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 min-w-[16px] max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>35.2k</span>
                  <span class='text-neutral-600'>|</span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>Đã bán 7.8k</span>
                </div>
              </div>
            </div>
            <div className='border border-1 shadow-lg rounded-lg overflow-hidden'>
              <div className=' '>
                <img src={anh1} alt='' />
              </div>
              <div className='p-3'>
                <h3 class='line-clamp-2  font-semibold text-base'>AtiSalbu 2mg (30 ống x 5ml/hộp)</h3>
                <del class='block h-5 text-sm font-semibold text-neutral-600 mt-2'>115.000 đ</del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue mt-1'>20.000&nbsp;₫/Chai</span>
                <div class='flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 min-w-[16px] max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>35.2k</span>
                  <span class='text-neutral-600'>|</span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>Đã bán 7.8k</span>
                </div>
              </div>
            </div>
            <div className='border border-1 shadow-lg rounded-lg overflow-hidden'>
              <div className=' '>
                <img src={anh1} alt='' />
              </div>
              <div className='p-3'>
                <h3 class='line-clamp-2  font-semibold text-base'>AtiSalbu 2mg (30 ống x 5ml/hộp)</h3>
                <del class='block h-5 text-sm font-semibold text-neutral-600 mt-2'>115.000 đ</del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue mt-1'>20.000&nbsp;₫/Chai</span>
                <div class='flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 min-w-[16px] max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>35.2k</span>
                  <span class='text-neutral-600'>|</span>
                  <span class='text-[16px] leading-[20px] mx-1 font-medium mt-1'>Đã bán 7.8k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
