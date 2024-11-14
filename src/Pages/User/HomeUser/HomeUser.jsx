import Footer from '../../../Component/Footer/Footer.jsx'
import Category from './Component/CategoryProduct/Category.jsx'
import ProductList from '../ProductUser/ProductList/ProductList.jsx'

import Header from './Component/HeaderUser/Header.jsx'
import Disease from '../Disease/Disease.jsx'
import CategoryMain from './Component/CategoryMain/CategoryMain.jsx'

export default function HomeUser() {
  return (
    <div className=''>
      <Header />
      <ProductList />
      <Disease />
      <Category />
      <Footer />
    </div>
  )
}
// <CategoryMain/>
