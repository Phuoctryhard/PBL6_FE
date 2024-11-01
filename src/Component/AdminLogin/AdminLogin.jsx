import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import anh from './_480f2c92-d896-48ef-978c-6c37301968f7.png'
import { schemaLogin } from '../ValidateScheme/Validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authAPI from '../../Api/user/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/app.context'
export default function AdminLogin() {
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
    mutationFn: authAPI.loginAccountAdmin
  })
  const onSubmit = handleSubmit((data) => {
    // gửi lên api data
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    mutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.status >= 400) throw new Error(data.messages)
        login(data.data, data.data.access_token)
        const role = data.data.role
        if (role == 'user') {
          toast.success('Đăng nhập thành công')
          navigate('/')
        } else {
          toast.success('Đăng nhập thành công')
          navigate('/admin')
        }
      },
      onError: (data) => {
        toast.error(`Đăng nhập thất bại: ${data.message}`)
      }
    })
  })
  return (
    <div className=' '>
      <div className=' lg:grid-cols-6 bg-blue grid h-full'>
        <div className=' hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:col-start-1 lg:col-span-3 '>
          <div className='w-[200px] mb-10 rounded-sm '>
            <img src={anh} alt='' className='rounded-sm' />
          </div>
          <div className='text-2xl text-white '>Nền Tảng thương mại điện tử </div>
          <div className='text-2xl mt-2 text-white'>yêu thích ở Đông Nam Á và Đài Loan</div>
        </div>
        <div className='col-start-4 col-span-2 p-7'>
          <div className=' bg-white  rounded shadow-sm '>
            <form action='' className=' bg-white rounded shadow-sm p-7' onSubmit={onSubmit} noValidate>
              <div className='text-3xl '>Đăng Nhập</div>
              {/* Nên có 1 thẻ div bao bọc input : để có message báo lỗi đặt trong thẻ dĩ luôn  */}
              <div className='mt-8'>
                <input
                  placeholder='Email'
                  {...register('email')}
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.email?.message}</div>
              </div>
              <div className='mt-8'>
                <input
                  placeholder='Password'
                  type='password'
                  name='password'
                  {...register('password')}
                  autoComplete='on'
                  className=' p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm '
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.password?.message}</div>
              </div>

              <div className='mt-10'>
                {/* w-full: 100% */}
                <button
                  className='w-full text-center bg-orange py-4 px-2 uppercase rounded-sm text-white hover:bg-red-600'
                  // loginMutation.isPending được sử dụng để kiểm tra xem mutation (đăng nhập) có đang trong quá trình xử lý không. Nếu isPending là true thì disabled
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-5 flex justify-between text-[#05a]'>
                <span>Quên mật khẩu</span>
                <span>Đăng nhập với SMS</span>
              </div>
              <div className='flex items-center gap-2 mt-3'>
                <div className='h-[1px] grow bg-gray-200'></div>
                <span className='text-gray-500'>hoặc</span>
                <div className='h-[1px] grow bg-gray-200'></div>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className=' text-slate-400'>Bạn chưa có tài khoản Pharmacity? </span>
                  <Link to='/Register' className='text-red-600 ml-1'>
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
