import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import productAPI from '../../../../Api/user/product'
import ProductItem from '../Component/ProductItem'
import { Pagination, Row } from 'antd'
import Loading from '../../../../Component/Loading/Loading'

export default function ProductHotSell() {
  const { id } = useParams()
  console.log(id)
  const [sanphammoi, setProductmoi] = useState({
    typesort: 'new',
    sortlatest: 'true',
    paginate: 15,
    page: 1
  })
  // params là object thay vi chuoi
  const [sanphambanchay, setProductSale] = useState({
    typesort: 'product_sold',
    sortlatest: 'true',
    paginate: 15,
    page: 1
  })

  const { data: newproduct, isLoading } = useQuery({
    queryKey: ['sanpham', sanphammoi],
    queryFn: () => {
      return productAPI.getAllProduct(sanphammoi)
    },
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút mà không cần refetch
    cacheTime: 10 * 60 * 1000
  })
  const { data: saleproduct, isLoading: isLoadingSale } = useQuery({
    queryKey: ['sanphamsale', sanphambanchay],
    queryFn: () => {
      return productAPI.getAllProduct(sanphambanchay)
    },
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút mà không cần refetch
    cacheTime: 10 * 60 * 1000
  })
  // Điều kiện kiểm tra `id`
  const isProductHotSell = id === 'san-pham-ban-chay-toan-quoc'

  // Hiển thị loading hoặc sản phẩm tương ứng
  if (isLoading || isLoadingSale) {
    return (
      <div className='h-screen'>
        <Loading />
      </div>
    )
  }

  const handleOnchangePage = (pagination) => {
    console.log('check ', pagination.current, pagination.pageSize)
    setProductSale((prev) => ({
      ...prev,
      page: pagination.current, // Cập nhật giá trị `page` dựa trên `pagination.current`,
      paginate: pagination.pageSize
    }))
  }

  const handleOnchangePage1 = (pagination) => {
    console.log('check ', pagination.current, pagination.pageSize)
    setProductmoi((prev) => ({
      ...prev,
      page: pagination.current, // Cập nhật giá trị `page` dựa trên `pagination.current`,
      paginate: pagination.pageSize
    }))
  }

  // const searchParams = createSearchParams({
  //   ...useQueryParameter,
  //   page: +pagination.current,
  //   paginate: +pagination.pageSize
  // }).toString()
  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col'>
      {isProductHotSell ? (
        <div className=''>
          <h2 className='my-4 font-semibold text-2xl'>Sản phẩm bán chạy</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            <ProductItem sanphammoi={saleproduct} sanphambanchay='sanphambanchay' />
          </div>
          <Row style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <Pagination
              current={sanphambanchay.page}
              total={saleproduct?.data?.data?.data?.length > 0 ? saleproduct?.data?.data.total : 0}
              pageSize={sanphambanchay.paginate}
              responsive
              onChange={(p, s) => handleOnchangePage({ current: p, pageSize: s })}
            />
          </Row>
        </div>
      ) : (
        <div className='mb-1'>
          <h2 className='my-4 font-semibold text-2xl'>Sản phẩm mới</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-2 '>
            <ProductItem sanphammoi={newproduct} />
          </div>
          <Row style={{ display: 'flex', justifyContent: 'center', margin: '5px 0'}}>
            <Pagination
              current={sanphammoi.page}
              total={newproduct?.data?.data?.data?.length > 0 ? newproduct?.data?.data.total : 0}
              pageSize={sanphammoi.paginate}
              responsive
              onChange={(p, s) => handleOnchangePage1({ current: p, pageSize: s })}
            />
          </Row>
        </div>
      )}
    </div>
  )
}
