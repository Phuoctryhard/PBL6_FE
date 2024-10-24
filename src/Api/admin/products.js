import { BASE_URL } from '../../until'
const rootProducts = `${BASE_URL}/products`
const ProductsAPI = {
  getProducts: async () => await fetch(rootProducts),
  addProducts: async (formData, token) =>
    await fetch(`${rootProducts}/add`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }),
  updateProducts: async (id, formData, token) =>
    await fetch(`${rootProducts}/update/${id}`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }),
  deleteProducts: async (id, token) =>
    await fetch(`${rootProducts}/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        product_is_delete: 1
      })
    }),
  restoreProducts: async (id, token) =>
    await fetch(`${rootProducts}/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        product_is_delete: 0
      })
    }),
  searchProducts: async (query) => await fetch(`${rootProducts}?${query}`)
}

export default ProductsAPI
