import React from 'react'

export default function DiseaseObject({ disease_by_target_group }) {
  //console.log(disease_by_target_group)
  // disease_by_target_group : dạng object có thuộc tính deasea là 1 mảng
  if (!disease_by_target_group || typeof disease_by_target_group !== 'object') {
    return <p></p>
  }
  return (
    <>
      <div className='px-24 flex flex-col'>
        <div class=' flex items-center justify-between py-4'>
          <h4 class='font-semibold md:font-semibold md:text-[20px] text-base'>Bệnh theo đối tượng</h4>
          <a
            class='relative flex justify-center border-0 bg-transparent text-sm font-normal text-hyperLink outline-none md:hover:text-primary-600 md:text-base'
            type='button'
            href='/benh'
          >
            Xem thêm
          </a>
        </div>
        <div className='grid grid-cols-3 gap-3 mt-1 mb-3 '>
          {Object.values(disease_by_target_group).map((category) => {
            return (
              <div className='flex  rounded-md shadow-lg relative gap-0 border py-4' key={category.category_id}>
                <img
                  className='rounded-md  bottom-0 left-0 w-[140px] h-[140px] md:w-[140px] md:h-[140px] object-contain'
                  src={category.category_thumbnail}
                  alt=''
                  loading='lazy'
                />

                <div className='flex flex-col'>
                  <div class='capitalize text-base font-semibold mb-1 line-clamp-1 ps-[2px] pe-2'>
                    <div class=''>{category.category_name}</div>
                  </div>
                  {category?.diseases?.map((disease) => {
                    return (
                      <div className='text-blue' key={disease.disease_id}>
                        <ul className='leading-5.5 list-disc text-base font-normal list-none'>
                          <li className=''>
                            <a href={`/benh/${disease.disease_id}`}>{disease.disease_name}</a>{' '}
                          </li>
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div class='bg-neutral-100 h-3' />
    </>
  )
}
