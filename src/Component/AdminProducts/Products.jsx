import { ArrowRight2, Add, SearchNormal, ArrowDown2, Edit, Refresh, Eye } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import { Table, TreeSelect, Breadcrumb, Dropdown, Popconfirm, message, Select, DatePicker } from 'antd'
import './Product.css'
import { Pagination } from 'antd'
import qs from 'qs'
import { ProductsAPI, BrandsAPi, CategoriesAPi } from '../../Api/admin'
import { DashOutlined, DeleteOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
const filterSelectTheme = {
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

const AdminProducts = () => {
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [treeData, setTreeData] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [responseState, setResponseState] = useState({ status: 0, messageResult: '', type: null })
  const token = localStorage.getItem('accesstoken')

  const columns = [
    {
      title: '#',
      dataIndex: 'product_id',
      key: 'product_id',
      width: '10%',
      sorter: (a, b) => a.product_id - b.product_id,
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '20%',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      ellipsis: true
    },
    {
      title: 'Price(VND)',
      dataIndex: 'product_price',
      key: 'product_price',
      width: '15%',
      sorter: (a, b) => a.product_price - b.product_price,
      ellipsis: true,
      render: (text) => <span>{parseFloat(text).toString()}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'product_quantity',
      key: 'product_quantity',
      width: '10%',
      sorter: (a, b) => a.product_quantity - b.product_quantity,
      ellipsis: true
    },
    {
      title: 'Sold',
      dataIndex: 'product_sold',
      key: 'product_sold',
      width: '10%',
      sorter: (a, b) => a.product_sold - b.product_sold,
      ellipsis: true
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
      width: '20%',
      sorter: (a, b) => a.category_name.localeCompare(b.category_name),
      ellipsis: true,
      filterSearch: true
    },
    {
      title: 'Brand',
      dataIndex: 'brand_name',
      key: 'brand_name',
      width: '20%',
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      ellipsis: true,
      filterSearch: true
    },
    {
      title: 'Status',
      dataIndex: 'product_is_delete',
      key: 'product_is_delete',
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
                  <Link
                    to={`/admin/products/${record.product_id}`}
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
                    to={`/admin/products/update/${record.product_id}`}
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
                    title={`Delete record ${record.product_id}`}
                    description='Are you sure to delete this record?'
                    okText='Delete'
                    cancelText='Cancel'
                    onCancel={handleCancelDelete}
                    onConfirm={() => fetchDeleteProduct(record.product_id)}
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
  const [data, setData] = useState()
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState()
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }

  const fetchDeleteProduct = async (ProductID) => {
    try {
      const response = await ProductsAPI.deleteProducts(ProductID, token)
      if (!response.ok) {
        if (response.status === 401) {
          setResponseState({
            status: 401,
            messageResult: 'Unauthorized access. Please check your credentials.',
            type: 'Delete'
          })
        } else {
          setResponseState({
            status: response.status,
            messageResult: `Delete product with status code: ${response.status}`,
            type: 'Delete'
          })
        }
        return
      }
      const result = await response.json()
      const { messages, status } = result
      setResponseState({ status, messageResult: messages, type: 'Delete' })
    } catch (e) {}
  }
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
        pageSizeOptions={pageSizeOptions || ['8', '10', '20', '30', '40', '50', '100']}
      />
    </div>
  )

  const handleCancelDelete = (e) => {
    return
  }

  const convertToTreeData = (data) => {
    return data.map((item) => ({
      title: item.category_name,
      label: item.category_name,
      value: item.category_name,
      children: item.children ? convertToTreeData(item.children) : []
    }))
  }

  const searchProducts = () => {
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
    const results = data.filter((item) => {
      const matchesProductName = item.product_name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesCategoryName = selectedCategory
        ? item.category_name.toLowerCase().includes(selectedCategory.toLowerCase())
        : true
      const matchesBrandName = selectedBrand
        ? item.brand_name.toLowerCase().includes(selectedBrand.toLowerCase())
        : true
      const matchesDateRange =
        selectedFrom && selectedTo
          ? formatDate(item.product_created_at) >= formatDate(selectedFrom) &&
            formatDate(item.product_created_at) <= formatDate(selectedTo)
          : true

      return matchesProductName && matchesCategoryName && matchesBrandName && matchesDateRange
    })

    const tableData = results.sort((a, b) => new Date(b.product_created_at) - new Date(a.product_created_at))
    setFilterData(tableData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: results.length
      }
    })
    setLoading(false)
  }

  const fetchProducts = (params) => {
    setLoading(true)
    try {
      const query = qs.stringify({
        ...params
      })
      ProductsAPI.searchProducts(query)
        .then((res) => {
          if (!res.ok) {
            setResponseState({
              status: res.status,
              messageResult: `Fetch products failed with status code: ${res.status}`,
              type: 'Fetch'
            })
            return null
          }
          return res.json()
        })
        .then(({ data }) => {
          if (!data) {
            setLoading(false)
            return
          }
          const tableData = data
            .map((product) => ({
              product_id: product.product_id,
              product_name: product.product_name,
              product_price: product.product_price,
              product_quantity: product.product_quantity,
              product_sold: product.product_sold,
              category_name: product.category_name,
              brand_name: product.brand_name,
              product_is_delete: product.product_is_delete,
              product_created_at: product.product_created_at,
              product_updated_at: product.product_updated_at
            }))
            .sort((a, b) => new Date(b.product_created_at) - new Date(a.product_created_at))
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
        })
        .catch((e) => {
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (e) {}
  }

  useEffect(() => {
    CategoriesAPi.getCategories()
      .then((response) => response.json())
      .then(({ data }) => {
        setCategory(data)
        const categories = convertToTreeData(data.filter((category) => category.category_is_delete === 0))
        setTreeData(categories)
      })
    BrandsAPi.getBrands()
      .then((response) => response.json())
      .then(({ data }) => {
        setBrand(data)
      })
  }, [])

  useEffect(() => {
    fetchProducts({
      search: searchValue
    })
  }, [tableParams.pagination?.pageSize])

  useEffect(() => {
    if (data) {
      searchProducts()
    }
  }, [
    selectedCategory,
    searchValue,
    selectedBrand,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    selectedFrom,
    selectedTo
  ])

  useEffect(() => {
    const { status, messageResult, type } = responseState
    if (type) {
      if ([200, 201, 202, 204].includes(status)) {
        openMessage('success', `${type} product success`, 3)
        fetchProducts({
          search: searchValue
        })
        setResponseState({ status: 0, messageResult: '', type: null })
      } else if (status >= 400) {
        openMessage('error', `${type} product failed: ${messageResult}`, 3)
        setResponseState({ status: 0, messageResult: '', type: null })
      }
    }
  }, [responseState])
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
  return (
    <section className='max-w-[100%] h-full'>
      {contextHolder}
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
                    <Link to='/admin/products' tabIndex='-1'>
                      List of products ({data?.length})
                    </Link>
                  )
                }
              ]}
            ></Breadcrumb>
          </h1>
          <p className='mt-[11px]'>List of products available for sales</p>
        </div>
        <Link to='/admin/products/add-product' tabIndex={-1} className='animate-[slideRightToLeft_1s_ease]'>
          <button className='min-w-[162px] h-[46px] px-[18px] py-[16px] bg-[#F0483E] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px]'>
            <Add size='20' />
            Add new item
          </button>
        </Link>
      </header>
      <div className='table__content my-[15px] bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-md'>
        <div className='flex justify-between items-center gap-x-3'>
          <div className='flex items-center w-[300px] justify-between text-[14px] rounded-[4px] animate-[slideLeftToRight_1s_ease] relative'>
            <input
              type='text'
              placeholder='Search for product'
              className='searchBox__input border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchProducts({
                  search: searchValue
                })
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <div className='flex gap-x-[12px] items-center animate-[slideLeftToRight_1s_ease]'>
            <ConfigProvider theme={filterSelectTheme}>
              <Select
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                showSearch
                placeholder='- Choose Brand -'
                placement='bottomLeft'
                options={brand.map((item) => ({ label: item.brand_name, value: item.brand_name }))}
                value={selectedBrand || undefined}
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: 'auto',
                  minWidth: '300px'
                }}
                className='w-[250px] h-[50px]'
                onChange={(value) => {
                  setSelectedBrand(value)
                }}
              />
            </ConfigProvider>
          </div>
          <div className='flex gap-x-[12px] items-center animate-[slideLeftToRight_1s_ease]'>
            <ConfigProvider theme={filterSelectTheme}>
              <TreeSelect
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                showSearch
                placeholder='- Choose Category -'
                placement='bottomLeft'
                treeData={treeData}
                treeDefaultExpandAll
                value={selectedCategory || undefined}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: '300px' }}
                className='w-[250px] h-[50px]'
                onChange={(value) => {
                  setSelectedCategory(value)
                }}
              />
            </ConfigProvider>
          </div>
          <div className='flex gap-x-[12px] items-center animate-[slideLeftToRight_1s_ease]'>
            <ConfigProvider theme={filterSelectTheme}>
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
              rowKey={(record) => record.product_id}
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
          <ConfigProvider theme={{}}>
            <CustomPagination
              total={tableParams.pagination.total}
              current={tableParams.pagination.current}
              pageSize={tableParams.pagination.pageSize}
              className='text-[#ffffff]'
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
          </ConfigProvider>
        </div>
      </div>
    </section>
  )
}

export default AdminProducts
