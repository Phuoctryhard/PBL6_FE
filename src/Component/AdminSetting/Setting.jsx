import './Setting.css'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight2, Personalcard, TickCircle, Lock } from 'iconsax-react'
import { Breadcrumb, message, Tooltip, Spin } from 'antd'
import { DeleteOutlined, CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { AdminAPI } from '../../Api/admin'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/app.context'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminSetting = () => {
  const [typeForm, setTypeForm] = useState('profile') // type form profile or change password
  const [submitLoading, setSubmitLoading] = useState(false) // loading submit state
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')
  const navigate = useNavigate()
  const { isProfile, logout, setProfile } = useAuth()

  const [token, setToken] = useState(localStorage.getItem('accesstoken'))

  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    logout()
    navigate('/admin/login')
  }

  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('accesstoken'))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const PersonalBtnRef = useRef(null)
  const ChangePasswordBtnRef = useRef(null)
  const [focusPersonalForm, setFocusPersonalForm] = useState()
  const [focusChangePasswordForm, setFocusChangePasswordForm] = useState()
  //#region Form profile data
  const [adminFullName, setAdminFullName] = useState('')
  const [errorAdminFullName, setErrorAdminFullName] = useState('')
  const [adminFullNameCard, setAdminFullNameCard] = useState('')
  const [email, setEmail] = useState('')
  const [emailCard, setEmailCard] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [Avatar, setAvatar] = useState(null)
  const [imageCard, setImageCard] = useState(null)
  const [adminRole, setAdminRole] = useState('')
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorFileUpload, setErrorFileUpload] = useState('')

  //handle drag and drop image file
  const [dragging, setDragging] = useState(false)
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setSelectedFile(droppedFile)
      setAvatar(URL.createObjectURL(droppedFile))
      fileInputRef.current.value = null
    }
  }

  //handle upload Avatar
  const handleUploadAvatar = (e) => {
    const file = e.target.files[0]
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']
    if (file && validExtensions.includes(file.type)) {
      setSelectedFile(file)
      setAvatar(URL.createObjectURL(file))
      fileInputRef.current.value = null
    } else {
      setStatus(422)
      setMessageResult(`File ${file.name} is not a valid image file.`)
    }
  }

  //handle clear Avatar
  const handleClearAvatar = (e) => {
    e.stopPropagation()
    setAvatar(null)
    setSelectedFile(null)
  }

  const handleErrorFullName = (admin_fullname) => {
    if (admin_fullname === '') {
      setErrorAdminFullName('Full name is required')
      return false
    }
    return true
  }

  const handleErrorEmail = (email) => {
    if (email === '') {
      setErrorEmail('Email is required')
      return false
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

    if (!/^[a-zA-Z0-9._%+-]+@/.test(email)) {
      setErrorEmail('Invalid email format: missing "@" symbol or incorrect local part')
      return false
    }

    if (!/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setErrorEmail('Invalid email format: domain part is incorrect')
      return false
    }
    if (!emailPattern.test(email)) {
      setErrorEmail('Invalid email format')
      return false
    }
    return true
  }

  //handle cancel
  const handleCancel = () => {
    setAdminFullName(adminFullNameCard)
    setEmail(emailCard)
    setAvatar(imageCard)
    setSelectedFile(null)
    setErrorAdminFullName('')
    setErrorEmail('')
    setErrorFileUpload('')
  }
  //#endregion

  //#region Form change password data
  const [currentPassword, setCurrentPassword] = useState('')
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [errorNewPassword, setErrorNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')

  const handleErrorCurrentPassword = (current_password) => {
    if (current_password === '') {
      setErrorCurrentPassword('Current password is required')
      return false
    }
    return true
  }

  const handleErrorNewPassword = (new_password) => {
    if (new_password === '') {
      setErrorNewPassword('New password is required')
      return false
    }
    return true
  }

  const handleErrorConfirmPassword = (new_password_confirmation, new_password) => {
    if (new_password_confirmation === '') {
      setErrorConfirmPassword('Confirm password is required')
      return false
    }
    if (new_password_confirmation !== new_password) {
      setErrorConfirmPassword('Confirm password and new password does not match')
      return false
    }

    return true
  }
  //#endregion

  const fetchAdminProfile = async () => {
    const response = await AdminAPI.getAdmin(token)
    if (!response.ok) {
      const { messages } = await response.json()
      if (response.status === 401) {
        handleUnauthorized()
      } else {
        setStatus(response.status)
        setMessageResult(`Error get profile: ${messages}`)
      }
      return
    }
    const result = await response.json()
    const { data } = result
    setAdminFullName(data.admin_fullname)
    setEmail(data.email)
    setAvatar(data.admin_avatar)
    setAdminFullNameCard(data.admin_fullname)
    setEmailCard(data.email)
    setImageCard(data.admin_avatar)
    switch (data.admin_is_admin) {
      case 0:
        setAdminRole('Admin')
        break
      case 1:
        setAdminRole('Super Admin')
        break
      case 2:
        setAdminRole('Manager')
        break
    }
  }

  useEffect(() => {
    setFocusPersonalForm(true)
    fetchAdminProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    const formData = new FormData()
    if (typeForm === 'profile') {
      const admin_fullname = adminFullName
      const adminEmail = email
      const isValidEmail = handleErrorEmail(adminEmail)
      const isValidFullName = handleErrorFullName(admin_fullname)
      if (!isValidEmail || !isValidFullName) {
        setSubmitLoading(false)
        return
      }
      formData.append('admin_fullname', adminFullName)
      formData.append('email', adminEmail)
      if (selectedFile) formData.append('admin_avatar', selectedFile)
    } else {
      ChangePasswordBtnRef.current.focus()
      const current_password = currentPassword
      const new_password = newPassword
      const new_password_confirmation = confirmPassword
      const isValidCurrentPassword = handleErrorCurrentPassword(current_password)
      const isValidNewPassword = handleErrorNewPassword(new_password)
      const isValidConfirmPassword = handleErrorConfirmPassword(new_password_confirmation, new_password)
      if (!isValidCurrentPassword || !isValidNewPassword || !isValidConfirmPassword) {
        setSubmitLoading(false)
        return
      }
      formData.append('current_password', current_password)
      formData.append('new_password', new_password)
      formData.append('new_password_confirmation', new_password_confirmation)
    }
    let response = null
    try {
      if (typeForm === 'profile') response = await AdminAPI.updateAdmin(formData, token)
      else response = await AdminAPI.changePassword(formData, token)
      if (response) {
        if (!response.ok) {
          const { messages } = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setStatus(response.status)
            setMessageResult(messages)
          }
          setSubmitLoading(false)
          return
        }
        const result = await response.json()
        if (typeForm === 'profile') {
          const profileData = {
            ...Object.fromEntries(formData),
            admin_is_admin: adminRole,
            admin_avatar: selectedFile ? URL.createObjectURL(selectedFile) : imageCard
          }
          setProfile(profileData)
        } else {
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
        }
        const { messages, status } = result
        setStatus(status)
        setMessageResult(messages)
        setSubmitLoading(false)
      }
    } catch (e) {
      setSubmitLoading(false)
    } finally {
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      if (typeForm === 'profile') {
        openMessage('success', 'Update admin was successfully', 3)
        fetchAdminProfile()
      } else openMessage('success', 'Change password was successfully', 3)
      setStatus(null)
      setMessageResult(null)
    } else if (status >= 400) {
      openMessage('error', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])
  return (
    <section className='w-full max-w-[100%] h-full'>
      {contextHolder}
      <header className='flex justify-between'>
        <div className='Breadcrumb animate-[slideLeftToRight_1s_ease]'>
          <h1>
            <Breadcrumb
              separator={<ArrowRight2 size='15' color='#1D242E' />}
              className='font-bold text-[#848A91]'
              items={[{ title: 'Settings' }]}
            ></Breadcrumb>
          </h1>
        </div>
      </header>
      <Spin spinning={submitLoading} tip='Loading...' size='large' fullscreen />
      <div className='mt-10 flex gap-x-6 h-max'>
        <div className='w-[380px] bg-[#ffffff] rounded-xl border-[1px] border-solid border-[#ebedf0] p-6 animate-slideLeftToRight h-max'>
          <div className='setting__information flex flex-col gap-y-6 items-center justify-center w-[100%]'>
            <img
              src={imageCard ? imageCard : '/assets/images/default-avatar.png'}
              alt='setting'
              className='w-40 h-40 rounded-full border border-dashed border-[rgb(102, 181, 163)] object-cover'
            />
            <div className='gap-2 flex flex-col justify-center items-center'>
              <span className='text-sm font-semibold'>{adminFullNameCard}</span>
              <span className='text-xs text-[rgb(160,160,160)]'>{emailCard}</span>
              <span className='text-xs text-[#d6b80d]'>{adminRole}</span>
            </div>
            <div className='w-full text-lg flex flex-col gap-4 px-12'>
              <button
                ref={PersonalBtnRef}
                type='button'
                className={`setting__information__button ${focusPersonalForm ? 'isFocus' : ''}`}
                onClick={() => {
                  ChangePasswordBtnRef.current.tabIndex = -1
                  setTypeForm('profile')
                  setFocusPersonalForm(true)
                  setFocusChangePasswordForm(false)
                }}
              >
                <Personalcard size={16} />
                <span>Personal information</span>
              </button>
              <button
                type='button'
                ref={ChangePasswordBtnRef}
                className={`setting__information__button focus:outline-none ${focusChangePasswordForm ? 'isFocus' : ''}`}
                onClick={() => {
                  setTypeForm('changePassword')
                  setFocusPersonalForm(false)
                  setFocusChangePasswordForm(true)
                }}
              >
                <Lock size={16} />
                <span>Change password</span>
              </button>
            </div>
          </div>
        </div>
        <div className='w-[780px] bg-[#ffffff] rounded-xl border-[1px] border-solid border-[#ebedf0] p-6 animate-slideRightToLeft overflow-hidden h-max'>
          <form action='' onSubmit={handleSubmit} autoComplete='off' className='w-full'>
            {typeForm === 'profile' ? (
              <div className='w-full'>
                <div className='AddCategoryForm__row'>
                  <div className='AddCategoryForm__group AddCategoryForm__WidthFull relative'>
                    <label htmlFor='admin_avatar'>Avatar</label>
                    <input
                      type='file'
                      accept='image/jpg, image/jpeg, image/png, image/gif, image/svg'
                      name='admin_avatar'
                      id='admin_avatar'
                      className='hidden'
                      placeholder='Choose file'
                      onChange={handleUploadAvatar}
                      ref={fileInputRef}
                      onClick={() => setErrorFileUpload('')}
                    />
                    <Tooltip
                      title={errorFileUpload}
                      open={errorFileUpload !== ''}
                      placement='top'
                      overlayStyle={{ maxWidth: 'max-content' }}
                      align={{
                        offset: [0, 100]
                      }}
                    >
                      <div
                        className='mt-4 flex gap-x-4 w-full justify-center'
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <button
                          type='button'
                          onClick={() => document.getElementById('admin_avatar').click()}
                          className='AddCategoryForm__uploadBtn setting__uploadBtn focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#1d242e] [&:not(:focus)]:outline-none [&:not(:focus)]:border-[3px] [&:not(:focus)]:border-dashed [&:not(:focus)]:border-[#ebedf0]'
                          style={{
                            border: Avatar ? 'none' : dragging ? '3px dashed #1d242e' : '3px dashed #ebedf0'
                          }}
                        >
                          {Avatar ? (
                            <>
                              <img src={Avatar} alt='Avatar' className='w-full h-full rounded-md object-contain' />
                              <CloseCircleOutlined
                                className='absolute top-0 right-0 text-red-500 text-[20px] cursor-pointer'
                                onClick={handleClearAvatar}
                              />
                            </>
                          ) : (
                            <div className='flex flex-col gap-y-2 justify-center items-center '>
                              <CloudUploadOutlined className='text-[#008f99] text-3xl' />
                              <span className='text-base'>Drag or upload your image here</span>
                              <em className='text-sm text-gray-400'>
                                (Only *.jpeg, *.jpg, *.png, *.gif and *.svg will be accepted)
                              </em>
                            </div>
                          )}
                        </button>
                        <div
                          className='bg-[#cccccc] h-full w-32 rounded-md flex grow'
                          style={{
                            display: Avatar ? 'none' : 'flex'
                          }}
                        >
                          <p className='m-auto text-gray-600 text-sm'>160x160</p>
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div className='AddCategoryForm__row'>
                  <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                    <label htmlFor='admin_fullname' className='AddCategoryForm__label'>
                      Full Name
                    </label>
                    <Tooltip
                      title={errorAdminFullName}
                      open={errorAdminFullName !== ''}
                      placement='bottomLeft'
                      overlayStyle={{ maxWidth: 'max-content' }}
                      align={{
                        offset: [60, -8]
                      }}
                    >
                      <input
                        type='text'
                        name='admin_fullname'
                        id='admin_fullname'
                        className='AddCategoryForm__input setting__input'
                        placeholder='Lam Nhat Minh'
                        value={adminFullName}
                        onChange={(e) => setAdminFullName(e.target.value)}
                        onFocus={() => {
                          setErrorAdminFullName('')
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className='AddCategoryForm__row'>
                  <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                    <label htmlFor='email' className='AddCategoryForm__label'>
                      Email
                    </label>
                    <Tooltip
                      title={errorEmail}
                      open={errorEmail !== ''}
                      placement='bottomLeft'
                      overlayStyle={{ maxWidth: 'max-content' }}
                      align={{
                        offset: [60, -8]
                      }}
                    >
                      <input
                        type='text'
                        name='email'
                        id='email'
                        className='AddCategoryForm__input setting__input'
                        placeholder='minh32405@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setErrorEmail('')}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className='flex gap-4 w-full'>
                  <button
                    type='submit'
                    className='bg-[#008f99] text-[#ffffff] px-2 py-4 w-full text-sm font-medium rounded flex items-center justify-center gap-4 hover:opacity-80 focus:outline-none focus:opacity-80'
                  >
                    <span>Save Changes</span>
                    <TickCircle size={20} />
                  </button>
                  <button
                    type='button'
                    className='bg-[#008f99] text-[#ffffff] px-2 py-4 w-full text-sm font-medium rounded flex items-center justify-center gap-4 hover:opacity-80 focus:outline-none focus:opacity-80'
                    onClick={handleCancel}
                  >
                    <span>Cancel</span>
                    <DeleteOutlined className='text-base' />
                  </button>
                </div>
              </div>
            ) : (
              <div className='w-full'>
                <div className='AddCategoryForm__row'>
                  <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                    <label htmlFor='current_password' className='AddCategoryForm__label'>
                      Current password
                    </label>
                    <Tooltip
                      title={errorCurrentPassword}
                      open={errorCurrentPassword !== ''}
                      placement='bottomLeft'
                      overlayStyle={{ maxWidth: 'max-content' }}
                      align={{
                        offset: [60, -8]
                      }}
                    >
                      <input
                        type='password'
                        name='current_password'
                        id='current_password'
                        className='AddCategoryForm__input setting__input'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        onFocus={() => setErrorCurrentPassword('')}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className='AddCategoryForm__row'>
                  <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                    <label htmlFor='new_password' className='AddCategoryForm__label'>
                      New password
                    </label>
                    <Tooltip
                      title={errorNewPassword}
                      open={errorNewPassword !== ''}
                      placement='bottomLeft'
                      overlayStyle={{ maxWidth: 'max-content' }}
                      align={{
                        offset: [60, -8]
                      }}
                    >
                      <input
                        type='password'
                        name='new_password'
                        id='new_password'
                        className='AddCategoryForm__input setting__input'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onFocus={() => setErrorNewPassword('')}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className='AddCategoryForm__row'>
                  <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                    <label htmlFor='new_password_confirmation' className='AddCategoryForm__label'>
                      Confirm password
                    </label>
                    <Tooltip
                      title={errorConfirmPassword}
                      open={errorConfirmPassword !== ''}
                      placement='bottomLeft'
                      overlayStyle={{ maxWidth: 'max-content' }}
                      align={{
                        offset: [60, -8]
                      }}
                    >
                      <input
                        type='password'
                        name='new_password_confirmation'
                        id='new_password_confirmation'
                        className='AddCategoryForm__input setting__input'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setErrorConfirmPassword('')}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <div className='flex gap-4 w-full'>
                    <button
                      type='submit'
                      className='bg-[#008f99] text-[#ffffff] px-2 py-4 w-full text-sm font-medium rounded flex items-center justify-center gap-4 hover:opacity-80 focus:outline-none focus:opacity-80'
                    >
                      <span>Save changes</span>
                      <TickCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default AdminSetting
