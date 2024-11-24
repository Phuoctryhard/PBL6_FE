import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import BreadCrumbs from '../AdminBreadCrumbs'
import { AdminOrderApi, ProductsAPI, CustomerAPI, AdminPaymentApi, AdminDeliveryAPI } from '../../Api/admin'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { message, DatePicker, ConfigProvider, Tooltip } from 'antd'
import { Edit, Printer, SearchNormal } from 'iconsax-react'
import { AdminTable } from '../'
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image'

const ViewOrder = () => {
  const token = localStorage.getItem('accesstoken')
  const { id } = useParams()
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')
  const navigate = useNavigate()
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
  const handleResponse = async (response, defaultErrorText = 'Error fetch') => {
    if (!response.ok) {
      const content_type = response.headers.get('content-type')
      if (content_type && content_type.includes('application/json')) {
        const res = await response.json()
        if (response.status === 401) {
          handleUnauthorized()
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

  //#region data
  const [data, setData] = useState([])
  const [orderStatusDesigned, setOrderStatusDesigned] = useState()
  const [paymentStatusDesigned, setPaymentStatusDesigned] = useState()
  const [deliveredStatusDesigned, setDeliveredStatusDesigned] = useState()
  const [paymentData, setPaymentData] = useState()
  const [deliveryData, setDeliveryData] = useState()

  const handleDesignedStatus = (status) => {
    let color
    let backgroundColor
    let borderColor
    switch (status) {
      case 'completed':
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
      default:
        borderColor = '#FCA5A5'
        backgroundColor = '#FEE2E2'
        color = '#991B1B'
        break
    }
    return (
      <span
        style={{ color, backgroundColor, border: `2px solid ${borderColor}` }}
        className='inline-block justify-center items-center py-1 px-4 rounded-full whitespace-nowrap text-xs'
      >
        {status}
      </span>
    )
  }
  //#endregion

  //#region table data

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_id',
      key: 'product_id',
      render: (text, record) => {
        return (
          <Tooltip
            title={
              <div className='flex gap-4 items-center'>
                <img
                  src={record.product_image ? record.product_image : '/assets/images/default-product.png'}
                  alt='Product'
                  className='w-32 h-32 object-cover rounded-[4px]'
                />
                <div className='flex'>
                  <span className='font-medium text-sm'>{record.product_name}</span>
                </div>
              </div>
            }
            color='#283342'
            trigger='hover'
            overlayStyle={{ maxWidth: '300px' }}
          >
            <div className='w-full overflow-hidden flex'>
              <span className='font-medium w-full max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap inline-block'>
                {record.product_name}
              </span>
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'order_quantity',
      key: 'order_quantity'
    },
    {
      title: 'Price (VND)',
      dataIndex: 'order_price',
      key: 'order_price'
    },
    {
      title: 'Total Price',
      dataIndex: 'order_total_price',
      key: 'order_total_price'
    }
  ]

  //Table Data
  const [tableData, setTableData] = useState() // all data from fetch API
  const [filterData, setFilterData] = useState([]) // data source after filter from all data
  const [loading, setLoading] = useState() // table loading state
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5
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

  //#region fetch order by id
  const fetchOrderByIDs = async () => {
    try {
      const response = await AdminOrderApi.getOrderById(id, token)
      const isResponseOK = await handleResponse(response)
      if (isResponseOK) {
        const res = await response.json()
        const data = res.data
        let orderStatus = data.order_status
        let paymentStatus = data.payment_status
        let deliveredStatus = data.delivery_status
        setOrderStatusDesigned(handleDesignedStatus(orderStatus))
        setPaymentStatusDesigned(handleDesignedStatus(paymentStatus))
        setDeliveredStatusDesigned(handleDesignedStatus(deliveredStatus))
        const orderDetail = data.order_details
        // const paymentMethod = await fetchPaymentMethodByID(data.payment_method_id)
        // const deliveryMethod = await fetchDeliveryMethodByID(data.delivery_method_id)
        // setPaymentData(paymentMethod)
        // setDeliveryData(deliveryMethod)
        setData(data)
        fetchTableData(orderDetail)
      }
    } catch (e) {}
  }

  const fetchProductByID = async (productID) => {
    const response = await ProductsAPI.getProductByID(productID)
    const isResponseOK = await handleResponse(response, "Can't get product")
    if (isResponseOK) {
      const res = await response.json()
      return res.data
    }
  }

  const fetchPaymentMethodByID = async (paymentMethodID) => {
    const response = await AdminPaymentApi.getPaymentMethodByID(paymentMethodID, token)
    const isResponseOK = await handleResponse(response, "Can't get payment method")
    if (isResponseOK) {
      const res = await response.json()
      return res.data
    }
  }

  const fetchDeliveryMethodByID = async (deliveryMethodID) => {
    const response = await AdminDeliveryAPI.getDeliveryMethodByID(deliveryMethodID, token)
    const isResponseOK = await handleResponse(response, "Can't get delivery method")
    if (isResponseOK) {
      const res = await response.json()
      return res.data
    }
  }

  const fetchTableData = async (orderDetail) => {
    try {
      const tableProductData = []
      if (orderDetail)
        for (let i = 0; i < orderDetail.length; i++) {
          const productID = orderDetail[i].product_id
          const product = await fetchProductByID(productID)
          const productData = {
            key: productID,
            product_id: productID,
            product_name: product.product_name,
            product_image: product.product_images ? product.product_images[0] : null,
            category_name: product.category_name,
            order_quantity: orderDetail[i].order_quantity,
            order_price: orderDetail[i].order_price,
            order_total_price: orderDetail[i].order_total_price
          }
          tableProductData.push(productData)
        }
      setTableData(tableProductData)
      setFilterData(tableProductData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: tableData.length
        }
      })
    } catch (e) {}
  }

  const fetchUserByID = async (userID) => {
    try {
      const response = await CustomerAPI.getUserByID(userID, token)
      const isResponseOK = await handleResponse(response, "Can't get user")
      if (isResponseOK) {
        const res = await response.json()
        return res.data
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchOrderByIDs()
  }, [])
  //#endregion

  //#endregion

  const CreatePDFfromHTML = () => {
    try {
      const pxToMm = (px, dpi = 96) => {
        return (px / dpi) * 25.4
      }
      var htmlContent = document.querySelector('.html-content')
      var margin_top = 32
      var HTML_Width = htmlContent.offsetWidth + margin_top * 2
      var HTML_Height = htmlContent.offsetHeight + margin_top * 2
      var canvas_image_width = HTML_Width
      var canvas_image_height = HTML_Height
      var ratio = canvas_image_width / canvas_image_height
      domtoimage
        .toPng(htmlContent, {
          quality: 0.95,
          width: canvas_image_width,
          height: canvas_image_height
        })
        .then(function (dataUrl) {
          var pdf = new jsPDF('l', 'mm', 'a4')
          var width = pdf.internal.pageSize.getWidth()
          var height = width / ratio
          pdf.addImage(
            dataUrl,
            'PNG',
            pxToMm(margin_top / 8 - 10),
            -pxToMm(margin_top),
            width + pxToMm(margin_top * 2),
            height + pxToMm(margin_top * 4)
          )
          pdf.save(`order_${id}_${data?.user_fullname}.pdf`)
        })
    } catch (e) {
      console.error(e)
    }
  }

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
      <header className='flex justify-between animate-[slideDown_1s_ease] w-full'>
        <div className='flex flex-col w-[50%]'>
          <BreadCrumbs
            items={[
              {
                title: (
                  <Link to='/admin/orders' tabIndex='-1'>
                    Orders
                  </Link>
                )
              },
              {
                title: 'View order'
              }
            ]}
          />
        </div>
        <div className='flex gap-4'>
          <button
            className='h-[46px] px-4 py-3 bg-[rgb(0,143,153,0.05)] rounded-lg text-[rgb(0,143,153)] flex gap-2 font-semibold items-center text-sm justify-center border-dashed border border-[rgb(0,143,153)]'
            type='button'
            onClick={() => {}}
          >
            <span>Update</span>
            <span>
              <Edit color='rgb(0,143,153)' size={18} />
            </span>
          </button>
          <button
            className='h-[46px] px-4 py-3 bg-[rgb(0,143,153,0.05)] rounded-lg text-[rgb(0,143,153)] flex gap-2 font-semibold items-center text-sm justify-center border-dashed border border-[rgb(0,143,153)]'
            type='button'
            onClick={() => {
              CreatePDFfromHTML()
            }}
          >
            <span>Print</span>
            <span>
              <Printer color='rgb(0,143,153)' size={18} />
            </span>
          </button>
        </div>
      </header>
      <div className='p-5 my-6 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp flex flex-col gap-4 w-full html-content'>
        <header className='flex items-center justify-between w-full'>
          <div className='flex gap-4 justify-start'>
            <img src='/assets/images/Logo_Pbl6.png' alt='Logo' className='object-cover w-[9rem] h-auto' />
            <div className='flex justify-center items-center gap-4 pt-8'>
              <Tooltip placement='top' title='Order Status' color='#000' trigger='hover'>
                <div className='flex flex-col gap-1 justify-center items-center'>
                  {orderStatusDesigned}
                  <span className='text-sm text-gray-800 font-extralight'>Order Status</span>
                </div>
              </Tooltip>
              <Tooltip placement='top' title='Payment Status' color='#000' trigger='hover'>
                <div className='flex flex-col gap-1 justify-center items-center'>
                  {paymentStatusDesigned}
                  <span className='text-sm text-gray-800 font-extralight'>Payment status</span>
                </div>
              </Tooltip>
              <Tooltip placement='top' title='Delivered Status' color='#000' trigger='hover'>
                <div className='flex flex-col gap-1 justify-center items-center'>
                  {deliveredStatusDesigned}
                  <span className='text-sm text-gray-800 font-extralight'>Delivery status</span>
                </div>
              </Tooltip>
            </div>
          </div>
          <div className='flex flex-col items-end justify-center gap-4 text-sm'>
            <div className='flex gap-4 justify-end'>
              <span className='font-extralight text-right'></span>
              <span className='font-medium value-detail text-left whitespace-nowrap'>#{id}</span>
            </div>
            <div className='flex gap-4 justify-end'>
              <span className='font-extralight text-right'>Create Date:</span>
              <span className='font-medium value-detail text-left whitespace-nowrap'>
                {DateFormat(data?.order_created_at || new Date())}
              </span>
            </div>
            <div className='flex gap-4 justify-end'>
              <span className='font-extralight text-right'>Due Date:</span>
              <span className='font-medium value-detail text-left whitespace-nowrap'>
                {DateFormat(data?.receiver_created_at || new Date())}
              </span>
            </div>
          </div>
        </header>
        <div className='flex flex-col gap-8 w-full mt-4'>
          <div className='flex gap-8 w-full'>
            <div className='flex w-[50%] p-5 border border-solid border-[rgb(232,235,238)] rounded-xl gap-8 justify-between items-center grow'>
              <div className='flex flex-col gap-4 w-[60%]'>
                <h2 className='text-lg font-semibold'>User Information</h2>
                <div className='flex flex-col gap-2 text-sm w-full'>
                  <div className='flex gap-4 w-full'>
                    <span className='font-extralight text-right min-w-32'>Name:</span>
                    <span className='font-medium value-detail text-left whitespace-nowrap text-sm text-ellipsis overflow-hidden w-full max-w-[200px]'>
                      {data?.user_fullname}
                    </span>
                  </div>
                  <div className='flex gap-4'>
                    <span className='font-extralight text-right min-w-32'>Payment method:</span>
                    <span className='font-medium value-detail text-left whitespace-nowrap text-ellipsis overflow-hidden w-full max-w-[200px]'>
                      {data?.payment_method_name}
                    </span>
                  </div>
                  <div className='flex gap-4'>
                    <span className='font-extralight text-right min-w-32'>Delivery method:</span>
                    <span className='font-medium value-detail text-left whitespace-nowrap text-ellipsis overflow-hidden w-full max-w-[200px]'>
                      {data?.delivery_method_name}
                    </span>
                  </div>
                </div>
              </div>
              <div className='w-[40%] flex'>
                <img
                  src={data?.user_avatar ? data.user_avatar : '/assets/images/default-avatar.png'}
                  alt='Avatar'
                  className='w-32 h-32 rounded-[50%] object-cover border border-dashed border-gray-800 ml-auto'
                />
              </div>
            </div>
            <div className='flex flex-col gap-4 w-[50%] p-5 border border-solid border-[rgb(232,235,238)] rounded-xl'>
              <h2 className='text-lg font-semibold'>Receiver Information</h2>
              <div className='flex flex-col gap-2 text-sm'>
                <div className='flex gap-4'>
                  <span className='font-extralight text-right min-w-16'>Name:</span>
                  <span className='font-medium value-detail text-left whitespace-nowrap text-ellipsis overflow-hidden'>
                    {data?.receiver_name}
                  </span>
                </div>
                <div className='flex gap-4'>
                  <span className='font-extralight text-right min-w-16'>Phone:</span>
                  <span className='font-medium value-detail text-left whitespace-nowrap text-ellipsis overflow-hidden'>
                    {data?.receiver_phone}
                  </span>
                </div>
                <div className='flex gap-4'>
                  <span className='font-extralight text-right min-w-16'>Address:</span>
                  <span className='font-medium value-detail text-left'>
                    {data.receiver_address}, {data.ward_name}, {data.district_name}, {data.province_name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-8 w-full items-start'>
            <div className='flex w-[70%] p-5 border border-solid border-[rgb(232,235,238)] rounded-xl gap-8 justify-between items-center'>
              <div className='w-full'>
                <AdminTable
                  columns={columns}
                  rowKey='product_id'
                  data={filterData}
                  tableParams={tableParams}
                  tableStyles={{
                    width: '100%',
                    maxWidth: '100%',
                    minHeight: '300px',
                    maxHeight: '300px',
                    backgroundColor: '#ffffff'
                  }}
                  scroll={{ y: '260px' }}
                  loading={loading}
                  handleTableChange={handleTableChange}
                  paginationTable={false}
                />
              </div>
            </div>
            <div className='flex w-[30%] items-start text-sm flex-col gap-6'>
              <div className='flex justify-between items-center w-full'>
                <span className='font-extralight w-full max-w-14'>Paid By: </span>
                <span className='font-medium'>{data?.payment_method_name}</span>
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className='font-extralight w-full max-w-20'>Delivery By: </span>
                <span className='font-medium'>{data?.delivery_method_name}</span>
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className='font-extralight'>Currency: </span>
                <span className='font-medium'>VND</span>
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className='font-extralight'>Amount Total: </span>
                <span className='font-medium'>{data?.order_total_amount}</span>
              </div>
              <div className='flex items-start w-full p-5 gap-2 flex-col border border-solid border-[#e8ebed] rounded-xl'>
                <h2 className='text-base font-semibold'>Notes</h2>
                <span
                  className='text-xs font-light leading-5'
                  style={{
                    fontFamily: "'Arial', sans-serif"
                  }}
                >
                  {data?.order_note
                    ? data.order_note
                    : 'Cảm ơn bạn đã tin tưởng và lựa chọn sản phẩm của chúng tôi. Hy vọng rằng bạn sẽ hài lòng với trải nghiệm mua sắm này và mong được phục vụ bạn trong những lần tiếp theo. Chúc bạn một ngày tuyệt vời!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewOrder
