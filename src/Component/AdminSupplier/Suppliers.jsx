import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BreadCrumbs from '../AdminBreadCrumbs'
import AdminTable from '../AdminTable'
import { Add, Edit, Refresh, SearchNormal, ArrowDown2 } from 'iconsax-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { message, Popconfirm, Dropdown, Select, ConfigProvider, Modal, Spin, Tooltip } from 'antd'
import { DeleteOutlined, DashOutlined } from '@ant-design/icons'
import { SuppliersAPI } from '../../Api/admin'
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
const Suppliers = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

  const { logout } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    logout()
    navigate('/admin/login')
  }

  //Message API
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
  const [selectedStatus, setSelectedStatus] = useState()
  //#endregion

  //#region table data
  const columns = [
    {
      title: '#',
      dataIndex: 'supplier_id',
      key: 'supplier_id',
      sorter: (a, b) => a.supplier_id - b.supplier_id,
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'supplier_name',
      key: 'supplier_name',
      sorter: (a, b) => a.supplier_name.localeCompare(b.supplier_name),
      ellipsis: true
    },
    {
      title: 'Contact Person',
      dataIndex: 'contact_person',
      key: 'contact_person',
      sorter: (a, b) => {
        const contactA = a.contact_person || ''
        const contactB = b.contact_person || ''
        return contactA.localeCompare(contactB)
      },
      ellipsis: true
    },
    {
      title: 'Address',
      dataIndex: 'supplier_address',
      key: 'supplier_address',
      sorter: (a, b) => {
        const addressA = a.supplier_address || ''
        const addressB = b.supplier_address || ''
        return addressA.localeCompare(addressB)
      },
      ellipsis: true
    },
    {
      title: 'Phone',
      dataIndex: 'supplier_phone',
      key: 'supplier_phone',
      sorter: (a, b) => {
        const phoneA = a.supplier_phone || ''
        const phoneB = b.supplier_phone || ''
        return phoneA.localeCompare(phoneB)
      },
      ellipsis: true
    },
    {
      title: 'Email',
      dataIndex: 'supplier_email',
      key: 'supplier_email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      ellipsis: true
    },
    {
      title: 'Status',
      dataIndex: 'supplier_is_delete',
      key: 'supplier_is_delete',
      sorter: (a, b) => a.supplier_is_delete - b.supplier_is_delete,
      ellipsis: true,
      render: (text, record) => (
        <span className={`${record.supplier_is_delete === 0 ? 'text-[#2F974F]' : 'text-[#F0483E]'}`}>
          {record.supplier_is_delete === 0 ? 'Active' : 'Deleted'}
        </span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Dropdown
          trigger={['click']}
          placement='bottomRight'
          menu={{
            items: [
              {
                key: '2',
                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-center'
                    onClick={() => {
                      setOpenModalItem(true)
                      setTypeModalItem('Update')
                      setSelectedSupplier(record.supplier_id)
                      setSupplierName(record.supplier_name)
                      setContactPerson(record.contact_person === 'N/A' ? '' : record.contact_person)
                      setSupplierPhone(record.supplier_phone === 'N/A' ? '' : record.supplier_phone)
                      setSupplierEmail(record.supplier_email)
                      setSupplierAddress(record.supplier_address === 'N/A' ? '' : record.supplier_address)
                    }}
                  >
                    <Edit size='15' color='green' /> <span>Update</span>
                  </button>
                )
              },
              {
                key: '3',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Delete record ${record.supplier_id}`}
                    description='Are you sure to delete this record?'
                    onConfirm={() => {
                      if (record.supplier_is_delete === 1) {
                        setStatus(400)
                        setMessageResult('Supplier is already deleted')
                        return
                      }
                      handleDeleteSupplier(record.supplier_id)
                    }}
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
              },
              {
                key: '4',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Restore record ${record.supplier_id}`}
                    description='Are you sure to store this record?'
                    onConfirm={() => {
                      if (record.supplier_is_delete === 0) {
                        setStatus(400)
                        setMessageResult('Supplier is already active')
                        return
                      }
                      handleRestoreSupplier(record.supplier_id)
                    }}
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

  //table data
  const [tableData, setTableData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
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

  const fetchSuppliers = async () => {
    setLoading(true)
    try {
      const response = await SuppliersAPI.getAllSuppliers(token)
      if (!response.ok) {
        const { messages } = await response.json()
        if (response.status === 401) {
          handleUnauthorized()
        } else {
          setStatus(response.status)
          setMessageResult(`Error fetching supplier: ${messages}`)
        }
        return
      }
      const result = await response.json()
      const data = result.data
      const tableData = data
        .map((item) => ({
          key: item.supplier_id,
          supplier_id: item.supplier_id,
          supplier_name: item.supplier_name,
          contact_person: item.contact_person ? item.contact_person : 'N/A',
          supplier_address: item.supplier_address ? item.supplier_address : 'N/A',
          supplier_phone: item.supplier_phone ? item.supplier_phone : 'N/A',
          supplier_email: item.supplier_email,
          supplier_is_delete: item.supplier_is_delete,
          supplier_created_at: item.supplier_created_at,
          supplier_updated_at: item.supplier_updated_at
        }))
        .sort((a, b) => new Date(b.supplier_created_at) - new Date(a.supplier_created_at))
      const supplierNames = data.map((item) => item.supplier_name)
      setSupplierNames(supplierNames)
      setFilterData(tableData)
      setTableData(tableData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.length
        }
      })
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  const searchSuppliers = () => {
    const result = tableData.filter((item) => {
      const matchesName = item.supplier_name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesAddress = item.supplier_address.toLowerCase().includes(searchValue.toLowerCase())
      const matchesPhone = item.supplier_phone.toLowerCase().includes(searchValue.toLowerCase())
      const matchesEmail = item.supplier_email.toLowerCase().includes(searchValue.toLowerCase())
      const matchesContactPerson = item.contact_person.toLowerCase().includes(searchValue.toLowerCase())
      const matchesStatus = selectedStatus !== undefined ? item.supplier_is_delete === Number(selectedStatus) : true
      return (matchesName || matchesAddress || matchesPhone || matchesEmail || matchesContactPerson) && matchesStatus
    })
    const filterData = result
    setFilterData(filterData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: result.length
      }
    })
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

  useEffect(() => {
    if (tableData) {
      searchSuppliers()
    }
  }, [
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    tableParams.pagination?.pageSize,
    selectedStatus
  ])
  //#endregion

  //#region modal
  //#region modal item
  const [openModalItem, setOpenModalItem] = useState(false)
  const [typeModalItem, setTypeModalItem] = useState('Add')
  const [submitLoadingModalItem, setSubmitLoadingModalItem] = useState(false)
  const handleCancelItem = () => {
    setOpenModalItem(false)
    setSupplierName('')
    setContactPerson('')
    setSupplierPhone('')
    setSupplierEmail('')
    setSupplierAddress('')
    setErrorSupplierEmail('')
    setErrorSupplierName('')
  }
  //#endregion

  //#region form item
  const [supplierNames, setSupplierNames] = useState([])
  const [supplierName, setSupplierName] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [errorSupplierName, setErrorSupplierName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [supplierPhone, setSupplierPhone] = useState('')
  const [errorSupplierPhone, setErrorSupplierPhone] = useState('')
  const [supplierEmail, setSupplierEmail] = useState('')
  const [errorSupplierEmail, setErrorSupplierEmail] = useState('')
  const [supplierAddress, setSupplierAddress] = useState('')

  const handleErrorSupplierName = (supplierName) => {
    if (supplierName === '') {
      setErrorSupplierName('Name is required')
      return false
    }
    const supplierSelected = tableData.find((item) => item.supplier_id === selectedSupplier).supplier_name
    if (supplierNames.includes(supplierName) && supplierSelected !== supplierName) {
      setErrorSupplierName('Name already exists')
      return false
    }
    return true
  }

  const handleErrorSupplierPhone = (supplierPhone) => {
    const numericRegex = /^\d+$/
    if (supplierPhone === '') {
      return true
    }
    if (!numericRegex.test(supplierPhone)) {
      setErrorSupplierPhone('Phone must contain only digits')
      return false
    }
    if (supplierPhone.length !== 10) {
      setErrorSupplierPhone('Phone must be 10 digits long')
      return false
    }

    const regexPhoneNumber = /^(84|0[3|5|7|8|9])[0-9]{8}$/
    if (!regexPhoneNumber.test(supplierPhone)) {
      if (!regexPhoneNumber.test(supplierPhone)) {
        setErrorSupplierPhone('Phone start with 84 or 0 followed by 3, 5, 7, 8, or 9')
        return false
      }
    }
    return true
  }

  const handleErrorSupplierEmail = (email) => {
    if (email === '') {
      setErrorSupplierEmail('Email is required')
      return false
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

    if (!/^[a-zA-Z0-9._%+-]+@/.test(email)) {
      setErrorSupplierEmail('Invalid email format: missing "@" symbol or incorrect local part')
      return false
    }

    if (!/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setErrorSupplierEmail('Invalid email format: domain part is incorrect')
      return false
    }
    if (!emailPattern.test(email)) {
      setErrorSupplierEmail('Invalid email format')
      return false
    }
    return true
  }

  const handleValidation = () => {
    const isValidSupplierName = handleErrorSupplierName(supplierName)
    const isValidSupplierPhone = handleErrorSupplierPhone(supplierPhone)
    const isValidSupplierEmail = handleErrorSupplierEmail(supplierEmail)
    return isValidSupplierName && isValidSupplierPhone && isValidSupplierEmail
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoadingModalItem(true)
    if (handleValidation()) {
      const supplier_name = supplierName
      const contact_person = contactPerson
      const supplier_phone = supplierPhone
      const supplier_email = supplierEmail
      const supplier_address = supplierAddress
      const formData = new FormData()
      if (supplier_name) formData.append('supplier_name', supplier_name)
      if (contact_person) formData.append('contact_person', contact_person)
      if (supplier_phone) formData.append('supplier_phone', supplier_phone)
      if (supplier_email) formData.append('supplier_email', supplier_email)
      if (supplier_address) formData.append('supplier_address', supplier_address)

      try {
        let response
        if (typeModalItem === 'Add') {
          response = await SuppliersAPI.addSupplier(formData, token)
        } else if (typeModalItem === 'Update') {
          response = await SuppliersAPI.updateSupplier(selectedSupplier, formData, token)
        }
        if (!response.ok) {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const { messages } = await response.json()
            if (response.status === 401) {
              handleUnauthorized()
            } else {
              setStatus(response.status)
              setMessageResult(`Error ${typeModalItem} supplier: ${messages}`)
            }
          } else {
            const status = response.status
            if (status === 405) {
              setStatus(405)
              setMessageResult(`Error ${typeModalItem} supplier: Method not allowed`)
            }
          }
          setSubmitLoadingModalItem(false)
          return
        }
        setStatus(200)
        setMessageResult(`Successfully ${typeModalItem} supplier`)
        fetchSuppliers()
        handleCancelItem()
        setSubmitLoadingModalItem(false)
      } catch (e) {
      } finally {
        setSubmitLoadingModalItem(false)
      }
    } else {
      setStatus(400)
      setMessageResult('Invalid field data, please check again')
    }
    setSubmitLoadingModalItem(false)
  }

  const handleDeleteSupplier = async (id) => {
    try {
      const response = await SuppliersAPI.deleteSupplier(id, token, {
        supplier_is_delete: 1
      })
      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const { messages } = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setStatus(response.status)
            setMessageResult(`Error deleting supplier: ${messages}`)
          }
        }
        return
      }
      setStatus(200)
      setMessageResult('Successfully deleted supplier')
      fetchSuppliers()
    } catch (e) {}
  }

  const handleRestoreSupplier = async (id) => {
    try {
      const response = await SuppliersAPI.deleteSupplier(id, token, {
        supplier_is_delete: 0
      })
      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const { messages } = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setStatus(response.status)
            setMessageResult(`Error restoring supplier: ${messages}`)
          }
        }
        return
      }
      setStatus(200)
      setMessageResult('Successfully restored supplier')
      fetchSuppliers()
    } catch (e) {}
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
      <header className='flex items-center justify-between animate-slideDown'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs items={[{ title: `Suppliers(${filterData?.length})` }]} />
          <p>List of suppliers available</p>
        </div>
        <button tabIndex={-1} type='button'>
          <button
            className='min-w-[162px] h-[46px] px-[18px] py-[16px] bg-[#F0483E] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px]'
            onClick={() => {
              setOpenModalItem(true)
              setTypeModalItem('Add')
            }}
          >
            <Add size='20' />
            Add new supplier
          </button>
        </button>
      </header>
      <Modal
        destroyOnClose
        title={
          <span>
            {typeModalItem} new supplier (fields with <span className='text-[red]'>*</span> are required)
          </span>
        }
        centered
        open={openModalItem}
        width={450}
        footer={null}
        onCancel={handleCancelItem}
      >
        <div className='mt-7 relative'>
          <Spin spinning={submitLoadingModalItem} tip='Loading...' size='large' fullscreen />
          <form action='' autoComplete='off'>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='supplier_name'>
                  <span className='text-[red]'>* </span>Name
                </label>
                <Tooltip
                  title={errorSupplierName}
                  open={errorSupplierName !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    id='supplier_name'
                    onFocus={() => setErrorSupplierName('')}
                    type='text'
                    placeholder='Name'
                    className='AddCategoryForm__input'
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='contact_person'>Contact Person</label>
                <input
                  id='contact_person'
                  type='text'
                  placeholder='Contact Person'
                  className='AddCategoryForm__input'
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='supplier_phone'>Phone</label>
                <Tooltip
                  title={errorSupplierPhone}
                  open={errorSupplierPhone !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    id='supplier_phone'
                    onFocus={() => setErrorSupplierPhone('')}
                    type='text'
                    placeholder='0905123412'
                    className='AddCategoryForm__input'
                    value={supplierPhone}
                    onChange={(e) => setSupplierPhone(e.target.value)}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='supplier_email'>
                  <span className='text-[red]'>* </span>Email
                </label>
                <Tooltip
                  title={errorSupplierEmail}
                  open={errorSupplierEmail !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    id='supplier_email'
                    onFocus={() => setErrorSupplierEmail('')}
                    type='text'
                    placeholder='example@example.com'
                    className='AddCategoryForm__input'
                    value={supplierEmail}
                    onChange={(e) => setSupplierEmail(e.target.value)}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='supplier_address'>Address</label>
                <textarea
                  id='supplier_address'
                  name='supplier_address'
                  rows={4}
                  placeholder='Đà Nẵng'
                  className='AddCategoryForm__WidthFull resize-none rounded bg-transparent border border-solid border-[#e8ebed] py-[0.625rem] px-[0.938rem] mt-[0.313rem] outline-none focus:border-[#1D242E]'
                  value={supplierAddress}
                  onChange={(e) => setSupplierAddress(e.target.value)}
                />
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__groupButton'>
                <button type='button' className='AddCategoryForm__submitBtn' onClick={handleSubmit}>
                  Save
                </button>
                <button type='button' className='AddCategoryForm__cancelBtn' onClick={handleCancelItem}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <div className='my-5 p-5 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center w-[15.625rem] justify-between text-sm rounded-sm relative'>
            <input
              type='text'
              placeholder='Search for supplier'
              className='focus:border-[#1D242E] border border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] p-[0.938rem] rounded'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchSuppliers()
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <div className='flex gap-x-[12px] items-center'>
            <ConfigProvider theme={filterTheme}>
              <Select
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                placeholder='- Choose status -'
                placement='bottomLeft'
                options={[
                  { label: 'Active', value: 0 },
                  { label: 'Deleted', value: 1 }
                ]}
                value={selectedStatus}
                className='w-[250px] h-[50px]'
                onChange={(value) => {
                  setSelectedStatus(value)
                }}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className='pt-4'>
          <AdminTable
            columns={columns}
            rowKey={'supplier_id'}
            data={filterData}
            loading={loading}
            handleTableChange={handleTableChange}
            tableParams={tableParams}
            tableStyles={{ width: '1200px', minHeight: '350px', maxHeight: '450px', backgroundColor: '#ffffff' }}
            scroll={{ y: '300px' }}
            pageSizeOptionsParent={['5', '10', '20', '30']}
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

export default Suppliers
