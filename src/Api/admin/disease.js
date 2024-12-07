import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootDisease = `${BASE_URL}/disease`
const AdminDiseaseApi = {
  getAllDisease: async (token, per_page = 999999) =>
    await fetchWithAuth(`${rootDisease}/getAll?per_page=${per_page}`, 'GET', token, 'get all diseases'),
  getAllDiseaseCategory: async () =>
    await fetchWithAuth(`${rootDisease}/get`, 'GET', undefined, 'get all disease category'),
  getDiseaseById: async (id) =>
    await fetchWithAuth(`${rootDisease}/${id}`, 'GET', undefined, 'get all disease category'),
  getCategoryDiseaseByID: async (id) =>
    await fetchWithAuth(`${rootDisease}/getCategory/${id}`, 'GET', undefined, 'get category disease by ID'),
  getCategoryByDiseaseID: async (id, token) =>
    await fetchWithAuth(`${rootDisease}/categoryDisease/${id}`, 'GET', token, 'get category by disease ID'),
  uploadDiseaseImage: async (image, token) =>
    await fetchWithAuth(`${BASE_URL}/image/upload`, 'POST', token, 'upload image', image),
  addDisease: async (formData, token) =>
    await fetchWithAuth(`${rootDisease}/add`, 'POST', token, 'add disease', formData),
  updateDisease: async (id, formData, token) =>
    await fetchWithAuth(`${rootDisease}/update/${id}`, 'POST', token, 'update disease', formData),
  deleteDisease: async (id, token, data) =>
    await fetchWithAuth(
      `${rootDisease}/delete/${id}`,
      'POST',
      token,
      'delete disease',
      JSON.stringify({
        disease_is_delete: data
      }),
      'application/json'
    ),
  addDiseaseToCategory: async (formData, token) =>
    await fetchWithAuth(`${rootDisease}/addCategory`, 'POST', token, 'add disease to category', formData),
  deleteDiseaseFromCategory: async (formData, token) =>
    await fetchWithAuth(`${rootDisease}/deleteCategory`, 'POST', token, 'delete disease from category', formData)
}

export default AdminDiseaseApi
