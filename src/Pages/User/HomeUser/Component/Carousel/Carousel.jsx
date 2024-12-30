import React from 'react'
import { Carousel } from 'antd'
import anh1 from './anh1.jpg'
import anh2 from './anh2.jpg'
import './dot.css'

export default function CarouselSlideShow() {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }
  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-24 py-3'>
      <Carousel autoplay dots={{ className: 'custom-dots' }} arrows>
        <div className='' style={contentStyle}>
          <img
            src={anh1}
            alt='Slide 1'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>
        <div className='' style={contentStyle}>
          <img
            src={anh2}
            alt='Slide 1'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>

        <div className='' style={contentStyle}>
          <img
            src={anh1}
            alt='Slide 1'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>

        <div className='' style={contentStyle}>
          <img
            src={anh2}
            alt='Slide 1'
            className='w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105'
          />
        </div>
      </Carousel>
    </div>
  )
}
