import http from '../../until/until'
const ReviewAPI = {
  ///api/reviews/product/{id}
  getReviewsProductById: (id) => http.get(`reviews/product/${id}`),
  // thêm đánh giá
  getAddReviewProduct: (data) =>
    http.post('reviews/add', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}
export default ReviewAPI
