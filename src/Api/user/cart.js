import http from '../../until/until'
const CartAPI = {
  getCart: () => http.get('cart'),
  deleteCart: (idcart) => http.post(`cart/delete/${idcart}`),
  updateCart: (data) => http.post(`cart/update`, data),
  deleteManyCart: (data) => http.post(`cart/delete-many`, data),
  addproduct_inCart: (data) => http.post(`cart/add`, data)
}
export default CartAPI
