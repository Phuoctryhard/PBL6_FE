import React from 'react'
import AddressForm from '../../Account/address/component/createAddress/CreateAddress'
import { Modal } from 'antd'

export default function ModalAddAddress({ setIsModalOpen1, isModalOpen1 }) {
  const handleCancel1 = () => {
    console.log('oi')
    setIsModalOpen1(false)
  }
  const handleOk1 = () => {
    console.log('oi')
    setIsModalOpen1(false)
  }
  return (
    <div>
      {' '}
      <Modal title='Địa chỉ mới ' open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} footer={null} >
        <>
          <AddressForm closeModal={() => setIsModalOpen1(false)} />
        </>
      </Modal>
    </div>
  )
}
