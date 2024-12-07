import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootAdminURL = BASE_URL + '/admin'

const AdminAuthAPI = {
  loginAccountAdmin: async (formData) =>
    await fetchWithAuth(`${rootAdminURL}/login`, 'POST', undefined, 'login admin account', formData),
  forgotPassword: async (email) =>
    await fetchWithAuth(`${rootAdminURL}/forgot-password`, 'POST', undefined, 'forgot password admin account', email),
  resetPassword: async (data) =>
    await fetchWithAuth(`${rootAdminURL}/reset-password`, 'POST', undefined, 'reset password admin account', data)
}

export default AdminAuthAPI
