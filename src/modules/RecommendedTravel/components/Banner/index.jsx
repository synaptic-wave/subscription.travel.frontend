import Skeleton from 'react-loading-skeleton'

export function Banner({ title, content, img, isLoading }) {
  if (isLoading) {
    return (
      <Skeleton className='w-full h-[140px] sm:h-[300px] mt-[21px] sm:mt-[68px]' />
    )
  }

  return (
    <div className='w-full h-[140px] sm:h-[300px] relative rounded-[10px] overflow-hidden mt-[21px] sm:mt-[68px]'>
      <div
        className='sm:h-[300px] h-[140px] w-full absolute left-0 top-0 bottom-0 sm:w-[400px]'
        style={{
          background:
            'linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      />
      <img className='w-full h-full object-cover' src={img} alt='banner' />
      <div className='absolute top-[13px] left-[16px] sm:top-[65px] sm:left-[80px] text-white'>
        <p
          className='text-[13px] sm:text-[17px] font-medium sm:leading-[40px]'
          dangerouslySetInnerHTML={{
            __html: title
          }}
        ></p>
        <h5
          className='text-[20px] sm:text-[30px] sm:leading-[40px] font-bold'
          dangerouslySetInnerHTML={{ __html: content }}
        ></h5>
      </div>
    </div>
  )
}
