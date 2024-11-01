import { useParams, Link, useNavigate } from 'react-router-dom'
import BreadCrumbs from '../AdminBreadCrumbs'
import { ImportsAPI } from '../../Api/admin/imports'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { message, DatePicker, ConfigProvider } from 'antd'
import { SearchNormal } from 'iconsax-react'
import AdminTable from '../AdminTable'
const { RangePicker } = DatePicker
const DetailImport = () => {
  const token = localStorage.getItem('accesstoken')
  const { id } = useParams()
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    localStorage.removeItem('accesstoken')
    setIsAuthenticated(false)
    navigate('/admin/login')
  }

  //#region filter data
  const [searchValue, setSearchValue] = useState('')
  const [selectDate, setSelectDate] = useState()
  //#endregion

  //#region handle table data
  // Date format options
  const optionsDateformat = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false
  }

  // Date format
  const DateFormat = (date) => {
    return new Date(date).toLocaleDateString('en-GB', optionsDateformat)
  }
  //Table columns
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '20%',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      ellipsis: true
    },
    {
      title: 'Import Price(VND)',
      dataIndex: 'import_price',
      key: 'import_price',
      width: '10%',
      sorter: (a, b) => a.import_price - b.import_price,
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{parseFloat(text).toString()}</span>
    },
    {
      title: 'Product Expiry Date',
      dataIndex: 'product_expiry_date',
      key: 'product_expiry_date',
      width: '10%',
      sorter: (a, b) => a.product_expiry_date - b.product_expiry_date,
      ellipsis: true,
      render: (text) => {
        return <span className='text-[14px]'>{DateFormat(text)}</span>
      }
    },
    {
      title: 'Total Quantity',
      dataIndex: 'import_quantity',
      key: 'import_quantity',
      width: '10%',
      sorter: (a, b) => a.import_quantity - b.import_quantity,
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{parseFloat(text).toString()}</span>
    },
    {
      title: 'Total Price',
      dataIndex: 'product_total_price',
      key: 'product_total_price',
      width: '10%',
      sorter: (a, b) => a.product_total_price - b.product_total_price,
      ellipsis: true,
      render: (text) => <span className='text-[14px]'>{parseFloat(text).toString()}</span>
    }
  ]
  //Table data
  const [importItems, setImportItems] = useState([])
  const [filterData, setFilterData] = useState([])
  const [importDetail, setImportDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5
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

  const searchImportItems = () => {
    const compareDate = (date1, date2) => {
      const [day1, month1, year1] = date1.split('/').map(Number)
      const [day2, month2, year2] = date2.split('/').map(Number)
      const d1 = new Date(year1, month1 - 1, day1)
      const d2 = new Date(year2, month2 - 1, day2)
      return d1.getTime() === d2.getTime()
    }
    const result = importItems.filter((item) => {
      const matchesBrandName = item.product_name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesDate = selectDate ? compareDate(selectDate, DateFormat(item.product_expiry_date)) : true
      return matchesBrandName && matchesDate
    })
    const tableData = result
    setFilterData(tableData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: result.length
      }
    })
  }

  // fetch data from api
  const fetchImports = async () => {
    setLoading(true)
    try {
      const response = await ImportsAPI.getImportById(token, id)
      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized()
        }
        const result = await response.json()
        const errorMessage = result.error
        const status = response.status
        setStatus(status)
        setMessageResult(`Error fetching categories: with status ${status} and message ${errorMessage}`)
        setLoading(false)
        return
      }
      const result = await response.json()
      const data = result.data
      const importsDetail = data.import
      const importItems = data.import_details
      setImportDetail(importsDetail)
      setImportItems(importItems)
      setFilterData(importItems)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: importItems.length
        }
      })
      setLoading(false)
    } catch (error) {
      setStatus(500)
      setMessageResult('Internal server error')
    }
  }

  useEffect(() => {
    fetchImports().then(() => {
      // Delay the width calculation to ensure the DOM is updated
      setTimeout(() => {
        //set the width of the value spans to the maximum width
        const valueSpans = document.querySelectorAll('.value-detail')
        let maxWidth = 0
        valueSpans.forEach((span) => {
          const spanWidth = span.offsetWidth
          if (spanWidth > maxWidth) {
            maxWidth = spanWidth
          }
        })
        valueSpans.forEach((span) => {
          span.style.width = `${maxWidth}px`
        })
      }, 0)
    })
  }, [])

  useEffect(() => {
    if (importItems) {
      searchImportItems()
    }
  }, [
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    tableParams.pagination?.pageSize,
    selectDate
  ])
  //#endregion

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
    } else if (status >= 400) {
      message.error(messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])
  //#endregion

  return (
    <section className='w-full h-max'>
      <header className='animate-slideDown'>
        <BreadCrumbs
          items={[
            { title: 'Import' },
            { title: <Link to='/admin/imports'>List of import</Link> },
            { title: <Link to={`/admin/imports/${id}`}>Detail import</Link> }
          ]}
        />
        <p className='mt-2'>Detail Import of record {id}</p>
      </header>
      <article className='my-5 p-5 bg-[#ffffff] w-full h-max mt-4 rounded-xl border border-solid border-[rgba(232, 235, 238] animate-slideUp'>
        <header className='flex items-center justify-between w-full'>
          <img src='/assets/images/Logo_Pbl6.png' alt='Logo' className='object-cover w-[9rem] h-auto' />
          <div className='flex flex-col items-end justify-center gap-4 text-sm'>
            <div className='flex gap-4 justify-end'>
              <span className='font-extralight text-right'></span>
              <span className='font-medium value-detail text-left whitespace-nowrap'>#{id}</span>
            </div>
            <div className='flex gap-4 justify-end'>
              <span className='font-extralight text-right'>Supplier: </span>
              <span className='font-medium value-detail text-left whitespace-nowrap'>{importDetail.supplier_name}</span>
            </div>
            <div className='flex gap-4 justify-end'>
              <span className='font-extralight text-right'>Import Date:</span>
              <span className='font-medium value-detail text-left whitespace-nowrap'>
                {DateFormat(importDetail.import_created_at)}
              </span>
            </div>
            <div className='flex gap-4 justify-end'>
              <span className='font-extralight text-right'>Total Amount:</span>
              <span className='font-medium value-detail text-left whitespace-nowrap'>
                {importDetail.import_total_amount}
              </span>
            </div>
          </div>
        </header>
        <div className='mt-5 p-6 border border-solid border-[rgba(232, 235, 238)] rounded-xl w-full'>
          <div className='flex justify-between items-center mb-4 w-full'>
            <div className='flex items-center w-2/3 justify-between text-sm rounded-md relative mr-11'>
              <input
                type='text'
                placeholder='Search for products'
                className='border border-solid border-[#e8ebed] bg-[#fafafa] bg-transparent w-[100%] p-[0.938rem] rounded-md focus:border-[#1D242E] outline-none'
                value={searchValue}
                autoFocus
                onChange={(e) => {
                  setSearchValue(e.target.value)
                }}
              />
              <button
                onClick={() => {
                  fetchImports()
                }}
              >
                <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
              </button>
            </div>
            <div className='flex items-center w-1/3'>
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
                    DatePicker: {
                      activeBorderColor: '#1D242E',
                      hoverBorderColor: '#1D242E'
                    }
                  }
                }}
              >
                <DatePicker
                  showNow={false}
                  className='w-full h-[50px]'
                  placement='bottomRight'
                  size='small'
                  format={'DD/MM/YYYY'}
                  onChange={(date, dateString) => {
                    setSelectDate(dateString)
                  }}
                />
              </ConfigProvider>
            </div>
          </div>
          <AdminTable
            columns={columns}
            data={filterData}
            loading={loading}
            rowKey='import_detail_id'
            tableParams={tableParams}
            tableStyles={{
              width: '1200px',
              minHeight: '250px',
              maxHeight: '250px',
              backgroundColor: '#ffffff'
            }}
            scroll={{ y: 200 }}
            handleTableChange={handleTableChange}
            paginationTable={{
              position: ['none'],
              ...tableParams.pagination
            }}
            pageSizeOptionsParent={['5']}
          />
        </div>
      </article>
    </section>
  )
}

export default DetailImport
