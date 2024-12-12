import Footer from '../../../Component/Footer/Footer.jsx'

import ProductList from '../ProductUser/ProductList/ProductList.jsx'

import Header from './Component/HeaderUser/Header.jsx'


import CarouselSlideShow from './Component/Carousel/Carousel.jsx'
import Desease from './Component/Disease/Desease.jsx'

export default function HomeUser() {
  return (
    <div className=''>
      <Header />
      <CarouselSlideShow />
      <ProductList />
      <Desease />
      <Footer />
    </div>
  )
}
