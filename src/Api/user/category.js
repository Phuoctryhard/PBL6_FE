import http from '../../until/until'
const categoryAPI = {
  getCategery: () => http.get('categories'),
  getCategorybyId: (id) => http.get(`categories/${id}`),
  getName_Category: () => http.get('categories/names')
}
export default categoryAPI
