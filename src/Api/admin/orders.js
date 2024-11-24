import { BASE_URL } from '../../until'
const rootOrder = `${BASE_URL}/orders`

const AdminOrderApi = {
  getAllOrder: async (token) =>
    await fetch(`${rootOrder}/all`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).catch((err) => {
      throw new Error(err.message)
    }),
  getOrderById: async (id, token) =>
    await fetch(`${rootOrder}/detail-order/${id}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).catch((err) => {
      throw new Error(err.message)
    })
}

export default AdminOrderApi
