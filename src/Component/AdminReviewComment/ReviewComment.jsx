import { BreadCrumbs, AdminTable } from '../'
import { Add, SearchNormal, Edit, Eye, Refresh, Star1, LockSlash, Unlock } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { Dropdown, Popconfirm, message, Modal, Tooltip, Spin, DatePicker, ConfigProvider, Image } from 'antd'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
import { AdminReviewAPI } from '../../Api/admin'
const { RangePicker } = DatePicker
const ReviewComment = () => {
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
    const formattedDate = new Date(date).toLocaleDateString('en-GB', optionsDateformat)
    return `${formattedDate}`
  }

  // Table columns
  const columns = [
    {
      title: '#',
      dataIndex: 'review_id',
      key: 'review_id',
      showSorterTooltip: false,
      width: '10%',
      sorter: (a, b) => a.review_id - b.review_id
    },
    {
      title: 'User',
      dataIndex: 'user_fullname',
      key: 'user_fullname',
      showSorterTooltip: {
        title: 'User',
        placement: 'topLeft',
        trigger: ['hover']
      },
      sorter: (a, b) => a.user_fullname.localeCompare(b.user_fullname),
      width: '20%',
      render: (text, record) => (
        <Tooltip
          title={
            <div className='flex items-center gap-x-2 justify-start'>
              <img
                src={record.user_avatar}
                alt={text}
                className='w-[48px] h-[48px] object-cover rounded-full'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/assets/images/default-avatar.png'
                }}
              />
              <span>{text}</span>
            </div>
          }
          color='#2d3748'
          key={record.order_id}
          trigger={['hover']}
        >
          <div className='flex items-center gap-x-2 justify-start'>
            <img
              src={record.user_avatar}
              alt={text}
              className='w-[48px] h-[48px] object-cover rounded-full'
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/assets/images/default-avatar.png'
              }}
            />
            <span>{text}</span>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      showSorterTooltip: {
        title: 'Product',
        placement: 'topLeft',
        trigger: ['hover']
      },
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      width: '30%',
      render: (text, record) => (
        <Tooltip
          title={
            <div className='flex gap-4 items-center'>
              <img
                src={record.product_images ? record.product_images[0] : '/assets/images/default-image.png'}
                alt='Product'
                className='w-32 h-32 object-cover rounded-[4px]'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/assets/images/default-image.png'
                }}
              />
              <div className='flex'>
                <span className='font-medium text-sm'>{record.product_name}</span>
              </div>
            </div>
          }
          overlayStyle={{ maxWidth: '300px' }}
          color='#2d3748'
          key={record.order_id}
          trigger={['hover']}
        >
          <div className='flex items-center gap-x-2 justify-start'>
            <img
              src={record?.product_images ? record.product_images[0] : '/images/default-image.jpg'}
              alt='Product image'
              className='w-[48px] h-[48px] object-cover rounded-full'
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/assets/images/default-image.png'
              }}
            />
            <span>{text}</span>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Rating',
      dataIndex: 'review_rating',
      key: 'review_rating',
      showSorterTooltip: {
        title: 'Rating',
        placement: 'topLeft',
        trigger: ['hover']
      },
      filters: [
        {
          text: '0 star',
          value: 0
        },
        {
          text: '1 star',
          value: 1
        },
        {
          text: '2 stars',
          value: 2
        },
        {
          text: '3 stars',
          value: 3
        },
        {
          text: '4 stars',
          value: 4
        },
        {
          text: '5 stars',
          value: 5
        }
      ],
      onFilter: (value, record) => record.review_rating === value,
      sorter: (a, b) => a.review_rating - b.review_rating,
      render: (text, record) => {
        var rating = text !== undefined && text !== null ? Number(text) : 0
        var stars = []
        for (var i = 0; i < 5; i++) {
          if (i < rating) {
            stars.push(
              <img
                key={i}
                src='/assets/images/Star.svg'
                className='w-5 h-5'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/assets/images/Star.svg'
                }}
              />
            )
          } else {
            stars.push(
              <img
                key={i}
                src='/assets/images/UnReview_Star.svg'
                className='w-5 h-5'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/assets/images/UnReview_Star.svg'
                }}
              />
            )
          }
        }
        return <div className='flex items-center gap-x-1 justify-start '>{stars}</div>
      }
    },
    {
      title: 'Approval status',
      dataIndex: 'is_approved',
      key: 'is_approved',
      showSorterTooltip: {
        title: 'Approval status',
        placement: 'topLeft',
        trigger: ['hover']
      },
      filters: [
        {
          text: 'Approved',
          value: 0
        },
        {
          text: 'Hidden',
          value: 1
        }
      ],
      onFilter: (value, record) => record.is_approved === value,
      sorter: (a, b) => a.is_approved - b.is_approved,
      render: (text, record) => {
        let color
        let backgroundColor
        let borderColor
        let status = record.is_approved
        let statusText = status === 0 ? 'Approved' : 'Hidden'
        switch (status) {
          case 0:
            color = '#065F46'
            backgroundColor = '#D1FAE5'
            borderColor = '#6EE7B7'
            break
          case 1:
            borderColor = '#FCA5A5'
            backgroundColor = '#FEE2E2'
            color = '#991B1B'
            break
        }
        return (
          <span
            style={{ color, backgroundColor, border: `1px solid ${borderColor}` }}
            className='inline-block justify-center items-center py-[2px] px-[10px] rounded whitespace-nowrap text-xs'
          >
            {statusText}
          </span>
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
                    className='flex items-center gap-x-2 justify-center'
                    type='button'
                    onClick={() => {
                      setModalData(record)
                      setOpenModal(true)
                    }}
                  >
                    <Eye className='text-[green]' size={15} />
                    <span>View</span>
                  </button>
                )
              },
              {
                key: '2',
                label:
                  record.is_approved === 0 ? (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Hidden this review of ${record.user_fullname}`}
                      description='Are you sure to hidden this review?'
                      onConfirm={() => {
                        handleHiddenReview(record.review_id)
                      }}
                      okText='OK'
                      cancelText='Cancel'
                    >
                      <button
                        type='button'
                        className='flex items-center gap-x-2 justify-start w-full'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LockSlash className='text-[red]' size={15} /> <span>Hidden</span>
                      </button>
                    </Popconfirm>
                  ) : (
                    <Popconfirm
                      align={{ offset: [20, 20] }}
                      placement='bottomRight'
                      title={`Active this review of ${record.user_fullname}`}
                      description='Are you sure to active this review?'
                      onConfirm={() => {
                        handleHiddenReview(record.review_id, 'active')
                      }}
                      okText='OK'
                      cancelText='Cancel'
                    >
                      <button
                        type='button'
                        className='flex items-center gap-x-2 justify-start w-full'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Unlock className='text-[blue]' size={15} /> <span>Active</span>
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

  const fetchAllReview = async () => {
    try {
      setLoading(true)
      const result = await AdminReviewAPI.getAllReview(token)
      const data = result.data
      if (!result) {
        throw new Error('Error fetch all review. No review found.')
      }
      const tableData = data
        .map((item) => ({
          ...item,
          key: item.review_id,
          product_images: item.product_images ? JSON.parse(item.product_images) : [],
          review_images: item.review_images ? JSON.parse(item.review_images) : []
        }))
        .sort((a, b) => new Date(b.review_updated_at) - new Date(a.review_updated_at))
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
      if (e.message.indexOf('401') !== -1) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(e.message)
    } finally {
      setLoading(false)
    }
  }

  const searchReview = () => {
    try {
      const { filters = {} } = tableParams
      const { review_rating, is_approved } = filters
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
      let filterData = data.filter((item) => {
        const matchReviewInfo =
          item.review_id.toString() === searchValue ||
          item.user_fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.product_name.toLowerCase().includes(searchValue.toLowerCase())
        const matchReviewRating = review_rating ? review_rating.includes(item.review_rating) : true
        const matchReviewStatus = is_approved ? is_approved.includes(item.is_approved) : true
        const matchDate =
          selectedFrom && selectedTo
            ? formatDate(item.review_created_at) &&
              formatDate(selectedFrom) &&
              formatDate(selectedTo) &&
              formatDate(item.review_created_at) >= formatDate(selectedFrom) &&
              formatDate(item.review_created_at) <= formatDate(selectedTo)
            : true
        return matchReviewInfo && matchReviewRating && matchReviewStatus && matchDate
      })
      setFilterData(filterData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: filterData.length
        }
      })
    } catch (e) {
      setStatus(400)
      setMessageResult('Error in search review: ' + e.message)
    }
  }

  const handleHiddenReview = async (reviewId, type = 'hidden') => {
    try {
      const res = await AdminReviewAPI.hiddenReviewByID(reviewId, token)
      if (!res) {
        throw new Error('Error hidden review')
      }
      setStatus(200)
      if (type === 'hidden') setMessageResult("Review's hidden successfully")
      else setMessageResult("Review's activated successfully")

      fetchAllReview()
    } catch (e) {
      if (e.message.indexOf('401') !== -1) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  useEffect(() => {
    fetchAllReview()
  }, [])

  useEffect(() => {
    searchReview()
  }, [
    searchValue,
    selectedFrom,
    selectedTo,
    data,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    tableParams.pagination?.pageSize,
    JSON.stringify(tableParams.filters)
  ])
  //#endregion

  //#region Modal
  const [modalData, setModalData] = useState()
  const [openModal, setOpenModal] = useState(false)
  const handleCancel = () => {
    setOpenModal(false)
    setModalData(null)
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
          <BreadCrumbs items={[{ title: `Reviews` }]} />
          <p>List of user reviews available in system</p>
        </div>
      </header>
      <Modal destroyOnClose title='' centered open={openModal} width={'auto'} footer={null} onCancel={handleCancel}>
        <div className='modal__content mt-7 flex justify-center gap-10'>
          <div className='w-full max-w-[18.125rem] py-6 px-[3.938rem] border border-solid] rounded-2xl bg-[#F8FAFC]'>
            <div className='w-full flex flex-col gap-2 justify-center items-center text-center'>
              <img
                src={modalData?.user_avatar ? modalData.user_avatar : '/assets/images/default-avatar.png'}
                alt='User avatar'
                className='w-40 h-40 rounded-[50%] border border-solid border-[#e8ebed] object-cover'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/assets/images/default-avatar.png'
                }}
              />
              <Tooltip
                title={modalData?.user_fullname}
                color='#2d3748'
                key={modalData?.user_fullname}
                trigger={['hover']}
              >
                <h2
                  className='text-xl font-semibold text-[#0F172A] max-h-24 overflow-hidden text-ellipsis'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '3', // Số dòng giới hạn (tuỳ chỉnh nếu cần)
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {modalData?.user_fullname}
                </h2>
              </Tooltip>
            </div>
          </div>
          <div className='w-full max-w-[56.25rem] flex flex-col'>
            <h2 className='text-xl font-semibold text-[#0F172A] mb-4'>Reviews</h2>
            <div className='flex flex-col gap-2 pt-4 pl-4 pb-[1.188rem] pr-[5.37rem] border border-solid border-[#E2E8F0] rounded-2xl'>
              <div className='text-sm text-[#0F172A] flex gap-2 w-full items-center'>
                <span className='whitespace-nowrap'>Product Name:</span>
                <Tooltip
                  title={modalData?.product_name}
                  color='#2d3748'
                  key={modalData?.product_name}
                  overlayStyle={{ maxWidth: '56.25rem' }}
                  trigger={['hover']}
                >
                  <h5 className='text-base font-semibold whitespace-nowrap text-ellipsis overflow-hidden'>
                    {modalData?.product_name}
                  </h5>
                </Tooltip>
              </div>
              <div className='flex items-center gap-2 w-full'>
                <span className='whitespace-nowrap'>Review Rating:</span>
                <div className='flex items-center gap-1'>
                  {modalData?.review_rating
                    ? Array.from({ length: 5 }).map((_, index) => {
                        return index < modalData.review_rating ? (
                          <img
                            src='/assets/images/Star.svg'
                            alt='Star'
                            className='w-4 h-4'
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = '/assets/images/Star.svg'
                            }}
                          />
                        ) : (
                          <img
                            src='/assets/images/UnReview_Star.svg'
                            alt='Star'
                            className='w-4 h-4'
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = '/assets/images/UnReview_Star.svg'
                            }}
                          />
                        )
                      })
                    : [
                        ...Array(5).map((_, index) => (
                          <img
                            key={index}
                            src='/assets/images/UnReview_Star.svg'
                            alt='Star'
                            className='w-4 h-4'
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = '/assets/images/UnReview_Star.svg'
                            }}
                          />
                        ))
                      ]}
                </div>
              </div>
              <div className='text-sm text-[#0F172A] flex gap-2 w-full items-center'>
                <span className='whitespace-nowrap'>Comment at:</span>
                <span className='text-[#0F172A] text-ellipsis whitespace-nowrap overflow-hidden max-w-[90%]'>
                  {DateFormat(modalData?.review_created_at) || DateFormat(new Date())}
                </span>
              </div>
              <div className='text-sm text-[#0F172A] flex gap-2 w-full items-center'>
                <span className='whitespace-nowrap'>Status:</span>
                <span
                  style={{
                    color: modalData?.is_approved === 0 ? '#065F46' : '#991B1B',
                    backgroundColor: modalData?.is_approved === 0 ? '#D1FAE5' : '#FEE2E2',
                    border: `1px solid ${modalData?.is_approved === 0 ? '#6EE7B7' : '#FCA5A5'}`
                  }}
                  className='inline-block justify-center items-center py-[2px] px-[10px] rounded whitespace-nowrap text-xs'
                >
                  {modalData?.is_approved === 0 ? 'Approved' : 'Hidden'}
                </span>
              </div>
              <div className='text-sm text-[#0F172A] flex gap-2 w-full items-start'>
                <span className='whitespace-nowrap'>Review comment:</span>
                <Tooltip
                  title={<p>{modalData?.review_comment}</p>}
                  color='#2d3748'
                  key={modalData?.review_comment}
                  overlayStyle={{ maxWidth: '30rem' }}
                  trigger={['hover']}
                >
                  <p
                    className='text-[#0F172A] break-words text-ellipsis overflow-hidden max-h-24'
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: '4',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {modalData?.review_comment}
                  </p>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className='p-5 my-4 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center w-[340px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for reviews comments'
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
            rowKey='review_id'
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

export default ReviewComment
