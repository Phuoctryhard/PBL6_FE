import React from 'react'
import { Link } from 'react-router-dom'

export default function PartBody({ disease_Body }) {
  console.log(disease_Body)

  return (
    <div>
      <div className='px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col'>
        <div className='flex items-center justify-between pt-4'>
          <h4 className='font-semibold md:font-semibold md:text-[20px] text-base'>Bộ phận cơ thể</h4>
     
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 py-6'>
          {disease_Body?.map((element) => (
            <div key={element.category_id} className='flex items-center gap-2 rounded-md shadow-lg bg-white p-2'>
              <Link to={`/categorybenh/${element.category_id}`} className='flex items-start gap-2 w-full'>
                <img
                  className='rounded-md object-cover w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]'
                  src={element.category_thumbnail}
                  alt={element.category_name || 'Thumbnail'}
                  loading='lazy'
                  width='80'
                  height='80'
                />
                <div className='flex-1 text-sm font-medium'>
                  <div className='font-medium capitalize line-clamp-2'>
                    <span className='break-word text-sm font-semibold'>{element.category_name}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
