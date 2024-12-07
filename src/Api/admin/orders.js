import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootOrder = `${BASE_URL}/orders`

const AdminOrderApi = {
  getAllOrder: async (token) => await fetchWithAuth(`${rootOrder}/all`, 'GET', token, 'fetch get all orders'),
  getOrderById: async (id, token) =>
    await fetchWithAuth(`${rootOrder}/detail-order/${id}`, 'GET', token, 'fetch detail order by id'),
  updateStatus: async (id, token) =>
    await fetchWithAuth(`${rootOrder}/update-status/${id}`, 'POST', token, 'update order status'),
  cancelOrder: async (id, token, queryParam) =>
    await fetchWithAuth(`${rootOrder}/update-status/${id}?${queryParam}`, 'POST', token, 'cancel order')
}

export default AdminOrderApi
