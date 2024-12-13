import BreadCrumbs from '../AdminBreadCrumbs'
import AdminTable from '../AdminTable'
import { useNavigate } from 'react-router-dom'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
import { message, Skeleton, Tooltip, Table } from 'antd'
import { ArchiveBox, Danger, Category, Category2 } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { ProductsAPI, CategoriesAPI } from '../../Api/admin'
const Inventory = () => {
  const navigate = useNavigate()
  const { triggerSidebar, setIsLogin, handleSubNavClick } = useAdminMainLayoutFunction()
  const token = localStorage.getItem('accesstoken')
  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }

  //header data
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState(0)
  const [allCategories, setAllCategories] = useState(0)
  const [loadingData, setLoadingData] = useState(true)

  //#region Table selling product data
  const [sellingProductData, setSellingProductData] = useState([])
  const [lowStockProductCount, setLowStockProductCount] = useState(0)
  const [bestSellers, setBestSellers] = useState(0)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '25%',
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
          key={record.product_id}
          trigger={['hover']}
        >
          <div className='flex items-center justify-start'>
            <span className='line-clamp-2'>{text}</span>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Sold',
      dataIndex: 'product_sold',
      key: 'product_sold',
      width: '25%'
    },
    {
      title: 'Remaining',
      dataIndex: 'product_quantity',
      key: 'product_quantity',
      width: '25%'
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
      key: 'product_price',
      width: '25%',
      render: (text) => <span>{text}</span>
    }
  ]

  //#endregion

  //#region Table top selling category
  const [topSellingCategory, setTopSellingCategory] = useState([])
  const [bestSellerCategories, setBestSellerCategories] = useState(0)
  const topSellingCategoryColumns = [
    {
      title: 'Name',
      dataIndex: 'category_name',
      key: 'category_name',
      ellipsis: true,
      render: (text, record) => (
        <div className='flex items-center gap-x-2 justify-start'>
          <img src={record.category_thumbnail} alt={text} className='w-[48px] h-[48px] object-cover rounded-full' />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Total Income',
      dataIndex: 'total_income',
      key: 'total_income',
      width: '40%'
    }
  ]
  //#endregion

  const fetchAllHeaderInformation = async () => {
    try {
      setLoadingData(true)
      const response = await ProductsAPI.getProducts()
      let resCategory = null
      try {
        resCategory = await CategoriesAPI.getAllCategories(token)
      } catch (err) {
        if (err.message.includes('401')) {
          setIsLogin(false)
          return
        }
        setStatus(400)
        setMessageResult(err.message)
      }
      if (!response || !resCategory) {
        throw new Error('Error fetch all products or categories')
      }

      // product data
      const data = response.data
      const lowStockProduct = data.filter((item) => item.product_quantity < 10)
      const averageSold = data.reduce((sum, product) => sum + product.product_sold, 0) / data.length
      const bestSellers = data.filter((product) => product.product_sold > averageSold)
      const topFiveSellingProduct = data.sort((a, b) => b.product_sold - a.product_sold).slice(0, 5)
      const sellingProductTableData = topFiveSellingProduct.map((item) => ({
        ...item,
        key: item.product_id
      }))
      setProducts(data)
      setLowStockProductCount(lowStockProduct.length)
      setBestSellers(bestSellers.length)
      setAllProducts(data?.length || 0)
      setSellingProductData(sellingProductTableData || [])

      // category data
      const categoryData = resCategory.data
      const CategorySalesInfo = categoryData
        .filter((c) => c.category_type !== 'disease')
        .map((category) => {
          // Lọc các sản phẩm thuộc danh mục hiện tại
          const productsInCategory = data.filter((item) => item.category_id === category.category_id)
          // Tính tổng thu nhập cho danh mục
          const totalIncome = productsInCategory.reduce(
            (sum, product) => sum + product.product_price * product.product_sold,
            0
          )
          const totalSold = productsInCategory.reduce((sum, product) => sum + product.product_sold, 0)
          // Trả về kết quả
          return {
            category_info: { ...category },
            total_income: totalIncome,
            total_sold: totalSold
          }
        })

      const top5Categories = CategorySalesInfo.sort((a, b) => b.total_income - a.total_income) // Sắp xếp giảm dần theo total_income
        .slice(0, 5) // Lấy 5 mục đầu tiên

      const categoriesTableData = top5Categories.map((c) => ({
        ...c.category_info,
        total_income: c.total_income
      }))

      // Tính mức trung bình
      const averageSoldCategory =
        CategorySalesInfo.reduce((sum, category) => sum + category.total_sold, 0) / CategorySalesInfo.length

      // Lọc ra danh mục "bán chạy"
      const bestCategories = CategorySalesInfo.filter((category) => category.total_sold > averageSoldCategory)

      setBestSellerCategories(bestCategories.length)
      setTopSellingCategory(categoriesTableData)
      setAllCategories(categoryData?.length || 0)
    } catch (err) {
      if (err.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(err.message)
    } finally {
      setLoadingData(false)
    }
  }
  //#region

  useEffect(() => {
    fetchAllHeaderInformation()
  }, [])

  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

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
      <Skeleton active loading={loadingData} paragraph={{ rows: 18 }}>
        <header className='flex justify-between animate-slideDown'>
          <div className='flex flex-col gap-1'>
            <BreadCrumbs items={[{ title: 'Inventory' }]} />
            <p>A quick overview about inventory</p>
          </div>
        </header>
        <div className='my-6 animate-slideUp w-full gap-6 flex flex-col'>
          <div className='w-full flex gap-8'>
            <div className='w-[20%] h-[9.5rem] border border-solid border-[#03A9F5] rounded-md overflow-hidden flex flex-col'>
              <div className='flex justify-stretch items-center gap-2 flex-col py-4'>
                <ArchiveBox className='text-[#03A9F5]' size={30} />
                <span className='font-bold text-[1.25rem] text-[#1D242E]'>{allProducts}</span>
                <h2 className='font-medium text-sm text-[#1D242E]'>Total Products</h2>
              </div>
              <button
                type='button'
                className='w-full border-t border-t-solid border-t-[#03A9F5] bg-[rgb(3,169,245,0.3)] flex items-center justify-center gap-[0.625rem] grow'
                onClick={() => {
                  navigate('/admin/products')
                  handleSubNavClick('products')
                }}
              >
                <span className='text-xs text-[#1D242E]'>View Detail </span>
                <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
              </button>
            </div>
            <div className='w-[20%] h-[9.5rem] border border-solid border-[#01A768] rounded-md overflow-hidden flex flex-col'>
              <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
                <ArchiveBox className='text-[#01A768]' size={30} />
                <span className='font-bold text-[1.25rem] text-[#1D242E]'>{bestSellers || 0}</span>
                <h2 className='font-medium text-sm text-[#1D242E]'>Best Selling Product</h2>
              </div>
              <button
                type='button'
                className='w-full border-t border-t-solid border-t-[#01A768] bg-[rgb(1,167,104,0.3)] flex items-center justify-center gap-[0.625rem] grow'
                onClick={() => {
                  navigate('/admin/products')
                  handleSubNavClick('products')
                }}
              >
                <span className='text-xs text-[#1D242E]'>View Detail </span>
                <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
              </button>
            </div>
            <div className='w-[20%] h-[9.5rem] border border-solid border-[#F0483E] rounded-md overflow-hidden flex flex-col'>
              <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
                <Danger className='text-[#F0483E]' size={30} />
                <span className='font-bold text-[1.25rem] text-[#1D242E]'>{lowStockProductCount || 0}</span>
                <h2 className='font-medium text-sm text-[#1D242E]'>Product Shortage</h2>
              </div>
              <div className='w-full border-t border-t-solid border-t-[#F0483E] bg-[rgb(240,72,62,0.3)] flex items-center justify-center gap-[0.625rem] grow'>
                <button
                  className='text-xs text-[#1D242E] w-full flex gap-2 items-center justify-center'
                  type='button'
                  onClick={() => {
                    navigate('/admin/products')
                    handleSubNavClick('products')
                  }}
                >
                  View detail
                  <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
                </button>
              </div>
            </div>
            <div className='w-[20%] h-[9.5rem] border border-solid border-[#817AF3] rounded-md overflow-hidden flex flex-col'>
              <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
                <Category className='text-[#817AF3]' size={30} />
                <span className='font-bold text-[1.25rem] text-[#1D242E]'>{allCategories}</span>
                <h2 className='font-medium text-sm text-[#1D242E]'>Total Category</h2>
              </div>
              <button
                type='button'
                className='w-full border-t border-t-solid border-t-[#817AF3] bg-[rgb(129,122,243,0.3)] flex items-center justify-center gap-[0.625rem] grow'
                onClick={() => {
                  navigate('/admin/categories')
                  handleSubNavClick('categories')
                }}
              >
                <span className='text-xs text-[#1D242E]'>View Detail </span>
                <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
              </button>
            </div>
            <div className='w-[20%] h-[9.5rem] border border-solid border-[#DBA362] rounded-md overflow-hidden flex flex-col'>
              <div className='bg-[#ffffff] flex justify-stretch items-center gap-2 flex-col py-4'>
                <Category2 className='text-[#DBA362]' size={30} />
                <span className='font-bold text-[1.25rem] text-[#1D242E]'>{bestSellerCategories || 0}</span>
                <h2 className='font-medium text-sm text-[#1D242E]'>Best Selling Categories</h2>
              </div>
              <button
                type='button'
                className='w-full border-t border-t-solid border-t-[#DBA362] bg-[rgb(219,163,98,0.2)] flex items-center justify-center gap-[0.625rem] grow'
                onClick={() => {
                  navigate('/admin/categories')
                  handleSubNavClick('categories')
                }}
              >
                <span className='text-xs text-[#1D242E]'>View Detail </span>
                <span className='text-xs font-bold text-[#1D242E]'>{'>>>'}</span>
              </button>
            </div>
          </div>
          <div className='w-full flex gap-8'>
            <div className='w-[calc(60%+1rem)] bg-[#fff] py-5 px-4 rounded-xl border border-solid border-[rgb(29,36,46,0.3)]'>
              <div className='w-full flex justify-between items-center'>
                <h2 className='text-base text-[#383E49] font-medium'>Top 5 Selling Product</h2>
                <span
                  className='text-sm text-[#0F50AA] cursor-pointer '
                  onClick={() => {
                    navigate('/admin/products')
                    handleSubNavClick('products')
                  }}
                >
                  See All
                </span>
              </div>
              <div className='w-full mt-4'>
                <AdminTable
                  columns={columns}
                  rowKey='product_id'
                  data={sellingProductData}
                  tableStyles={{ width: '100%', backgroundColor: '#ffffff' }}
                  paginationTable={false}
                />
              </div>
            </div>

            <div className='w-[40%] bg-[#fff] py-5 px-4 rounded-xl border border-solid border-[rgb(29,36,46,0.3)]'>
              <div className='w-full flex justify-between items-center'>
                <h2 className='text-base text-[#383E49] font-medium'>Top 5 Selling Category</h2>
                <span
                  className='text-sm text-[#0F50AA] cursor-pointer '
                  onClick={() => {
                    navigate('/admin/categories')
                    handleSubNavClick('categories')
                  }}
                >
                  See All
                </span>
              </div>
              <div className='w-full mt-4'>
                <AdminTable
                  columns={topSellingCategoryColumns}
                  rowKey='category_name'
                  data={topSellingCategory}
                  pagination={false}
                  tableStyles={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
    </section>
  )
}

export default Inventory
