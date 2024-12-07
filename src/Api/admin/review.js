import { BASE_URL } from '../../until'
import { fetchWithAuth } from './handleErrorAPI'
const rootReview = `${BASE_URL}/reviews`

const AdminReviewAPI = {
  getAllReview: async (token) => await fetchWithAuth(rootReview, 'GET', token, 'fetch get all review'),
  hiddenReviewByID: async (id, token) =>
    await fetchWithAuth(`${rootReview}/hidden/${id}`, 'POST', token, 'fetch hidden or unhidden review by id')
}

export default AdminReviewAPI
