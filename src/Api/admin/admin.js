import { BASE_URL } from '../../until'

const rootAdmin = `${BASE_URL}/admin`
const AdminAPI = {
  getAllAdmin: async (token) =>
    await fetch(`${rootAdmin}/manage-admins`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  getAdmin: async (token) =>
    await fetch(`${rootAdmin}/profile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  addAdmin: async (data, token) =>
    await fetch(`${rootAdmin}/add-admin`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: data
    }),
  updateAdmin: async (data, token) =>
    await fetch(`${rootAdmin}/update-profile`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: data
    }),
  deleteAdmin: async (id, token) =>
    await fetch(`${rootAdmin}/delete-admin/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  searchAdmin: async (query, token) =>
    await fetch(`${rootAdmin}?${query}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  changePassword: async (data, token) =>
    await fetch(`${rootAdmin}/change-password`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: data
    }),
  changeRole: async (id, token) =>
    await fetch(`${rootAdmin}/change-role/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  verifyEmail: async (token) =>
    await fetch(`${rootAdmin}/verify-email?${token}`, {
      method: 'POST'
    })
}

export default AdminAPI
