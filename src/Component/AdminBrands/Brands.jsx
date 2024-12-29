import { BrandsAPI } from '../../Api/admin'
import { Add, SearchNormal, Edit, Eye, Refresh } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { Dropdown, Popconfirm, message, Modal, Tooltip, Spin, DatePicker, ConfigProvider, Image } from 'antd'
import qs from 'qs'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
import AdminTable from '../AdminTable'
import BreadCrumbs from '../AdminBreadCrumbs'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
import DownloadCSV from '../DownloadCSV'
const { RangePicker } = DatePicker

const Brands = () => {
  const { setIsLogin } = useAdminMainLayoutFunction()
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

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

  //#region Table data
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
    const formattedDate = new Date(date).toLocaleDateString('en-GB', optionsDateformat)
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
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      ellipsis: true,
      render: (text, record) => (
        <div className='flex items-center gap-2 justify-start'>
          <img src={record.brand_logo} alt={text} className='w-[48px] h-[48px] object-cover rounded-full' />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Create at',
      dataIndex: 'brand_created_at',
      key: 'brand_created_at',
      sorter: (a, b) => new Date(a.brand_created_at) - new Date(b.brand_created_at),
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{DateFormat(text)}</span>
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
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      setOpenModal(true)
                      setSelectedBrand(record.brand_id)
                      setBrandName(record.brand_name)
                      setBrandDescription(record.brand_description)
                      setLogo(record.brand_logo)
                      setBrandSlug(record.brand_slug)
                      setTypeModal('update')
                    }}
                  >
                    <Edit size='15' color='#bc9143' /> <span>Update</span>
                  </button>
                )
              },
              {
                key: '3',
                label:
                  record.brand_is_delete === 0 ? (
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
                      title={`Restore record ${record.brand_id}`}
                      description='Are you sure to restore this record?'
                      onConfirm={() => {
                        handleRestoreBrand(record.brand_id)
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

  const searchBrand = () => {
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
        const matchesBrandName =
          item.brand_name.toLowerCase().includes(searchValue.toLowerCase()) || item.brand_id.toString() === searchValue
        const matchesDateRange =
          selectedFrom && selectedTo
            ? formatDate(item.brand_created_at) &&
              formatDate(selectedFrom) &&
              formatDate(selectedTo) &&
              formatDate(item.brand_created_at) >= formatDate(selectedFrom) &&
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
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  const fetchBrands = async (params) => {
    setLoading(true)
    const query = qs.stringify({
      ...params
    })
    try {
      const result = await BrandsAPI.searchBrands(query)
      if (!result) return
      const data = result.data
      const tableData = data
        .map((item) => ({
          ...item,
          key: item.brand_id
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
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBrands({
      search: searchValue
    })
  }, [])

  useEffect(() => {
    if (data) {
      searchBrand()
    }
  }, [
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    tableParams.pagination?.pageSize,
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
  const [brandSlug, setBrandSlug] = useState('')
  const [errorSlug, setErrorSlug] = useState('')
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
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']
    if (file && validExtensions.includes(file.type)) {
      setLogo(URL.createObjectURL(file))
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
    try {
      const res = await BrandsAPI.deleteBrands(id, token)
      if (!res) {
        return
      }
      setStatus(200)
      setMessageResult('Brand was successfully deleted')
    } catch (e) {
      if (e.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  const handleRestoreBrand = async (id) => {
    try {
      const res = await BrandsAPI.restoreBrands(id, token)
      if (!res) {
        return
      }
      setStatus(200)
      setMessageResult('Brand was successfully restored')
    } catch (e) {
      if (e.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(e.message)
    }
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
    formData.append('brand_slug', brandSlug)
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
      if (!response) {
        return
      }
      setStatus(200)
      if (typeModal === 'add') {
        setMessageResult('Brand was successfully added')
      } else if (typeModal === 'update') {
        setMessageResult('Brand was successfully updated')
      }
    } catch (e) {
      if (e.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(500)
      setMessageResult(e.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  //handle cancel modal
  const handleCancel = () => {
    setLogo(null)
    setSelectedFile(null)
    setBrandName('')
    setBrandDescription('')
    setBrandSlug('')
    setErrorSlug('')
    setErrorBrandName('')
    setOpenModal(false)
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
      openMessage('success', messageResult, 3)
      fetchBrands({
        search: searchValue
      })
      handleCancel()
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
    <section className='w-full max-w-[100%] h-full'>
      {contextHolder}
      <header className='flex justify-between animate-slideDown'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs items={[{ title: `Brands (${filterData?.length})` }]} />
          <p>List of brands available</p>
        </div>
        <div className='flex gap-4 items-center'>
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
          <div>
            <DownloadCSV data={filterData} filename='brands' columns={columns} />
          </div>
        </div>
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
                <label htmlFor='brand_logo' className='AddCategoryForm__label mb-8'>
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
                      onClick={() => {
                        if (!Logo) document.getElementById('brand_logo').click()
                      }}
                      className='w-full max-w-[18.75rem] min-h-40 flex flex-col items-center justify-center rounded-lg gap-2 text-lg m-auto'
                      style={{
                        border: Logo !== null ? 'None' : '3px dashed #e8ebed'
                      }}
                    >
                      {Logo ? (
                        <>
                          <Image
                            src={Logo}
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
                    placeholder='This is a brand slug'
                    value={brandSlug}
                    onChange={(e) => setBrandSlug(e.target.value)}
                    onFocus={() => setErrorSlug('')}
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
      <div className='p-5 my-4 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center w-[340px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for brands'
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
        <div className='pt-4'>
          <AdminTable
            columns={columns}
            rowKey='brand_id'
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
export default Brands
