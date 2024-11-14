import React from 'react'
import { Link } from 'react-router-dom'

export default function DiseaseSesson({ disease_common }) {
  return (
    <div className=''>
      <div className='px-24 flex flex-col'>
        <div class=' flex items-center justify-between pt-4'>
          <h4 class='font-semibold md:font-semibold md:text-[20px] text-base'>Nhóm bệnh theo mùa bệnh</h4>
          <a
            class='relative flex justify-center border-0 bg-transparent text-sm font-normal text-hyperLink outline-none md:hover:text-primary-600 md:text-base'
            type='button'
            href='/benh'
          >
            Xem thêm
          </a>
        </div>
        <div className='grid grid-cols-6 gap-6 py-6'>
          {disease_common?.map((element) => {
            return (
              <div class='flex items-center gap-2 rounded-md shadow-lg'>
                <Link to={`/benh/${element.disease_id}`}>
                  <img
                    class='rounded-md object-cover md:h-[80px] md:w-[80px] w-[80px] h-[80px]'
                    src={element.disease_thumbnail}
                    alt=''
                    loading='lazy'
                    width='500'
                    height='500'
                  />
                </Link>
                <div class='flex-1 text-sm font-medium'>
                  <div class='font-medium capitalize text-sm line-clamp-3'>
                    <a href={`/benh/${element.disease_id}`}>
                      <div class=' break-word line-clamp-2 text-sm font-semibold'>{element.disease_name}</div>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
