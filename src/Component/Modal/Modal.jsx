import React, { useState } from 'react'
import { Button, Modal } from 'antd'
const ModalComponent = ({ svgElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    console.log('Xóa oki')
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    console.log('huy oki')
    setIsModalOpen(false)
  }
  return (
    <>
      <button onClick={showModal}>
        {svgElement} {/* Chèn SVG vào Button */}
      </button>
      <Modal
        title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Xóa địa chỉ</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa địa chỉ này?</p>
      </Modal>
    </>
  )
}
export default ModalComponent
