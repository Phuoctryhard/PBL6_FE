import React from 'react'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer'
export default function RegisterLayout({ children }) {
  return (
    <>
    <Header />
      <div className='h-screen'>{children}</div>
    </>
  )
}
