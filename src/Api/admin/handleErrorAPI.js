export const handleResponse = async (response, defaultErrorText = 'Error fetch') => {
  try {
    if (!response.ok) {
      const content_type = response.headers.get('content-type')
      let errorMessage = 'Unknown error occurred'

      if (content_type && content_type.includes('application/json')) {
        const res = await response.json()
        if (res.error) {
          const errorMessage = res.error
          if (errorMessage.includes('Unauthenticated')) {
            throw new Error('401. Bạn chưa được xác thực. Vui lòng đăng nhập để tiếp tục.')
          }
        }
        let messages = res?.messages?.join('. ') || res?.data?.join('. ') || res?.status || defaultErrorText

        if (messages) {
          throw new Error(messages)
        }

        // Xử lý các lỗi phổ biến từ phía client (4xx)
        switch (response.status) {
          case 400:
            errorMessage = 'Yêu cầu không hợp lệ. Kiểm tra dữ liệu đầu vào hoặc cấu hình yêu cầu.'
            break
          case 401:
            errorMessage = '401. Bạn chưa được xác thực. Vui lòng đăng nhập để tiếp tục.'
            throw new Error(errorMessage)
          case 403:
            errorMessage = 'Bạn không có quyền truy cập tài nguyên này. Vui lòng kiểm tra quyền truy cập của bạn.'
            break
          case 404:
            errorMessage = 'Tài nguyên bạn yêu cầu không tồn tại. Kiểm tra lại URL hoặc thông tin bạn nhập.'
            break
          case 405:
            errorMessage =
              'Phương thức yêu cầu không được phép. Hãy chắc chắn rằng bạn đang sử dụng phương thức HTTP chính xác.'
            break
          case 408:
            errorMessage = 'Yêu cầu của bạn bị hết thời gian chờ. Vui lòng thử lại.'
            break
          case 409:
            errorMessage = 'Xung đột dữ liệu đã xảy ra. Vui lòng kiểm tra lại và thử lại.'
            break
          case 429:
            errorMessage = 'Quá nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau.'
            break
          default:
            errorMessage = res.messages?.join('. ') || res?.data?.join('. ') || res.status || defaultErrorText
        }
      } else {
        // Xử lý khi response không phải là JSON hoặc lỗi chung
        errorMessage = `Lỗi với yêu cầu: ${response.statusText || defaultErrorText}. Vui lòng thử lại sau.`
      }

      throw new Error(errorMessage)
    }
    return true
  } catch (e) {
    throw e
  }
}

export const fetchWithAuth = async (
  url,
  method,
  token = undefined,
  defaultErrorText = 'Error fetch',
  body = undefined,
  content_type = 'multipart/form-data'
) => {
  try {
    const isFormData = content_type === 'multipart/form-data'
    const headers = {}

    if (!isFormData && body !== undefined) {
      headers['Content-Type'] = content_type
    }
    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }

    const options = {
      method,
      headers,
      body: body !== undefined ? body : undefined
    }
    const response = await fetch(url, options)
    const isResponseOK = await handleResponse(response, `${defaultErrorText} error with: [${method} ${url}]`)
    if (isResponseOK) {
      return await response.json()
    }
  } catch (e) {
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to server. Please check your internet connection')
    } else {
      throw e
    }
  }
}
