import { BASE_URL } from '../../until'
const rootAdminURL = BASE_URL + '/admin'

const AdminAuthAPI = {
  loginAccountAdmin: async (formData) =>
    await fetch(`${rootAdminURL}/login`, {
      method: 'POST',
      body: formData
    }).then((res) => res.json()),

  forgotPassword: async (email) =>
    await fetch(`${rootAdminURL}/forgot-password`, {
      method: 'POST',
      body: email
    }).then((res) => res.json()),
  resetPassword: async (data) =>
    await fetch(`${rootAdminURL}/reset-password`, {
      method: 'POST',
      body: data
    }).then((res) => res.json())
}

export default AdminAuthAPI
