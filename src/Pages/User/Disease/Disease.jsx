import React from 'react'
import DiseaseSesson from './Component/TypeDisease/DiseaseSeason'
import DiseaseObject from './Component/TypeDisease/DiseaseObject'
import { useQuery } from '@tanstack/react-query'
import diseaseAPI from '../../../Api/user/disease'
import PartBody from './Component/TypeDisease/PartBody'

export default function Disease() {
  const { data } = useQuery({
    queryKey: ['getdisease'],
    queryFn: diseaseAPI.getdisease
  })
  console.log(data?.data?.data)
  console.log(data?.data?.data?.disease_common)
  return (
    <>
      <DiseaseSesson disease_common={data?.data?.data?.disease_common} />
      <DiseaseObject disease_by_target_group={data?.data?.data?.disease_by_target_group} />
      <PartBody disease_Body={data?.data?.data?.disease_body_part} />
    </>
  )
}
