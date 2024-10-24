import http from '../../until/until'
const SuppliersAPI = {
  getSuppliers: () => http.get('suppliers'),
  addSuppliers: (data) => http.post('suppliers/add', data),
  updateSuppliers: (id, data) => http.post(`suppliers/update/${id}`, data),
  deleteSuppliers: (id) => http.post(`suppliers/${id}`),
  searchSuppliers: (data) => http.get(`suppliers?search=${data}`)
}

export default SuppliersAPI
