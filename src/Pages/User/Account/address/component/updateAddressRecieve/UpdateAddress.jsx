import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Select } from 'antd'
import { Modal } from 'antd'
import { useQueries } from '@tanstack/react-query'
import { queryClient } from '../../../../../../index.js'
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
      .matches(/^0[0-9]{9}$/, 'Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số.')
      .required('Vui lòng nhập số điện thoại.'),
    city: yup.string().required('Vui lòng nhập thông tin.'),
    district: yup.string().required('Vui lòng nhập thông tin.'),
    ward: yup.string().required('Vui lòng nhập thông tin.'),
    numberHome: yup.string().required('Vui lòng nhập thông tin.')
  })
  .required()
export default function UpdateAddress({ receiver_address_id }) {
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
  const handleBack = () => {
    setValue('fullName', DetailAddress.data.data.receiver_name)
    setValue('phoneNumber', DetailAddress.data.data.receiver_phone)
    setValue('city', DetailAddress.data.data.province_name)
    setValue('district', DetailAddress.data.data.district_name)
    setValue('ward', DetailAddress.data.data.ward_name)
    setValue('numberHome', DetailAddress.data.data.receiver_address)

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
    console.log(data)
    if (data.numberHome) {
      data.numberHome = data.numberHome.replace(/,/g, '')
    }

    //const addressMain = data.numberHome + ',' + data.ward + ',' + data.district + ',' + data.city
    var address_Receive = {}
    if (!isNaN(+data.city)) {
      address_Receive = {
        receiver_name: data.fullName,
        receiver_phone: data.phoneNumber, //required
        receiver_address: data.numberHome,
        province_id: +data.city,
        district_id: +data.district,
        ward_id: +data.ward
      }
    } else if (!isNaN(+data.district)) {
      address_Receive = {
        receiver_name: data.fullName,
        receiver_phone: data.phoneNumber, //required
        receiver_address: data.numberHome,
        province_id: +DetailAddress.data.data.province_id,
        district_id: +data.district,
        ward_id: +data.ward
      }
    } else if (!isNaN(+data.ward)) {
      address_Receive = {
        receiver_name: data.fullName,
        receiver_phone: data.phoneNumber, //required
        receiver_address: data.numberHome,
        province_id: ++DetailAddress.data.data.province_id,
        district_id: ++DetailAddress.data.data.district_id,
        ward_id: +data.ward
      }
    }
    console.log(DetailAddress)

    console.log(data, +data.district, +data.ward)
    const id = receiver_address_id
    console.log(id)
    mutation.mutate({ id, data: address_Receive })
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
  const { data: DetailAddress } = useQuery({
    queryKey: ['todos', receiver_address_id],
    queryFn: () => AddressApi.getAddressbyId(receiver_address_id)
  })
  console.log(DetailAddress)

  useEffect(() => {
    if (DetailAddress) {
      console.log(DetailAddress)
      // data.data.data.receiver_name
      setValue('fullName', 'cdsjnv')
      setValue('phoneNumber', DetailAddress.data.data.receiver_phone)
      setValue('city', DetailAddress.data.data.province_name)
      setValue('district', DetailAddress.data.data.district_name)
      setValue('ward', DetailAddress.data.data.ward_name)
      setValue('numberHome', DetailAddress.data.data.receiver_address)

      if (provincesData) {
        setProvinces(provincesData.data.data)
      }
    }
  }, [DetailAddress, setValue, provincesData])
  // if (isLoading) return <div>Loading...</div>

  const handleProviceChange = async (value) => {
    {
      // Xử lý sự kiện khi thay đổi giá trị
      console.log('Giá trị đã chọn:', value)
      setValue('district', '')
      setValue('ward', '')
      //tinh  quang binh => lay ra danh sach huyen theo id tinh
      // const { id } = provinces.find((element) => {
      //   return element.name == value
      // })
      setValue('city', value) // Cập nhật giá trị cho form state
      // tìm kiem huyen theo id tinh
      if (value) {
        const { data } = await AddressApi.getDistricts(value)
        setDistricts(data.data) // Cập nhật danh sách huyen
      }
    }
  }

  const handleDistrictChange = async (value) => {
    // lay ra id cua huyen
    console.log(value)
    setValue('ward', '')
    // const { id } = districts.find((element) => {
    //   return element.name == value
    // })
    setValue('district', value)
    if (value) {
      const { data: award } = await AddressApi.getWards(value)
      setWards(award.data) // Cập nhật danh sách xã
    }
  }
  // Focus vao huyen hiện data
  const handleFocus = async () => {
    // lay id tinh
    const currentCity = getValues('city')
    console.log(currentCity)
    // const { id } = provinces.find((element) => {
    //   return element.id === currentCity
    // })
    // tìm kiem huyen theo id tinh
    if (!isNaN(+currentCity)) {
      const { data } = await AddressApi.getDistricts(currentCity)
      console.log(currentCity)
      setDistricts(data.data) // Cập nhật danh sách huyen
    } else {
      const currentCity = DetailAddress.data.data.province_id
      const { data: ListHuyen } = await AddressApi.getDistricts(currentCity)
      console.log(currentCity)
      setDistricts(ListHuyen.data) // Cập nhật danh sách huyen
    }
  }

  // Focus vao xa hiện data lay id huyen
  const handleFocusWard = async () => {
    // lay id tinh

    const currentDistrict = getValues('district')
    console.log(currentDistrict)
    console.log(districts)
    if (currentDistrict) {
      if (!isNaN(+currentDistrict)) {
        const { data: ListWards } = await AddressApi.getWards(currentDistrict)
        console.log(currentDistrict)
        setWards(ListWards.data) // Cập nhật danh sách huyen
      } else {
        const currentdistrict = DetailAddress.data.data.district_id
        const { data: ListWards } = await AddressApi.getWards(currentdistrict)
        console.log(ListWards)
        setWards(ListWards.data) // Cập nhật danh sách huyen
      }
    }
  }
  console.log(provinces)
  console.log(districts)
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
                      <Option key={index} value={province.id}>
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
                      <Option key={index} value={district.id}>
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
                    onFocus={handleFocusWard}
                  >
                    {wards.map((ward, index) => (
                      <Option key={index} value={ward.id}>
                        {ward.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.ward && <p style={{ color: 'red' }}>{errors.ward.message}</p>}
            </div>
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
