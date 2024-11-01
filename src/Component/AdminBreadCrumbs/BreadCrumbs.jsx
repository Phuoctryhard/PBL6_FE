import { Breadcrumb } from 'antd'
import { ArrowRight2 } from 'iconsax-react'
const BreadCrumbs = ({ items }) => {
  return (
    <h1>
      <Breadcrumb
        separator={<ArrowRight2 size='15' color='#1D242E' />}
        className='font-bold text-[#848A91]'
        items={items}
      />
    </h1>
  )
}

export default BreadCrumbs
