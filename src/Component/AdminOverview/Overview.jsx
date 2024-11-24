import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import Chart from 'react-apexcharts'
import { Bill, Profile2User, DollarCircle, ArchiveBox, ArrowDown2, UserAdd, ArrowDown } from 'iconsax-react'
import BreadCrumbs from '../AdminBreadCrumbs'
import { Select, ConfigProvider, DatePicker } from 'antd'
import dayjs from 'dayjs'
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
      type: 'line',
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
    labels: ['confirmed', 'delivered', 'shipped', 'cancelled', 'pending'],
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

  const [orderAreaSeries, setOrderAreaSeries] = useState([
    {
      name: 'Total',
      data: [...Array(12).fill(0)]
    }
  ])
  const [orderAreaOptions, setOrderAreaOptions] = useState({
    colors: ['#DF9B2D'],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          {
            offset: 0,
            color: '#DF9B2D',
            opacity: 0.13
          },
          {
            offset: 100,
            color: '#C5A674',
            opacity: 0.13
          }
        ]
      }
    },
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: { download: true, selection: true, reset: true, zoomin: false, zoomout: false, pan: false }
      },
      zoom: { enabled: true },
      animations: { enabled: true, speed: 300, dynamicAnimation: { enabled: true, speed: 1000 } }
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="bg-[#ffffff] p-2 text-base rounded-md">' +
          '<span>' +
          'Total: ' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        )
      }
    },
    grid: { show: true },
    stroke: {
      width: 1
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
  //#endregion

  const [selectedYear, setSelectedYear] = useState(dayjs().year())
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
  const [earningDateFrom, setEarningDateFrom] = useState(null)
  const [earningDateTo, setEarningDateTo] = useState(null)

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

  const handleDefaultEarningChart = () => {
    const defaultStart = dayjs().year(selectedYear).startOf('year')
    const defaultEnd = dayjs().year(selectedYear).endOf('year')
    updateEarningChartData(defaultStart, defaultEnd)
  }
  const updateEarningChartData = (start, end, unit = 'month') => {
    const unitsInRange = end.diff(start, unit) + 1
    const newRevenueSeries = Array(unitsInRange)
      .fill(0)
      .map((_, index) => {
        return Math.floor(Math.random() * 100)
      })
    const newProfitSeries = Array(unitsInRange)
      .fill(0)
      .map((_, index) => {
        return Math.floor(Math.random() * 100)
      })
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
  }
  useEffect(() => {
    if (!earningDateFrom || !earningDateTo) {
      handleDefaultEarningChart()
      return
    }
    updateEarningChartData(dayjs(earningDateFrom), dayjs(earningDateTo), 'day')
  }, [earningDateFrom, earningDateTo])
  //#endregion

  //#region order status data
  const [orderDateFrom, setOrderDateFrom] = useState(null)
  const [orderDateTo, setOrderDateTo] = useState(null)
  const updateOrderAreaChartData = (start, end, unit = 'month') => {
    const unitsInRange = end.diff(start, unit) + 1
    const newSeries = Array(unitsInRange)
      .fill(0)
      .map((_, index) => {
        return Math.floor(Math.random() * 100)
      })
    const newCategories = Array(unitsInRange)
      .fill(0)
      .map((_, index) => {
        return start.add(index, unit).format(unit === 'day' ? 'DD/MM' : 'MMM')
      })
    setOrderAreaSeries([
      {
        name: 'Total',
        data: newSeries
      }
    ])
    setOrderAreaOptions((prevOptions) => ({
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
  }
  const handleDefaultOrderAreaChart = () => {
    const defaultStart = dayjs().year(selectedYear).startOf('year')
    const defaultEnd = dayjs().year(selectedYear).endOf('year')
    updateOrderAreaChartData(defaultStart, defaultEnd)
  }
  const handleOrderAreaChart = () => {
    const orderAreaSeriesLength = orderAreaSeries[0].data.length
    const newSeries = Array(orderAreaSeriesLength)
      .fill(0)
      .map((_, index) => {
        return Math.floor(Math.random() * 100)
      })
    setOrderAreaSeries([
      {
        name: 'Total',
        data: newSeries
      }
    ])
  }
  const handleOrderPieChart = () => {
    const pieSeriesLength = orderPieSeries.length
    const newSeries = Array(pieSeriesLength)
      .fill(0)
      .map((_, index) => {
        return Math.floor(Math.random() * 100)
      })
    setOrderPieSeries(newSeries)
  }
  useEffect(() => {
    if (!orderDateFrom || !orderDateTo) {
      handleDefaultOrderAreaChart()
      return
    }
    updateOrderAreaChartData(dayjs(orderDateFrom), dayjs(orderDateTo), 'day')
  }, [orderDateFrom, orderDateTo])
  //#endregion

  useEffect(() => {
    setEarningDateFrom(null)
    setEarningDateTo(null)
    handleDefaultEarningChart()
    handleOrderPieChart()
    handleOrderAreaChart()
  }, [selectedYear])
  //#endregion

  return (
    <section className='w-full select-none overview__section'>
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
              dropdownStyle={{ width: '7rem' }}
              value={null}
              options={[
                { label: 'PDF', value: 'pdf' },
                { label: 'Excel', value: 'excel' }
              ]}
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
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>300</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Customer</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#01A768] bg-[rgb(1,167,104,0.3)] flex items-center justify-center gap-[0.625rem] grow'
            >
              <span className='text-xs text-[#1D242E]'>View Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
            </button>
          </div>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#817AF3] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <Bill className='text-[#817AF3]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>4000</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Order</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#817AF3] bg-[rgb(129,122,243,0.3)] flex items-center justify-center gap-[0.625rem] grow'
            >
              <span className='text-xs text-[#1D242E]'>View Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
            </button>
          </div>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#03A9F5] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <ArchiveBox className='text-[#03A9F5]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>300</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Products</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#03A9F5] bg-[rgb(3,169,245,0.3)] flex items-center justify-center gap-[0.625rem] grow'
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
              <span className='text-xs text-[#1D242E]'>Scroll Down for More Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>
                <ArrowDown size={15} />
              </span>
            </div>
          </div>
          <div className='w-[20%] h-[9.5rem] border border-solid border-[#DBA362] rounded-md overflow-hidden flex flex-col'>
            <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
              <UserAdd className='text-[#DBA362]' size={30} />
              <span className='font-bold text-[1.25rem] text-[#1D242E]'>300</span>
              <h2 className='font-medium text-sm text-[#1D242E]'>Total Suppliers</h2>
            </div>
            <button
              type='button'
              className='w-full border-t border-t-solid border-t-[#DBA362] bg-[rgb(219,163,98,0.2)] flex items-center justify-center gap-[0.625rem] grow'
            >
              <span className='text-xs text-[#1D242E]'>View Detail </span>
              <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
            </button>
          </div>
        </div>
        <div className='w-full flex gap-8 '>
          <div className='flex flex-col w-[calc(60%+1rem)] bg-[#ffffff] rounded-xl border border-solid border-[rgb(29,36,46,0.3)]'>
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
        <div className='w-full'>
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
        </div>
      </div>
    </section>
  )
}

export default Overview
