import { useEffect } from 'react'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAPI from '../../../Api/user/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function VerifyEmail() {
  // const { user } = useParams() // Lấy phần ":user" từ URL
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') // Lấy token từ query params
  console.log(token)
  const navigate = useNavigate()
  const mutate = useMutation({
    mutationFn: authAPI.verifyEmail
  })

  useEffect(() => {
    // Xử lý xác minh email với token
    console.log('Token:', token)
    const tokenEmail = {
      token: token
    }

    // Call API hoặc xử lý logic khác ở đây
    mutate.mutate(tokenEmail, {
      onSuccess: () => {
        console.log('Thành công ')
        toast.success('Xác thực thành công !')
        setTimeout(() => {
          window.close() // Đóng trang sau 3 giây
        }, 3000) // 1000ms = 1 giây
      },
      onError() {
        console.log('Thấtbai ')
        setTimeout(() => {
          window.close() // Đóng trang sau 3 giây
        }, 3000) //
        toast.error('Fail !')
      }
    })
  }, [token])
  return <div>Verify Email Toke: {token}</div>
}
