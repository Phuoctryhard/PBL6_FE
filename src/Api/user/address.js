import http from '../../until/until'
const AddressApi = {
  getProvinces: () => http.get('provinces'),
  getDistricts: (idProvince) => http.get(`districts/${idProvince}`),
  getWards: (idDestrict) => http.get(`wards/${idDestrict}`),
  getAddress_receive: () => http.get(` `)
}
export default AddressApi
