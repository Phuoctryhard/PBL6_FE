import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import AddressApi from '../../../../../../Api/user/address'
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../../../../../../index.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Schema validation với Yup
const schema = yup
  .object({
    fullName: yup
      .string()
      .min(2, 'Họ và tên phải từ 2 ký tự trở lên')
      .max(50, 'Họ và tên không quá 50 ký tự')
      .required('Vui lòng điền họ tên trong khoảng từ 2 - 50 ký tự.'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại.'),
    city: yup.string().required('Vui lòng nhập thông tin.'),
    district: yup.string().required('Vui lòng nhập thông tin.'),
    ward: yup.string().required('Vui lòng nhập thông tin.'),
    numberHome: yup.string().required('Vui lòng nhập thông tin.')
  })
  .required()
export default function AddressForm({ closeModal }) {
  const [wards, setWards] = useState([])
  const [districts, setDistricts] = useState([])
  const [provinces, setProvinces] = useState([])
  const { data: provincesData } = useQuery({
    queryKey: ['getProvince'],
    queryFn: AddressApi.getProvinces
  })
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  // Mutations add diachi
  const mutation = useMutation({
    mutationFn: AddressApi.add_Address_receive,
    onSuccess: () => {
      toast.success('Thêm thành công ')
      queryClient.invalidateQueries({ queryKey: ['getAddress'] })
    }
  })

  const onSubmit = (data) => {
    // const NameWards = wards.find((element) => {
    //   return element.id == data.ward
    // })
    if (data.numberHome) {
      data.numberHome = data.numberHome.replace(/,/g, '')
    }
    // console.log(data)
    //console.log(NameWards)
    console.log(data)
    // const addressMain = data.numberHome + ',' + NameWards.name + ',' + data.District + ',' + data.Province

    const address_Receive = {
      receiver_name: data.fullName,
      receiver_phone: data.phoneNumber, //required
      receiver_address: data.numberHome,
      province_id: +data.city,
      district_id: +data.district,
      ward_id: +data.ward
    }
    console.log(address_Receive)
    mutation.mutate(address_Receive)
    reset()
    closeModal()
  }
  useEffect(() => {
    if (provincesData) {
      setProvinces(provincesData.data.data) // Cập nhật state Provice  với dữ liệu mới
    }
  }, [])
  const handleProviceChange = async (e) => {
    const selectedDProviceId = e.target.value
    if (selectedDProviceId) {
      const { data } = await AddressApi.getDistricts(selectedDProviceId)
      //  lấy ra tỉnh
      const NameProvice = provincesData.data.data.find((element) => {
        return element.id == selectedDProviceId
      })

      //setValue('Province', NameProvice.name)
      console.log(data.data)
      setDistricts(data.data) // Cập nhật danh sách huyen
    }
  }
  const handleDistrictChange = async (e) => {
    const selectedDistrictId = e.target.value
    if (selectedDistrictId) {
      const { data: award } = await AddressApi.getWards(selectedDistrictId)
      const NameDistrict = districts.find((element) => {
        return element.id == selectedDistrictId
      })
      console.log(NameDistrict.name)
      // setValue('District', NameDistrict.name)
      setWards(award.data) // Cập nhật danh sách xã
    }
  }
  const handleBack = () => {
    reset()
    closeModal()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg mx-auto p-1 bg-white rounded-lg shadow-md'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Họ và tên</label>
        <input
          {...register('fullName')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          placeholder='Nhập họ và tên'
        />
        <p className='text-red-500 text-sm mt-1'>{errors.fullName?.message}</p>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Số điện thoại</label>
        <input
          {...register('phoneNumber')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          placeholder='Nhập số điện thoại'
        />
        <p className='text-red-500 text-sm mt-1'>{errors.phoneNumber?.message}</p>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Địa chỉ</label>
        <select
          {...register('city')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          onChange={handleProviceChange} // Đảm bảo đây là hàm xử lý sự kiện đúng
          defaultValue='' // Đặt giá trị mặc định là rỗng
        >
          <option disabled value=''>
            Chọn Tỉnh/Thành phố
          </option>
          {provincesData?.data?.data &&
            provincesData.data.data.map((element) => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
        </select>
        <p className='text-red-500 text-sm mt-1'>{errors.city?.message}</p>

        <select
          {...register('district')}
          className={`w-full px-3 py-2 mt-3 border rounded-md focus:outline-none focus:ring-2 ${errors.district ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          onChange={handleDistrictChange}
          defaultValue='' // Đặt giá trị mặc định là rỗng
        >
          <option disabled value=''>
            Chọn Quận/Huyện
          </option>

          {districts &&
            districts.map((element) => {
              return <option value={element.id}>{element.name}</option>
            })}
        </select>
        <p className='text-red-500 text-sm mt-1'>{errors.district?.message}</p>

        <select
          {...register('ward')}
          className={`w-full px-3 py-2 mt-3 border rounded-md focus:outline-none focus:ring-2 ${errors.ward ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          defaultValue='' // Đặt giá trị mặc định là rỗng
        >
          <option disabled value=''>
            Chọn Phường/Xã
          </option>
          {wards &&
            wards.map((element) => {
              return <option value={element.id}>{element.name}</option>
            })}
        </select>
        <p className='text-red-500 text-sm mt-1'>{errors.ward?.message}</p>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Số nhà số đường</label>
        <input
          {...register('numberHome')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.numberHome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          placeholder='Nhập số nhà số đường'
        />
        <p className='text-red-500 text-sm mt-1'>{errors.numberHome?.message}</p>
      </div>

      <div className='flex justify-between mt-6'>
        <button type='button' className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md' onClick={handleBack}>
          Quay lại
        </button>
        <button type='submit' className='px-4 py-2 bg-blue  text-gray-700  rounded-md'>
          Lưu lại
        </button>
      </div>
    </form>
  )
}
