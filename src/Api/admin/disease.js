import { BASE_URL } from '../../until'
const rootDisease = `${BASE_URL}/disease`

const AdminDiseaseApi = {
  getAllDisease: async (token, per_page = 999999) =>
    await fetch(`${rootDisease}/getAll?per_page=${per_page}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).catch((err) => {
      throw new Error(err.message)
    }),
  getAllDiseaseCategory: async () =>
    await fetch(`${rootDisease}/get`).catch((err) => {
      throw new Error(err.message)
    }),
  getDiseaseById: async (id) =>
    await fetch(`${rootDisease}/${id}`, {
      method: 'GET'
    }).catch((err) => {
      throw new Error(err.message)
    }),
  getCategoryDiseaseByID: async (id) =>
    await fetch(`${rootDisease}/getCategory/${id}`, {
      method: 'GET'
    }).catch((err) => {
      throw new Error(err.message)
    }),
  getCategoryByDiseaseID: async (id, token) =>
    await fetch(`${rootDisease}/categoryDisease/${id}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).catch((err) => {
      throw new Error(err.message)
    }),
  addDisease: async (formData, token) =>
    await fetch(`${rootDisease}/add`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }).catch((err) => {
      throw new Error(err.message)
    }),
  updateDisease: async (id, formData, token) =>
    await fetch(`${rootDisease}/update/${id}`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }).catch((err) => {
      throw new Error(err.message)
    }),
  deleteDisease: async (id, token, data) =>
    await fetch(`${rootDisease}/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        disease_is_delete: data
      })
    }).catch((err) => {
      throw new Error(err.message)
    }),
  addDiseaseToCategory: async (formData, token) =>
    await fetch(`${rootDisease}/addCategory`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }).catch((err) => {
      throw new Error(err.message)
    }),
  deleteDiseaseFromCategory: async (formData, token) =>
    await fetch(`${rootDisease}/deleteCategory`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }).catch((err) => {
      throw new Error(err.message)
    })
}

export default AdminDiseaseApi
