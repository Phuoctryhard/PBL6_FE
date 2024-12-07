const AdminErrorInternetConnection = () => {
  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
        <img src='/assets/images/network_error.webp' alt='Network Error' width={200} />
        <div className='flex flex-col gap-3 justify-center items-center'>
          <h1 className='font-semibold text-2xl'>Whoops!!</h1>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <p className='text-base font-normal'>No Internet Connection was found.</p>
            <p className='text-base font-normal'>Please check your internet connection and try again</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminErrorInternetConnection
