import http from '../../until/until'
const diseaseAPI = {
  getCategeryDisease: (id) => http.get(`disease/getCategory/${id}`),
  getdisease: () => http.get('disease/get'),
  getDetailDisease: (id) => http.get(`disease/${id}`)
}
export default diseaseAPI
