import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import UpdateAddress from '../../Account/address/component/updateAddressRecieve/UpdateAddress'
import { Divider } from 'antd'
import AddressForm from '../../Account/address/component/createAddress/CreateAddress'
import ModalAddAddress from './ModalAddAddress'

const ModalListAddress = ({
  OpenListAddress,
  setOpenListAddress,
  getAddress,
  title,
  valueAddress,
  setValueAddress
}) => {
  const [isModalOpen2, setIsModalOpen2] = useState(false)

  const handleOk = () => {
    setValueAddress(+value)
    setOpenListAddress(false)
  }
  const handleCancel = () => {
    setValue(+valueAddress)
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
  const handleCancel1 = () => {
    setOpenListAddress(false)
  }
  return (
    <>
      <Modal
        title={title}
        open={OpenListAddress}
        centered
        footer={null}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel1}
      >
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
                      <div className='my-2'>
                        {element.receiver_address +
                          ' , ' +
                          element.ward_name +
                          ' , ' +
                          element.district_name +
                          ' , ' +
                          element.province_name}
                      </div>
                      <span
                        class={`mt-2 rounded-sm px-1 py-[4px] text-xs font-medium   ${'' + valueAddress == element.receiver_address_id ? 'text-[#CE4712] bg-[#FFE0C7]' : ''} `}
                      >
                        {'' + valueAddress == element.receiver_address_id ? 'Mặc định' : ''}
                      </span>
                    </div>
                    <div className='w-[20%]  '>
                      <div className='flex flex-grow justify-end gap-x-5 items-center'>
                        <UpdateAddress receiver_address_id={+element.receiver_address_id} />
                      </div>
                    </div>
                  </div>
                  <Divider Solid />
                </>
              )
            })}
        </>
        <div className=' flex gap-x-10 justify-between '>
          <div className='font-bold '>Thêm địa chỉ</div>
          <div
            className='text-white  '
            onClick={() => {
              setIsModalOpen2(true)
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
          <div className='flex gap-2'>
            <button className='px-3 py-2 bg-blue rounded-lg' onClick={handleCancel}>
              Cancel
            </button>
            <button className='px-3 py-2 bg-blue rounded-lg' onClick={handleOk}>
              Lưu
            </button>
          </div>
        </div>
      </Modal>
      <ModalAddAddress setIsModalOpen1={setIsModalOpen2} isModalOpen1={isModalOpen2} />
    </>
  )
}
export default ModalListAddress
