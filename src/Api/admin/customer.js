import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootCustomer = `${BASE_URL}/admin`

const CustomerAPI = {
  getAllCustomer: async (token) =>
    await fetchWithAuth(`${rootCustomer}/manage-users`, 'GET', token, 'fetch all customers'),
  changeBlock: async (id, token) =>
    await fetchWithAuth(`${rootCustomer}/change-block/${id}`, 'POST', token, 'change block user'),
  deleteCustomer: async (id, token) =>
    await fetchWithAuth(`${rootCustomer}/delete-user/${id}`, 'POST', token, 'delete user')
}

export default CustomerAPI
