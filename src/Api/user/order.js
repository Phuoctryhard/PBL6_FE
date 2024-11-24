import http from '../../until/until'
const OrderApi = {
  ///api/orders/historyXem lịch sử đơn hàng
  getHistoryOrder: () => http.get('orders/history'),
  //chi tiết giỏ hàng
  getDatailCartOrder: (id) => http.get(`orders/detail/${id}`),
  // Thanh toán từ giỏ hàng
  Checkout_CartOrder: (data) => http.post(`orders/checkout-cart`, data),
  ///api/orders/cancel/{id}Huỷ đơn hàng.( chỉ huỷ khi status_order=pending, confirmed
  Cancel_CartOrder: (id) => http.post(`orders/cancel/${id}`),
  //user mua hàng trực tiếp từ sản phẩm chi tiết
  BuyProduct_DetailProduct: (data) => http.post(`orders/buy-now`, data),
  ///orders/payos/40/payos
  OrdersPayos: (id) => {
    return http.post(`orders/payos/${id}/cancel`)
  }
}
export default OrderApi
