import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import anh1 from './anh1.jpg'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createSearchParams, useParams } from 'react-router-dom'
import { useSearchParams, useNavigate } from 'react-router-dom'
import useQueryParams from '../../../hook/useSearchParam'
import productAPI from '../../../Api/user/product'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import categoryAPI from '../../../Api/user/category'
import { IdcardOutlined } from '@ant-design/icons'
import brandAPI from '../../../Api/user/brand'
import { Previous } from 'iconsax-react'
import { useLocation } from 'react-router-dom'
import { schemaPrice } from '../../../Component/ValidateScheme/Validate'
import Loading from '../../../Component/Loading/Loading'
import { generateNameId } from '../../../until/index.js'
import anhloi from './anhloi.png'
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
  Spin,
  Empty,
  Breadcrumb
} from 'antd'
export default function CategoryListProduct() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const brands = queryParams.getAll('brands[]') // sử dụng getAll để lấy tất cả giá trị
  //console.log(brands) // kiểm tra xem cả hai thương hiệu có được lấy ra không
  const [visibleBrands, setVisibleBrands] = useState(5) // Bắt đầu với 5 thương hiệu được hiển thị
  // State để lưu danh sách thương hiệu sau khi lọc
  const [filteredBrands, setFilteredBrands] = useState([])
  // state để lưu brands[]
  const [NameBrands, setNameBrands] = useState(brands || [])
  // current hiện tại
  const [paginate, setCurrent] = useState(1)

  useEffect(() => {
    if (paginate) {
      setCurrent(queryParams.get('paginate'))
    }
  }, [paginate])
  // const {
  //   formState: { errors }
  // } = useForm({
  //   resolver: yupResolver(schemaPrice)
  // })
  const [form] = Form.useForm()
  // const onSubmit = (data) => {
  //   const searchParams = createSearchParams({
  //     ...useQueryParameter,
  //     price_max: data.price_max,
  //     price_min: data.price_min
  //   }).toString()
  //   //console.log(searchParams) // Kiểm tra chuỗi query được tạo
  //   navigate({
  //     pathname: `/category`,
  //     search: `?${searchParams}`
  //   })
  // }

  const navigate = useNavigate()
  const { categorySlug } = useParams()
  const useQueryParameter = useQueryParams()
  // useQueryParameter.category_name = categorySlug
  useQueryParameter.paginate = 1
  // console.log(useQueryParameter)
  const { data: productsData, isLoading } = useQuery({
    // queryKey: ['product', queryParams],
    // queryconfig như category hay order hay sort_by thay đổi thì nó useQuery lại
    queryKey: ['products', useQueryParameter],
    // khi queryParams thay đổi thì useQuery tính năn như useEffect
    queryFn: () => {
      // fix loi du lieu : as ProductListConfig
      return productAPI.getAllProduct(useQueryParameter)
    }
  })

  // category
  if (useQueryParameter.category_name == 'Thuốc kê đơn') {
    var idcategory
    idcategory = 4
    // ko kê đơn
  } else if (useQueryParameter.category_name == 'Thuốc không kê đơn') {
    idcategory = 3
  }
  const { data: getCategorybyid } = useQuery({
    // queryKey: ['product', queryParams],
    // queryconfig như category hay order hay sort_by thay đổi thì nó useQuery lại
    queryKey: ['products', idcategory],
    // khi queryParams thay đổi thì useQuery tính năn như useEffect
    queryFn: () => {
      // fix loi du lieu : as ProductListConfig
      return categoryAPI.getCategorybyId(idcategory)
    },
    staleTime: 1000 * 60 * 5, // Dữ liệu được coi là mới trong 5 phút

    enabled: !!idcategory // chỉ cho phép query khi 'idcategory' có giá trị
  })

  const handlePriceDes = () => {
    const searchParams = createSearchParams({
      ...useQueryParameter,
      typesort: 'product_price',
      sortlatest: true
    }).toString()

    navigate({
      pathname: `/category`,
      search: `?${searchParams}`
    })
  }
  const handlePriceAsc = () => {
    const searchParams = createSearchParams({
      ...useQueryParameter,
      typesort: 'product_price',
      sortlatest: false
    }).toString()

    console.log(searchParams) // Kiểm tra chuỗi query được tạo
    navigate({
      pathname: `/category`,
      search: `?${searchParams}`
    })
  }
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
  const handleRadioChange = (e) => {
    //destructuring (phá vỡ cấu trúc)
    const [price_min, price_max] = e.target.value.split('-')
    const searchParams = createSearchParams({
      ...useQueryParameter,
      price_min: price_min,
      price_max: price_max
    }).toString()
    navigate({
      pathname: `/category`,
      search: `?${searchParams}`
    })
  }

  const isChecked = (min, max) => {
    // So sánh đúng thứ tự max với price_max và min với price_min
    return useQueryParameter?.price_max === max && useQueryParameter?.price_min === min
  }

  // api brand[]
  const { data: nameBrand } = useQuery({
    queryKey: ['getNameBrand'],
    queryFn: brandAPI.getNameBrand
  })

  const handleChangeBrand = (e) => {
    const selectedBrand = e.target.value
    const fillterBrand = nameBrand?.data?.data.filter((brand) => {
      return brand.brand_name.toLowerCase().startsWith(selectedBrand.toLowerCase())
    })
    setFilteredBrands(fillterBrand)
  }
  // useEffect(() => {
  //   if (nameBrand?.data?.data) {
  //     setFilteredBrands(nameBrand.data.data) // Lưu dữ liệu từ API vào state
  //     console.log('chnage brand 1 ')
  //   }
  //   console.log('chnage brand 1 ')
  // }, [nameBrand?.data?.data])

  // xử lí xem them
  const handleShowMore = () => {
    setVisibleBrands((prev) => {
      return prev + 5
    })
  }
  // xử lí check box
  const handleCheckboxChange = (e) => {
    let updateBrands
    setNameBrands((prev) => {
      if (e.target.checked) {
        // brands lấy trên url
        updateBrands = [...brands, e.target.value]
      } else {
        // Remove brand if unchecked
        updateBrands = brands.filter((brand) => {
          return brand !== e.target.value
        })
      }
      // Create search parameters
      const searchParams = createSearchParams({
        ...useQueryParameter,
        'brands[]': updateBrands // Update brands[] parameter
      }).toString()

      // Navigate with updated search parameters
      navigate({
        pathname: `/category`,
        search: `?${searchParams}`
      })
      return updateBrands // Update the state
    })
  }

  const handleOnchangePage = (pagination) => {
    console.log('check ', pagination.current, pagination.pageSize)
    const searchParams = createSearchParams({
      ...useQueryParameter,
      paginate: +pagination.current
    }).toString()
    //console.log(searchParams) // Kiểm tra chuỗi query được tạo
    navigate({
      pathname: `/category`,
      search: `?${searchParams}`
    })
  }
  const onfinish = (values) => {
    console.log(values)

    var price_max = values.price_max.replace(',', '')
    var price_min = values.price_min.replace(',', '')
    console.log(+price_max)
    console.log(+price_min)
    if (values.price_max < 0) {
      price_max = 0
    }
    if (values.price_min < 0) {
      price_min = 0
    }
    if (+price_min >= 0 && +price_max >= 0) {
      const searchParams = createSearchParams({
        ...useQueryParameter,
        price_min: +price_min,
        price_max: +price_max
      }).toString()
      //console.log(searchParams) // Kiểm tra chuỗi query được tạo
      navigate({
        pathname: `/category`,
        search: `?${searchParams}`
      })
    }
  }

  // if (isLoading) return <Loading />
  return (
    <div className=''>
      <div className='px-24 py-6'>
        <div class='hidden bg-neutral-100 md:block  mb-4'>
          <div class='container '>
            <div>
              <ul class='flex items-center py-1.5 text-neutral-600'>
                <li class='h-5 text-sm'>
                  <span class='hover:text-neutral-800 mx-1 font-normal text-[12px] leading-5'>
                    <a href='/'>Trang chủ</a>
                  </span>
                  <span class='p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full h-3 w-3 text-neutral-800'>
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M17.2137 11.2862L8.21971 2.29524C7.82506 1.90159 7.18567 1.90159 6.79002 2.29524C6.39537 2.68889 6.39537 3.32829 6.79002 3.72194L15.0706 11.9995L6.79102 20.2771C6.39637 20.6707 6.39637 21.3101 6.79102 21.7048C7.18567 22.0984 7.82606 22.0984 8.22071 21.7048L17.2147 12.7139C17.6032 12.3243 17.6032 11.6749 17.2137 11.2862Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </span>
                </li>

                <li class='h-5 text-sm'>
                  <span class='hover:text-neutral-800 mx-1 font-normal text-[12px] leading-5 text-neutral-900'>
                    <a href=''></a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='text-[24px] font-bold leading-[32px] flex-1 max-md:text-base max-md:font-semibold md:flex'>
          {categorySlug}
        </div>
        <div className='grid grid-cols-8'>
          {getCategorybyid?.data?.data.children &&
            getCategorybyid?.data?.data.children.map((element) => {
              return (
                <div className='flex flex-col items-center gap-y-2  w-[120px] h-[160px] p-2  mt-2 '>
                  <div className='w-[100px] h-[100px]' onClick={() => handleClickCategory(element.category_name)}>
                    <img
                      src={element.category_thumbnail}
                      alt='anh'
                      className='w-full h-full object-cover rounded-md border'
                    />
                  </div>
                  <p className='text-center text-sm font-medium text-gray-700'>{element.category_name}</p>
                </div>
              )
            })}
        </div>
      </div>
      <div className='px-24 grid grid-cols-12 gap-2 mt-5'>
        <div className='col-span-2 flex flex-col'>
          <div className='flex text-lg  py-4'>
            <p className=' font-semibold'>Bộ lọc tìm kiếm</p>
          </div>
          <div className='border border-l-1 opacity-65'></div>

          <div className=' '>
            <p className=' font-semibold mt-5'>Khoảng giá</p>
            <Form onFinish={onfinish} form={form}>
              <Form.Item
                name='price_min'
                dependencies={['price_max']}
                validateTrigger='onBlur'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <div class='relative flex mt-4 text-center '>
                  <InputNumber
                    className='  py-1 text-neutral-900 rounded-lg focus:ring-neutral-500 focus:border-neutral-700 outline-none   truncate border-neutral-700 text-base font-medium placeholder:text-neutral-700 md:text-sm pr-10'
                    placeholder='Tối thiểu'
                    min={0}
                    style={{
                      width: '100%'
                    }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  ></InputNumber>
                  <span class='absolute right-0 flex h-full items-center px-3 mr-5'>
                    <span class='text-base font-normal text-neutral-700 md:text-sm'>₫</span>
                  </span>
                </div>
              </Form.Item>

              <Form.Item
                name='price_max'
                min={0}
                dependencies={['price_min']}
                rules={[
                  { required: true, message: 'Please input!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value > getFieldValue('price_min')) {
                        return Promise.resolve()
                      }
                      return Promise.reject('Price Max should be greater than Price Min')
                    }
                  })
                ]}
              >
                <div class='relative flex mt-4 text-center '>
                  <InputNumber
                    className=' py-1  text-neutral-900 rounded-lg focus:ring-neutral-500 focus:border-neutral-700 outline-none   truncate border-neutral-700 text-base font-medium placeholder:text-neutral-700 md:text-sm pr-10'
                    placeholder='Tối đa'
                    min={0}
                    style={{
                      width: '100%'
                    }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                  <span class='absolute right-0 flex h-full items-center px-3 mr-5'>
                    <span class='text-base font-normal text-neutral-700 md:text-sm'>₫</span>
                  </span>
                </div>
              </Form.Item>

              <button
                data-size='sm'
                className='mt-4 relative justify-center outline-none font-semibold text-white bg-blue border-0 hover:bg-blue  text-sm px-4 py-2 h-9 items-center rounded-lg hidden md:block w-full'
                onClick={() => form.submit()}
              >
                Áp dụng
              </button>
            </Form>
            <div className='mt-5'>
              <input
                type='radio'
                name='price'
                value='1-100000'
                onChange={handleRadioChange}
                checked={isChecked('1', '100000')}
              />
              <label> Dưới 100.000 đ</label>
            </div>
            <div className='mt-5'>
              <input
                type='radio'
                name='price'
                value='100000-300000'
                onChange={handleRadioChange}
                checked={isChecked('100000', '300000')}
              />
              <label> 100.000 đ - 300.000 đ</label>
            </div>
            <div className='mt-5'>
              <input
                type='radio'
                name='price'
                value='300000-500000'
                onChange={handleRadioChange}
                checked={isChecked('300000', '500000')}
              />
              <label> 300.000 đ - 500.000 đ</label>
            </div>
            <div className='mt-5'>
              <input
                type='radio'
                name='price'
                value='500000-1000000'
                onChange={handleRadioChange}
                checked={isChecked('500000', '1000000')}
              />
              <label> Trên 500.000 đ</label>
            </div>

            <div className='mt-5  '>
              <div className='font-semibold'>Thương hiệu(1)</div>
              <div className='mt-4'>
                <input
                  type='text'
                  placeholder='Nhập tên thương hiệu'
                  className='p-2 h-9 rounded-lg outline-none border w-full border-neutral-700 text-neutral-900 text-sm font-medium placeholder:text-neutral-700'
                  onChange={handleChangeBrand}
                />
              </div>
              <div className='mt-4 mb-4 overflow-y-scroll overflow-x-hidden h-[300px] '>
                {filteredBrands.length == 0
                  ? nameBrand?.data?.data.map((brand) => (
                      <div className='flex mt-2'>
                        <input
                          type='checkbox'
                          id={`${brand.brand_id}`}
                          name='brand[]'
                          value={brand.brand_name}
                          onChange={(e) => handleCheckboxChange(e)}
                          checked={NameBrands.includes(brand.brand_name)}
                        />

                        <label htmlFor={`${brand.brand_id}`} className='pl-2  truncate'>
                          {brand.brand_name}
                        </label>
                      </div>
                    ))
                  : filteredBrands.map((brand) => (
                      <div className='flex mt-2'>
                        <input
                          type='checkbox'
                          id={`${brand.brand_id}`}
                          name='brand[]'
                          value={brand.brand_name}
                          onChange={(e) => handleCheckboxChange(e)}
                          checked={NameBrands.includes(brand.brand_name)}
                        />

                        <label htmlFor={`${brand.brand_id}`} className='pl-2  truncate'>
                          {brand.brand_name}
                        </label>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-10 '>
          <Spin spinning={isLoading} delay={500} tip='Loading...'>
            <div className='flex  px-3 pt-2  gap-x-2'>
              <p className='p-3 font-medium'>Sắp xếp theo: </p>
              <button
                className='p-3  border-2 rounded-lg text-[#787878] hover:text-black'
                onClick={() => handlePriceDes()}
              >
                Giảm giá dần{' '}
              </button>
              <button className='p-3  border-2 rounded-lg text-[#787878] hover:text-black' onClick={handlePriceAsc}>
                Giá tăng dần{' '}
              </button>
            </div>
            <div className='grid grid-cols-5 px-3 py-4  gap-3'>
              {productsData?.data?.data?.data &&
                productsData.data.data.data.map((element) => {
                  console.log(element)

                  return (
                    <div className='border border-1 shadow-lg rounded-lg overflow-hidden'>
                      <Link to={`/${generateNameId(element.product_name, element.product_id)}`} className=' '>
                        <img src={element.product_images.length > 0 ? element.product_images[0] : anhloi} alt='' />
                      </Link>

                      <div className='p-3'>
                        <Link to={`/${generateNameId(element.product_name, element.product_id)}`}>
                          <h3 class='line-clamp-2  font-semibold text-base'>{element.product_name}</h3>
                        </Link>
                        {element.parent_category_name === 'Thuốc kê đơn' ? (
                          <>
                            <button
                              className='text-center w-full mt-4 bg-blue rounded-lg p-2'
                              onClick={() => {
                                navigate(`/${generateNameId(element.product_name, element.product_id)}`)
                              }}
                            >
                              Cần tư vấn
                            </button>
                          </>
                        ) : (
                          <>
                            <del class='block h-5 text-sm font-semibold text-neutral-600 mt-2'>115.000 đ</del>
                            <div className='flex justify-between items-center'>
                              <span>Sold: {element.product_sold}</span>
                              <span class='mt-[2px] block h-6 text-base font-bold text-blue '>
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                }).format(element.product_price ?? 0)}
                              </span>
                            </div>
                            <div class='flex items-center py-1 text-sm'></div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
            {productsData?.data?.data?.data.length == 0 && (
              <div style={{ width: '100%', margin: '0 auto' }}>
                <Empty description='Không có dữ liệu' />
              </div>
            )}
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                current={paginate}
                total={50}
                pageSize={5}
                responsive
                onChange={(p, s) => handleOnchangePage({ current: p, pageSize: s })}
              />
            </Row>
          </Spin>
        </div>
      </div>
    </div>
  )
}
// <form onSubmit={handleSubmit(onSubmit)}>
//               <div class='relative flex-col mt-4'>
//                 <div class='relative flex mt-4 '>
//                   <input
//                     min='0'
//                     className='w-full border text-neutral-900 rounded-lg focus:ring-neutral-500 focus:border-neutral-700 outline-none p-2.5 h-9 truncate border-neutral-700 text-base font-medium placeholder:text-neutral-700 md:text-sm pr-10'
//                     placeholder='Tối thiểu'
//                     type='text'
//                     {...register('price_min')}
//                   />

//                   <span class='absolute right-0 flex h-full items-center px-3'>
//                     <span class='text-base font-normal text-neutral-700 md:text-sm'>₫</span>
//                   </span>
//                 </div>
//                 <p className='text-red-600 mt-1 text-sm'>{errors.price_min?.message}</p>
//                 <div class='relative flex mt-4 '>
//                   <input
//                     max='100000'
//                     className='w-full border text-neutral-900 rounded-lg focus:ring-neutral-500 focus:border-neutral-700 outline-none p-2.5 h-9 truncate border-neutral-700 text-base font-medium placeholder:text-neutral-700 md:text-sm pr-10'
//                     placeholder='Tối đa'
//                     type='number'
//                     {...register('price_max')}
//                   />
//                   <span class='absolute right-0 flex h-full items-center px-3'>
//                     <span class='text-base font-normal text-neutral-700 md:text-sm'>₫</span>
//                   </span>
//                 </div>
//                 <p className='text-red-600 mt-1 text-sm'>{errors.price_max?.message}</p>
//               </div>

//               <button
//                 data-size='sm'
//                 className='mt-4 relative justify-center outline-none font-semibold text-white bg-blue border-0 hover:bg-blue  text-sm px-4 py-2 h-9 items-center rounded-lg hidden md:block w-full'
//                 type='submit'
//               >
//                 <span>Áp dụng</span>
//               </button>
//             </form>
//{`/category?category_name=${useQueryParameter?.category_name}`}
// {visibleBrands < filteredBrands.length && (
//   <button className='text-[#0070E0] w-full text-center my-5' onClick={handleShowMore}>
//     Xem thêm
//   </button>
// )}
