import './Brands.css'
import BrandsAPI from '../../Api/admin/brands'
import { ArrowRight2, Add, SearchNormal, ArrowDown2, Edit, Refresh, Eye } from 'iconsax-react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ConfigProvider, Select } from 'antd'
import { Table, TreeSelect, Breadcrumb, Empty, Dropdown, Popconfirm, message, Modal, Tooltip, Pagination } from 'antd'
import qs from 'qs'
import { DashOutlined, DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
const Brands = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })
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
      sorter: (a, b) => a.brand_created_at.localeCompare(b.brand_created_at),
      ellipsis: true
    },
    {
      title: 'Status',
      dataIndex: 'brand_is_delete',
      key: 'brand_is_delete',
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
      onFilter: (value, record) => record.brand_is_delete === value,
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
                    to={`/admin/categories/${record.category_id}`}
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
                    to={`/admin/categories/update/${record.category_id}`}
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
                    title={`Delete record ${record.category_id}`}
                    description='Are you sure to delete this record?'
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
              },
              {
                key: '4',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Restore record ${record.category_id}`}
                    description='Are you sure to restore this record?'
                    okText='Restore'
                    cancelText='Cancel'
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
        pageSizeOptions={pageSizeOptions || ['3', '5', '10']}
      />
    </div>
  )

  const fetchBrands = async (params) => {
    setLoading(true)
    const query = qs.stringify({
      ...params
    })
    const response = await BrandsAPI.searchBrands(query)
    const { data } = response.data
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
    setData(tableData)
    setLoading(false)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data.length
      }
    })
  }

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
  useEffect(() => {
    fetchBrands({
      search: searchValue
    })
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters)
  ])

  useEffect(() => {
    fetchBrands({
      search: searchValue
    })
  }, [])
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
          onClick={() => {}}
        >
          <Add size='20' />
          Add new brand
        </button>
      </header>
      <div className='table__content my-[15px] bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-md'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center bg-[#fafafa] w-[340px] justify-between text-[14px] border-[1px] border-solid border-[#e8ebed] rounded-[4px] animate-[slideLeftToRight_1s_ease] relative'>
            <input
              type='text'
              placeholder='Search for brands'
              className='border-none outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
                if (e.target.value === '') {
                  fetchBrands({
                    search: undefined
                  })
                }
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
              rowKey={(record) => record.brand_id}
              dataSource={data}
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
