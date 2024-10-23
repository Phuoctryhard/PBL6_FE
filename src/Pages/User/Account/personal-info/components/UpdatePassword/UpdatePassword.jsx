import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { schemaChangePassword } from '../../../../../../Component/ValidateScheme/Validate'
import { useMutation } from '@tanstack/react-query'
import authAPI from '../../../../../../Api/user/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function UpdatePassword() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaChangePassword)
  })
  const mutate = useMutation({
    mutationFn: authAPI.changePassword,
    onSuccess: () => {
      toast.success('Cập nhật mật khẩu thành công')
      navigate('/account/profile')
    },
    onError: (errors) => {
      toast.error(errors.response.data.messages[0])
    }
  })
  const onSubmit = (data) => {
    console.log(data)
    mutate.mutate(data)
  }
  return (
    <div className='p-3'>
      <div className='text-xl text-[#2A2A2A] font-bold'>Cập nhật mật khẩu</div>

      <div className='flex flex-col'>
        <p className='mt-6 text-base'>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác Bạo có thể tạo mật khẩu từ 8 - 16 kí tự
        </p>

        <form onSubmit={handleSubmit(onSubmit)} class='w-full max-w-sm mt-3 '>
          <div class='mb-4'>
            <label class='block text-gray-700 text-base font-bold mb-2' for='current_password'>
              Mật khẩu hiện tại
            </label>
            <input
              {...register('current_password')}
              class='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='current_password'
              type='password'
              placeholder='Nhập mật khẩu hiện tại'
            />
            <p class='text-red-500 text-base italic mt-2 '>{errors.current_password?.message}</p>
          </div>

          <div class='mb-4'>
            <label class='block text-gray-700 text-base font-bold mb-2' for='new_password'>
              Mật khẩu mới
            </label>
            <input
              {...register('new_password')}
              class='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='new_password'
              type='password'
              placeholder='Nhập mật khẩu mới'
            />
            <p class='text-red-500  italic mt-2  text-base'>{errors.new_password?.message}</p>
          </div>

          <div class='mb-4'>
            <label class='block text-gray-700  font-bold mb-2 text-base' for='new_password_confirmation'>
              Xác nhận mật khẩu mới
            </label>
            <input
              {...register('new_password_confirmation')}
              class='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='new_password_confirmation'
              type='password'
              placeholder='Xác nhận mật khẩu mới'
            />
            <p class='text-red-500 text-base italic mt-2 '>{errors.new_password_confirmation?.message}</p>
          </div>

          <div class='flex items-center justify-between'>
            <button
              type='submit'
              class='bg-blue-500  bg-[#1a51a2] hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Hoàn thành
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
