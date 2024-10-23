import './Categories.css'
import CategoriesAPI from '../../Api/admin/categories'
import { ArrowRight2, Add, SearchNormal, ArrowDown2, Edit, Refresh, Eye } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ConfigProvider, Select } from 'antd'
import { Table, TreeSelect, Breadcrumb, Empty, Dropdown, Popconfirm, message, Modal, Tooltip, Pagination } from 'antd'
import qs from 'qs'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
const Categories = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [selectData, setSelectData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [errorCategoryID, setErrorCategoryID] = useState('')
  const [categoryType, setCategoryType] = useState('')
  const [errorCategoryType, setErrorCategoryType] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [errorCategoryName, setErrorCategoryName] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [parentCategory, setParentCategory] = useState()
  const [productSelected, setProductSelected] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorFileUpload, setErrorFileUpload] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)
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
      sorter: (a, b) => a.category_type.localeCompare(b.category_type),
      ellipsis: true
    },
    {
      title: 'Parent',
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
      filters: [
        {
          text: 'Active',
          value: 0
        },
        {
          text: 'Deleted',
          value: 1
        }
      ],
      onFilter: (value, record) => record.category_is_delete === value,
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
                  <Link
                    to={`/admin/categories/${record.category_id}`}
                    className='flex items-center gap-x-2 justify-center'
                  >
                    <Eye size='15' color='green' /> <span>View</span>
                  </Link>
                )
              },
              {
                key: '2',
                label: (
                  <Link
                    to={`/admin/categories/update/${record.category_id}`}
                    className='flex items-center gap-x-2 justify-center'
                  >
                    <Edit size='15' color='green' /> <span>Update</span>
                  </Link>
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
              },
              {
                key: '4',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Restore record ${record.category_id}`}
                    description='Are you sure to restore this record?'
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
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 2
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
        pageSizeOptions={pageSizeOptions || ['3', '5', '10']}
      />
    </div>
  )
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

  const fetchCategories = async (params) => {
    setLoading(true)
    const query = qs.stringify({
      ...params
    })
    const response = await CategoriesAPI.searchCategories(query)

    const { data } = response.data
    const tableData = data.map((item) => ({
      key: item.category_id,
      category_name: item.category_name,
      category_type: item.category_type,
      category_thumbnail: item.category_thumbnail,
      category_description: item.category_description,
      category_parent_id: item.category_parent_id,
      category_is_delete: item.category_is_delete,
      children: item.children,
      category_id: item.category_id
    }))
    const treeData = convertToTreeData(data)
    const selectData = convertToSelectData(data)
    setSelectData(selectData)
    setTreeData(treeData)
    setData(tableData)
    setLoading(false)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data.length
      }
    })
  }
  const handleTableChange = (pagination, filters, sorter) => {
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

  const CheckCategoryIDExist = (ID) => {
    const check = data.find((item) => item.category_id === ID)
    return check
  }

  const CheckCategoryNameExist = (name) => {
    const check = data.find((item) => item.category_name === name)
    return check
  }
  const handleErrorCategoryID = (value) => {
    if (value === '') {
      setErrorCategoryID('This field cannot be empty.')
      return false
    }
    if (CheckCategoryIDExist(value)) {
      setErrorCategoryID('This ID is already exist.')
      return false
    }
    return true
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

  const handleErrorFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorFileUpload("Please upload an image with extension: '.jpeg', '.jpg', '.png'")
      return false
    }
    return true
  }
  const handleCancel = () => {
    setOpenModal(false)
    setErrorCategoryID('')
    setErrorCategoryType('')
    setErrorCategoryName('')
    setErrorFileUpload('')
    setThumbnail(null)
    setSelectedFile(null)
    setParentCategory()
    setProductSelected([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData()
    const category_id = form.category_id.value
    const category_type = form.category_type.value
    const category_name = form.category_name.value
    const category_description = form.category_description.value
    const category_parent_id = parentCategory === undefined ? '' : parentCategory
    const children = productSelected
    const File = selectedFile
    const isValidCategoryID = handleErrorCategoryID(category_id)
    const isValidCategoryType = handleErrorCategoryType(category_type)
    const isValidCategoryName = handleErrorCategoryName(category_name)
    const isValidFileUpload = handleErrorFileUpload(File)

    if (!isValidCategoryID || !isValidCategoryType || !isValidCategoryName || !isValidFileUpload) {
      return
    }
    formData.append('category_id', category_id)
    formData.append('category_type', category_type)
    formData.append('category_name', category_name)
    formData.append('category_description', category_description)
    formData.append('category_parent_id', category_parent_id)
    formData.append('category_thumbnail', File)
    formData.append('children', children)
    console.log('data', Object.fromEntries(formData))
  }

  useEffect(() => {
    fetchCategories({
      search: searchValue
    })
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters)
  ])

  useEffect(() => {
    fetchCategories({
      search: searchValue
    })
  }, [])
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
                      List of categories ({data?.length})
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
          onClick={() => setOpenModal(true)}
        >
          <Add size='20' />
          Add new category
        </button>
      </header>
      <Modal
        destroyOnClose
        title={
          <span>
            Add new Category (fields with <span className='text-[red]'>*</span> are required)
          </span>
        }
        centered
        open={openModal}
        width={800}
        footer={null}
        onCancel={handleCancel}
      >
        <div className='modal__content mt-7'>
          <form action='' method='POST' onSubmit={handleSubmit}>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull relative'>
                <label htmlFor='category_thumbnail' className='AddCategoryForm__label mb-1'>
                  <span className='text-[red]'>* </span>Thumbnail (only *.jpeg, *.jpg, *.png)
                </label>
                <input
                  type='file'
                  accept='image/jpg, image/jpeg, image/png'
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
              <div className='AddCategoryForm__group'>
                <label htmlFor='category_id' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>ID
                </label>
                <Tooltip
                  title={errorCategoryID}
                  open={errorCategoryID !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='category_id'
                    id='category_id'
                    className='AddCategoryForm__input'
                    placeholder='123'
                    value={categoryID}
                    onChange={(e) => setCategoryID(e.target.value)}
                    onFocus={() => setErrorCategoryID('')}
                  />
                </Tooltip>
              </div>
              <div className='AddCategoryForm__group'>
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
                />
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_parent_id' className='AddCategoryForm__label mb-1'>
                  Parent (default value = none parent)
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
                        selectorBg: 'transparent',
                        activeBorderColor: '#1D242E',
                        hoverBorderColor: '#1D242E'
                      }
                    }
                  }}
                >
                  <TreeSelect
                    suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                    allowClear
                    showSearch
                    value={parentCategory}
                    placeholder='- Choose Group -'
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
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_parent_id' className='AddCategoryForm__label mb-1'>
                  Add product
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
                        selectorBg: 'transparent',
                        activeBorderColor: '#1D242E',
                        hoverBorderColor: '#1D242E'
                      }
                    }
                  }}
                >
                  <Select
                    suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                    allowClear
                    mode='multiple'
                    showSearch
                    options={selectData}
                    placeholder='- Choose Product -'
                    placement='bottomLeft'
                    dropdownStyle={{ maxHeight: 200, overflow: 'auto', minWidth: '400px' }}
                    className='w-[100%]'
                    onClear={() => setProductSelected([])}
                    onChange={(value) => {
                      setProductSelected([...value])
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
      <div className='table__content my-[15px] bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-md'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center bg-[#fafafa] w-[340px] justify-between text-[14px] border-[1px] border-solid border-[#e8ebed] rounded-[4px] animate-[slideLeftToRight_1s_ease] relative'>
            <input
              type='text'
              placeholder='Search for categories'
              className='border-none outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
                if (e.target.value === '') {
                  fetchCategories({
                    search: undefined
                  })
                }
              }}
            />
            <button
              onClick={() => {
                fetchCategories({
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
                  rowHoverBg: '#f4f5f7',
                  headerSplitColor: 'none',
                  headerBg: '#fafafa',
                  sortField: '#fafafa',
                  sortOrder: '#fafafa',
                  borderColor: '#e8ebed'
                }
              }
            }}
          >
            <Table
              size='small'
              columns={columns}
              rowKey={(record) => record.category_id}
              dataSource={data}
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
