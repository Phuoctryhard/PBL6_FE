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
      onSuccess: (data) => {
        console.log(data)
        toast.success(data.data.messages[0])
        setTimeout(() => {
          window.close() // Đóng trang sau 3 giây
        }, 3000) // 1000ms = 1 giây
      },
      onError: (error) => {
        console.log(error)
        toast.error(error?.response?.data?.messages[0])
      }

      // setTimeout(() => {
      //   window.close() // Đóng trang sau 3 giây
      // }, 3000) //
      //   toast.error(error)
      // }
    })
  }, [token])
  return <div>Verify Email Toke: {token}</div>
}
