import { BASE_URL } from '../../until'
const rootImport = `${BASE_URL}/imports`

export const ImportsAPI = {
  getAllImports: async (token) =>
    await fetch(`${rootImport}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }),
  getImportById: async (token, id) =>
    await fetch(`${rootImport}/${id}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }),
  addImport: async (token, body) =>
    await fetch(`${rootImport}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }).catch((error) => {
      throw new Error(error)
    }),
  updateImport: async (token, id, body) =>
    await fetch(`${rootImport}/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }).catch((error) => {
      throw new Error(error)
    })
}
