import { BASE_URL } from '../../until'
const rootCustomer = `${BASE_URL}/admin`

const CustomerAPI = {
  getAllCustomer: async (token) =>
    await fetch(`${rootCustomer}/manage-users`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  changeBlock: async (id, token) =>
    await fetch(`${rootCustomer}/change-block/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  deleteCustomer: async (id, token) =>
    await fetch(`${rootCustomer}/delete-user/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
}

export default CustomerAPI
