import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootCategories = `${BASE_URL}/categories`
const CategoriesAPI = {
  getCategories: async () => await fetchWithAuth(rootCategories, 'GET', undefined, 'fetch all categories'),
  getAllCategories: async (token) => await fetchWithAuth(`${rootCategories}/all`, 'GET', token, 'fetch all categories'),
  addCategories: async (formData, token) =>
    await fetchWithAuth(`${rootCategories}/add`, 'POST', token, 'add category', formData),
  updateCategories: async (id, formData, token) =>
    await fetchWithAuth(`${rootCategories}/update/${id}`, 'POST', token, 'update category', formData),
  deleteCategories: async (id, token) =>
    await fetchWithAuth(
      `${rootCategories}/delete/${id}`,
      'POST',
      token,
      'delete category',
      JSON.stringify({
        category_is_delete: 1
      }),
      'application/json'
    ),
  restoreCategories: async (id, token) =>
    await fetchWithAuth(
      `${rootCategories}/delete/${id}`,
      'POST',
      token,
      'restore category',
      JSON.stringify({
        category_is_delete: 0
      }),
      'application/json'
    ),
  searchCategories: async (token, data) =>
    await fetchWithAuth(`${rootCategories}/all?${data}`, 'GET', token, 'search category')
}

export default CategoriesAPI
