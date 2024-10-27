import './Brands.css'
import BrandsAPI from '../../Api/admin/brands'
import { ArrowRight2, Add, SearchNormal, Edit, Refresh, Eye } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ConfigProvider, Select } from 'antd'
import { Table, Breadcrumb, Dropdown, Popconfirm, message, Modal, Tooltip, Pagination, Spin, DatePicker } from 'antd'
import qs from 'qs'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
const Brands = () => {
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

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

  //Table columns
  const columns = [
    {
      title: '#',
      dataIndex: 'brand_id',
      key: 'brand_id',
      width: '10%',
      sorter: (a, b) => a.brand_id - b.brand_id,
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'brand_name',
      key: 'brand_name',
      width: '30%',
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      ellipsis: true,
      render: (text, record) => (
        <div className='flex items-center gap-x-2 justify-start'>
          <img src={record.brand_logo} alt={text} className='w-[48px] h-[48px] object-cover rounded-full' />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Create at',
      dataIndex: 'brand_created_at',
      key: 'brand_created_at',
      width: '20%',
      sorter: (a, b) => new Date(a.brand_created_at) - new Date(b.brand_created_at),
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{DateFormat(text)}</span>
    },
    {
      title: 'Status',
      dataIndex: 'brand_is_delete',
      key: 'brand_is_delete',
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
          placement='bottomRight'
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
                      setSelectedBrandData(record)
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
                      setSelectedBrand(record.brand_id)
                      setBrandName(record.brand_name)
                      setBrandDescription(record.brand_description)
                      setLogo(record.brand_logo)
                      setTypeModal('update')
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
                    title={`Delete record ${record.brand_id}`}
                    description='Are you sure to delete this record?'
                    onConfirm={() => handleDeleteBrand(record.brand_id)}
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
        pageSizeOptions={pageSizeOptions || ['8', '10', '20', '50']}
      />
    </div>
  )

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

  const searchBrand = () => {
    setLoading(true)
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
      const matchesBrandName = item.brand_name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesDateRange =
        selectedFrom && selectedTo
          ? formatDate(item.brand_created_at) >= formatDate(selectedFrom) &&
            formatDate(item.brand_created_at) <= formatDate(selectedTo)
          : true
      return matchesBrandName && matchesDateRange
    })
    const tableData = result.sort((a, b) => new Date(b.brand_created_at) - new Date(a.brand_created_at))
    setFilterData(tableData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: result.length
      }
    })
    setLoading(false)
  }

  const fetchBrands = async (params) => {
    setLoading(true)
    const query = qs.stringify({
      ...params
    })
    const response = await BrandsAPI.searchBrands(query)
    if (!response.ok) {
      setStatus(response.status)
      setMessageResult(`Error fetching categories: with status ${response.status}`)
      setLoading(false)
      return
    }
    const result = await response.json()
    const data = result.data
    const tableData = data
      .map((item) => ({
        key: item.brand_id,
        brand_name: item.brand_name,
        brand_logo: item.brand_logo,
        brand_description: item.brand_description,
        brand_is_delete: item.brand_is_delete,
        brand_created_at: item.brand_created_at,
        brand_updated_at: item.brand_updated_at,
        brand_id: item.brand_id
      }))
      .sort((a, b) => new Date(b.brand_updated_at) - new Date(a.brand_updated_at))
    setFilterData(tableData)
    setData(tableData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data.length
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchBrands({
      search: searchValue
    })
  }, [tableParams.pagination?.pageSize])

  useEffect(() => {
    if (data) {
      searchBrand()
    }
  }, [
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    selectedFrom,
    selectedTo
  ])
  //#endregion

  //#region Modal add or update
  //Modal setting
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState('add')

  //#region Form data
  const [brandName, setBrandName] = useState('')
  const [errorBrandName, setErrorBrandName] = useState('')
  const [brandDescription, setBrandDescription] = useState('')
  const [selectedBrand, setSelectedBrand] = useState(null) // brand ID
  const [selectedBrandData, setSelectedBrandData] = useState(null) // brand record data
  const [Logo, setLogo] = useState(null)
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
      setLogo(URL.createObjectURL(droppedFile))
      fileInputRef.current.value = null
    }
  }

  //handle upload logo
  const handleUploadLogo = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setLogo(URL.createObjectURL(file))
      setSelectedFile(file)
      fileInputRef.current.value = null
    }
  }

  //handle clear logo
  const handleClearLogo = (e) => {
    e.stopPropagation()
    setLogo(null)
    setSelectedFile(null)
  }

  //handle error brand name
  const CheckBrandNameExist = (name) => {
    const check = data.find((item) => {
      if (typeModal === 'update' && item.brand_id === selectedBrand) {
        return false
      }
      return item.category_name === name
    })
    return check !== undefined
  }

  const handleErrorBrandName = (name) => {
    if (name === '') {
      setErrorBrandName('Brand name is required')
      return false
    }
    if (CheckBrandNameExist(name)) {
      setErrorBrandName('Brand name is already exist')
      return false
    }
    return true
  }

  // handle delete brand record
  const handleDeleteBrand = async (id) => {
    const response = await BrandsAPI.deleteBrands(id, token)
    setTypeModal('Delete')
    if (response.ok) {
      fetchBrands({
        search: searchValue
      })
    } else {
      if (response.status === 401) {
        setStatus(401)
        setMessageResult('Unauthorized access. Please check your credentials.')
      } else {
        setStatus(response.status)
        setMessageResult(`Error delete brand with status: ${response.status}, message: `, response.messages)
        console.log(await response.json())
      }
      return
    }
    const result = await response.json()
    const { messages, status } = result
    setStatus(status)
    setMessageResult(messages)
  }

  // handle submit and or update brand
  const [submitLoading, setSubmitLoading] = useState(false) // loading submit state
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    const formData = new FormData()
    const brand_name = brandName
    const brand_description = brandDescription
    const isValidBrandName = handleErrorBrandName(brand_name)
    if (!isValidBrandName) {
      setSubmitLoading(false)
      return
    }
    formData.append('brand_name', brandName)
    if (brand_description) formData.append('brand_description', brandDescription)
    if (selectedFile) formData.append('brand_logo', selectedFile)
    let response = null
    try {
      if (typeModal === 'add') {
        response = await BrandsAPI.addBrands(formData, token)
      }
      if (typeModal === 'update') {
        response = await BrandsAPI.updateBrands(selectedBrand, formData, token)
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
          setMessageResult(`Error ${typeModal} brand: ${messages}`)
        }
        return
      }
      const result = await response.json()
      const { messages, status } = result
      setStatus(status)
      setMessageResult(messages)
      setSubmitLoading(false)
    } catch (e) {
      setSubmitLoading(false)
    } finally {
      setSubmitLoading(false)
    }
  }

  //handle cancel modal
  const handleCancel = () => {
    setOpenModal(false)
    setLogo(null)
    setSelectedFile(null)
    setBrandName('')
    setBrandDescription('')
    setErrorBrandName('')
  }
  //#endregion

  //#endregion

  //#region Modal view
  const [openModalView, setOpenModalView] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  //#endregion

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      message.success(`${typeModal} brand was successfully`, 3)
      fetchBrands({
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
  //#endregion

  return (
    <section className='max-w-[100%] h-full'>
      <header className='flex justify-between'>
        <div className='Breadcrumb animate-[slideLeftToRight_1s_ease]'>
          <h1>
            <Breadcrumb
              separator={<ArrowRight2 size='15' color='#1D242E' />}
              className='font-bold text-[#848A91]'
              items={[
                { title: 'Brands' },
                {
                  title: (
                    <Link to='/admin/brands' tabIndex='-1'>
                      List of brands ({data?.length})
                    </Link>
                  )
                }
              ]}
            ></Breadcrumb>
          </h1>
          <p className='mt-[11px]'>List of brands available</p>
        </div>
        <button
          className='min-w-[162px] h-[46px] px-[18px] py-[16px] bg-[#F0483E] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px] animate-[slideRightToLeft_1s_ease]'
          onClick={() => {
            setOpenModal(true)
            setTypeModal('add')
          }}
        >
          <Add size='20' />
          Add new brand
        </button>
      </header>
      <Modal
        destroyOnClose
        title={
          <span>
            {typeModal} new Brand (fields with <span className='text-[red]'>*</span> are required)
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
                <label htmlFor='brand_logo' className='AddCategoryForm__label mb-1'>
                  Logo (only *.jpeg, *.jpg, *.png, *.gif and *.svg)
                </label>
                <input
                  type='file'
                  accept='image/jpg, image/jpeg, image/png, image/gif, image/svg'
                  name='brand_logo'
                  id='brand_logo'
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
                      onClick={() => document.getElementById('brand_logo').click()}
                      className='AddCategoryForm__uploadBtn'
                      style={{
                        border: Logo !== null ? 'None' : '3px dashed #e8ebed'
                      }}
                    >
                      {Logo ? (
                        <>
                          <img src={Logo} alt='Logo' className='w-full h-[300px] object-cover' />
                          <CloseCircleOutlined
                            className='absolute top-0 right-0 text-red-500 text-[20px] cursor-pointer'
                            onClick={handleClearLogo}
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
                <label htmlFor='brand_name' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Name
                </label>
                <Tooltip
                  title={errorBrandName}
                  open={errorBrandName !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='brand_name'
                    id='brand_name'
                    className='AddCategoryForm__input'
                    placeholder='This is a brand name'
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    onFocus={() => setErrorBrandName('')}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='brand_description' className='AddCategoryForm__label'>
                  Description
                </label>
                <textarea
                  type='text'
                  name='brand_description'
                  id='brand_description'
                  className='AddCategoryForm__textarea'
                  rows={6}
                  placeholder='This is a category description'
                  value={brandDescription !== null ? brandDescription : ''}
                  onChange={(e) => setBrandDescription(e.target.value)}
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
      <Modal centered open={openModalView} width={350} footer={null} onCancel={() => setOpenModalView(false)}>
        <div className='w-[300px] flex justify-between pt-10'>
          <Tooltip
            title={
              selectedBrandData !== null
                ? selectedBrandData.brand_description !== null
                  ? selectedBrandData.brand_description
                  : '...'
                : '...'
            }
            open={showDescription}
            overlayStyle={{ maxWidth: '800px', whiteSpace: 'normal' }}
            placement='bottom'
          >
            <figure className='w-[100%] flex justify-center items-center flex-col grow'>
              <img
                src={selectedBrandData !== null ? selectedBrandData.brand_logo : ''}
                alt={selectedBrandData !== null ? selectedBrandData.brand_name : ''}
                className='w-[200px] h-[200px] object-cover rounded-full'
                onMouseEnter={() => setShowDescription(true)}
                onMouseLeave={() => setShowDescription(false)}
              />
              <figcaption className='mt-2 text-center'>
                {selectedBrandData !== null ? selectedBrandData.brand_name : ''}
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
              placeholder='Search for brands'
              className='searchBox__input border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchBrands({
                  search: searchValue
                })
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <div className='flex gap-x-[12px] items-center animate-[slideRightToLeft_1s_ease]'>
            <ConfigProvider
              theme={{
                token: {
                  colorTextQuaternary: '#1D242E', // Disabled text color
                  colorTextPlaceholder: '#1D242E', // Placeholder text color
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  controlOutline: 'none',
                  colorBorder: '#e8ebed',
                  borderRadius: '4px',
                  colorPrimary: '#008f99'
                },
                components: {
                  Select: {
                    activeBorderColor: '#1D242E',
                    hoverBorderColor: '#1D242E',
                    optionActiveBg: '#bde0fe',
                    optionSelectedBg: '#bde0fe',
                    optionSelectedColor: '#1D242E'
                  },
                  TreeSelect: {
                    nodeHoverBg: '#bde0fe',
                    nodeSelectedBg: '#bde0fe'
                  },
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
              rowKey={(record) => record.brand_id}
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
              className='Brands__table'
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
export default Brands
