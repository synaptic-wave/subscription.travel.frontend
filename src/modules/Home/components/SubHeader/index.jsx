import subheaderImg from '@/assets/images/subheader.png'

export function SubHeader() {
  return (
    <div className='bg-[#D7DFFF]'>
      <div className='container'>
        <div className='py-[20px] flex items-center gap-4'>
          <img className='h-[50px] w-auto' src={subheaderImg} alt='window' />
          <p className='text-[30px]'>
            핸디트립 회원을 위한!{' '}
            <span className='text-primary'>노마진 원가 여행 서비스</span>
          </p>
        </div>
      </div>
    </div>
  )
}
