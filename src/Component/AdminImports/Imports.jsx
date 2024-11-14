import './imports.css'
import AdminTable from '../AdminTable'
import AdminBreadCrumbs from '../AdminBreadCrumbs'
import { ImportsAPI, ProductsAPI, SuppliersAPI } from '../../Api/admin'
import { Add, SearchNormal, Edit, Eye, ArrowDown2 } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Popconfirm, message, Modal, Tooltip, Spin, DatePicker, ConfigProvider, Select } from 'antd'
import { DashOutlined, DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

//#region theme for ant design components
const filterTheme = {
  token: {
    colorTextPlaceholder: '#1D242E',
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

const { colorTextPlaceholder, ...restToken } = filterTheme.token
//#endregion

const AdminImports = () => {
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

  const fakeSupplierData = {
    data: [
      {
        supplier_id: 1,
        supplier_name: 'Supplier 1'
      },
      {
        supplier_id: 2,
        supplier_name: 'Supplier 2'
      },
      {
        supplier_id: 3,
        supplier_name: 'Supplier 3'
      }
    ]
  }

  //#region filter data
  const [searchValue, setSearchValue] = useState('')
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)
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

  const convertToDDMMYYYY = (date) => {
    if (/^\d{4}\-\d{2}\-\d{2}$/.test(date)) {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }

    // Check if the date is in ISO 8601 format
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(date)) {
      const parsedDate = new Date(date)
      const day = String(parsedDate.getDate()).padStart(2, '0')
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = parsedDate.getFullYear()
      return `${day}/${month}/${year}`
    }

    // Check if the date is in the format "Wed Sep 25 2024 00:00:00 GMT+0700 (Indochina Time)"
    if (Date.parse(date)) {
      const parsedDate = new Date(date)
      const day = String(parsedDate.getDate()).padStart(2, '0')
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = parsedDate.getFullYear()
      return `${day}/${month}/${year}`
    }
    return ''
  }

  //Main table columns
  const columns = [
    {
      title: '#',
      dataIndex: 'import_id',
      key: 'import_id',
      width: '10%',
      sorter: (a, b) => a.import_id - b.import_id,
      ellipsis: true
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier_name',
      key: 'supplier_name',
      width: '20%',
      sorter: (a, b) => a.supplier_name.localeCompare(b.supplier_name),
      ellipsis: true
    },
    {
      title: 'Total Amount',
      dataIndex: 'import_total_amount',
      key: 'import_total_amount',
      width: '10%',
      sorter: (a, b) => a.import_total_amount - b.import_total_amount,
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{parseFloat(text).toString()}</span>
    },
    {
      title: 'Imported Date',
      dataIndex: 'import_created_at',
      key: 'import_created_at',
      width: '20%',
      sorter: (a, b) => new Date(a.import_created_at) - new Date(b.import_created_at),
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{DateFormatView(text)}</span>
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
                      navigate(`/admin/imports/${record.import_id}`)
                    }}
                  >
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
                      const Data = async () => {
                        setSubmitLoading(true)
                        const data = await fetchImportById(record.import_id)
                        if (data) {
                          const import_detailData = data.import_details
                          setSupplierID(data.supplier_id)
                          setImportDate(convertToDDMMYYYY(data.import_date))
                          setItems(import_detailData)
                          setOpenModal(true)
                          setTypeModal('update')
                        }
                        setSubmitLoading(false)
                      }
                      Data()
                    }}
                  >
                    <Edit size='15' color='#bc9143' /> <span>Update</span>
                  </button>
                )
              },
              {
                key: '3',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Delete record ${record.import_id}`}
                    description='Are you sure to delete this record?'
                    onConfirm={() => {}}
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

  //Main table data
  const [data, setData] = useState([])
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

  const searchImports = () => {
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
    const result = data.filter((item) => {
      const matchesSupplierName = item.supplier_name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesDateRange =
        selectedFrom && selectedTo
          ? formatDate(item.import_created_at) >= formatDate(selectedFrom) &&
            formatDate(item.import_created_at) <= formatDate(selectedTo)
          : true
      return matchesSupplierName && matchesDateRange
    })

    const tableData = result.sort((a, b) => new Date(b.import_created_at) - new Date(a.import_created_at))
    setFilterData(tableData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: result.length
      }
    })
  }

  const fetchImports = async () => {
    setLoading(true)
    try {
      const response = await ImportsAPI.getAllImports(token)
      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized()
        }
        setStatus(response.status)
        setMessageResult(`Error fetching imports: with status ${response.status}`)
        setLoading(false)
        return
      }
      const result = await response.json()
      const data = result.data
      const tableData = data
        .map((item) => ({
          key: item.import_id,
          import_id: item.import_id,
          supplier_name: item.supplier_name,
          import_total_amount: item.import_total_amount,
          import_created_at: item.import_created_at,
          import_updated_at: item.import_updated_at,
          product_expiry_date: item.import_date
        }))
        .sort((a, b) => new Date(b.import_created_at) - new Date(a.import_created_at))
      setFilterData(tableData)
      setData(tableData)
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

  const fetchImportById = async (id) => {
    try {
      const response = await ImportsAPI.getImportById(token, id)
      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized()
        }
        setStatus(response.status)
        setMessageResult(`Error fetching import: with status ${response.status}`)
        return
      }
      const result = await response.json()
      const data = result.data
      return data
    } catch (e) {}
  }

  useEffect(() => {
    fetchImports()
  }, [])

  useEffect(() => {
    if (data) {
      searchImports()
    }
  }, [
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    tableParams.pagination?.pageSize,
    selectedFrom,
    selectedTo
  ])

  //Sub table columns
  const subTableColumns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      ellipsis: true
    },
    {
      title: 'Import Price',
      dataIndex: 'import_price',
      key: 'import_price',
      sorter: (a, b) => a.import_price - b.import_price,
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{parseFloat(text).toString()}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'import_quantity',
      key: 'import_quantity',
      sorter: (a, b) => a.import_quantity - b.import_quantity,
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{text}</span>
    },
    {
      title: 'Expire Date',
      dataIndex: 'product_expiry_date',
      key: 'product_expiry_date',
      sorter: (a, b) => new Date(a.product_expiry_date) - new Date(b.product_expiry_date),
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{DateFormatView(text)}</span>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <div className='flex items-center justify-center gap-2'>
          <Popconfirm
            align={{ offset: [20, 20] }}
            placement='bottomRight'
            description='Are you sure to delete this record?'
            onConfirm={() => {
              setItems(items.filter((item) => item.product_id !== record.product_id))
            }}
            okText='Delete'
            cancelText='Cancel'
          >
            <button type='button' className='flex items-center justify-center' onClick={(e) => e.stopPropagation()}>
              <DeleteOutlined className='text-base text-[red]' />
            </button>
          </Popconfirm>
          <button
            type='button'
            className='flex items-center justify-center'
            onClick={() => {
              setProductID(record.product_id)
              setProductUpdateID(record.product_id)
              setPrice(record.import_price)
              setQuantity(record.import_quantity)
              setProductExpire(convertToDDMMYYYY(record.product_expiry_date))
              setOpenModalItem(true)
              setTypeModalItem('Update')
            }}
          >
            <Edit size='16' color='green' className='text-base' />
          </button>
        </div>
      )
    }
  ]

  //Sub table data
  const [subTableData, setSubTableData] = useState([])
  const [subTableParams, setSubTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5
    }
  })

  const handleSubTableChange = (pagination, filters, sorter) => {
    const params = {
      pagination,
      filters,
      sortOrder: sorter ? sorter.order : undefined,
      sortField: sorter ? sorter.field : undefined
    }
    setSubTableParams(params)
  }

  //#endregion

  //#region modal add import
  //Modal setting
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState('add')
  const [submitLoading, setSubmitLoading] = useState(false)
  //Modal form data
  //import detail data
  const [supplierData, setSupplierData] = useState([])
  const [supplierID, setSupplierID] = useState('')
  const [errorSupplierID, setErrorSupplierID] = useState('')
  const [importDate, setImportDate] = useState('')
  const [errorImportDate, setErrorImportDate] = useState('')

  //handle modal action
  const handleErrorSupplierID = (value) => {
    if (!value) {
      setErrorSupplierID('Please select supplier')
      return false
    }
    return true
  }

  const handleErrorImportDate = (value) => {
    if (value === '') {
      setErrorImportDate('Import date is required')
      return false
    }
    // Parse the date
    const [day, month, year] = value.split('/').map(Number)
    const importDate = new Date(year, month - 1, day)
    const today = new Date()
    if (importDate > today) {
      setErrorImportDate('Import date must be in the past')
      return false
    }
    return true
  }

  const handleErrorItems = (items) => {
    if (items.length === 0) {
      setErrorItems('Please add at least one item')
      return false
    }
    return true
  }

  const handleValidationModal = () => {
    const isValidSupplierID = handleErrorSupplierID(supplierID)
    const isValidImportDate = handleErrorImportDate(importDate)
    const isValidItems = handleErrorItems(items)
    if (!isValidSupplierID || !isValidImportDate || !isValidItems) {
      setStatus(422)
      setMessageResult('Invalid data. Please check the fields')
      setSubmitLoading(false)
      return false
    }
    return true
  }

  const handleCancel = () => {
    handleCancelItem()
    setOpenModal(false)
    setSubmitLoading(false)
    setSupplierID('')
    setErrorSupplierID('')
    setImportDate('')
    setErrorImportDate('')
    setItems([])
    setErrorItems('')
  }

  //handle modal submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    if (!handleValidationModal()) return
    try {
      const supplier_id = supplierID
      const import_date = DateFormatData(importDate)
      const import_details = items.map((item) => ({
        product_id: item.product_id,
        import_price: Number(item.import_price),
        import_quantity: Number(item.import_quantity),
        product_expiry_date: item.product_expiry_date
      }))
      const data = { supplier_id, import_date, import_details }
      if (typeModal === 'add') {
        handleAddImport(data)
      } else if (typeModal === 'update') {
        return
      }
      fetchImports()
      handleCancel()
    } catch (e) {
      setSubmitLoading(false)
    } finally {
      setSubmitLoading(false)
    }
  }

  //handle add import
  const handleAddImport = async (data) => {
    try {
      const response = await ImportsAPI.addImport(token, data)
      if (!response.ok) {
        const { messages, status } = await response.json()
        if (response.status === 401) {
          handleUnauthorized()
        }
        setMessageResult(`Error adding import: with status ${status} and message ${messages.join(', ')}`)
        setStatus(status)
        setSubmitLoading(false)
        return
      }
      setStatus(200)
      setMessageResult('Import added successfully')
    } catch (e) {
      console.log('Error adding import', e.message)
    }
  }

  //handle update import
  const handleUpdateImport = async (data) => {
    try {
      const response = await ImportsAPI.updateImport(token, data)
      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized()
        }
        setStatus(response.status)
        setMessageResult(`Error updating import: with status ${response.status}`)
        return
      }
      setStatus(200)
      setMessageResult('Import updated successfully')
    } catch (e) {}
  }

  //#endregion

  //#region sub table item
  //items data
  const [items, setItems] = useState([])
  const [errorItems, setErrorItems] = useState('')
  const [products, setProducts] = useState([])
  const [productID, setProductID] = useState('')
  const [productUpdateID, setProductUpdateID] = useState('')
  const [errorProductID, setErrorProductID] = useState('')
  const [price, setPrice] = useState('')
  const [errorPrice, setErrorPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [errorQuantity, setErrorQuantity] = useState('')
  const [productExpire, setProductExpire] = useState('')
  const [errorProductExpire, setErrorProductExpire] = useState('')

  //#region modal items
  //Modal setting
  const [openModalItem, setOpenModalItem] = useState(false)
  const [typeModalItem, setTypeModalItem] = useState('Add')
  //Modal form data

  //handle modal action
  const handleCancelItem = () => {
    setOpenModalItem(false)
    setProductID('')
    setPrice('')
    setQuantity('')
    setProductExpire('')
    setErrorProductID('')
    setErrorPrice('')
    setErrorQuantity('')
    setErrorProductExpire('')
  }

  const handleErrorProductID = (value) => {
    if (!value) {
      setErrorProductID('Please select product')
      return false
    }
    return true
  }

  const handleErrorPrice = (value) => {
    if (value === '') {
      setErrorPrice('Price is required')
      return false
    } else if (!/^[1-9]\d*$/.test(value)) {
      setErrorPrice('Please enter a positive number')
      return false
    }
    return true
  }

  const handleErrorQuantity = (value) => {
    if (value === '') {
      setErrorQuantity('Quantity is required')
      return false
    } else if (!/^[1-9]\d*$/.test(value)) {
      setErrorQuantity('Please enter a positive number')
      return false
    }
    return true
  }

  const handleErrorProductExpire = (value) => {
    if (value === '') {
      setErrorProductExpire('Expire date is required')
      return false
    }
    // Parse the date
    const [day, month, year] = value.split('/').map(Number)
    const expiryDate = new Date(year, month - 1, day)
    const today = new Date()
    if (expiryDate <= today) {
      setErrorProductExpire('Expire date must be in the future')
      return false
    }
    return true
  }

  const handleValidationModalItem = () => {
    const isValidProductID = handleErrorProductID(productID)
    const isValidPrice = handleErrorPrice(price)
    const isValidQuantity = handleErrorQuantity(quantity)
    const isValidProductExpire = handleErrorProductExpire(productExpire)
    if (!isValidProductID || !isValidPrice || !isValidQuantity || !isValidProductExpire) {
      setStatus(422)
      setMessageResult('Invalid data. Please check the fields')
      return false
    }
    return true
  }

  //handle add or update item
  const handleAddOrUpdateItem = () => {
    if (!handleValidationModalItem()) return
    if (typeModalItem === 'Add') {
      handleAddItem()
    } else if (typeModalItem === 'Update') {
      handleUpdateItem()
    }
    handleCancelItem()
    setOpenModalItem(false)
  }

  //handle add item
  const handleAddItem = () => {
    let isExist = false
    const updateItems = items.map((item) => {
      if (item.product_id === productID) {
        isExist = true
        return {
          ...item,
          import_price: price,
          import_quantity: (parseInt(item.import_quantity) + parseInt(quantity)).toString(),
          product_expiry_date: DateFormatData(productExpire),
          item_entry_details: [
            ...item.item_entry_details,
            {
              import_price: price,
              product_expiry_date: DateFormatData(productExpire),
              import_quantity: quantity
            }
          ]
        }
      }
      return item
    })

    if (!isExist) {
      const newItems = [
        ...items,
        {
          product_id: productID,
          product_name: products.find((item) => item.value === productID).label,
          import_quantity: quantity,
          import_price: price,
          product_expiry_date: DateFormatData(productExpire),
          item_entry_details: [
            { import_price: price, product_expiry_date: DateFormatData(productExpire), import_quantity: quantity }
          ]
        }
      ]
      setItems(newItems)
    } else {
      setItems(updateItems)
    }
    setStatus(200)
    setMessageResult('Item added successfully')
  }

  //handle update item
  const handleUpdateItem = () => {
    const updateItems = items.map((item) => {
      if (item.product_id === productUpdateID) {
        return {
          ...item,
          product_id: productID,
          product_name: products.find((item) => item.value === productID).label,
          import_quantity: quantity,
          import_price: price,
          product_expiry_date: DateFormatData(productExpire),
          item_entry_details: [
            { import_price: price, product_expiry_date: DateFormatData(productExpire), import_quantity: quantity }
          ]
        }
      }
      return item
    })

    setItems(updateItems)
    setStatus(200)
    setMessageResult('Item updated successfully')
  }

  const fetchProducts = async () => {
    try {
      const response = await ProductsAPI.getProducts()
      if (!response.ok) {
        setStatus(response.status)
        setMessageResult(`Error fetching products: with status ${response.status}`)
        return
      }
      const result = await response.json()
      const data = result.data
      const selectData = data.map((item) => ({
        label: item.product_name,
        value: item.product_id
      }))
      setProducts(selectData)
    } catch (e) {}
  }

  const fetchSuppliers = async () => {
    try {
      const response = await SuppliersAPI.getAllSuppliers(token)
      if (!response.ok) {
        setStatus(response.status)
        setMessageResult(`Error fetching suppliers: with status ${response.status}`)
        return
      }
      const result = await response.json()
      const data = result.data
      const selectData = data.map((item) => ({
        label: item.supplier_name,
        value: item.supplier_id
      }))
      setSupplierData(selectData)
    } catch (e) {}
  }

  useEffect(() => {
    fetchProducts()
    fetchSuppliers()
  }, [])

  const handleItemsChange = () => {
    const TableData = items.map((item) => ({
      ...item,
      import_quantity: parseFloat(item.import_quantity).toString(),
      import_price: parseFloat(item.import_price).toString(),
      key: item.product_id
    }))
    setSubTableData(TableData)
    setSubTableParams({
      ...subTableParams,
      pagination: {
        ...subTableParams.pagination,
        total: TableData.length
      }
    })
  }
  useEffect(() => {
    handleItemsChange()
  }, [
    items,
    subTableParams.pagination?.current,
    subTableParams?.sortOrder,
    subTableParams?.sortField,
    JSON.stringify(subTableParams.filters)
  ])
  //#endregion
  //#endregion

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      if (messageResult.includes('Item')) {
        message.success(messageResult, 3)
      } else {
        message.success(messageResult.charAt(0).toUpperCase() + messageResult.slice(1), 3)
        fetchImports()
      }
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
          <AdminBreadCrumbs items={[{ title: `Imports (${filterData?.length})` }]} />
          <p>List of items imported into the warehouse</p>
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
            {typeModal} new import (fields with <span className='text-[red]'>*</span> are required)
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
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='supplier_id' className='mb-1'>
                  <span className='text-[red]'>* </span>Supplier
                </label>
                <Tooltip
                  title={errorSupplierID}
                  open={errorSupplierID !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={filterTheme}>
                    <Select
                      id='supplier_id'
                      suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                      allowClear
                      showSearch
                      placeholder='Select supplier'
                      className='w-full h-[3.125rem] importSelect'
                      options={supplierData}
                      value={supplierID || undefined}
                      onDropdownVisibleChange={() => setErrorSupplierID('')}
                      defaultValue={supplierID || undefined}
                      onChange={(value) => setSupplierID(value)}
                    />
                  </ConfigProvider>
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='import_date'>
                  <span className='text-[red]'>* </span>Import Date
                </label>
                <Tooltip
                  title={errorImportDate}
                  open={errorImportDate !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={filterTheme}>
                    <DatePicker
                      id='import_date'
                      className='AddCategoryForm__input'
                      format={'DD/MM/YYYY'}
                      onOpenChange={() => setErrorImportDate('')}
                      placeholder='Select Date'
                      value={importDate ? dayjs(DateFormatData(importDate)) : undefined}
                      onChange={(_, dateString) => setImportDate(dateString)}
                    />
                  </ConfigProvider>
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <div className='mb-1 flex items-center justify-between w-full'>
                  <div>
                    <span className='text-[red]'>* </span>
                    <span>Import Products</span>
                  </div>
                  <button
                    type='button'
                    className='px-2 py-2 bg-[#F0483E] text-[#FFFFFF] text-xs flex font-bold items-center focus:outline-none focus:opacity-80 hover:opacity-80 rounded-full animate-bounce'
                    onClick={() => {
                      setOpenModalItem(true)
                      setTypeModalItem('Add')
                      setErrorItems('')
                    }}
                  >
                    <Add size='20' />
                  </button>
                </div>
                <Tooltip
                  title={errorItems}
                  open={errorItems !== ''}
                  placement='bottom'
                  overlayStyle={{ maxWidth: 'max-content' }}
                >
                  <AdminTable
                    columns={subTableColumns}
                    rowKey={'product_id'}
                    data={subTableData}
                    handleTableChange={handleSubTableChange}
                    tableParams={subTableParams}
                    tableStyles={{
                      width: '100%',
                      minHeight: '200px',
                      backgroundColor: '#ffffff'
                    }}
                    scroll={{
                      y: '200px'
                    }}
                    paginationTable={{
                      position: ['none'],
                      ...subTableParams.pagination
                    }}
                    pageSizeOptionsParent={['5']}
                  />
                </Tooltip>
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
      <Modal
        destroyOnClose
        title={
          <span>
            {typeModalItem} new item (fields with <span className='text-[red]'>*</span> are required)
          </span>
        }
        centered
        open={openModalItem}
        width={450}
        footer={null}
        onCancel={handleCancelItem}
      >
        <div className='mt-7 relative'>
          <form action='' autoComplete='off'>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='product_id' className='mb-1'>
                  <span className='text-[red]'>* </span>Product
                </label>
                <Tooltip
                  title={errorProductID}
                  open={errorProductID !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={{ ...filterTheme, token: { ...restToken } }}>
                    <Select
                      id='product_id'
                      suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                      allowClear
                      showSearch
                      filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                      placeholder='Select product'
                      options={products}
                      className='w-full h-[3.125rem] importSelect'
                      defaultValue={productID || undefined}
                      onDropdownVisibleChange={() => setErrorProductID('')}
                      onChange={(value) => {
                        setProductID(value)
                      }}
                    />
                  </ConfigProvider>
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='product_expiry_date'>
                  <span className='text-[red]'>* </span>Expire Date
                </label>
                <Tooltip
                  title={errorProductExpire}
                  open={errorProductExpire !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={{ ...filterTheme, token: { ...restToken } }}>
                    <DatePicker
                      onOpenChange={() => setErrorProductExpire('')}
                      className='AddCategoryForm__input'
                      id='product_expiry_date'
                      format={'DD/MM/YYYY'}
                      placeholder='Select Date'
                      value={productExpire ? dayjs(DateFormatData(productExpire)) : undefined}
                      onChange={(_, dateString) => setProductExpire(dateString)}
                    />
                  </ConfigProvider>
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='import_price'>
                  <span className='text-[red]'>* </span>Price (4000000)
                </label>
                <Tooltip
                  title={errorPrice}
                  open={errorPrice !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    id='import_price'
                    onFocus={() => setErrorPrice('')}
                    type='text'
                    placeholder='Price'
                    className='AddCategoryForm__input'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='import_quantity'>
                  <span className='text-[red]'>* </span>Quantity (4000)
                </label>
                <Tooltip
                  title={errorQuantity}
                  open={errorQuantity !== ''}
                  placement='bottomLeft'
                  overlayStyle={{ maxWidth: 'max-content' }}
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    onFocus={() => setErrorQuantity('')}
                    id='import_quantity'
                    placeholder='Quantity'
                    className='AddCategoryForm__input'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__groupButton'>
                <button type='button' className='AddCategoryForm__submitBtn' onClick={handleAddOrUpdateItem}>
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
      <div className='p-5 my-6 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp flex flex-col gap-4'>
        <div className='flex justify-between items-center gap-x-3'>
          <div className='flex items-center w-[300px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for import'
              className='border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px] focus:border-[#1D242E]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchProducts({
                  search: searchValue
                })
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <div>
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
        </div>
        <AdminTable
          columns={columns}
          rowKey={'import_id'}
          data={filterData}
          loading={loading}
          handleTableChange={handleTableChange}
          tableParams={tableParams}
          tableStyles={{
            width: '1200px',
            minHeight: '300px',
            backgroundColor: '#ffffff'
          }}
          scroll={{
            y: '300px'
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

export default AdminImports
