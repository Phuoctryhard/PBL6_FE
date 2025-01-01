import React, { useContext, useEffect, useState } from 'react'
import { Space, Tabs } from 'antd'
import './ant.css'
import { Link, Navigate } from 'react-router-dom'
import { Empty } from 'antd'
import { Divider } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import OrderApi from '../../../../Api/user/order'
import { formatCurrency } from '../../../../until'
import CartAPI from '../../../../Api/user/cart'
import { toast } from 'react-toastify'
import { queryClient } from '../../../..'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/app.context'
import ModalReviewProduct from './ModalReviewProduct'
import { Helmet } from 'react-helmet-async'

export default function OrderHistory() {
  const { isAuthenticated, logout, checkedProducts, setCheckedProducts } = useContext(AuthContext)
  const navigate = useNavigate() // Hook để điều hướng
  const [IdOrder, setIdOrder] = useState('')
  const [IdProduct, setIdProduct] = useState('')
  const [isActive, setActive] = useState('All')

  const ORDER_STATUS = [
    { name: 'Tất cả', status: 'All' },
    // đang chờ khách hàng  thanh toán , chuyển khoản  :
    { name: 'Đang xử lí ', status: 'pending' },
    // admin xác nhận đơn đã gói hàng cb vận chuyển
    { name: 'Đã xác nhận', status: 'confirmed' },
    // shiper lấy hàng và đang giao đơn hàng  : vận chuyển
    { name: 'Đang giao', status: 'shipped' },
    // đã giao cho khách hàng , kh nhận thành công
    { name: 'Đã giao', status: 'delivered' },
    // hủy ở giai đoạn
    { name: 'Đã hủy', status: 'cancelled' }
  ]
  const { data } = useQuery({
    queryKey: ['getOrderApi'],
    queryFn: () => {
      return OrderApi.getHistoryOrder()
    }
  })
  // console.log(data)
  const [dataAll, setDataAll] = useState([])
  useEffect(() => {
    if (data) {
      setDataAll(data?.data?.data)
    }
    if (isActive && isActive !== 'All') {
      const filter = data?.data?.data?.filter((element) => {
        return element?.order_status === isActive
      })
      if (filter) {
        setDataAll(filter)
      }
    } else if (isActive == 'All') {
      setDataAll(data?.data?.data)
    }
  }, [isActive, data])

  const handleBuyAgain = async (order_detail) => {
    let arrayIdCart = [] // Declare the array before the loop

    console.log(order_detail)

    // Loop through the order details and trigger the mutation for each product
    for (const element of order_detail) {
      console.log(element)
      try {
        const data = await mutateAddProductCart.mutateAsync({
          product_id: element.product_id,
          cart_quantity: element.order_quantity
        })

        // Handle success for each product added to the cart
        console.log('Product added to cart successfully:', data.data.data)
        arrayIdCart.push(data.data.data.cart_id) // Track which products were added
        console.log('Products added to cart:', arrayIdCart)

        // Invalidate the queries after each successful mutation
        queryClient.invalidateQueries({ queryKey: ['getCart'] })
      } catch (error) {
        // Handle error in case the mutation fails
        console.error('Failed to add product to cart:', error)
      }
    }

    // After the loop finishes, navigate to the cart page
    setCheckedProducts((prev) => {
      return [...prev, ...arrayIdCart] // Use spread operator to merge arrays
    })

    await navigate('/cart')
    // Optionally, handle any logic after all products have been processed
    console.log('Products added to cart:', arrayIdCart)
  }
  // Them vao gio hang
  const mutateAddProductCart = useMutation({
    mutationFn: CartAPI.addproduct_inCart,
    onError: (error) => {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error.response.data.message[0])
    }
  })

  const Cancel_CartOrder = useMutation({
    mutationFn: OrderApi.Cancel_CartOrder
  })
  console.log(isActive)
  const handleCancelOrder = (idOrder) => {
    console.log(idOrder)
    Cancel_CartOrder.mutate(idOrder, {
      onSuccess: () => {
        toast.success('Hủy đơn hàng thành công')
        queryClient.invalidateQueries({ queryKey: ['getOrderApi'] })
      },
      onError: () => {
        toast.error('Hủy đơn hàng thất bại ')
      }
    })
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = (order_id, product_id) => {
    console.log(order_id, product_id)
    setIdOrder(order_id)
    setIdProduct(product_id)
    setIsModalOpen(true)
  }
  console.log(dataAll)
  return (
    <div className=''>
      <Helmet>
        <title>Lịch sử đơn hàng | Nhà Thuốc PBL6</title>
        <meta
          name='description'
          content='Xem lại lịch sử đơn hàng tại Nhà Thuốc PBL6. Theo dõi chi tiết các đơn hàng đã đặt, trạng thái giao hàng và thông tin thanh toán một cách dễ dàng và nhanh chóng.'
        />
      </Helmet>

      <div className='flex justify-between  '>
        {ORDER_STATUS?.map((element) => {
          return (
            <div
              className={`flex flex-1 items-center justify-center border-b-2 cursor-pointer ${isActive === element.status ? 'text-red-600  border-red-600' : 'border-white'}`}
              onClick={() => {
                setActive(element.status)
              }}
            >
              <p className='p-4'>{element.name}</p>
            </div>
          )
        })}
      </div>
      <div className=''>
        {dataAll ? (
          dataAll?.map((element) => {
            //  console.log(element)
            return (
              <div key={element?.order_id}>
                {element?.order_detail?.map((detail) => (
                  <div className='flex mt-7 p-2' key={detail?.order_detail_id}>
                    <div className='flex-shrink-0 w-20 h-20'>
                      <Link to={`/account/order-history/${element.order_id}`}>
                        <img
                          src={JSON.parse(detail.product_images)[0]} // Lấy ảnh đầu tiên từ mảng `product_images`
                          alt={detail.product_name}
                          className='w-full h-full rounded-lg object-contain'
                        />
                      </Link>
                    </div>
                    <div className='flex flex-grow ml-3'>
                      <div className='flex flex-col justify-between'>
                        <Link to={`/account/order-history/${element.order_id}`}>
                          <p className='font-semibold line-clamp-2'>{detail.product_name}</p>
                        </Link>
                        <span className='text-sm'>Phân loại hàng 200</span>
                        <span className='text-sm'>*{detail.order_quantity}</span>
                      </div>
                    </div>
                    <div className='flex shrink-0 ml-3 items-center gap-x-4'>
                      <span className='line-through text-gray-500'>
                        ₫{parseInt(detail.order_price).toLocaleString()}
                      </span>
                      <span className='text-red-500 font-semibold'>
                        ₫{parseInt(detail.order_total_price).toLocaleString()}
                      </span>
                      {element.delivery_status === 'delivered' && (
                        <button
                          className='p-3 border border-blue text-blue   rounded-md'
                          onClick={() => showModal(detail.order_id, detail.product_id)}
                        >
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className='flex justify-end font-semibold text-lg mr-3'>
                  Tổng tiền: {formatCurrency(element.order_total_amount)}
                </div>
                <div className='flex gap-x-5'>
                  <button
                    className='text-white bg-blue  rounded-lg py-3 px-6  '
                    onClick={() => handleBuyAgain(element.order_detail)}
                  >
                    Mua lại{' '}
                  </button>
                  <Link to={`/account/order-history/${element.order_id}`}>
                    <button className='text-white bg-blue rounded-lg py-3 px-6'>Xem chi tiết đơn hàng</button>
                  </Link>
                  {element.delivery_status === 'pending' && (
                    <button
                      className='text-white bg-blue  rounded-lg py-3 px-6  '
                      onClick={() => handleCancelOrder(element.order_id)}
                    >
                      Hủy đơn hàng{' '}
                    </button>
                  )}
                </div>
                <Divider
                  style={{
                    borderColor: '#7cb305'
                  }}
                ></Divider>
              </div>
            )
          })
        ) : (
          <>
            <Empty />;
          </>
        )}
        {dataAll?.length === 0 && <Empty style={{ marginTop: '50px' }} />}
        <ModalReviewProduct
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setIdOrder={setIdOrder}
          setIdProduct={setIdProduct}
          IdOrder={IdOrder}
          IdProduct={IdProduct}
        />
      </div>
    </div>
  )
}
