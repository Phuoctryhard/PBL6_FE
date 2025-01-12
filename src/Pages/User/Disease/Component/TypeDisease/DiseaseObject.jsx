import React from 'react'

export default function DiseaseObject({ disease_by_target_group }) {
  // Kiểm tra đầu vào
  if (!disease_by_target_group || typeof disease_by_target_group !== 'object') {
    return <p></p>
  }

  return (
    <>
      <div className='px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between py-4'>
          <h4 className='font-semibold md:text-[20px] text-base'>Bệnh theo đối tượng</h4>
          
        </div>

        {/* Content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {Object.values(disease_by_target_group).map((category) => (
            <div
              className='flex flex-col sm:flex-row gap-4 p-4 rounded-md shadow-md border bg-white'
              key={category.category_id}
            >
              {/* Image */}
              <img
                className='rounded-md object-contain w-full h-[140px] sm:w-[140px] sm:h-[140px]'
                src={category.category_thumbnail}
                alt={category.category_name || 'Category Thumbnail'}
                loading='lazy'
              />

              {/* Content */}
              <div className='flex flex-col justify-between'>
                <div className='capitalize text-base font-semibold mb-2 line-clamp-1'>{category.category_name}</div>
                <ul className='space-y-2'>
                  {category?.diseases?.map((disease) => (
                    <li key={disease.disease_id} className='list-disc ml-5'>
                      <a
                        href={`/benh/${disease.disease_id}`}
                        className='text-blue-600 hover:text-blue-800 text-sm font-normal'
                      >
                        {disease.disease_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='bg-neutral-100 h-3 mt-6' />
    </>
  )
}
