import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import authAPI from '../../../Api/user/auth'
import { schemaResetPassword } from '../../../Component/ValidateScheme/Validate'
export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaResetPassword)
  })
  // Mutations
  const mutation = useMutation({
    mutationFn: authAPI.resetEmail
  })
  const onSubmit = handleSubmit((data) => {
    if (token) {
      data = {
        ...data,
        token: token
      }
    }
    console.log(data)
    // gửi lên api data
    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data?.data?.messages[0])
        toast.success(data?.data?.messages[0])
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      },
      onError: (error) => {
        console.log(error?.response?.data?.data[0])
        toast.error(error?.response?.data?.data[0])
      }
    })
  })
  return (
    <div className=' h-screen'>
      <div className=' lg:grid-cols-6 bg-[rgb(39,107,68,0.4)] grid h-full'>
        <div className=' hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:col-start-1 lg:col-span-3 '>
          <div className='w-[350px] mb-7 rounded-sm '>
            <img src='/assets/images/Logo_Pbl6.png' alt='' className='rounded-sm' />
          </div>
          <span className='text-2xl text-lime-700 font-semibold'>Nền tảng thương mại điện tử</span>
          <span className='text-2xl text-lime-700 font-semibold'>Mua sắm dễ dàng, tiện lợi và an toàn</span>
        </div>
        <div className='col-start-4 col-span-2 p-7 justify-center flex items-center'>
          <div className=' bg-white  rounded shadow-sm   w-full'>
            <form action='' className=' bg-white rounded shadow-sm p-7' onSubmit={onSubmit} noValidate>
              <div className='text-2xl  text-center mb-1'>
                {location.pathname === '/Register' || '/register' ? 'Reset Mật Khẩu' : ''}
              </div>
              {/* Nên có 1 thẻ div bao bọc input : để có message báo lỗi đặt trong thẻ dĩ luôn  */}

              <div className='mt-2'>
                <input
                  placeholder='Password'
                  type='password'
                  name='new_password'
                  {...register('new_password')}
                  autoComplete='on'
                  className=' p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm '
                />
                <div className='mt-1 text-[#05a] text-sm min-h-[1.5rem]'>{errors.new_password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  placeholder='Password confirmation'
                  type='password'
                  name='new_password_confirmation'
                  {...register('new_password_confirmation')}
                  autoComplete='on'
                  className=' p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm '
                />
                <div className='mt-1 text-[#05a] text-sm min-h-[1.5rem]'>
                  {errors.new_password_confirmation?.message}
                </div>
              </div>

              <div className='mt-2'>
                {/* w-full: 100% */}
                <button
                  className='w-full text-center bg-[#05a] py-4 px-2 uppercase rounded-sm text-white hover:bg-[#0d4c8b]'
                  // loginMutation.isPending được sử dụng để kiểm tra xem mutation (đăng nhập) có đang trong quá trình xử lý không. Nếu isPending là true thì disabled
                >
                  Reset
                </button>
              </div>

              <div className='flex items-center gap-2 mt-3'>
                <div className='h-[1px] grow bg-gray-200'></div>
                <span className='text-gray-500'>hoặc</span>
                <div className='h-[1px] grow bg-gray-200'></div>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className=' text-slate-400'>Bạn đã có tài khoản? </span>
                  <Link to='/login' className='text-[#05a] ml-1'>
                    Đăng nhập
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
