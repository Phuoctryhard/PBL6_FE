import http from '../../until/until'
const deaseaAPI = {
  getCategery: () => http.get('categories')
}
export default deaseaAPI
