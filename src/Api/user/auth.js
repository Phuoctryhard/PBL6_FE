import http from '../../until/until'
const authAPI = {
  registerAccount: (body) => http.post('user/register', body),
  // loginAccount: (body) => http.post('user/login', body),
  loginAccount: (body) => http.post('admin/login', body),
  logout: () => http.post('user/logout'),
  verifyEmail: (token) => http.post('user/verify-email', token),
  changePassword: (data) => http.post('user/change-password', data)
}
export default authAPI
