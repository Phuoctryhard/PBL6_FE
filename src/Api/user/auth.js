import http from '../../until/until'
import { BASE_URL } from '../../until'
const rootAdminURL = BASE_URL + '/admin'
const authAPI = {
  registerAccount: (body) => http.post('user/register', body),

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
  changePassword: (data) => http.post('user/change-password', data)
}
export default authAPI
