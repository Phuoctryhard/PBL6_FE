import React from 'react'
import { Carousel } from 'antd'
import anh1 from './anh1.jpg'
import anh2 from './anh2.jpg'
import './dot.css'

export default function CarouselSlideShow() {
  return (
    <div className='px-24 py-3'>
      <Carousel autoplay dots={{ className: 'custom-dots' }} arrows >
        <div className='flex items-center justify-center bg-[#364d79] h-[500px] overflow-hidden'>
          <img
            src={anh1}
            alt='Slide 1'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>
        <div className='flex items-center justify-center bg-[#364d79] h-[500px] overflow-hidden'>
          <img
            src={anh2}
            alt='Slide 2'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>
        <div className='flex items-center justify-center bg-[#364d79] h-[500px] overflow-hidden'>
          <img
            src={anh1}
            alt='Slide 3'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>
        <div className='flex items-center justify-center bg-[#364d79] h-[500px] overflow-hidden'>
          <img
            src={anh2}
            alt='Slide 4'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>
      </Carousel>
    </div>
  )
}
