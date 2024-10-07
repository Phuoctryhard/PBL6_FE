import http from '../../until/until'
const CartAPI = {
  getCart: () => http.get('cart'),
  deleteCart: (idcart) => http.post(`cart/delete/${idcart}`),
  
}
export default CartAPI
