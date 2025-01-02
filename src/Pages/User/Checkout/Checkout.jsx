import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Radio } from 'antd'
import { Modal, Divider } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import AddressForm from '../Account/address/component/createAddress/CreateAddress'
import ModalListAddress from './component/ModalListAddress'
import ModalDelivery from './component/ModalDelivery'
import paymentAPI from '../../../Api/user/payment'
import DeliveryAPI from '../../../Api/user/delivery'
import AddressApi from '../../../Api/user/address'
import { formatCurrency } from '../../../until'
import { useLocation } from 'react-router-dom'
import OrderApi from '../../../Api/user/order'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ModalPaymentSucess from './component/PaymentSucess'
import { AuthContext } from '../../../context/app.context'
import CartAPI from '../../../Api/user/cart'
import { queryClient } from '../../../index.js'
import ModalAddAddress from './component/ModalAddAddress.jsx'
import { Helmet } from 'react-helmet-async'
import { Alert, Flex, Spin } from 'antd'
export default function Checkout() {
  const [isLoading1, setIsLoading] = useState(false)
  const location = useLocation()
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenBuy, setIsModalOpenBuy] = useState(false)
  const { isAuthenticated, checkedProducts, setCheckedProducts } = useContext(AuthContext)
  const { product_id, cart_quantity, productName, productPrice, productImage, product_discount } = location.state || {}
  //console.log(product_id, cart_quantity, productName, productPrice, productImage, product_discount)
  const navigate = useNavigate()
  // Lấy sản phẩm trong giỏ hàng
  // get list cart
  const [listProduct, setlistProduct] = useState([])
  const [totalMoney, setTotalMoney] = useState(0)
  const [discount, setDiscount] = useState(0)
  const { data: listCart } = useQuery({
    queryKey: ['getCart'],
    queryFn: CartAPI.getCart,
    enabled: isAuthenticated // Chỉ gọi query khi người dùng đã đăng nhập
  })

  useEffect(() => {
    if (listCart?.data.data && checkedProducts && product_id == null) {
      // Lọc các sản phẩm có trong checkedProducts
      const filteredProducts = listCart.data.data.filter(
        (item) => checkedProducts.includes(item.cart_id) // So sánh `cart_id` với các ID trong `checkedProducts`
      )
      const totalPrice = filteredProducts.reduce((total, item) => {
        return total + item.cart_price * item.cart_quantity
      }, 0)
      // console.log(+totalPrice)
      setTotalMoney(+totalPrice)
      setlistProduct(filteredProducts) // Cập nhật state
    } else if (product_id) {
      const filteredProducts = [
        {
          product_id, // ID sản phẩm
          cart_quantity, // Số lượng trong giỏ hàng
          product_name: productName, // Tên sản phẩm
          cart_price: productPrice, // Giá sản phẩm (đổi tên cho khớp với `cart_price`)
          product_images: [productImage.original], // Mảng chứa hình ảnh sản phẩm
          product_discount: product_discount
        }
      ]
      const totalPrice = filteredProducts.reduce((total, item) => {
        return total + item.cart_price * item.cart_quantity
      }, 0)
      //console.log(totalPrice)
      setDiscount(product_discount)
      setTotalMoney(+totalPrice)
      // console.log(filteredProducts)
      // console.log(product_discount)
      setlistProduct(filteredProducts)
    }
  }, [listCart, checkedProducts, product_id])

  //console.log(listProduct)
  // lấy ra method thanh toán
  const { data } = useQuery({
    queryKey: ['getPayment'],
    queryFn: paymentAPI.getAllPayment,
    staleTime: 5 * 60 * 1000, // Dữ liệu được coi là mới trong 5 phút
    cacheTime: 10 * 60 * 1000 // Giữ dữ liệu trong bộ nhớ cache trong 10 phút
  })
  // lấy thanh toan
  //console.log(data)

  const { data: getAddress, isLoading } = useQuery({
    queryKey: ['getAddress'],
    queryFn: AddressApi.getAddress_receive,
    staleTime: 5 * 60 * 1000, // Dữ liệu được coi là mới trong 5 phút
    cacheTime: 10 * 60 * 1000 // Giữ dữ liệu trong bộ nhớ cache trong 10 phút
  })

  // delivery
  const { data: getDelivery } = useQuery({
    queryKey: ['getDelivery'],
    queryFn: DeliveryAPI.getDelivery,
    staleTime: 5 * 60 * 1000, // Dữ liệu được coi là mới trong 5 phút
    cacheTime: 10 * 60 * 1000 // Giữ dữ liệu trong bộ nhớ cache trong 10 phút
  })
  console.log(getDelivery)
  const handleBuyNow = async () => {
    try {
      //console.log(value, valueDelivery, valueAddress, checkedProducts)
      if (checkedProducts.length > 0 && product_id == null) {
        // console.log(value, valueDelivery, valueAddress, checkedProducts)
        // from cart
        const buyNow = {
          receiver_address_id: valueAddress, //required
          payment_id: value, //required
          delivery_id: valueDelivery, //required
          ids_cart: checkedProducts //required
        }

        const res = await OrderApi.Checkout_CartOrder(buyNow)
        if (res) {
          setCheckedProducts([])
          // console.log(res)
          if (res.data.messages[0] === 'Đặt hàng thành công!') {
            console.log(res.data.messages[0])
            queryClient.invalidateQueries({ queryKey: ['getCart'] })
            navigate('/account/order-history')
            //setIsModalOpenBuy(true)
            setCheckedProducts([])
          } else {
            setIsLoading(true)
            window.location.href = res.data.data
          }
          //console.log(res)
          toast.success(' Chuyển sang trang thanh toán, vui lòng chờ trong giây lát đi! ', { autoClose: 1000 }) // Đóng sau 1 giây
          //toast.success(res.data.messages[0], { autoClose: 1000 }) // Đóng sau 1 giây
        } else {
          toast.error('Thất bại')
        }
        // console.log(buyNow)
      } else if (product_id) {
        // console.log('chitiet' + product_id)
        // from
        const buyNow = {
          receiver_address_id: valueAddress, //required
          payment_id: value, //required
          delivery_id: valueDelivery, //required
          product_id: +product_id, //required
          quantity: cart_quantity //required
        }
        // console.log(buyNow)

        console.log('error in buy product')
        const res = await OrderApi.BuyProduct_DetailProduct(buyNow)
        if (res) {
          if (res.data.messages[0] === 'Đặt hàng thành công!') {
            queryClient.invalidateQueries({ queryKey: ['getCart'] })
            setIsModalOpenBuy(true)
          } else {
            setIsLoading(true)
            window.location.href = res.data.data
          }
        }
        // toast.success(res.data.messages[0], { autoClose: 1000 }) // Đóng sau 1 giây
        toast.success(' Chuyển sang trang thanh toán, vui lòng chờ trong giây lát đi! ', { autoClose: 1000 }) // Đóng sau 1 giây
      } else {
        toast.error('Thất bại')
      }
    } catch (e) {
      toast.error(e.response.data.messages[0])
    }
  }

  const [OpenListAddress, setOpenListAddress] = useState(false)

  // Thiết lập giá trị mặc định khi data có dữ liệu
  // Lưu giá trị mặc định ban đầu
  //setValue là thanh toán
  const [value, setValue] = useState()
  const [valueDelivery, setvalueDelivery] = useState()
  const [PriceDelivery, setPriceDelivery] = useState()
  const [valueAddress, setvalueAddress] = useState()
  useEffect(() => {
    if (data?.data?.data && data.data.data.length > 0) {
      setValue(data.data.data[1].payment_method_id) // Lấy giá trị mặc định từ phần tử đầu tiên
    }
    if (getDelivery?.data?.data && getDelivery.data.data.length > 0) {
      console.log(getDelivery?.data?.data)
      setvalueDelivery(getDelivery?.data?.data[0].delivery_method_id)
      setPriceDelivery(+getDelivery?.data?.data[0].delivery_fee)
    }
    if (getAddress?.data?.data && getAddress.data.data.length > 0) {
      console.log(getAddress?.data?.data[0])
      setvalueAddress(getAddress?.data?.data[0].receiver_address_id)
    }
  }, [data, getDelivery, getAddress])
  const selectedDelivery = useMemo(() => {
    return getDelivery?.data?.data.find((element) => element.delivery_method_id == valueDelivery)
  }, [getDelivery?.data?.data, valueDelivery]) // Tính lại khi getDelivery hoặc valueDelivery thay đổi
  const onChange = (e) => {
    console.log(e.target.value)
    setValue(e.target.value) // Cập nhật giá trị khi người dùng chọn
  }

  const selectedAddress = useMemo(() => {
    return getAddress?.data?.data.find((element) => element.receiver_address_id == valueAddress)
  }, [getAddress?.data?.data, valueAddress]) // Tính lại khi getDelivery hoặc valueDelivery thay đổi
  console.log(selectedAddress)
  // modal delivery
  const [isModalDelivery, setModalDelivery] = useState(false)
  console.log(PriceDelivery, product_discount)

  // modal them
  // const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)
  console.log(selectedAddress)
  return (
    <Spin tip='Vui lòng chờ trong giây lát!...' spinning={isLoading1}>
      <div className='px-4 sm:px-8 md:px-24  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 bg-[#e5e5e5] gap-y-3'>
        <Helmet>
          <title>Thanh Toán | Nhà Thuốc PBL6</title>
          <meta
            name='description'
            content='Hoàn tất thanh toán tại Nhà Thuốc PBL6 một cách nhanh chóng và an toàn. Cung cấp các phương thức thanh toán linh hoạt, hỗ trợ khách hàng 24/7.'
          />
        </Helmet>

        <div className='text-lg font-bold mt-2'>Thanh Toán</div>
        <div className='lg:col-span-9 bg-white mt-1  n p-4 rounded-sm'>
          <div className='w-full mt-4'>
            <div className='font-semibold flex items-center gap-x-2 '>
              <svg height={16} viewBox='0 0 12 16' width={12} className='text-blue'>
                <path
                  d='M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z'
                  fillRule='evenodd'
                  className=''
                />
              </svg>
              Địa chỉ nhận hàng{' '}
            </div>
            {getAddress?.data?.data.length > 0 && selectedAddress && (
              <div className='flex mt-4'>
                <div className='w-[40%]'>
                  <div className=''>
                    {selectedAddress.receiver_name} | {selectedAddress.receiver_phone}
                  </div>
                  <span class='rounded-sm  py-[4px] text-xs font-medium text-blue mt-1'>Mặc định</span>
                </div>
                <div className='w-[60%] flex md:flex-col lg:flex-row  justify-between'>
                  <div className=''>
                    {selectedAddress.receiver_address +
                      ',' +
                      selectedAddress.ward_name +
                      ' ' +
                      selectedAddress.district_name +
                      ' ' +
                      selectedAddress.province_name}
                  </div>
                  <div
                    className='text-[#05a] cursor-pointer '
                    onClick={() => {
                      setOpenListAddress(true)
                    }}
                  >
                    Thay đổi
                  </div>
                </div>
              </div>
            )}
            {getAddress?.data?.data.length === 0 && (
              <div className='flex mt-4 items-center gap-5 '>
                <div
                  className='font-bold'
                  onClick={() => {
                    setIsModalOpen1(true)
                  }}
                >
                  Thêm địa chỉ
                </div>
                <div
                  className='text-white  '
                  onClick={() => {
                    setIsModalOpen1(true)
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-6 bg-[#1A51A2] rounded-full'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='lg:col-span-9 bg-white rounded-sm p-5'>
          <div className='text-base font-semibold '>Sản phẩm</div>
          {listProduct?.map((elevent) => {
            return (
              <div className='flex gap-x-3 mt-4'>
                <div className='lg:w-[5%] rounded-sm border border-gray-300'>
                  <img
                    src={elevent?.product_images ? elevent?.product_images[0] : ''}
                    alt='Cao xoa Bạch hổ'
                    className='lg:h-full lg:w-full h-[70px] w-[70px] object-cover'
                  />
                </div>
                <div className='w-[90%] flex flex-col lg:flex-row '>
                  <div className='flex-grow line-clamp-2 '>{elevent.product_name}</div>

                  <div className='w-[20%] lg:w-[10%] lg:items-center flex items-center justify-center mt-2 lg:mt-0'>
                    x {elevent.cart_quantity}
                  </div>
                  <div className='text-lg font-medium text-gray-600 mt-2 lg:mt-0 lg:ml-4 lg:items-center flex '>
                    {formatCurrency(elevent.cart_price)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='left  lg:col-span-6 bg-white p-5 rounded-sm mt-1'>
          <div className='font-semibold'>Phương thức thanh toán</div>
          <div className='grid lg:grid-cols-2 gap-5'>
            {data?.data?.data.map((element) => {
              console.log(element)
              return (
                <div className='bg-[#e5e5e5] rounded-md p-2 font-semibold mt-4 w-[70%]' key={element.payment_method_id}>
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className='flex items-center space-x-5 justify-between '
                  >
                    <Radio value={element.payment_method_id}>{element.payment_method_name}</Radio>
                    <img
                      src={element.payment_method_logo}
                      className='w-8 h-8 object-contain rounded-full'
                      alt='payment'
                    />
                  </Radio.Group>
                </div>
              )
            })}
          </div>
          <div className=' mt-8'>
            <div className='font-semibold'>Phương thức vận chuyển </div>

            {selectedDelivery && (
              <div className='flex mt-4 lg:flex-row flex-col'>
                <div className='w-[70%] flex-col'>
                  <div className='font-medium'>Vận Chuyển {selectedDelivery.delivery_method_name}</div>
                  <div className='text-sm mt-1'>
                    Dự kiến giao hàng: {selectedDelivery.delivery_method_description} ngày không bao gồm thứ 7, chủ nhật
                  </div>
                </div>

                <div className='flex w-[30%] '>
                  <div
                    className='text-[#05a] cursor-pointer flex-grow flex items-center'
                    onClick={() => {
                      setModalDelivery(true)
                    }}
                  >
                    Thay đổi
                  </div>
                  <div className='flex items-center  flex-grow '>
                    {selectedDelivery.delivery_fee == '0.00' ? 'free' : formatCurrency(selectedDelivery.delivery_fee)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='right lg:col-span-3 bg-white  rounded-sm mt-1 '>
          <div className='bg-[#e5e5e5] mt-5 mr-5 mb-5 rounded-sm '>
            <div className=' border-2 py-3 px-2 mt-3'>
              <div className='flex justify-between mt-2  py-3 px-2  rounded-sm '>
                <div className=''>Tổng tiền </div>

                <div className='font-semibold'>{formatCurrency(totalMoney)}</div>
              </div>
              <div className='flex justify-between py-3 px-2  '>
                <div className=''>Giảm giá ưu đãi </div>

                <div className=''>{formatCurrency(product_discount)}</div>
              </div>

              <div className='flex justify-between  py-3 px-2  '>
                <div className=''>Tổng tiền phí vận chuyển</div>

                <div className='font-semibold'>{formatCurrency(PriceDelivery)} </div>
              </div>

              <Divider Solid className='h-[2px] bg-gray-300' />
              <div className='flex justify-between  py-3 px-2  my-1 '>
                <div className='font-semibold '>Tổng tiền </div>

                <div className='text-[#F22121] font-semibold'>
                  {formatCurrency(+totalMoney + +PriceDelivery - (product_discount ? product_discount : 0))}
                </div>
              </div>
              <div className='flex mt-2 '>
                <button
                  className={`text-white font-medium text-2xl px-4 py-2 rounded-lg w-full ${
                    listProduct?.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1A51A2]'
                  }`}
                  disabled={listProduct?.length === 0}
                  onClick={handleBuyNow}
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>

        <ModalListAddress
          OpenListAddress={OpenListAddress}
          setOpenListAddress={setOpenListAddress}
          title='Địa chỉ của tôi'
          getAddress={getAddress}
          valueAddress={valueAddress}
          setValueAddress={setvalueAddress}
        />

        <ModalDelivery
          isModalDelivery={isModalDelivery}
          setModalDelivery={setModalDelivery}
          getDelivery={getDelivery}
          valueDelivery={valueDelivery}
          setvalueDelivery={setvalueDelivery}
          setPriceDelivery={setPriceDelivery}
        />
        <ModalPaymentSucess isModalOpen={isModalOpenBuy} setIsModalOpen={setIsModalOpenBuy} />

        <ModalAddAddress setIsModalOpen1={setIsModalOpen1} isModalOpen1={isModalOpen1} />
      </div>
    </Spin>
  )
}
