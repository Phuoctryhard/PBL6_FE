import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import UpdateAddress from '../../Account/address/component/updateAddressRecieve/UpdateAddress'
import { Divider } from 'antd'
import AddressForm from '../../Account/address/component/createAddress/CreateAddress'

const ModalListAddress = ({
  OpenListAddress,
  setOpenListAddress,
  getAddress,
  title,
  valueAddress,
  setValueAddress
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setValueAddress(+value)
    setOpenListAddress(false)
  }
  const handleCancel = () => {
    setOpenListAddress(false)
  }
  const handleUpdateAddress = (e) => {
    setValue(e.target.value)
  }
  const [value, setValue] = useState()
  useEffect(() => {
    if (valueAddress) {
      setValue(valueAddress)
    }
  }, [valueAddress])
  return (
    <>
      <Modal title={title} open={OpenListAddress} onOk={handleOk} onCancel={handleCancel} centered>
        <>
          {getAddress &&
            getAddress?.data?.data.map((element) => {
              return (
                <>
                  <div className='flex flex-col md:flex-row mt-3  '>
                    <div className='w-[80%]'>
                      <div className='my-2 flex items-center gap-2 '>
                        <input
                          type='radio'
                          class=' w-4 h-4 border border-gray-300 rounded-full'
                          value={element.receiver_address_id}
                          checked={value == element.receiver_address_id}
                          onChange={(e) => {
                            handleUpdateAddress(e)
                          }}
                        />
                        <span className='font-bold'>{element.receiver_name}</span>
                        <span className='mx-2'>|</span>
                        <span>{element.receiver_phone}</span>
                      </div>
                      <div className='my-2'>{element.receiver_address}nh</div>
                      <span class='mt-2 rounded-sm px-1 py-[4px] text-xs font-medium text-[#CE4712] bg-[#FFE0C7]'>
                        {'' + valueAddress == element.receiver_address_id ? 'Mặc định' : ''}
                      </span>
                    </div>
                    <div className='w-[20%]  '>
                      <div className='flex flex-grow justify-end gap-x-5 items-center'>
                        <UpdateAddress />
                      </div>
                    </div>
                  </div>
                  <Divider Solid />
                </>
              )
            })}
        </>
        <div className=' flex gap-x-10'>
          <div className='font-bold'>Thêm địa chỉ</div>
          <div
            className='text-white  '
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6 bg-[#1A51A2] rounded-full'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </div>
        </div>
      </Modal>

      <Modal title='Địa chỉ mới' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <>
          <AddressForm closeModal={() => setIsModalOpen(false)} />
        </>
      </Modal>
    </>
  )
}
export default ModalListAddress
