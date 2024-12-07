import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootBrands = `${BASE_URL}/brands`
const BrandsAPI = {
  getBrands: async () => await fetchWithAuth(rootBrands, 'GET', undefined, 'fetch all brands'),
  addBrands: async (formData, token) => await fetchWithAuth(`${rootBrands}/add`, 'POST', token, 'add brand', formData),
  updateBrands: async (id, formData, token) =>
    await fetchWithAuth(`${rootBrands}/update/${id}`, 'POST', token, 'update brand', formData),
  deleteBrands: async (id, token) =>
    await fetchWithAuth(
      `${rootBrands}/${id}`,
      'DELETE',
      token,
      'delete brand',
      JSON.stringify({
        brand_is_delete: 1
      }),
      'application/json'
    ),
  restoreBrands: async (id, token) =>
    await fetchWithAuth(
      `${rootBrands}/delete/${id}`,
      'POST',
      token,
      'restore brand',
      JSON.stringify({
        brand_is_delete: 0
      }),
      'application/json'
    ),
  searchBrands: async (data) => await fetchWithAuth(`${rootBrands}?${data}`, 'GET', undefined, 'search brand')
}

export default BrandsAPI
