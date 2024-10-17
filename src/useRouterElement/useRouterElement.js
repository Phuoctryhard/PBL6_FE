import { useRoutes } from 'react-router-dom'
import RegisterLayout from '../Layouts/RegisterLayout/RegisterLayout.jsx'
import Login from '../Component/Login/Login.jsx'
import Register from '../Component/Register/index.js'
import MainLayout from '../Layouts/Admin/MainLayout/MainLayout.jsx'
import AdminProducts from '../Component/AdminProducts/Products.jsx'
import AdminAddProduct from '../Component/AdminAddProduct'
import AdminEditProduct from '../Component/AdminEditProduct'
import AdminViewProduct from '../Component/AdminViewProduct'
import React from 'react'
//https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/
export default function useRouterElement() {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <div>
          <h1>Home user</h1>
        </div>
      )
    },
    {
      path: '/admin',
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
      path: '/admin/overview',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            <div className=''>
              <div className=' flex items-center justify-center'></div>
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
          <AdminProducts />
        </MainLayout>
      )
    },
    {
      path: '/admin/products/add-product',
      element: (
        <MainLayout>
          <AdminAddProduct />
        </MainLayout>
      )
    },
    {
      path: '/admin/products/update/:productID',
      element: (
        <MainLayout>
          <AdminEditProduct />
        </MainLayout>
      )
    },
    {
      path: '/admin/products/:productID',
      element: (
        <MainLayout>
          <AdminViewProduct />
        </MainLayout>
      )
    },
    {
      path: '/admin/orders',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>User order</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/reports',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>User reports</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/receipts',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>User receipts</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/suppliers',
      element: (
        <MainLayout>
          <h1>This is suppliers</h1>
        </MainLayout>
      )
    },
    {
      path: '/admin/brands',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>User brands</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/users',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Users</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/posts',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Post</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/comment_review',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>comment_review</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/illness',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>illness</div>
            </div>
          </div>
        </MainLayout>
      )
    },
    {
      path: '/admin/setting',
      element: (
        <MainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>settings</div>
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
