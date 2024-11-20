import React from 'react'
import { Divider } from 'antd'
import { Descriptions } from 'antd'
export default function DetailOrderHistory() {
  const items = [
    {
      key: '1',
      label: 'UserName',
      children: 'Zhou Maomao'
    },
    {
      key: '2',
      label: 'Telephone',
      children: '1810000000'
    },
    {
      key: '5',
      label: 'Address',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China'
    }
  ]

  const items1 = [
    {
      key: '1',
      label: 'Mã đơn hàng',
      children: '1234569'
    },
    {
      key: '2',
      label: 'Phương thức thanh toán',
      children: '1810000000'
    }
  ]
  return (
    <div className=''>
      <div className='text-xl py-4 px-2 font-semibold'>Chi tiết đơn hàng</div>
      <div className='bg-slate-300 rounded-lg px-2 py-4'>
        <div className='text-lg semibold '> Đã hủy đơn hàng </div>
        <div className=''>vào 11:51 15-11-2024.</div>
      </div>
      <div className='mt-7'>
        <div className='text-lg p-2 font-semibold'>Sản phẩm đã mua</div>
        <div className='flex   p-2'>
          <div className='flex-shrink-0 w-20 h-20'>
            <img
              src='https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0ttvofvosml51_tn'
              alt=''
              className='w-full h-full rounded-lg object-contain '
            />
          </div>
          <div className='  ml-3 flex-grow'>
            <div className='flex flex-col justify-between gap-y-1'>
              <p className=' font-semibold  '>
                Thùng 200 cái Khẩu Trang 5D KENKI THÁI LAN kháng Khuẩn Chống Tia UV cao cấp
              </p>
              <span className='text-sm'>Phân loại hàng 200</span>
              <span className='text-sm'>*1</span>
            </div>
          </div>
          <div className='flex   ml-3  items-center gap-4'>
            <span className=''>₫102.100</span>
            <span className=' mr-1'>₫102.100</span>
          </div>
        </div>
      </div>
      <Divider
        style={{
          borderColor: '#7cb305'
        }}
      ></Divider>
      <div className='p-2'>
        <Descriptions title={<div className='text-lg'>Thông tin người nhận</div>} items={items} />
        <div className='mt-2'></div>
        <Descriptions title={<div className='text-lg '>Đơn hàng</div>} items={items1} />
      </div>
    </div>
  )
}
