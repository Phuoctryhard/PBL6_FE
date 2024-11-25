import { BASE_URL } from '../../until'
const rootOverview = `${BASE_URL}/statistics`

const AdminOverView = {
  getProfitAndRevenue: async (searchParam, token) =>
    await fetch(`${rootOverview}/profit?${searchParam}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }),
  getOrderOverview: async (searchParam, token) =>
    await fetch(`${rootOverview}/order?${searchParam}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
}

export default AdminOverView
