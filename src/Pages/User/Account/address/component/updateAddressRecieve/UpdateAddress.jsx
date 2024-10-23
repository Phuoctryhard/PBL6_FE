import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Select } from 'antd'
import { Modal } from 'antd'
import { useQueries } from '@tanstack/react-query'

import { useQuery, useMutation } from '@tanstack/react-query'
import AddressApi from '../../../../../../Api/user/address'
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
    ward: yup.string().required('Vui lòng nhập thông tin.')
  })
  .required()
export default function UpdateAddress({ queryClient, receiver_address_id }) {
  const [wards, setWards] = useState([])
  const [districts, setDistricts] = useState([])
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const { Option } = Select
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  console.log('oki' + receiver_address_id)
  const handleBack = () => {
    setIsModalOpenUpdate(false)
  }

  // lấy ra tinh
  const { data: provincesData } = useQuery({
    queryKey: ['getProvince'],
    queryFn: AddressApi.getProvinces
  })
  // lấy ra  huyen

  // cập nhật
  // Mutations
  const mutation = useMutation({
    mutationFn: ({ id, data }) => AddressApi.update_Address_receive(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Cập nhật thành công')
      queryClient.invalidateQueries({ queryKey: ['getAddress'] })
      setIsModalOpenUpdate(false)
    },
    onError: () => {
      toast.error('Cập nhật không thành công')
    }
  })
  const onSubmit = (data) => {
    const addressMain = data.ward + ',' + data.district + ',' + data.city
    const address_Receive = {
      receiver_name: data.fullName,
      receiver_phone: data.phoneNumber, //required
      receiver_address: addressMain
    }
    const id = receiver_address_id
    console.log(id)
    mutation.mutate({ id, data: address_Receive })
  }

  const handleChange = (value) => {
    // setSelectedProvince(value) // Cập nhật giá trị tỉnh/thành phố đã chọn
    // console.log('Bạn đã chọn:', value) // In ra giá trị vừa chọn
  }

  // Xử lí modal
  // Hàm mở modal cập nhật
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
  const showModalUpdate = () => {
    setIsModalOpenUpdate(true) // Đúng cách cập nhật state
  }
  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false)
  }
  const handleOkUpdate = () => {
    setIsModalOpenUpdate(false)
  }
  // lay ra dia chi theo id
  const { data, isLoading } = useQuery({
    queryKey: ['todos', receiver_address_id],
    queryFn: () => AddressApi.getAddressbyId(receiver_address_id)
  })

  useEffect(() => {
    if (data) {
      const addressParts = data.data.data.receiver_address.split(',')

      const ward = addressParts[0] // Phường Tiên Nội
      const district = addressParts[1] // Thị xã Duy Tiên
      const province = addressParts[2] // Tỉnh Hà Nam
      setValue('fullName', data.data.data.receiver_name)
      setValue('phoneNumber', data.data.data.receiver_phone)
      setValue('city', province)
      setValue('district', district)
      setValue('ward', ward)
      console.log('display ')
      setProvinces(provincesData.data.data)
      console.log(provincesData.data.data)
      // console.log(data.data)
    }
  }, [data, setValue])
  // if (isLoading) return <div>Loading...</div>

  const handleProviceChange = async (value) => {
    {
      // Xử lý sự kiện khi thay đổi giá trị
      console.log('Giá trị đã chọn:', value)
      setValue('city', value) // Cập nhật giá trị cho form state
      setValue('district', '')
      setValue('ward', '')
      //tinh  quang binh => lay ra danh sach huyen theo id tinh
      const { id } = provinces.find((element) => {
        return element.name == value
      })
      // tìm kiem huyen theo id tinh
      if (id) {
        const { data } = await AddressApi.getDistricts(id)
        setDistricts(data.data) // Cập nhật danh sách huyen
      }
    }
  }

  const handleDistrictChange = async (value) => {
    // lay ra id cua huyen
    console.log(value)
    setValue('district', value)
    setValue('ward', '')
    const { id } = districts.find((element) => {
      return element.name == value
    })
    if (id) {
      const { data: award } = await AddressApi.getWards(id)
      setWards(award.data) // Cập nhật danh sách xã
    }
  }
  // Focus vao huyen hiện data
  const handleFocus = async () => {
    // lay id tinh
    const currentCity = getValues('city')
    const { id } = provinces.find((element) => {
      return element.name == currentCity
    })
    // tìm kiem huyen theo id tinh
    if (id) {
      const { data } = await AddressApi.getDistricts(id)
      setDistricts(data.data) // Cập nhật danh sách huyen
    }
  }
  return (
    <>
      <button className='text-blue ' onClick={showModalUpdate}>
        Cập nhật
      </button>
      <Modal
        title='Cập nhật Địa chỉ'
        open={isModalOpenUpdate}
        onOk={handleOkUpdate}
        onCancel={handleCancelUpdate}
        footer={null}
      >
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
            <div className='mb-4'>
              <Controller
                name='city' // Tên của field trong form
                control={control}
                // defaultValue=''
                render={({ field }) => (
                  <Select
                    {...field} // Kết nối với React Hook Form
                    showSearch
                    placeholder='Chọn Tỉnh/Thành phố'
                    optionFilterProp='children'
                    style={{ width: '100%' }}
                    filterOption={(input, option) =>
                      (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={handleProviceChange}
                  >
                    {provinces.map((province, index) => (
                      <Option key={index} value={province.name}>
                        {province.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
            </div>
            <div className='mb-4'>
              <Controller
                name='district' // Tên của field trong form
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Select
                    {...field} // Kết nối với React Hook Form
                    showSearch
                    placeholder='Chọn Huyện'
                    optionFilterProp='children'
                    style={{ width: '100%' }}
                    filterOption={(input, option) =>
                      (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={handleDistrictChange}
                    onFocus={handleFocus} // Hiển thị data khi focus
                  >
                    {districts.map((district, index) => (
                      <Option key={index} value={district.name}>
                        {district.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.district && <p style={{ color: 'red' }}>{errors.district.message}</p>}
            </div>
            <div className='mb-4'>
              <Controller
                name='ward' // Tên của field trong form
                control={control}
                render={({ field }) => (
                  <Select
                    {...field} // Kết nối với React Hook Form
                    showSearch
                    placeholder='Chọn xã'
                    optionFilterProp='children'
                    style={{ width: '100%' }}
                    filterOption={(input, option) =>
                      (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {wards.map((ward, index) => (
                      <Option key={index} value={ward.name}>
                        {ward.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.ward && <p style={{ color: 'red' }}>{errors.ward.message}</p>}
            </div>
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
      </Modal>
    </>
  )
}
// {districts &&
//   districts.map((element) => {
//     return <option value={element.id}>{element.name}</option>
//   })}

// {wards &&
//   wards.map((element) => {
//     return <option value={element.id}>{element.name}</option>
//   })}

// <input
// {...register('city')}
// className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
// onChange={handleProviceChange} // Đảm bảo đây là hàm xử lý sự kiện đúng
// defaultValue='' // Đặt giá trị mặc định là rỗng
// ></input>
// <p className='text-red-500 text-sm mt-1'>{errors.city?.message}</p>
