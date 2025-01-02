import http from '../../until/until'
const paymentAPI = {
  getAllPayment: () => http.get('payments'),
  getPaymentStatus: (params) => http.get('payments/ipn', { params: params }),
  getPaymentStatusApi2: (params) => http.get('payments/vnpay-return', { params: params })
}
export default paymentAPI
