import { useState, useEffect } from 'react'
import { SearchNormal, Refresh, ArrowDown2, ArrowSwapHorizontal, Eye } from 'iconsax-react'
import { Dropdown, Popconfirm, message, DatePicker, ConfigProvider, Select, Modal } from 'antd'
import { DashOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons'
import 'react-toastify/dist/ReactToastify.css'
import AdminTable from '../AdminTable'
import BreadCrumbs from '../AdminBreadCrumbs'
import { CustomerAPI } from '../../Api/admin'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
import DownloadCSV from '../DownloadCSV'

const { RangePicker } = DatePicker
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
const Customer = () => {
  const optionsDate = { year: 'numeric', month: 'long', day: '2-digit' }
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
  const formatDateInRealTime = (date) => {
    if (!date) return
    const dateOptions = new Date(date).toLocaleDateString('en-GB', optionsDate)
    const timeOptions = new Date(date).toLocaleTimeString('en-GB', optionsTime)
    return (
      <>
        {dateOptions}
        <br />
        at {timeOptions}
      </>
    )
  }

  const { setIsLogin } = useAdminMainLayoutFunction()
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

  //#region filter data
  const [searchValue, setSearchValue] = useState('')
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)
  const [selectedGender, setSelectedGender] = useState(null)
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  //#endregion

  //#region table data

  const columns = [
    {
      title: '#',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => a.user_id - b.user_id,
      ellipsis: true
    },
    {
      title: 'Full Name',
      dataIndex: 'user_fullname',
      key: 'user_fullname',
      sorter: (a, b) => a.user_fullname.localeCompare(b.user_fullname),
      width: '20%',
      ellipsis: true,
      render: (text, record) => (
        <div className='flex items-center gap-x-2 justify-start'>
          <img
            src={record.user_avatar ? record.user_avatar : '/assets/images/default-avatar.png'}
            alt={text}
            className='w-[48px] h-[48px] object-cover rounded-full'
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/assets/images/default-avatar.png'
            }}
          />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: '15%',
      ellipsis: true
    },
    {
      title: 'Phone',
      dataIndex: 'user_phone',
      key: 'user_phone',
      sorter: (a, b) => {
        const phoneA = a.user_phone === null ? '' : a.user_phone
        const phoneB = b.user_phone === null ? '' : b.user_phone
        return phoneA.localeCompare(phoneB)
      },
      ellipsis: true
    },
    {
      title: 'Gender',
      dataIndex: 'user_gender',
      key: 'user_gender',
      sorter: (a, b) => a.user_gender - b.user_gender,
      ellipsis: true,
      render: (text, record) => {
        const gender = record.user_gender === 0 ? 'Male' : 'Female'
        return (
          <div className='flex justify-start items-center'>
            <span
              className='text-xs px-4 py-1 rounded-xl'
              style={{
                color: gender === 'Male' ? '#008f99' : 'black',
                backgroundColor: gender === 'Male' ? 'rgb(0,143,153,0.1)' : 'rgb(0,0,0,0.1)'
              }}
            >
              {gender}
            </span>
          </div>
        )
      }
    },
    {
      title: 'Block Status',
      dataIndex: 'user_is_block',
      key: 'user_is_block',
      sorter: (a, b) => a.user_is_block - b.user_is_block,
      ellipsis: true,
      render: (text, record) => {
        return (
          <div className='flex justify-start items-center'>
            <span
              className='text-xs px-4 py-1 rounded-xl'
              style={{
                color: record.user_is_block === 1 ? '#f5222d' : '#795ed1',
                backgroundColor: record.user_is_block === 1 ? '#fdebeb' : 'rgb(121,94,209,0.1)'
              }}
            >
              {record.user_is_block === 1 ? 'Blocked' : 'Active'}
            </span>
          </div>
        )
      }
    },
    {
      title: 'Delete Status',
      dataIndex: 'user_is_delete',
      key: 'user_is_delete',
      sorter: (a, b) => a.user_is_delete - b.user_is_delete,
      ellipsis: true,
      render: (text, record) => {
        return (
          <div className='flex justify-start items-center'>
            <span
              className='text-xs px-4 py-1 rounded-xl'
              style={{
                color: record.user_is_delete === 1 ? '#f5222d' : '#008efa',
                backgroundColor: record.user_is_delete === 1 ? '#fdebeb' : 'rgb(0, 142, 250, 0.1)'
              }}
            >
              {record.user_is_delete === 1 ? 'Deleted' : 'Active'}
            </span>
          </div>
        )
      }
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
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      setModalData(record)
                      setOpenModal(true)
                    }}
                  >
                    <Eye size='15' color='green' /> <span>View</span>
                  </button>
                )
              },
              {
                key: '2',
                label:
                  record.user_is_delete === 0 ? (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Delete record ${record.user_id}`}
                      description='Are you sure to delete this record?'
                      onConfirm={() => {
                        handleDeleteCustomer(record.user_id)
                      }}
                      okText='Delete'
                      cancelText='Cancel'
                    >
                      <button
                        tabIndex={-1}
                        type='button'
                        className='flex items-center gap-x-2 justify-start w-full'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DeleteOutlined className='text-[14px] text-[red]' />
                        <span>Delete</span>
                      </button>
                    </Popconfirm>
                  ) : (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Restore record ${record.user_id}`}
                      description='Are you sure to store this record?'
                      onConfirm={() => {
                        handleDeleteCustomer(record.user_id, 'restore')
                      }}
                      okText='Restore'
                      cancelText='Cancel'
                    >
                      <button
                        type='button'
                        className='flex items-center gap-x-2 justify-start w-full'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Refresh className='text-[green]' size={15} /> <span>Restore</span>
                      </button>
                    </Popconfirm>
                  )
              },
              {
                key: '3',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`${record.user_is_block === 0 ? 'Block' : 'Unblock'} record ${record.user_id}`}
                    description={`Are you sure to ${record.user_is_block === 0 ? 'block' : 'unblock'} this record?`}
                    onConfirm={() => {
                      const type = record.user_is_block === 0 ? 'block' : 'unblock'
                      handleBlockCustomer(record.user_id, type)
                    }}
                    okText='Ok'
                    cancelText='Cancel'
                  >
                    <button
                      type='button'
                      tabIndex={-1}
                      className='flex items-center gap-x-2 justify-center'
                      onClick={(e) => e.stopPropagation()}
                    >
                      {record.user_is_block === 0 ? (
                        <CloseCircleOutlined className='text-[red]' size={15} />
                      ) : (
                        <ArrowSwapHorizontal className='text-[green]' size={15} />
                      )}
                      <span>{record.user_is_block === 0 ? 'Block' : 'Unblock'}</span>
                    </button>
                  </Popconfirm>
                )
              }
            ]
          }}
          className='flex justify-center bg-[#fafafa] items-center px-2 rounded-md w-[50px] h-[40px] border-[1px] border-solid border-[#e8ebed]'
        >
          <button type='button' className='flex items-center' tabIndex={-1}>
            <DashOutlined className='text-[15px]' />
          </button>
        </Dropdown>
      )
    }
  ]

  //Table data
  const [data, setData] = useState()
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState()
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5
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

  const fetchCustomer = async () => {
    setLoading(true)
    try {
      const res = await CustomerAPI.getAllCustomer(token)
      if (!res) return
      const resData = res.data
      const tableData = resData
        .map((item) => ({
          ...item,
          key: item.user_id,
          user_phone: item.user_phone === null ? 'N/A' : item.user_phone
        }))
        .sort((a, b) => new Date(b.user_updated_at) - new Date(a.user_updated_at))
      setData(tableData)
      setFilterData(tableData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: resData.length
        }
      })
    } catch (e) {
      if (e.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(e.message)
    } finally {
      setLoading(false)
    }
  }

  const searchCustomer = () => {
    try {
      const formatDate = (date) => {
        let format = date

        // Check if the date is in DD/MM/YYYY format
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
          const [day, month, year] = date.split('/')
          format = `${year}-${month}-${day}`
        }

        // Check if the date is in ISO 8601 format
        else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(date)) {
          const parsedDate = new Date(date)
          const day = String(parsedDate.getDate()).padStart(2, '0')
          const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
          const year = parsedDate.getFullYear()
          format = `${year}-${month}-${day}`
        }

        // Check if the date is in the format "Wed Sep 25 2024 00:00:00 GMT+0700 (Indochina Time)"
        else if (Date.parse(date)) {
          const parsedDate = new Date(date)
          const day = String(parsedDate.getDate()).padStart(2, '0')
          const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
          const year = parsedDate.getFullYear()
          format = `${year}-${month}-${day}`
        }

        return format ? new Date(format) : null
      }
      const result = data.filter((item) => {
        const matchInfo =
          item.user_fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.user_id.toString() === searchValue ||
          item?.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          item?.user_phone.toLowerCase().includes(searchValue.toLowerCase())
        const matchesGender = (selectedGender === null) | (item.user_gender === selectedGender)
        const matchesBlock = (selectedBlock === null) | (item.user_is_block === selectedBlock)
        const matchesStatus = (selectedStatus === null) | (item.user_is_delete === selectedStatus)
        const matchesDateRange =
          selectedFrom && selectedTo
            ? formatDate(item.user_created_at) &&
              formatDate(selectedFrom) &&
              formatDate(selectedTo) &&
              formatDate(item.user_created_at) >= formatDate(selectedFrom) &&
              formatDate(item.user_created_at) <= formatDate(selectedTo)
            : true
        return matchInfo && matchesGender && matchesDateRange && matchesBlock && matchesStatus
      })
      const tableData = result
      setFilterData(tableData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result.length
        }
      })
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  useEffect(() => {
    fetchCustomer()
  }, [])

  useEffect(() => {
    if (data) {
      searchCustomer()
    }
  }, [
    data,
    searchValue,
    selectedFrom,
    selectedTo,
    selectedGender,
    selectedBlock,
    selectedStatus,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    tableParams.pagination?.pageSize
  ])
  //#endregion

  //#region modal
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState(null)

  const handleCancel = () => {
    setOpenModal(false)
    setModalData(null)
  }
  //#endregion

  const handleDeleteCustomer = async (id, type = 'delete') => {
    try {
      const response = await CustomerAPI.deleteCustomer(id, token)
      if (!response) return
      fetchCustomer()
      setStatus(200)
      if (type === 'restore') setMessageResult('Restore customer successfully')
      else setMessageResult('Delete customer successfully')
    } catch (e) {
      if (e.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(500)
      setMessageResult(e.message)
    }
  }

  const handleBlockCustomer = async (id, type = 'block') => {
    try {
      const response = await CustomerAPI.changeBlock(id, token)
      if (!response) return
      fetchCustomer()
      setStatus(200)
      if (type === 'unblock') setMessageResult('Unblock customer successfully')
      else setMessageResult('Block customer successfully')
    } catch (e) {
      if (e.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(500)
      setMessageResult(e.message)
    }
  }

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      message.success(messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    } else if (status >= 400) {
      message.error(messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])
  //#endregion

  return (
    <section className='w-full h-full'>
      <header className='flex justify-between animate-slideDown'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs items={[{ title: 'Managers' }, { title: `List of users (${filterData?.length})` }]} />
          <p>List of users available in system</p>
        </div>
        <div>
          <DownloadCSV data={filterData} filename='users' columns={columns} />
        </div>
      </header>
      <Modal
        destroyOnClose
        title={<span>User information</span>}
        centered
        open={openModal}
        footer={null}
        onCancel={handleCancel}
        width='auto'
      >
        <div className='mt-6 p-5'>
          <div className='flex justify-start gap-8'>
            <div className='flex items-center'>
              <div className='flex flex-col gap-3 justify-center items-center'>
                <img
                  src={modalData?.user_avatar ? modalData.user_avatar : '/assets/images/default-avatar.png'}
                  alt='avatar'
                  className='w-40 h-40 object-cover rounded-[50%]'
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/assets/images/default-avatar.png'
                  }}
                />
                <div className='flex flex-col justify-center items-center'>
                  <h2 className='text-sm font-semibold'>{modalData?.user_fullname}</h2>
                  <span className='text-xs text-gray-500 mb-1'>{modalData?.email}</span>
                  <span className='text-xs'>{modalData?.user_phone ? modalData?.user_phone : 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 justify-start items-start'>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>Join at</h3>
                <span className='text-sm'>
                  {formatDateInRealTime(modalData?.user_created_at) || formatDateInRealTime(new Date())}
                </span>
              </div>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>Gender</h3>
                <span className='text-sm'>
                  {modalData?.user_gender ? (modalData?.user_gender === 0 ? 'Male' : 'Female') : 'Male'}
                </span>
              </div>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>Block status</h3>
                <span className='text-sm'>{modalData?.user_is_block === 1 ? 'Blocked' : 'Active'}</span>
              </div>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>Delete status</h3>
                <span className='text-sm'> {modalData?.user_is_delete === 1 ? 'Deleted' : 'Active'}</span>
              </div>
            </div>
            <div className='flex flex-col gap-4 justify-start items-start'>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>Date of birth</h3>
                <span className='text-sm'>
                  {formatDateInRealTime(modalData?.user_birthday) ||
                    formatDateInRealTime(new Date(2003, 11, 1, 6, 0, 0))}
                </span>
              </div>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>Height</h3>
                <span className='text-sm'>{modalData?.user_height ? `${modalData?.user_height} cm` : '70 cm'}</span>
              </div>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>Weight</h3>
                <span className='text-sm'>{modalData?.user_weight ? `${modalData?.user_weight} kg` : '70 kg'}</span>
              </div>
              <div>
                <h3 className='text-red-400 text-sm font-semibold'>IBM</h3>
                <span className='text-sm'>{modalData?.user_ibm ? `${modalData?.user_ibm} kg/m²` : '32 kg/m²'}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className='p-5 my-6 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp flex flex-col gap-4'>
        <div className='flex justify-between items-center gap-x-3'>
          <div className='flex items-center w-[250px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for users'
              className='border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px] focus:border-[#1D242E]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button onClick={() => {}}>
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <ConfigProvider theme={filterTheme}>
            <Select
              suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
              allowClear
              showSearch
              placeholder='Select Gender'
              placement='bottomLeft'
              options={[
                { label: 'All', value: 'All' },
                { label: 'Male', value: 0 },
                { label: 'Female', value: 1 }
              ]}
              className='w-[250px] h-[50px]'
              onChange={(value) => {
                if (value !== undefined && value !== null && value !== 'All') {
                  setSelectedGender(value)
                } else {
                  setSelectedGender(null)
                }
              }}
            />
          </ConfigProvider>
          <ConfigProvider theme={filterTheme}>
            <Select
              suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
              allowClear
              showSearch
              placeholder='Select Block Status'
              placement='bottomLeft'
              options={[
                { label: 'All', value: 'All' },
                { label: 'Active', value: 0 },
                { label: 'Blocked', value: 1 }
              ]}
              className='w-[250px] h-[50px]'
              onChange={(value) => {
                if (value !== undefined && value !== null && value !== 'All') {
                  setSelectedBlock(value)
                } else {
                  setSelectedBlock(null)
                }
              }}
            />
          </ConfigProvider>
          <ConfigProvider theme={filterTheme}>
            <Select
              suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
              allowClear
              showSearch
              placeholder='Select Deleted Status'
              placement='bottomLeft'
              options={[
                { label: 'All', value: 'All' },
                { label: 'Active', value: 0 },
                { label: 'Deleted', value: 1 }
              ]}
              className='w-[250px] h-[50px]'
              onChange={(value) => {
                if (value !== undefined && value !== null && value !== 'All') {
                  setSelectedStatus(value)
                } else {
                  setSelectedStatus(null)
                }
              }}
            />
          </ConfigProvider>
          <ConfigProvider theme={filterTheme}>
            <RangePicker
              className='w-[250px] h-[50px]'
              format={'DD/MM/YYYY'}
              onChange={(date, dateString) => {
                setSelectedFrom(dateString[0])
                setSelectedTo(dateString[1])
              }}
            />
          </ConfigProvider>
        </div>
        <AdminTable
          columns={columns}
          rowKey={'user_id'}
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
          pageSizeOptionsParent={['5', '10', '15', '20']}
        />
      </div>
    </section>
  )
}

export default Customer
