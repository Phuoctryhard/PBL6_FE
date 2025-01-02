import React, { useState } from 'react'
import anh1 from '../../HomeUser/Component/SliderUser/img/sanpham.jpg'
import anh2 from '../../HomeUser/Component/SliderUser/img/sanDeal.png'
import Button1 from '../../../../Component/Button/Button'
import Category from '../../HomeUser/Component/CategoryProduct/Category'
import ProductItem from '../Component/ProductItem'
import { useQuery } from '@tanstack/react-query'
import productAPI from '../../../../Api/user/product'

export default function ProductList() {
  // san pham moi
  // params là object thay vi chuoi
  const [sanphammoi, setProductmoi] = useState({
    typesort: 'new',
    sortlatest: 'true',
    paginate: 6
  })
  // params là object thay vi chuoi
  const [sanphambanchay, setProductSale] = useState({
    typesort: 'product_sold',
    sortlatest: 'true',
    paginate: 6
  })

  const { data: newproduct } = useQuery({
    queryKey: ['sanpham', sanphammoi],
    queryFn: () => {
      return productAPI.getAllProduct(sanphammoi)
    },
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút mà không cần refetch
    cacheTime: 10 * 60 * 1000
  })
  const { data: saleproduct } = useQuery({
    queryKey: ['sanphamsale', sanphambanchay],
    queryFn: () => {
      return productAPI.getAllProduct(sanphambanchay)
    },
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút mà không cần refetch
    cacheTime: 10 * 60 * 1000
  })
  // console.log(newproduct)
  // console.log(saleproduct)
  return (
    <div className='bg-white'>
      <div className='bg-neutral-100 h-3'></div>
      <div className='px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col'>
        <div className='flex justify-between py-4 bg-[#3165b3] rounded-lg items-center'>
          <h1 className='font-semibold line-clamp-1 text-sm sm:text-base md:text-lg lg:text-[20px] pl-2 text-white'>
            Sản phẩm bán chạy
          </h1>
          <a
            class='relative flex justify-center border border-white bg-transparent text-sm font-normal text-hyperLink outline-none text-white p-2 mr-2 rounded-lg'
            type='button'
            href='/collection/san-pham-ban-chay-toan-quoc'
          >
            Xem tất cả
          </a>
        </div>

        <div className='mb-5 mt-3'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            <ProductItem sanphammoi={saleproduct} sanphambanchay='sanphambanchay' />
          </div>
        </div>
      </div>
      <div className='bg-neutral-100 h-3'></div>
      <div className='bg-[#60e0c0]'>
        <div className='px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col'>
          <div className='flex justify-between py-4 bg-[#3165b3] rounded-lg items-center my-3'>
            <h1 className='font-semibold line-clamp-1 text-sm sm:text-base md:text-lg lg:text-[20px] pl-2 text-white'>
              Sản phẩm mới nhất
            </h1>
            <a
              class='relative flex justify-center border border-white bg-transparent text-sm font-normal text-hyperLink outline-none text-white p-2 mr-2 rounded-lg'
              type='button'
              href='/collection/san-pham-noi-bat-toan-quoc'
            >
              Xem tất cả
            </a>
          </div>
          <div className='mb-5'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              <ProductItem sanphammoi={newproduct} />
            </div>

            
          </div>
        </div>
      </div>
      <div className='bg-neutral-100 h-3'></div>
      <div className='bg-neutral-100 h-3' />
    </div>
  )
}

