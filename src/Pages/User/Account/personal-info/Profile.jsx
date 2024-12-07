import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../context/app.context'
import { useMutation } from '@tanstack/react-query'
import authAPI from '../../../../Api/user/auth'

//
export default function Profile() {
  const [previewImage, setPreviewImage] = useState(null) // Lưu URL của ảnh preview
  const { isProfile } = useContext(AuthContext)
  console.log(isProfile)
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // or null, depending on your form requirements
    email: '',
    avatar: null, // if avatar is an image URL or file, keep it as an empty string or null
    birthday: '', // ensure the format matches the expected date format
    gender: null // assuming gender is null initially
  })
  // Gán dữ liệu khi component mount
  useEffect(() => {
    if (isProfile) {
      setFormData({
        name: isProfile.user_fullname || '',
        phone: isProfile?.user_phone, // Ensure phone is either a string or null
        email: isProfile.email || '', // email should be an empty string if not available
        birthday: isProfile.user_birthday || '2024-12-25', // Default to empty string if no birthday
        avatar: isProfile.user_avatar, // Default to empty string if no avatar
        gender: isProfile?.user_gender // Default to null if no gender
      })
    }
  }, [])

  // const [date, setDate] = useState('2002-02-12')
  const ImageRef = useRef()
  const handleOpenInput = () => {
    ImageRef.current.click()
  }
  const handleFileChange = (e) => {
    const File = e.target.files[0]
    console.log(File)
    if (File) {
      const previewUrl = URL.createObjectURL(File) // Tạo URL tạm thời cho ảnh
      setPreviewImage(previewUrl)
      setFormData((prevState) => ({
        ...prevState,
        avatar: File
      }))
    }
  }
  // Hàm xử lý onChange
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const muTateUpdateProfile = useMutation({
    mutationFn: authAPI.updateProfile
  })
  // gửi data
  const handleSubmit = (event) => {
    event.preventDefault()
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })
    // muTateUpdateProfile.mutate(formDataToSend)
    console.log('Dữ liệu gửi:', Object.fromEntries(formDataToSend))
    // Gửi formDataToSend qua API
  }

  return (
    <div className=' px-3 py-3 '>
      <div className='border-b border-b-gray-300'>
        <p className='capitalize text-xl text-[#2A2A2A] font-bold'>Hồ sơ của tôi </p>

        <div className='mt-1 pb-3 text-sm'>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
      </div>

      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start text-sm'>
        <form className='mt-6 flex-grow pr-10 md:mt-1' onSubmit={handleSubmit}>
          <div className=' flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <input
                type='text'
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                value={formData.name}
                onChange={handleChange}
                name='name'
              />
            </div>
          </div>
          <div className=' mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <div className='text-gray-700 w-full px-3 py-2'>{formData.email}</div>
            </div>
          </div>
          <div className='mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4  capitalize text-right'>Điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <input
                type='number'
                className='w-full rounded-sm border border-gray-300 px-3 py-2 '
                value={formData.phone}
                onChange={handleChange}
                name='phone'
              />
            </div>
          </div>

          <div className='mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Ngày Sinh</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <input
                type='date'
                name='birthday'
                value={formData.birthday}
                onChange={handleChange}
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>

          <div className='mt-8 flex flex-wrap sm:flex-row items-center'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Giới tính</div>
            <div className='sm:w-[80%] sm:pl-5 '>
              <select
                className='px-3 py-2 w-full border border-gray-300 rounded-sm outline-none'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              >
                <option value='' disabled>
                  Chọn giới tính
                </option>
                <option value={0}>Nam</option>
                <option value={1}>Nữ</option>
                <option value='other'>Khác</option>
              </select>
            </div>
          </div>

          <div className='mt-8 flex flex-wrap sm:flex-row items-center justify-between'>
            <div className='sm:w-[20%] sm:pl-4 truncate capitalize text-right'>Mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5 flex justify-end items-center text-blue  '>
              <Link to='/account/profile/update-password' className='py-2'>
                Cập nhật
              </Link>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </div>
          </div>
          <div className='mt-8 flex flex-wrap sm:flex-row items-center justify-between'>
            <div className='w-[40%] flex justify-center'>
              <button
                type='onSubmit'
                className='p-4 rounded-lg border bg-blue  mt-6  text-center text-white font-semibold'
              >
                Lưu thay đổi
              </button>
            </div>
            <div className='w-[60%] flex justify-center'></div>
          </div>
        </form>

        <div className='justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center '>
            <div className='my-5 h-24 w-24'>
              {previewImage && <img src={previewImage} alt='' className='w-full h-full rounded-full object-cover' />}
              {!previewImage && (
                <img src={formData.avatar} alt='' className='w-full h-full rounded-full object-cover' />
              )}
            </div>

            <input type='file' accept='.jpg,.jpeg,.png' className='hidden' ref={ImageRef} onChange={handleFileChange} />
            <button
              className=' px-4 py-2 rounded-sm shadow-sm  border border-gray-400 bg-white text-sm text-gray-600 text-center hover:bg-gray-100'
              onClick={handleOpenInput}
            >
              Chọn Ảnh{' '}
            </button>
            <div className='mt-2 text-gray-400 '>Dụng lượng file tối đa 1 MB</div>
            <div className='mt-1 text-gray-400 '>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
        <div className=''></div>
      </div>
    </div>
  )
}
