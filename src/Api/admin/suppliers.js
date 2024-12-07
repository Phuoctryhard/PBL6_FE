import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootSupplier = `${BASE_URL}/suppliers`

const SupplierAPI = {
  getAllSuppliers: async (token) => await fetchWithAuth(rootSupplier, 'GET', token, 'fetch get all suppliers'),
  getSupplierById: async (id, token) =>
    await fetchWithAuth(`${rootSupplier}/${id}`, 'GET', token, 'get supplier by ID'),
  addSupplier: async (formData, token) =>
    await fetchWithAuth(`${rootSupplier}/add`, 'POST', token, 'add supplier', formData),
  updateSupplier: async (id, formData, token) =>
    await fetchWithAuth(`${rootSupplier}/update/${id}`, 'POST', token, 'update supplier', formData),
  deleteSupplier: async (id, token, data) =>
    await fetchWithAuth(
      `${rootSupplier}/${id}`,
      'DELETE',
      token,
      'delete supplier',
      JSON.stringify(data),
      'application/json'
    )
}

export default SupplierAPI
