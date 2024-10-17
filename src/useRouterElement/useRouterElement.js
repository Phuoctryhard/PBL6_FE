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
import MainLayoutUser from '../Layouts/User/MainLayout/index.js'
import CategoryListProduct from '../Pages/User/CategoryListProduct/CategoryListProduct.jsx'
import VerifyEmail from '../Pages/User/VerifyEmail/index.jsx'
import DetailProduct from '../Pages/User/ProductUser/DetailProduct/DetailProduct.jsx'
import Cart from '../Pages/User/Cart/index.jsx'
import Profile from '../Pages/User/Account/personal-info/Profile.jsx'
import Adress from '../Pages/User/Account/address/Adress.jsx'
import LayoutAccount from '../Pages/User/Account/LayoutAccount/LayoutAccount.jsx'
import OrderHistory from '../Pages/User/Account/order_history/OrderHistory.jsx'
import UpdatePassword from '../Pages/User/Account/personal-info/components/UpdatePassword/UpdatePassword.jsx'
import HomeUser from '../Pages/User/HomeUser/HomeUser.js'

export default function useRouterElement() {
  const element = useRoutes([
    {
      path: '/',
      element: <HomeUser />
    },
    {
      path: '/cart',
      element: (
        <MainLayoutUser>
          <Cart />
        </MainLayoutUser>
      )
    },
    {
      path: '/auth/verify-email/:user',
      element: <VerifyEmail />
    },
    {
      path: '/detail',
      element: (
        <MainLayoutUser>
          <DetailProduct />
        </MainLayoutUser>
      )
    },
    {
      path: '/account',
      element: (
        <MainLayoutUser>
          <LayoutAccount />
        </MainLayoutUser>
      ),
      children: [
        {
          path: '/account',
          element: <Profile />
        },
        {
          path: '/account/profile',
          element: <Profile />
        },
        {
          path: '/account/address',
          element: <Adress />
        },
        {
          path: '/account/order-history',
          element: <OrderHistory />
        },
        {
          path: '/account/profile/update-password',
          element: <UpdatePassword />
        }
      ]
    },
    {
      path: '/:slug',
      element: (
        <MainLayoutUser>
          <CategoryListProduct />
        </MainLayoutUser>
      )
    },
    {
      path: '/cart',
      element: (
        <MainLayoutUser>
          <Cart />
        </MainLayoutUser>
      )
    },
    {
      path: '/auth/verify-email/:user',
      element: <VerifyEmail />
    },
    {
      path: '/detail',
      element: (
        <MainLayoutUser>
          <DetailProduct />
        </MainLayoutUser>
      )
    },
    {
      path: '/account',
      element: (
        <MainLayoutUser>
          <LayoutAccount />
        </MainLayoutUser>
      ),
      children: [
        {
          path: '/account',
          element: <Profile />
        },
        {
          path: '/account/profile',
          element: <Profile />
        },
        {
          path: '/account/address',
          element: <Adress />
        },
        {
          path: '/account/order-history',
          element: <OrderHistory />
        },
        {
          path: '/account/profile/update-password',
          element: <UpdatePassword />
        }
      ]
    },
    {
      path: '/:slug',
      element: (
        <MainLayoutUser>
          <CategoryListProduct />
        </MainLayoutUser>
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
