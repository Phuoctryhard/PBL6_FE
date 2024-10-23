import { ArrowRight2, Add, SearchNormal, ArrowDown2, Edit, Refresh, Eye } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Table, TreeSelect, Breadcrumb, Empty, Dropdown, Popconfirm, message } from 'antd'
import './Product.css'
import { Pagination } from 'antd'
import qs from 'qs'
import { getAccessToken } from '../../until'
import { FilterOutlined, DashOutlined, DeleteOutlined } from '@ant-design/icons'
const filterSelectTheme = {
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
      selectorBg: '#fafafa',
      activeBorderColor: '#1D242E',
      hoverBorderColor: '#1D242E'
    }
  }
}

const AdminProducts = () => {
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchType, setSearchType] = useState('')
  const [treeData, setTreeData] = useState([])
  const [localeText, setLocaleText] = useState({
    emptyText: <Empty description='...loading' className='hidden'></Empty>
  })
  const [messageApi, contextHolder] = message.useMessage()
  const [responseState, setResponseState] = useState({ status: 0, messageResult: '', type: null })
  const token = getAccessToken()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }
  const fetchDeleteProduct = async (ProductID) => {
    try {
      const response = await fetch(
        `https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/products/delete/${ProductID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify({ product_is_delete: 1 })
        }
      )
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized access. Please check your credentials.')
        }
      }
      const result = await response.json()
      const { messages, status } = result
      setResponseState({ status, messageResult: messages, type: 'Delete' })
    } catch (e) {
      openMessage('error', e.message, 3)
    }
  }
  const fetchRestoreProduct = async (ProductID) => {
    try {
      const response = await fetch(
        `https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/products/delete/${ProductID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },

          body: JSON.stringify({ product_is_delete: 0 })
        }
      )
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized access. Please check your credentials.')
        }
      }
      const result = await response.json()
      const { messages, status } = result
      setResponseState({ status, messageResult: messages, type: 'Restore' })
    } catch (e) {
      openMessage('error', e.message, 3)
    }
  }
  const [firstRender, setFirstRender] = useState(true)
  const handleCancelDelete = (e) => {
    return
  }

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
      filters: category,
      onFilter: (value, record) => record.category_name.includes(value),
      ellipsis: true,
      filterSearch: true
    },
    {
      title: 'Brand',
      dataIndex: 'brand_name',
      key: 'brand_name',
      width: '20%',
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      filters: brand,
      onFilter: (value, record) => record.brand_name.includes(value),
      ellipsis: true,
      filterSearch: true
    },
    {
      title: 'Status',
      dataIndex: 'product_is_delete',
      key: 'product_is_delete',
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
      onFilter: (value, record) => record.product_is_delete === value,
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
              },
              {
                key: '4',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Restore record ${record.product_id}`}
                    description='Are you sure to restore this record?'
                    okText='Restore'
                    cancelText='Cancel'
                    onCancel={handleCancelDelete}
                    onConfirm={() => fetchRestoreProduct(record.product_id)}
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
  const [data, setData] = useState()
  const [loading, setLoading] = useState()
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
        pageSizeOptions={pageSizeOptions || ['8', '10', '20', '30', '40', '50', '100']}
      />
    </div>
  )
  const fetchProducts = (params) => {
    if (!firstRender) {
      setLocaleText({
        emptyText: <Empty description='No data found'></Empty>
      })
    }
    setLoading(true)
    const query = qs.stringify({
      ...params
    })
    fetch(`https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/products?${query}`)
      .then((res) => res.json())
      .then(({ data }) => {
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
          .sort((a, b) => new Date(b.product_updated_at) - new Date(a.product_updated_at))

        const categories = [...new Set(tableData.map((item) => item.category_name))]
        const categoryFilters = categories.map((category) => ({
          text: category,
          value: category
        }))
        const brands = [...new Set(tableData.map((item) => item.brand_name))]
        const brandFilters = brands.map((brand) => ({
          text: brand,
          value: brand
        }))
        setBrand(brandFilters)

        setCategory(categoryFilters)
        setData(tableData)
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.length
          }
        })
      })
  }

  const convertToTreeData = (data) => {
    return data
      .filter((item) => item.category_type !== 'disease')
      .map((item) => ({
        title: item.category_name,
        value: item.category_name,
        children: item.children ? convertToTreeData(item.children) : []
      }))
  }
  useEffect(() => {
    fetch('https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/categories')
      .then((response) => response.json())
      .then(({ data }) => {
        const categories = convertToTreeData(data)
        setTreeData(categories)
      })
  }, [])
  useEffect(() => {
    fetchProducts({
      search: searchValue,
      category_name: searchType
    })
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    searchType
  ])
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    }
  }, [firstRender])

  useEffect(() => {
    const { status, messageResult, type } = responseState
    if (type) {
      if ([200, 201, 202, 204].includes(status)) {
        openMessage('success', `${type} product success`, 3)
        fetchProducts({
          search: searchValue,
          category_name: searchType
        })
      } else if (status >= 400) {
        openMessage('error', `${type} product failed: ${messageResult}`, 3)
      }
    }
  }, [responseState])
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
        <div className='flex justify-between items-center'>
          <div className='searchProductBox flex items-center bg-[#fafafa] w-[340px] justify-between text-[14px] border-[1px] border-solid border-[#e8ebed] rounded-[4px] animate-[slideLeftToRight_1s_ease] relative'>
            <input
              type='text'
              placeholder='Search for product'
              className='searchProductBox__input border-none outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
                if (e.target.value === '') {
                  fetchProducts({
                    search: undefined,
                    category_name: searchType
                  })
                }
              }}
            />
            <button
              onClick={() => {
                fetchProducts({
                  search: searchValue,
                  category_name: searchType
                })
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <div className='filterBox flex gap-x-[12px] items-center animate-[slideRightToLeft_1s_ease]'>
            <FilterOutlined className='text-xl' color='#1D242E' />
            <ConfigProvider theme={filterSelectTheme}>
              <TreeSelect
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                showSearch
                placeholder='- Choose Group -'
                placement='bottomRight'
                treeData={treeData}
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 300 }}
                className='w-[217px] border-[1px] border-solid border-[#e8ebed] rounded-[4px] h-[50px]'
                onChange={(value) => {
                  setSearchType(value)
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
              dataSource={data}
              pagination={{
                position: ['none'],
                ...tableParams.pagination
              }}
              loading={loading}
              locale={localeText}
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

export default AdminProducts
