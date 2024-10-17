import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
export const schemaLogin = yup.object({
  email: yup.string().required().email('Không đúng đinh dạng email'),
  password: yup.string().min(3, 'Độ dài ít nhất là 3').required()
})

export const schemaRegister = yup.object({
  fullname: yup.string().min(5, 'Độ dài ít nhất 5 ki tự'),
  email: yup.string().required().email('Không đúng đinh dạng email'),
  password: yup.string().min(3, 'Độ dài ít nhất là 3').required(),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu phải khớp nhau')
})
