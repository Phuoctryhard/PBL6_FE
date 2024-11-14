import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import diseaseAPI from '../../../../Api/user/disease'
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
      <div dangerouslySetInnerHTML={{ __html: data?.data?.data?.general_overview }}></div>
      <div className='border border-gray-300 p-2 rounded-lg'>
        <Pagination
          defaultCurrent={1}
          total={50}
          itemRender={(page, type, originalElement) => {
            if (type === 'page') {
              return <div className='border border-gray-300 rounded mx-1  text-center'>{page}</div>
            }
            return originalElement
          }}
        />
      </div>
    </div>
  )
}
