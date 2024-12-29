import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { schemaForgotPassword } from '../ValidateScheme/Validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authAPI from '../../Api/user/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/app.context'
import { Helmet } from 'react-helmet-async'
export default function Resendemail() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaForgotPassword)
  })
  // Mutations
  const mutation = useMutation({
    mutationFn: authAPI.resend_verify_Email
  })
  const onSubmit = handleSubmit((data) => {
    // gửi lên api data
    mutation.mutate(data.email, {
      onSuccess: (data) => {
        if (data.status >= 400) throw new Error(data.messages)
        toast.success('Mã xác thực đã được gửi đến email của bạn !')
        navigate('/login')
      },
      onError: (error) => {
        toast.error(error.response.data.messages[0])
      }
    })
  })
  return (
    <div className='h-screen'>
      <Helmet>
        <title>Xác thực Email</title>
        <meta name='description' content='Xác thực email' />
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
              <div className='text-3xl text-center'>Trang xác thực email</div>
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
              <div className='mt-2 flex gap-4'>
                <button className='w-full text-center bg-[#05a] py-4 px-2 uppercase rounded-sm text-white hover:bg-opacity-90'>
                  Submit
                </button>
                <button
                  className='w-full text-center bg-[#05a] py-4 px-2 uppercase rounded-sm text-white hover:bg-opacity-90'
                  type='button'
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
