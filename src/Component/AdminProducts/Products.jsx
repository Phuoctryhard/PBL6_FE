import { Add, SearchNormal, ArrowDown2, Edit, Eye } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TreeSelect, Dropdown, Popconfirm, message, Select, DatePicker, ConfigProvider } from 'antd'
import qs from 'qs'
import { ProductsAPI, BrandsAPI, CategoriesAPI } from '../../Api/admin'
import { DashOutlined, DeleteOutlined } from '@ant-design/icons'
import 'react-toastify/dist/ReactToastify.css'
import AdminTable from '../AdminTable'
import BreadCrumbs from '../AdminBreadCrumbs'
import { DownloadCSV } from '../'

import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
const { RangePicker } = DatePicker

//#region theme for ant design components
const filterTheme = {
  token: {
    colorTextPlaceholder: '#1D242E',
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
//#endregion

const AdminProducts = () => {
  //access token
  const token = localStorage.getItem('accesstoken')
  const { setIsLogin } = useAdminMainLayoutFunction()

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

  const location = useLocation()
  const [state, setState] = useState(location.state)

  //#region filter data
  //brand data
  const [brand, setBrand] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')

  //Date picker data
  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')

  //Search data
  const [searchValue, setSearchValue] = useState('')

  //Category data
  const [treeData, setTreeData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  //other filter options
  const [selectedFilterOptions, setSelectedFilterOptions] = useState('')

  //data
  const [bestSellerProduct, setBestSellerProduct] = useState([])
  const [lowStockProduct, setLowStockProduct] = useState([])

  const convertToTreeData = (data) => {
    const filterData = data.filter((item) => item.category_type === 'medicine')
    return filterData.map((item) => ({
      title: item.category_name,
      label: item.category_name,
      value: item.category_name,
      children: item.children ? convertToTreeData(item.children) : []
    }))
  }

  //Fetch categories and brands data
  useEffect(() => {
    try {
      const fetchAllCategoryData = async () => {
        try {
          const res = await CategoriesAPI.getAllCategories(token)
        } catch (err) {
          if (err.message.includes('401')) {
            setIsLogin(false)
            return
          }
          setStatus(400)
          setMessageResult(err.message)
        }
      }
      const fetchCategory = async () => {
        try {
          const res = await CategoriesAPI.getCategories()
          const data = res.data
          const categories = convertToTreeData(data.filter((category) => category.category_is_delete === 0))
          setTreeData(categories)
        } catch (err) {
          setStatus(400)
          setMessageResult(err.message)
        }
      }
      const fetchBrands = async () => {
        try {
          const res = await BrandsAPI.getBrands()
          const data = res.data
          setBrand(data)
        } catch (err) {
          setStatus(400)
          setMessageResult(err.message)
        }
      }
      fetchAllCategoryData()
      fetchCategory()
      fetchBrands()
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    }
  }, [])
  //#endregion

  //#region  Table Data and Custom pagination
  //Table columns
  const columns = [
    {
      title: '#',
      dataIndex: 'product_id',
      key: 'product_id',
      sorter: (a, b) => a.product_id - b.product_id,
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      ellipsis: true
    },
    {
      title: 'Price(VND)',
      dataIndex: 'product_price',
      key: 'product_price',
      sorter: (a, b) => a.product_price - b.product_price,
      ellipsis: true,
      render: (text) => <span>{parseFloat(text).toString()}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'product_quantity',
      key: 'product_quantity',
      sorter: (a, b) => a.product_quantity - b.product_quantity,
      ellipsis: true
    },
    {
      title: 'Sold',
      dataIndex: 'product_sold',
      key: 'product_sold',
      sorter: (a, b) => a.product_sold - b.product_sold,
      ellipsis: true
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
      sorter: (a, b) => a.category_name.localeCompare(b.category_name),
      ellipsis: true,
      filterSearch: true
    },
    {
      title: 'Brand',
      dataIndex: 'brand_name',
      key: 'brand_name',
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      ellipsis: true,
      filterSearch: true
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
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
                    to={`/admin/products/${record.product_id}`}
                    className='flex items-center gap-x-2 justify-start w-full'
                  >
                    <Eye size='15' color='green' /> <span>View</span>
                  </Link>
                )
              },
              {
                key: '2',
                label: (
                  <Link
                    to={`/admin/products/update/${record.product_id}`}
                    className='flex items-center gap-x-2 justify-start w-full'
                  >
                    <Edit size='15' color='#bc9143' /> <span>Update</span>
                  </Link>
                )
              },
              {
                key: '3',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Delete record ${record.product_id}`}
                    description='Are you sure to delete this record?'
                    okText='Delete'
                    cancelText='Cancel'
                    onConfirm={() => fetchDeleteProduct(record.product_id)}
                  >
                    <button
                      type='button'
                      className='flex items-center gap-x-2 w-full'
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

  //Table Data
  const [data, setData] = useState() // all data from fetch API
  const [filterData, setFilterData] = useState([]) // data source after filter from all data
  const [loading, setLoading] = useState() // table loading state
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })

  // Handle table change
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

  //Fetch delete product
  const fetchDeleteProduct = async (ProductID) => {
    try {
      const result = await ProductsAPI.deleteProducts(ProductID, token)
      fetchProducts({
        sortlatest: true,
        search: ''
      })
      const { messages, status } = result
      setStatus(status)
      setMessageResult(messages)
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  //search and filter products
  const searchProducts = () => {
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
      let filterResults

      if (selectedFilterOptions) {
        if (selectedFilterOptions === 'top_selling_product') {
          filterResults = bestSellerProduct
        } else if (selectedFilterOptions === 'low_stock_product') {
          filterResults = lowStockProduct
        }
      } else {
        filterResults = data
      }
      const results = filterResults.filter((item) => {
        const matchProductInfo =
          item.product_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.product_id.toString() === searchValue
        const matchesBrandName = selectedBrand
          ? item.brand_name.toLowerCase().includes(selectedBrand.toLowerCase())
          : true
        const matchesDateRange =
          selectedFrom && selectedTo
            ? formatDate(item.product_created_at) &&
              formatDate(selectedFrom) &&
              formatDate(selectedTo) &&
              formatDate(item.product_created_at) >= formatDate(selectedFrom) &&
              formatDate(item.product_created_at) <= formatDate(selectedTo)
            : true
        return matchProductInfo && matchesBrandName && matchesDateRange
      })

      setFilterData(results)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: results.length
        }
      })
    } catch (err) {
      setStatus(400)
      setMessageResult('Error in search product data: ' + err.message)
    }
  }

  //Fetch all products
  const fetchProducts = async (params) => {
    try {
      setLoading(true)
      const query = qs.stringify({
        ...params
      })
      const res = await ProductsAPI.searchProducts(query)
      const data = res.data
      const tableData = data
        .map((product) => ({
          ...product,
          key: product.product_id
        }))
        .sort((a, b) => new Date(b.product_updated_at) - new Date(a.product_updated_at))

      const lowStockProduct = tableData
        .filter((item) => item.product_quantity < 10)
        .sort((a, b) => a.product_quantity - b.product_quantity)
      const averageSold = tableData.reduce((sum, product) => sum + product.product_sold, 0) / tableData.length
      const bestSellers = tableData
        .filter((product) => product.product_sold > averageSold)
        .sort((a, b) => b.product_sold - a.product_sold)

      let resData
      if (state) {
        const { lowStock } = state
        if (lowStock) {
          setSelectedFilterOptions('low_stock_product')
          resData = lowStockProduct
        } else {
          setSelectedFilterOptions('top_selling_product')
          resData = bestSellers
        }
        setState(null)
      } else resData = tableData
      setBestSellerProduct(bestSellers)
      setLowStockProduct(lowStockProduct)
      setFilterData(resData)
      setData(tableData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: resData.length
        }
      })
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    } finally {
      setLoading(false)
    }
  }

  //page size change
  useEffect(() => {
    fetchProducts({
      sortlatest: true,
      search: searchValue
    })
  }, [])

  //filter table change
  useEffect(() => {
    if (state) {
      const { lowStock } = state
      if (lowStock) {
        setSelectedFilterOptions('low_stock_product')
      } else {
        setSelectedFilterOptions('top_selling_product')
      }
      setState(null)
    }
    if (data) {
      searchProducts()
    }
  }, [
    data,
    state,
    selectedFilterOptions,
    searchValue,
    selectedBrand,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    selectedFrom,
    tableParams.pagination?.pageSize,
    selectedTo
  ])

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts({
        sortlatest: true,
        search: searchValue,
        category_name: selectedCategory
      })
    } else {
      fetchProducts({
        sortlatest: true,
        search: searchValue
      })
    }
  }, [selectedCategory])

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
    <section className='max-w-[100%] h-full w-full'>
      {contextHolder}
      <header className='flex justify-between animate-[slideDown_1s_ease] w-full'>
        <div className='flex flex-col gap-1 w-[50%]'>
          <BreadCrumbs
            items={[
              { title: 'Inventory' },
              {
                title: (
                  <Link to='/admin/products' tabIndex='-1'>
                    List of products ({filterData?.length})
                  </Link>
                )
              }
            ]}
          />
          <p>List of products available for sales</p>
        </div>
        <div className='flex gap-4 items-center'>
          <Link to='/admin/products/add-product' tabIndex={-1}>
            <button className='h-[46px] px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'>
              Add new
              <Add size='20' />
            </button>
          </Link>
          <div>
            <DownloadCSV data={filterData} columns={columns} filename={'products'} />
          </div>
        </div>
      </header>
      <div className='p-5 my-4 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-[slideUp_1s_ease] w-full'>
        <div className='flex justify-between items-center gap-x-3 w-full'>
          <div className='flex items-center w-[200px] min-w-[200px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for product'
              className='border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px] focus:border-[#1D242E]'
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
            <ConfigProvider theme={filterTheme}>
              <Select
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                showSearch
                placeholder='Select Brand'
                placement='bottomLeft'
                options={brand.map((item) => ({ label: item.brand_name, value: item.brand_name }))}
                value={selectedBrand || undefined}
                className='w-[200px] min-w-[200px] h-[50px]'
                onChange={(value) => {
                  setSelectedBrand(value)
                }}
              />
            </ConfigProvider>
          </div>
          <div className='flex gap-x-[12px] items-center'>
            <ConfigProvider theme={filterTheme}>
              <TreeSelect
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                showSearch
                placeholder='Select Category'
                placement='bottomLeft'
                treeData={treeData}
                treeDefaultExpandAll
                value={selectedCategory || undefined}
                className='w-[200px] min-w-[200px] h-[50px]'
                onChange={(value) => {
                  setSelectedCategory(value)
                }}
              />
            </ConfigProvider>
          </div>
          <div className='flex gap-x-[12px] items-center'>
            <ConfigProvider theme={filterTheme}>
              <RangePicker
                className='w-[250px] h-[50px]'
                format={'DD/MM/YYYY'}
                onChange={(date, dateString) => {
                  setSelectedFrom(dateString[0])
                  setSelectedTo(dateString[1])
                }}
              />
            </ConfigProvider>
          </div>
          <div className='flex gap-x-[12px] items-center'>
            <ConfigProvider theme={filterTheme}>
              <Select
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                showSearch
                placeholder='Statistical filter'
                placement='bottomLeft'
                options={[
                  { label: 'Top Selling Products', value: 'top_selling_product' },
                  { label: 'Low Stock Products', value: 'low_stock_product' }
                ]}
                value={selectedFilterOptions || undefined}
                className='w-[200px] h-[50px]'
                onChange={(value) => {
                  setSelectedFilterOptions(value)
                }}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className='pt-[15px]'>
          <AdminTable
            columns={columns}
            rowKey='product_id'
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

export default AdminProducts
