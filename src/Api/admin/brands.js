import http from '../../until/until'
const BrandsAPI = {
  getBrandsByID: (id) => http.get(`brands/${id}`),
  addBrands: (data) => http.post('brands/add', data),
  updateBrands: (id, data) => http.post(`brands/update/${id}`, data),
  deleteBrands: (id, data) => http.delete(`brands/${id}`, data),
  searchBrands: (data) => {
    return http.get(`brands?${data}`)
  }
}

export default BrandsAPI
