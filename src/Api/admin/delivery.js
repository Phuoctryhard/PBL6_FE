import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootDeliveryMethod = `${BASE_URL}/delivery-methods`
const rootDelivery = `${BASE_URL}/deliveries`

const AdminDeliveryAPI = {
  getAllDeliveryMethod: async (token) =>
    await fetchWithAuth(`${rootDeliveryMethod}/all`, 'GET', token, 'get all delivery methods'),
  getAllDelivery: async (token) => await fetchWithAuth(`${rootDelivery}/all`, 'GET', token, 'get all delivery'),
  getDeliveryByID: async (token, id) =>
    await fetchWithAuth(`${BASE_URL}/deliveries/${id}`, 'GET', token, 'get delivery by ID'),
  addDeliveryMethod: async (token, data) =>
    await fetchWithAuth(`${rootDeliveryMethod}/add`, 'POST', token, 'add delivery method', data),
  updateDeliveryMethod: async (token, id, data) =>
    await fetchWithAuth(`${rootDeliveryMethod}/update/${id}`, 'POST', token, 'update delivery method', data),
  deleteDeliveryMethod: async (token, id, formData) =>
    await fetchWithAuth(`${rootDeliveryMethod}/${id}`, 'DELETE', token, 'delete delivery method', formData)
}

export default AdminDeliveryAPI
