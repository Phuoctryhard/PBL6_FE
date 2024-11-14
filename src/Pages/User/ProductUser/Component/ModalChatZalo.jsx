import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import Logo from './Logo.jpg'
import Zalo from './zalo.jpg'
const ModalChatZalo = ({ OpenModalChat, setOpenModalChat }) => {
  const showModal = () => {
    setOpenModalChat(true)
  }
  const handleOk = () => {
    setOpenModalChat(false)
  }
  const handleCancel = () => {
    setOpenModalChat(false)
  }
  return (
    <>
      <Modal title='Nhắn tin với dược sĩ' open={OpenModalChat} onOk={handleOk} onCancel={handleCancel}>
        <div className='p-4'>
          {/* Phần thông tin nhà thuốc */}
          <div className='flex gap-4 items-center'>
            <div className='w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-gray-200'>
              <img src={Logo} alt='' className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col'>
              <span className='text-2xl font-bold text-gray-800'>Nhà thuốc Pbl6</span>
              <button className='mt-2 px-4 py-2 bg-blue rounded-lg font-semibold shadow-lg hover:bg-blue'>
                Nhắn tin
              </button>
            </div>
          </div>

          {/* Phần hình ảnh Zalo */}
          <div className='flex justify-center mt-6'>
            <img src={Zalo} alt='' className='w-[40%] h-[40%] object-contain rounded-md shadow-md' />
          </div>

          {/* Thông tin thêm */}
          <div className='mt-6 p-4 bg-gray-100 rounded-lg text-gray-700'>
            <p className='text-center font-medium'>
              Gọi cho dược sĩ là dịch vụ hoàn toàn <span className='text-green-600 font-semibold'>miễn phí</span>
            </p>
            <p className='mt-2 text-sm text-center'>
              <span className='font-semibold text-red-500'>Lưu ý:</span> Thời gian làm việc của dịch vụ dược sĩ trực
              tuyến là từ
              <span className='font-semibold'> 07h00 - 22h00 </span> hàng ngày.
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default ModalChatZalo
