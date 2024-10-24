import { BASE_URL } from '../../until'
const rootBrands = `${BASE_URL}/brands`
const BrandsAPI = {
  getBrands: async () => await fetch(rootBrands),
  addBrands: async (formData, token) =>
    await fetch(`${rootBrands}/add`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }),
  updateBrands: async (id, formData, token) =>
    await fetch(`${rootBrands}/update/${id}`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }),
  deleteBrands: async (id, token) =>
    await fetch(`${rootBrands}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        brand_is_delete: 1
      })
    }),
  restoreBrands: async (id, token) =>
    await fetch(`${rootBrands}/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        brand_is_delete: 0
      })
    }),
  searchBrands: async (data) => await fetch(`${rootBrands}?${data}`)
}

export default BrandsAPI
