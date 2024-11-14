import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import React, { useContext } from 'react'
import {
  AdminVerifyEmail,
  AdminMainLayout,
  AdminProducts,
  AdminCategories,
  AdminAddProduct,
  AdminEditProduct,
  AdminViewProduct,
  AdminBrands,
  AdminManagement,
  AdminSetting,
  AdminImports,
  AdminDetailImport,
  AdminOverview,
  AdminLogin,
  AdminSuppliers,
  AdminCustomer,
  AdminResetPassword,
  AdminOrders,
  AdminIllness,
  AdminAddIllness,
  AdminUpdateIllness,
  AdminViewOrder,
  AdminDelivery
} from '../Component'
import HomeUser from '../Pages/User/HomeUser/HomeUser.js'
import RegisterLayout from '../Layouts/RegisterLayout/RegisterLayout.jsx'
import Login from '../Component/Login/Login.jsx'
import Register from '../Component/Register/index.js'
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
import { AuthContext } from '../context/app.context.jsx'
import NotPermitted from '../Component/NotPermitted/NotPermitted.jsx'

import Checkout from '../Pages/User/Checkout/Checkout.jsx'
import Disease from '../Pages/User/Disease/Disease.jsx'
import DetailDisease from '../Pages/User/Disease/DetailDisease/DetailDisease.jsx'
export default function useRouterElement() {
  const isAdminRoute = window.location.pathname.toLowerCase().startsWith('/admin')

  const userRole = 'admin'

  const ProtectRoute = () => {
    const { isAuthenticated } = useContext(AuthContext)
    if (isAuthenticated) {
      if ((isAdminRoute && userRole === 'admin') || (!isAdminRoute && (userRole === 'admin' || userRole === 'user'))) {
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

    if (!isAuthenticated) {
      return <Navigate to='/login' />
    }

    if (userRole === 'admin') {
      return <Navigate to='/admin' />
    }

    return <Outlet />
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
          path: '/category',
          element: (
            <MainLayoutUser>
              <CategoryListProduct />
            </MainLayoutUser>
          )
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
          path: '/Checkout',
          element: (
            <MainLayoutUser>
              <Checkout />
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
        }
      ]
    },
    {
      path: '/auth/verify-email/admin',
      element: <AdminVerifyEmail />
    },
    {
      path: '/auth/forgot-password/admin',
      element: <AdminResetPassword />
    },
    {
      path: '/admin',
      element: <Navigate to='/admin/overview' />
    },
    {
      path: '/admin/overview',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <AdminOverview />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/inventory',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <div>
            <h1>This is inventory</h1>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/products',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <Outlet />
        </AdminMainLayout>
      ),
      children: [
        {
          path: '',
          element: <AdminProducts />
        },
        {
          path: 'add-product',
          element: <AdminAddProduct />
        },
        {
          path: 'update/:productID',
          element: <AdminEditProduct />
        },
        {
          path: ':productID',
          element: <AdminViewProduct />
        }
      ]
    },
    {
      path: '/admin/categories',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <AdminCategories />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/manage-admins',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <AdminManagement />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/manage-users',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <AdminCustomer />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/orders',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <Outlet />
        </AdminMainLayout>
      ),
      children: [
        {
          path: '',
          element: <AdminOrders />
        },
        {
          path: ':id',
          element: <AdminViewOrder />
        }
      ]
    },

    {
      path: '/admin/payments',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <div className='col-span-3 bg-gray-light  '>
            <h1>payment</h1>
          </div>
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/deliveries',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <AdminDelivery />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/imports',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <Outlet />
        </AdminMainLayout>
      ),
      children: [
        {
          path: '',
          element: <AdminImports />
        },
        {
          path: ':id',
          element: <AdminDetailImport />
        }
      ]
    },
    {
      path: '/admin/suppliers',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <AdminSuppliers />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/brands',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <AdminBrands />
        </AdminMainLayout>
      )
    },
    {
      path: '/admin/users',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <div className='col-span-3 bg-gray-light  '>
            <div className=''>
              {/* Adjust the height according to your header's height */}
              <div className='h-[1000px] flex items-center justify-center'>Users</div>
            </div>
          </div>
        </AdminMainLayout>
      )
    },
    // {
    //   path: '/admin/comment_review',
    //   element: (
    //     <AdminMainLayout scrollBar='simpleBar'>
    //       <div className='col-span-3 bg-gray-light  '>
    //         {/* Scrollable content */}
    //         <div className=''>
    //           {/* Adjust the height according to your header's height */}
    //           <div className='h-[1000px] flex items-center justify-center'>comment_review</div>
    //         </div>
    //       </div>
    //     </AdminMainLayout>
    //   )
    // },
    {
      path: '/admin/disease',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <Outlet />
        </AdminMainLayout>
      ),
      children: [
        {
          path: '',
          element: <AdminIllness />
        },
        {
          path: 'add',
          element: <AdminAddIllness />
        },
        {
          path: 'update/:id',
          element: <AdminUpdateIllness />
        }
      ]
    },
    {
      path: '/admin/setting',
      element: (
        <AdminMainLayout>
          <AdminSetting />
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
          path: '/admin/login',
          element: <AdminLogin />
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
      path: '/benh',
      element: (
        <MainLayoutUser>
          <Disease />
        </MainLayoutUser>
      )
    },
    {
      path: '/benh/:slug',
      element: (
        <MainLayoutUser>
          <DetailDisease />
        </MainLayoutUser>
      )
    },
    {
      path: '/:idproduct',
      element: (
        <MainLayoutUser>
          <DetailProduct />
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
