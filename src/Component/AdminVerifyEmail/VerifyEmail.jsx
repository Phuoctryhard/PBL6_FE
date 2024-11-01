import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { AdminAPI } from '../../Api/admin'
const VerifyEmail = () => {
  const [statusVerify, setStatusVerify] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const verifyEmail = async () => {
    const response = await AdminAPI.verifyEmail(`token=${token}`)
    setLoading(false)
    if (!response.ok) {
      const res = await response.json()
      const message = res.messages ? res.messages.join('') : 'Something went wrong. Please try again later.'
      setMessage(message)
      setStatusVerify(false)
    } else {
      setStatusVerify(true)
    }
  }
  useEffect(() => {
    document.title = 'Verify Email'
    verifyEmail()
  }, [])
  return (
    <div className='w-[100vw] h-[100vh] flex'>
      <Spin spinning={loading} tip='Loading...' size='large' fullscreen />
      {statusVerify === true ? (
        <div className='flex flex-col gap-4 justify-center items-center w-[50%] m-auto'>
          <img src='/assets/images/verify_success.png' alt='Verify Success' />
          <h1 className='text-2xl font-bold text-center'>Email Verified!</h1>
          <p className='text-center'>
            Your email has been verified successfully. Check out your gmail again for your password account. Thank you
            and have a nice day!
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center w-[50%] m-auto'>
          <img
            src='/assets/images/sign-error.svg'
            alt='Error Verify'
            className='w-[200px] h-[200px] object-cover rounded-[50%]'
          />
          <h1 className='text-2xl font-bold text-center'>Verify Email Failed</h1>
          <p className='text-center'>{message}</p>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
