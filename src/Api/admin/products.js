import { fetchWithAuth } from './handleErrorAPI'
import { BASE_URL } from '../../until'
const rootProducts = `${BASE_URL}/products`
const ProductsAPI = {
  getProducts: async () => await fetchWithAuth(rootProducts, 'GET', undefined, 'fetch get all products'),
  getProductsNames: async () =>
    await fetchWithAuth(`${rootProducts}/names`, 'GET', undefined, 'fetch all product names'),
  getProductByID: async (id) => await fetchWithAuth(`${rootProducts}/${id}`, 'GET', undefined, 'fetch product by id'),
  addProducts: async (formData, token) =>
    await fetchWithAuth(`${rootProducts}/add`, 'POST', token, 'fetch add product', formData),
  updateProducts: async (id, formData, token) =>
    await fetchWithAuth(`${rootProducts}/update/${id}`, 'POST', token, 'fetch update product', formData),
  deleteProducts: async (id, token) =>
    await fetchWithAuth(
      `${rootProducts}/delete/${id}`,
      'POST',
      token,
      'fetch delete product',
      JSON.stringify({
        product_is_delete: 1
      }),
      'application/json'
    ),
  restoreProducts: async (id, token) =>
    await fetchWithAuth(
      `${rootProducts}/delete/${id}`,
      'POST',
      token,
      'fetch restore product',
      JSON.stringify({
        product_is_delete: 0
      }),
      'application/json'
    ),
  searchProducts: async (query) => await fetchWithAuth(`${rootProducts}?${query}`, 'GET', undefined, 'search products')
}

export default ProductsAPI
