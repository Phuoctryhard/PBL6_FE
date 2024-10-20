import http from '../../until/until'
const categoryAPI = {
  getCategery: () => http.get('categories')
}
export default categoryAPI
