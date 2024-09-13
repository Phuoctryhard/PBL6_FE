import React from 'react'
import Header from '../../Component/Header'
import Footer from '../../Component/Footer'
export default function RegisterLayout({ children }) {
  console.log(children)
  return (
    <div className='min-h-full'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
