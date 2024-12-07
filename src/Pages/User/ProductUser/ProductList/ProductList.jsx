import React, { useState } from 'react'
import anh1 from '../../HomeUser/Component/SliderUser/img/sanpham.jpg'
import anh2 from '../../HomeUser/Component/SliderUser/img/sanDeal.png'
import Button1 from '../../../../Component/Button/Button'
import Category from '../../HomeUser/Component/CategoryProduct/Category'
import ProductItem from '../Component/ProductItem'
import { useQuery } from '@tanstack/react-query'
import productAPI from '../../../../Api/user/product'

export default function ProductList() {
  // san pham moi
  // params là object thay vi chuoi
  const [sanphammoi, setProductmoi] = useState({
    typesort: 'new',
    sortlatest: 'true',
    paginate: 6
  })
  // params là object thay vi chuoi
  const [sanphambanchay, setProductSale] = useState({
    typesort: 'product_sold',
    sortlatest: 'true',
    paginate: 6
  })

  const { data: newproduct } = useQuery({
    queryKey: ['sanpham', sanphammoi],
    queryFn: () => {
      return productAPI.getAllProduct(sanphammoi)
    },
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút mà không cần refetch
    cacheTime: 10 * 60 * 1000
  })
  const { data: saleproduct } = useQuery({
    queryKey: ['sanphamsale', sanphambanchay],
    queryFn: () => {
      return productAPI.getAllProduct(sanphambanchay)
    },
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút mà không cần refetch
    cacheTime: 10 * 60 * 1000
  })
  // console.log(newproduct)
  // console.log(saleproduct)
  return (
    <div className='bg-white'>
      <div class='bg-neutral-100 h-3'></div>
      <div className='px-24 flex flex-col '>
        <div className='flex justify-between py-4 bg-[#3165b3] rounded-lg  items-center'>
          <h1 className='font-semibold line-clamp-1 text-base md:text-[20px] pl-2 text-white'>Sản phẩm bán chạy</h1>
          
        </div>

        <div className='mb-5 mt-2'>
          <div className='grid grid-cols-6 gap-x-4 '>
            <ProductItem sanphammoi={newproduct} />
          </div>
        </div>
      </div>

      <div class='bg-neutral-100 h-3'></div>
      <div className='bg-[#60e0c0]'>
        <div className='px-24 flex flex-col'>
          <div className='flex justify-between py-4 bg-[#3165b3] rounded-lg  items-center my-3'>
            <h1 className='font-semibold line-clamp-1 text-base md:text-[20px] pl-2 text-white'>Sản phẩm mới nhất</h1>
          </div>
          <div className='mb-5'>
            <div className='grid grid-cols-6 gap-x-4 '>
              <ProductItem sanphammoi={saleproduct} />
            </div>
          </div>
        </div>
      </div>
      <div class='bg-neutral-100 h-3'></div>

      {/**/}

      <div class='bg-neutral-100 h-3' />

      <Category />
      <div class='bg-blue h-3' />
    </div>
  )
}

// <a
//               class='relative flex justify-center border border-white bg-transparent text-sm font-normal text-hyperLink outline-none text-white p-2 mr-2 rounded-lg'
//               type='button'
//               href='/collection/top-san-ban-chay-toan-quoc'
//             >
//               Xem tất cả
//             </a>
// <div className='px-24 flex flex-col py-4'>
// <div class=' flex items-center justify-between pt-4'>
//   <h4 class='font-semibold md:font-semibold md:text-[20px] text-base'>Gốc Sức khỏe</h4>
//   <a
//     class='relative flex justify-center border-0 bg-transparent text-sm font-normal text-hyperLink outline-none md:hover:text-primary-600 md:text-base'
//     type='button'
//     href='/benh'
//   >
//     Xem thêm
//   </a>
// </div>
// <div className='py-4 flex justify-between'>
//   <Button1 title='Bài viết nổi bật' type='primary' />
//   <Button1 title='Tin tức' />
//   <Button1 title='Mẹ và bé' />
//   <Button1 title='Dinh dưỡng' />
//   <Button1 title='Sống khỏe' />
// </div>

// <div className='grid grid-cols-3 gap-4'>
//   <div className=''>
//     <div className='overflow-hidden rounded-sm   mb-2 w-full'>
//       <img
//         className='h-full w-full object-cover'
//         src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
//         alt=''
//       />
//     </div>
//     <div className=''>
//       <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
//         Tin tức
//       </div>
//       <p className='font-semibold my-1 text-base'>
//         Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
//       </p>
//       <p className=' line-clamp-2 text-sm '>
//         Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân tại
//         xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt bởi
//         nước lũ, trong khi một số nơi khác đã bắt […]
//       </p>
//     </div>
//   </div>

//   <div className='flex flex-col justify-between'>
//     <div className='flex gap-2 '>
//       <div className='overflow-hidden rounded-sm   mb-2 w-full'>
//         <img
//           className='h-full w-full object-cover'
//           src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
//           alt=''
//         />
//       </div>
//       <div className=''>
//         <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
//           Tin tức
//         </div>
//         <p className='font-semibold my-1 text-base'>
//           Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
//         </p>
//         <p className=' line-clamp-2 text-sm '>
//           Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
//           tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
//           bởi nước lũ, trong khi một số nơi khác đã bắt […]
//         </p>
//       </div>
//     </div>
//     <div className='flex gap-2 '>
//       <div className='overflow-hidden rounded-sm   mb-2 w-full'>
//         <img
//           className='h-full w-full object-cover'
//           src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
//           alt=''
//         />
//       </div>
//       <div className=''>
//         <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
//           Tin tức
//         </div>
//         <p className='font-semibold my-1 text-base'>
//           Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
//         </p>
//         <p className=' line-clamp-2 text-sm '>
//           Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
//           tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
//           bởi nước lũ, trong khi một số nơi khác đã bắt […]
//         </p>
//       </div>
//     </div>
//     <div className='flex gap-2 '>
//       <div className='overflow-hidden rounded-sm   mb-2 w-full'>
//         <img
//           className='h-full w-full object-cover'
//           src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
//           alt=''
//         />
//       </div>
//       <div className=''>
//         <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
//           Tin tức
//         </div>
//         <p className='font-semibold my-1 text-base'>
//           Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
//         </p>
//         <p className=' line-clamp-2 text-sm '>
//           Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
//           tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
//           bởi nước lũ, trong khi một số nơi khác đã bắt […]
//         </p>
//       </div>
//     </div>
//   </div>

//   <div className='flex flex-col justify-between'>
//     <div className='flex gap-2 '>
//       <div className='overflow-hidden rounded-sm   mb-2 w-full'>
//         <img
//           className='h-full w-full object-cover'
//           src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
//           alt=''
//         />
//       </div>
//       <div className=''>
//         <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
//           Tin tức
//         </div>
//         <p className='font-semibold my-1 text-base'>
//           Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
//         </p>
//         <p className=' line-clamp-2 text-sm '>
//           Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
//           tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
//           bởi nước lũ, trong khi một số nơi khác đã bắt […]
//         </p>
//       </div>
//     </div>
//     <div className='flex gap-2 '>
//       <div className='overflow-hidden rounded-sm   mb-2 w-full'>
//         <img
//           className='h-full w-full object-cover'
//           src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
//           alt=''
//         />
//       </div>
//       <div className=''>
//         <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
//           Tin tức
//         </div>
//         <p className='font-semibold my-1 text-base'>
//           Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
//         </p>
//         <p className=' line-clamp-2 text-sm '>
//           Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
//           tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
//           bởi nước lũ, trong khi một số nơi khác đã bắt […]
//         </p>
//       </div>
//     </div>
//     <div className='flex gap-2 '>
//       <div className='overflow-hidden rounded-sm   mb-2 w-full'>
//         <img
//           className='h-full w-full object-cover'
//           src='https://prod-cdn.pharmacity.io/blog/PMC-ho-tro-bao-yagi-5.jpg'
//           alt=''
//         />
//       </div>
//       <div className=''>
//         <div class='mt-1 bg-[#525252] w-[52px] text-xs font-medium text-white rounded-sm text-center'>
//           Tin tức
//         </div>
//         <p className='font-semibold my-1 text-base'>
//           Pharmacity hỗ trợ sức khỏe người dân ở vùng bị ảnh hưởng sau bão lũ
//         </p>
//         <p className=' line-clamp-2 text-sm '>
//           Sáng 17/9, Tổng giám đốc Công ty Cổ phần Dược phẩm Pharmacity đã đến thăm và tặng quà cho người dân
//           tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ. Đây là địa phương có nhiều hộ dân vẫn còn bị chia cắt
//           bởi nước lũ, trong khi một số nơi khác đã bắt […]
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// </div>

// <div className='flex justify-between py-4 text-center bg-[#60e0c0]'>
//             <h1 className='font-semibold line-clamp-1 text-base md:text-[20px]'>
//               <img src={anh2} alt='' />
//             </h1>
//             <a
//               class='relative flex justify-center border-0 bg-transparent text-base font-normal text-hyperLink outline-none md:hover:text-white md:text-blue'
//               type='button'
//               href='/collection/top-san-ban-chay-toan-quoc'
//             >
//               Xem thêm
//             </a>
//           </div>
