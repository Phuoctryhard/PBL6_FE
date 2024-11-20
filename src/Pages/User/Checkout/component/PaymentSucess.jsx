import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
const ModalPaymentSucess = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const navigate = useNavigate()
  return (
    <>
      <Modal
        onCancel={handleCancel}
        title={<span className='text-xl font-semibold text-gray-800'>Trạng thái</span>}
        open={isModalOpen}
        footer={() => <div></div>}
      >
        <div className='flex justify-center items-center flex-col'>
          <svg
            width='120'
            height='120'
            viewBox='0 0 120 120'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='border rounded-full shadow-sm'
          >
            <path
              d='M52.8992 77.9C51.8992 77.9 50.9492 77.5 50.2492 76.8L36.0992 62.65C34.6492 61.2 34.6492 58.8 36.0992 57.35C37.5492 55.9 39.9492 55.9 41.3992 57.35L52.8992 68.85L78.5992 43.15C80.0492 41.7 82.4492 41.7 83.8992 43.15C85.3492 44.6 85.3492 47 83.8992 48.45L55.5492 76.8C54.8492 77.5 53.8992 77.9 52.8992 77.9Z'
              fill='#146C43'
            />
          </svg>
          <div className='text-[#146C43] text-2xl mt-4'>Successful Payment</div>
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => {
              //window.history.replaceState(null, '', '/checkout')
              navigate('/account/order-history')
            }}
            className=' text-white py-2 px-4 rounded-lg bg-[#0C68F4] text-base mt-4'
          >
            Order Status
          </button>
        </div>
      </Modal>
    </>
  )
}
export default ModalPaymentSucess
