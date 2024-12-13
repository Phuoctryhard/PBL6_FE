import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { SearchNormal, FilterSearch, ArrowDown2, Notification, More } from 'iconsax-react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { Select, ConfigProvider, Dropdown } from 'antd'
import { ProductsAPI, AdminOrderApi, ImportsAPI } from '../../Api/admin'
import qs from 'qs'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
import { DeleteOutlined } from '@ant-design/icons'
const languageSelectTheme = {
  token: {
    colorTextQuaternary: '#1D242E', // Disabled text color
    colorTextPlaceholder: '#1D242E', // Placeholder text color
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    controlOutline: 'none', // outline color
    colorBorder: 'none',
    borderRadius: '4px' // Border radius
  },
  components: {
    Select: {
      selectorBg: 'transparent', // Selector background color
      optionActiveBg: '#e1eaf2', // Option active
      optionSelectedBg: '#bde0fe' // Option selected
    }
  }
}
const Header = forwardRef((_, ref) => {
  const token = localStorage.getItem('accesstoken')
  const { triggerSidebar, setIsLogin } = useAdminMainLayoutFunction()

  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [greeting, setGreeting] = useState('')
  const [greetingColor, setGreetingColor] = useState('')
  const optionsDate = { year: 'numeric', month: 'long', day: '2-digit' }
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

  const formatDateInRealTime = (date) => {
    const dateOptions = date.toLocaleDateString('en-GB', optionsDate)
    const timeOptions = date.toLocaleTimeString('en-GB', optionsTime)
    return `${dateOptions} at ${timeOptions}`
  }

  const formatDate = (date) => {
    try {
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
      return format ? format : null
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  const formatTimeDifference = (date) => {
    try {
      if (!date) throw new Error('Date is missing or invalid')

      const currentDate = new Date()
      const dateObj = new Date(date)

      if (isNaN(dateObj)) throw new Error('Invalid date format')

      const diffInSeconds = Math.floor((currentDate - dateObj) / 1000)

      if (diffInSeconds < 60) {
        return `${diffInSeconds} giây trước`
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60)
      if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`
      }

      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) {
        return `${diffInHours} giờ trước`
      }

      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 30) {
        return `${diffInDays} ngày trước`
      }

      const diffInMonths = Math.floor(diffInDays / 30)
      if (diffInMonths < 12) {
        return `${diffInMonths} tháng trước`
      }

      const diffInYears = Math.floor(diffInMonths / 12)
      return `${diffInYears} năm trước`
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [searchOrderResult, setSearchOrderResult] = useState()
  const [searchResultDesign, setSearchResultDesign] = useState()
  const [productData, setProductData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [importData, setImportData] = useState([])
  const [notifyData, setNotifyData] = useState([])
  const [badgeCount, setBadgeCount] = useState(0)

  const [showSearchResults, setShowSearchResults] = useState(false)

  //#region show notify
  const [showNotify, setShowNotify] = useState(false)
  const [showOptionNotify, setShowOptionNotify] = useState(false)
  const notifyRef = useRef(null)
  let closeTimeout
  //#endregion

  useImperativeHandle(ref, () => ({
    setNotifyData
  }))

  //handle marked read
  const handleMarkedRead = async (orderID) => {
    try {
      const newNotify = notifyData.map((notify) => {
        if (notify.order_id === orderID) {
          return { ...notify, isRead: true }
        }
        return notify
      })

      let badgeCount = 0
      const newNotifyLength = newNotify.filter((notify) => !notify.isRead).length
      if (newNotifyLength > 0 && newNotifyLength <= 99) {
        badgeCount = newNotifyLength
      } else if (newNotifyLength > 99) {
        badgeCount = '99+'
      }
      setBadgeCount(badgeCount)
      setNotifyData(newNotify)
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  //handle show notify
  const handleMouseEnterShowNotify = () => {
    clearTimeout(closeTimeout)
    setShowNotify(true)
  }

  const handleMouseLeaveCloseNotify = () => {
    closeTimeout = setTimeout(() => {
      if (!showOptionNotify) setShowNotify(false)
      else setShowNotify(true)
    }, 200)
  }

  useEffect(() => {
    if (!showOptionNotify) {
      handleMouseLeaveCloseNotify()
    }
  }, [showOptionNotify])

  const [filterSelected, setFilterSelected] = useState('product')

  //Fetch data
  const fetchProducts = async (params) => {
    try {
      const query = qs.stringify({
        ...params
      })
      const res = await ProductsAPI.searchProducts(query)
      const data = res.data
      setProductData(data)
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    } finally {
    }
  }

  const fetchAllOrders = async () => {
    try {
      const res = await AdminOrderApi.getAllOrder(token)
      if (res) {
        const resData = res.data
        const filterOrderNeedConfirmation = resData
          .filter((o) => {
            const payment_transactions = ['VNPAY', 'PAYOS', 'MOMO']
            const payment_COD = 'COD'
            const match_transactions =
              payment_transactions.includes(o.payment_method_name) &&
              o.payment_status === 'completed' &&
              o.order_status === 'pending'
            const match_COD =
              o.payment_method_name === payment_COD && o.order_status === 'pending' && o.payment_status === 'pending'
            return match_transactions || match_COD
          })
          .map((o) => {
            return { ...o, isRead: false }
          })
          .sort((a, b) => new Date(b.order_created_at) - new Date(a.order_created_at))
        const filterLength = filterOrderNeedConfirmation.length
        let badgeCount = 0
        if (filterLength > 0 && filterLength <= 99) {
          badgeCount = filterLength
        } else if (filterLength > 99) {
          badgeCount = '99+'
        }

        setBadgeCount(badgeCount)
        setNotifyData(filterOrderNeedConfirmation)
        setOrderData(resData)
      }
    } catch (error) {
      if (error.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(error.message)
    } finally {
    }
  }

  const fetchAllImports = async () => {
    try {
      const res = await ImportsAPI.getAllImports(token)
      if (res) {
        const resData = res.data
        setImportData(resData)
      }
    } catch (error) {
      setStatus(400)
      setMessageResult(error.message)
    } finally {
    }
  }

  const searchProduct = () => {
    try {
      const results = productData.filter((item) => {
        const matchProductInfo =
          item.product_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.product_id.toString() === searchValue ||
          item.brand_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.category_name.toLowerCase().includes(searchValue.toLowerCase())
        return matchProductInfo
      })
      setSearchResult(results)
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  const searchOrder = () => {
    try {
      const filterData = orderData.filter((item) => {
        const orderDetail = item.order_detail[0]
        const matchInfo =
          item.order_id.toString() === searchValue ||
          item.user_fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.receiver_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.receiver_phone.includes(searchValue) ||
          item.receiver_address.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.ward_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.district_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.province_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.payment_method_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.delivery_method_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          orderDetail.product_name.toLowerCase().includes(searchValue.toLowerCase())
        return matchInfo
      })
      setSearchOrderResult(filterData)
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  const searchImports = () => {
    try {
      const result = importData.filter((item) => {
        const matchesSupplierName =
          item.supplier_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.import_id.toString().includes(searchValue)
        return matchesSupplierName
      })
      setSearchResult(result)
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }

  useEffect(() => {
    try {
      if (filterSelected === 'product') {
        if (productData) {
          searchProduct()
        }
      } else if (filterSelected === 'order') {
        if (orderData) {
          searchOrder()
        }
      } else if (filterSelected === 'import') {
        if (importData) {
          searchImports()
        }
      }
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }, [searchValue])

  useEffect(() => {
    try {
      if (filterSelected === 'product') {
        if (searchResult) {
          const result = searchResult?.map((p) => (
            <button
              key={p.product_id}
              className='flex items-center gap-2 hover:bg-[rgb(0,143,153,0.1)] hover:cursor-pointer w-full p-2 rounded-md justify-center'
              to={`/admin/products/${p.product_id}`}
              onClick={() => {
                const path = window.location.pathname
                if (!path.includes('/admin/products')) {
                  triggerSidebar('inventory', 'products')
                }
                setSearchValue('')
                navigate(`/admin/products/${p.product_id}`, { replace: true })
              }}
            >
              <span className='text-sm text-[#1D242E] mr-2'>{p.product_id}</span>
              <img
                src={
                  p.product_images !== null
                    ? p.product_images.map((image) => `${image}`)[0]
                    : '/assets/images/default-image.png'
                }
                alt={p.product_name}
                className='w-[50px] h-[50px]'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/assets/images/default-image.png'
                }}
              />
              <div className='flex flex-col'>
                <span className='text-sm text-[#1D242E]'>{p.product_name || p.product_id}</span>
              </div>
            </button>
          ))
          setSearchResultDesign(result)
        }
      } else if (filterSelected === 'order') {
        if (searchOrderResult) {
          const result = searchOrderResult?.map((order) => {
            let color
            let backgroundColor
            let borderColor
            let status = order.order_status
            switch (status) {
              case 'confirmed':
                color = '#065F46'
                backgroundColor = '#D1FAE5'
                borderColor = '#6EE7B7'
                break
              case 'cancelled':
                borderColor = '#FCA5A5'
                backgroundColor = '#FEE2E2'
                color = '#991B1B'
                break
              case 'delivered':
                borderColor = '#D1D5DB'
                backgroundColor = '#F3F4F6'
                color = '#1F2937'
                break
              case 'shipped':
                color = '#92400E'
                borderColor = '#FCD34D'
                backgroundColor = '#FEF3C7'
                break
              case 'pending':
                color = '#1E40AF'
                backgroundColor = '#DBEAFE'
                borderColor = '#93C5FD'
                break
            }
            return (
              <button
                key={order.order_id}
                className='flex items-center gap-2 hover:bg-[rgb(0,143,153,0.1)] hover:cursor-pointer w-full p-2 rounded-md'
                onClick={() => {
                  triggerSidebar('orders')
                  setSearchValue('')
                  navigate(`/admin/orders/${order.order_id}`, { replace: true })
                }}
              >
                <span className='text-sm text-[#1D242E] mr-2'>{order.order_id}</span>
                <img
                  src={
                    order?.order_detail[0].product_images
                      ? JSON.parse(order.order_detail[0].product_images)?.map((image) => `${image}`)[0]
                      : '/assets/images/default-image.png'
                  }
                  alt={order?.order_detail[0].product_name}
                  className='w-[50px] h-[50px]'
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/assets/images/default-image.png'
                  }}
                />
                <span className='text-sm text-[#1D242E] mr-2'>{order?.order_detail[0].product_name}</span>
                <span
                  style={{ color, backgroundColor, border: `1px solid ${borderColor}` }}
                  className='inline-block justify-center items-center py-[2px] px-[10px] rounded whitespace-nowrap text-xs'
                >
                  {status}
                </span>
              </button>
            )
          })
          setSearchResultDesign(result)
        }
      } else if (filterSelected === 'import') {
        if (searchResult) {
          const result = searchResult?.map((imported) => (
            <button
              key={imported.import_id}
              className='flex items-center gap-2 hover:bg-[rgb(0,143,153,0.1)] hover:cursor-pointer w-full p-2 rounded-md'
              onClick={() => {
                triggerSidebar('imports')
                setSearchValue('')
                navigate(`/admin/imports/${imported.import_id}`, { replace: true })
              }}
            >
              <div className='flex gap-4'>
                <span className='text-sm text-[#1D242E]'>{imported.import_id}</span>
                <span className='text-sm text-[#1D242E]'>{imported.supplier_name}</span>
              </div>
            </button>
          ))
          setSearchResultDesign(result)
        }
      }
    } catch (e) {
      setStatus(400)
      setMessageResult(e.message)
    }
  }, [searchResult, searchOrderResult])

  const [time, setTime] = useState(formatDate(new Date()))

  useEffect(() => {
    fetchProducts({ search: searchValue })
    fetchAllOrders()
    fetchAllImports()

    const timeInterval = setInterval(() => {
      const currentTime = new Date()
      setTime(formatDateInRealTime(currentTime))
      const hours = currentTime.getHours()
      if (hours >= 5 && hours < 12) {
        setGreeting('Good morning')
        setGreetingColor('#FED600') // Yellow for morning
      } else if (hours >= 12 && hours < 17) {
        setGreeting('Good afternoon')
        setGreetingColor('#FFA500') // Orange for afternoon
      } else if (hours >= 17 && hours < 21) {
        setGreeting('Good evening')
        setGreetingColor('#FF4500') // Red for evening
      } else {
        setGreeting('Good night')
        setGreetingColor('#1E90FF') // Blue for night
      }
    }, 1000)

    const fetchOrderInterval = setInterval(() => {
      fetchAllOrders()
    }, 300000) // 300000 ms = 5 phút

    return () => {
      clearInterval(timeInterval)
      clearInterval(fetchOrderInterval)
    }
  }, [])

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
    <header className='flex w-full h-[60px] items-center bg-[#f7f8fa]'>
      {contextHolder}
      <div className='flex-1 justify-between px-[40px] py-[11px]'>
        <div className='flex items-center justify-between text-sm w-full gap-3'>
          <div className='flex gap-2 justify-center items-center'>
            <div
              className='flex items-center bg-[#e1eaf2] border border-solid border-[#BCBEC1]
            min-w-[27.5rem] w-[27.5rem] justify-between rounded relative'
            >
              <input
                type='text'
                placeholder='Search for anything here'
                className='focus:border-[#1D242E] border border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-full py-[0.438rem] px-[0.938rem] rounded'
                value={searchValue || ''}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                }}
                onFocus={() => {
                  setShowSearchResults(true)
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setShowSearchResults(false)
                  }, 300)
                }}
              />
              <SearchNormal className='absolute right-0 top-[50%] -translate-y-1/2 mr-3' />
              <div
                className='absolute w-full h-[18.75rem] bg-white top-[120%] z-[100] overflow-hidden border border-solid border-[#bdc5d1] rounded-md'
                style={{
                  display: searchValue.length > 0 && showSearchResults ? 'block' : 'none'
                }}
              >
                <SimpleBar style={{ width: '100%', height: '100%' }}>
                  <div className='w-full h-full bg-white flex flex-col justify-between overflow-auto py-2 px-4'>
                    <div className='w-full h-full flex flex-col gap-4'>{searchResultDesign}</div>
                  </div>
                </SimpleBar>
              </div>
            </div>
            <div className='flex items-center justify-center p-2'>
              <FilterSearch size={23} />
              <ConfigProvider theme={languageSelectTheme}>
                <Select
                  suffixIcon={
                    <ArrowDown2
                      className={`${isDropdownOpen ? 'transform -rotate-180' : ''} transition-transform duration-300`}
                      size={20}
                    />
                  }
                  onBlur={() => setIsDropdownOpen(false)}
                  defaultValue='product'
                  className='w-28 h-10'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  options={[
                    { label: 'Product', value: 'product' },
                    { label: 'Order', value: 'order' },
                    { label: 'Import', value: 'import' }
                  ]}
                  onSelect={(value) => {
                    setFilterSelected(value)
                  }}
                />
              </ConfigProvider>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='time flex items-center text-sm text-[#1D242E] w-[16rem] justify-end gap-1'>
              <div
                className='relative'
                ref={notifyRef}
                onMouseEnter={handleMouseEnterShowNotify}
                onMouseLeave={handleMouseLeaveCloseNotify}
              >
                <Notification size={30} color='#1D242E' />
                <div className='absolute w-5 h-5 rounded-[50%] bg-red-600 text-white right-[-15%] top-0 flex justify-center items-center px-2'>
                  <span className='text-xs'>{badgeCount}</span>
                </div>
                <div
                  className='flex flex-col absolute top-[161%] right-[-200%] z-[100]'
                  style={{
                    transform: showNotify ? 'scale(1)' : 'scale(0)',
                    opacity: showNotify ? 1 : 0,
                    visibility: showNotify ? 'visible' : 'hidden',
                    transformOrigin: 'top right',
                    transition: 'all 0.5s ease'
                  }}
                >
                  <div className='w-[25rem] h-[18.75rem] bg-white z-[100] border-solid border border-[#bdc5d1] rounded-xl flex flex-col'>
                    <div className='w-full flex justify-between items-center p-4'>
                      <h2 className='text-base text-black font-semibold text-center w-full'>Thông báo mới</h2>
                    </div>
                    {notifyData.length <= 0 ? (
                      <div className='w-full flex flex-col gap-2 flex-1 justify-center items-center p-4'>
                        <img
                          src='/assets/images/notify.svg'
                          alt='Notify Image'
                          className='max-w-[7rem] h-[7rem] object-cover'
                        />
                        <span className='text-sm text-black text-center font-semibold'>Chưa có thông báo mới!</span>
                      </div>
                    ) : (
                      <div className='w-full h-full overflow-hidden'>
                        <SimpleBar
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        >
                          <div className='w-full flex flex-col gap-2 overflow-auto'>
                            {notifyData.map((notify) => {
                              return (
                                <div
                                  key={notify.order_id}
                                  className={`flex items-center gap-4 hover:bg-[rgb(0,143,153,0.1)] hover:cursor-pointer w-full rounded-md p-4 relative`}
                                >
                                  <div className='flex gap-1'>
                                    <button
                                      className={`w-[95%] flex items-center gap-4 before:w-1 before:h-1 before:rounded-[50%] before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 ${notify.isRead ? 'before:bg-transparent' : 'before:bg-blue'}`}
                                      onClick={() => {
                                        handleMarkedRead(notify.order_id)
                                        triggerSidebar('orders')
                                        navigate(`/admin/orders/${notify.order_id}`, {
                                          replace: true,
                                          state: { notifyData }
                                        })
                                        setShowNotify(false)
                                      }}
                                    >
                                      <img
                                        src={
                                          notify?.order_detail[0].product_images
                                            ? JSON.parse(notify.order_detail[0].product_images)?.map(
                                                (image) => `${image}`
                                              )[0]
                                            : '/assets/images/default-image.png'
                                        }
                                        alt={notify?.order_detail[0].product_name}
                                        className='w-12 h-12'
                                        onError={(e) => {
                                          e.target.onerror = null
                                          e.target.src = '/assets/images/default-image.png'
                                        }}
                                      />
                                      <div className='flex flex-col text-left text-sm text-black gap-1'>
                                        <span>Bạn có đơn hàng với id: {notify.order_id} cần được xác nhận</span>
                                        <div>
                                          <span>Người nhận: </span>
                                          <span>{notify.receiver_name}</span>
                                        </div>
                                        <div>
                                          <span>Địa chỉ: </span>
                                          <span>
                                            {notify.receiver_address}, {notify.ward_name}, {notify.district_name},{' '}
                                            {notify.province_name}
                                          </span>
                                        </div>
                                        <div className='text-xs text-gray-500 font-normal mt-3'>
                                          <span>{formatTimeDifference(formatDate(notify.order_created_at))}</span>
                                        </div>
                                      </div>
                                    </button>
                                  </div>
                                  <div className='rotate-90'>
                                    <Dropdown
                                      destroyPopupOnHide
                                      trigger={['click']}
                                      onOpenChange={(open) => {
                                        if (open) setShowOptionNotify(true)
                                        else setShowOptionNotify(false)
                                      }}
                                      placement='bottomRight'
                                      menu={{
                                        items: [
                                          {
                                            key: '1',
                                            label: (
                                              <button
                                                type='button'
                                                className='flex items-center gap-1'
                                                onClick={() => {
                                                  try {
                                                    const orderID = notify.order_id
                                                    const newNotify = notifyData.filter(
                                                      (notify) => notify.order_id !== orderID
                                                    )
                                                    let badgeCount = 0
                                                    const newNotifyLength = newNotify.filter(
                                                      (notify) => !notify.isRead
                                                    ).length
                                                    if (newNotifyLength > 0 && newNotifyLength <= 99) {
                                                      badgeCount = newNotifyLength
                                                    } else if (newNotifyLength > 99) {
                                                      badgeCount = '99+'
                                                    }
                                                    setBadgeCount(badgeCount)
                                                    setNotifyData(newNotify)
                                                  } catch (e) {
                                                    setStatus(400)
                                                    setMessageResult(e.message)
                                                  }
                                                }}
                                              >
                                                <DeleteOutlined className='text-sm text-[red]' /> Xóa thông báo này
                                              </button>
                                            )
                                          }
                                        ]
                                      }}
                                    >
                                      <More size={20} color='#1D242E' />
                                    </Dropdown>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </SimpleBar>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-end justify-center gap-1.5 w-full max-w-[85%]'>
                <div className='flex items-center justify-end'>
                  <div
                    className='w-[18px] h-[18px] rounded-[50%] mr-[11px]'
                    style={{
                      backgroundColor: greetingColor
                    }}
                  ></div>
                  <span className='font-bold'>{greeting}</span>
                </div>
                <span className='text-right w-max'>{time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
})

export default Header
