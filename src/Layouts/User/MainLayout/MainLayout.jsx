import React from 'react'
import Nav from '../../../Component/Nav/Nav'
import { Popover } from 'antd'
import Button1 from '../../../Component/Button/Button'
import Avatar1 from '../../../Component/Avatar/Avatar'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../../../Component/Footer'
import Cart from '../../../Pages/User/Cart'
import { useQuery } from '@tanstack/react-query'
import CartAPI from '../../../Api/user/cart'
import Header from '../../../Pages/User/HomeUser/Component/HeaderUser/Header'
export default function MainLayout({ children }) {
  const [openCategory, setopenCategory] = useState(false)

  return (
    <div>
      <Header />

      {children}

      <Footer />
    </div>
  )
}
