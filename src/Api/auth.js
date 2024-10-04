import http from 'src/until/http'

// export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

// export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

// export const logout = () => http.post('/logout')

// đưa vô 1 object
const authAPI = {
  registerAccount: (body) => http.post('/register', body),
  loginAccount: (body) => http.post('/login', body),
  logout: () => http.post('/logout')
}
export default authAPI
