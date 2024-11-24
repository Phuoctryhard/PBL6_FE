import { BASE_URL } from '../../until'
const rootDeliveryMethod = `${BASE_URL}/delivery-methods`
const rootDelivery = `${BASE_URL}/deliveries`

const AdminDeliveryAPI = {
  getAllDeliveryMethod: async (token) =>
    await fetch(`${rootDeliveryMethod}/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  getAllDelivery: async (token) =>
    await fetch(`${rootDelivery}/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  getDeliveryByID: async (token, id) =>
    await fetch(`${BASE_URL}/deliveries/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  addDeliveryMethod: async (token, data) =>
    await fetch(`${rootDeliveryMethod}/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    }),
  updateDeliveryMethod: async (token, id, data) =>
    await fetch(`${rootDeliveryMethod}/update/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    }),
  deleteDeliveryMethod: async (token, id, formData) =>
    await fetch(`${rootDeliveryMethod}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
}

export default AdminDeliveryAPI
