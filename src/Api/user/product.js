import http from '../../until/until'
const productAPI = {
  getProductById: (id) => http.get(`products/${id}`),
  getNameProduct: () => http.get('products/name'),
  getAllProduct: (params) => http.get('products', { params: params })
}
export default productAPI
