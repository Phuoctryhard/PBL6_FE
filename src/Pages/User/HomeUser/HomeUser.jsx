import Footer from '../../../Component/Footer/Footer.jsx'

import ProductList from '../ProductUser/ProductList/ProductList.jsx'

import Header from './Component/HeaderUser/Header.jsx'

import CarouselSlideShow from './Component/Carousel/Carousel.jsx'
import Desease from './Component/Disease/Desease.jsx'
import { Helmet } from 'react-helmet-async'

export default function HomeUser() {
  return (
    <div className=''>
      <Helmet>
        <title>Trang Chủ | Nhà Thuốc PBL6 </title>
        <meta
          name='description'
          content='Nhà thuốc PBL6 cung cấp các sản phẩm thuốc chất lượng, dịch vụ tư vấn sức khỏe tận tâm. Uy tín hàng đầu trong lĩnh vực chăm sóc sức khỏe.'
        />

        <link rel='canonical' href='https://www.tacobell.com/' />
      </Helmet>
      <Header />
      <CarouselSlideShow />
      <ProductList />
      <Desease />
      <Footer />
    </div>
  )
}
