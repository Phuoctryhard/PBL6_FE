import React, { useContext } from 'react'
import { Popover } from 'antd'
import { Empty } from 'antd'
import Avatar1 from '../../../../Component/Avatar/Avatar'
import { useNavigate, createSearchParams, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import CartAPI from '../../../../Api/user/cart.js'

import { Badge } from 'antd'
import { Button } from 'antd'
import { AuthContext } from '../../../../context/app.context'
import categoryAPI from '../../../../Api/user/category.js'

import CategoryMain from '../Component/CategoryMain/CategoryMain.jsx'
import Anhloi from './anhloi.png'

import { Divider } from 'antd'
import { useForm } from 'react-hook-form'

import productAPI from '../../../../Api/user/product.js'
import { formatCurrency, generateNameId } from '../../../../until/index.js'
import { useQuery } from '@tanstack/react-query'
export default function Search() {
  // current hiện tại
  const [page, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(15)
  const [search, setSearch] = useState('')
  const { isAuthenticated, logout, isProfile } = useContext(AuthContext)
  const [openCategory, setopenCategory] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // get list category
  // Queries
  const { data: ListCategory } = useQuery({
    queryKey: ['getCategory'],
    queryFn: categoryAPI.getCategery,
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ được coi là "mới" trong 5 phút
    cacheTime: 10 * 60 * 1000 // Dữ liệu được giữ trong cache tối đa 10 phút
  })

  console.log(ListCategory?.data?.data)

  var handleClick = () => {
    setopenCategory(!openCategory)
  }
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['getCart'],
    queryFn: CartAPI.getCart,
    enabled: isAuthenticated, // Chỉ gọi query khi người dùng đã đăng nhập,
    staleTime: 1000 * 60 * 10 // Dữ liệu được coi là tươi trong 10 phút
  })

  var handleNavigate = () => {
    navigate('/cart')
  }
  var handleLogout = () => {
    logout()
    navigate('/login')
  }

  const profile = (
    <div className='w-full  rounded-md '>
      <div className=''>
        <ul className='space-y-3 text-black'>
          <Link
            to='/account/profile'
            className='hover:bg-gray-100 0 p-2 rounded-md transition duration-300 cursor-pointer flex items-center '
          >
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' width={25} height={25}>
              <path
                fillrule='evenodd'
                cliprule='evenodd'
                d='M12 7.09923C10.5053 7.09923 9.29339 8.31114 9.29339 9.80584V11.5001C9.29339 12.9948 10.5053 14.2067 12 14.2067C13.4947 14.2067 14.7066 12.9948 14.7066 11.5001V9.80584C14.7066 8.31114 13.4947 7.09923 12 7.09923ZM7.92976 9.80584C7.92976 7.55803 9.75219 5.7356 12 5.7356C14.2478 5.7356 16.0703 7.55803 16.0703 9.80584V11.5001C16.0703 13.7479 14.2478 15.5703 12 15.5703C9.75219 15.5703 7.92976 13.7479 7.92976 11.5001V9.80584Z'
                fill='currentColor'
              />
              <path
                fillrule='evenodd'
                cliprule='evenodd'
                d='M6.31036 18.8101C7.36688 17.5511 8.95451 16.7478 10.7293 16.7478H13.2707C15.0372 16.7478 16.6369 17.5756 17.6885 18.8127L16.6496 19.6959C15.8375 18.7406 14.6079 18.1114 13.2707 18.1114H10.7293C9.37494 18.1114 8.16373 18.7228 7.35492 19.6866L6.31036 18.8101Z'
                fill='currentColor'
              />
              <path
                fillrule='evenodd'
                cliprule='evenodd'
                d='M12 2.86364C7.23027 2.86364 3.36364 6.73027 3.36364 11.5C3.36364 16.2697 7.23027 20.1364 12 20.1364C16.7697 20.1364 20.6364 16.2697 20.6364 11.5C20.6364 6.73027 16.7697 2.86364 12 2.86364ZM2 11.5C2 5.97715 6.47715 1.5 12 1.5C17.5228 1.5 22 5.97715 22 11.5C22 17.0228 17.5228 21.5 12 21.5C6.47715 21.5 2 17.0228 2 11.5Z'
                fill='currentColor'
              />
            </svg>

            <span className='ml-2 text-base font-medium'>Thông tin cá nhân</span>
          </Link>
          <Link
            to='/account/order-history'
            className='hover:bg-gray-100 p-2 rounded-md transition duration-300 cursor-pointer flex items-center '
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 37 36' width={25} height={25}>
              <path
                fill='currentColor'
                fillrule='evenodd'
                d='M10.46 22.622c.49.284.688.975.443 1.543L8.092 30.7h20.316l-2.812-6.534c-.244-.568-.046-1.26.443-1.543.49-.284 1.084-.054 1.328.514l3.528 8.2c.154.356.137.78-.043 1.118-.18.34-.499.546-.842.546H6.49c-.343 0-.662-.206-.842-.546a1.314 1.314 0 01-.043-1.119l3.528-8.199c.244-.568.839-.798 1.328-.514z'
                cliprule='evenodd'
              />
              <path
                fill='currentColor'
                fillrule='evenodd'
                d='M18.25 5.14c-3.733 0-7.657 2.89-7.657 7.83 0 1.116.454 2.523 1.243 4.084.778 1.538 1.828 3.12 2.896 4.558a57.136 57.136 0 003.518 4.266 57.136 57.136 0 003.518-4.266c1.068-1.438 2.118-3.02 2.896-4.558.79-1.56 1.243-2.968 1.243-4.085 0-4.939-3.924-7.829-7.657-7.829zm0 22.29l-.743.753-.003-.002-.005-.006-.02-.021-.077-.08-.285-.303a59.33 59.33 0 01-4.053-4.865c-1.107-1.49-2.233-3.18-3.087-4.869C9.134 16.372 8.5 14.598 8.5 12.97 8.5 6.645 13.57 3 18.25 3S28 6.644 28 12.97c0 1.628-.634 3.402-1.477 5.067-.854 1.688-1.98 3.378-3.088 4.87a59.33 59.33 0 01-4.337 5.167l-.076.08-.02.021-.006.006-.002.002-.744-.753zm0 0l.744.753a1.038 1.038 0 01-.744.317c-.279 0-.547-.114-.743-.317l.743-.753z'
                cliprule='evenodd'
              />
              <path
                fill='currentColor'
                fillrule='evenodd'
                d='M18.25 11.222a1.528 1.528 0 100 3.056 1.528 1.528 0 000-3.056zM14.5 12.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z'
                cliprule='evenodd'
              />
            </svg>

            <span className='ml-2 text-base font-medium'> Lịch sử đơn hàng</span>
          </Link>

          <Link
            to='/account/address'
            className='hover:bg-gray-100 p-2 rounded-md transition duration-300 cursor-pointer flex items-center'
          >
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' width={25} height={25}>
              <path fillrule='evenodd' cliprule='evenodd' d='M7 11H17V12.5H7V11Z' fill='currentColor' />
              <path fillrule='evenodd' cliprule='evenodd' d='M7 15H17V16.5H7V15Z' fill='currentColor' />
              <path
                fillrule='evenodd'
                cliprule='evenodd'
                d='M3 4H6.03464V5.37182H4.37182V20.6282H19.6282V5.37182H17.9654V4H21V22H3V4Z'
                fill='currentColor'
              />
              <path
                fillrule='evenodd'
                cliprule='evenodd'
                d='M7 2H17V8H13.0086V7.35294C13.0086 6.84364 12.5574 6.43137 12 6.43137C11.4426 6.43137 10.9914 6.84364 10.9914 7.35294V8H7V2ZM8.41631 3.29412V6.70588H9.68007C9.98292 5.79769 10.9068 5.13725 12 5.13725C13.0932 5.13725 14.0171 5.79769 14.3199 6.70588H15.5837V3.29412H8.41631Z'
                fill='currentColor'
              />
            </svg>

            <span className='ml-2 text-base font-medium'> Địa chỉ đơn hàng </span>
          </Link>
          <li
            className='hover:bg-gray-100 p-2 rounded-md transition duration-300 cursor-pointer ml-2 text-base font-medium'
            onClick={handleLogout}
          >
            Đăng xuất
          </li>
        </ul>
      </div>
    </div>
  )

  const ShopingCart = (
    <div className='w-full p-2'>
      <p className='text-xl font-medium'>Sản phẩm mới thêm</p>
      {data?.data?.data ? (
        data?.data?.data
          .filter((element) => element.product_quantity > 0)
          .map((element) => {
            return (
              <div
                className='flex justify-between items-center w-full py-2 mt-3 hover:bg-gray-300'
                key={element.cart_id}
              >
                <div className='flex gap-x-2'>
                  <div className='h-16 w-16 '>
                    <Link to={`/${generateNameId(element.product_name, element.product_id)}`}>
                      <img
                        src={element?.product_images[0] ? element?.product_images[0] : Anhloi}
                        alt=''
                        className='object-cover h-full w-full ml-1'
                      />
                    </Link>
                  </div>
                  <Link to={`/${generateNameId(element.product_name, element.product_id)}`}>
                    <p className='truncate overflow-hidden whitespace-nowrap w-[180px] text-base font-normal'>
                      {element.product_name}
                    </p>
                    <div className='text-red-500 pr-2 md:hidden block'>{formatCurrency(element.cart_price)}</div>
                  </Link>
                </div>
                <div className='text-red-500 pr-2 hidden md:block'>{formatCurrency(element.cart_price)}</div>
              </div>
            )
          })
      ) : (
        <div>
          <Empty />
        </div>
      )}

      <div className='flex justify-between items-center my-2'>
        <span>
          {data?.data?.data?.filter((element) => element.product_quantity > 0).length}
          <span style={{ marginLeft: '8px' }}>Thêm hàng vào giỏ</span>
        </span>
        <button className='bg-[#1A51A2] px-3 py-2 rounded-lg text-white' onClick={handleNavigate}>
          Xem giỏ hàng
        </button>
      </div>
    </div>
  )

  const Profile = (
    <>
      {!isAuthenticated ? (
        <div className='w-full'>
          <div>
            <p className='text-lg font-semibold'>Thông báo mới</p>
            <div className='flex flex-col justify-center items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                opacity='0.6'
                className='size-10'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5'
                />
              </svg>

              <p className='text-lg pt-2 font-semibold'>Bạn chưa đăng nhập</p>
              <p className='my-1'>Hãy đăng nhập để xem thông báo của mình</p>
              <button
                className='opacity-90 bg-blue-500 px-3 py-2 text-white rounded-lg mt-4 hover:opacity-100'
                onClick={() => navigate('/login')} // Thêm hàm sự kiện vào đây
                aria-label='Login Button'
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <div className=''>Thông báo mới </div>
            <div className=''>Đọc tất cả</div>
          </div>
          <div className='flex flex-col items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5'
              />
            </svg>

            <div className=''>Chưa có thông báo mới</div>
          </div>
        </div>
      )}
    </>
  )

  // Hàm để mở dropdown khi focus vào input

  const handleDrop1 = () => {
    console.log(search)
    setIsDropdownOpen(true)
  }

  // Hàm để đóng dropdown khi blur (rời khỏi input)
  const handleBlur = (e) => {
    setTimeout(() => {
      setIsDropdownOpen(false)
    }, 500) // Đợi một chút trước khi đóng dropdown để tránh bị đóng quá sớm
  }
  // onchage
  const handleSearch = (e) => {
    console.log(e.target.value)
    if (e.target.value) {
      setSearch(e.target.value)
    } else {
      setSearch('')
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: '' // Đảm bảo giá trị mặc định là rỗng
    }
  })

  const handleOnSubmit = handleSubmit(
    (data) => {
      // Chuyển đổi data thành query string
      console.log(data)
      const searchParams = new URLSearchParams({ search }).toString()
      console.log(searchParams)
      navigate({
        pathname: '/category',
        search: `?${searchParams}`
      })
    },
    (error) => {
      console.log(error)
    }
  )

  // laays dataa vee header
  const { data: productsDataDropdown } = useQuery({
    // queryKey: ['product', queryParams],
    // queryconfig như category hay order hay sort_by thay đổi thì nó useQuery lại
    queryKey: ['products', search],
    // khi queryParams thay đổi thì useQuery tính năn như useEffect
    queryFn: () => {
      // fix loi du lieu : as ProductListConfig
      return productAPI.getAllProduct({ search: search, page: page, paginate: pageSize })
    }
    // staleTime: 60000 // 1 phút, dữ liệu sẽ không được tính là stale trong vòng 1 phút
  })
  const handleClickCategory = (categoryName) => {
    // Điều hướng về trang gốc rồi thêm categoryName
    //navigate(`/category/${categoryName}`)
    navigate({
      pathname: `/category`,
      search: `?${createSearchParams({
        category_name: `${categoryName}`
      })}`
    })
  }

  return (
    <>
      <div className='z-20 mx-auto w-full  md:pb-3 md:pt-8 bg-[rgb(46,105,193,1)]'>
        <div className='flex items-center md:mb-4 px-6 py-2 md:px-24 md:py-0'>
          <div className='flex w-full flex-col-reverse items-start md:flex-row gap-2'>
            <div
              className=' md:flex-col shrink-0 w-[20%] items-center cursor-pointer md:block hidden'
              onClick={() => navigate('/')}
            >
              <img
                src='/assets/images/test.png'
                alt='Logo'
                className='h-16 w-2/3 object-cover mx-auto md:-translate-x-8  '
              />
            </div>
            <div className=' grid  grid-cols-1  md:w-[70%] w-[100%] relative'>
              <div className='w-full'>
                <form className='col-span-9 mb-1 ' onSubmit={handleOnSubmit}>
                  <div className='mx-auto w-full'>
                    <div className=' text-white flex bg-white rounded-md items-center justify-center'>
                      <button type='submit' className='ml-2'>
                        <span className='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-10 text-black'>
                          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                              fillrule='evenodd'
                              cliprule='evenodd'
                              d='M15.5 15.4366C15.7936 15.143 16.2697 15.143 16.5634 15.4366L21.7798 20.7163C22.0734 21.01 22.0734 21.4861 21.7798 21.7797C21.4861 22.0734 21.01 22.0734 20.7164 21.7797L15.5 16.5C15.2064 16.2064 15.2064 15.7303 15.5 15.4366Z'
                              fill='currentColor'
                            />
                            <path
                              fillrule='evenodd'
                              cliprule='evenodd'
                              d='M10.5 3.57732C6.67671 3.57732 3.57732 6.67671 3.57732 10.5C3.57732 14.3233 6.67671 17.4227 10.5 17.4227C14.3233 17.4227 17.4227 14.3233 17.4227 10.5C17.4227 6.67671 14.3233 3.57732 10.5 3.57732ZM2 10.5C2 5.80558 5.80558 2 10.5 2C15.1944 2 19 5.80558 19 10.5C19 15.1944 15.1944 19 10.5 19C5.80558 19 2 15.1944 2 10.5Z'
                              fill='currentColor'
                            />
                          </svg>
                        </span>
                      </button>

                      <input
                        className='w-full border-neutral-500 focus:ring-neutral-500 focus:border-neutral-700 outline-none p-1 flex h-11 items-center justify-start rounded-md border-0 pl-3 md:pl-10 text-start text-base font-medium text-neutral-800 truncate placeholder:text-sm md:placeholder:text-lg'
                        placeholder='Tên thuốc, triệu chứng, vitamin và thực phẩm chức năng'
                        autoComplete='off'
                        {...register('search')} // Đăng ký với React Hook Form
                        onFocus={(e) => {
                          handleDrop1(e) // Gọi hàm onFocus của bạn
                        }}
                        onBlur={(e) => {
                          handleBlur(e) // Gọi hàm onBlur của bạn
                        }}
                        onChange={(e) => {
                          handleSearch(e) // Gọi hàm onChange của bạn
                          // Đảm bảo React Hook Form nhận được sự thay đổi
                          // Bạn có thể làm thêm các thao tác nếu cần
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
              {isDropdownOpen && (
                <div className='absolute w-full mt-1 bg-white shadow-lg rounded-md border border-neutral-300 top-[100%] z-50 max-h-96 overflow-y-auto'>
                  {!search && (
                    <>
                      <div className='p-5'>
                        <div className='font-semibold mb-2'>Tìm kiếm phổ biến</div>
                        <div className='flex flex-wrap gap-2 m-2'>
                          {['Thuốc kê đơn', 'Thuốc không kê đơn'].map((tag, index) => (
                            <button
                              key={index}
                              className='px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 text-sm'
                              onClick={() =>
                                navigate({
                                  pathname: '/category',
                                  search: `?${createSearchParams({
                                    category_parent_name: tag
                                  })}`
                                })
                              }
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className='p-5 cursor-pointer '>
                    {search && <div className='font-semibold'>Danh mục</div>}
                    {search &&
                      Array.from(
                        new Map(
                          productsDataDropdown?.data?.data?.data.map((item) => [item.category_name, item]) // Map category_name thành unique key
                        ).values()
                      )
                        .slice(0, 15) // Giới hạn hiển thị 3 loại
                        .map((element) => {
                          return (
                            <div key={element.id} className=''>
                              <div
                                className='flex items-center mt-2 gap-x-1'
                                onClick={() => handleClickCategory(element.category_name)}
                              >
                                <div className='w-[10%] shrink-0 '>
                                  <img
                                    className='rounded-lg border shadow-sm w-14 h-14'
                                    src={element?.product_images ? element?.product_images[0] : ''}
                                    alt={element.category_name || ''}
                                  />
                                </div>
                                <div className='w-[80%]'>{element.category_name}</div>
                              </div>
                            </div>
                          )
                        })}

                    <Divider></Divider>
                    {search &&
                      productsDataDropdown?.data?.data?.data.map((element) => {
                        return (
                          <Link
                            to={`/${generateNameId(element.product_name, element.product_id)}`}
                            className='cursor-pointer '
                          >
                            <div className='flex items-center mt-2 gap-x-1'>
                              <div className='w-[10%] shrink-0 '>
                                <img
                                  className='rounded-lg border shadow-sm w-14 h-14'
                                  src={element?.product_images ? element?.product_images[0] : ''}
                                  alt=''
                                />
                              </div>
                              <div className='w-[80%] line-clamp-2 font-medium'>{element.product_name}</div>
                            </div>
                          </Link>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>
            <div className='flex relative items-center justify-between md:justify-start w-full md:w-auto'>
              <div className='flex justify-center items-center gap-2 md:hidden '>
                <span>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 text-white'
                  >
                    <path
                      d='M21.2188 11.2222H2.78125C2.34977 11.2222 2 11.5704 2 11.9999C2 12.4295 2.34977 12.7777 2.78125 12.7777H21.2188C21.6502 12.7777 22 12.4295 22 11.9999C22 11.5704 21.6502 11.2222 21.2188 11.2222Z'
                      fill='currentColor'
                    ></path>
                    <path
                      d='M21.2188 5H2.78125C2.34977 5 2 5.34821 2 5.77777C2 6.20733 2.34977 6.55554 2.78125 6.55554H21.2188C21.6502 6.55554 22 6.20733 22 5.77777C22 5.34821 21.6502 5 21.2188 5Z'
                      fill='currentColor'
                    ></path>
                    <path
                      d='M21.2188 17.4446H2.78125C2.34977 17.4446 2 17.7928 2 18.2223C2 18.6519 2.34977 19.0001 2.78125 19.0001H21.2188C21.6502 19.0001 22 18.6519 22 18.2223C22 17.7928 21.6502 17.4446 21.2188 17.4446Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </span>
              </div>
              <div className=' items-center cursor-pointer block md:hidden' onClick={() => navigate('/')}>
                <img src='/assets/images/test.png' alt='Logo' className='h-10 w-auto object-contain mx-auto' />
              </div>
              <Popover content={Profile} placement='bottomRight' overlayStyle={{ width: '300px' }}>
                <button className='px-3 text-white h-10 hidden md:block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-7 text-white text-blue h-full'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5'
                    />
                  </svg>
                </button>
              </Popover>
              <div className='flex justify-center items-center'>
                <Popover
                  content={ShopingCart}
                  placement='bottomRight'
                  className=''
                  overlayClassName=' w-[300px] md:w-[450px] ' // responsive, full width on small screens, 50% width on larger screens
                >
                  <Badge
                    count={
                      data?.data?.data?.filter((element) => {
                        return element.product_quantity > 0
                      }).length
                    }
                    offset={[-15, 7]}
                  >
                    <div className='h-10 px-3'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokewidth='1.5'
                        stroke='currentColor'
                        className='size-7 h-10 text-white '
                      >
                        <path
                          strokelinecap='round'
                          strokelinejoin='round'
                          d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                        />
                      </svg>
                    </div>
                  </Badge>
                </Popover>
              </div>
              <div className='border-color-white absolute bottom-[6px] right-0 top-[6px] hidden border-l-[1px] md:inline-block'></div>
            </div>
            {isAuthenticated ? (
              <Popover content={profile} placement='bottom' overlayStyle={{ width: '230px' }}>
                <div className='flex '>
                  <div className='flex items-center cursor-pointer text-gray-300'>
                    <Avatar1 user_avatar={isProfile?.user_avatar} />
                    <div className='w-full h-10 flex items-center  ml-1'>{isProfile?.user_fullname}</div>
                  </div>
                </div>
              </Popover>
            ) : (
              <Button type='' className='font-semibold h-10 hidden md:block'>
                <span className='text-base' onClick={() => navigate('/login')}>
                  Đăng nhập
                </span>
                <span className='text-base'>/</span> {/* This is visible only on mobile */}
                <span className='text-base ' onClick={() => navigate('/Register')}>
                  Đăng kí
                </span>
              </Button>
            )}
          </div>
        </div>

        <div className='px-24 flex gap-2'>
          <div className='flex w-[20%] '>
            <button
              onClick={handleClick}
              className='md:flex font-semibold bg-white test-sm py-2 px-2 rounded-sm justify-between w-[200px] hover:text-blue  hidden'
            >
              <div className='flex justify-center items-center gap-2'>
                <span>
                  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='bg-white w-5 h-5'>
                    <path
                      d='M21.2188 11.2222H2.78125C2.34977 11.2222 2 11.5704 2 11.9999C2 12.4295 2.34977 12.7777 2.78125 12.7777H21.2188C21.6502 12.7777 22 12.4295 22 11.9999C22 11.5704 21.6502 11.2222 21.2188 11.2222Z'
                      fill='currentColor'
                    ></path>
                    <path
                      d='M21.2188 5H2.78125C2.34977 5 2 5.34821 2 5.77777C2 6.20733 2.34977 6.55554 2.78125 6.55554H21.2188C21.6502 6.55554 22 6.20733 22 5.77777C22 5.34821 21.6502 5 21.2188 5Z'
                      fill='currentColor'
                    ></path>
                    <path
                      d='M21.2188 17.4446H2.78125C2.34977 17.4446 2 17.7928 2 18.2223C2 18.6519 2.34977 19.0001 2.78125 19.0001H21.2188C21.6502 19.0001 22 18.6519 22 18.2223C22 17.7928 21.6502 17.4446 21.2188 17.4446Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </span>
                <span>Danh mục</span>
              </div>
              <span
                className={`inline-flex justify-center max-h-full max-w-full h-full w-[calc(14rem/16)] transition duration-200 ${!openCategory ? '' : 'rotate-180'}`}
              >
                <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12.7138 16.7077L21.7048 7.71374C22.0984 7.31909 22.0984 6.6797 21.7048 6.28406C21.3111 5.88941 20.6717 5.88941 20.2781 6.28406L12.0005 14.5646L3.72293 6.28505C3.32928 5.89041 2.68989 5.89041 2.29524 6.28505C1.90159 6.6797 1.90159 7.32009 2.29524 7.71474L11.2861 16.7087C11.6757 17.0973 12.3251 17.0973 12.7138 16.7077Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div className=' md:w-[80%] items-center gap-4 text-white font-medium cursor-pointer md:flex hidden'>
            <p onClick={() => navigate('/benh')}>Tra cứu bệnh </p>
            <p
              onClick={() =>
                navigate({
                  pathname: '/category',
                  search: `?${createSearchParams({
                    category_parent_name: 'Thuốc không kê đơn'
                  })}`
                })
              }
            >
              Thuốc không kê đơn
            </p>
            <p
              onClick={() =>
                navigate({
                  pathname: '/category',
                  search: `?${createSearchParams({
                    category_parent_name: 'Thuốc kê đơn'
                  })}`
                })
              }
            >
              Thuốc kê đơn
            </p>
          </div>
        </div>
      </div>
      {openCategory && (
        <div className='px-6 md:px-12 lg:px-24'>
          <div
            className='grid grid-cols-1 gap-x-4 z-20 absolute bg-white shadow-2xl rounded-lg overflow-hidden'
            onMouseLeave={() => setopenCategory(false)}
          >
            <div className='col-span-1 bg-yellow-500 rounded-lg p-4'>
              <CategoryMain setopenCategory={setopenCategory} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
