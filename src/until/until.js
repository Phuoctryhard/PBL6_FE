import axios from 'axios'
import { getAccessToken, saveAccessToken, tokenBear } from '.'

class Http {
  instance
  // lỗi :  'accessToken' has no initializer and is not definitely assigned in the constructor. : ko dc use
  // khởi tạo biến ở class thì khởi tạo trong contructor luôn
  accessToken
  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: 'https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/',
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
          console.log(this.accessToken)
          config.headers.Authorization = this.accessToken

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
        console.log(response)
        const { url } = response.config
        if (url == 'user/login') {
          const tokenBear = 'Bearer ' + response.data.data?.access_token
          this.accessToken = tokenBear
          console.log(this.accessToken)
          saveAccessToken(response.data.data?.access_token)
        }
        return response
      },
      function (error) {
        console.log(error)
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
