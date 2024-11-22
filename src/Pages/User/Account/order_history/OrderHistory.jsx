import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import './ant.css'
import { Link } from 'react-router-dom'

import { Divider } from 'antd'
import { useQuery } from '@tanstack/react-query'
import OrderApi from '../../../../Api/user/order'
import { formatCurrency } from '../../../../until'
export default function OrderHistory() {
  const [isActive, setActive] = useState('All')
  const ORDER_STATUS = [
    { name: 'Tất cả', status: 'All' },
    { name: 'Đang chờ', status: 'pending' },
    { name: 'Đã xác nhận', status: 'Confirmed' },
    { name: 'Đã gửi', status: 'Shipped' },
    { name: 'Đã giao', status: 'Delivered' },
    { name: 'Đã hủy', status: 'cancelled' }
  ]
  const { data } = useQuery({
    queryKey: ['getOrderApi'],
    queryFn: () => {
      return OrderApi.getHistoryOrder()
    }
  })
  console.log(data)
  const [dataAll, setDataAll] = useState([])
  useEffect(() => {
    if (data) {
      setDataAll(data?.data?.data)
    }
    if (isActive && isActive !== 'All') {
      const filter = data.data.data.filter((element) => {
        return element.order_status === isActive
      })

      setDataAll(filter)
    } else if (isActive == 'All') {
      setDataAll(data?.data?.data)
    }
  }, [isActive, data])
  console.log(isActive)
  return (
    <div className=''>
      <div className='flex justify-between  '>
        {ORDER_STATUS.map((element) => {
          return (
            <div
              className={`flex flex-1 items-center justify-center border-b-2  ${isActive === element.status ? 'text-red-600  border-red-600' : 'border-white'}`}
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
        {dataAll?.map((element) => {
          console.log(element)
          return (
            <div key={element.order_id}>
              {element.order_detail?.map((detail) => (
                <div className='flex mt-7 p-2' key={detail.order_detail_id}>
                  <div className='flex-shrink-0 w-20 h-20'>
                    <img
                      src={JSON.parse(detail.product_images)[0]} // Lấy ảnh đầu tiên từ mảng `product_images`
                      alt={detail.product_name}
                      className='w-full h-full rounded-lg object-contain'
                    />
                  </div>
                  <div className='flex flex-grow ml-3'>
                    <div className='flex flex-col justify-between'>
                      <p className='font-semibold line-clamp-2'>{detail.product_name}</p>
                      <span className='text-sm'>Phân loại hàng 200</span>
                      <span className='text-sm'>*{detail.order_quantity}</span>
                    </div>
                  </div>
                  <div className='flex shrink-0 ml-3 items-center gap-x-4'>
                    <span className='line-through text-gray-500'>₫{parseInt(detail.order_price).toLocaleString()}</span>
                    <span className='text-red-500 font-semibold'>
                      ₫{parseInt(detail.order_total_price).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <div className='flex justify-end font-semibold text-lg mr-3'>
                Tổng tiền: {formatCurrency(element.order_total_amount)}
              </div>
              <div className='flex gap-x-5'>
                <button className='text-white bg-blue  rounded-lg py-3 px-6  '>Mua lại </button>
                <Link to={`/account/order-history/${element.order_id}`}>
                  <button className='text-white bg-blue rounded-lg py-3 px-6'>Xem chi tiết đơn hàng</button>
                </Link>
              </div>
              <Divider
                style={{
                  borderColor: '#7cb305'
                }}
              ></Divider>
            </div>
          )
        })}
      </div>
    </div>
  )
}
// <div className=''>
//         {dataAll?.map((element) => {
//           console.log(element)
//           return (
//             <>
//               <div className='flex mt-7  p-2'>
//                 <div className='flex-shrink-0 w-20 h-20'>
//                   <img
//                     src={element?.order_detail?.product_images}
//                     alt=''
//                     className='w-full h-full rounded-lg object-contain '
//                   />
//                 </div>
//                 <div className='flex flex-grow ml-3'>
//                   <div className='flex flex-col justify-between '>
//                     <p className=' font-semibold line-clamp-2 '>{element.order_detail.product_name}</p>
//                     <span className='text-sm'>Phân loại hàng 200</span>
//                     <span className='text-sm'>*1</span>
//                   </div>
//                 </div>
//                 <div className='flex shrink-0  ml-3  items-center gap-x-4'>
//                   <span className=''>₫102.100</span>
//                   <span className=' mr-1'>₫102.100</span>
//                 </div>
//               </div>
//               <div className='flex justify-end font-semibold text-lg mr-3'>Tổng tiền : ₫102.100</div>
//               <div className='flex gap-x-5'>
//                 <button className='text-white bg-blue  rounded-lg py-3 px-6  '>Mua lại </button>
//                 <Link to={`/account/order-history/${element.order_id}`}>
//                   <button className='text-white bg-blue rounded-lg py-3 px-6'>Xem chi tiết đơn hàng</button>
//                 </Link>
//               </div>

//               <Divider
//                 style={{
//                   borderColor: '#7cb305'
//                 }}
//               ></Divider>
//             </>
//           )
//         })}
//       </div>
