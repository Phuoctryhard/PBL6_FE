import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import useQueryParams from '../../../hook/useSearchParam'
import { useMutation } from '@tanstack/react-query'
import OrderApi from '../../../Api/user/order'
import { toast } from 'react-toastify'

export default function StatusPayos() {
  const navigate = useNavigate()
  const { status, orderCode } = useQueryParams()
  const cancelPayment = useMutation({
    mutationFn: OrderApi.OrdersPayos
  })
  // Sử dụng useEffect để kiểm soát việc gọi mutate
  useEffect(() => {
    if (status === 'CANCELLED' && orderCode) {
      console.log('Status:', status, 'Order Code:', orderCode)
      cancelPayment.mutate(orderCode, {
        onSuccess: (data) => {
          console.log(data)
          toast.success('Hủy đơn hàng thành công')
          setTimeout(() => {
            navigate('/account/order-history') // Chờ 3 giây trước khi chuyển trang
          }, 5000)
        }
      })
    } else {
      toast.success('Thanh toán đơn hàng thành công')
      navigate('/account/order-history') // Chờ 3 giây trước khi chuyển trang
    }
  }, []) // Chỉ chạy khi status hoặc orderCode thay đổi

  return <div>StatusPayos</div>
}
