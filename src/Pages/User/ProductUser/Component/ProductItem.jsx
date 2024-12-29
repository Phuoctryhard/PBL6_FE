import React from 'react'
import { formatCurrency, generateNameId } from '../../../../until'
import anhloi from './anhloi.png'
import { Link } from 'react-router-dom'
export default function ProductItem({ sanphammoi, sanphambanchay }) {
  return (
    <>
      {sanphammoi?.data?.data?.data?.map((element) => {
        const productImage = Array.isArray(element?.product_images) ? element.product_images[0] : null
        // console.log(element)

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

                <div class='mb-2 flex items-center py-1 text-sm justify-between'>
                  <span class=' block h-6 text-base  font-medium '>Đã bán {element.product_sold}</span>

                  <span class='block h-6 text-base font-bold text-blue'>{formatCurrency(element.product_price)}</span>
                </div>
              </div>
              {sanphambanchay == 'sanphambanchay' && (
                <div class='relative mt-1.5 h-[16px] overflow-hidden rounded-xl bg-red-500/50 px-2 py-[2px] text-center text-[10px] font-semibold text-white'>
                  <div class='absolute left-0 top-0 z-[1] h-full rounded-xl bg-red-500 w-[95%]'></div>
                  <div class='absolute bottom-0 left-0 right-0 top-0 z-[2] flex items-center justify-center py-[1px] text-xs'>
                    Đang bán chạy
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

// ;<span class='mt-[2px] block h-6 text-base font-bold text-blue'>{formatCurrency(element.product_price)}</span>

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
