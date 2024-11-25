import { BreadCrumbs, AdminTable } from '../'
import { message, Dropdown, Tooltip, Select, ConfigProvider } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AdminOrderApi, AdminDeliveryAPI, AdminPaymentApi } from '../../Api/admin'
import { Eye, Edit, SearchNormal, ArrowDown2, Setting } from 'iconsax-react'
import { DashOutlined } from '@ant-design/icons'

const filterTheme = {
  token: {
    colorTextQuaternary: '#1D242E',
    colorTextPlaceholder: '#9da4b0',
    fontFamily: 'Poppins, sans-serif',
    controlOutline: 'none',
    colorBorder: '#e8ebed',
    borderRadius: '4px',
    colorPrimary: '#008f99'
  },
  components: {
    Select: {
      activeBorderColor: '#1D242E',
      hoverBorderColor: '#1D242E',
      optionActiveBg: 'rgb(0, 143, 153, 0.3)',
      optionSelectedBg: 'rgb(0, 143, 153, 0.3)',
      optionSelectedColor: '#1D242E'
    },
    TreeSelect: {
      nodeHoverBg: 'rgb(0, 143, 153, 0.3)',
      nodeSelectedBg: 'rgb(0, 143, 153, 0.3)'
    },
    DatePicker: {
      activeBorderColor: '#1D242E',
      hoverBorderColor: '#1D242E'
    }
  }
}
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

  //#region Filter data
  const [searchValue, setSearchValue] = useState('')
  const [paymentMethod, setPaymentMethod] = useState()
  const [deliveryMethod, setDeliveryMethod] = useState()
  const [selectedOrderStatus, setSelectedOrderStatus] = useState()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState()
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState()
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState()
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState()
  const [selectedFrom, setSelectedFrom] = useState()
  const [selectedTo, setSelectedTo] = useState()
  //#endregion

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
  const columns = [
    {
      title: '#',
      dataIndex: 'order_id',
      key: 'order_id',
      width: '5%',
      sorter: (a, b) => a.order_id - b.order_id,
      ellipsis: true
    },
    {
      title: 'User',
      dataIndex: 'user_fullname',
      key: 'user_fullname',
      sorter: (a, b) => a.user_fullname.localeCompare(b.user_fullname),
      width: '15%',
      ellipsis: true,
      render: (text, record) => (
        <Tooltip
          title={
            <div className='flex items-center gap-x-2 justify-start'>
              <img src={record.user_avatar} alt={text} className='w-[48px] h-[48px] object-cover rounded-full' />
              <span>{text}</span>
            </div>
          }
          color='#2d3748'
          key={record.order_id}
          trigger={['hover']}
        >
          <div className='flex items-center gap-x-2 justify-start'>
            <img src={record.user_avatar} alt={text} className='w-[48px] h-[48px] object-cover rounded-full' />
            <span>{text}</span>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      key: 'receiver',
      sorter: (a, b) => a.receiver_name.localeCompare(b.receiver_name),
      ellipsis: true,
      width: '15%',
      render: (text, record) => (
        <Tooltip
          title={
            <div className='flex flex-col gap-1 justify-start items-start'>
              <span>Name: {record.receiver_name}</span>
              <span>Contact: {record.receiver_phone}</span>
              <span>
                Address: {record.receiver_address}, {record.ward_name}, {record.district_name}, {record.province_name}
              </span>
            </div>
          }
          color='#2d3748'
          key={record.order_id}
          trigger={['hover']}
        >
          <div className='flex flex-col gap-1 justify-start items-start'>
            <span>{record.receiver_name}</span>
            <span>{record.receiver_phone}</span>
            <span>
              {record.receiver_address}, {record.ward_name}, {record.district_name}, {record.province_name}
            </span>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Order Status',
      dataIndex: 'order_status',
      key: 'order_status',
      sorter: (a, b) => a.order_status.localeCompare(b.order_status),
      ellipsis: true,
      render: (text, record) => {
        let color
        let backgroundColor
        let borderColor
        let status = record.order_status
        switch (status) {
          case 'completed':
            color = '#065F46'
            backgroundColor = '#D1FAE5'
            borderColor = '#6EE7B7'
            break
          case 'cancelled':
            borderColor = '#FCA5A5'
            backgroundColor = '#FEE2E2'
            color = '#991B1B'
            break
          case 'delivered':
            borderColor = '#D1D5DB'
            backgroundColor = '#F3F4F6'
            color = '#1F2937'
            break
          case 'shipped':
            color = '#92400E'
            borderColor = '#FCD34D'
            backgroundColor = '#FEF3C7'
            break
          case 'pending':
            color = '#1E40AF'
            backgroundColor = '#DBEAFE'
            borderColor = '#93C5FD'
            break
        }
        return (
          <span
            style={{ color, backgroundColor, border: `1px solid ${borderColor}` }}
            className='inline-block justify-center items-center py-[2px] px-[10px] rounded whitespace-nowrap text-xs'
          >
            {status}
          </span>
        )
      }
    },
    {
      title: 'Payment',
      dataIndex: 'payment_method_name',
      key: 'payment_method_name',
      sorter: (a, b) => a.payment_method_name.localeCompare(b.payment_method_name),
      filters: paymentMethod,
      onFilter: (value, record) => record.payment_method_name.indexOf(value) === 0,
      ellipsis: true
    },
    {
      title: 'Delivery Method',
      dataIndex: 'delivery_method_name',
      key: 'delivery_method_name',
      sorter: (a, b) => a.delivery_method_name.localeCompare(b.delivery_method_name),
      filters: deliveryMethod,
      onFilter: (value, record) => record.delivery_method_name.indexOf(value) === 0,
      ellipsis: true
    },
    {
      title: 'Total',
      dataIndex: 'order_total_amount',
      key: 'order_total_amount',
      sorter: (a, b) => a.order_total_amount - b.order_total_amount,
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
                key: '1',
                label: (
                  <Link className='flex items-center gap-x-2 justify-center' to={`/admin/orders/${record.order_id}`}>
                    <Eye className='text-[green]' size={15} />
                    <span>View</span>
                  </Link>
                )
              },
              {
                key: '3',
                label: (
                  <button type='button' className='flex items-center gap-x-2 justify-center' onClick={() => {}}>
                    <Edit className='text-[#bc9143]' size={15} />
                    <span>Edit</span>
                  </button>
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

  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })

  const handleTableChange = (pagination, filters, sorter) => {
    const params = {
      pagination,
      filters,
      sortOrder: sorter ? sorter.order : undefined,
      sortField: sorter ? sorter.field : undefined
    }
    setTableParams(params)
  }

  const handleResponse = async (response, defaultErrorText = 'Error fetch') => {
    if (!response.ok) {
      const content_type = response.headers.get('content-type')
      if (content_type && content_type.includes('application/json')) {
        const res = await response.json()
        if (response.status === 401) {
          handleUnauthorized()
        } else {
          setMessageResult(res.message)
          setStatus(response.status)
        }
      } else {
        setStatus(response.status)
        setMessageResult(response.statusText ? response.statusText : defaultErrorText)
      }
      return false
    }
    return true
  }

  const fetchAllOrders = async () => {
    setLoading(true)
    try {
      const response = await AdminOrderApi.getAllOrder(token)
      const isResponseOk = await handleResponse(response, 'Error fetch all orders')
      if (isResponseOk) {
        const res = await response.json()
        const resData = res.data
        const formattedData = resData.map((item) => {
          return {
            ...item,
            key: item.order_id,
            order_created_at: DateFormatView(item.order_created_at),
            order_updated_at: DateFormatView(item.order_updated_at)
          }
        })

        const uniqueKey = new Set()
        const uniqueData = []
        formattedData.forEach((item) => {
          if (!uniqueKey.has(item.order_id)) {
            uniqueKey.add(item.order_id)
            uniqueData.push(item)
          }
        })
        setData(uniqueData)
        setFilterData(uniqueData)
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: uniqueData.length
          }
        })
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const fetchAllPaymentMethods = async () => {
    try {
      const response = await AdminPaymentApi.getAllPaymentMethod(token)
      const isResponseOk = await handleResponse(response, 'Error fetch all payment methods')
      if (isResponseOk) {
        const res = await response.json()
        const resData = res.data
        const selectData = resData.map((item, index) => ({
          value: item.payment_method_name,
          label: item.payment_method_name,
          text: item.payment_method_name
        }))
        setPaymentMethod(selectData)
      }
    } catch (error) {}
  }

  const fetchAllDeliveryMethods = async () => {
    try {
      const response = await AdminDeliveryAPI.getAllDeliveryMethod(token)
      const isResponseOk = await handleResponse(response, 'Error fetch all delivery methods')
      if (isResponseOk) {
        const res = await response.json()
        const resData = res.data
        const selectData = resData.map((item) => ({
          value: item.delivery_method_name,
          label: item.delivery_method_name,
          text: item.delivery_method_name
        }))
        setDeliveryMethod(selectData)
      }
    } catch (error) {}
  }

  const searchOrder = () => {
    const filterData = data.filter((item) => {
      const matchInfo =
        item.order_id.toString().includes(searchValue) ||
        item.user_fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.receiver_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.receiver_phone.includes(searchValue) ||
        item.receiver_address.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.ward_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.district_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.province_name.toLowerCase().includes(searchValue.toLowerCase())
      const matchOrderStatus = selectedOrderStatus !== undefined ? item.order_status === selectedOrderStatus : true
      const matchPaymentStatus =
        selectedPaymentStatus !== undefined ? item.payment_status === selectedPaymentStatus : true
      const matchDeliveryStatus =
        selectedDeliveryStatus !== undefined ? item.delivery_status === selectedDeliveryStatus : true

      return matchInfo && matchOrderStatus && matchPaymentStatus && matchDeliveryStatus
    })

    setFilterData(filterData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: filterData.length
      }
    })
  }

  useEffect(() => {
    fetchAllOrders()
    fetchAllPaymentMethods()
    fetchAllDeliveryMethods()
  }, [])

  useEffect(() => {
    if (data) {
      searchOrder()
    }
  }, [
    searchValue,
    selectedOrderStatus,
    selectedPaymentStatus,
    selectedDeliveryStatus,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    tableParams.pagination?.pageSize,
    JSON.stringify(tableParams.filters)
  ])

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
              {
                title: `Orders (${filterData?.length})`
              }
            ]}
          />
          <p>All orders available in the system</p>
        </div>
      </header>
      <div className='p-5 my-6 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp flex flex-col gap-4'>
        <div className='flex justify-between items-center gap-x-3'>
          <div className='flex items-center w-[250px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search user'
              className='border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px] focus:border-[#1D242E]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchAllOrders()
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <ConfigProvider theme={filterTheme}>
            <Select
              suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
              allowClear
              placeholder='Select order status'
              placement='bottomLeft'
              options={[
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'pending', label: 'Pending' }
              ]}
              className='w-[250px] h-[50px]'
              onChange={(value) => {
                setSelectedOrderStatus(value ? value : undefined)
              }}
            />
            <Select
              suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
              allowClear
              placeholder='Select payment status'
              placement='bottomLeft'
              options={[
                { value: 'completed', label: 'Completed' },
                { value: 'failed', label: 'Failed' },
                { value: 'pending', label: 'Pending' }
              ]}
              className='w-[250px] h-[50px]'
              onChange={(value) => {
                setSelectedPaymentStatus(value === undefined ? undefined : value)
              }}
            />
            <Select
              suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
              allowClear
              placeholder='Select delivery status'
              placement='bottomLeft'
              options={[
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
                { value: 'pending', label: 'Pending' }
              ]}
              className='w-[250px] h-[50px]'
              onChange={(value) => {
                setSelectedDeliveryStatus(value === undefined ? undefined : value)
              }}
            />
          </ConfigProvider>
        </div>
        <AdminTable
          columns={columns}
          rowKey={'order_id'}
          data={filterData}
          loading={loading}
          handleTableChange={handleTableChange}
          tableParams={tableParams}
          tableStyles={{
            width: '1200px',
            minHeight: '320px',
            backgroundColor: '#ffffff'
          }}
          scroll={{
            y: '280px'
          }}
          paginationTable={{
            position: ['none'],
            ...tableParams.pagination
          }}
          pageSizeOptionsParent={['8', '10', '15', '20', '25', '30']}
        />
      </div>
    </section>
  )
}

export default Orders
