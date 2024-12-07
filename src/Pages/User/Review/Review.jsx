import React from 'react'
import { Rate, Divider } from 'antd'
import { useQuery } from '@tanstack/react-query'
import ReviewAPI from '../../../Api/user/review'
export default function Review({ idproduct1 }) {
  const { data } = useQuery({
    queryKey: ['getReview', idproduct1],
    queryFn: () => {
      return ReviewAPI.getReviewsProductById(idproduct1)
    }
  })
  console.log(data)
  const images = JSON.parse(data?.data?.data?.review_images ?? '[]')
  console.log(images)
  return (
    <div className='mb-3'>
      <div className='text-2xl font-semibold'> Review</div>
      {data?.data?.data.map((element) => {
        return (
          <>
            <div className='flex gap-x-3 mt-3'>
              <div className=''>
                <img className='w-[40px] h-[40px] shrink-0 rounded-full ' src={element?.user_avatar} alt='' />
              </div>

              <div className='flex-1'>
                <div className='flex flex-col gap-y-2'>
                  <span>{element.user_fullname}</span>
                  <div className='flex items-center gap-x-2'>
                    <Rate allowHalf defaultValue={element.review_rating} disabled />
                    <span>{element.review_created_at}</span>
                  </div>
                  <div className='text-sm'>{element.review_comment}</div>
                  <div className='flex gap-3'>
                    {JSON.parse(element.review_images ?? '[]').map((image) => {
                      return <img className='w-[72px] h-[72px] shrink-0  ' src={image} alt='' />
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Divider style={{ borderColor: '#7cb305' }}></Divider>
          </>
        )
      })}
    </div>
  )
}

// {images?.map((image, index) => (
//   <img key={index} src={image} alt={`Product Image ${index + 1}`} className='product-image' />
// ))}
