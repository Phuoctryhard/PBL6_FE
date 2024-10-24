import http from '../../until/until'
const brandAPI = {
  getNameBrand: () => http.get('brands/names')
}
export default brandAPI
