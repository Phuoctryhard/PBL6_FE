import http from '../../until/until'

// export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

// export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

// export const logout = () => http.post('/logout')

// đưa vô 1 object
const authAPI = {
  registerAccount: (body) => http.post('user/register', body),
  loginAccount: (body) => http.post('user/login', body),
  logout: () => http.post('user/logout'),
  verifyEmail: (token) => http.post('user/verify-email', token)
}
export default authAPI
