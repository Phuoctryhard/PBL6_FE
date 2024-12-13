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
import { Helmet } from 'react-helmet-async'
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
      <Helmet>
        <title>Blog Bệnh | Nhà Thuốc PBL6</title>
        <meta
          name='description'
          content='Cập nhật thông tin hữu ích về các bệnh lý thường gặp tại Blog Bệnh của Nhà Thuốc PBL6. Tìm hiểu triệu chứng, nguyên nhân, cách phòng ngừa và điều trị hiệu quả từ các chuyên gia y tế.'
        />
      </Helmet>

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
