import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import diseaseAPI from '../../../../Api/user/disease'
import 'react-quill/dist/quill.snow.css'
import './fix.css'
import './oki.css'
import { Pagination } from 'antd'
export default function DetailDisease() {
  const { slug } = useParams()
  const { data } = useQuery({
    queryKey: ['detail', slug],
    queryFn: () => diseaseAPI.getDetailDisease(+slug)
  })
  console.log(slug)
  console.log(data?.data)
  console.log(data?.data?.data?.general_overview)
  return (
    <div className='disable-fixed mt-5'>
      <div className='ql-editor mt-8' dangerouslySetInnerHTML={{ __html: data?.data?.data?.general_overview }}></div>
      <div className='border border-gray-300 p-2 rounded-lg'></div>
    </div>
  )
}
