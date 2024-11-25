import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import Chart from 'react-apexcharts'
import { Bill, Profile2User, DollarCircle, ArchiveBox, ArrowDown2, UserAdd, ArrowDown } from 'iconsax-react'
import BreadCrumbs from '../AdminBreadCrumbs'
import { Select, ConfigProvider, DatePicker, message, Skeleton } from 'antd'
import { AdminOrderApi, AdminOverView, ProductsAPI, SuppliersAPI, CustomerAPI } from '../../Api/admin'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useTriggerSidebar } from '../../Layouts/Admin/MainLayout/MainLayout'
const { RangePicker } = DatePicker

const filterTheme = {
  token: {
    colorTextPlaceholder: '#1D242E',
    colorTextDisabled: '#1D242E',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    controlOutline: 'none',
    colorBorder: '#e8ebed',
    borderRadius: '4px',
    colorPrimary: '#008f99'
  },
  components: {
    DatePicker: {
      activeBorderColor: '#1D242E',
      hoverBorderColor: '#1D242E'
    },
    Select: {
      activeBorderColor: '#1D242E',
      hoverBorderColor: '#1D242E',
      optionActiveBg: 'rgb(0, 143, 153, 0.3)',
      optionSelectedBg: 'rgb(0, 143, 153, 0.3)',
      optionSelectedColor: '#1D242E'
    }
  }
}
const Overview = () => {
  const triggerSidebar = useTriggerSidebar()
  const navigate = useNavigate()
  const token = localStorage.getItem('accesstoken')
  const { logout } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    logout()
    navigate('/admin/login')
  }

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

  //#region overview setting
  const [products, setProducts] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [suppliers, setSuppliers] = useState(0)
  const [orders, setOrders] = useState(0)
  const [profitAndRevenue, setProfitAndRevenue] = useState()
  //#endregion

  //#region Chart settings
  const [earningSeries, setEarningSeries] = useState([
    {
      name: 'Revenue',
      type: 'column',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Profit',
      type: 'line',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ])

  const [earningOptions, setEarningOptions] = useState({
    colors: ['#817AF3', '#46A46C'],
    fill: {
      type: ['gradient', 'gradient'],
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              color: '#817AF3',
              opacity: 1
            },
            {
              offset: 48,
              color: '#74B0FA',
              opacity: 1
            },
            {
              offset: 100,
              color: '#79D0F1',
              opacity: 1
            }
          ],
          [
            {
              offset: 0,
              color: '#46A46C',
              opacity: 1
            },
            {
              offset: 48,
              color: '#51CC5D',
              opacity: 1
            },
            {
              offset: 100,
              color: '#57DA65',
              opacity: 1
            }
          ]
        ]
      }
    },

    chart: {
      toolbar: {
        show: true,
        tools: { download: true }
      },
      zoom: { enabled: false },
      animations: { enabled: true, speed: 300, dynamicAnimation: { enabled: true, speed: 1000 } }
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    plotOptions: { bar: { columnWidth: '40%', borderRadius: 5 } },
    tooltip: {
      enabled: true
    },
    grid: { show: true },
    stroke: {
      width: [0, 4]
    },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + 'M'
        }
      }
    }
  })

  const [orderPieSeries, setOrderPieSeries] = useState([0, 0, 0, 0, 0.1])

  const [orderPieOptions, setOrderPieOptions] = useState({
    chart: {
      type: 'pie',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 300,
        dynamicAnimation: { enabled: true, speed: 1000 }
      }
    },
    labels: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  })

  //#endregion

  const [selectedYear, setSelectedYear] = useState(dayjs().year())
  const [showSkeleton, setShowSkeleton] = useState(true)
  // Disable dates that are not within the same month
  const disabledSameMonthDate = (current, { from, type }) => {
    if (from) {
      const startOfMonth = from.startOf('month')
      const endOfMonth = from.endOf('month')
      switch (type) {
        case 'year':
          return current.year() !== from.year()
        case 'month':
          return current.month() !== from.month()
        default:
          return current.isBefore(startOfMonth) || current.isAfter(endOfMonth)
      }
    }
    return current && current.year() !== selectedYear
  }

  //#region filter data
  //#region Filter earning data by date
  const [earningDateFrom, setEarningDateFrom] = useState()
  const [earningDateTo, setEarningDateTo] = useState()

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
    return null
  }

  const handleResponse = async (response, defaultErrorText = 'Error fetch', isHandle401 = true) => {
    if (!response.ok) {
      const content_type = response.headers.get('content-type')
      if (content_type && content_type.includes('application/json')) {
        const res = await response.json()
        if (response.status === 401) {
          if (isHandle401) handleUnauthorized()
        } else {
          setMessageResult(res.message)
          setStatus(response.status)
        }
      } else {
        setStatus(response.status)
        setMessageResult(response.statusText ? response.statusText : defaultErrorText)
      }
      return false
    }
    return true
  }

  const fetchAllCustomers = async () => {
    const response = await CustomerAPI.getAllCustomer(token)
    const isResponseOK = await handleResponse(response, 'Error fetch all customers')
    if (isResponseOK) {
      const res = await response.json()
      const data = res.data
      setCustomers(data.length)
    }
  }

  const fetchAllOrders = async () => {
    const response = await AdminOrderApi.getAllOrder(token)
    const isResponseOK = await handleResponse(response, 'Error fetch all orders', false)
    if (isResponseOK) {
      const res = await response.json()
      const data = res.data
      setOrders(data.length)
    }
  }

  const fetchAllProducts = async () => {
    const response = await ProductsAPI.getProductsNames(token)
    const isResponseOK = await handleResponse(response, 'Error fetch all products', false)
    if (isResponseOK) {
      const res = await response.json()
      const data = res.data
      setProducts(data.length)
    }
  }

  const fetchAllSuppliers = async () => {
    const response = await SuppliersAPI.getAllSuppliers(token)
    const isResponseOK = await handleResponse(response, 'Error fetch all suppliers', false)
    if (isResponseOK) {
      const res = await response.json()
      const data = res.data
      setSuppliers(data.length)
    }
  }

  const fetchProfitAndRevenue = async (searchParam) => {
    const queryParam = qs.stringify(searchParam)
    const response = await AdminOverView.getProfitAndRevenue(queryParam, token)
    const isResponseOK = await handleResponse(response, 'Fetch profit and revenue failed', false)
    if (isResponseOK) {
      const res = await response.json()
      const data = res.data
      return data
    }
  }

  const fetchOrderOverview = async (searchParam) => {
    const queryParam = qs.stringify(searchParam)
    const response = await AdminOverView.getOrderOverview(queryParam, token)
    const isResponseOK = await handleResponse(response, 'Fetch order overview failed', false)
    if (isResponseOK) {
      const res = await response.json()
      const data = res.data
      return data
    }
  }

  const handleDefaultEarningChart = async () => {
    setShowSkeleton(true)
    const defaultStart = dayjs().year(selectedYear).startOf('year')
    const defaultEnd = dayjs().year(selectedYear).endOf('year')
    const data = await fetchProfitAndRevenue({
      type: 'year',
      year: selectedYear
    })
    setProfitAndRevenue(data)
    updateEarningChartData(defaultStart, defaultEnd, 'month')
  }

  const updateEarningChartData = async (start, end, unit = 'month') => {
    const unitsInRange = end.diff(start, unit) + 1
    let newRevenueSeries
    let newProfitSeries

    if (unit === 'day') {
      if (profitAndRevenue) {
        newRevenueSeries = Object.values(profitAndRevenue?.monthly_profit || {})
        newProfitSeries = Object.values(profitAndRevenue?.monthly_revenue || {})
      }
    } else {
      newProfitSeries = Array(unitsInRange)
        .fill(0)
        .map((_, index) => {
          return Math.floor(Math.random() * 100)
        })
      newRevenueSeries = Array(unitsInRange)
        .fill(0)
        .map((_, index) => {
          return Math.floor(Math.random() * 100)
        })
    }

    const newCategories = Array(unitsInRange)
      .fill(0)
      .map((_, index) => {
        return start.add(index, unit).format(unit === 'day' ? 'DD/MM' : 'MMM')
      })
    setEarningSeries([
      {
        name: 'Revenue',
        data: newRevenueSeries
      },
      {
        name: 'Profit',
        data: newProfitSeries
      }
    ])
    setEarningOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        type: 'category',
        categories: newCategories,
        labels: {
          formatter: (value, time, opt) => {
            return value
          }
        }
      }
    }))
    setShowSkeleton(false)
  }

  useEffect(() => {
    fetchAllCustomers()
    fetchAllOrders()
    fetchAllProducts()
    fetchAllSuppliers()
  }, [])

  useEffect(() => {
    if (!earningDateFrom || !earningDateTo) {
      handleDefaultEarningChart()
      return
    }
    const data = fetchProfitAndRevenue({
      type: 'range',
      start_date: earningDateFrom,
      end_date: earningDateTo
    })
    setProfitAndRevenue(data)
    updateEarningChartData(dayjs(earningDateFrom), dayjs(earningDateTo), 'day')
  }, [earningDateFrom, earningDateTo])
  //#endregion

  const handleOrderPieChart = async () => {
    const orderData = await fetchOrderOverview({
      year: selectedYear
    })

    if (!orderData) return
    const { total_orders, ...resData } = orderData
    const keysOrder = Object.keys(resData).map((key) => key.slice(key.indexOf('order_') + 'order_'.length))
    const valuesOrder = Object.values(resData)
    setOrderPieSeries(valuesOrder || [0, 0, 0, 0, 0.1])
    setOrderPieOptions((prevOptions) => ({
      ...prevOptions,
      labels: keysOrder
    }))
  }

  useEffect(() => {
    setEarningDateFrom(null)
    setEarningDateTo(null)
    handleOrderPieChart()
    handleDefaultEarningChart()
  }, [selectedYear])
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
    <section className='w-full select-none overview__section'>
      {contextHolder}
      <header className='flex justify-between items-center w-full animate-slideLeftToRight'>
        <div className='flex flex-col gap-1 w-full justify-start'>
          <BreadCrumbs items={[{ title: 'Overview' }]} />
          <p className='text-sm'>A quick data overview of system</p>
        </div>
        <div className='flex gap-8 w-full justify-end'>
          <ConfigProvider theme={filterTheme}>
            <DatePicker
              picker='year'
              allowClear
              showNow
              className='w-[13.438rem] h-12'
              suffixIcon={<ArrowDown2 size='14' color='#1D242E' />}
              placeholder={'Select Year'}
              onChange={(date, dateString) => {
                if (!dateString) setSelectedYear(dayjs().year())
                else setSelectedYear(Number(dateString))
              }}
            />
            <Select
              allowClear
              suffixIcon={<ArrowDown2 size='14' color='#1D242E' />}
              className='w-[13.438rem] h-12 flex justify-center items-center'
              placeholder='Download Report'
              placement='bottomLeft'
              value={null}
              options={[{ label: 'Excel', value: 'excel' }]}
              onChange={() => {}}
            />
          </ConfigProvider>
        </div>
      </header>
      <div className='my-6 w-full flex flex-col gap-6'>
        <div className='flex w-full items-center gap-8 animate-slideRightToLeft'>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#01A768] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <Profile2User className='text-[#01A768]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>{customers}</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Customer</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#01A768] bg-[rgb(1,167,104,0.3)] flex items-center justify-center gap-[0.625rem] grow'
              onClick={() => {
                navigate('/admin/manage-users')
                triggerSidebar('users', 'manage-users')
              }}
            >
              <span className='text-xs text-[#1D242E]'>View Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
            </button>
          </div>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#817AF3] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <Bill className='text-[#817AF3]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>{orders}</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Order</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#817AF3] bg-[rgb(129,122,243,0.3)] flex items-center justify-center gap-[0.625rem] grow'
              onClick={() => {
                navigate('/admin/orders')
                triggerSidebar('orders')
              }}
            >
              <span className='text-xs text-[#1D242E]'>View Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
            </button>
          </div>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#03A9F5] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <ArchiveBox className='text-[#03A9F5]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>{products}</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Products</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#03A9F5] bg-[rgb(3,169,245,0.3)] flex items-center justify-center gap-[0.625rem] grow'
              onClick={() => {
                navigate('/admin/products')
                triggerSidebar('inventory', 'products')
              }}
            >
              <span className='text-xs text-[#1D242E]'>View Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
            </button>
          </div>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#F0483E] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <DollarCircle className='text-[#F0483E]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>16M+</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Revenue</h2>
            </div>
            <div className='w-full border-t border-t-solid border-t-[#F0483E] bg-[rgb(240,72,62,0.3)] flex items-center justify-center gap-[0.625rem] grow'>
              <button
                className='text-xs text-[#1D242E]'
                type='button'
                onClick={() => {
                  document.getElementById('earning__report').scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
              >
                View detail
              </button>
              <span className='text-xs font-bold text-[#1D242E]'>
                <ArrowDown size={15} />
              </span>
            </div>
          </div>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#DBA362] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <UserAdd className='text-[#DBA362]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>{suppliers}</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Suppliers</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#DBA362] bg-[rgb(219,163,98,0.2)] flex items-center justify-center gap-[0.625rem] grow'
              onClick={() => {
                navigate('/admin/suppliers')
                triggerSidebar('suppliers')
              }}
            >
              <span className='text-xs text-[#1D242E]'>View Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
            </button>
          </div>
        </div>
        <div className='w-full flex gap-8'>
          <div
            className='flex flex-col w-[calc(60%+1rem)] bg-[#ffffff] rounded-xl border border-solid border-[rgb(29,36,46,0.3)]'
            id='earning__report'
          >
            <div className='flex items-center justify-between w-full px-5 pt-5 rounded-xl'>
              <h2 className='text-lg font-semibold text-gray-700'>Earning Reports</h2>
              <div className='flex w-max'>
                <ConfigProvider
                  theme={{
                    ...filterTheme,
                    token: {
                      ...filterTheme.token,
                      colorTextPlaceholder: 'rgb(24,50,83)',
                      colorTextDisabled: 'rgb(156 163 175)',
                      colorBorder: '#D0D3D9',
                      borderRadius: '0.375rem'
                    }
                  }}
                >
                  <RangePicker
                    className='h-12 w-60'
                    suffixIcon={<ArrowDown2 size='14' color='#1D242E' />}
                    format={'DD/MM/YYYY'}
                    placement='bottomRight'
                    disabledDate={disabledSameMonthDate}
                    onChange={(_, dateString) => {
                      const [from, to] = dateString
                      setEarningDateFrom(DateFormatData(from))
                      setEarningDateTo(DateFormatData(to))
                    }}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className='px-5 pt-5 rounded-xl w-full flex justify-center flex-col'>
              <ReactApexChart options={earningOptions} series={earningSeries} type='line' width={'100%'} height={300} />
            </div>
          </div>
          <div className='flex items-center flex-col bg-[#ffffff] rounded-xl w-[40%] border border-solid border-[rgb(29,36,46,0.3)]'>
            <div className='flex items-center justify-between w-full px-5 pt-5 rounded-xl'>
              <h2 className='text-lg font-semibold text-gray-700'>Order Status</h2>
            </div>
            <div className='relative w-full p-5'>
              <div className='gap-4 w-full relative'>
                <Chart options={orderPieOptions} series={orderPieSeries} type='pie' width={'100%'} height={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview

{
  /* <div className='flex flex-col w-[calc(60%+1rem)] bg-[#ffffff] rounded-xl border border-solid border-[rgb(29,36,46,0.3)]'>
            <div className='flex items-center justify-between w-full px-5 pt-5 rounded-xl'>
              <h2 className='text-lg font-semibold text-gray-700'>Order Earning Reports</h2>
              <div className='flex gap-4 w-60'>
                <ConfigProvider
                  theme={{
                    ...filterTheme,
                    token: {
                      ...filterTheme.token,
                      colorTextPlaceholder: 'rgb(24,50,83)',
                      colorTextDisabled: 'rgb(156 163 175)',
                      colorBorder: '#D0D3D9',
                      borderRadius: '0.375rem'
                    }
                  }}
                >
                  <RangePicker
                    className='h-12 w-full'
                    suffixIcon={<ArrowDown2 size='14' color='#1D242E' />}
                    format={'DD/MM/YYYY'}
                    placement='bottomRight'
                    disabledDate={disabledSameMonthDate}
                    onChange={(_, dateString) => {
                      const [from, to] = dateString
                      setOrderDateFrom(DateFormatData(from))
                      setOrderDateTo(DateFormatData(to))
                    }}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className='px-5 pt-5 rounded-xl w-full'>
              <ReactApexChart
                options={orderAreaOptions}
                series={orderAreaSeries}
                type='area'
                width={'100%'}
                height={300}
              />
            </div>
          </div> */
}

{
  /* <div className='w-full'>
          <div className='flex flex-col w-full bg-[#ffffff] rounded-xl border border-solid border-[rgb(29,36,46,0.3)]'>
            <div className='flex items-center justify-between w-full px-5 pt-5 rounded-xl'>
              <h2 className='text-lg font-semibold text-gray-700'>Earning Reports</h2>
              <div className='flex w-max'>
                <ConfigProvider
                  theme={{
                    ...filterTheme,
                    token: {
                      ...filterTheme.token,
                      colorTextPlaceholder: 'rgb(24,50,83)',
                      colorTextDisabled: 'rgb(156 163 175)',
                      colorBorder: '#D0D3D9',
                      borderRadius: '0.375rem'
                    }
                  }}
                >
                  <RangePicker
                    className='h-12 w-60'
                    suffixIcon={<ArrowDown2 size='14' color='#1D242E' />}
                    format={'DD/MM/YYYY'}
                    placement='bottomRight'
                    disabledDate={disabledSameMonthDate}
                    onChange={(_, dateString) => {
                      const [from, to] = dateString
                      setEarningDateFrom(DateFormatData(from))
                      setEarningDateTo(DateFormatData(to))
                    }}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className='px-5 pt-5 rounded-xl w-full'>
              <ReactApexChart options={earningOptions} series={earningSeries} type='line' width={'100%'} height={300} />
            </div>
          </div>
        </div> */
}
