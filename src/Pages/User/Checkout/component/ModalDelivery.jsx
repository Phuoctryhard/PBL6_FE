import React, { useState, useEffect } from 'react'
import { Button, Modal, Divider } from 'antd'
export default function ModalDelivery({
  isModalDelivery,
  setModalDelivery,
  getDelivery,
  valueDelivery,
  setvalueDelivery,
  setPriceDelivery
}) {
  const handleOk = () => {
    setvalueDelivery(value)
    const { delivery_fee } = getDelivery?.data?.data.find((element) => {
      return +element.delivery_method_id === value
    })
    setPriceDelivery(+delivery_fee)
    setModalDelivery(false)
  }
  const handleCancel = () => {
    setValue(valueDelivery)
    setModalDelivery(false)
  }
  const [value, setValue] = useState(valueDelivery)
  useEffect(() => {
    if (valueDelivery) {
      setValue(valueDelivery)
    }
  }, [valueDelivery])
  const handleUpdateDelivery = (e) => {
    setValue(+e.target.value)
  }
  return (
    <Modal title='Phương thức vận chuyển' open={isModalDelivery} onOk={handleOk} onCancel={handleCancel}>
      <>
        {getDelivery &&
          getDelivery.data?.data.map((element) => {
            return (
              <>
                <div key={element.delivery_method_id} className='flex flex-col md:flex-row mt-3'>
                  <div className='w-[100%]'>
                    <div className='my-2 flex items-center gap-2'>
                      <input
                        type='radio'
                        className='w-4 h-4 border border-gray-300 rounded-full'
                        value={element.delivery_method_id}
                        checked={value === element.delivery_method_id}
                        onChange={(e) => handleUpdateDelivery(e)}
                      />
                      <span className='font-bold'>{element.delivery_method_name}</span>
                    </div>
                    <div className='my-2'>
                      {' '}
                      Dự kiến giao hàng:{element.delivery_method_description} không bao gồm thứ 7, chủ nhật
                    </div>
                  </div>
                  <div className='w-[20%] flex justify-end items-center gap-x-5'></div>
                </div>
                <Divider />
              </>
            )
          })}
      </>
    </Modal>
  )
}
