import http from '../../until/until'
const rootCategories = 'https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/categories'
const CategoriesAPI = {
  getCategories: () => http.get('categories'),
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
  searchCategories: (data) => http.get(`categories?${data}`)
}

export default CategoriesAPI
