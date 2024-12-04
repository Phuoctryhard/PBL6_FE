import './Categories.css'
import { CategoriesAPI } from '../../Api/admin'
import { Add, SearchNormal, ArrowDown2, Edit, Eye, Refresh } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { TreeSelect, Dropdown, Popconfirm, message, Modal, Tooltip, Spin, Image, Select, ConfigProvider } from 'antd'
import qs from 'qs'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/app.context'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
import AdminTable from '../AdminTable'
import BreadCrumbs from '../AdminBreadCrumbs'

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
const Categories = () => {
  const { setIsLogin } = useAdminMainLayoutFunction()

  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }

  const [data, setData] = useState([])
  const [data1D, setData1D] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [treeData, setTreeData] = useState([])
  const [typeData, setTypeData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [categoryType, setCategoryType] = useState('')
  const [errorCategoryType, setErrorCategoryType] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [errorCategoryName, setErrorCategoryName] = useState('')
  const [categorySlug, setCategorySlug] = useState('')
  const [errorSlug, setErrorSlug] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState('add')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [parentCategory, setParentCategory] = useState()
  const [thumbnail, setThumbnail] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorFileUpload, setErrorFileUpload] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState(null)
  const token = localStorage.getItem('accesstoken')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [openModalView, setOpenModalView] = useState(false)
  const [selectedCategoryData, setSelectedCategoryData] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState()
  const [showDescription, setShowDescription] = useState(false)

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
    let formattedDate = 'N/A'
    if (/^\d{4}\-\d{2}\-\d{2}$/.test(date)) {
      const [year, month, day] = date.split('-')
      formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-GB', optionsDateformatShort)
    } else if (date) formattedDate = new Date(date).toLocaleDateString('en-GB', optionsDateformatFull)
    return `${formattedDate}`
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'category_id',
      key: 'category_id',
      width: '10%',
      sorter: (a, b) => a.category_id - b.category_id,
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'category_name',
      key: 'category_name',
      sorter: (a, b) => a.category_name.localeCompare(b.category_name),
      ellipsis: true,
      render: (text, record) => (
        <div className='flex items-center gap-x-2 justify-start'>
          <img src={record.category_thumbnail} alt={text} className='w-[48px] h-[48px] object-cover rounded-full' />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'category_type',
      key: 'category_type',
      width: '20%',
      filters: typeData,
      onFilter: (value, record) => record.category_type.indexOf(value) === 0,
      sorter: (a, b) => a.category_type.localeCompare(b.category_type),
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'category_description',
      key: 'category_description',
      sorter: (a, b) => {
        let valueA = a.category_description
        let valueB = b.category_description
        if (valueA === null) valueA = ''
        if (valueB === null) valueB = ''
        return valueB.localeCompare(valueA)
      },
      ellipsis: true,
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: 'Status',
      dataIndex: 'category_is_delete',
      key: 'category_is_delete',
      width: '10%',
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
          placement='bottom'
          menu={{
            items: [
              {
                key: '1',
                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      setOpenModalView(true)
                      setSelectedCategoryData(record)
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
                      setOpenModal(true)
                      setSelectedCategory(record.category_id)
                      setTypeModal('update')
                      setCategoryType(record.category_type)
                      setCategoryName(record.category_name)
                      setCategoryDescription(record.category_description)
                      setThumbnail(record.category_thumbnail)
                      setCategorySlug(record.category_slug)
                      setParentCategory(record.category_parent_id === null ? undefined : record.category_parent_id)
                    }}
                  >
                    <Edit size='15' color='#bc9143' /> <span>Update</span>
                  </button>
                )
              },
              {
                key: '3',
                label:
                  record.category_is_delete === 0 ? (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Delete record ${record.category_id}`}
                      description='Are you sure to delete this record?'
                      onConfirm={() => handleDeleteCategory(record.category_id)}
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
                      title={`Restore record ${record.category_id}`}
                      description='Are you sure to restore this record?'
                      onConfirm={() => handleRestoreCategory(record.category_id)}
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
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })

  const convertDataToTree = (data) => {
    const map = {}
    const tree = []

    data.forEach((item) => {
      map[item.category_id] = { ...item, children: [] }
    })

    data.forEach((item) => {
      if (item.category_parent_id !== null) {
        map[item.category_parent_id].children.push(map[item.category_id])
      } else {
        tree.push(map[item.category_id])
      }
    })

    return tree
  }

  const convertToTreeData = (data) => {
    return data.map((item) => ({
      title: item.category_name,
      value: item.category_id,
      children: item.children ? convertToTreeData(item.children) : []
    }))
  }

  const searchCategories = () => {
    let results
    if (searchValue)
      results = data1D.filter((item) => {
        const matchCategoryInfo =
          item.category_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.category_id.toString() === searchValue ||
          item.category_type.toLowerCase().includes(searchValue.toLowerCase())
        const matchesStatus = selectedStatus !== undefined ? item.category_is_delete === selectedStatus : true
        return matchCategoryInfo && matchesStatus
      })
    else {
      results = data.filter((item) => {
        const matchesStatus = selectedStatus !== undefined ? item.category_is_delete === selectedStatus : true
        return matchesStatus
      })
    }
    const tableData = results
    const typeData = [...new Set(tableData.map((item) => item.category_type))]
    const typeDataFilter = typeData.map((item) => ({
      text: item,
      value: item
    }))
    setTypeData(typeDataFilter)
    setFilterData(tableData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: results.length
      }
    })
  }

  const fetchCategories = async (token, params) => {
    setLoading(true)
    const query = qs.stringify({
      ...params
    })
    try {
      const result = await CategoriesAPI.searchCategories(token, query)
      if (!result) {
        return
      }
      const data = result.data
      setData1D(data)
      const treeDataConvert = convertDataToTree(data)
      const tableData = treeDataConvert.map((item) => ({
        ...item,
        key: item.category_id
      }))
      const treeDataSelect = convertToTreeData(treeDataConvert)
      const typeData = [...new Set(tableData.map((item) => item.category_type))]
      const typeDataFilter = typeData.map((item) => ({
        text: item,
        value: item
      }))
      setTypeData(typeDataFilter)
      setTreeData(treeDataSelect)
      setFilterData(tableData)
      setData(tableData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: treeDataConvert.length
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
  const handleUploadThumbnail = (e) => {
    const file = e.target.files[0]
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']
    if (file && validExtensions.includes(file.type)) {
      setThumbnail(URL.createObjectURL(file))
      setSelectedFile(file)
      fileInputRef.current.value = null
    } else {
      setStatus(422)
      setMessageResult(`File ${file.name} is not a valid image file.`)
    }
  }
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
      setThumbnail(URL.createObjectURL(droppedFile))
      fileInputRef.current.value = null
    }
  }
  const handleClearThumbnail = (e) => {
    e.stopPropagation()
    setThumbnail(null)
    setSelectedFile(null)
  }

  const CheckCategoryNameExist = (name) => {
    const check = data.find((item) => {
      if (typeModal === 'update' && item.category_id === selectedCategory) {
        return false
      }
      return item.category_name === name
    })
    return check !== undefined
  }

  const handleErrorCategoryType = (value) => {
    if (value === '') {
      setErrorCategoryType('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorSlug = (value) => {
    if (value === '') {
      setErrorSlug('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorCategoryName = (value) => {
    if (value === '') {
      setErrorCategoryName('This field cannot be empty.')
      return false
    }
    if (CheckCategoryNameExist(value)) {
      setErrorCategoryName('This name is already exist.')
      return false
    }

    return true
  }

  const handleCancel = () => {
    setOpenModal(false)
    setErrorCategoryType('')
    setErrorCategoryName('')
    setErrorFileUpload('')
    setCategoryType('')
    setCategoryName('')
    setCategoryDescription('')
    setCategorySlug('')
    setErrorSlug('')
    setThumbnail(null)
    setSelectedFile(null)
    setParentCategory()
  }

  const handleDeleteCategory = async (id) => {
    try {
      const response = await CategoriesAPI.deleteCategories(id, token)
      if (!response) {
        return
      }
      setStatus(200)
      setMessageResult(`Delete category with id: ${id} successfully.`)
    } catch (err) {
      if (err.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  const handleRestoreCategory = async (id) => {
    try {
      const response = await CategoriesAPI.restoreCategories(id, token)
      if (!response) {
        return
      }
      setStatus(200)
      setMessageResult(`Restore category with id: ${id} successfully.`)
    } catch (err) {
      if (err.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    const formData = new FormData()
    const category_type = categoryType
    const category_name = categoryName
    const category_description = categoryDescription
    const category_parent_id = parentCategory === undefined || null ? '' : parentCategory
    const File = selectedFile === undefined || null ? '' : selectedFile
    const isValidCategoryType = handleErrorCategoryType(categoryType)
    const isValidCategoryName = handleErrorCategoryName(categoryName)
    const isValidSlug = handleErrorSlug(categorySlug)

    if (!isValidCategoryType || !isValidCategoryName || !isValidSlug) {
      setSubmitLoading(false)
      return
    }

    if (category_type) {
      formData.append('category_type', category_type)
    }
    if (category_name) {
      formData.append('category_name', category_name)
    }
    if (category_description) {
      formData.append('category_description', category_description)
    }

    if (File) {
      formData.append('category_thumbnail', File)
    }
    formData.append('category_parent_id', category_parent_id)
    formData.append('category_slug', categorySlug)

    let response = null
    try {
      if (typeModal === 'add') {
        response = await CategoriesAPI.addCategories(formData, token)
      } else if (typeModal === 'update') {
        response = await CategoriesAPI.updateCategories(selectedCategory, formData, token)
      }
      if (!response) {
        return
      }
      setStatus(200)
      if (typeModal === 'add') {
        setMessageResult('Category was added successfully.')
      } else if (typeModal === 'update') {
        setMessageResult('Category was updated successfully')
      }
    } catch (error) {
      if (error.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(error.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories(token, {
      search: searchValue
    })
  }, [])

  useEffect(() => {
    if (data) {
      searchCategories()
    }
  }, [
    searchValue,
    selectedStatus,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    tableParams.pagination?.pageSize,
    JSON.stringify(tableParams.filters)
  ])

  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      openMessage('success', messageResult, 3)
      fetchCategories(token, {
        search: searchValue
      })
      setStatus(null)
      setMessageResult(null)
      handleCancel()
    } else if (status >= 400) {
      openMessage('error', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])

  return (
    <section className='max-w-[100%] h-full'>
      {contextHolder}
      <header className='flex justify-between animate-slideDown'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs
            items={[
              { title: 'Inventory' },
              {
                title: (
                  <Link to='/admin/categories' tabIndex='-1'>
                    List of categories ({filterData?.length})
                  </Link>
                )
              }
            ]}
          />
          <p>List of categories available</p>
        </div>
        <button
          className='h-[46px] px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'
          onClick={() => {
            setOpenModal(true)
            setTypeModal('add')
            setSelectedCategory(null)
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
            {typeModal} Category (fields with <span className='text-[red]'>*</span> are required)
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
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull relative flex-flex-col gap-8'>
                <label htmlFor='category_thumbnail' className='AddCategoryForm__label'>
                  Thumbnail (only *.jpeg, *.jpg, *.png, *.gif and *.svg)
                </label>
                <input
                  type='file'
                  accept='image/jpg, image/jpeg, image/png, image/gif, image/svg'
                  name='category_thumbnail'
                  id='category_thumbnail'
                  className='hidden'
                  placeholder='Choose file'
                  onChange={handleUploadThumbnail}
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
                        if (!thumbnail) {
                          document.getElementById('category_thumbnail').click()
                        }
                      }}
                      className='w-full max-w-[18.75rem] min-h-40 flex flex-col items-center justify-center rounded-lg gap-2 text-lg m-auto'
                      style={{
                        border: thumbnail !== null ? 'None' : '3px dashed #e8ebed'
                      }}
                    >
                      {thumbnail ? (
                        <>
                          <Image
                            src={thumbnail}
                            alt='Thumbnail'
                            className='w-full max-w-[18.75rem] max-h-40 object-cover rounded-lg'
                          />
                          <CloseCircleOutlined
                            className='absolute top-0 right-0 text-red-500 text-[20px] cursor-pointer'
                            onClick={handleClearThumbnail}
                          />
                        </>
                      ) : (
                        <div className='w-full flex items-center justify-center gap-4 p-5 '>
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
                <label htmlFor='category_type' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Type
                </label>
                <Tooltip
                  title={errorCategoryType}
                  open={errorCategoryType !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='category_type'
                    id='category_type'
                    className='AddCategoryForm__input'
                    placeholder='medicine'
                    value={categoryType}
                    onChange={(e) => setCategoryType(e.target.value)}
                    onFocus={() => setErrorCategoryType('')}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_name' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Name
                </label>
                <Tooltip
                  title={errorCategoryName}
                  open={errorCategoryName !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='category_name'
                    id='category_name'
                    className='AddCategoryForm__input'
                    placeholder='Thuốc kê đơn'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    onFocus={() => setErrorCategoryName('')}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_slug' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Slug
                </label>
                <Tooltip
                  title={errorSlug}
                  open={errorSlug !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='category_slug'
                    id='category_slug'
                    className='AddCategoryForm__input'
                    placeholder='Thuoc-ke-don'
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    onFocus={() => setErrorSlug('')}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_description' className='AddCategoryForm__label'>
                  Description
                </label>
                <textarea
                  type='text'
                  name='category_description'
                  id='category_description'
                  className='AddCategoryForm__textarea'
                  rows={6}
                  placeholder='This is a category description'
                  value={categoryDescription !== null ? categoryDescription : ''}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_parent_id' className='AddCategoryForm__label mb-1'>
                  Parent (Default value = none parent)
                </label>
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextQuaternary: '#1D242E', // Disabled text color
                      colorTextPlaceholder: '#1D242E', // Placeholder text color
                      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                      controlOutline: 'none', // outline color
                      colorBorder: '#e8ebed', // Border color
                      borderRadius: '4px'
                    },
                    components: {
                      Select: {
                        activeBorderColor: '#1D242E',
                        hoverBorderColor: '#1D242E'
                      },
                      TreeSelect: {
                        nodeHoverBg: 'rgb(0, 143, 153, 0.3)',
                        nodeSelectedBg: 'rgb(0, 143, 153, 0.3)'
                      }
                    }
                  }}
                >
                  <TreeSelect
                    suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                    allowClear
                    showSearch
                    defaultValue={undefined}
                    value={parentCategory || undefined}
                    placeholder='Default value'
                    placement='bottomLeft'
                    treeData={treeData}
                    treeDefaultExpandAll
                    className='w-[100%]'
                    onChange={(value) => {
                      setParentCategory(value)
                    }}
                  />
                </ConfigProvider>
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

      <Modal centered open={openModalView} width={350} footer={null} onCancel={() => setOpenModalView(false)}>
        <div className='w-[300px] flex justify-between pt-10'>
          <Tooltip
            title={
              selectedCategoryData !== null
                ? selectedCategoryData.category_description !== null
                  ? selectedCategoryData.category_description
                  : '...'
                : '...'
            }
            open={showDescription}
            placement='bottom'
            align={{
              offset: [0, 10]
            }}
            overlayStyle={{ maxWidth: '800px', whiteSpace: 'normal' }}
          >
            <figure className='w-[100%] flex justify-center items-center flex-col grow'>
              <img
                src={selectedCategoryData !== null ? selectedCategoryData.category_thumbnail : ''}
                alt={selectedCategoryData !== null ? selectedCategoryData.category_name : ''}
                className='w-[200px] h-[200px] object-cover rounded-full'
                onMouseEnter={() => setShowDescription(true)}
                onMouseLeave={() => setShowDescription(false)}
              />
              <figcaption className='mt-2 text-center'>
                {selectedCategoryData !== null ? selectedCategoryData.category_name : ''}
              </figcaption>
            </figure>
          </Tooltip>
        </div>
      </Modal>
      <div className='p-5 my-4 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center w-[340px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for categories'
              className='focus:border-[#1D242E] border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
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
          <div>
            <ConfigProvider theme={filterTheme}>
              <Select
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                placeholder='Select status'
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
            rowKey='category_id'
            data={filterData}
            tableParams={tableParams}
            tableStyles={{ width: '1200px', minHeight: '350px', maxHeight: '450px', backgroundColor: '#ffffff' }}
            scroll={{ y: '300px' }}
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

export default Categories
