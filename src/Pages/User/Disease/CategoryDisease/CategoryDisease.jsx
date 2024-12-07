import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import diseaseAPI from '../../../../Api/user/disease'

export default function CategoryDisease() {
  const { slug } = useParams()
  const { data } = useQuery({
    queryKey: ['detail', slug],
    queryFn: () => diseaseAPI.getCategeryDisease(+slug)
  })
  console.log(data)
  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi component được render
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [data]) // Mỗi khi `data` thay đổi, nó sẽ cuộn lên
  return (
    <div className='h-screen px-24'>
      <div className='mt-10'>Tổng hợp các bệnh liên quan </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 '>
        {data?.data?.data.map((element) => {
          console.log(element)
          return (
            <div className='text-blue border-dashed '>
              {' '}
              <a href={`/benh/${element.disease_id}`}>{element.disease_name}</a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
