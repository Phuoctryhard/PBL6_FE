import React, { useState } from 'react'
import { Modal } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartAPI from '../../../Api/user/cart'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
export default function Cart({ data }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [modalText, setModalText] = useState('Bạn có chắc chắn muốn xóa sản phẩm này?')
  const showModal = () => {
    setOpen(true)
  }
  const queryClient = useQueryClient()
  const handleDelete = (id) => {
    mutate.mutate(id, {
      onSuccess: () => {
        toast.success('Xóa sản phẩm thành công !')
        queryClient.invalidateQueries({ queryKey: ['getCart'] })
        setTimeout(() => {
          navigate('/cart')
        }, 2000) // 1000ms = 1 giây
      },
      onError() {
        console.log('Thấtbai ')
        toast.error('Fail !')
      }
    })
  }
  const handleOk = (id) => {
    handleDelete(id)
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const mutate = useMutation({
    mutationFn: CartAPI.deleteCart
  })

  return (
    <div className='px-24'>
      <div className='grid grid-cols-9 pt-5 gap-x-5 '>
        <div className='col-span-6'>
          <div className='flex justify-between '>
            <div className='text-2xl font-semibold'>Giỏ hàng 5 </div>
            <button className='text-[#0070e0] hover:text-black'>Xóa</button>
          </div>
          <div className=''>
            <div class='w-full max-w-4xl mx-auto my-4 border rounded-lg shadow'>
              <div class='flex items-center border-b p-4 bg-gray-100'>
                <input type='checkbox' class='mr-4' />
                <div class='w-1/2 font-semibold '>Sản phẩm</div>
                <div class='w-1/6 font-semibold text-center'>Số lượng</div>
                <div class='w-1/6 font-semibold  text-center'>Đơn giá</div>
                <div class='w-1/6 font-semibold text-center'>Thành tiền</div>
              </div>
              {/*Product List cart */}

              {data?.data?.data ? (
                data.data.data.map((element) => {
                  return (
                    <div class='flex items-center p-4'>
                      <input type='checkbox' class='mr-4' />
                      <div class='w-1/2 flex items-center justify-between'>
                        <img src={element.product_images[0]} alt='product image' class='w-16 h-16   ' />
                        <div>
                          <p class='font-semibold'>{element.product_name}</p>
                          <p class='text-gray-500 text-sm'>Chai</p>
                          <p class='text-yellow-600 bg-yellow-100 rounded px-2 inline-block mt-1 text-sm'>
                            Mua 1 Tặng 1 - (01-31/10)
                          </p>
                          <p class='text-yellow-600 bg-yellow-100 rounded px-2 inline-block mt-1 text-sm'>
                            Giao Nhanh 2H bởi Ahamove
                          </p>
                        </div>
                      </div>
                      <div class='w-1/6 text-center pl-6'>{element.cart_price}</div>
                      <div class='w-1/6 flex text-center justify-end pr-3'>
                        <button class='px-2 py-1 text-lg text-gray-500 border rounded-l'>-</button>
                        <input class='  p-2 w-6 outline-none' value={element.cart_quantity} />
                        <button class='px-2 py-1 text-lg text-gray-500 border rounded-r'>+</button>
                      </div>
                      <div class='w-1/6 text-right pr-4'>{element.cart_price * element.cart_quantity} đ</div>
                      <span
                        class=' inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-6'
                        onClick={() => showModal(element.cart_id)}
                      >
                        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M18.4 5.03128H15.7333V4.49795C15.7333 3.61571 15.0156 2.89795 14.1333 2.89795H9.86668C8.98444 2.89795 8.26668 3.61571 8.26668 4.49795V5.03128H5.60001C4.71777 5.03128 4.00002 5.74904 4.00002 6.63128C4.00002 7.33983 4.46313 7.94189 5.10241 8.15167L6.0537 19.6352C6.12222 20.4579 6.82259 21.1024 7.64815 21.1024H16.3519C17.1775 21.1024 17.8778 20.4579 17.9464 19.635L18.8976 8.15163C19.5369 7.94189 20 7.33983 20 6.63128C20 5.74904 19.2822 5.03128 18.4 5.03128ZM9.33334 4.49795C9.33334 4.20387 9.5726 3.96461 9.86668 3.96461H14.1333C14.4274 3.96461 14.6667 4.20387 14.6667 4.49795V5.03128H9.33334V4.49795ZM16.8833 19.5467C16.8605 19.8209 16.6271 20.0357 16.3519 20.0357H7.64815C7.37299 20.0357 7.13953 19.8209 7.11674 19.5469L6.17936 8.23128H17.8207L16.8833 19.5467ZM18.4 7.16461H5.60001C5.30593 7.16461 5.06668 6.92536 5.06668 6.63128C5.06668 6.3372 5.30593 6.09795 5.60001 6.09795H18.4C18.6941 6.09795 18.9333 6.3372 18.9333 6.63128C18.9333 6.92536 18.6941 7.16461 18.4 7.16461Z'
                            fill='currentColor'
                          ></path>
                          <path
                            d='M9.86575 18.4026L9.33242 9.79821C9.31418 9.5042 9.0597 9.28059 8.76712 9.2989C8.47311 9.31714 8.24957 9.57022 8.26778 9.8642L8.80111 18.4687C8.81864 18.7514 9.05345 18.969 9.33291 18.969C9.64178 18.969 9.8847 18.7089 9.86575 18.4026Z'
                            fill='currentColor'
                          ></path>
                          <path
                            d='M12 9.29785C11.7055 9.29785 11.4667 9.53664 11.4667 9.83118V18.4356C11.4667 18.7302 11.7055 18.969 12 18.969C12.2946 18.969 12.5334 18.7302 12.5334 18.4356V9.83118C12.5334 9.53664 12.2946 9.29785 12 9.29785Z'
                            fill='currentColor'
                          ></path>
                          <path
                            d='M15.233 9.29889C14.9396 9.28065 14.6859 9.50419 14.6677 9.7982L14.1343 18.4026C14.1162 18.6966 14.3397 18.9497 14.6337 18.9679C14.9278 18.9861 15.1808 18.7625 15.199 18.4686L15.7323 9.86419C15.7505 9.57018 15.527 9.3171 15.233 9.29889Z'
                            fill='currentColor'
                          ></path>
                        </svg>
                      </span>
                      <Modal
                        title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Xóa sản phẩm</span>}
                        open={open}
                        onOk={() => handleOk(element.cart_id)}
                        onCancel={handleCancel}
                      >
                        <p className='mt-2 text-lg'> {modalText}</p>
                      </Modal>
                    </div>
                  )
                })
              ) : (
                <div>No items in cart.</div>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-3  '>
          <div className='flex  flex-col justify-between   '>
            <div className='flex justify-between border border-2 py-3 px-2'>
              <div className='flex items-center'>
                <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M2 5.54541C2 5.1312 2.33579 4.79541 2.75 4.79541H21.25C21.6642 4.79541 22 5.1312 22 5.54541V9.74996C22 10.1642 21.6642 10.5 21.25 10.5C20.2347 10.5 19.4773 11.2574 19.4773 12.2727C19.4773 13.288 20.2347 14.0454 21.25 14.0454C21.6642 14.0454 22 14.3812 22 14.7954V19C22 19.4142 21.6642 19.75 21.25 19.75H2.75C2.33579 19.75 2 19.4142 2 19V14.7954C2 14.3812 2.33579 14.0454 2.75 14.0454C3.76533 14.0454 4.52273 13.288 4.52273 12.2727C4.52273 11.2574 3.76533 10.5 2.75 10.5C2.33579 10.5 2 10.1642 2 9.74996V5.54541ZM3.5 6.29541V9.08182C4.9672 9.40982 6.02273 10.6881 6.02273 12.2727C6.02273 13.8573 4.9672 15.1355 3.5 15.4635V18.25H20.5V15.4635C19.0328 15.1355 17.9773 13.8573 17.9773 12.2727C17.9773 10.6881 19.0328 9.40982 20.5 9.08182V6.29541H3.5Z'
                    fill='currentColor'
                  ></path>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M15.053 9.21967C15.3459 9.51256 15.3459 9.98744 15.053 10.2803L10.0076 15.3258C9.71467 15.6187 9.2398 15.6187 8.9469 15.3258C8.65401 15.0329 8.65401 14.558 8.9469 14.2651L13.9924 9.21967C14.2853 8.92678 14.7601 8.92678 15.053 9.21967Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M9.89772 10.5908C10.5943 10.5908 11.1591 10.0261 11.1591 9.32948C11.1591 8.63285 10.5943 8.06812 9.89772 8.06812C9.20108 8.06812 8.63635 8.63285 8.63635 9.32948C8.63635 10.0261 9.20108 10.5908 9.89772 10.5908Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M14.1023 16.4771C14.7989 16.4771 15.3637 15.9123 15.3637 15.2157C15.3637 14.5191 14.7989 13.9543 14.1023 13.9543C13.4057 13.9543 12.8409 14.5191 12.8409 15.2157C12.8409 15.9123 13.4057 16.4771 14.1023 16.4771Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <div className='font-semibold ml-1'>Khuyến mãi</div>
              </div>
              <div className='text-blue hover:text-black'>Chọn mã</div>
            </div>

            <div className='border border-2 py-3 px-2 mt-3'>
              <div className='flex justify-between mt-2  py-3 px-2  '>
                <div className=''>Tạm tính </div>

                <div className='font-semibold'>415.000 đ</div>
              </div>
              <div className='flex justify-between py-3 px-2  '>
                <div className=''>Giảm giá ưu đãi </div>

                <div className=''>-</div>
              </div>

              <div className='flex justify-between  py-3 px-2  '>
                <div className=''>Giảm giá sản phẩm </div>

                <div className='font-semibold'>- 415.000 đ</div>
              </div>
              <div className='border border-1'></div>

              <div className='flex justify-between  py-3 px-2  my-1 '>
                <div className='font-semibold '>Tổng tiền </div>

                <div className='text-[#F22121] font-semibold'>415.000 đ</div>
              </div>
              <div className='flex mt-2 '>
                <button className='text-white font-medium text-2xl bg-[#1A51A2] px-4 py-2  rounded-lg w-full'>
                  Mua hàng{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
