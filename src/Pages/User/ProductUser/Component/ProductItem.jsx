import React from 'react'
import { formatCurrency, generateNameId } from '../../../../until'
import anhloi from './anhloi.png'
import { Link } from 'react-router-dom'
export default function ProductItem({ sanphammoi }) {
  console.log(sanphammoi)
  return (
    <>
      {sanphammoi?.data?.data?.data?.map((element) => {
        const productImage = Array.isArray(element?.product_images) ? element.product_images[0] : null
        // console.log(productImage)
        console.log(element)
        return (
          <div>
            <div className='rounded-lg overflow-hidden border shadow-md bg-white  h-full transition-transform duration-300 ease-in-out hover:scale-105'>
              <div className='relative p-2 rounded-lg shadow-sm  h-[185px]'>
                <Link to={`/${generateNameId(element.product_name, element.product_id)}`} className=' '>
                  <img
                    className='w-full object-cover h-full rounded-lg '
                    src={productImage ? productImage : anhloi}
                    alt=''
                  />
                </Link>
              </div>

              <div className='p-2 pb-1 font-medium'>
                <Link to={`/${generateNameId(element.product_name, element.product_id)}`} className=' '>
                  <h3 className='line-clamp-2 h-[3rem] text-base font-semibold'>{element.product_name}</h3>
                </Link>
              </div>

              <div className='p-2'>
                <del class='block h-5 text-sm font-semibold text-neutral-600'></del>
                <span class='mt-[2px] block h-6 text-base font-bold text-blue'>
                  {formatCurrency(element.product_price)}
                </span>
                <div class='mb-2 flex items-center py-1 text-sm'>
                  <span class='p-icon inline-flex h-4 max-h-full w-4 max-w-full items-center align-[-0.125em] text-neutral-700'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' viewBox='0 0 25 24'>
                      <path
                        fill='currentColor'
                        d='M17.22 2a6.2 6.2 0 0 0-4.72 2.16A6.2 6.2 0 0 0 7.78 2a6.26 6.26 0 0 0-4.55 10.58l8.55 8.9a1 1 0 0 0 1.44 0l8.55-8.9h.01A6.26 6.26 0 0 0 17.22 2Z'
                      ></path>
                    </svg>
                  </span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>33.7k</span>
                  <span class='text-neutral-600'>|</span>{' '}
                  <span class='text-[14px] leading-[20px] mx-1 font-medium'>Đã bán 6.5k</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
// <div className='absolute bottom-0 left-0 flex h-[26px] w-full'>
//                   <img
//                     className='h-full w-full object-contain'
//                     src={''}
//                     alt=''
//                     loading='lazy'
//                     width='500'
//                     height='500'
//                   />
//                 </div>
