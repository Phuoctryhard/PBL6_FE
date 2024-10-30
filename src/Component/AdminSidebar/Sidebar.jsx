import { useAuth, AuthProvider } from '../../context/app.context'
import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
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
  UserAdd,
  UserSquare,
  Logout
} from 'iconsax-react'
import { AdminAPI } from '../../Api/admin'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Sidebar = () => {
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    localStorage.removeItem('accesstoken')
    setIsAuthenticated(false)
    navigate('/admin/login')
  }
  const location = useLocation()

  //#region info admin
  const [adminFullName, setAdminFullName] = useState('')
  const [email, setEmail] = useState('')
  const [Avatar, setAvatar] = useState(null)
  const [adminRole, setAdminRole] = useState('')
  //#endregion

  //#region nav and subNav
  //nav selected and active state change
  const [selectedId, setSelectedId] = useState(null)
  const [activeNav, setActiveNav] = useState(null)

  //subNav data
  const Inventory = [
    { id: 'products', name: 'Products' },
    { id: 'categories', name: 'Categories' }
  ]

  const Users = [
    { id: 'customers', name: 'Customers' },
    { id: 'manage-admins', name: 'Admin' }
  ]

  //show subNav
  const [showInventory, setShowInventory] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [maxHeightProduct, setMaxHeightProduct] = useState('0px')
  const [maxHeightUser, setMaxHeightUser] = useState('0px')
  const productRef = useRef(null)
  const userRef = useRef(null)

  //handle nav and subNav click
  const handleNavClick = (navId) => {
    setActiveNav(navId)
    setShowInventory(navId === 'inventory' ? !showInventory : false)
    setShowUser(navId === 'users' ? !showUser : false)
  }

  const handleSubNavClick = (itemId) => {
    setSelectedId(itemId)
    setActiveNav(null)
  }

  useEffect(() => {
    if (showInventory) {
      setMaxHeightProduct(`${productRef.current.scrollHeight}px`)
    } else {
      setMaxHeightProduct('0px')
    }
  }, [showInventory])

  useEffect(() => {
    if (showUser) {
      setMaxHeightUser(`${userRef.current.scrollHeight}px`)
    } else {
      setMaxHeightUser('0px')
    }
  }, [showUser])

  //handle subNav active when refresh page
  useEffect(() => {
    const path = location.pathname
    const navID = path.split('/')[2]
    const subNavID = ['products', 'categories', 'customers', 'manage-admins']
    if (subNavID.includes(navID)) {
      if (navID === 'products' || navID === 'categories') {
        setActiveNav(null)
        setShowInventory(true)
        setSelectedId(navID)
      } else if (navID === 'manage-admins') {
        setActiveNav(null)
        setShowUser(true)
        setSelectedId(navID)
      }
    } else {
      handleNavClick(navID)
    }
  }, [])
  //#endregion

  //#region admin profile
  //#region fetch admin profile
  const fetchAdminProfile = async () => {
    const response = await AdminAPI.getAdmin(token)
    if (!response.ok) {
      const { message, data } = await response.json()
      if (response.status === 401) {
        handleUnauthorized()
      } else if (response.status === 422) {
        setStatus(422)
        setMessageResult(`Invalid data: ${data} with message: ${message}`)
      } else {
        setStatus(response.status)
        setMessageResult(`Error get profile: ${data} with message: ${message}`)
      }
      return
    }
    const result = await response.json()
    const { data } = result
    setAdminFullName(data.admin_fullname)
    setEmail(data.email)
    setAvatar(data.admin_avatar)
    switch (data.admin_is_admin) {
      case 0:
        setAdminRole('User')
        break
      case 1:
        setAdminRole('Admin')
        break
      case 2:
        setAdminRole('Super Admin')
        break
    }
  }
  useEffect(() => {
    fetchAdminProfile()
  }, [])
  //#endregion

  //#region show admin profile options
  const [showProfileOptions, setShowProfileOptions] = useState(false)
  const MoreRef = useRef(null)
  const ProfileSettingRef = useRef(null)
  let closeTimeout

  //handle show profile options
  const handleMouseEnterShowProfile = () => {
    clearTimeout(closeTimeout)
    setShowProfileOptions(true)
  }

  const handleMouseLeaveCloseProfile = () => {
    closeTimeout = setTimeout(() => {
      setShowProfileOptions(false)
    }, 200)
  }

  useEffect(() => {
    return () => {
      clearTimeout(closeTimeout)
    }
  }, [])

  //handle click profile options
  const handleMyProfileClick = () => {
    setShowProfileOptions(false)
    handleNavClick('setting')
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('accesstoken')
    setIsAuthenticated(false)
    navigate('/admin/login')
  }
  //#endregion

  return (
    <nav className='navBar w-[256px] bg-[#283342] text-[#ffffff] h-[100vh] overflow-y-auto overflow-x-hidden'>
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
          <div className='flex relative w-full'>
            <img
              src={Avatar || '/assets/images/default-avatar.png'}
              alt='no image'
              className='navBar__avatar w-[42px] h-[42px] rounded-[4px] mr-[16px] object-cover'
            />
            <div className='status inline-block absolute w-4 h-4 rounded-[50%] bg-[#2ed47a] bottom-1 left-9 border-2 border-solid border-[#2e3744]'></div>
            <div className='text-xs flex flex-col justify-between items-start'>
              <span className='text-sm whitespace-nowrap overflow-hidden text-ellipsis w-[80%]'>{adminFullName}</span>
              <span className='text-[#d6b80d]'>{adminRole}</span>
            </div>
          </div>
          <More
            ref={MoreRef}
            size={20}
            color='#ffffff'
            className='rotate-90 cursor-pointer'
            onMouseEnter={handleMouseEnterShowProfile}
            onMouseLeave={handleMouseLeaveCloseProfile}
          />
          <div
            ref={ProfileSettingRef}
            className='w-32 h-max bg-[#ffffff] absolute right-2 top-[83%] flex flex-col box-border rounded-md text-xs after:content-[""] after:absolute after:bottom-[85%] after:right-2 after:w-4 after:h-4 after:bg-[#ffffff] after:rotate-45 after:rounded-tl-md after:shadow-[-2px_-2px_0_0_#ffffff] border border-solid border-[#1D242E] origin-[87.8%_0%] transition-all duration-500 ease'
            onMouseEnter={handleMouseEnterShowProfile}
            onMouseLeave={handleMouseLeaveCloseProfile}
            style={{
              opacity: showProfileOptions ? 1 : 0,
              visibility: showProfileOptions ? 'visible' : 'hidden',
              transform: showProfileOptions ? 'scale(1)' : 'scale(0)'
            }}
          >
            <Link to='/admin/setting'>
              <button
                className='w-full px-4 py-2.5 flex gap-3 text-[#1D242E] items-center justify-start border-b border-b-solid border-b-[rgba(29,36,46,0.3)]'
                type='button'
                onClick={handleMyProfileClick}
              >
                <UserSquare size={20} />
                <span className='select-none'>My Profile</span>
              </button>
            </Link>
            <button
              className='w-full px-4 py-2.5 flex gap-3 text-[red] items-center justify-start'
              type='button'
              onClick={handleLogoutClick}
            >
              <Logout size={20} />
              <span className='select-none'>LogOut</span>
            </button>
          </div>
        </div>
      </div>
      <div className='navBar__menu flex flex-col text-[14px] min-w-[256px]'>
        <NavLink
          to='/admin/overview'
          className={activeNav === 'overview' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('overview')}
        >
          <SideBarItem name='Overview' iconName={<Element className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/inventory'
          className={activeNav === 'inventory' ? 'bg-[#008f99]' : ''}
          onClick={() => {
            handleNavClick('inventory')
            setSelectedId(null)
          }}
        >
          <SideBarItem
            name='Inventory'
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
              {Inventory.map((item) => (
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
          <SideBarItem name='Orders' iconName={<Bill className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/reports'
          className={activeNav === 'reports' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('reports')}
        >
          <SideBarItem name='Reports' iconName={<FavoriteChart className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/imports'
          className={activeNav === 'imports' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('imports')}
        >
          <SideBarItem name='Imports' iconName={<ReceiptEdit className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/suppliers'
          className={activeNav === 'suppliers' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('suppliers')}
        >
          <SideBarItem name='Suppliers' iconName={<UserAdd className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/brands'
          className={activeNav === 'brands' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('brands')}
        >
          <SideBarItem name='Brands' iconName={<MedalStar className='w-6' />} />
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
            name='Users'
            iconName={<User className='w-6' />}
            arrowIcon={
              <ArrowDown2
                size={16}
                color='#ffffff'
                onClick={() => {
                  handleNavClick('users')
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
          to='/admin/posts'
          className={activeNav === 'posts' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('posts')}
        >
          <SideBarItem name='Posts' iconName={<Blogger className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/comment_review'
          className={activeNav === 'comment_review' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('comment_review')}
        >
          <SideBarItem name='Comments/reviews' iconName={<Keyboard className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/illness'
          className={activeNav === 'illness' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('illness')}
        >
          <SideBarItem name='illness' iconName={<Hospital className='w-6' />} />
        </NavLink>
        <NavLink
          to='/admin/setting'
          className={activeNav === 'setting' ? 'bg-[#008f99]' : ''}
          onClick={() => handleNavClick('setting')}
        >
          <SideBarItem name='Setting' iconName={<Setting2 className='w-6' />} />
        </NavLink>
      </div>
    </nav>
  )
}

export default Sidebar
