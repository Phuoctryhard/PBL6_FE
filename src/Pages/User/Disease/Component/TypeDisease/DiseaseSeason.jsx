import React from 'react'
import { Link } from 'react-router-dom'

export default function DiseaseSesson({ disease_common }) {
  return (
    <div>
      <div className='px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between pt-4'>
          <h4 className='font-semibold md:font-semibold md:text-[20px] text-base'>Nhóm bệnh theo mùa bệnh</h4>
      
        </div>

        {/* Content */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 py-6'>
          {disease_common?.map((element) => (
            <div key={element.disease_id} className='flex items-center gap-4 p-2 rounded-md shadow-lg bg-white'>
              {/* Image */}
              <Link to={`/benh/${element.disease_id}`}>
                <img
                  className='rounded-md object-cover w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]'
                  src={element.disease_thumbnail}
                  alt={element.disease_name || 'Thumbnail'}
                  loading='lazy'
                  width='80'
                  height='80'
                />
              </Link>

              {/* Name */}
              <div className='flex-1 text-sm font-medium'>
                <Link to={`/benh/${element.disease_id}`}>
                  <div className='break-word line-clamp-2 text-sm font-semibold capitalize'>{element.disease_name}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
