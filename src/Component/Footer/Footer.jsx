import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Footer() {
  return (
    <div className='w-full h-100 bg-neutral-200 pb-24 md:pb-24'>
      <div className='hidden h-2 bg-primary md:block'></div>
      <div className='grid lg:grid-cols-5 gap-4 px-32 mt-5 '>
        <div className=''>
          <h4 className='text-[14px] leading-[20px] mb-4 font-bold'>Về Pharmacity</h4>
          <ul>
            <li className='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/gioi-thieu'>
                Giới thiệu
              </a>
            </li>
            <li className='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/he-thong-cua-hang'>
                Hệ thống cửa hàng
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/giay-phep-kinh-doanh'>
                Giấy phép kinh doanh
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/page/quy-che-hoat-dong'>
                Quy chế hoạt động
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/page/chinh-sach-doi-tra'>
                Chính sách đổi trả
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/page/chinh-sach-giao-hang'>
                Chính sách giao hàng
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/page/chinh-sach-bao-mat'>
                Chính sách bảo mật
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/page/phuong-thuc-thanh-toan'>
                Chính sách thanh toán
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/page/the-le-chuong-trinh-the-thanh-vien'>
                Thể lệ chương trình thẻ thành viên
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/cau-hoi-thuong-gap.htm'>
                Câu hỏi thường gặp
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='https://www.pharmacity.vn/sitemaps/sitemaps.xml'>
                Sitemap
              </a>
            </li>
            <li class='grid grid-flow-col items-center justify-start gap-1 pb-2'>
              <a target='_self' href='/goc-suc-khoe/benh-vien'>
                Bệnh viện
              </a>
            </li>
          </ul>
        </div>
        <div className=''>
          <h4 class='text-[14px] leading-[20px] mb-4 font-bold'>Danh mục</h4>
          <ul>
            <li class='pb-2'>
              <a target='' href='/duoc-pham'>
                Thuốc
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/benh'>
                Tra cứu bệnh
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/thuc-pham-chuc-nang'>
                Thực phẩm chức năng
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/cham-soc-ca-nhan'>
                Chăm sóc cá nhân
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/me-va-be'>
                Mẹ và Bé
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/cham-soc-sac-dep'>
                Chăm sóc sắc đẹp
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/thiet-bi-y-te-2'>
                Thiết bị y tế
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/san-pham-tien-loi'>
                Sản phẩm tiện lợi
              </a>
            </li>
            <li class='pb-2'>
              <a
                target=''
                href='https://www.pharmacity.vn/danh-cho-khach-hang-doanh-nghiep.lp?utm_source=web&amp;utm_medium=category&amp;utm_campaign=doanhnghiep'
              >
                Doanh nghiệp
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/shop/pharmacity'>
                Nhãn hàng Pharmacity
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/cam-nang-mua-sam'>
                Khuyến mãi HOT
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/goc-suc-khoe'>
                Góc sức khỏe
              </a>
            </li>
            <li class='pb-2'>
              <a target='' href='/cham-soc-suc-khoe'>
                Chăm sóc sức khỏe
              </a>
            </li>
          </ul>
        </div>

        <div className=''>
          <h4 class='text-[14px] leading-[20px] mb-4 font-bold'>Tổng đài CSKH</h4>
          <p>
            Hỗ trợ đặt hàng <br />{' '}
            <a rel='noopener noreferrer' target='_blank' href='tel:18006821'>
              <span class='font-bold text-blue'>1800 6821</span>
            </a>
          </p>
          <div class='mt-10'>
            <h4 class='text-[14px] leading-[20px] mb-4 font-bold'>Ngôn ngữ</h4>
            <div class='flex cursor-pointer items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                class='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>

              <span class='text-[14px] leading-[20px] ml-2'>Language</span>
            </div>
          </div>
        </div>
        <div className=''>
          <h4 className='text-[14px] leading-[20px] mb-4 font-bold'>Theo dõi chúng tôi trên</h4>

          <ul>
            <li>
              <a href=''>
                <img
                  className='inline-block mb-1 mr-2 w-[1.5rem]'
                  src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163158-0-facebook.svg'
                  alt=''
                />
                FaceBook
              </a>
            </li>
            <li className='mt-3'>
              <a href=''>
                <img
                  className='inline-block mb-1 mr-2 w-[1.5rem]'
                  src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163159-0-youtube.svg'
                  alt=''
                />
                Youtober
              </a>
            </li>
            <li className='mt-3'>
              <a href=''>
                <img
                  className='inline-block mb-1 mr-2 w-[1.5rem]'
                  src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240809162128-0-zalo.svg'
                  alt=''
                />
                Zalo
              </a>
            </li>
          </ul>
        </div>
        <div className=''>
          <h4 className='text-[14px] leading-[20px] mb-4 font-bold'>Tải ứng dụng Pharmacity ngay thôi</h4>
          <div className='flex justify-between'>
            <div className=''>
              <img
                className='w-[100px]'
                src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706154633-0-qr-code.png'
                alt='QR code'
                loading='lazy'
              />
            </div>

            <div className='flex flex-col gap-y-4'>
              <img
                className='object-contain w-[100px]'
                src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706154633-0-app-store.png'
                alt='Apple store'
                loading='lazy'
              ></img>

              <img
                className='object-contain w-[100px]'
                src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706154633-0-google-play.png'
                alt='Apple store'
                loading='lazy'
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
