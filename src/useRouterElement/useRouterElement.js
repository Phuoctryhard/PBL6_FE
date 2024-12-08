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
  AdminDelivery,
  AdminReviewComment,
  AdminInventory,
  AdminManageRole
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
import DetailOrderHistory from '../Pages/User/Account/order_history/DetailOrderHistory.jsx'
import StatusPayos from '../Pages/User/StatusPayos/StatusPayos.jsx'
import CategoryDisease from '../Pages/User/Disease/CategoryDisease/CategoryDisease.jsx'
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
              path: '/account/order-history/:slug',
              element: <DetailOrderHistory />
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
      path: '/cancel',
      element: <StatusPayos />
    },
    {
      path: '/success',
      element: <StatusPayos />
    },

    {
      path: '/auth/forgot-password/admin',
      element: <AdminResetPassword />
    },

    { path: '/admin', element: <Navigate to='/admin/overview' /> },
    {
      path: '/admin',
      element: (
        <AdminMainLayout scrollBar='simpleBar'>
          <Outlet />
        </AdminMainLayout>
      ),
      children: [
        { path: 'overview', element: <AdminOverview /> },
        {
          path: 'inventory',
          element: <AdminInventory />
        },
        {
          path: 'products',
          element: <Outlet />,
          children: [
            { path: '', element: <AdminProducts /> },
            { path: 'add-product', element: <AdminAddProduct /> },
            { path: 'update/:productID', element: <AdminEditProduct /> },
            { path: ':productID', element: <AdminViewProduct /> }
          ]
        },
        { path: 'categories', element: <AdminCategories /> },
        { path: 'manage-admins', element: <AdminManagement /> },
        { path: 'roles', element: <AdminManageRole /> },
        { path: 'manage-users', element: <AdminCustomer /> },
        {
          path: 'orders',
          element: <Outlet />,
          children: [
            { path: '', element: <AdminOrders /> },
            { path: ':id', element: <AdminViewOrder /> }
          ]
        },
        { path: 'deliveries', element: <AdminDelivery /> },
        {
          path: 'imports',
          element: <Outlet />,
          children: [
            { path: '', element: <AdminImports /> },
            { path: ':id', element: <AdminDetailImport /> }
          ]
        },
        { path: 'suppliers', element: <AdminSuppliers /> },
        { path: 'brands', element: <AdminBrands /> },
        {
          path: 'comment_review',
          element: <AdminReviewComment />
        },
        {
          path: 'disease',
          element: <Outlet />,
          children: [
            { path: '', element: <AdminIllness /> },
            { path: 'add', element: <AdminAddIllness /> },
            { path: 'update/:id', element: <AdminUpdateIllness /> }
          ]
        },
        { path: 'setting', element: <AdminSetting /> }
      ]
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
      path: '/category',
      element: (
        <MainLayoutUser>
          <CategoryListProduct />
        </MainLayoutUser>
      )
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
      path: '/auth/verify-email/user',
      element: <VerifyEmail />
    },
    {
      path: '/auth/verify-email/admin',
      element: <AdminVerifyEmail />
    },
    {
      path: '/categorybenh/:slug',
      element: (
        <MainLayoutUser>
          <CategoryDisease />
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
