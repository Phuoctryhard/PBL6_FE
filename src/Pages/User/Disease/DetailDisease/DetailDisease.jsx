import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import diseaseAPI from '../../../../Api/user/disease'
import 'react-quill/dist/quill.snow.css'
import './fix.css'
import './oki.css'
import { Pagination, Spin, Flex } from 'antd'
import Skeleton1 from '../Component/TypeDisease/Skeleton'
import Loading from '../../../../Component/Loading/Loading'
export default function DetailDisease() {
  const { slug } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['detail', slug],
    queryFn: () => diseaseAPI.getDetailDisease(+slug)
  })
  console.log(slug)
  console.log(data?.data)
  console.log(data?.data?.data)
  console.log(data?.data?.data?.general_overview)
  const [editorHTML, setEditorHTML] = useState('')
  useEffect(() => {
    if (data?.data?.data) {
      const combinedHtml = `
        <div class='flex flex-col'>${data.data.data.generalOverview || ''}</div>
        <div class='section'>${data.data.data.symptoms || ''}</div>
        <div class='section'>${data.data.data.cause || ''}</div>
        <div class='section'>${data.data.data.riskSubjects || ''}</div>
        <div class='section'>${data.data.data.diagnosis || ''}</div>
        <div class='section'>${data.data.data.prevention || ''}</div>
        <div class='section'>${data.data.data.treatmentMethod || ''}</div>
      `
      setEditorHTML(combinedHtml)
    }
  }, [data])
  return (
    <div className=' mt-5 px-24'>
      {editorHTML ? (
        <div
          className='ql-editor flex flex-col gap-4 w-full'
          dangerouslySetInnerHTML={{
            __html: editorHTML
          }}
        ></div>
      ) : (
        <>
          <Flex gap='middle' vertical>
            
              <Skeleton1 />
          
          </Flex>
        </>
      )}
    </div>
  )
}
