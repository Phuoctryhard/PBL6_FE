import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { AdminAuthAPI } from '../../Api/admin'
const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isNewPasswordFocus, setIsNewPasswordFocus] = useState('')
  const [isConfirmPasswordFocus, setIsConfirmPasswordFocus] = useState('')

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

  const handleValidate = () => {
    if (!newPassword || !confirmPassword) {
      setStatus(400)
      setMessageResult('Please enter all fields')
      return false
    }
    if (newPassword !== confirmPassword) {
      setStatus(400)
      setMessageResult('Password does not match')
      return false
    }
    return true
  }

  const handlePasswordChange = async (formData) => {
    try {
      const response = await AdminAuthAPI.resetPassword(formData)
      if (response.status >= 400) {
        const message = response.messages ? response.messages.join('. ') : 'Change password failed'
        setStatus(400)
        setMessageResult(message)
        return
      } else {
        setStatus(200)
        setMessageResult('Change password successfully. Redirecting to login page...')
        setTimeout(() => {
          navigate('/admin/login')
        }, 2000)
      }
    } catch (error) {
      setStatus(400)
      setMessageResult('Change password failed:', error.message)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!handleValidate()) {
      return
    }
    const formData = new FormData()
    formData.append('new_password', newPassword)
    formData.append('new_password_confirmation', confirmPassword)
    formData.append('token', token)
    handlePasswordChange(formData)
  }

  return (
    <section
      className='w-[100vw] h-[100vh] flex justify-center items-center moving-background bg-cover bg-no-repeat bg-center'
      style={{
        backgroundImage: 'url(/assets/images/test_2.jpg)'
      }}
    >
      {contextHolder}
      <div className='bg-[rgb(14,8,33,0.8)] rounded-xl border-[0.188rem] border-solid border-[rgb(179,103,214,0.2)] backdrop-blur-0 w-[28.125rem] animate-slideUp mx-5'>
        <form action='' onSubmit={onSubmit} noValidate>
          <div className='text-[#fff] flex flex-col justify-end p-7'>
            <h1 className='text-3xl text-center text-[#ffff] font-semibold'>Reset Password</h1>
            <div
              className='mt-8 flex gap-3 px-5 py-4 border border-[rgb(179,103,214,0.7)] justify-start items-center text-[rgb(255,255,255)] rounded-full'
              onClick={() => document.getElementById('new_password').focus()}
              onFocus={() => setIsNewPasswordFocus(true)}
              onBlur={() => setIsNewPasswordFocus(false)}
              style={{
                borderColor: isNewPasswordFocus ? 'rgb(179,103,214,1)' : 'rgb(179,103,214,0.7)',
                boxShadow: isNewPasswordFocus ? '0 0.25rem 0.5rem rgba(179, 103, 214, 0.5)' : 'none'
              }}
            >
              <input
                id='new_password'
                placeholder='New password'
                type='password'
                name='new_password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='adminLogin__Input w-full outline-none text-sm bg-transparent placeholder:text-[#fff]'
                tabIndex={1}
              />
              <LockOutlined className='text-xl text-[#fefefe]' />
            </div>
            <div
              className='mt-8 flex gap-3 px-5 py-4 border border-[rgb(179,103,214,0.7)] justify-start items-center text-[#fff] rounded-full mb-5'
              onClick={() => document.getElementById('new_password_confirmation').focus()}
              onFocus={() => setIsConfirmPasswordFocus(true)}
              onBlur={() => setIsConfirmPasswordFocus(false)}
              style={{
                borderColor: isConfirmPasswordFocus ? 'rgb(179,103,214,1)' : 'rgb(179,103,214,0.7)',
                boxShadow: isConfirmPasswordFocus ? '0 0.25rem 0.5rem rgba(179, 103, 214, 0.5)' : 'none'
              }}
            >
              <input
                id='new_password_confirmation'
                placeholder='Confirm password'
                type='password'
                name='new_password_confirmation'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                tabIndex={2}
                className='adminLogin__Input w-full h-full outline-none text-sm placeholder:text-[#fff] bg-transparent'
              />
              <LockOutlined className='text-xl text-[#fefefe]' />
            </div>
            <div className='mt-5'>
              <button
                className='w-full text-center bg-[#fff] py-4 px-2 uppercase rounded-full text-[black] hover:bg-opacity-70 outline-none focus:bg-opacity-70'
                tabIndex={3}
                type='submit'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword
