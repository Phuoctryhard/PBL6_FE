import React from 'react'
import DiseaseSesson from './Component/TypeDisease/DiseaseSeason'
import DiseaseObject from './Component/TypeDisease/DiseaseObject'
import { useQuery } from '@tanstack/react-query'
import diseaseAPI from '../../../Api/user/disease'
import PartBody from './Component/TypeDisease/PartBody'
import Speciality from './Component/TypeDisease/Speciality'
import { Spin } from 'antd'
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
      <Spin spinning={isLoading}>
        <DiseaseSesson disease_common={data?.data?.data?.disease_common} />
        <DiseaseObject disease_by_target_group={data?.data?.data?.disease_by_target_group} />
        <PartBody disease_Body={data?.data?.data?.disease_body_part} />
      </Spin>
    </>
  )
}
// <Speciality speciality={data?.data?.data?.disease_specialty} />
