import { BASE_URL } from '../../until'
const rootSupplier = `${BASE_URL}/suppliers`

const SupplierAPI = {
  getAllSuppliers: async (token) =>
    await fetch(rootSupplier, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  getSupplierById: async (id, token) =>
    await fetch(`${rootSupplier}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  addSupplier: async (formData, token) =>
    await fetch(`${rootSupplier}/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }),
  updateSupplier: async (id, formData, token) =>
    await fetch(`${rootSupplier}/update/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }),
  deleteSupplier: async (id, token, data) =>
    await fetch(`${rootSupplier}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
}

export default SupplierAPI
