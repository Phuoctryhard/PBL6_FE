import React from 'react'
import { Popover } from 'antd'
import Button1 from '../../../../Component/Button/Button'
import Avatar1 from '../../../../Component/Avatar/Avatar'

export default function Search() {
  const handleDrop = () => {
    console.log('s')
  }
  const profile = (
    <div className='w-full  rounded-md '>
      <div className=''>
        <ul className='space-y-3 text-black'>
          <li className='hover:bg-gray-100 0 p-2 rounded-md transition duration-300 cursor-pointer'>
            Thông tin cá nhân
          </li>
          <li className='hover:bg-gray-100 p-2 rounded-md transition duration-300 cursor-pointer'>Lịch sử đơn hàng</li>
          <li className='hover:bg-gray-100 p-2 rounded-md transition duration-300 cursor-pointer'>Mã giảm giá</li>
          <li className='hover:bg-gray-100 p-2 rounded-md transition duration-300 cursor-pointer'>
            Số địa chỉ nhận hàng
          </li>
          <li className='hover:bg-gray-100 p-2 rounded-md transition duration-300 cursor-pointer'>Đăng xuất</li>
        </ul>
      </div>
    </div>
  )

  const ShopingCart = (
    <div className=''>
      <div className='w-full  '>
        <p className='text-xl font-thin '>Sản phẩm mới thêm </p>
        <div className='flex justify-between w-full py-2 mt-3 hover:bg-gray-300'>
          <div div className='flex gap-x-1  '>
            <div className='h-20 w-20  '>
              <img
                src='data:image/jpeg;base64,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'
                alt=''
                className='object-cover h-full w-full'
              />
            </div>

            <p className='truncate overflow-hidden whitespace-nowrap w-[250px] text-base font-normal'>
              Bột đắp mặt edwfedẻwrfew4rdfewrftefvcdsfgvdsfvcsdftgrewdeqdeq
            </p>
          </div>
          <div className='text-red-500 pr-2'>9.000</div>
        </div>

        <div className='flex justify-between w-full py-2 hover:bg-gray-300'>
          <div div className='flex gap-x-1  '>
            <div className='h-20 w-20  '>
              <img
                src='data:image/jpeg;base64,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'
                alt=''
                className='object-cover h-full w-full'
              />
            </div>

            <p className='truncate overflow-hidden whitespace-nowrap w-[250px] text-base font-normal'>
              Bột đắp mặt edwfedẻwrfew4rdfewrftefvcdsfgvdsfvcsdftgrewdeqdeq
            </p>
          </div>
          <div className='text-red-500 pr-2'>9.000</div>
        </div>
      </div>
      <div className='flex justify-between items-center my-2'>
        <span>{} Thêm hàng vào giỏ </span>
        <Button1 title='Xem giỏ hàng ' type='primary' />
      </div>
    </div>
  )

  const content = (
    <div className='bg-red-700 w-full  '>
      <div className=''>
        <p> Sản phẩm m </p>
      </div>
      <div className=''></div>
    </div>
  )
  return (
    <>
      <div className='z-20 mx-auto w-full  md:pb-3 md:pt-4 bg-[#1a51a2]'>
        <div className='flex items-center md:mb-4 px-24 '>
          {' '}
          <div className='flex w-full flex-col-reverse items-start md:flex-row gap-5'>
            {' '}
            <div className=' hidden md:flex shrink-0 '>
              <img
                class='w-auto h-[63px] cursor-pointer'
                src='https://prod-cdn.pharmacity.io/e-com/images/static-website/pharmacity-logo.svg'
                alt='Pharmacity Logo'
              />
            </div>
            <div className='z-[11] grid w-full grid-cols-1 md:z-[10]'>
              <div className='w-full'>
                <div className='mx-auto w-full'>
                  <div className=' text-white flex bg-white rounded-md items-center justify-center'>
                    <button className='ml-2'>
                      <span className='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-10 text-black'>
                        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M15.5 15.4366C15.7936 15.143 16.2697 15.143 16.5634 15.4366L21.7798 20.7163C22.0734 21.01 22.0734 21.4861 21.7798 21.7797C21.4861 22.0734 21.01 22.0734 20.7164 21.7797L15.5 16.5C15.2064 16.2064 15.2064 15.7303 15.5 15.4366Z'
                            fill='currentColor'
                          ></path>
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M10.5 3.57732C6.67671 3.57732 3.57732 6.67671 3.57732 10.5C3.57732 14.3233 6.67671 17.4227 10.5 17.4227C14.3233 17.4227 17.4227 14.3233 17.4227 10.5C17.4227 6.67671 14.3233 3.57732 10.5 3.57732ZM2 10.5C2 5.80558 5.80558 2 10.5 2C15.1944 2 19 5.80558 19 10.5C19 15.1944 15.1944 19 10.5 19C5.80558 19 2 15.1944 2 10.5Z'
                            fill='currentColor'
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <input
                      className='w-full border-neutral-500  focus:ring-neutral-500 focus:border-neutral-700 outline-none p-3.5 search-input flex h-10 items-center justify-start rounded-sm border-0  py-1 pl-10 text-start text-sm font-medium text-neutral-800  truncate '
                      placeholder='Tên thuốc, triệu chứng, vitamin và thực phẩm chức năng'
                      onFocus={handleDrop}
                    />
                  </div>
                </div>
              </div>
              <div className='flex mt-[4px] space-x-3 text-white test-xs '>
                <div className='h-5'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      khẩu trang
                    </span>
                  </a>
                </div>
                <div className='h-5'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      hạ sốt
                    </span>
                  </a>
                </div>
                <div className='h-5'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      giải rượu
                    </span>
                  </a>
                </div>

                <div className='h-5'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      nhỏ mắt
                    </span>
                  </a>
                </div>

                <div className='h-5'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      collagen
                    </span>
                  </a>
                </div>
                <div className='h-5'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      chăm sóc mẹ bầu
                    </span>
                  </a>
                </div>

                <div className='lg:h-5 lg:block hidden'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      kem chống nắng
                    </span>
                  </a>
                </div>

                <div className=' lg:h-5 lg:block hidden'>
                  <a href=''>
                    <span title='khẩu trang' class='text-[14px] leading-[20px]'>
                      Mua 1 tặng 1
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className='flex relative'>
              <Popover content={content} title='Title' placement='bottomRight'>
                <button className='h-10 px-3 text-white h-10'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-7 text-white h-full'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5'
                    />
                  </svg>
                </button>
              </Popover>
              <Popover content={ShopingCart} placement='bottomRight' className='' overlayStyle={{ width: '450px' }}>
                <div className='h-10 px-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='size-7 h-10 text-white '
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                </div>
              </Popover>
              <div className='border-color-white absolute bottom-[6px] right-0 top-[6px] hidden border-l-[1px] md:inline-block'></div>
            </div>
            <div className='flex items-center'>
              <Popover content={profile} placement='bottomRight' overlayStyle={{ width: '200px' }}>
                <div className='flex items-center'>
                  <Avatar1 />
                  <div className='w-20 h-10 flex items-center justify-center ml-1'>Ngo Phuoc</div>
                </div>
              </Popover>
            </div>
          </div>
        </div>

        <div className=''></div>
      </div>
    </>
  )
}
