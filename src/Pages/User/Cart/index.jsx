import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Modal } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartAPI from '../../../Api/user/cart'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Empty } from 'antd'
import { AuthContext } from '../../../context/app.context'
import { formatCurrency } from '../../../until'
export default function Cart() {
  const { isAuthenticated, logout, checkedProducts, setCheckedProducts } = useContext(AuthContext)

  // get list cart
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['getCart'],
    queryFn: CartAPI.getCart,
    enabled: isAuthenticated // Chỉ gọi query khi người dùng đã đăng nhập
  })

  const [products, setProducts] = useState([]) // Khởi tạo state cho sản phẩm

  // Lưu trạng thái của các sản phẩm được chọn
  // const [checkedProducts, setCheckedProducts] = useState([])
  useEffect(() => {
    // Kiểm tra xem data có giá trị hợp lệ không
    if (data && data.data && Array.isArray(data.data.data)) {
      setProducts(data.data.data)
    } else {
      setProducts([])
    }
  }, [data])
  console.log(data)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [modalText, setModalText] = useState('Bạn có chắc chắn muốn xóa sản phẩm này?')
  const [total, setTotal] = useState(0)
  const showModal = (id) => {
    setidDelete(id)
    setOpen(true)
  }

  const [idDelete, setidDelete] = useState('')
  const handleDelete = (id) => {
    mutate.mutate(id, {
      onSuccess: () => {
        toast.success('Xóa sản phẩm thành công !')
        queryClient.invalidateQueries({ queryKey: ['getCart'] })
      },
      onError() {
        toast.error('Fail !')
      }
    })
  }
  // ham cap nhat so luong
  const handleUpdateQuantity = (element, quantity) => {
    let elementProduct = {
      ...element,
      cart_quantity: quantity
    }
    return elementProduct
  }

  // handle - +
  const mutateUpdate = useMutation({
    mutationFn: CartAPI.updateCart
  })

  const handleSubstract = (element) => {
    console.log(element.cart_quantity)
    if (element.cart_quantity > 1) {
      // update dc
      console.log(element.cart_quantity)
      const quantity = element.cart_quantity - 1
      console.log(quantity)
      let elementProduct = handleUpdateQuantity(element, quantity)
      mutateUpdate.mutate(elementProduct, {
        onSuccess: () => {
          //toast.success('Update sản phẩm thành công !')
          queryClient.invalidateQueries({ queryKey: ['getCart'] })
          const calculateTotal = () => {
            return products
              .filter((product) => checkedProducts.includes(product.cart_id))
              .reduce((total, product) => total + parseFloat(product.cart_price * product.cart_quantity), 0) // Ép kiểu về số
          }
          // Chỉ tính lại khi  checkedProducts thay đổi
          setTotal(calculateTotal())
        },
        onError() {
          toast.error('Fail !')
        }
      })
    } else {
      showModal(element.cart_id)
    }
  }
  const handlePlus = (element) => {
    const quantity = element.cart_quantity + 1
    console.log(quantity)
    let elementProduct = handleUpdateQuantity(element, quantity)
    console.log(elementProduct)
    mutateUpdate.mutate(elementProduct, {
      onSuccess: () => {
        //toast.success('Update sản phẩm thành công !')
        queryClient.invalidateQueries({ queryKey: ['getCart'] })
        // Tính tổng tiền của các sản phẩm đã được check
        const calculateTotal = () => {
          return products
            .filter((product) => checkedProducts.includes(product.cart_id))
            .reduce((total, product) => total + parseFloat(product.cart_price * product.cart_quantity), 0) // Ép kiểu về số
        } // Chỉ tính lại khi  checkedProducts thay đổi
        setTotal(calculateTotal())
      },
      onError(error) {
        console.log(error)
        toast.error(error.response.data.messages[0])
      }
    })
  }
  const handleInputChange = (element, event) => {
    const cart_quantity = parseInt(event.target.value)
    console.log(element.product_quantity)
    console.log(element)
    if (+cart_quantity > +element.product_quantity) {
      console.log(cart_quantity, element.product_quantity)
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.cart_id === element.cart_id ? { ...product, cart_quantity: element.product_quantity } : product
        )
      )
    } else {
      //Kiểm tra giá trị nhập vào
      if (isNaN(cart_quantity) || cart_quantity < 1) {
        // Nếu không hợp lệ, có thể xóa sản phẩm hoặc cập nhật lại số lượng
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.cart_id === element.cart_id ? { ...product, cart_quantity: '' } : product
          )
        )
      } else {
        // Nếu hợp lệ, cập nhật số lượng cho sản phẩm
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.cart_id === element.cart_id ? { ...product, cart_quantity } : product))
        )
      }
    }
  }
  const handleInputBlur = (element, event) => {
    if (isNaN(parseInt(event.target.value))) {
      //
      showModal(element.cart_id)
    } else {
      const cart_quantity = parseInt(event.target.value)
      console.log('Gọi api ' + cart_quantity)
      // Kiểm tra giá trị nhập vào
      let elementProduct = handleUpdateQuantity(element, cart_quantity)
      mutateUpdate.mutate(elementProduct, {
        onSuccess: () => {
          toast.success('Update sản phẩm thành công !')
          queryClient.invalidateQueries({ queryKey: ['getCart'] })
          // Tính tổng tiền của các sản phẩm đã được check
          const calculateTotal = () => {
            return products
              .filter((product) => checkedProducts.includes(product.cart_id))
              .reduce((total, product) => total + parseFloat(product.cart_price * product.cart_quantity), 0) // Ép kiểu về số
          } // Chỉ tính lại khi  checkedProducts thay đổi
          setTotal(calculateTotal())
        },
        onError() {
          console.log('Thấtbai ')
          toast.error('Fail !')
        }
      })
    }
  }
  //// xóa
  const handleOk = (id) => {
    console.log(id)
    if (id) {
      handleDelete(id)
      setOpen(false)
    }
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const mutate = useMutation({
    mutationFn: CartAPI.deleteCart
  })

  // Xử lý khi một checkbox được check hoặc uncheck
  const handleCheck = (productId) => {
    setCheckedProducts((prevChecked) => {
      if (prevChecked.includes(productId)) {
        // Nếu sản phẩm đã được check thì bỏ check
        return prevChecked.filter((id) => id !== productId)
      } else {
        // Nếu chưa được check thì thêm vào danh sách đã check
        return [...prevChecked, productId]
      }
    })
  }

  //// Tính tổng tiền của các sản phẩm đã được check
  const calculateTotal = useCallback(() => {
    const totalAmount = products
      .filter((product) => checkedProducts.includes(product.cart_id))
      .reduce((total, product) => total + parseFloat(product.cart_price * product.cart_quantity), 0)

    setTotal(totalAmount) // Cập nhật tổng tiền
  }, [checkedProducts])

  // Gọi lại tính tổng mỗi khi checkedProducts thay đổi
  useEffect(() => {
    calculateTotal()
  }, [calculateTotal])

  const calculateTotal1 = useCallback(() => {
    const totalAmount = products
      .filter((product) => checkedProducts.includes(product.cart_id))
      .reduce((total, product) => total + parseFloat(product.cart_price * product.cart_quantity), 0)

    setTotal(totalAmount) // Cập nhật tổng tiền
  }, [products])

  // Gọi lạicheckedProducts tính tổng mỗi khi checkedProducts thay đổi
  useEffect(() => {
    calculateTotal1()
  }, [calculateTotal1])
  // Tính tổng tiền của các sản phẩm đã được check

  const handleCheckAll = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      const arrayCheckAll = products.map((element) => {
        return element.cart_id
      })
      console.log(arrayCheckAll)
      setCheckedProducts(arrayCheckAll)
    } else {
      setCheckedProducts([])
    }
  }
  // xoa nhieu
  const mutateDeleteMany = useMutation({
    mutationFn: CartAPI.deleteManyCart
  })
  // xoa nhieu
  const handleDeleteMany = () => {
    console.log(checkedProducts)
    const ids_cart1 = {
      ids_cart: checkedProducts
    }
    console.log(ids_cart1)
    if (checkedProducts.length > 0) {
      mutateDeleteMany.mutate(ids_cart1, {
        onSuccess: () => {
          toast.success('Xóa sản phẩm thành công !')
          queryClient.invalidateQueries({ queryKey: ['getCart'] })
          setCheckedProducts([])
        }
      })
    } else {
      toast.error('Vui lòng chọn sản phẩm cần xóa')
    }
  }

  // mua hàng
  const BuyNow = async () => {
    console.log(checkedProducts)
    navigate('/checkout')
  }

  const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false)
  const showModalDeleteMany = () => {
    setIsModalOpenDeleteMany(true)
  }
  const handleOk1 = () => {
    handleDeleteMany()
    setIsModalOpenDeleteMany(false)
  }

  const handleCancel1 = () => {
    setIsModalOpenDeleteMany(false)
  }
  return (
    <div className='px-24'>
      <div className='grid grid-cols-9 pt-5 gap-x-5 '>
        <div className='col-span-6'>
          <div className='flex justify-between '>
            <div className='text-2xl font-semibold'>
              Giỏ hàng{' '}
              {
                data?.data?.data?.filter((element) => {
                  return element.product_quantity > 0
                }).length
              }
            </div>

            <button className='text-[#0070e0] hover:text-black' onClick={showModalDeleteMany}>
              Xóa
            </button>
          </div>
          <div className=''>
            <div class='w-full max-w-4xl mx-auto my-4 border rounded-lg shadow'>
              <div class='flex items-center border-b p-4 bg-gray-100'>
                <input
                  type='checkbox'
                  class='mr-4'
                  checked={products.length == checkedProducts.length}
                  onChange={(event) => handleCheckAll(event)}
                />
                <div class='w-1/2 font-semibold '>Sản phẩm</div>
                <div class='w-1/6 font-semibold  text-center'>Đơn giá</div>
                <div class='w-1/6 font-semibold text-center'>Số lượng</div>
                <div class='w-1/6 font-semibold text-center'>Thành tiền</div>
              </div>
              {/*Product List cart 
                
                
                */}

              {products.length > 0 ? (
                products
                  .filter((element) => element.product_quantity > 0)
                  .map((element) => {
                    return (
                      <div class='flex items-center p-4'>
                        <input
                          type='checkbox'
                          class='mr-4'
                          checked={checkedProducts.includes(element.cart_id)}
                          onChange={() => handleCheck(element.cart_id)}
                        />
                        <div class='w-1/2 flex items-center justify-between'>
                          <img src={element?.product_images[0]} alt='product image' class='w-16 h-16   ' />
                          <div>
                            <p class='font-semibold'>{element.product_name}</p>
                            <p class='text-gray-500 text-sm'>Chai</p>
                            <p class='text-yellow-600 bg-yellow-100 rounded px-2 inline-block mt-1 text-sm'>
                              Mua 1 Tặng 1 - (01-31/10)
                            </p>
                            <p class='text-yellow-600 bg-yellow-100 rounded px-2 inline-block mt-1 text-sm'>
                              Giao Nhanh 2H bởi Ahamove
                            </p>
                          </div>
                        </div>
                        <div class='w-1/6 text-center pl-6'>{formatCurrency(element.cart_price)}</div>
                        <div class='w-1/6 flex text-center justify-end pr-3'>
                          <button
                            class='px-2 py-1 text-lg text-gray-500 border rounded-l'
                            onClick={() => {
                              handleSubstract(element)
                            }}
                          >
                            -
                          </button>

                          <input
                            className='p-2 w-10 outline-none'
                            value={element.cart_quantity}
                            onChange={(event) => handleInputChange(element, event)}
                            onBlur={(event) => handleInputBlur(element, event)}
                          />
                          <button
                            class='px-2 py-1 text-lg text-gray-500 border rounded-r'
                            onClick={() => {
                              handlePlus(element)
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div class='w-1/6 text-right pr-4'>
                          {formatCurrency(element.cart_price * element.cart_quantity)}
                        </div>
                        <span
                          class=' inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-6'
                          onClick={() => showModal(element.cart_id)}
                        >
                          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M18.4 5.03128H15.7333V4.49795C15.7333 3.61571 15.0156 2.89795 14.1333 2.89795H9.86668C8.98444 2.89795 8.26668 3.61571 8.26668 4.49795V5.03128H5.60001C4.71777 5.03128 4.00002 5.74904 4.00002 6.63128C4.00002 7.33983 4.46313 7.94189 5.10241 8.15167L6.0537 19.6352C6.12222 20.4579 6.82259 21.1024 7.64815 21.1024H16.3519C17.1775 21.1024 17.8778 20.4579 17.9464 19.635L18.8976 8.15163C19.5369 7.94189 20 7.33983 20 6.63128C20 5.74904 19.2822 5.03128 18.4 5.03128ZM9.33334 4.49795C9.33334 4.20387 9.5726 3.96461 9.86668 3.96461H14.1333C14.4274 3.96461 14.6667 4.20387 14.6667 4.49795V5.03128H9.33334V4.49795ZM16.8833 19.5467C16.8605 19.8209 16.6271 20.0357 16.3519 20.0357H7.64815C7.37299 20.0357 7.13953 19.8209 7.11674 19.5469L6.17936 8.23128H17.8207L16.8833 19.5467ZM18.4 7.16461H5.60001C5.30593 7.16461 5.06668 6.92536 5.06668 6.63128C5.06668 6.3372 5.30593 6.09795 5.60001 6.09795H18.4C18.6941 6.09795 18.9333 6.3372 18.9333 6.63128C18.9333 6.92536 18.6941 7.16461 18.4 7.16461Z'
                              fill='currentColor'
                            ></path>
                            <path
                              d='M9.86575 18.4026L9.33242 9.79821C9.31418 9.5042 9.0597 9.28059 8.76712 9.2989C8.47311 9.31714 8.24957 9.57022 8.26778 9.8642L8.80111 18.4687C8.81864 18.7514 9.05345 18.969 9.33291 18.969C9.64178 18.969 9.8847 18.7089 9.86575 18.4026Z'
                              fill='currentColor'
                            ></path>
                            <path
                              d='M12 9.29785C11.7055 9.29785 11.4667 9.53664 11.4667 9.83118V18.4356C11.4667 18.7302 11.7055 18.969 12 18.969C12.2946 18.969 12.5334 18.7302 12.5334 18.4356V9.83118C12.5334 9.53664 12.2946 9.29785 12 9.29785Z'
                              fill='currentColor'
                            ></path>
                            <path
                              d='M15.233 9.29889C14.9396 9.28065 14.6859 9.50419 14.6677 9.7982L14.1343 18.4026C14.1162 18.6966 14.3397 18.9497 14.6337 18.9679C14.9278 18.9861 15.1808 18.7625 15.199 18.4686L15.7323 9.86419C15.7505 9.57018 15.527 9.3171 15.233 9.29889Z'
                              fill='currentColor'
                            ></path>
                          </svg>
                        </span>
                      </div>
                    )
                  })
              ) : (
                <div className='mt-5'>
                  <Empty description='Không có dữ liệu' imageStyle={{ height: '100px', margin: '0px 50px ' }} />;
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-3  '>
          <div className='flex  flex-col justify-between   '>
            <div className=' border-2 py-3 px-2 mt-3'>
              <div className='flex justify-between mt-2  py-3 px-2  '>
                <div className=''>Tạm tính </div>

                <div className='font-semibold'>{formatCurrency(total)}</div>
              </div>
              <div className='flex justify-between py-3 px-2  '>
                <div className=''>Giảm giá ưu đãi </div>

                <div className=''>-</div>
              </div>

              <div className='flex justify-between  py-3 px-2  '>
                <div className=''>Giảm giá sản phẩm </div>

                <div className='font-semibold'>0 đ</div>
              </div>
              <div className='border border-1'></div>

              <div className='flex justify-between  py-3 px-2  my-1 '>
                <div className='font-semibold '>Tổng tiền </div>

                <div className='text-[#F22121] font-semibold'>{formatCurrency(total)}</div>
              </div>
              <div className='flex mt-2 '>
                <button
                  onClick={BuyNow}
                  className={`text-white font-medium text-2xl px-4 py-2 rounded-lg w-full ${
                    checkedProducts.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1A51A2]'
                  }`}
                  disabled={checkedProducts.length === 0}
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Xóa sản phẩm</span>}
        open={open}
        onOk={() => handleOk(idDelete)}
        onCancel={handleCancel}
      >
        <p className='mt-2 text-lg'> {modalText}</p>
      </Modal>

      <Modal title='Xóa nhiều sản phẩm' open={isModalOpenDeleteMany} onOk={handleOk1} onCancel={handleCancel1}>
        <p>Bạn chắc chắn xóa sản phẩm ?</p>
      </Modal>
    </div>
  )
}
// onClick={handleDeleteMany}
