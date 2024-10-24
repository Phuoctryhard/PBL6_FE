import { BASE_URL } from '../../until'
const rootCategories = `${BASE_URL}/categories`
const CategoriesAPI = {
  getCategories: async () => await fetch(rootCategories),
  addCategories: async (formData, token) =>
    await fetch(`${rootCategories}/add`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }),
  updateCategories: async (id, formData, token) =>
    await fetch(`${rootCategories}/update/${id}`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token
      },
      body: formData
    }),
  deleteCategories: async (id, token) =>
    await fetch(`${rootCategories}/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        category_is_delete: 1
      })
    }),
  restoreCategories: async (id, token) =>
    await fetch(`${rootCategories}/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        category_is_delete: 0
      })
    }),
  searchCategories: async (token, data) =>
    await fetch(`${rootCategories}/all?${data}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    })
}

export default CategoriesAPI
