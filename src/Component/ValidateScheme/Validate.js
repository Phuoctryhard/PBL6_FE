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

export const schemaChangePassword = yup
  .object({
    current_password: yup.string().required('Vui lòng nhập mật khẩu hiện tại.'),
    new_password: yup
      .string()
      .required('Mật khẩu mới phải từ 6-18 ký tự.')
      .min(6, 'Mật khẩu mới phải từ 6-18 ký tự.')
      .max(18, 'Mật khẩu mới không được quá 18 ký tự.'),
    // .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một ký tự viết hoa.'),
    new_password_confirmation: yup
      .string()
      .oneOf([yup.ref('new_password'), null], 'Mật khẩu xác nhận phải khớp với mật khẩu mới.')
      .required('Mật khẩu mới phải từ 6-18 ký tự.')
    // .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một ký tự viết hoa.')
  })
  .required()
