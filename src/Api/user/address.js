import http from '../../until/until'
const AddressApi = {
  getProvinces: () => http.get('provinces'),
  getDistricts: (idProvince) => http.get(`districts/${idProvince}`),
  getWards: (idDestrict) => http.get(`wards/${idDestrict}`),
  // dia chi nguoi nhan hang
  getAddress_receive: () => http.get('receiver-address'),
  deleteAddress_receive: (id) => http.delete(`receiver-address/delete/${id}`),
  add_Address_receive: (data) => http.post('receiver-address/add', data),
  update_Address_receive: (id, data) => http.post(`receiver-address/update/${id}`, data),
  getAddressbyId: (id) => http.get(`receiver-address/${id}`)
}
export default AddressApi
