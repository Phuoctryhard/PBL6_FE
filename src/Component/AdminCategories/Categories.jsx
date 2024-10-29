import './Categories.css'
import CategoriesAPI from '../../Api/admin/categories'
import { ArrowRight2, Add, SearchNormal, ArrowDown2, Edit, Refresh, Eye } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import {
  Table,
  TreeSelect,
  Breadcrumb,
  Empty,
  Dropdown,
  Popconfirm,
  message,
  Modal,
  Tooltip,
  Pagination,
  Spin
} from 'antd'
import qs from 'qs'
import debounce from 'lodash.debounce'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
const Categories = () => {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [treeData, setTreeData] = useState([])
  const [typeData, setTypeData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [categoryType, setCategoryType] = useState('')
  const [errorCategoryType, setErrorCategoryType] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [errorCategoryName, setErrorCategoryName] = useState('')
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
  const [showDescription, setShowDescription] = useState(false)
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
      width: '20%',
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
      title: 'Parent ID',
      dataIndex: 'category_parent_id',
      key: 'category_parent_id',
      width: '10%',
      sorter: (a, b) => a.category_parent_id - b.category_parent_id,
      ellipsis: true
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
                    className='flex items-center gap-x-2 justify-center'
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
                    className='flex items-center gap-x-2 justify-center'
                    onClick={() => {
                      setOpenModal(true)
                      setSelectedCategory(record.category_id)
                      setTypeModal('update')
                      setCategoryType(record.category_type)
                      setCategoryName(record.category_name)
                      setCategoryDescription(record.category_description)
                      setThumbnail(record.category_thumbnail)
                      setParentCategory(record.category_parent_id === null ? undefined : record.category_parent_id)
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
                    title={`Delete record ${record.category_id}`}
                    description='Are you sure to delete this record?'
                    onConfirm={() => handelDeleteCategory(record.category_id)}
                    okText='Delete'
                    cancelText='Cancel'
                  >
                    <button
                      type='button'
                      className='flex items-center gap-x-2 justify-center'
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
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })
  const CustomPagination = ({ total, current, pageSize, onChange, pageSizeOptions }) => (
    <div className='flex justify-between items-center mt-3'>
      <span className='inline-block text-[14px]'>
        Showing {current - 1 < 1 ? 1 : (current - 1) * pageSize + 1} to{' '}
        {current * pageSize <= total ? current * pageSize : total} of {total} entries
      </span>
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={onChange}
        pageSizeOptions={pageSizeOptions || ['8', '10', '20']}
      />
    </div>
  )

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

  const convertToSelectData = (data) => {
    let selectData = []
    const extractDeepest = (node) => {
      if (!node.children || node.children.length === 0) {
        selectData.push({
          title: node.category_id,
          value: node.category_name
        })
      } else {
        node.children.forEach((child) => extractDeepest(child))
      }
    }

    data.forEach((item) => extractDeepest(item))
    return selectData
  }

  const searchCategories = () => {
    const results = data.filter((item) => {
      const matchesProductName = item.category_name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesType = item.category_type.toLowerCase().includes(searchValue.toLowerCase())

      return matchesProductName || matchesType
    })
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
      const response = await CategoriesAPI.searchCategories(token, query)
      if (!response.ok) {
        if (response.status === 401) {
          setStatus(401)
          setMessageResult('Unauthorized access. Please check your credentials.')
        } else {
          setStatus(response.status)
          setMessageResult(`Error fetching categories: with status ${response.status}`)
        }
        setLoading(false)
        return
      }

      const result = await response.json()
      const data = result.data
      const treeDataConvert = convertDataToTree(data)
      const tableData = treeDataConvert.map((item) => ({
        key: item.category_id,
        category_name: item.category_name,
        category_type: item.category_type,
        category_thumbnail: item.category_thumbnail,
        category_description: item.category_description,
        category_parent_id: item.category_parent_id,
        category_is_delete: item.category_is_delete,
        category_created_at: item.category_created_at,
        category_updated_at: item.category_updated_at,
        children: item.children,
        category_id: item.category_id
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
      setLoading(false)
    } catch (e) {
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
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
    setLoading(false)
  }
  const handleUploadThumbnail = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setThumbnail(URL.createObjectURL(file))
      setSelectedFile(file)
      fileInputRef.current.value = null
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
    setThumbnail(null)
    setSelectedFile(null)
    setParentCategory()
  }

  const handelDeleteCategory = async (id) => {
    const response = await CategoriesAPI.deleteCategories(id, token)
    setTypeModal('Delete')
    if (response.ok) {
      fetchCategories(token, {
        search: searchValue
      })
    } else {
      if (response.status === 401) {
        setStatus(401)
        setMessageResult('Unauthorized access. Please check your credentials.')
      } else {
        setStatus(response.status)
        setMessageResult('Error:', response.messages)
      }
      return
    }
    const result = await response.json()
    const { messages, status } = result
    setStatus(status)
    setMessageResult(messages)
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

    if (!isValidCategoryType || !isValidCategoryName) {
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

    let response = null
    try {
      if (typeModal === 'add') {
        const category_created_at = new Date().toISOString()
        const category_updated_at = new Date().toISOString()
        formData.append('category_created_at', category_created_at)
        formData.append('category_updated_at', category_updated_at)
        response = await CategoriesAPI.addCategories(formData, token)
      } else if (typeModal === 'update') {
        const category_updated_at = new Date().toISOString()
        formData.append('category_updated_at', category_updated_at)
        response = await CategoriesAPI.updateCategories(selectedCategory, formData, token)
      }
      if (!response.ok) {
        setSubmitLoading(false)
        const { messages } = await response.json()
        if (response.status === 401) {
          setStatus(401)
          setMessageResult('Unauthorized access. Please check your credentials.')
        } else if (response.status === 422) {
          setStatus(422)
          setMessageResult(`Invalid data: ${messages}`)
        } else {
          setStatus(response.status)
          setMessageResult('Error:', messages)
        }
        return
      }
      const result = await response.json()
      const { messages, status } = result
      setStatus(status)
      setMessageResult(messages)
    } catch (error) {
    } finally {
      setSubmitLoading(false)
    }
  }

  // useEffect(() => {
  //   fetchCategories(token, {
  //     search: searchValue
  //   })
  // }, [])

  useEffect(() => {
    fetchCategories(token, {
      search: searchValue
    })
  }, [tableParams.pagination?.pageSize])

  useEffect(() => {
    if (data) {
      searchCategories()
    }
  }, [
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters)
  ])

  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      message.success(`${typeModal} category was successfully`, 3)
      fetchCategories(token, {
        search: searchValue
      })
      setStatus(null)
      setMessageResult(null)
      handleCancel()
    } else if (status >= 400) {
      message.error(messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])

  return (
    <section className='max-w-[100%] h-full'>
      <header className='flex justify-between'>
        <div className='Breadcrumb animate-[slideLeftToRight_1s_ease]'>
          <h1>
            <Breadcrumb
              separator={<ArrowRight2 size='15' color='#1D242E' />}
              className='font-bold text-[#848A91]'
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
            ></Breadcrumb>
          </h1>
          <p className='mt-[11px]'>List of categories available</p>
        </div>
        <button
          className='min-w-[162px] h-[46px] px-[18px] py-[16px] bg-[#F0483E] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px] animate-[slideRightToLeft_1s_ease]'
          onClick={() => {
            setOpenModal(true)
            setTypeModal('add')
            setSelectedCategory(null)
          }}
        >
          <Add size='20' />
          Add new category
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
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull relative'>
                <label htmlFor='category_thumbnail' className='AddCategoryForm__label mb-1'>
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
                      onClick={() => document.getElementById('category_thumbnail').click()}
                      className='AddCategoryForm__uploadBtn'
                      style={{
                        border: thumbnail !== null ? 'None' : '3px dashed #e8ebed'
                      }}
                    >
                      {thumbnail ? (
                        <>
                          <img src={thumbnail} alt='Thumbnail' className='w-full h-[300px] object-cover' />
                          <CloseCircleOutlined
                            className='absolute top-0 right-0 text-red-500 text-[20px] cursor-pointer'
                            onClick={handleClearThumbnail}
                          />
                        </>
                      ) : (
                        <>
                          <CloudUploadOutlined className='text-[green] text-[40px]' />{' '}
                          <span>Drag or upload your image here</span>
                        </>
                      )}
                    </button>
                  </div>
                </Tooltip>
                {selectedFile && (
                  <div>
                    <span>{selectedFile.name}</span>
                  </div>
                )}
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
                    placeholder='This is a category name'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    onFocus={() => setErrorCategoryName('')}
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
                    dropdownStyle={{ maxHeight: 250, overflow: 'auto', minWidth: '400px' }}
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
      <div className='table__content my-[15px] bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-md'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center w-[340px] justify-between text-[14px] rounded-[4px] animate-[slideLeftToRight_1s_ease] relative'>
            <input
              type='text'
              placeholder='Search for categories'
              className='searchBox__input border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchCategories(token, {
                  search: searchValue
                })
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
        </div>
        <div className='pt-[15px] animate-[slideUp_1s_ease]'>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  rowHoverBg: '#f5f5f5',
                  headerSplitColor: 'transparent',
                  headerBg: '#f5f5f5',
                  sortField: '#f5f5f5',
                  sortOrder: '#f5f5f5',
                  borderColor: '#e8ebed'
                }
              }
            }}
          >
            <Table
              size='small'
              columns={columns}
              rowKey={(record) => record.category_id}
              dataSource={filterData}
              pagination={{
                position: ['none'],
                ...tableParams.pagination
              }}
              loading={loading}
              onChange={handleTableChange}
              scroll={{
                y: '300px'
              }}
              style={{
                width: '1200px',
                minHeight: '350px',
                maxHeight: '450px',
                backgroundColor: '#ffffff'
              }}
            />
          </ConfigProvider>
          <CustomPagination
            total={tableParams.pagination.total}
            current={tableParams.pagination.current}
            pageSize={tableParams.pagination.pageSize}
            onChange={(page, pageSize) =>
              handleTableChange(
                {
                  ...tableParams.pagination,
                  current: page,
                  pageSize
                },
                tableParams.filters,
                tableParams.sortOrder
              )
            }
          />
        </div>
      </div>
    </section>
  )
}

export default Categories
