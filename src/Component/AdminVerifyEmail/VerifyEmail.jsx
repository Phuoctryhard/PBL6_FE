import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { AdminAPI } from '../../Api/admin'
import { message } from 'antd'
const VerifyEmail = () => {
  const [statusVerify, setStatusVerify] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }
  const verifyEmail = async () => {
    try {
      const res = await AdminAPI.verifyEmail(`token=${token}`)
      setLoading(false)
      if (!res) {
        const message = res?.message
          ? res.message
          : res.messages
            ? res.messages.join('. ')
            : 'Something went wrong. Please try again later.'
        setStatusVerify(false)
        setStatus(400)
        setMessageResult(message)
      } else {
        setStatusVerify(true)
        setStatus(200)
        setMessageResult('Email verified successfully. Redirecting to login page...')
        setTimeout(() => {
          navigate('/admin/login')
          document.title = 'MedicareCentral'
        }, 2000)
      }
    } catch (error) {
      setStatus(400)
      setMessageResult(error.message)
      setStatusVerify(false)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    document.title = 'Verify Email'
    verifyEmail()
  }, [])

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      openMessage('success', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    } else if (status >= 400) {
      openMessage('error', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])
  //#endregion

  return (
    <div className='w-[100vw] h-[100vh] flex'>
      {contextHolder}
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
          <p className='text-center'>{messageResult}</p>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
