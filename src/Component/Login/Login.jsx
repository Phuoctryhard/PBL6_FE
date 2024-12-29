import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { schemaLogin } from '../ValidateScheme/Validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAPI from '../../Api/user/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/app.context'
import { Facebook, Gift, Google } from 'iconsax-react'
import { Helmet } from 'react-helmet-async'
export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaLogin)
  })
  // Mutations
  const mutation = useMutation({
    mutationFn: authAPI.loginAccount
  })
  const onSubmit = handleSubmit((data) => {
    // gửi lên api data
    mutation.mutate(data, {
      onSuccess: (data) => {
        login(data.data.data, data.data.data.access_token)
        const role = data.data.data.role
        if (role === 'user') {
          console.log(data?.data?.messages[0])
          toast.success(data?.data?.messages[0])
          navigate('/')
        } else {
          navigate('/admin')
        }
      },
      onError: (error) => {
        if (error.response.data.messages[0] == 'Lỗi token ') {
        }
        console.log(error.response.data.messages[0])
        toast.error(error.response.data.messages[0])
      }
    })
  })
  return (
    <div className='h-full'>
      <Helmet>
        <title>Đăng Nhập Tài Khoản</title>
        <meta name='description' content='Trang đặng nhập website bán thuốc pbl6' />
      </Helmet>
      <div className='lg:grid-cols-6 bg-[rgb(39,107,68,0.4)] grid h-full'>
        <div className='hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:col-start-1 lg:col-span-3'>
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[350px] mb-7 rounded-sm '>
              <img src='/assets/images/Logo_Pbl6.png' alt='Logo' className='rounded-sm w-full object-cover' />
            </div>
            <div className='flex flex-col gap-6 justify-center items-center'>
              <span className='text-2xl text-lime-700 font-semibold'>Nền tảng thương mại điện tử</span>
              <span className='text-2xl text-lime-700 font-semibold'>Mua sắm dễ dàng, tiện lợi và an toàn</span>
            </div>
          </div>
        </div>
        <div className='col-start-4 col-span-2 p-7 justify-center flex items-center'>
          <div className='bg-white  rounded shadow-sm   w-full'>
            <form action='' className=' bg-white rounded-xl shadow-sm p-7' onSubmit={onSubmit} noValidate>
              <div className='text-3xl text-center'>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  placeholder='Email'
                  {...register('email')}
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                />
                <div className='mt-1 text-[#05a] text-sm min-h-[1.5rem]'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  placeholder='Password'
                  type='password'
                  name='password'
                  {...register('password')}
                  autoComplete='on'
                  className=' p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm '
                />
                <div className='mt-1 text-[#05a] text-sm min-h-[1.5rem]'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <button className='w-full text-center bg-[#05a] py-4 px-2 uppercase rounded-sm text-white hover:bg-opacity-90'>
                  Đăng nhập
                </button>
              </div>
              <div className='mt-5 flex justify-end text-[#05a] text-sm flex-wrap gap-2 text-center'>
                <Link to='/forgot-password' className='text-blue ml-1'>
                  Quên mật khẩu
                </Link>
              </div>
              <div className='flex items-center gap-2 mt-3'>
                <div className='h-[1px] grow bg-gray-200'></div>
                <span className='text-gray-500'>hoặc</span>
                <div className='h-[1px] grow bg-gray-200'></div>
              </div>
              <div className='text-gray-600 flex justify-center space-x-4 mt-1'>
                <Google size='32' color='#555555' />
                <Facebook size='32' color='#555555' />
                <Gift size='32' color='#555555' />
              </div>

              <div className='mt-4 text-center'>
                <div className='flex items-center justify-center gap-[0.5rem] flex-wrap'>
                  <span className='text-slate-400'>Bạn chưa có tài khoản? </span>
                  <Link to='/Register' className='text-blue ml-1'>
                    Đăng Kí
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
