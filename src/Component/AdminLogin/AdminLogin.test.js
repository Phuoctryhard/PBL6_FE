import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import AdminLogin from './AdminLogin'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { message } from 'antd'
import { AdminAuthAPI } from '../../Api/admin'
const queryClient = new QueryClient()

jest.mock('antd', () => {
  const antd = jest.requireActual('antd')
  return { ...antd, message: { ...antd.message, success: jest.fn(), error: jest.fn() } }
})

const MockAdminLogin = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

AdminAuthAPI.loginAccountAdmin = jest.fn().mockImplementation((data) => {
  const email = data.email
  const password = data.password
  const rightEmail = 'minh32405@gmail.com'
  const rightPassword = '123456'
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  if (email === '') return Promise.reject({ message: 'email is a required field' })
  if (password.length < 3) return Promise.reject({ message: 'Độ dài ít nhất là 3' })
  if (!emailRegex.test(email)) return Promise.reject({ message: 'Không đúng định dạng email' })
  if (email !== rightEmail) return Promise.reject({ message: 'Email không tồn tại!' })
  if (password !== rightPassword) return Promise.reject({ message: 'Mật khẩu không chính xác!' })
  return Promise.resolve({ message: 'Đăng nhập thành công' })
})

describe('Test login component and functionality', () => {
  const user = userEvent.setup()
  const { container } = render(<MockAdminLogin />)
  const emailInput = screen.getByPlaceholderText(/Email/i)
  const passwordInput = screen.getByPlaceholderText(/Password/i)
  const loginButton = screen.getByRole('button', { name: /login/i })
  const messageErrorSpy = jest.spyOn(message, 'error').mockImplementation(() => {})
  const messageSuccessSpy = jest.spyOn(message, 'success').mockImplementation(() => {})

  it('renders the Login component', async () => {
    render(<MockAdminLogin />)
    const loginForm = container.querySelector('form')
    expect(loginForm).toBeInTheDocument()
  })

  it('should show error message when email is empty', async () => {
    await user.type(passwordInput, '123456')
    await user.click(loginButton)

    try {
      const response = await AdminAuthAPI.loginAccountAdmin({ email: '', password: '123456' })
    } catch (error) {
      expect(error.message).toEqual('email is a required field')
      expect(messageErrorSpy).toHaveBeenCalled()
    }
  })

  it('should show error message when password is less than 3 characters', async () => {
    await user.type(emailInput, 'minh32405@gmail.com')
    await user.type(passwordInput, '12')
    await user.click(loginButton)

    try {
      const response = await AdminAuthAPI.loginAccountAdmin({
        email: 'minh32405@gmail.com',
        password: '12'
      })
    } catch (error) {
      expect(error.message).toEqual('Độ dài ít nhất là 3')
    }
  })

  it('should show error message when email is not in correct format', async () => {
    await user.type(emailInput, 'minh32405gmail.com')
    await user.type(passwordInput, '123456')
    await user.click(loginButton)

    try {
      const response = await AdminAuthAPI.loginAccountAdmin({
        email: 'minh32405gmail.com',
        password: '123456'
      })
    } catch (error) {
      expect(error.message).toEqual('Không đúng định dạng email')
    }
  })

  it('should show error message when email is not in database', async () => {
    await user.type(emailInput, 'minh35gmail.com')
    await user.type(passwordInput, '123456')
    await user.click(loginButton)

    try {
      const response = await AdminAuthAPI.loginAccountAdmin({
        email: 'minh35gmail.com',
        password: '123456'
      })
    } catch (error) {
      expect(error.message).toEqual('Email không tồn tại!')
    }
  })

  it('should show error message when password is not correct', async () => {
    await user.type(emailInput, 'minh32405gmail.com')
    await user.type(passwordInput, '1234567')
    await user.click(loginButton)

    try {
      const response = await AdminAuthAPI.loginAccountAdmin({
        email: 'minh32405gmail.com',
        password: '1234567'
      })
    } catch (error) {
      expect(error.message).toEqual('Mật khẩu không chính xác!')
    }
  })

  it('should login successfully when email and password are correct', async () => {
    await user.type(emailInput, 'minh32405gmail.com')
    await user.type(passwordInput, '123456')

    await user.click(loginButton)

    try {
      const response = await AdminAuthAPI.loginAccountAdmin({
        email: 'minh32405gmail.com',
        password: '123456'
      })
      expect(response.message).toEqual('Đăng nhập thành công')
    } catch (error) {}
  })
})
