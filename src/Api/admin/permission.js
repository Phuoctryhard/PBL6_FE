import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootPermissions = `${BASE_URL}/permissions`

const AdminPermissionsAPI = {
  getAllPermissions: async (token) => fetchWithAuth(rootPermissions, 'GET', token, 'fetch all permissions'),
  getPermissionByID: async (id, token) =>
    fetchWithAuth(`${rootPermissions}/${id}`, 'GET', token, 'Get permission by ID')
}

export default AdminPermissionsAPI
