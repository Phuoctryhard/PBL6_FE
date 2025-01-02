import React from 'react'
import DiseaseSesson from './Component/TypeDisease/DiseaseSeason'
import DiseaseObject from './Component/TypeDisease/DiseaseObject'
import { useQuery } from '@tanstack/react-query'
import diseaseAPI from '../../../Api/user/disease'
import PartBody from './Component/TypeDisease/PartBody'
import Speciality from './Component/TypeDisease/Speciality'
import { Descriptions, Spin } from 'antd'
import { Helmet } from 'react-helmet-async'
export default function Disease() {
  const { data, isLoading } = useQuery({
    queryKey: ['getdisease'],
    queryFn: diseaseAPI.getdisease,
    keepPreviousData: true,
    //keepPreviousData để giữ lại dữ liệu cũ cho đến khi dữ liệu mới hoàn thành.
    staleTime: 1000 * 60 * 5 // dữ liệu sẽ coi là "mới" trong 5 phút
  })
  console.log(data?.data?.data?.disease_by_target_group)
  console.log(data?.data?.data?.disease_common)
  return (
    <>
      <Helmet>
        <title>Bệnh</title>

        <meta name='description' content='Xem danh sách bệnh trong nhà thuốc Pbl6' />
      </Helmet>
      <Spin spinning={isLoading} Descriptions='loading'>
        <div className={isLoading ? 'h-screen' : ''}>
          {' '}
          {/* Điều chỉnh chiều cao khi loading */}
          <DiseaseSesson disease_common={data?.data?.data?.disease_common} />
          <DiseaseObject disease_by_target_group={data?.data?.data?.disease_by_target_group} />
          <PartBody disease_Body={data?.data?.data?.disease_body_part} />
        </div>
      </Spin>
    </>
  )
}
// <Speciality speciality={data?.data?.data?.disease_specialty} />
