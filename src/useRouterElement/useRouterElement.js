import { useRoutes } from 'react-router-dom'
import React from 'react'
import HomeUser from '../Pages/User/HomeUser/HomeUser.js'
import RegisterLayout from '../Layouts/RegisterLayout/RegisterLayout.jsx'
import Login from '../Component/Login/Login.jsx'
import Register from '../Component/Register/index.js'
import MainLayout from '../Layouts/MainLayout/MainLayout.jsx'
import MainLayoutUser from '../Layouts/User/MainLayout/index.js'
import CategoryListProduct from '../Pages/User/CategoryListProduct/CategoryListProduct.jsx'
import VerifyEmail from '../Pages/User/VerifyEmail/index.jsx'
export default function useRouterElement() {
  const element = useRoutes([
    {
      path: '/',
      element: <HomeUser />
    },
    {
      path: '/cart',
      element: <MainLayoutUser />
    },
    {
      path: '/auth/verify-email/:user',
      element: <VerifyEmail />
    },
    {
      path: '/:slug',
      element: <CategoryListProduct />
    },
    {
      path: '/admin',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className=' flex items-center justify-center'>Tổng quan </div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/overview',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            //{' '}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className=' flex items-center justify-center'>Content overview </div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/post',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Content post </div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/products',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Content product</div>
            </div>
          </div>
        </MainLayout>
      )
    },

    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/'
    }
  ])

  return element
}

// <div className='flex-1 overflow-y-scroll h-[calc(100vh)]'>
//               {/* Adjust the height according to your header's height */}
//               <div className='h-[1000px] flex items-center justify-center'>Content overview </div>
//             </div>
