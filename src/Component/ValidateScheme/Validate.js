import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
export const schemaLogin = yup.object({
  email: yup.string().required().email('Không đúng đinh dạng email'),
  password: yup.string().min(3, 'Độ dài ít nhất là 3').required()
})
