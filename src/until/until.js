import axios from 'axios'
import { getAccessToken } from '.'

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

        return response
        // response.data.data?.access_token
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
// import axios from 'axios'
//import { getAccessToken } from './auth'

// class Http {
//   instance
//   _accessToken
//   constructor() {
//     this.accessToken = getAccessToken()
//     this.instance = axios.create({
//       // baseURL: 'https://8h8zcx79-4000.asse.devtunnels.ms/',
//       baseURL: 'http://localhost:4000/',
//       timeout: 10000,
//       headers: { 'Content-Type': 'application/json' }
//     })

//     this.instance.interceptors.request.use(
//       (config) => {
//         if (this._accessToken && config.headers) {
//           config.headers.authorization = this._accessToken
//           return config
//         }
//         return config
//       },
//       (error) => {
//         return Promise.reject(error)
//       }
//     )
//     this.instance.interceptors.response.use(
//       (response) => {
//         console.log(response)
//         return response
//       },
//       (error) => {
//         return Promise.reject(error)
//       }
//     )
//   }
// }
// const http = new Http().instance
// export default http
