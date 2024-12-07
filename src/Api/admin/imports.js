import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootImport = `${BASE_URL}/imports`
const ImportsAPI = {
  getAllImports: async (token) => await fetchWithAuth(`${rootImport}`, 'GET', token, 'get all imports'),
  getImportById: async (token, id) => await fetchWithAuth(`${rootImport}/${id}`, 'GET', token, 'get import by ID'),
  addImport: async (token, body) =>
    await fetchWithAuth(`${rootImport}/add`, 'POST', token, 'add import', JSON.stringify(body), 'application/json'),
  updateImport: async (token, id, body) =>
    await fetch(`${rootImport}/update/${id}`, 'POST', token, 'update import', JSON.stringify(body), 'application/json')
}

export default ImportsAPI
