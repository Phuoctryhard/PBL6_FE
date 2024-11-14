import { BreadCrumbs, AdminTable } from '../'
import { message } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Orders = () => {
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
  // Date format options
  const optionsDateformatFull = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }

  const optionsDateformatShort = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  // Date format
  const DateFormatView = (date) => {
    let formattedDate
    if (/^\d{4}\-\d{2}\-\d{2}$/.test(date)) {
      const [year, month, day] = date.split('-')
      formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-GB', optionsDateformatShort)
    } else formattedDate = new Date(date).toLocaleDateString('en-GB', optionsDateformatFull)
    return `${formattedDate}`
  }

  const DateFormatData = (date) => {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      const [day, month, year] = date.split('/')
      return `${year}-${month}-${day}`
    }

    // Check if the date is in ISO 8601 format
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(date)) {
      const parsedDate = new Date(date)
      const day = String(parsedDate.getDate()).padStart(2, '0')
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = parsedDate.getFullYear()
      return `${year}-${month}-${day}`
    }

    // Check if the date is in the format "Wed Sep 25 2024 00:00:00 GMT+0700 (Indochina Time)"
    if (Date.parse(date)) {
      const parsedDate = new Date(date)
      const day = String(parsedDate.getDate()).padStart(2, '0')
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = parsedDate.getFullYear()
      return `${year}-${month}-${day}`
    }
    return ''
  }

  // Table columns
  const fakeData = {
    order_id: 20,
    user_id: 1,
    receiver_address_id: 4,
    payment_id: 4,
    delivery_id: 4,
    order_total_amount: '520000.00',
    order_status: 'pending',
    payment_status: 'unpaid',
    order_note: null,
    delivery_tracking_number: null,
    order_created_at: '2024-10-07T15:57:42.000000Z',
    order_updated_at: '2024-10-07T15:57:42.000000Z',
    delivery_shipped_at: null,
    user_fullname: 'Hana olala',
    payment_method: 'cash_on_delivery',
    delivery_method: 'AT_PHARMACITY',
    receiver_name: 'Thanh Sơn',
    receiver_phone: '0932112231',
    receiver_address: 'TP HCM'
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'order_id',
      key: 'order_id',
      width: '10%',
      ellipsis: true
    }
  ]
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
      <header className='animate-slideDown'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs
            items={[
              { title: `Orders` },
              {
                title: `List of order`
              }
            ]}
          />
          <p>All orders available in the system</p>
        </div>
      </header>
    </section>
  )
}

export default Orders
