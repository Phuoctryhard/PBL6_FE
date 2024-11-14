import http from '../../until/until'
const paymentAPI = {
  getAllPayment: () => http.get('payments')
}
export default paymentAPI
