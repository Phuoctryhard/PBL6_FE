import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootRoles = `${BASE_URL}/roles`

const AdminRolesAPI = {
  getAllRoles: async (token) => fetchWithAuth(rootRoles, 'GET', token, 'fetch all roles'),
  getRoleByID: async (id, token) => fetchWithAuth(`${rootRoles}/${id}`, 'GET', token, 'Get role by ID'),
  addRole: async (data, token) => fetchWithAuth(rootRoles, 'POST', token, 'Add new role', data),
  updateRole: async (id, data, token) =>
    fetchWithAuth(`${rootRoles}/${id}`, 'PUT', token, 'Update role by ID', JSON.stringify(data), 'application/json'),
  deleteRole: async (id, token) => fetchWithAuth(`${rootRoles}/${id}`, 'DELETE', token, 'Delete role by ID'),
  addPermissionToRole: async (id, data, token) =>
    fetchWithAuth(
      `${rootRoles}/assign-permission/${id}`,
      'POST',
      token,
      'Add permission to role',
      JSON.stringify(data),
      'application/json'
    ),
  removePermissionFromRole: async (id, data, token) =>
    fetchWithAuth(
      `${rootRoles}/remove-permission/${id}`,
      'POST',
      token,
      'Remove permission from role',
      JSON.stringify(data),
      'application/json'
    )
}

export default AdminRolesAPI
