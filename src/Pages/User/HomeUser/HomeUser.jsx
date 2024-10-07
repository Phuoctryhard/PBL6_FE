import React from 'react'
import Nav from '../../../Component/Nav/Nav'
import Search from './SearchHeader/Search'
import Slider from './Slider/Slider'
import Footer from '../../../Component/Footer/Footer.jsx'
import ProductList from '../ProductList/ProductList'
import DetailProduct from '../DetailProduct/DetailProduct.jsx'


export default function HomeUser() {

  return (
    <div className=''>
      <div className='bg-[#66cffd]'>
        <img
          src='https://prod-cdn.pharmacity.io/e-com/images/banners/20240708102340-0-Top%20banner_%20Desktop_Freeship.png'
          alt=''
          className='px-24'
        />
      </div>
      <div className='px-24 py-1 flex items-center justify-between space-x-6  bg-[#ebf3fa] '>
        <div className='flex gap-3 '>
          <div data-state='closed' class='focus-visible:outline-none'>
            <div class='flex items-center whitespace-nowrap text-xs'>
              <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-5 h-5 mr-2 p-0'>
                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 18 18'>
                  <path
                    fill='currentColor'
                    d='M.667 3.792V1.318c0-.36.29-.651.65-.651h2.475a.651.651 0 110 1.302H1.969v1.823a.651.651 0 11-1.302 0zM16.682.667h-2.474a.651.651 0 100 1.302h1.823v1.823a.651.651 0 101.302 0V1.318a.651.651 0 00-.65-.651zM3.792 16.032H1.968v-1.823a.651.651 0 10-1.302 0v2.474c0 .36.29.65.65.65h2.475a.651.651 0 100-1.301zm12.89-2.474a.651.651 0 00-.65.65v1.824h-1.824a.651.651 0 100 1.302h2.474c.36 0 .651-.292.651-.651v-2.474a.651.651 0 00-.65-.651zM8.43 3.873V7.78c0 .36-.291.65-.65.65H3.872a.651.651 0 01-.651-.65V3.873c0-.36.291-.65.65-.65H7.78c.36 0 .651.29.651.65zm-1.302.651H4.524V7.13h2.604V4.524zm7.324 3.907h-3.906a.651.651 0 01-.651-.651V3.873c0-.36.292-.65.651-.65h3.906c.36 0 .651.29.651.65V7.78c0 .36-.291.65-.65.65zm-.65-3.907h-2.605V7.13h2.604V4.524zM8.43 10.546v3.907c0 .36-.291.65-.65.65H3.872a.651.651 0 01-.651-.65v-3.906c0-.36.291-.651.65-.651H7.78c.36 0 .651.291.651.65zm-1.302.652H4.524v2.604h2.604v-2.604zm6.486 3.068h-2.23a.651.651 0 01-.65-.651v-2.23c0-.36.29-.651.65-.651h2.23c.36 0 .651.291.651.65v2.23a.65.65 0 01-.65.652zm-.65-2.23h-.929v.928h.928v-.928z'
                  ></path>
                </svg>
              </span>
              <span>Tải ứng dụng</span>
            </div>
          </div>

          <div data-state='closed' className='focus-visible:outline-none cursor-pointer'>
            <div class='flex items-center whitespace-nowrap text-xs'>
              <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-5 h-5 mr-2 p-0'>
                <img
                  class='h-5 w-5'
                  src='https://prod-cdn.pharmacity.io/e-com/images/static-website/20240812134626-0-language.svg'
                  alt='Language'
                  loading='lazy'
                  width='500'
                  height='500'
                />
              </span>
              <span>Language</span>
            </div>
          </div>
        </div>
        <div className='grid grid-flow-col gap-6 text-xs '>
          <span className='shrink-0 whitespace-nowrap'>
            Hotline
            <a rel='noopener noreferrer' target='_blank' href='tel:18006821'>
              <span className='ml-2 font-bold text-blue'>1800 6821</span>
            </a>
          </span>

          <Nav
            title='Doanh nghiệp'
            image='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240520103330-0-20240403091737-0-new-bagde.png'
            alt='20240520103330-0-20240403091737-0-new-bagde.png'
            className='grid grid-flow-col items-center justify-start gap-1'
            href='/danh-cho-khach-hang-doanh-nghiep.lp'
          />

          <Nav
            title='Deal hot tháng 9 🔥'
            alt='20240520103330-0-20240403091737-0-new-bagde.png'
            className='grid grid-flow-col items-center justify-start gap-1'
            href='/tra-cuu-donhang'
          />

          <Nav
            title='Tra cứu đơn hàng'
            image='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240816073820-0-Frame%2024020.png'
            alt='20240816073820-0-Frame%2024020.png'
            className='grid grid-flow-col items-center justify-start gap-1'
            href='/cam-nang-mua-sam'
          />

          <Nav
            title=' Góc sức khỏe'
            image='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240206034536-0-Frame%2024020%20%281%29.png'
            alt='20240206034536-0-Frame%2024020%20%281%29.png'
            className='grid grid-flow-col items-center justify-start gap-1'
            href='/goc-suc-khoe'
          />

          <Nav
            title=' Góc sức khỏe'
            image='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240206034536-0-Frame%2024020%20%281%29.png'
            alt='20240206034536-0-Frame%2024020%20%281%29.png'
            className='grid grid-flow-col items-center justify-start gap-1'
            href='/goc-suc-khoe'
          />
          <a target='_self' class='grid grid-flow-col items-center justify-start gap-1' href='/ngay-hoi-online.lp'>
            <p title='Ngày hội Online' class='truncate'>
              Ngày hội Online
            </p>
          </a>
          <a target='_self' class='grid grid-flow-col items-center justify-start gap-1' href='/he-thong-cua-hang'>
            <p title='Hệ thống nhà thuốc' class='truncate'>
              Hệ thống nhà thuốc
            </p>
          </a>
        </div>
      </div>
      <Search />
      <Slider />
      <ProductList />

      <Footer />
    </div>
  )
}

// <DetailProduct />
