import React from 'react'

export default function DetailProduct() {
  return (
    <div className='px-24'>
      <div class='hidden bg-neutral-100 md:block  mb-4'>
        <div class='container '>
          <div>
            <ul class='flex items-center py-1.5 text-neutral-600'>
              <li class='h-5 text-sm'>
                <span class='hover:text-neutral-800 mx-1 font-normal text-[12px] leading-5'>
                  <a href='/'>Trang chủ</a>
                </span>
                <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full h-3 w-3 text-neutral-800'>
                  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.2137 11.2862L8.21971 2.29524C7.82506 1.90159 7.18567 1.90159 6.79002 2.29524C6.39537 2.68889 6.39537 3.32829 6.79002 3.72194L15.0706 11.9995L6.79102 20.2771C6.39637 20.6707 6.39637 21.3101 6.79102 21.7048C7.18567 22.0984 7.82606 22.0984 8.22071 21.7048L17.2147 12.7139C17.6032 12.3243 17.6032 11.6749 17.2137 11.2862Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </span>
              </li>
              <li class='h-5 text-sm'>
                <span class='hover:text-neutral-800 mx-1 font-normal text-[12px] leading-5'>
                  <a href='/cham-soc-sac-dep'>Chăm sóc sắc đẹp</a>
                </span>
                <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full h-3 w-3 text-neutral-800'>
                  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.2137 11.2862L8.21971 2.29524C7.82506 1.90159 7.18567 1.90159 6.79002 2.29524C6.39537 2.68889 6.39537 3.32829 6.79002 3.72194L15.0706 11.9995L6.79102 20.2771C6.39637 20.6707 6.39637 21.3101 6.79102 21.7048C7.18567 22.0984 7.82606 22.0984 8.22071 21.7048L17.2147 12.7139C17.6032 12.3243 17.6032 11.6749 17.2137 11.2862Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </span>
              </li>
              <li class='h-5 text-sm'>
                <span class='hover:text-neutral-800 mx-1 font-normal text-[12px] leading-5'>
                  <a href='/san-pham-chong-nang'>Sản phẩm chống nắng</a>
                </span>
                <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full h-3 w-3 text-neutral-800'>
                  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.2137 11.2862L8.21971 2.29524C7.82506 1.90159 7.18567 1.90159 6.79002 2.29524C6.39537 2.68889 6.39537 3.32829 6.79002 3.72194L15.0706 11.9995L6.79102 20.2771C6.39637 20.6707 6.39637 21.3101 6.79102 21.7048C7.18567 22.0984 7.82606 22.0984 8.22071 21.7048L17.2147 12.7139C17.6032 12.3243 17.6032 11.6749 17.2137 11.2862Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </span>
              </li>
              <li class='h-5 text-sm'>
                <span class='hover:text-neutral-800 mx-1 font-normal text-[12px] leading-5 text-neutral-900'>
                  Kem chống nắng dành cho mặt
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='bg-red-500 grid grid-cols-12'>
        <div className='col-span-9 grid grid-cols-4 gap-4 ml-4'>
          <div className='col-span-2 '>
            <div className='sticky top-0'>
              <div className=''>
                <img src='	https://prod-cdn.pharmacity.io/e-com/images/ecommerce/1000x1000/P22255.png' alt='' />
              </div>
              <div class='hidden bg-blue px-2 py-0.5 text-center text-xs font-medium text-white md:block'>
                Sản phẩm 100% chính hãng, mẫu mã có thể thay đổi theo lô hàng
              </div>

              <div className='mt-2 flex gap-2 '>
                <img
                  className='w-[100px] h-[100px]'
                  src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/500x500/P22255_3.png'
                  alt='Gel URGO ECZEKALM hỗ trợ giảm các triệu chứng viêm da và khô da (Tuýp 50ml)'
                  loading='lazy'
                />
                <img
                  className='w-[100px] h-[100px]'
                  src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/500x500/P22255_3.png'
                  alt='Gel URGO ECZEKALM hỗ trợ giảm các triệu chứng viêm da và khô da (Tuýp 50ml)'
                  loading='lazy'
                />
              </div>
            </div>
          </div>
          <div className='bg-white col-span-2'>
            <div class='relative grid grid-flow-col justify-between bg-center bg-[image:var(--url-bg)] bg-cover bg-no-repeat h-[calc(62rem/16)] px-4 md:h-[calc(39rem/16)] md:p-2'>
              <div class='grid items-center justify-between gap-1 md:grid-flow-col md:grid-cols-[calc(93rem/16),1fr]'>
                <div class='relative mt-2.5 h-[calc(23rem/16)] w-[calc(104rem/16)] md:mt-0 md:h-[calc(23rem/16)] md:w-[calc(93rem/16)]'>
                  <img
                    class='max-h-full w-full object-cover'
                    src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240325034338-0-Flashsale.png'
                    alt='FLash sale icon'
                    loading='lazy'
                    sizes='(max-width: 768px) 9rem, 9rem'
                  />
                </div>
                <div class='relative min-w-[30px] overflow-hidden rounded-xl px-2 py-[2px] text-center text-[10px] font-semibold bg-white/50 h-[6px] mb-3 w-[calc(127rem/16)] md:mb-0 md:w-[calc(96rem/16)]'>
                  <div class='absolute left-0 top-0 z-[1] h-full rounded-xl bg-white'></div>
                </div>
              </div>
              <div class='grid content-start items-center justify-items-end gap-[3px] pt-[calc(7rem/16)] md:grid-flow-col md:justify-start md:gap-2 md:pt-0'>
                <p class='text-xs leading-5 text-[var(--color)] min-[768px]:block min-[1024px]:hidden min-[1200px]:block'>
                  Kết thúc trong
                </p>
                <span class='flex items-center'>
                  <span
                    data-len='2'
                    class='inline-block min-w-[24px] h-6 bg-neutral-50 text-red-500 rounded-sm py-[2px] px-1 mx-[2px] text-sm md:font-bold text-center w-[26px] data-[len="3"]:w-[36px] md:h-6 md:text-sm md:data-[len="3"]:w-[36px]'
                  >
                    24
                  </span>
                  <span class='text-neutral-50 text-sm md:text-sm'>:</span>
                  <span class='inline-block min-w-[24px] h-6 bg-neutral-50 text-red-500 rounded-sm py-[2px] px-1 mx-[2px] text-sm md:font-bold text-center w-[26px] data-[len="3"]:w-[36px] md:h-6 md:text-sm md:data-[len="3"]:w-[36px]'>
                    55
                  </span>
                  <span class='text-neutral-50 text-sm md:text-sm'>:</span>
                  <span class='inline-block min-w-[24px] h-6 bg-neutral-50 text-red-500 rounded-sm py-[2px] px-1 mx-[2px] text-sm md:font-bold text-center w-[26px] data-[len="3"]:w-[36px] md:h-6 md:text-sm md:data-[len="3"]:w-[36px]'>
                    35
                  </span>
                </span>
              </div>
            </div>
            <h1
              title='Gel URGO ECZEKALM hỗ trợ giảm các triệu chứng viêm da và khô da (Tuýp 50ml)'
              class='line-clamp-3 text-base font-semibold text-neutral-900 md:text-xl md:font-bold'
            >
              Gel URGO ECZEKALM hỗ trợ giảm các triệu chứng viêm da và khô da (Tuýp 50ml)
            </h1>
            <div class='flex items-center justify-between mb-3 md:mb-4'>
              <div class='flex content-start items-center space-x-1 py-[calc(2rem/16)]'>
                <p class='text-sm leading-5 text-neutral-600'>P22255</p>
                <span class='h-1 w-1 rounded-full bg-neutral-600'></span>
                <a class='text-sm leading-5 text-primary-500' href='/thuong-hieu/urgo'>
                  Thương hiệu: Urgo
                </a>
              </div>
            </div>

            <div class='flex flex-col flex-wrap items-start justify-start animate-in md:flex-row md:items-center mb-1.5 md:mb-1'>
              <h3 class='text-[28px] leading-[36px] order-2 shrink-0 whitespace-nowrap pt-1 font-bold text-primary-500 md:order-1 md:me-4 md:pt-0'>
                272.700&nbsp;₫/Hộp
              </h3>
              <div class='order-1 flex items-center justify-start md:order-2'>
                <p class='relative order-2 whitespace-nowrap text-base font-semibold text-neutral-600 md:order-1 md:me-2  md:text-xl'>
                  303.000&nbsp;₫
                  <span class='absolute inset-x-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-neutral-600'></span>
                </p>
                <span class='order-1 me-2 rounded-sm bg-pink px-1 text-xs font-medium leading-5 text-white md:order-2 md:me-0'>
                  -10%
                </span>
              </div>
            </div>

            <p class='text-[12px] leading-[20px] font-normal text-neutral-700 md:text-sm mb-1.5 md:mb-1'>
              Giá đã bao gồm thuế. Phí vận chuyển và các chi phí khác (nếu có) sẽ được thể hiện khi đặt hàng.
            </p>

            <div class='flex items-center justify-start space-x-1 md:space-x-2 mb-3 md:mb-1'>
              <span class='text-xs font-semibold text-gold-500 md:text-sm'>Tích lũy từ 2.727 P-Xu vàng</span>
              <div class='[&amp;>[data-radix-popper-content-wrapper]]:!z-[9]'>
                <div data-state='closed'>
                  <button
                    data-size='sm'
                    type='button'
                    class='relative flex justify-center outline-none font-semibold focus:ring-primary-300 text-sm bg-transparent data-[size=sm]:text-sm text-inherit border-0 hover:bg-0 hover:text-primary-500 focus:text-primary-500 h-3 p-0 md:h-4'
                  >
                    <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full h-3 w-3 items-center text-neutral-700 md:h-4 md:w-4'>
                      <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M12.5 2.5C7 2.5 2.5 7 2.5 12.5C2.5 18 7 22.5 12.5 22.5C18 22.5 22.5 18 22.5 12.5C22.5 7 18 2.5 12.5 2.5ZM12.5 18.75C11.81 18.75 11.25 18.19 11.25 17.5C11.25 16.81 11.81 16.25 12.5 16.25C13.19 16.25 13.75 16.81 13.75 17.5C13.75 18.19 13.19 18.75 12.5 18.75ZM14.5288 12.615C13.9075 13.1488 13.75 13.3287 13.75 13.75C13.75 14.4412 13.19 15 12.5 15C11.81 15 11.25 14.4412 11.25 13.75C11.25 12.1325 12.2437 11.28 12.9025 10.7162C13.5237 10.185 13.6812 10.0037 13.6812 9.58375C13.6812 9.355 13.6813 8.75 12.5013 8.75C11.9563 8.78 11.375 9.03 10.9288 9.45125C10.4275 9.92375 9.635 9.9 9.16125 9.4C8.6875 8.8975 8.71 8.10625 9.2125 7.6325C10.09 6.80625 11.2337 6.315 12.4362 6.2525H12.44C14.705 6.2525 16.1812 7.59125 16.1812 9.585C16.1812 11.2013 15.1875 12.0538 14.53 12.6163L14.5288 12.615Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div class='flex content-center justify-between mb-3 md:mb-4'>
              <div class='flex items-center justify-start space-x-1 '>
                <div class='flex items-center justify-start'>
                  <div class='h-6 w-6 '>
                    <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-4 h-4 text-neutral-700'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                        <path
                          fill='currentColor'
                          d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div class='flex items-center justify-start space-x-1 text-sm'>
                    <p class='text-neutral-900'>29.2k</p>
                  </div>
                </div>
                <span class='h-[12px] w-[1px] bg-neutral-500'></span>
                <p class='text-sm text-neutral-900'>Đã bán 6.0k</p>
              </div>
            </div>

            <div class='mb-3 md:mb-4'>
              <div class='space-y-3'>
                <label
                  class='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-fit text-sm font-semibold text-neutral-900'
                  for=':r8s:-form-item'
                >
                  Phân loại sản phẩm
                </label>
                <div
                  class='flex flex-wrap gap-2'
                  id=':r8s:-form-item'
                  aria-describedby=':r8s:-form-item-description'
                  aria-invalid='false'
                >
                  <button
                    data-size='sm'
                    type='button'
                    class='relative flex justify-center outline-none font-semibold bg-white border border-solid border-primary-500 text-primary-500 disabled:border-neutral-200 disabled:text-neutral-600 disabled:!bg-white text-sm px-4 py-2 items-center rounded-lg h-8 min-w-[82px] md:h-8 !bg-primary-50 hover:border-primary-500 hover:text-primary-500 md:hover:border-primary-200 md:hover:text-primary-200'
                  >
                    <span>Hộp</span>
                  </button>
                </div>
              </div>
            </div>

            <div class='gap-3 md:gap-4 mb-3 grid md:mb-4'>
              <div class='bg-divider h-[1px] -mx-4 md:mx-0'></div>
              <div class='grid gap-3 md:gap-2'>
                <div class='grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,291px]'>
                  <p class='text-[14px] leading-[20px] font-semibold md:text-base'>Tên sản phẩm</p>
                  <div class='[&amp;_a:not(.ignore-css_a)]:text-hyperLink md:text-base'>
                    Sản phẩm hỗ trợ điều trị viêm da và chứng khô da Eczekalm
                  </div>
                </div>
                <div class='grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,291px]'>
                  <p class='text-[14px] leading-[20px] font-semibold md:text-base'>Danh mục</p>
                  <div class='[&amp;_a:not(.ignore-css_a)]:text-hyperLink md:text-base'>Thiết bị y tế</div>
                </div>
                <div class='grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,291px]'>
                  <p class='text-[14px] leading-[20px] font-semibold md:text-base'>Công dụng</p>
                  <div class='[&amp;_a:not(.ignore-css_a)]:text-hyperLink md:text-base'>
                    <p>Chất hỗ trợ trong trường hợp viêm da cơ địa (cấp tính và mãn tính)</p>
                  </div>
                </div>
                <div class='grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,291px]'>
                  <p class='text-[14px] leading-[20px] font-semibold md:text-base'>Nhà sản xuất</p>
                  <div class='[&amp;_a:not(.ignore-css_a)]:text-hyperLink md:text-base'>ALMA S.r.l</div>
                </div>
                <div class='grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,291px]'>
                  <p class='text-[14px] leading-[20px] font-semibold md:text-base'>Quy cách</p>
                  <div class='[&amp;_a:not(.ignore-css_a)]:text-hyperLink md:text-base'>Hộp 1 tuýp x 50ml</div>
                </div>
                <div class='grid grid-cols-1 gap-1.5 md:grid-cols-[1fr,291px]'>
                  <p class='text-[14px] leading-[20px] font-semibold md:text-base'>Lưu ý</p>
                  <div class='[&amp;_a:not(.ignore-css_a)]:text-hyperLink md:text-base'>
                    Không sử dụng sau ngày hết hạn. Không sử dụng nếu bao bì mở hoặc bị hỏng, Tránh xa tầm tay trẻ em.
                    Tránh tiếp xúc với mắt và màng nhầy. Không nuốt sản phẩm
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-4 bg-white'>
            <div class='swiper-wrapper flex'>
              <div class='swiper-slide mr-2 !w-fit last:mr-0 md:mr-6 swiper-slide-active'>
                <div class='p-0'>
                  <div
                    color='primary'
                    class='px-2 py-3 text-base font-semibold md:px-0 border-b-2 border-primary-500 text-primary-500 disabled:border-neutral-800 disabled:!bg-white disabled:text-neutral-700'
                  >
                    <span>Mô tả</span>
                  </div>
                </div>
              </div>
              <div class='swiper-slide mr-2 !w-fit last:mr-0 md:mr-6 swiper-slide-next'>
                <div class='p-0'>
                  <div color='ghost' class='px-2 py-3 text-base font-semibold md:px-0'>
                    <span>Thành phần</span>
                  </div>
                </div>
              </div>
              <div class='swiper-slide mr-2 !w-fit last:mr-0 md:mr-6'>
                <div class='p-0'>
                  <div color='ghost' class='px-2 py-3 text-base font-semibold md:px-0'>
                    <span>Công dụng</span>
                  </div>
                </div>
              </div>
              <div class='swiper-slide mr-2 !w-fit last:mr-0 md:mr-6'>
                <div class='p-0'>
                  <div color='ghost' class='px-2 py-3 text-base font-semibold md:px-0'>
                    <span>Cách sử dụng</span>
                  </div>
                </div>
              </div>
              <div class='swiper-slide mr-2 !w-fit last:mr-0 md:mr-6'>
                <div class='p-0'>
                  <div color='ghost' class='px-2 py-3 text-base font-semibold md:px-0'>
                    <span>Lưu ý sản phẩm</span>
                  </div>
                </div>
              </div>
              <div class='swiper-slide mr-2 !w-fit last:mr-0 md:mr-6'>
                <div class='p-0'>
                  <div color='ghost' class='px-2 py-3 text-base font-semibold md:px-0'>
                    <span>Thông tin sản xuất</span>
                  </div>
                </div>
              </div>
            </div>

            <div class='md:h-auto md:max-h-[inherit]'>
              <div data-state='closed' class='group'>
                <div
                  data-state='closed'
                  id='radix-:Rr79jsrtslafja:'
                  class='overflow-hidden transition-all data-[state=closed]:block data-[state=closed]:max-h-[120px] md:data-[state=closed]:max-h-none'
                >
                  <div class='grid px-4 md:px-0 md:pb-2'>
                    <div id='mo-ta'>
                      <div class='pmc-content-html [&amp;_a:not(.ignore-css_a)]:text-hyperLink max-w-[calc(100vw-32px)] overflow-auto md:w-[calc(var(--width-container)-312px-48px)] md:max-w-none'>
                        <h3>Mô tả</h3>
                        <p>
                          Sản phẩm tập trung vào tác dụng bảo vệ và dưỡng ẩm nhờ các thành phần axit hyaluronic và hợp
                          chất Ceramides được cấp bằng sáng chế. Sản phẩm giúp tái tạo cấu trúc của lớp bảo vệ da và
                          phục hồi màng hydrolipid, ngăn ngừa rối loạn lớp bảo vệ da và đảm bảo mức hydrat hóa sinh lý.
                          Nhờ tác dụng bảo vệ Urgo Eczekalm làm dịu ngứa, rát, ban đỏ và phát ban trên da. Sản phẩm giúp
                          bảo vệ da khỏi sự xâm nhập của các tác nhân bên ngoài và giảm các triệu chứng của tình trạng
                          viêm da.
                        </p>
                      </div>
                    </div>
                    <div id='thanh-phan'>
                      <div class='pmc-content-html [&amp;_a:not(.ignore-css_a)]:text-hyperLink max-w-[calc(100vw-32px)] overflow-auto md:w-[calc(var(--width-container)-312px-48px)] md:max-w-none'>
                        <h3>Thành phần</h3>
                        <p>Axit hyaluronic, hợp chất Ceramides, Trehalose và Lecithin được cấp bằng sáng chế&nbsp;</p>
                      </div>
                    </div>
                    <div id='cong-dung'>
                      <div class='pmc-content-html [&amp;_a:not(.ignore-css_a)]:text-hyperLink max-w-[calc(100vw-32px)] overflow-auto md:w-[calc(var(--width-container)-312px-48px)] md:max-w-none'>
                        <h3>Công dụng</h3>
                        <p>
                          Chỉ định như chất hỗ trợ trong trường hợp viêm da cơ địa (cấp tính và mãn tính), bệnh da khô,
                          chàm, viêm da tiếp xúc (viêm da kích ứng, viêm da dị ứng), tăng sừng hóa. Chỉ định sử dụng
                          trong trường hợp mất tính toàn vẹn của lớp biểu bì liên quan đến da khô, phản ứng nhanh, không
                          dung nạp và nhạy cảm.
                        </p>
                      </div>
                    </div>
                    <div id='cach-su-dung'>
                      <div class='pmc-content-html [&amp;_a:not(.ignore-css_a)]:text-hyperLink max-w-[calc(100vw-32px)] overflow-auto md:w-[calc(var(--width-container)-312px-48px)] md:max-w-none'>
                        <h3>Cách sử dụng</h3>
                        <p>
                          Thoa một lớp mỏng lên vùng da bị tổn thương và mát xa nhẹ nhàng cho đến khi sản phẩm được hấp
                          thu hoàn toàn.
                        </p>
                        <p>Sử dụng 2 lần mỗi ngày trong 4 tuần trên vùng da sạch.</p>
                        <h3>Đối tượng sử dụng</h3>
                        <p>Người lớn, trẻ em và người cao tuổi</p>
                      </div>
                    </div>
                    <div id='luu-y-san-pham'>
                      <div class='pmc-content-html [&amp;_a:not(.ignore-css_a)]:text-hyperLink max-w-[calc(100vw-32px)] overflow-auto md:w-[calc(var(--width-container)-312px-48px)] md:max-w-none'>
                        <h3>Lưu ý</h3>
                        <p>
                          <strong>Cảnh báo:</strong> Không sử dụng sau ngày hết hạn. Không sử dụng nếu bao bì mở hoặc bị
                          hỏng, Tránh xa tầm tay trẻ em. Tránh tiếp xúc với mắt và màng nhầy. Không nuốt sản phẩm. Bảo
                          quản ở nơi khô ráo và thoáng mát, tránh xa nguồn nhiệt và ánh sáng trực tiếp. Không sử dụng
                          trong khi phơi nắng. Không thoa ở vùng mắt và viền mắt. Trong trường hợp vô tình tiếp xúc, lập
                          tức rửa sạch với nhiều nước. Rửa tay sạch sẽ trước khi sử dụng, đóng chặt nắp sau khi sử dụng.
                          Không sử dụng sản phẩm bừa bãi. Sử dụng ngoài da.
                        </p>
                        <p>
                          <strong>
                            Không có chống chỉ định hoặc tác dụng phụ đã biết nào khi sử dụng sản phẩm này:
                          </strong>
                          &nbsp;Khuyến cáo không sử dụng sản phẩm này trong trường hợp nhạy cảm hoặc dị ứng với bất kỳ
                          thành phần nào của sản phẩm. Nếu dị ứng da hoặc có phản ứng xảy ra, dừng sử dụng sản phẩm. Nếu
                          các triệu chứng trở nên tồi tệ hơn hoặc kéo dài sau vài ngày sử dụng, tham khảo ý kiến của bác
                          sĩ hoặc dược sĩ.
                        </p>
                      </div>
                    </div>
                    <div id='thong-tin-san-xuat'>
                      <div class='pmc-content-html [&amp;_a:not(.ignore-css_a)]:text-hyperLink max-w-[calc(100vw-32px)] overflow-auto md:w-[calc(var(--width-container)-312px-48px)] md:max-w-none'>
                        <h3>Thông tin sản xuất</h3>
                        <p>
                          <strong>Bảo quản: </strong>Bảo quản ở nhiệt độ phòng (15 - 25 độ C)
                        </p>
                        <p>
                          <strong>Nơi sản xuất:</strong> Ý
                        </p>
                        <p>
                          <strong>Số đăng ký: </strong>210000666/PCBA-HCM
                        </p>
                        <p>
                          <strong>Nhà phân phối:</strong> Công ty TNHH Dược Kim Đô
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='relative mb-1 flex items-center justify-center p-0 md:hidden'>
                  <div class='absolute inset-x-0 bottom-full bg-gradient-to-b from-black/0 to-[#FFF_78.91%] group-data-[state=closed]:block group-data-[state=open]:hidden h-12 md:hidden'></div>
                  <button
                    class='relative justify-center border-0 bg-transparent text-sm font-normal text-hyperLink outline-none md:hover:text-primary-600 md:text-base hidden'
                    type='button'
                    aria-controls='radix-:Rr79jsrtslafja:'
                    aria-expanded='false'
                    data-state='closed'
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-3 bg-white ml-2 '>
          <div className='sticky top-0'>
            <div class='flex cursor-pointer items-center justify-between'>
              <p class='text-base font-semibold text-neutral-900 md:text-sm'>Nhà thuốc còn hàng</p>
              <button
                data-size='sm'
                type='button'
                class='relative flex justify-center outline-none font-semibold focus:ring-primary-300 text-sm bg-transparent data-[size=sm]:text-sm text-inherit border-0 hover:bg-0 hover:text-primary-500 focus:text-primary-500 h-3 p-0'
              >
                <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full h-3 w-3'>
                  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.2137 11.2862L8.21971 2.29524C7.82506 1.90159 7.18567 1.90159 6.79002 2.29524C6.39537 2.68889 6.39537 3.32829 6.79002 3.72194L15.0706 11.9995L6.79102 20.2771C6.39637 20.6707 6.39637 21.3101 6.79102 21.7048C7.18567 22.0984 7.82606 22.0984 8.22071 21.7048L17.2147 12.7139C17.6032 12.3243 17.6032 11.6749 17.2137 11.2862Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </span>
              </button>
            </div>

            <p class='text-sm font-semibold text-neutral-900'>Số lượng</p>

            <div class='mt-2 grid grid-cols-3 gap-2'>
              <div class='flex items-center gap-2 text-center md:inline md:gap-0'>
                <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-6'>
                  <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clip-path='url(#clip0_691_964)'>
                      <path d='M5.07812 6.01562H12.1094V9.53125H5.07812V6.01562Z' fill='#C3DAFD'></path>
                      <path d='M8.59375 6.01562H12.1094V9.53125H8.59375V6.01562Z' fill='#A1B8D8'></path>
                      <path d='M2.73438 8.35938H14.4531V22.5H2.73438V8.35938Z' fill='#E4F3FF'></path>
                      <path d='M8.59375 8.35938H14.4531V22.5H8.59375V8.35938Z' fill='#E4F3FF'></path>
                      <path d='M3.90625 2.5H13.2812V7.1875H3.90625V2.5Z' fill='#457899'></path>
                      <path d='M8.59375 2.5H13.2812V7.1875H8.59375V2.5Z' fill='#365C75'></path>
                      <path d='M2.73438 10.9375H14.4531V19.9219H2.73438V10.9375Z' fill='#9FC48F'></path>
                      <path d='M8.59375 10.9375H14.4531V19.9219H8.59375V10.9375Z' fill='#5EAB46'></path>
                      <path d='M9.76562 2.5H10.9375V4.82789H9.76562V2.5Z' fill='#274254'></path>
                      <path d='M6.25 2.5H7.42188V4.82789H6.25V2.5Z' fill='#365C75'></path>
                      <path
                        d='M10.7422 14.8438H9.17969V13.2812H8.00781V14.8438H6.44531V16.0156H8.00781V17.5781H9.17969V16.0156H10.7422V14.8438Z'
                        fill='#E4F3FF'
                      ></path>
                      <path
                        d='M9.17969 14.8438V13.2812H8.59375V17.5781H9.17969V16.0156H10.7422V14.8438H9.17969Z'
                        fill='#C3DAFD'
                      ></path>
                      <path
                        d='M20.1172 21.6406H15.4297C14.245 21.6406 13.2812 20.6768 13.2812 19.4922C13.2812 18.3075 14.245 17.3438 15.4297 17.3438H20.1172C21.3018 17.3438 22.2656 18.3075 22.2656 19.4922C22.2656 20.6768 21.3018 21.6406 20.1172 21.6406Z'
                        fill='#E4F3FF'
                      ></path>
                      <path
                        d='M15.4297 21.6406H20.1172C21.3018 21.6406 22.2656 20.6768 22.2656 19.4922H13.2812C13.2812 20.6768 14.245 21.6406 15.4297 21.6406Z'
                        fill='#C3DAFD'
                      ></path>
                      <path
                        d='M20.1172 17.3438H17.7734V21.6406H20.1172C21.3018 21.6406 22.2656 20.6768 22.2656 19.4922C22.2656 18.3075 21.3018 17.3438 20.1172 17.3438Z'
                        fill='#9FC48F'
                      ></path>
                      <path
                        d='M17.7734 21.6406H20.1172C21.3018 21.6406 22.2656 20.6768 22.2656 19.4922H17.7734V21.6406Z'
                        fill='#5EAB46'
                      ></path>
                      <path
                        d='M20.2635 12.5347L16.949 15.8493C16.1113 16.687 14.7483 16.687 13.9106 15.8493C13.0729 15.0116 13.0729 13.6486 13.9106 12.811L17.2252 9.49641C18.0629 8.65875 19.4258 8.65875 20.2635 9.49641C21.1011 10.3341 21.1011 11.697 20.2635 12.5347Z'
                        fill='#E4F3FF'
                      ></path>
                      <path
                        d='M16.9489 15.8493L20.2635 12.5347C21.1011 11.697 21.1011 10.334 20.2635 9.49634L13.9105 15.8493C14.7482 16.687 16.1112 16.687 16.9489 15.8493Z'
                        fill='#C3DAFD'
                      ></path>
                      <path
                        d='M17.2251 9.49641L15.5679 11.1537L18.6062 14.192L20.2635 12.5347C21.1012 11.6971 21.1012 10.3341 20.2635 9.49641C19.4258 8.65875 18.0628 8.65875 17.2251 9.49641Z'
                        fill='#6DC0E3'
                      ></path>
                      <path
                        d='M18.6062 14.192L20.2635 12.5347C21.1011 11.697 21.1011 10.334 20.2635 9.49634L17.087 12.6728L18.6062 14.192Z'
                        fill='#0072BC'
                      ></path>
                    </g>
                    <defs>
                      <clipPath id='clip0_691_964'>
                        <rect width='20' height='20' fill='white' transform='translate(2.5 2.5)'></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span class='text-[14px] leading-[20px] block text-start font-medium md:text-center'>
                  Đủ thuốc chuẩn
                </span>
              </div>
              <div class='flex items-center gap-2 text-center md:inline md:gap-0'>
                <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-6'>
                  <svg viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M19.715 8.36478L19.3931 8.54072L4.18738 8.57921L4 8.36478L5.89442 5.09595C5.92883 5.03656 5.99227 5 6.0609 5H17.7283C17.7981 5 17.8625 5.03781 17.8964 5.0988L19.715 8.36478Z'
                      fill='#A1B8D8'
                    ></path>
                    <path
                      d='M19.5264 19.7973H4.18858C4.08444 19.7973 4 19.7129 4 19.6087V8.36475H19.715V19.6087C19.715 19.7129 19.6305 19.7973 19.5264 19.7973Z'
                      fill='#E4F3FF'
                    ></path>
                    <path
                      d='M17.4068 8.36475V10.2719C17.4068 15.1262 13.4716 19.0615 8.61726 19.0615H4V19.6087C4 19.7129 4.08444 19.7973 4.18858 19.7973H19.5264C19.6305 19.7973 19.715 19.7129 19.715 19.6087V8.36475H17.4068Z'
                      fill='#C3DAFD'
                    ></path>
                    <path
                      d='M17.7284 5H15.5326L17.4061 8.36475H19.715L17.8965 5.0988C17.8626 5.03781 17.7982 5 17.7284 5Z'
                      fill='#8CA4D0'
                    ></path>
                    <path d='M13.4061 8.36475H10.309L10.6933 5H13.0368L13.4061 8.36475Z' fill='#0072BC'></path>
                    <path
                      d='M13.1746 11.4619H10.5404C10.4126 11.4619 10.309 11.3582 10.309 11.2304V8.36475H13.4061V11.2304C13.4061 11.3582 13.3025 11.4619 13.1746 11.4619Z'
                      fill='#6DC0E3'
                    ></path>
                    <path
                      d='M8.73025 18.2429H5.68873C5.58189 18.2429 5.49524 18.1563 5.49524 18.0495V15.4262C5.49524 15.3193 5.58186 15.2327 5.68873 15.2327H8.73025C8.8371 15.2327 8.92374 15.3193 8.92374 15.4262V18.0495C8.92371 18.1563 8.8371 18.2429 8.73025 18.2429Z'
                      fill='#6DC0E3'
                    ></path>
                    <path
                      d='M8.72278 10.0827H5.49531C5.35867 10.0827 5.24792 9.97189 5.24792 9.83528C5.24792 9.69866 5.35867 9.58789 5.49531 9.58789H8.72278C8.85942 9.58789 8.97016 9.69866 8.97016 9.83528C8.97016 9.97193 8.85942 10.0827 8.72278 10.0827Z'
                      fill='#9FC48F'
                    ></path>
                    <path
                      d='M7.6448 11.1464H5.49519C5.35854 11.1464 5.2478 11.0356 5.2478 10.899C5.2478 10.7624 5.35854 10.6516 5.49519 10.6516H7.6448C7.78144 10.6516 7.89218 10.7624 7.89218 10.899C7.89218 11.0356 7.78144 11.1464 7.6448 11.1464Z'
                      fill='#9FC48F'
                    ></path>
                    <circle cx='18.5' cy='18.5' r='5.5' fill='#5EAB46'></circle>
                    <path
                      d='M20.8441 21.9532C20.9387 22.1227 20.878 22.3368 20.7085 22.4315C20.5978 22.4933 20.4833 22.551 20.3679 22.6031C20.3209 22.6243 20.2718 22.6344 20.2234 22.6344C20.0894 22.6344 19.9615 22.5574 19.9028 22.4274C19.8229 22.2505 19.9015 22.0422 20.0785 21.9623C20.1757 21.9184 20.2724 21.8697 20.3657 21.8176C20.5353 21.7229 20.7494 21.7836 20.8441 21.9532ZM22.0579 20.6917C21.9021 20.5758 21.6819 20.6081 21.566 20.7639C21.5023 20.8496 21.4341 20.9336 21.3633 21.0137C21.2347 21.1591 21.2484 21.3813 21.3938 21.5099C21.4607 21.5691 21.5438 21.5981 21.6265 21.5981C21.7238 21.5981 21.8206 21.558 21.8901 21.4794C21.9739 21.3846 22.0547 21.285 22.1301 21.1835C22.246 21.0278 22.2137 20.8075 22.0579 20.6917ZM22.6459 19.0429C22.4563 19.0016 22.2689 19.1219 22.2276 19.3117C22.2049 19.416 22.1774 19.5206 22.1459 19.6225C22.0886 19.808 22.1925 20.0048 22.378 20.0621C22.4126 20.0728 22.4475 20.0779 22.4819 20.0779C22.632 20.0779 22.771 19.981 22.8177 19.83C22.8551 19.7091 22.8877 19.585 22.9146 19.4612C22.9559 19.2715 22.8356 19.0842 22.6459 19.0429ZM18.1484 15.6875V18.3544L16.8593 19.6435C16.722 19.7808 16.722 20.0034 16.8593 20.1407C16.9279 20.2094 17.0179 20.2437 17.1079 20.2437C17.1978 20.2437 17.2878 20.2093 17.3565 20.1407L18.7486 18.7486C18.8145 18.6827 18.8516 18.5932 18.8516 18.5V15.6875C18.8516 15.4933 18.6942 15.3359 18.5 15.3359C18.3058 15.3359 18.1484 15.4933 18.1484 15.6875ZM22.6484 14.7559C22.4543 14.7559 22.2969 14.9133 22.2969 15.1074V16.0836C21.4786 14.8003 20.0495 14 18.5 14C17.298 14 16.168 14.4681 15.318 15.318C14.4681 16.168 14 17.298 14 18.5C14 19.702 14.4681 20.832 15.318 21.682C16.168 22.5319 17.298 23 18.5 23C18.503 23 18.5058 22.9996 18.5088 22.9996C18.5117 22.9996 18.5146 23 18.5176 23C18.6443 23 18.7722 22.9947 18.8979 22.9841C19.0914 22.9679 19.2351 22.798 19.2189 22.6045C19.2027 22.411 19.033 22.2672 18.8392 22.2835C18.733 22.2924 18.6248 22.2969 18.5176 22.2969C18.5146 22.2969 18.5117 22.2972 18.5088 22.2973C18.5058 22.2972 18.503 22.2969 18.5 22.2969C16.4064 22.2969 14.7031 20.5936 14.7031 18.5C14.7031 16.4064 16.4064 14.7031 18.5 14.7031C19.8493 14.7031 21.0903 15.4223 21.7684 16.5664H20.8017C20.6076 16.5664 20.4502 16.7238 20.4502 16.918C20.4502 17.1121 20.6076 17.2695 20.8017 17.2695H21.875C22.0891 17.2695 22.2894 17.2094 22.4599 17.1051C22.4709 17.0989 22.4815 17.0921 22.4915 17.0849C22.7975 16.8836 23 16.5373 23 16.1445V15.1074C23 14.9133 22.8426 14.7559 22.6484 14.7559Z'
                      fill='white'
                    ></path>
                  </svg>
                </span>
                <span class='text-[14px] leading-[20px] block text-start font-medium md:text-center'>
                  Giao hàng siêu tốc
                </span>
              </div>
              <div class='flex items-center gap-2 text-center md:inline md:gap-0'>
                <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-6'>
                  <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clip-path='url(#clip0_691_965)'>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M2.5 6.5H15.0512V16.204H2.5V6.5Z'
                        fill='#5EAB46'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M2.5 6.5H15.0512V16.204H14.2532V7.28324H2.5V6.5Z'
                        fill='#9FC48F'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M2.5 13.6392H15.0512V16.204H2.5V13.6392Z'
                        fill='#0072BC'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M14.2532 13.6392H15.0512V16.204H14.2532V13.6392Z'
                        fill='#99D9F0'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M4.06761 15.3389H21.6917C21.9046 15.3389 22.0788 15.513 22.0788 15.7259V16.6834C22.0788 16.8963 21.9046 17.0704 21.6917 17.0704H4.06761C3.85472 17.0704 3.68054 16.8963 3.68054 16.6834V15.7259C3.68054 15.513 3.85472 15.3389 4.06761 15.3389Z'
                        fill='#208BC9'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M22.0788 16.2041V16.6834C22.0788 16.8963 21.9046 17.0705 21.6917 17.0705H4.06761C3.85472 17.0705 3.68054 16.8963 3.68054 16.6834V16.2041H22.0788Z'
                        fill='#0072BC'
                      ></path>
                      <path
                        d='M6.33763 9.11719C6.33763 9.27246 6.21173 9.39836 6.05642 9.39836H5.19353V9.6841H5.67962C5.83493 9.6841 5.96083 9.81 5.96083 9.96527C5.96083 10.1205 5.83493 10.2464 5.67962 10.2464H5.19353V11.0217C5.19353 11.177 5.06763 11.3029 4.91231 11.3029C4.757 11.3029 4.6311 11.177 4.6311 11.0217V9.11711C4.6311 8.96184 4.757 8.83594 4.91231 8.83594H6.05642C6.21173 8.83602 6.33763 8.96191 6.33763 9.11719ZM10.4451 9.3984C10.6004 9.3984 10.7263 9.2725 10.7263 9.11723C10.7263 8.96195 10.6004 8.83605 10.4451 8.83605H9.30099C9.14567 8.83605 9.01977 8.96195 9.01977 9.11723V11.0218C9.01977 11.1771 9.14567 11.303 9.30099 11.303H10.4451C10.6004 11.303 10.7263 11.1771 10.7263 11.0218C10.7263 10.8666 10.6004 10.7407 10.4451 10.7407H9.5822V10.2466H10.3666C10.5219 10.2466 10.6478 10.1207 10.6478 9.96539C10.6478 9.81012 10.5219 9.68422 10.3666 9.68422H9.5822V9.39848H10.4451V9.3984ZM8.53255 9.68984V9.71375C8.53255 9.98871 8.40134 10.233 8.19888 10.3893L8.49227 10.8768C8.57235 11.0098 8.52942 11.1826 8.39634 11.2627C8.35095 11.29 8.30095 11.303 8.25161 11.303C8.15622 11.303 8.06321 11.2545 8.0104 11.1668L7.64974 10.5675H7.38724V11.0218C7.38724 11.1771 7.26134 11.303 7.10603 11.303C6.95071 11.303 6.82481 11.1771 6.82481 11.0218V10.2864V10.0553V9.11719C6.82481 8.96191 6.95071 8.83602 7.10603 8.83602H7.67868C8.1495 8.83602 8.53255 9.21902 8.53255 9.68984ZM7.97013 9.68984C7.97013 9.52914 7.83942 9.3984 7.67872 9.3984H7.38727V10.0052H7.67872C7.69681 10.0052 7.71442 10.0033 7.73157 10.0002C7.73583 9.99906 7.74009 9.99832 7.74438 9.99746C7.87349 9.96754 7.97013 9.85184 7.97013 9.71375V9.68984ZM12.6388 10.7406H11.7759V10.2465H12.5603C12.7156 10.2465 12.8415 10.1206 12.8415 9.96535C12.8415 9.81008 12.7156 9.68418 12.5603 9.68418H11.7759V9.39844H12.6388C12.7941 9.39844 12.92 9.27254 12.92 9.11727C12.92 8.96199 12.7941 8.83609 12.6388 8.83609H11.4947C11.3394 8.83609 11.2135 8.96199 11.2135 9.11727V11.0219C11.2135 11.1771 11.3394 11.303 11.4947 11.303H12.6388C12.7941 11.303 12.92 11.1771 12.92 11.0219C12.92 10.8666 12.7941 10.7406 12.6388 10.7406Z'
                        fill='white'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M8.39591 18.2681C9.53548 18.2681 10.4644 17.3392 10.4644 16.1996C10.4644 15.0612 9.53548 14.1311 8.39591 14.1311C7.25747 14.1311 6.32739 15.0612 6.32739 16.1996C6.32739 17.3392 7.25747 18.2681 8.39591 18.2681Z'
                        fill='#365C75'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M8.39595 17.1285C8.90826 17.1285 9.3249 16.7107 9.3249 16.1995C9.3249 15.6884 8.90822 15.2717 8.39595 15.2717C7.88478 15.2717 7.46814 15.6884 7.46814 16.1995C7.46814 16.7107 7.88482 17.1285 8.39595 17.1285Z'
                        fill='#E1EFFF'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M8.39594 14.1311C9.53891 14.1311 10.4645 15.0578 10.4645 16.1996C10.4645 17.3426 9.53891 18.2681 8.39594 18.2681C8.32309 18.2681 8.25137 18.2647 8.18079 18.2568C9.22133 18.1486 10.033 17.2697 10.033 16.1996C10.033 15.1306 9.22129 14.2506 8.18079 14.1425C8.25137 14.1357 8.32309 14.1311 8.39594 14.1311Z'
                        fill='#274254'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M8.39588 15.2717C8.90932 15.2717 9.32482 15.6873 9.32482 16.1995C9.32482 16.713 8.90928 17.1285 8.39588 17.1285C8.3401 17.1285 8.28545 17.1228 8.23193 17.1137C8.66568 17.0363 8.99584 16.656 8.99584 16.1995C8.99584 15.743 8.66568 15.3627 8.23193 15.2853C8.28545 15.2763 8.3401 15.2717 8.39588 15.2717Z'
                        fill='#D7D7E3'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M15.9767 17.0704H22.4999V11.1244L20.3392 8.22365C20.1377 7.95385 19.8485 7.80811 19.5115 7.80811H16.7053C16.3045 7.80811 15.9767 8.13596 15.9767 8.5367V17.0704Z'
                        fill='#208BC9'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M17.0935 8.84424V11.1245H21.2055L19.5275 8.87154C19.5093 8.8465 19.5025 8.84424 19.4717 8.84424H17.0935Z'
                        fill='#F0F0FC'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M18.8956 8.84424L20.5953 11.1245H21.2055L19.5275 8.87154C19.5093 8.8465 19.5024 8.84424 19.4717 8.84424H18.8956Z'
                        fill='#D7D7E3'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M21.7987 17.0704H22.5V11.1244L20.3393 8.22365C20.1378 7.95385 19.8486 7.80811 19.5116 7.80811H18.8092C19.1462 7.80811 19.4365 7.95381 19.6369 8.22365L21.7987 11.1244V17.0704Z'
                        fill='#99D9F0'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M19.2383 18.2726C20.3779 18.2726 21.3068 17.3437 21.3068 16.2041C21.3068 15.0657 20.3779 14.1367 19.2383 14.1367C18.0987 14.1367 17.1698 15.0657 17.1698 16.2041C17.1698 17.3436 18.0987 18.2726 19.2383 18.2726Z'
                        fill='#365C75'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M19.2384 17.1331C19.7496 17.1331 20.1673 16.7164 20.1673 16.2042C20.1673 15.693 19.7495 15.2764 19.2384 15.2764C18.7272 15.2764 18.3094 15.693 18.3094 16.2042C18.3094 16.7165 18.7272 17.1331 19.2384 17.1331Z'
                        fill='#E1EFFF'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M19.2383 14.1367C20.3813 14.1367 21.3069 15.0623 21.3069 16.2041C21.3069 17.3471 20.3813 18.2726 19.2383 18.2726C19.1655 18.2726 19.0938 18.2692 19.0232 18.2613C20.0637 18.1542 20.8754 17.2742 20.8754 16.2041C20.8754 15.1351 20.0637 14.2551 19.0232 14.147C19.0937 14.1401 19.1655 14.1367 19.2383 14.1367Z'
                        fill='#274254'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M19.2384 15.2764C19.7518 15.2764 20.1674 15.6919 20.1674 16.2042C20.1674 16.7176 19.7518 17.1331 19.2384 17.1331C19.1826 17.1331 19.1268 17.1286 19.0745 17.1183C19.5082 17.0409 19.8384 16.6618 19.8384 16.2041C19.8384 15.7476 19.5082 15.3685 19.0745 15.2911C19.128 15.2809 19.1826 15.2764 19.2384 15.2764Z'
                        fill='#D7D7E3'
                      ></path>
                    </g>
                    <defs>
                      <clipPath id='clip0_691_965'>
                        <rect width='20' height='20' fill='white' transform='translate(2.5 2.5)'></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span class='text-[14px] leading-[20px] block text-start font-medium md:text-center'>
                  Miễn phí vận chuyển
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
