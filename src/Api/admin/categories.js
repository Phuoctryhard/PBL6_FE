import http from '../../until/until'
const CategoriesAPI = {
  getCategories: () => http.get('categories'),
  addCategories: (data) => http.post('categories', data),
  updateCategories: (data) => http.post('categories/update', data),
  deleteCategories: (id) => http.post(`categories/delete/${id}`),
  searchCategories: (data) => http.get(`categories?${data}`)
}

export default CategoriesAPI
