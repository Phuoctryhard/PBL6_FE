import { BreadCrumbs, AdminTable } from '../'
import { message, Dropdown, Popconfirm } from 'antd'
import { DeleteOutlined, DashOutlined } from '@ant-design/icons'
import { Refresh } from 'iconsax-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Add } from 'iconsax-react'
const Illness = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('accesstoken')
  const { logout } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    logout()
    navigate('/admin/login')
  }

  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

  //#region Table data
  const columns = [
    {
      title: '#',
      dataIndex: 'disease_id',
      key: 'disease_id',
      width: '10%',
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'disease_name',
      key: 'disease_name',
      ellipsis: true
    },
    {
      title: 'Symptoms',
      dataIndex: 'symptoms',
      key: 'symptoms',
      ellipsis: true
    },
    {
      title: 'Cause',
      dataIndex: 'cause',
      key: 'cause',
      ellipsis: true
    },
    {
      title: 'Risk subjects',
      dataIndex: 'risk_subjects',
      key: 'risk_subjects',
      ellipsis: true
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Dropdown
          trigger={['click']}
          placement='bottomRight'
          menu={{
            items: [
              {
                key: '3',
                label:
                  record.disease_is_delete === 1 ? (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Restore record ${record.disease_id}`}
                      description='Are you sure to store this record?'
                      onConfirm={() => {}}
                      okText='Restore'
                      cancelText='Cancel'
                    >
                      <button
                        type='button'
                        className='flex items-center gap-x-2 justify-center'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Refresh className='text-[green]' size={15} /> <span>Restore</span>
                      </button>
                    </Popconfirm>
                  ) : (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Delete record ${record.disease_id}`}
                      description='Are you sure to delete this record?'
                      onConfirm={() => {}}
                      okText='Delete'
                      cancelText='Cancel'
                    >
                      <button
                        type='button'
                        className='flex items-center gap-x-2 justify-center'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DeleteOutlined className='text-[14px] text-[red]' />
                        <span>Delete</span>
                      </button>
                    </Popconfirm>
                  )
              }
            ]
          }}
          className='flex justify-center bg-[#fafafa] items-center px-2 rounded-md w-[50px] h-[40px] border-[1px] border-solid border-[#e8ebed]'
        >
          <button type='button' className='flex items-center'>
            <DashOutlined className='text-[15px]' />
          </button>
        </Dropdown>
      )
    }
  ]
  //#endregion

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      openMessage('success', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    } else if (status >= 400) {
      openMessage('error', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])
  //#endregion

  return (
    <section className='w-full'>
      {contextHolder}
      <header className='animate-slideDown flex justify-between'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs
            items={[
              { title: `Diseases` },
              {
                title: `List of diseases`
              }
            ]}
          />
          <p>Summary of common diseases</p>
        </div>
        <button
          className='min-w-[162px] h-[46px] px-[18px] py-[16px] bg-[#F0483E] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px]'
          onClick={() => {}}
        >
          <Add size='20' />
          Add new disease
        </button>
      </header>
    </section>
  )
}

export default Illness
