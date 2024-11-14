import React from 'react'
import anh1 from '../../HomeUser/Component/SliderUser/img/sanpham.jpg'
import anh2 from '../../HomeUser/Component/SliderUser/img/sanDeal.png'
import Button1 from '../../../../Component/Button/Button'
import Category from '../../HomeUser/Component/CategoryProduct/Category'
export default function ProductList() {
  return (
    <div className='bg-white'>
      <div class='bg-neutral-100 h-3'></div>
      <div className='px-24 flex flex-col'>
        <div className='flex justify-between py-4'>
          <h1 className='font-semibold line-clamp-1 text-base md:text-[20px]'>Sản phẩm bán chạy</h1>
          <a
            class='relative flex justify-center border-0 bg-transparent text-sm font-normal text-hyperLink outline-none md:hover:text-white md:text-blue'
            type='button'
            href='/collection/top-san-ban-chay-toan-quoc'
          >
            Xem thêm
          </a>
        </div>

        <div className='mb-5'>
          <div className='grid grid-cols-6 gap-x-4 '>
            <div className='rounded-lg overflow-hidden border shadow-md bg-white  h-full'>
              <div className='relative '>
                <img className='w-full object-contain h-full' src={anh1} alt='' />
                <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                  <img
                    className='h-full w-full object-contain'
                    src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                    alt='label'
                    loading='lazy'
                    width='500'
                    height='500'
                  />
                </div>
              </div>

              <div className='p-2 pb-1 font-medium'>
                <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                  Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                </h3>
              </div>

              <div className='p-2'>
                <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                <div class='mb-2 flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                  <span class='text-neutral-600'>|</span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                </div>
              </div>
            </div>
            <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
              <div className='relative'>
                <img className='w-full object-contain h-full' src={anh1} alt='' />
                <div className='absolute bottom-0 left-0 flex h-[100px] w-full'>
                  <img
                    className='h-full w-auto'
                    src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                    alt='label'
                    loading='lazy'
                    width='500'
                    height='500'
                  />
                </div>
              </div>

              <div className='p-2 pb-1 font-medium'>
                <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                  Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                </h3>
              </div>

              <div className='p-2'>
                <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                <div class='mb-2 flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                  <span class='text-neutral-600'>|</span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                </div>
              </div>
            </div>
            <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
              <div className='relative'>
                <img className='w-full object-contain h-full' src={anh1} alt='' />
                <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                  <img
                    className='h-full w-auto'
                    src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                    alt='label'
                    loading='lazy'
                    width='500'
                    height='500'
                  />
                </div>
              </div>

              <div className='p-2 pb-1 font-medium'>
                <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                  Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                </h3>
              </div>

              <div className='p-2'>
                <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                <div class='mb-2 flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                  <span class='text-neutral-600'>|</span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                </div>
              </div>
            </div>
            <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
              <div className='relative'>
                <img className='w-full object-contain h-full' src={anh1} alt='' />
                <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                  <img
                    className='h-full w-auto'
                    src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                    alt='label'
                    loading='lazy'
                    width='500'
                    height='500'
                  />
                </div>
              </div>

              <div className='p-2 pb-1 font-medium'>
                <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                  Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                </h3>
              </div>

              <div className='p-2'>
                <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                <div class='mb-2 flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                  <span class='text-neutral-600'>|</span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                </div>
              </div>
            </div>
            <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
              <div className='relative'>
                <img className='w-full object-contain h-full' src={anh1} alt='' />
                <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                  <img
                    className='h-full w-auto'
                    src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                    alt='label'
                    loading='lazy'
                    width='500'
                    height='500'
                  />
                </div>
              </div>

              <div className='p-2 pb-1 font-medium'>
                <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                  Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                </h3>
              </div>

              <div className='p-2'>
                <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                <div class='mb-2 flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                  <span class='text-neutral-600'>|</span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                </div>
              </div>
            </div>
            <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
              <div className='relative'>
                <img className='w-full object-contain h-full' src={anh1} alt='' />
                <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                  <img
                    className='h-full w-auto'
                    src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                    alt='label'
                    loading='lazy'
                    width='500'
                    height='500'
                  />
                </div>
              </div>

              <div className='p-2 pb-1 font-medium'>
                <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                  Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                </h3>
              </div>

              <div className='p-2'>
                <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                <div class='mb-2 flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                  <span class='text-neutral-600'>|</span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='bg-neutral-100 h-3'></div>
      <div className='bg-[#60e0c0]'>
        <div className='px-24 flex flex-col'>
          <div className='flex justify-between py-4 text-center bg-[#60e0c0]'>
            <h1 className='font-semibold line-clamp-1 text-base md:text-[20px]'>
              <img src={anh2} alt='' />
            </h1>
            <a
              class='relative flex justify-center border-0 bg-transparent text-base font-normal text-hyperLink outline-none md:hover:text-white md:text-blue'
              type='button'
              href='/collection/top-san-ban-chay-toan-quoc'
            >
              Xem thêm
            </a>
          </div>

          <div className='mb-5'>
            <div className='grid grid-cols-6 gap-x-4 '>
              <div className='rounded-lg overflow-hidden border shadow-md bg-white  h-full'>
                <div className='relative'>
                  <img className='w-full object-contain h-full' src={anh1} alt='' />
                  <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                    <img
                      className='h-full w-auto'
                      src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                      alt='label'
                      loading='lazy'
                      width='500'
                      height='500'
                    />
                  </div>
                </div>

                <div className='p-2 pb-1 font-medium'>
                  <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                    Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                  </h3>
                </div>

                <div className='p-2'>
                  <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                  <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                  <div class='mb-2 flex items-center py-1 text-sm'>
                    <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                        <path
                          fill='currentColor'
                          d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                        ></path>
                      </svg>
                    </span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                    <span class='text-neutral-600'>|</span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                  </div>
                  <div class='flex flex-1 flex-col justify-end'>
                    <div class='relative mt-1.5 h-[16px] overflow-hidden rounded-xl bg-red-500/50 px-2 py-[2px] text-center text-[10px] font-semibold text-white'>
                      <div class='absolute left-0 top-0 z-[1] h-full rounded-xl bg-red-500'></div>
                      <div class='absolute bottom-0 left-0 right-0 top-0 z-[2] flex items-center justify-center py-[1px] text-xs bg-red-500 w-[95%] rounded-xl'>
                        Đang bán chạy
                      </div>
                    </div>
                    <div class='flex items-end justify-center'></div>
                  </div>
                </div>
              </div>
              <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
                <div className='relative'>
                  <img className='w-full object-contain h-full' src={anh1} alt='' />
                  <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                    <img
                      className='h-full w-auto'
                      src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                      alt='label'
                      loading='lazy'
                      width='500'
                      height='500'
                    />
                  </div>
                </div>

                <div className='p-2 pb-1 font-medium'>
                  <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                    Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                  </h3>
                </div>

                <div className='p-2'>
                  <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                  <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                  <div class='mb-2 flex items-center py-1 text-sm'>
                    <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                        <path
                          fill='currentColor'
                          d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                        ></path>
                      </svg>
                    </span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                    <span class='text-neutral-600'>|</span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                  </div>
                  <div class='flex flex-1 flex-col justify-end'>
                    <div class='relative mt-1.5 h-[16px] overflow-hidden rounded-xl bg-red-500/50 px-2 py-[2px] text-center text-[10px] font-semibold text-white'>
                      <div class='absolute left-0 top-0 z-[1] h-full rounded-xl bg-red-500'></div>
                      <div class='absolute bottom-0 left-0 right-0 top-0 z-[2] flex items-center justify-center py-[1px] text-xs bg-red-500 w-[95%] rounded-xl'>
                        Đang bán chạy
                      </div>
                    </div>
                    <div class='flex items-end justify-center'></div>
                  </div>
                </div>
              </div>
              <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
                <div className='relative'>
                  <img className='w-full object-contain h-full' src={anh1} alt='' />
                  <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                    <img
                      className='h-full w-auto'
                      src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                      alt='label'
                      loading='lazy'
                      width='500'
                      height='500'
                    />
                  </div>
                </div>

                <div className='p-2 pb-1 font-medium'>
                  <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                    Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                  </h3>
                </div>

                <div className='p-2'>
                  <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                  <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                  <div class='mb-2 flex items-center py-1 text-sm'>
                    <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                        <path
                          fill='currentColor'
                          d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                        ></path>
                      </svg>
                    </span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                    <span class='text-neutral-600'>|</span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                  </div>
                </div>
              </div>
              <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
                <div className='relative'>
                  <img className='w-full object-contain h-full' src={anh1} alt='' />
                  <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                    <img
                      className='h-full w-auto'
                      src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                      alt='label'
                      loading='lazy'
                      width='500'
                      height='500'
                    />
                  </div>
                </div>

                <div className='p-2 pb-1 font-medium'>
                  <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                    Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                  </h3>
                </div>

                <div className='p-2'>
                  <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                  <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                  <div class='mb-2 flex items-center py-1 text-sm'>
                    <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                        <path
                          fill='currentColor'
                          d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                        ></path>
                      </svg>
                    </span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                    <span class='text-neutral-600'>|</span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                  </div>
                </div>
              </div>
              <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
                <div className='relative'>
                  <img className='w-full object-contain h-full' src={anh1} alt='' />
                  <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                    <img
                      className='h-full w-auto'
                      src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                      alt='label'
                      loading='lazy'
                      width='500'
                      height='500'
                    />
                  </div>
                </div>

                <div className='p-2 pb-1 font-medium'>
                  <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                    Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                  </h3>
                </div>

                <div className='p-2'>
                  <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                  <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                  <div class='mb-2 flex items-center py-1 text-sm'>
                    <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                        <path
                          fill='currentColor'
                          d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                        ></path>
                      </svg>
                    </span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                    <span class='text-neutral-600'>|</span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                  </div>
                </div>
              </div>
              <div className='rounded-lg overflow-hidden border shadow-sm bg-white  h-full'>
                <div className='relative'>
                  <img className='w-full object-contain h-full' src={anh1} alt='' />
                  <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
                    <img
                      className='h-full w-auto'
                      src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240225082630-0-mua-1-tang-1.png'
                      alt='label'
                      loading='lazy'
                      width='500'
                      height='500'
                    />
                  </div>
                </div>

                <div className='p-2 pb-1 font-medium'>
                  <h3 className='line-clamp-2 h-10 text-sm font-semibold'>
                    Viên uống cho bà bầu Blackmores Pregnancy & Breast Feeding Gold cung cấp vitamin (60 viên){' '}
                  </h3>
                </div>

                <div className='p-2'>
                  <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                  <span class='mt-[2px] block h-6 text-base font-bold text-blue'>625.000₫/Chai</span>
                  <div class='mb-2 flex items-center py-1 text-sm'>
                    <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                        <path
                          fill='currentColor'
                          d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                        ></path>
                      </svg>
                    </span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                    <span class='text-neutral-600'>|</span>{' '}
                    <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='bg-neutral-100 h-3'></div>

      

{/**/}

      <div class='bg-neutral-100 h-3' />

      <div className='px-24 flex flex-col py-4'>
        <div class=' flex items-center justify-between pt-4'>
          <h4 class='font-semibold md:font-semibold md:text-[20px] text-base'>Gốc Sức khỏe</h4>
          <a
            class='relative flex justify-center border-0 bg-transparent text-sm font-normal text-hyperLink outline-none md:hover:text-primary-600 md:text-base'
            type='button'
            href='/benh'
          >
            Xem thêm
          </a>
        </div>
        <div className='py-4 flex justify-between'>
          <Button1 title='Bài viết nổi bật' type='primary' />
          <Button1 title='Tin tức' />
          <Button1 title='Mẹ và bé' />
          <Button1 title='Dinh dưỡng' />
          <Button1 title='Sống khỏe' />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div className=''>
            <div className='overflow-hidden rounded-sm   mb-2 w-full'>
              <img
                className='h-full w-full object-cover'
                src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
                alt=''
              />
            </div>
            <div className=''>
              <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
                Tin tức
              </div>
              <p className='font-semibold my-1 text-base'>
                Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
              </p>
              <p className=' line-clamp-2 text-sm '>
                Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân tại
                xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt bởi
                nước lũ, trong khi một số nơi khác đã bắt […]
              </p>
            </div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='flex gap-2 '>
              <div className='overflow-hidden rounded-sm   mb-2 w-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
                  alt=''
                />
              </div>
              <div className=''>
                <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
                  Tin tức
                </div>
                <p className='font-semibold my-1 text-base'>
                  Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
                </p>
                <p className=' line-clamp-2 text-sm '>
                  Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
                  tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
                  bởi nước lũ, trong khi một số nơi khác đã bắt […]
                </p>
              </div>
            </div>
            <div className='flex gap-2 '>
              <div className='overflow-hidden rounded-sm   mb-2 w-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
                  alt=''
                />
              </div>
              <div className=''>
                <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
                  Tin tức
                </div>
                <p className='font-semibold my-1 text-base'>
                  Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
                </p>
                <p className=' line-clamp-2 text-sm '>
                  Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
                  tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
                  bởi nước lũ, trong khi một số nơi khác đã bắt […]
                </p>
              </div>
            </div>
            <div className='flex gap-2 '>
              <div className='overflow-hidden rounded-sm   mb-2 w-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
                  alt=''
                />
              </div>
              <div className=''>
                <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
                  Tin tức
                </div>
                <p className='font-semibold my-1 text-base'>
                  Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
                </p>
                <p className=' line-clamp-2 text-sm '>
                  Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
                  tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
                  bởi nước lũ, trong khi một số nơi khác đã bắt […]
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='flex gap-2 '>
              <div className='overflow-hidden rounded-sm   mb-2 w-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
                  alt=''
                />
              </div>
              <div className=''>
                <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
                  Tin tức
                </div>
                <p className='font-semibold my-1 text-base'>
                  Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
                </p>
                <p className=' line-clamp-2 text-sm '>
                  Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
                  tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
                  bởi nước lũ, trong khi một số nơi khác đã bắt […]
                </p>
              </div>
            </div>
            <div className='flex gap-2 '>
              <div className='overflow-hidden rounded-sm   mb-2 w-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
                  alt=''
                />
              </div>
              <div className=''>
                <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
                  Tin tức
                </div>
                <p className='font-semibold my-1 text-base'>
                  Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
                </p>
                <p className=' line-clamp-2 text-sm '>
                  Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
                  tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
                  bởi nước lũ, trong khi một số nơi khác đã bắt […]
                </p>
              </div>
            </div>
            <div className='flex gap-2 '>
              <div className='overflow-hidden rounded-sm   mb-2 w-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
                  alt=''
                />
              </div>
              <div className=''>
                <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
                  Tin tức
                </div>
                <p className='font-semibold my-1 text-base'>
                  Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
                </p>
                <p className=' line-clamp-2 text-sm '>
                  Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
                  tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
                  bởi nước lũ, trong khi một số nơi khác đã bắt […]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Category />
      <div class='bg-blue h-3' />
    </div>
  )
}
