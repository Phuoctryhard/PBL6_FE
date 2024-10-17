const SideBarItem = ({ name, iconName, arrowIcon }) => {
  return (
    <>
      <div className='flex items-center gap-2 justify-between px-[24px] h-[46px]'>
        <div className='flex items-center gap-x-[14px]'>
          {iconName}
          {name}
        </div>
        {arrowIcon}
      </div>
    </>
  )
}

export { SideBarItem }
