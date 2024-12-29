import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Setting from './Setting'
import userEvent from '@testing-library/user-event'
import { AdminAPI } from '../../Api/admin'

// Giả lập API thay đổi mật khẩu
AdminAPI.changePassword = jest.fn().mockImplementation((data) => {
  if (data.currentPassword === '') return Promise.reject({ message: 'Current password is required' })

  if (data.newPassword === '') return Promise.reject({ message: 'New password is required' })

  if (data.confirmPassword === '') return Promise.reject({ message: 'Confirm password is required' })

  if (data.currentPassword !== '123456') return Promise.reject({ message: 'Current password is wrong' })

  if (data.newPassword !== data.confirmPassword)
    return Promise.reject({ message: 'Confirm password and new password does not match' })

  return Promise.resolve({ message: 'Change password was successfully' })
})

describe('Test change password component and show failed or success message', () => {
  it('renders Change password form', () => {
    const { container } = render(<Setting />)
    const changePasswordButton = screen.getByText(/Change password/i)
    fireEvent.click(changePasswordButton)
    const changePasswordForm = screen.getByText(/Current password/i)
    expect(changePasswordForm).toBeInTheDocument()
  })

  it('show tooltip about current password is required', async () => {
    const user = userEvent.setup()
    render(<Setting />)
    const changePasswordButton = screen.getByText(/Change password/i)
    fireEvent.click(changePasswordButton)
    const changePasswordForm = screen.getByText(/Current password/i)
    expect(changePasswordForm).toBeInTheDocument()
    const currentPasswordInput = screen.getByLabelText(/Current password/i)
    const newPasswordInput = screen.getByLabelText(/New password/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i)
    const submitButton = screen.getByText(/Save changes/i)
    await user.type(newPasswordInput, '123456')
    await user.type(confirmPasswordInput, '1234567')
    await user.click(submitButton)
    await waitFor(() => {
      const tooltip = screen.getByText(/Current password is required/i)
      expect(tooltip).toBeInTheDocument()
    })
  })

  it('show tooltip about new password is required', async () => {
    const user = userEvent.setup()
    render(<Setting />)
    const changePasswordButton = screen.getByText(/Change password/i)
    fireEvent.click(changePasswordButton)
    const changePasswordForm = screen.getByText(/Current password/i)
    expect(changePasswordForm).toBeInTheDocument()
    const currentPasswordInput = screen.getByLabelText(/Current password/i)
    const newPasswordInput = screen.getByLabelText(/New password/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i)
    const submitButton = screen.getByText(/Save changes/i)
    await user.type(currentPasswordInput, '123456')
    await user.type(confirmPasswordInput, '1234567')
    await user.click(submitButton)
    await waitFor(() => {
      const tooltip = screen.getByText(/New password is required/i)
      expect(tooltip).toBeInTheDocument()
    })
  })

  it('show tooltip about confirm password is required', async () => {
    const user = userEvent.setup()
    render(<Setting />)
    const changePasswordButton = screen.getByText(/Change password/i)
    fireEvent.click(changePasswordButton)
    const changePasswordForm = screen.getByText(/Current password/i)
    expect(changePasswordForm).toBeInTheDocument()
    const currentPasswordInput = screen.getByLabelText(/Current password/i)
    const newPasswordInput = screen.getByLabelText(/New password/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i)
    const submitButton = screen.getByText(/Save changes/i)
    await user.type(currentPasswordInput, '123456')
    await user.type(newPasswordInput, '123456')
    await user.click(submitButton)
    await waitFor(() => {
      const tooltip = screen.getByText(/Confirm password is required/i)
      expect(tooltip).toBeInTheDocument()
    })
  })

  it('show message about current password is wrong', async () => {
    const user = userEvent.setup()
    render(<Setting />)
    const changePasswordButton = screen.getByText(/Change password/i)
    fireEvent.click(changePasswordButton)
    const changePasswordForm = screen.getByText(/Current password/i)
    expect(changePasswordForm).toBeInTheDocument()
    const currentPasswordInput = screen.getByLabelText(/Current password/i)
    const newPasswordInput = screen.getByLabelText(/New password/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i)
    const submitButton = screen.getByText(/Save changes/i)
    await user.type(currentPasswordInput, '1234567')
    await user.type(newPasswordInput, '123456')
    await user.type(confirmPasswordInput, '123456')
    await user.click(submitButton)

    try {
      await AdminAPI.changePassword({
        currentPassword: '1234567',
        newPassword: '1234567',
        confirmPassword: '1234567'
      })
    } catch (error) {
      expect(error.message).toBe('Current password is wrong')
    }
  })

  it('show tooltip about confirm password and new password does not match', async () => {
    const user = userEvent.setup()
    render(<Setting />)
    const changePasswordButton = screen.getByText(/Change password/i)
    fireEvent.click(changePasswordButton)
    const changePasswordForm = screen.getByText(/Current password/i)
    expect(changePasswordForm).toBeInTheDocument()
    const currentPasswordInput = screen.getByLabelText(/Current password/i)
    const newPasswordInput = screen.getByLabelText(/New password/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i)
    const submitButton = screen.getByText(/Save changes/i)
    await user.type(currentPasswordInput, '123456')
    await user.type(newPasswordInput, '1234567')
    await user.type(confirmPasswordInput, '12345678')
    await user.click(submitButton)
    await waitFor(() => {
      const tooltip = screen.getByText(/Confirm password and new password does not match/i)
      expect(tooltip).toBeInTheDocument()
    })
  })

  it('show message about change password was successfully', async () => {
    const user = userEvent.setup()
    render(<Setting />)
    const changePasswordButton = screen.getByText(/Change password/i)
    fireEvent.click(changePasswordButton)
    const changePasswordForm = screen.getByText(/Current password/i)
    expect(changePasswordForm).toBeInTheDocument()
    const currentPasswordInput = screen.getByLabelText(/Current password/i)
    const newPasswordInput = screen.getByLabelText(/New password/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i)
    const submitButton = screen.getByText(/Save changes/i)
    await user.type(currentPasswordInput, '123456')
    await user.type(newPasswordInput, '1234567')
    await user.type(confirmPasswordInput, '1234567')
    await user.click(submitButton)

    try {
      const response = await AdminAPI.changePassword({
        currentPassword: '123456',
        newPassword: '1234567',
        confirmPassword: '1234567'
      })
      expect(response.message).toBe('Change password was successfully')
    } catch (error) {}
  })
})
