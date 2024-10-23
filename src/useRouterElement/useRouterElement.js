import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import React, { useContext } from 'react'
import HomeUser from '../Pages/User/HomeUser/HomeUser.js'
import RegisterLayout from '../Layouts/RegisterLayout/RegisterLayout.jsx'
import Login from '../Component/Login/Login.jsx'
import Register from '../Component/Register/index.js'
import AdminMainLayout from '../Layouts/Admin/MainLayout/MainLayout.jsx'
import MainLayoutUser from '../Layouts/User/MainLayout/index.js'
import CategoryListProduct from '../Pages/User/CategoryListProduct/CategoryListProduct.jsx'
import VerifyEmail from '../Pages/User/VerifyEmail/index.jsx'
import DetailProduct from '../Pages/User/ProductUser/DetailProduct/DetailProduct.jsx'
import AdminProducts from '../Component/AdminProducts/Products.jsx'
import AdminCategories from '../Component/AdminCategories'
import Cart from '../Pages/User/Cart/index.jsx'
import AdminAddProduct from '../Component/AdminAddProduct'
import Profile from '../Pages/User/Account/personal-info/Profile.jsx'
import Adress from '../Pages/User/Account/address/Adress.jsx'
import AdminEditProduct from '../Component/AdminEditProduct'
import LayoutAccount from '../Pages/User/Account/LayoutAccount/LayoutAccount.jsx'
import AdminViewProduct from '../Component/AdminViewProduct'
import AdminBrands from '../Component/AdminBrands'
import OrderHistory from '../Pages/User/Account/order_history/OrderHistory.jsx'
import UpdatePassword from '../Pages/User/Account/personal-info/components/UpdatePassword/UpdatePassword.jsx'
import { AuthContext } from '../context/app.context.jsx'
import NotPermitted from '../Component/NotPermitted/NotPermitted.jsx'
export default function useRouterElement() {
  const isAdminRoute = window.location.pathname.toLowerCase().startsWith('/admin')
  const userRole = 'user'

  console.log(isAdminRoute)
  const ProtectRoute = () => {
    const { isAuthenticated } = useContext(AuthContext)
    if (isAuthenticated) {
      if ((isAdminRoute && userRole === 'ADMIN') || (!isAdminRoute && (userRole === 'ADMIN' || userRole === 'user'))) {
        return <Outlet />
      } else {
        return (
          <>
            <AdminMainLayout>
              <NotPermitted />
            </AdminMainLayout>
          </>
        )
      }
    }
    return <Navigate to='/login' replace />
    // return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }
  const RejectRoute = () => {
    const { isAuthenticated } = useContext(AuthContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  const element = useRoutes([
    {
      path: '',
      element: <ProtectRoute />,
      children: [
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
          path: '/admin',
          element: (
            <AdminMainLayout>
              <div className='col-span-3 bg-gray-light  '>
                {/* Scrollable content */}
                //{' '}
                <div className=''>
                  {/* Adjust the height according to your header's height */}
                  <div className=' flex items-center justify-center'>Content overview </div>
                </div>
              </div>
            </AdminMainLayout>
          )
        },
        {
          path: '/admin/overview',
          element: (
            <AdminMainLayout>
              <div className='col-span-3 bg-gray-light  '>
                <div className=''>
                  <div className=' flex items-center justify-center'></div>
                </div>
              </div>
            </AdminMainLayout>
          )
        }
      ]
    },
    // {
    //   path: '/admin',
    //   element: (
    //     <AdminMainLayout>
    //       <div className='col-span-3 bg-gray-light  '>
    //         {/* Scrollable content */}
    //         //{' '}
    //         <div className=''>
    //           {/* Adjust the height according to your header's height */}
    //           <div className=' flex items-center justify-center'>Content overview </div>
    //         </div>
    //       </div>
    //     </AdminMainLayout>
    //   )
    // },
    // {
    //   path: '/admin/overview',
    //   element: (
    //     <AdminMainLayout>
    //       <div className='col-span-3 bg-gray-light  '>
    //         <div className=''>
    //           <div className=' flex items-center justify-center'></div>
    //         </div>
    //       </div>
    //     </AdminMainLayout>
    //   )
    // },
    {
      path: '/admin/post',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Content post </div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/products',
      element: (
        <AdminMainLayout>
          <AdminProducts />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/products/add-product',
      element: (
        <AdminMainLayout>
          <AdminAddProduct />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/products/update/:productID',
      element: (
        <AdminMainLayout>
          <AdminEditProduct />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/products/:productID',
      element: (
        <AdminMainLayout>
          <AdminViewProduct />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/categories',
      element: (
        <AdminMainLayout>
          <AdminCategories />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/orders',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>User order</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/reports',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>User reports</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/receipts',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>User receipts</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/suppliers',
      element: (
        <AdminMainLayout>
          <h1>This is suppliers</h1>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/brands',
      element: (
        <AdminMainLayout>
          <AdminBrands />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/users',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Users</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/posts',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Post</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/comment_review',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>comment_review</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/illness',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>illness</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/setting',
      element: (
        <AdminMainLayout>
          <div className='col-span-3 bg-gray-light  '>
            {/* Scrollable content */}
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>settings</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '',
      element: <RejectRoute />,
      children: [
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
      path: '/',
      index: true,
      element: (
        <div>
          <HomeUser />
        </div>
      )
    }
  ])

  return element
}
