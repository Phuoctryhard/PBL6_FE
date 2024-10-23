import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { SideBarItem } from './Component/SideBarItem'
import {
  ArchiveBox,
  ArrowDown2,
  More,
  Bill,
  Blogger,
  Element,
  FavoriteChart,
  Hospital,
  Keyboard,
  MedalStar,
  ReceiptEdit,
  Setting2,
  User,
  HambergerMenu,
  UserAdd
} from 'iconsax-react'
import './Sidebar.css'
const Sidebar = () => {
  const Items = [
    { id: 'products', name: 'Danh sách sản phẩm' },
    { id: 'categories', name: 'Danh mục sản phẩm' }
  ]

  const Users = [
    { id: 1, name: 'Khách hàng' },
    { id: 2, name: 'Admin' }
  ]

  const [selectedId, setSelectedId] = useState(null)
  const [showProduct, setShowProduct] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [activeNav, setActiveNav] = useState(null)
  const [maxHeightProduct, setMaxHeightProduct] = useState('0px')
  const [maxHeightUser, setMaxHeightUser] = useState('0px')
  const productRef = useRef(null)
  const userRef = useRef(null)
  const [showSidebar, setShowSidebar] = useState(true)
  useEffect(() => {
    if (showProduct) {
      setMaxHeightProduct(`${productRef.current.scrollHeight}px`)
    } else {
      setMaxHeightProduct('0px')
    }
  }, [showProduct])

  useEffect(() => {
    if (showUser) {
      setMaxHeightUser(`${userRef.current.scrollHeight}px`)
    } else {
      setMaxHeightUser('0px')
    }
  }, [showUser])

  const handleNavClick = (navId) => {
    setActiveNav(navId)
    setShowProduct(navId === 'products' ? !showProduct : false)
    setShowUser(navId === 'users' ? !showUser : false)
  }

  const handleSubNavClick = (itemId) => {
    setSelectedId(itemId)
    setActiveNav(null)
  }
  return (
    <nav className='navBar min-w-[256px] bg-[#283342] text-[#ffffff] h-[100vh] overflow-y-auto overflow-x-hidden'>
      <div className='navBar__header sticky top-0 left-0 w-[100%]'>
        <div className='navBar__logo bg-[#1D242E] py-[9px] px-[24px] flex items-center min-w-[256px] h-[60px] z-[1]'>
          <img
            src='/assets/images/Admin_homepage_logo.png'
            alt='Admin-homepage-logo'
            className='w-[42px] h-[42px] mr-[16px]'
          />
          <span className='logo__name text-[18px] text-[#FFFFFF]'>Pharmarcy</span>
        </div>
        <div className='navBar__info h-[102px] flex justify-between items-center px-[24px] py-[30px] bg-[#283342] min-w-[256px]'>
          <div className='flex relative'>
            <img
              src='https://tse1.mm.bing.net/th?id=OIP.nYLK8kqqUKVLIWBkuEBBGQHaHa&pid=Api&P=0&h=220'
              alt='no image'
              className='navBar__avatar w-[42px] h-[42px] rounded-[4px] mr-[16px]'
            />
            <div className='status inline-block absolute w-4 h-4 rounded-[50%] bg-[#2ed47a] bottom-1 left-9 border-2 border-solid border-[#2e3744]'></div>
            <div className='text-[11px] flex flex-col justify-between items-start'>
              <span className='text-[14px]'>Minh đẹp trai</span>
              <span className='text-[#d6b80d]'>Super admin</span>
            </div>
          </div>
          <div>
            <More size={20} color='#ffffff' />
          </div>
        </div>
      </div>
      <div className='navBar__menu flex flex-col text-[14px] min-w-[256px]'>
        <NavLink
          to='/admin/overview'
          className={activeNav === 'overview' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('overview')}
        >
          <SideBarItem name='Tổng quan' iconName={<Element className='w-6' />} />
        </NavLink>
        <NavLink
          className={activeNav === 'products' ? 'bg-[#008f99]' : ''}
          onClick={() => {
            handleNavClick('products')
            setSelectedId(null)
          }}
        >
          <SideBarItem
            name='Sản phẩm'
            iconName={<ArchiveBox className='w-6' />}
            arrowIcon={
              <ArrowDown2
                size={16}
                color='#ffffff'
                onClick={() => {
                  handleNavClick('products')
                  setSelectedId(null)
                }}
              />
            }
          />
        </NavLink>
        {
          <div
            ref={productRef}
            className={`bg-[#283342] overflow-hidden transition-[max-height] duration-[0.5s] ease-in-out`}
            style={{
              maxHeight: maxHeightProduct
            }}
          >
            <ul>
              {Items.map((item) => (
                <li
                  key={item.id}
                  className=''
                  onClick={() => {
                    handleSubNavClick(item.id)
                  }}
                  style={{ backgroundColor: item.id === selectedId ? '#008f99' : '' }}
                >
                  <NavLink
                    to={`/admin/${item.id}`}
                    className='pl-[62px] px-[24px] h-[46px] flex items-center justify-start cursor-pointer'
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        }
        <NavLink
          to='/admin/orders'
          className={activeNav === 'orders' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('orders')}
        >
          <SideBarItem name='Đơn hàng' iconName={<Bill className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/reports'
          className={activeNav === 'reports' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('reports')}
        >
          <SideBarItem name='Báo cáo' iconName={<FavoriteChart className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/receipts'
          className={activeNav === 'receipts' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('receipts')}
        >
          <SideBarItem name='Nhập kho' iconName={<ReceiptEdit className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/suppliers'
          className={activeNav === 'suppliers' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('suppliers')}
        >
          <SideBarItem name='Nhà cung cấp' iconName={<UserAdd className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/brands'
          className={activeNav === 'brands' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('brands')}
        >
          <SideBarItem name='Nhãn hàng' iconName={<MedalStar className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/users'
          className={activeNav === 'users' ? 'bg-[#008f99]' : ''}
          onClick={() => {
            handleNavClick('users')
            setSelectedId(null)
          }}
        >
          <SideBarItem
            name='Người dùng'
            iconName={<User className='w-6' />}
            arrowIcon={
              <ArrowDown2
                size={16}
                color='#ffffff'
                onClick={() => {
                  handleNavClick('products')
                  setSelectedId(null)
                }}
              />
            }
          />
        </NavLink>
        {
          <div
            ref={userRef}
            className={`bg-[#283342] overflow-hidden transition-[max-height] duration-[0.5s] ease-in-out`}
            style={{
              maxHeight: maxHeightUser
            }}
          >
            <ul>
              {Users.map((item) => (
                <li
                  key={item.id}
                  className='pl-[62px] px-[24px] h-[46px] margin-auto flex items-center justify-start cursor-pointer'
                  onClick={() => {
                    handleSubNavClick(item.id)
                  }}
                  style={{ backgroundColor: item.id === selectedId ? '#008f99' : '' }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        }
        <NavLink
          to='/admin/posts'
          className={activeNav === 'posts' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('posts')}
        >
          <SideBarItem name='Bài viết' iconName={<Blogger className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/comment_review'
          className={activeNav === 'comment_review' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('comment_review')}
        >
          <SideBarItem name='Bình luận đánh giá' iconName={<Keyboard className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/illness'
          className={activeNav === 'illness' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('illness')}
        >
          <SideBarItem name='Bệnh tật' iconName={<Hospital className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/setting'
          className={activeNav === 'setting' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('setting')}
        >
          <SideBarItem name='Cài đặt' iconName={<Setting2 className='w-6' />} />
        </NavLink>
      </div>
    </nav>
  )
}

export default Sidebar
