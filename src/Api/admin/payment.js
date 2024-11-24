import { BASE_URL } from '../../until'
const rootPayment = `${BASE_URL}/payments`
const rootPaymentMethod = `${BASE_URL}/payment-methods`

const AdminPaymentApi = {
  getAllPayments: async (token) =>
    await fetch(`${rootPayment}/all`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  getPaymentsByID: async (id, token) =>
    await fetch(`${rootPayment}/payments/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  changeStatus: async (id, token, formData) =>
    await fetch(`${rootPayment}/update/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: formData
    }),
  getAllPaymentMethod: async (token) =>
    await fetch(`${rootPaymentMethod}/all`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  getPaymentMethodByID: async (id, token) =>
    await fetch(`${rootPaymentMethod}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
}

export default AdminPaymentApi
