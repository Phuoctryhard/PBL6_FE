import React from 'react'
import diseaseAPI from '../../../../../Api/user/disease'
import { useQuery } from '@tanstack/react-query'
import DiseaseSesson from '../../../Disease/Component/TypeDisease/DiseaseSeason'
import DiseaseObject from '../../../Disease/Component/TypeDisease/DiseaseObject'
import PartBody from '../../../Disease/Component/TypeDisease/PartBody'
import Speciality from '../../../Disease/Component/TypeDisease/Speciality'

export default function Desease() {
  const { data } = useQuery({
    queryKey: ['getdisease'],
    queryFn: diseaseAPI.getdisease,
    keepPreviousData: true,
    //keepPreviousData để giữ lại dữ liệu cũ cho đến khi dữ liệu mới hoàn thành.
    staleTime: 1000 * 60 * 5 // dữ liệu sẽ coi là "mới" trong 5 phút
  })
  return (
    <div>
      <DiseaseSesson disease_common={data?.data?.data?.disease_common.slice(0, 6)} />
      <DiseaseObject disease_by_target_group={data?.data?.data?.disease_by_target_group} />
      <PartBody disease_Body={data?.data?.data?.disease_body_part.slice(0, 6)} />
     
    </div>
  )
}
