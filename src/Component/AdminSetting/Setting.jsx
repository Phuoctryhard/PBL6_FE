import './Setting.css'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight2, Add, SearchNormal, Edit, Refresh, Eye, ArrowDown2, Personalcard } from 'iconsax-react'
import { Link } from 'react-router-dom'
import {
  Table,
  Breadcrumb,
  Dropdown,
  Popconfirm,
  message,
  Modal,
  Tooltip,
  Pagination,
  Spin,
  DatePicker,
  ConfigProvider,
  Select
} from 'antd'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
const AdminSetting = () => {
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')
  return (
    <section className='w-full max-w-[100%] h-full'>
      <header className='flex justify-between'>
        <div className='Breadcrumb animate-[slideLeftToRight_1s_ease]'>
          <h1>
            <Breadcrumb
              separator={<ArrowRight2 size='15' color='#1D242E' />}
              className='font-bold text-[#848A91]'
              items={[{ title: 'Settings' }]}
            ></Breadcrumb>
          </h1>
        </div>
      </header>
      <div className='mt-10 flex gap-x-6'>
        <div className='w-[380px] bg-[#ffffff] rounded-xl h-[440px] border-[1px] border-solid border-[rgb(232, 235, 238)] py-[28px] px-[75px]'>
          <div className='information_box flex flex-col gap-y-6 items-center justify-center w-[100%]'>
            <img
              src='/assets/images/person.png'
              alt='setting'
              className='w-40 h-40 rounded-full border border-dashed border-[rgb(102, 181, 163)] object-cover'
            />
            <div className='gap-2 flex flex-col justify-center items-center w-full'>
              <span className='text-sm font-semibold'>Minh đẹp trai</span>
              <span className='text-xs text-[rgb(160,160,160)]'>minh32405@gmail.com</span>
              <span className='text-xs text-[#d6b80d]'>super admin</span>
            </div>
            <div className='w-full text-lg flex flex-col gap-4'>
              <button
                type='button'
                className='p-4 rounded w-full flex justify-start items-center text-xs whitespace-nowrap gap-4'
                style={{
                  backgroundColor: 'rgb(0, 143, 153, 0.1)'
                }}
              >
                <Personalcard color='rgb(0, 143, 153)' size={16} />
                <span
                  style={{
                    color: 'rgb(0, 143, 153)'
                  }}
                >
                  Personal information
                </span>
              </button>
              <button
                type='button'
                className='p-4 rounded w-full flex justify-start items-center text-xs whitespace-nowrap gap-4'
                style={{
                  backgroundColor: 'rgb(0, 143, 153, 0.1)'
                }}
              >
                <Personalcard color='rgb(0, 143, 153)' size={16} />
                <span
                  style={{
                    color: 'rgb(0, 143, 153)'
                  }}
                >
                  Change password
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='w-[780px] bg-[#ffffff] rounded-xl h-[100vh] border-[1px] border-solid border-[rgb(232, 235, 238)]'></div>
      </div>
    </section>
  )
}

export default AdminSetting
