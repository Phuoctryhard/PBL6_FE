import axios from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.eum'
import { AuthResponse } from 'src/type/auth.type'
import { clearLS, getAccessToken, saveAccessToken, setProfileLS } from './auth'

class Http {
  instance
  // lỗi :  'accessToken' has no initializer and is not definitely assigned in the constructor. : ko dc use
  // khởi tạo biến ở class thì khởi tạo trong contructor luôn
  accessToken
  constructor() {
    //  this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          // header có thể undified -> kick chuột vô nó
          //authorization : viết đúng định dạng để server chấp nhận
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      // chuyển function (response) thành arrow function để truy cập dc private
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response
        // response.data.data?.access_token
      },
      function (error) {
        console.log(error)
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // nếu mà ko có error?.response?.data?.message lấy error.message
          // const data: any | undefined = error?.response?.data
          const message = error?.response?.data?.message || error.message
          console.log(message)
          // sử dụng 1 toast để hiển thị
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
