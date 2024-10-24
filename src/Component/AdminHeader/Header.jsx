import React, { useEffect } from 'react'
import { useState } from 'react'
import { ArrowDown2, SearchNormal, Setting4, ArrowUp2 } from 'iconsax-react'

import { Select, ConfigProvider } from 'antd'
import './Header.css'
const languageSelectTheme = {
  token: {
    colorTextQuaternary: '#1D242E', // Disabled text color
    colorTextPlaceholder: '#1D242E', // Placeholder text color
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    controlOutline: 'none', // outline color
    colorBorder: 'none', // Border color
    borderRadius: '4px' // Border radius
  },
  components: {
    Select: {
      selectorBg: 'transparent', // Selector background color
      optionActiveBg: '#e1eaf2', // Option active
      optionSelectedBg: '#bde0fe' // Option selected
    }
  }
}
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [greeting, setGreeting] = useState('')
  const [greetingColor, setGreetingColor] = useState('')
  const optionsDate = { year: 'numeric', month: 'long', day: '2-digit' }
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', optionsDate)
    const formattedTime = new Date(date).toLocaleTimeString('en-GB', optionsTime)
    return `${formattedDate} at ${formattedTime}`
  }

  const [time, setTime] = useState(formatDate(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      setTime(formatDate(currentTime))
      const hours = currentTime.getHours()
      if (hours >= 5 && hours < 12) {
        setGreeting('Good morning')
        setGreetingColor('#FED600') // Yellow for morning
      } else if (hours >= 12 && hours < 17) {
        setGreeting('Good afternoon')
        setGreetingColor('#FFA500') // Orange for afternoon
      } else if (hours >= 17 && hours < 21) {
        setGreeting('Good evening')
        setGreetingColor('#FF4500') // Red for evening
      } else {
        setGreeting('Good night')
        setGreetingColor('#1E90FF') // Blue for night
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className='flex w-full h-[60px] items-center z-[200]'>
      <div
        className='content flex-1 justify-between px-[40px] py-[11px]'
        style={{ boxShadow: '0 4px 5px rgba(0,0,0,0.25)' }}
      >
        <div className='flex items-center justify-between text-[14px]'>
          <div className='searchBox flex items-center bg-[#e1eaf2] border-[1px] border-solid border-[#BCBEC1] w-[440px] justify-between rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for anything here'
              className='searchBox__input border-none outline-none bg-transparent w-[440px] rounded-[4px] py-[7px] px-[12px]'
            />
            <SearchNormal className='absolute right-0 top-[50%] transform -translate-y-1/2 mr-3' />
          </div>
          <div className='languageSelect flex items-center min-w-[118px]'>
            <Setting4 size={30} className='mr-[10px]' />
            <ConfigProvider theme={languageSelectTheme}>
              <Select
                suffixIcon={
                  isDropdownOpen ? <ArrowUp2 size='15' color='#1D242E' /> : <ArrowDown2 size='15' color='#1D242E' />
                }
                defaultValue='Vietnamese'
                className='w-[120px] h-[40px] rounded-[4px]'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Select.Option value='Vietnamese'>Vietnamese</Select.Option>
                <Select.Option value='English'>English</Select.Option>
              </Select>
            </ConfigProvider>
          </div>
          <div className='time flex flex-col items-end text-[14px] text-[#1D242E] gap-y-[6px] justify-center content-center'>
            <div className='flex items-center justify-center'>
              <div
                className='w-[18px] h-[18px] rounded-[50%] mr-[11px]'
                style={{
                  backgroundColor: greetingColor
                }}
              ></div>
              <span className='font-bold'>{greeting}</span>
            </div>
            <span className='w-[200px] text-right max-w-[200px]'>{time}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
