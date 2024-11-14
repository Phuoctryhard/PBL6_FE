import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootOverview = `${BASE_URL}/statistics`
const AdminOverView = {
  getProfitAndRevenue: async (searchParam, token) =>
    await fetchWithAuth(`${rootOverview}/profit?${searchParam}`, 'GET', token, 'fetch get profit and revenue'),
  getOrderOverview: async (searchParam, token) =>
    await fetchWithAuth(`${rootOverview}/order?${searchParam}`, 'GET', token, 'fetch get order overview')
}

export default AdminOverView
