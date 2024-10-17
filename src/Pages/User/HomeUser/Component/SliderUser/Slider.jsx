import anh from './img/1.jpg'
import anh1 from './img/2.jpg'
import anh2 from './img/3.jpg'
import anh3 from './img/4.jpg'
import anh4 from './img/5.jpg'
import anh5 from './img/right1.png'
import anh6 from './img/right2.png'
import anh7 from './img/lienheduocsi.jpg'
import anh8 from './img/hotdeal.jpg'
import { useEffect } from 'react'

export default function Slider() {
  useEffect(() => {
    let slider = document.querySelector('.slider .list')
    let items = document.querySelectorAll('.slider .list .item')
    let next = document.getElementById('next')
    let prev = document.getElementById('prev')
    let dots = document.querySelectorAll('.slider .dots li')

    let lengthItems = items.length - 1
    let active = 0

    const reloadSlider = () => {
      slider.style.left = -items[active].offsetLeft + 'px'

      let last_active_dot = document.querySelector('.slider .dots li.active')
      if (last_active_dot) last_active_dot.classList.remove('active')
      dots[active].classList.add('active')

      clearInterval(refreshInterval)
      refreshInterval = setInterval(() => {
        next.click()
      }, 3000)
    }

    next.onclick = () => {
      active = active + 1 <= lengthItems ? active + 1 : 0
      reloadSlider()
    }

    prev.onclick = () => {
      active = active - 1 >= 0 ? active - 1 : lengthItems
      reloadSlider()
    }

    let refreshInterval = setInterval(() => {
      next.click()
    }, 3000)

    return () => clearInterval(refreshInterval)
  }, [])

  return (
    <div className='bg-white '>
      <div className=''></div>
      <div className=''>
        <div className='grid grid-cols-6 px-24 py-4 gap-x-3'>
          <div className='col-span-4 bg-yellow-500 rounded-lg'>
            <div className='slider relative w-full max-w-full h-[350px] overflow-hidden rounded-lg'>
              <div className='list flex absolute w-[1300px] h-full left-0 top-0 transition-all duration-1000'>
                <div className='item'>
                  <img src={anh2} alt='' className='w-[1300px] h-full object-cover' />
                </div>
                <div className='item'>
                  <img src={anh1} alt='' className='w-[1300px] h-full object-cover' />
                </div>
                <div className='item'>
                  <img src={anh2} alt='' className='w-[1300px] h-full object-cover' />
                </div>
                <div className='item'>
                  <img src={anh3} alt='' className='w-[1300px] h-full object-cover' />
                </div>
                <div className='item'>
                  <img src={anh4} alt='' className='w-[1300px] h-full object-cover' />
                </div>
              </div>

              <div className='buttons absolute top-[45%] left-[5%] w-[90%] flex justify-between'>
                <button id='prev' className='w-12 h-12 rounded-full bg-white/30 text-white border-none font-bold'>
                  &lt;
                </button>
                <button id='next' className='w-12 h-12 rounded-full bg-white/30 text-white border-none font-bold'>
                  &gt;
                </button>
              </div>

              <ul className='dots flex justify-center absolute bottom-[10px] left-0 w-full'>
                <li className='w-2.5 h-2.5 bg-white m-2 rounded-full transition-all duration-500'></li>
                <li className='w-2.5 h-2.5 bg-white m-2 rounded-full transition-all duration-500'></li>
                <li className='w-2.5 h-2.5 bg-white m-2 rounded-full transition-all duration-500'></li>
                <li className='w-2.5 h-2.5 bg-white m-2 rounded-full transition-all duration-500'></li>
                <li className='w-2.5 h-2.5 bg-white m-2 rounded-full transition-all duration-500'></li>
              </ul>
            </div>
          </div>

          <div className='col-span-2 flex flex-col justify-between rounded-lg overflow-hidden'>
            <div className='bg-red-500 rounded-lg'>
              <img src={anh5} alt='' className='w-full h-auto object-cover' />
            </div>
            <div className='bg-gray-400 rounded-lg'>
              <img src={anh6} alt='' className='w-full h-auto object-cover' />
            </div>
          </div>
        </div>
        <div className='px-24 '>
          <div className='grid grid-cols-8 gap-1  '>
            <div className='flex flex-col items-center '>
              <div className=''>
                <img src={anh7} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>

            <div className='flex flex-col items-center text-center  '>
              <div className=''>
                <img src={anh8} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>

            <div className='flex flex-col items-center text-center  '>
              <div className=''>
                <img src={anh7} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>

            <div className='flex flex-col items-center text-center  '>
              <div className=''>
                <img src={anh8} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>

            <div className='flex flex-col items-center text-center  '>
              <div className=''>
                <img src={anh7} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>

            <div className='flex flex-col items-center text-center '>
              <div className=''>
                <img src={anh8} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Deal hot tháng 9</span>
            </div>

            <div className='flex flex-col items-center text-center  '>
              <div className=''>
                <img src={anh7} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>

            <div className='flex flex-col items-center text-center  '>
              <div className=''>
                <img src={anh7} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>

            <div className='flex flex-col items-center '>
              <div className=''>
                <img src={anh7} alt='' className='w-[60px] h-[60px] object-cover' />
              </div>
              <span className='mx-[5px] font-medium w-[60px] mt-1'>Liên hệ dược sĩ</span>
            </div>
          </div>
          <div className=''>
            <ul class='dots flex justify-center bottom-[10px] left-0 w-full'>
              <li class='w-2.5 h-2.5 bg-blue m-1 rounded-full transition-all duration-500'></li>
              <li class='w-2.5 h-2.5 bg-gray-400 m-1 rounded-full transition-all duration-500'></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
