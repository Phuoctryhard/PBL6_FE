import { Add, SearchNormal, Edit, Eye, Refresh } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Popconfirm, message, Modal, Tooltip, Spin, DatePicker, ConfigProvider, Image } from 'antd'
import qs from 'qs'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import AdminTable from '../AdminTable'
import BreadCrumbs from '../AdminBreadCrumbs'
import { AdminDeliveryAPI } from '../../Api/admin'
const { RangePicker } = DatePicker

const Delivery = () => {
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')
  const navigate = useNavigate()
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

  //#region filter data
  const [searchValue, setSearchValue] = useState('')
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)
  //#endregion

  //#region Table data and custom pagination
  // Date format options
  const optionsDateformat = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }

  // Date format
  const DateFormat = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', optionsDateformat)
    return `${formattedDate}`
  }

  //table column
  const columns = [
    {
      title: '#',
      dataIndex: 'delivery_method_id',
      key: 'delivery_method_id',
      sorter: (a, b) => a.delivery_method_id - b.delivery_method_id,
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'delivery_method_name',
      key: 'delivery_method_name',
      sorter: (a, b) => a.delivery_method_name.localeCompare(b.delivery_method_name),
      ellipsis: true,
      render: (text, record) => (
        <div className='flex items-center gap-x-2 justify-start'>
          <img src={record.delivery_method_logo} alt={text} className='w-12 h-12 object-cover rounded-full' />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Fee',
      dataIndex: 'delivery_fee',
      key: 'delivery_fee',
      sorter: (a, b) => a.delivery_fee - b.delivery_fee,
      ellipsis: true
    },
    {
      title: 'Status',
      dataIndex: 'delivery_is_active',
      key: 'delivery_is_active',
      sorter: (a, b) => a.delivery_is_active - b.delivery_is_active,
      filters: [
        { text: 'Active', value: 0 },
        { text: 'Deleted', value: 1 }
      ],
      onFilter: (value, record) => record.delivery_is_active === value,
      render: (text) => (
        <span style={{ color: Number(text) === 0 ? 'green' : 'red' }}>{Number(text) === 0 ? 'Active' : 'Deleted'}</span>
      )
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
                  <button type='button' className='flex items-center gap-x-2 justify-start w-full' onClick={() => {}}>
                    <Eye size='15' color='green' /> <span>View</span>
                  </button>
                )
              },
              {
                key: '2',
                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      setOpenModal(true)
                      setTypeModal('update')
                      setDeliverySelected(record.delivery_method_id)
                      setDeliveryName(record.delivery_method_name)
                      setDeliveryFee(record.delivery_fee)
                      setDeliveryDescription(record.delivery_method_description)
                      setDeliveryLogo(record?.delivery_method_logo)
                    }}
                  >
                    <Edit size='15' color='#bc9143' /> <span>Update</span>
                  </button>
                )
              },
              {
                key: '3',
                label:
                  record.delivery_is_active === 0 ? (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Delete record ${record.delivery_method_id}`}
                      description='Are you sure to delete this record?'
                      onConfirm={() => {
                        handleDeleteDelivery(record.delivery_method_id)
                      }}
                      okText='Delete'
                      cancelText='Cancel'
                    >
                      <button
                        type='button'
                        className='flex items-center gap-x-2 justify-start w-full'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DeleteOutlined className='text-[15px] text-[red]' /> <span>Delete</span>
                      </button>
                    </Popconfirm>
                  ) : (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Restore record ${record.delivery_method_id}`}
                      description='Are you sure to restore this record?'
                      onConfirm={() => {
                        handleRestoreDelivery(record.delivery_method_id)
                      }}
                      okText='Restore'
                      cancelText='Cancel'
                    >
                      <button
                        type='button'
                        className='flex items-center gap-x-2 justify-start w-full'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Refresh className='text-[blue]' size={15} /> <span>Restore</span>
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

  //Table data
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
    setLoading(true)
    const params = {
      pagination,
      filters,
      sortOrder: sorter ? sorter.order : undefined,
      sortField: sorter ? sorter.field : undefined
    }
    setTableParams(params)
    setLoading(false)
  }
  const handleResponse = async (response, defaultErrorText = 'Error fetch') => {
    if (!response.ok) {
      const content_type = response.headers.get('content-type')
      if (content_type && content_type.includes('application/json')) {
        const res = await response.json()
        if (response.status === 401) {
          handleUnauthorized()
        } else {
          if (res.message) {
            setMessageResult(res.message)
            setStatus(response.status)
          } else if (res.messages) {
            setMessageResult(res.messages.join('. '))
            setStatus(response.status)
          } else {
            setStatus(400)
            setMessageResult(defaultErrorText)
          }
        }
      } else {
        setStatus(response.status)
        setMessageResult(response.statusText ? response.statusText : defaultErrorText)
      }
      return false
    }
    return true
  }

  const fetchAllDelivery = async () => {
    try {
      setLoading(true)
      const response = await AdminDeliveryAPI.getAllDeliveryMethod(token)
      const isResponseOK = await handleResponse(response, 'Error fetch all delivery')
      if (!isResponseOK) {
        return
      }
      const res = await response.json()
      const data = res.data
      const tableData = data.map((item) => ({
        ...item,
        key: item.delivery_method_id
      }))
      setData(tableData)
      setFilterData(tableData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: tableData.length
        }
      })
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  const searchDelivery = () => {
    try {
      const formatDate = (date) => {
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
      const filter = data.filter((item) => {
        const matchesName = item.delivery_method_name.toLowerCase().includes(searchValue.toLowerCase())
        const matchesDateRange =
          selectedFrom && selectedTo
            ? formatDate(item.created_at) >= formatDate(selectedFrom) &&
              formatDate(item.created_at) <= formatDate(selectedTo)
            : true
        return matchesName && matchesDateRange
      })
      setFilterData(filter)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: filter.length
        }
      })
    } catch (e) {}
  }

  useEffect(() => {
    fetchAllDelivery()
  }, [])

  useEffect(() => {
    if (data) searchDelivery()
  }, [
    searchValue,
    selectedFrom,
    selectedTo,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    tableParams.pagination?.pageSize,
    JSON.stringify(tableParams.filters)
  ])
  //#endregion

  //#region modal data
  //Modal setting
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState('add')

  //Modal form data
  const [deliverySelected, setDeliverySelected] = useState()
  const [deliveryName, setDeliveryName] = useState('')
  const [errorDeliverName, setErrorDeliverName] = useState('')
  const [deliveryFee, setDeliveryFee] = useState('')
  const [errorDeliverFee, setErrorDeliverFee] = useState('')
  const [DeliveryDescription, setDeliveryDescription] = useState('')
  const [errorDeliverDescription, setErrorDeliverDescription] = useState('')
  const [deliveryLogo, setDeliveryLogo] = useState('')
  const [errorDeliverLogo, setErrorDeliverLogo] = useState('')
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorFileUpload, setErrorFileUpload] = useState('')

  //handle drag and drop image file
  const [dragging, setDragging] = useState(false)
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setSelectedFile(droppedFile)
      setDeliveryLogo(URL.createObjectURL(droppedFile))
      fileInputRef.current.value = null
    }
  }

  //handle upload logo
  const handleUploadLogo = (e) => {
    const file = e.target.files[0]
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']
    if (file && validExtensions.includes(file.type)) {
      setDeliveryLogo(URL.createObjectURL(file))
      setSelectedFile(file)
      fileInputRef.current.value = null
    } else {
      setStatus(422)
      setMessageResult(`File ${file.name} is not a valid image file.`)
    }
  }

  //handle clear logo
  const handleClearLogo = (e) => {
    e.stopPropagation()
    setDeliveryLogo(null)
    setSelectedFile(null)
  }

  const handleErrorDeliveryName = (name) => {
    if (name === '') {
      setErrorDeliverName('Brand name is required')
      return false
    }
    return true
  }

  const handleErrorDeliveryFee = (fee) => {
    if (fee === '') {
      setErrorDeliverFee('Fee is required')
      return false
    } else if (!/^[1-9]\d*(\.\d+)?$/.test(fee)) {
      setErrorDeliverFee('Please enter a positive number')
      return false
    }
    return true
  }
  // handle delete brand record
  const handleDeleteDelivery = async (id) => {
    const formData = new FormData()
    formData.append('delivery_is_active', 1)
    const response = await AdminDeliveryAPI.deleteDeliveryMethod(token, id, formData)
    const isResponseOK = await handleResponse(response, `Error delete delivery with id: ${id}`)
    if (!isResponseOK) {
      return
    }
    fetchAllDelivery()
    setStatus(200)
    setMessageResult('Delivery method was successfully deleted')
  }

  const handleRestoreDelivery = async (id) => {
    const formData = new FormData()
    formData.append('delivery_is_active', 0)
    const response = await AdminDeliveryAPI.deleteDeliveryMethod(token, id, formData)
    const isResponseOK = await handleResponse(response, `Error restore delivery with id: ${id}`)
    if (!isResponseOK) {
      return
    }
    fetchAllDelivery()
    setStatus(200)
    setMessageResult('Delivery method was successfully restored')
  }

  // handle submit and or update brand
  const [submitLoading, setSubmitLoading] = useState(false) // loading submit state

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    const formData = new FormData()
    formData.append('delivery_method_name', deliveryName)
    formData.append('delivery_fee', deliveryFee)
    if (DeliveryDescription) formData.append('delivery_method_description', DeliveryDescription)
    if (selectedFile) formData.append('delivery_method_logo', selectedFile)
    let response = null
    try {
      if (typeModal === 'add') {
        response = await AdminDeliveryAPI.addDeliveryMethod(token, formData)
      }
      if (typeModal === 'update') {
        if (!deliverySelected) {
          setStatus(400)
          setMessageResult('Delivery method not found')
          return
        }
        response = await AdminDeliveryAPI.updateDeliveryMethod(token, deliverySelected, formData)
      }
      const isResponseOK = await handleResponse(response, `Error ${typeModal} delivery method fetch`)
      if (!isResponseOK) {
        return
      }
      setStatus(200)
      if (typeModal === 'add') {
        setMessageResult('Delivery method was successfully added')
      } else if (typeModal === 'update') {
        setMessageResult('Delivery method was successfully updated')
      }
      handleCancel()
    } catch (e) {
    } finally {
      setSubmitLoading(false)
    }
  }

  //handle cancel modal
  const handleCancel = () => {
    setOpenModal(false)
    setDeliveryName('')
    setDeliveryFee('')
    setDeliveryDescription('')
    setDeliveryLogo(null)
    setSelectedFile(null)
    setErrorDeliverName('')
    setErrorDeliverFee('')
    setErrorDeliverDescription('')
    setErrorDeliverLogo('')
    setErrorFileUpload('')
  }
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
      <header className='flex justify-between animate-slideDown'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs items={[{ title: `Deliveries (${filterData?.length})` }]} />
          <p>List of Deliveries available</p>
        </div>
        <button
          className='h-[46px] px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'
          onClick={() => {
            setOpenModal(true)
            setTypeModal('add')
          }}
        >
          Add new
          <Add size='20' />
        </button>
      </header>
      <Modal
        destroyOnClose
        title={
          <span>
            {typeModal} new delivery method (fields with <span className='text-[red]'>*</span> are required)
          </span>
        }
        centered
        open={openModal}
        width={800}
        footer={null}
        onCancel={handleCancel}
      >
        <div className='modal__content mt-7 relative'>
          <Spin spinning={submitLoading} tip='Loading...' size='large' fullscreen />
          <form action='' method='POST' onSubmit={handleSubmit} autoComplete='off'>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull relative'>
                <label htmlFor='delivery_method_logo' className='AddCategoryForm__label mb-8'>
                  Logo (only *.jpeg, *.jpg, *.png, *.gif and *.svg)
                </label>
                <input
                  type='file'
                  accept='image/jpg, image/jpeg, image/png, image/gif, image/svg'
                  name='delivery_method_logo'
                  id='delivery_method_logo'
                  className='hidden'
                  placeholder='Choose file'
                  onChange={handleUploadLogo}
                  ref={fileInputRef}
                  onClick={() => setErrorFileUpload('')}
                />
                <Tooltip
                  title={errorFileUpload}
                  open={errorFileUpload !== ''}
                  placement='top'
                  align={{
                    offset: [0, 100]
                  }}
                >
                  <div className='' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    <button
                      type='button'
                      onClick={() => {
                        if (!deliveryLogo) document.getElementById('delivery_method_logo').click()
                      }}
                      className='w-full max-w-[18.75rem] min-h-40 flex flex-col items-center justify-center rounded-lg gap-2 text-lg m-auto'
                      style={{
                        border: deliveryLogo ? 'None' : '3px dashed #e8ebed'
                      }}
                    >
                      {deliveryLogo ? (
                        <>
                          <Image
                            src={deliveryLogo}
                            alt='Logo'
                            className='w-full max-w-[18.75rem] max-h-40 object-cover rounded-lg'
                          />
                          <CloseCircleOutlined
                            className='absolute top-0 right-0 text-red-500 text-[20px] cursor-pointer'
                            onClick={handleClearLogo}
                          />
                        </>
                      ) : (
                        <div className='w-full flex items-center justify-center gap-4 p-5'>
                          <CloudUploadOutlined className='text-[green] text-6xl' />
                          <div className='flex flex-col gap-1 justify-center items-center text-sm text-teal-700'>
                            <span>Drag Your Image</span>
                            <span className='text-base text-teal-800 font-semibold'>Or</span>
                            <span>Browser Here</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='delivery_method_name' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Name
                </label>
                <Tooltip
                  title={errorDeliverName}
                  open={errorDeliverName !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='delivery_method_name'
                    id='delivery_method_name'
                    className='AddCategoryForm__input'
                    placeholder='This is a delivery method name'
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                    onFocus={() => setErrorDeliverName('')}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='delivery_fee' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Fee
                </label>
                <Tooltip
                  title={errorDeliverFee}
                  open={errorDeliverFee !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='delivery_fee'
                    id='delivery_fee'
                    className='AddCategoryForm__input'
                    placeholder='25000'
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    onFocus={() => setErrorDeliverFee('')}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='delivery_method_description' className='AddCategoryForm__label'>
                  Description
                </label>
                <textarea
                  type='text'
                  name='delivery_method_description'
                  id='delivery_method_description'
                  className='AddCategoryForm__textarea'
                  rows={6}
                  placeholder='Giao hàng tiết kiệm'
                  value={DeliveryDescription !== null ? DeliveryDescription : ''}
                  onChange={(e) => setDeliveryDescription(e.target.value)}
                />
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__groupButton'>
                <button type='submit' className='AddCategoryForm__submitBtn'>
                  Save
                </button>
                <button type='button' className='AddCategoryForm__cancelBtn' onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <div className='p-5 my-8 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center w-[340px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for deliveries'
              className='focus:border-[#1D242E] border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchAllDelivery()
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <div className='flex gap-x-[12px] items-center'>
            <ConfigProvider
              theme={{
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
                  DatePicker: {
                    activeBorderColor: '#1D242E',
                    hoverBorderColor: '#1D242E'
                  }
                }
              }}
            >
              <RangePicker
                className='w-[340px] h-[50px]'
                format={'DD/MM/YYYY'}
                onChange={(date, dateString) => {
                  setSelectedFrom(dateString[0])
                  setSelectedTo(dateString[1])
                }}
              />
            </ConfigProvider>
          </div>
        </div>
        <div>
          <AdminTable
            columns={columns}
            rowKey='delivery_method_id'
            data={filterData}
            tableParams={tableParams}
            tableStyles={{ width: '1200px', minHeight: '320px', maxHeight: '320px', backgroundColor: '#ffffff' }}
            scroll={{ y: '280px' }}
            loading={loading}
            handleTableChange={handleTableChange}
            pageSizeOptionsParent={['8', '10', '20', '50']}
            paginationTable={{
              position: ['none'],
              ...tableParams.pagination
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Delivery
