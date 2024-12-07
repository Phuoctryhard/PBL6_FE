import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useQuery, useMutation } from '@tanstack/react-query'
import AddressApi from '../../Api/user/address'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ModalComponent = ({ svgElement, receiver_address_id, queryClient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  // Mutations
  const mutation = useMutation({
    mutationFn: AddressApi.deleteAddress_receive
  })

  const handleOk = (receiver_address_id) => {
    mutation.mutate(receiver_address_id, {
      onSuccess: () => {
        toast.success('Xóa thành công')
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['getAddress'] })
      },
      onError: (data) => {
        toast.error(data?.response?.data?.messages[0])
      }
    })
    setIsModalOpen(false)
  }
  const handleCancel = () => {
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
        onOk={() => handleOk(receiver_address_id)}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa địa chỉ này?</p>
      </Modal>
    </>
  )
}
export default ModalComponent
