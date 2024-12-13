import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootAdmin = `${BASE_URL}/admin`
const AdminAPI = {
  getAllAdmin: async (token) => await fetchWithAuth(`${rootAdmin}/manage-admins`, 'GET', token, 'fetch all admin'),
  getAdmin: async (token) => await fetchWithAuth(`${rootAdmin}/profile`, 'GET', token, 'Get admin'),
  getAdminByID: async (id, token) => await fetchWithAuth(`${rootAdmin}/${id}`, 'GET', token, 'Get admin by ID'),
  addAdmin: async (data, token) =>
    await fetchWithAuth(`${rootAdmin}/add-admin`, 'POST', token, 'fetch add admin', data),
  updateAdmin: async (data, token) =>
    await fetchWithAuth(`${rootAdmin}/update-profile`, 'POST', token, 'update admin profile', data),
  deleteAdmin: async (id, token) =>
    await fetchWithAuth(`${rootAdmin}/delete-admin/${id}`, 'POST', token, 'delete admin profile'),
  searchAdmin: async (query, token) => await fetchWithAuth(`${rootAdmin}?${query}`, 'GET', token, 'search admin'),
  changePassword: async (data, token) =>
    await fetchWithAuth(`${rootAdmin}/change-password`, 'POST', token, 'change password', data),
  changeRole: async (id, token) => await fetchWithAuth(`${rootAdmin}/change-role/${id}`, 'POST', token, 'change role'),
  verifyEmail: async (token) =>
    await fetchWithAuth(`${rootAdmin}/verify-email?${token}`, 'POST', token, 'verify email'),
  assignPermissions: async (id, token, data) =>
    await fetchWithAuth(
      `${rootAdmin}/assign-permission/${id}`,
      'POST',
      token,
      'assign permissions to admin',
      JSON.stringify(data),
      'application/json'
    ),
  removePermissions: async (id, token, data) =>
    await fetchWithAuth(
      `${rootAdmin}/remove-permission/${id}`,
      'POST',
      token,
      'remove permissions of admin',
      JSON.stringify(data),
      'application/json'
    )
}

export default AdminAPI
