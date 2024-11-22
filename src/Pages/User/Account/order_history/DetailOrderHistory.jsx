import React from 'react'
import { Divider } from 'antd'
import { Descriptions } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import OrderApi from '../../../../Api/user/order'
import { IdcardFilled } from '@ant-design/icons'
export default function DetailOrderHistory() {
  const { slug } = useParams()
  console.log(slug)
  const { data } = useQuery({
    queryKey: ['getDetailOrder', slug],
    queryFn: () => {
      return OrderApi.getDatailCartOrder(slug)
    }
  })
  console.log(data)
  const receiverInfo = [
    {
      key: '1',
      label: 'Tên người nhận',
      children: data?.data?.data?.receiver_name
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: data?.data?.data?.receiver_phone
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: `${data?.data?.data?.receiver_address}, ${data?.data?.data?.ward_name}, ${data?.data?.data?.district_name}, ${data?.data?.data?.province_name}`
    }
  ]

  const orderInfo = [
    {
      key: '1',
      label: 'Mã đơn hàng',
      children: data?.data?.data?.order_id
    },
    {
      key: '2',
      label: 'Phương thức thanh toán',
      children: data?.data?.data?.payment_method_name
    },
    {
      key: '3',
      label: 'Phương thức vận chuyển',
      children: data?.data?.data?.delivery_method_name
    },
    {
      key: '4',
      label: 'Tổng tiền',
      children: `₫${parseFloat(data?.data?.data?.order_total_amount).toLocaleString()}`
    }
  ]
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    const day = String(date.getDate()).padStart(2, '0') // Lấy ngày và thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, '0') // Lấy tháng (0-based nên cần +1)
    const year = date.getFullYear() // Lấy năm
    const hours = String(date.getHours()).padStart(2, '0') // Lấy giờ
    const minutes = String(date.getMinutes()).padStart(2, '0') // Lấy phút

    return `${day}-${month}-${year} ${hours}:${minutes}` // Ghép thành chuỗi định dạng
  }
  return (
    <div className=''>
      <div className='text-xl py-4 px-2 font-semibold'>Chi tiết đơn hàng</div>

      {/* Trạng thái đơn hàng */}
      <div className='bg-slate-300 rounded-lg px-2 py-4'>
        <div className='text-lg semibold '>{data?.data?.data?.delivery_status} đơn hàng</div>
        <div className=''>vào {formatDate(data?.data?.data?.order_updated_at)}</div>
      </div>

      {/* Sản phẩm đã mua */}
      <div className='mt-7'>
        <div className='text-lg p-2 font-semibold'>Sản phẩm đã mua</div>
        {data?.data?.data?.order_detail?.map((item) => {
          const productImages = JSON.parse(item.product_images)
          return (
            <div className='flex p-2 mt-4' key={item.order_detail_id}>
              <div className='flex-shrink-0 w-20 h-20'>
                <img
                  src={productImages[0]} // Hiển thị ảnh đầu tiên
                  alt={item.product_name}
                  className='w-full h-full rounded-lg object-contain'
                />
              </div>
              <div className='ml-3 flex-grow'>
                <div className='flex flex-col justify-between gap-y-1'>
                  <p className='font-semibold'>{item.product_name}</p>
                  <span className='text-sm'>Phân loại hàng: {item.order_quantity}</span>
                  <span className='text-sm'>Số lượng: {item.order_quantity}</span>
                </div>
              </div>
              <div className='flex ml-3 items-center gap-4'>
                <span className='line-through text-gray-500'>₫{parseFloat(item.order_price).toLocaleString()}</span>
                <span className='text-red-500 font-semibold'>
                  ₫{parseFloat(item.order_total_price).toLocaleString()}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <Divider style={{ borderColor: '#7cb305' }} />

      {/* Thông tin người nhận */}
      <div className='p-2'>
        <Descriptions title={<div className='text-lg'>Thông tin người nhận</div>} items={receiverInfo} />
        <div className='mt-2'></div>
        <Descriptions title={<div className='text-lg'>Đơn hàng</div>} items={orderInfo} />
      </div>
    </div>
  )
}
