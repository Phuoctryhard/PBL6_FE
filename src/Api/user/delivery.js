import http from '../../until/until'
const DeliveryAPI = {
  getDelivery: () => http.get('deliveries'),
  
}
export default DeliveryAPI
