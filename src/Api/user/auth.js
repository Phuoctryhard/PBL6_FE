import http from '../../until/until'
import { BASE_URL } from '../../until'
const rootAdminURL = BASE_URL + '/admin'
const authAPI = {
  registerAccount: (body) => http.post('user/register', body),
  forgotPassword: (email) => http.post(`user/forgot-password?email=${email}`),
  loginAccount: (body) => http.post('user/login', body),
  loginAccountAdmin: async (formData) =>
    await fetch(`${rootAdminURL}/login`, {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .catch((error) => error),

  logout: () => http.post('user/logout'),
  verifyEmail: (token) => http.post('user/verify-email', token),
  resetEmail: (data) => http.post('user/reset-password', data),
  //resend_verify_Email: (data) => http.post('user/resend-verify-email', data),
  resend_verify_Email: (email) => http.post(`user/resend-verify-email?email=${email}`),
  changePassword: (data) => http.post('user/change-password', data),
  // update profile
  updateProfile: (formData) => {
    return http.post('user/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default authAPI
