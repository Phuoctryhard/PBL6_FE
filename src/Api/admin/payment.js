import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootPayment = `${BASE_URL}/payments`
const rootPaymentMethod = `${BASE_URL}/payment-methods`

const AdminPaymentApi = {
  getAllPayments: async (token) => await fetchWithAuth(`${rootPayment}/all`, 'GET', token, 'get all payments'),
  getPaymentsByID: async (id, token) =>
    await fetchWithAuth(`${rootPayment}/payments/${id}`, 'GET', token, 'get payment by ID'),
  changeStatus: async (id, token, formData) =>
    await fetchWithAuth(`${rootPayment}/update/${id}`, 'POST', token, 'change payment status', formData),
  getAllPaymentMethod: async (token) =>
    await fetchWithAuth(`${rootPaymentMethod}/all`, 'GET', token, 'get all payment methods'),
  getPaymentMethodByID: async (id, token) =>
    await fetchWithAuth(`${rootPaymentMethod}/${id}`, 'GET', token, 'get payment method by ID')
}

export default AdminPaymentApi
