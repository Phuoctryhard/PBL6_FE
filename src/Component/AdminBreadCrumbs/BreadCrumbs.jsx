import { Breadcrumb } from 'antd'
import { ArrowRight2 } from 'iconsax-react'
const BreadCrumbs = ({ items }) => {
  return (
    <h1 className='w-full'>
      <Breadcrumb
        separator={<ArrowRight2 size='15' color='#1D242E' />}
        className='font-bold text-[#848A91] w-full'
        items={items}
      />
    </h1>
  )
}

export default BreadCrumbs
