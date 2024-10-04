import React from 'react'

export default function Category() {
  return (
    <div className='px-24 flex flex-col  '>
      <div class='bg-neutral-100 h-3' />
      <div className='text-[20px] font-semibold py-4'>Danh mục nổi bật</div>
      <div className='grid grid-cols-5 gap-4 pb-4'>
        <div className=''>
          <a class='flex items-center  gap-2 rounded-lg border p-2' href='/than-tiet-nieu'>
            <img
              class='h-14 w-14 rounded-full'
              src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240919065940-0-5.png'
              alt='Thận - Tiết niệu'
              loading='lazy'
              width='500'
              height='500'
            />
            <p class='line-clamp-2 text-sm'>Thận - Tiết niệu</p>
          </a>
        </div>
        <div className=''>
          <a class='flex items-center  gap-2 rounded-lg border p-2' href='/mat'>
            <img
              class='h-14 w-14 rounded-full'
              src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240919065940-0-14.png'
              alt='Mắt'
              loading='lazy'
              width='500'
              height='500'
            />
            <p class='line-clamp-2 text-sm'>Mắt</p>
          </a>
        </div>
        <div className=''>
          <a class='flex items-center  gap-2 rounded-lg border p-2' href='/tai-mui-hong'>
            <img
              class='h-14 w-14 rounded-full'
              src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240919065941-0-13.png'
              alt='Tai - Mũi - Họng'
              loading='lazy'
              width='500'
              height='500'
            />
            <p class='line-clamp-2 text-sm'>Tai - Mũi - Họng</p>
          </a>
        </div>
        <div className=''>
          <a class='flex items-center  gap-2 rounded-lg border p-2' href='/ho-hap'>
            <img
              class='h-14 w-14 rounded-full'
              src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240919065940-0-1.png'
              alt='Hô hấp'
              loading='lazy'
              width='500'
              height='500'
            />
            <p class='line-clamp-2 text-sm'>Hô hấp</p>
          </a>
        </div>
        <div className=''>
          <a class='flex items-center  gap-2 rounded-lg border p-2' href='/thuoc-tri-ky-sinh-trung'>
            <img
              class='h-14 w-14 rounded-full'
              src='https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240920031659-0-22.png'
              alt='Thuốc trị ký sinh trùng'
              loading='lazy'
              width='500'
              height='500'
            />
            <p class='line-clamp-2 text-sm'>Thuốc trị ký sinh trùng</p>
          </a>
        </div>
      </div>
    </div>
  )
}
