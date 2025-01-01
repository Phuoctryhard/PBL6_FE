import React from 'react'
import { Tabs } from 'antd'
import categoryAPI from '../../../../../Api/user/category'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, createSearchParams, Link, useLocation } from 'react-router-dom'

const CategoryMain = ({ setopenCategory }) => {
  const navigate = useNavigate()
  const handleClickCategory = (categoryName) => {
    // Điều hướng về trang gốc rồi thêm categoryName
    // navigate(`/category/${categoryName}`)
    //setopenCategory(false)
    navigate({
      pathname: '/category',
      search: `?${createSearchParams({
        category_parent_name: `${categoryName}`
      })}`
    })
  }
  const onChange = (key) => {
    console.log(key)
  }

  const { data: ListCategory } = useQuery({
    queryKey: ['getCategory'],
    queryFn: categoryAPI.getCategery,
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ được coi là "mới" trong 5 phút
    cacheTime: 10 * 60 * 1000 // Dữ liệu được giữ trong cache tối đa 10 phút
  })
  // Tạo items cho Tabs
  const items = ListCategory?.data?.data?.map((category, index) => ({
    key: category.category_id.toString(),
    label: (
      <div
        onClick={() => {
         // setopenCategory(false)
          if (category.category_name === 'Tra cứu bệnh') {
            navigate('/benh')
          }
        }}
        className='cursor-pointer w-full'
      > 
        <div
          className={
            'flex p-3 gap-2 text-black mb-3 mr-2 items-center rounded-lg font-medium hover:bg-[#EBFAFB] w-full'
          }
        >
          <div className='w-[40px] h-[40px] '>
            <img src={category.category_thumbnail} alt='nopic' className='w-full h-full object-cover' />
          </div>

          <span className='capitalize text-[15px]'>{category.category_name}</span>
        </div>
      </div>
    ),
    children: (
      <div>
        {category?.category_name !== 'Tra cứu bệnh' ? (
          <div className=' gap-4  cursor-pointer flex md:flex-col  lg:flex-row'>
            {category?.children.slice(0, 8)?.map((child) => (
              <div key={child.category_id} className='my-2'>
                <div className='flex flex-col items-center gap-y-2  w-[120px] h-[160px] p-2 '>
                  <div onClick={() => handleClickCategory(child.category_name)} className='w-[100px] h-[100px]'>
                    <img
                      src={child?.category_thumbnail}
                      alt='anh'
                      className='w-full h-full object-cover rounded-md border'
                    />
                  </div>
                  <p className='text-center text-sm font-medium text-gray-700'>{child.category_name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    )
  }))
  return (
    <Tabs
      defaultActiveKey='1'
      accessKey={ListCategory?.data?.data.category_id}
      items={items}
      onChange={onChange}
      tabPosition='left'
    />
  )
}

export default CategoryMain
