import React from 'react'
import useQueryParams from '../../../hook/useSearchParam'
import { toast } from 'react-toastify'
import paymentAPI from '../../../Api/user/payment'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function VnPay() {
  const useQueryParameter = useQueryParams()
  console.log(useQueryParameter)
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['getPaymentStatus', useQueryParameter],
    queryFn: async () => {
      try {
        const response = await paymentAPI.getPaymentStatus(useQueryParameter)
        // console.log(response)
        return response // Trả về dữ liệu nếu thành công
      } catch (error) {
        // Đảm bảo ném lỗi để react-query kích hoạt onError
        throw error.response || error
      }
    },
    enabled: !!useQueryParameter, // Chỉ chạy khi useQueryParameter có giá trị
    onSuccess: (data) => {
      //  console.log('Dữ liệu đã tải thành công:', data)
      // Thêm các hành động khác nếu cần
      //navigate('/account/order-history') // Chờ 3 giây trước khi chuyển trang
    },
    onError: (error) => {
      // Xử lý lỗi và log chi tiết
      const errorMessage = error?.data?.message || error?.message || 'Lỗi không xác định'
      console.error('Lỗi xảy ra:', errorMessage)
      toast.error(`Thanh toán thất bại: ${errorMessage}`)
    }
  })

  const { data: paymentStatus2 } = useQuery({
    queryKey: ['getPaymentStatus2', useQueryParameter],
    queryFn: async () => {
      try {
        const response = await paymentAPI.getPaymentStatusApi2(useQueryParameter)
        // console.log(response)
        // Kiểm tra xem response có chứa thông báo thành công hay không
        if (response?.data?.status === 200 && response?.data?.messages?.length > 0) {
          // Hiển thị thông báo thành công
          toast.success(response.data.messages[0] || 'Thanh toán thành công')
          navigate('/account/order-history')
        }
        return response // Trả về dữ liệu nếu thành công
      } catch (error) {
        // console.log(error.response.data.messages[0])
        toast.error(error.response.data.messages[0])
        // Đảm bảo ném lỗi để react-query kích hoạt onError
        navigate('/account/order-history') // Chờ 3 giây trước khi chuyển trang
        throw error.response || error
      }
    },
    enabled: !!useQueryParameter, // Chỉ chạy khi useQueryParameter có giá trị
    onSuccess: (data) => {
      // console.log('Dữ liệu đã tải thành công:', data)
      toast.success('Thanh toán thành công')
      navigate('/account/order-history') // Chờ 3 giây trước khi chuyển trang
    },
    onError: (error) => {
      // Xử lý lỗi và log chi tiết
      const errorMessage = error?.data?.message || error?.message || 'Lỗi không xác định'
      // console.error('Lỗi xảy ra:', errorMessage)
      toast.error(`Thanh toán thất bại: ${errorMessage}`)
      navigate('/account/order-history') // Chờ 3 giây trước khi chuyển trang
    }
  })
  return <div></div>
}
