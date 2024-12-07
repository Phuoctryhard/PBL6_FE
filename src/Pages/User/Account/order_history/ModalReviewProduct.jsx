import React, { useRef, useState } from 'react'
import { Button, Flex, Modal } from 'antd'

import TextArea from 'antd/es/input/TextArea'
import {
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import ReviewAPI from '../../../../Api/user/review'
import { toast } from 'react-toastify'
import productAPI from '../../../../Api/user/product'
export default function ModalReviewProduct({
  isModalOpen,
  setIsModalOpen,
  setIdOrder,
  setIdProduct,
  IdOrder,
  IdProduct
}) {
  const desc = ['1', '2', '3', '4', '5']
  const [value, setValue] = useState(0)
  const [reviewText, setReviewText] = useState('') // Nội dung đánh giá
  const [fileList, setFileList] = useState([]) // Danh sách file hình ảnh
  const { data: getdetailProduct } = useQuery({
    queryKey: ['detailProduct', IdProduct],
    queryFn: () => productAPI.getProductById(IdProduct)
    // enabled: !!IdProduct // Chỉ gọi API khi IdProduct có giá trị hợp lệ
  })
  const mutateAddReview = useMutation({
    mutationFn: ReviewAPI.getAddReviewProduct,
    onSuccess: (data) => {
      console.log(data)
      toast.success(data?.data?.messages[0])

      setValue(0)
      setReviewText('')
      setFileList([])
      // Clear input file
      fileInputRef.current.value = null
      setIdOrder('')
      setIdProduct('')
      setIsModalOpen(false)
    },
    onError: (error) => {
      console.log(error)
      toast.error(error?.response?.data?.messages[0])
    }
  })
  const handleOk = () => {
    const formData = new FormData()
    // Thêm các trường văn bản vào FormData
    formData.append('order_id', IdOrder)
    formData.append('product_id', IdProduct)
    formData.append('review_rating', value)
    formData.append('review_comment', reviewText)
    // Thêm các tệp tin vào FormData
    fileList.forEach((file, index) => {
      console.log(file)
      formData.append('review_images[]', file) // Thêm tệp với định dạng mảng
    })
    // console.log(formData)

    // Kiểm tra dữ liệu trong FormData
    // console.log(Object.fromEntries(formData))
    mutateAddReview.mutate(formData)
  }

  const handleCancel = () => {
    setValue(0)
    setReviewText('')
    setIdProduct('')
    setIdOrder('')
    setFileList([])
    // Clear input file
    fileInputRef.current.value = null
    setIsModalOpen(false)
  }

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value)
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    const maxFiles = 3 // Số tệp tối đa mà bạn muốn cho phép

    if (fileList.length > maxFiles) {
      alert(`Bạn chỉ có thể chọn tối đa ${maxFiles} ảnh.`)
      e.target.value = '' // Xóa giá trị input để người dùng có thể chọn lại
    } else {
      // Xử lý tệp đã chọn
      // console.log(files)
      setFileList([...fileList, ...files])
    }
  }
  const fileInputRef = useRef(null)
  console.log(getdetailProduct?.data?.data)
  return (
    <Modal title='Đánh giá sản phẩm' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>
      <div className='flex mt-7 p-2' key={''}>
        {getdetailProduct?.data?.data && (
          <>
            <div className='flex-shrink-0 w-16 h-16'>
              <img
                src={getdetailProduct?.data?.data?.product_images[0]} // Lấy ảnh đầu tiên từ mảng `product_images`
                alt={''}
                className='w-full h-full rounded-lg object-contain'
              />
            </div>
            <div className='flex flex-grow ml-3'>
              <div className='flex flex-col justify-between'>
                <p className='font-semibold line-clamp-2'>{getdetailProduct?.data?.data?.product_name}</p>
                <span className='text-sm'>{getdetailProduct?.data?.data?.product_uses}</span>
                <span className='text-sm'>{getdetailProduct?.data?.data?.product_price}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='mt-1'>
        <h1 className='py-2'>Đánh giá sản phẩm</h1>

        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-3xl cursor-pointer ${star <= value ? 'text-yellow' : 'text-gray-400'}`}
            onClick={() => setValue(star)}
          >
            ★
          </span>
        ))}
      </div>
      <div className='mt-2'>
        <div className='py-4'>Thêm tối đa 3 hình ảnh </div>

        <input
          type='file'
          multiple
          onChange={handleFileChange}
          accept='image/jpeg, png, jpg, gif, svg, webp'
          ref={fileInputRef}
        />
      </div>

      <div className='mt-2 '>
        <div className='py-3'>Viết đánh giá </div>
        <textarea
          value={reviewText}
          onChange={handleReviewTextChange}
          placeholder='Chia sẻ đánh giá của bạn về sản phẩm'
          className='w-full p-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow focus:border-yellow'
        ></textarea>
      </div>
    </Modal>
  )
}
//Điều này cho phép người dùng chỉ chọn các file hình ảnh (JPEG, PNG, GIF, v.v.).
