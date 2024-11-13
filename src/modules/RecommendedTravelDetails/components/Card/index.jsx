import banner from '@/assets/images/banner2.png'

export function Card() {
  return (
    <div className='h-[270px] rounded-[10px] relative'>
      <div
        className='h-[270px] absolute left-0 top-0 bottom-0'
        style={{
          background:
            'linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      />
      <img
        className='absolute left-0 right-0 bottom-0 top-0 object-cover'
        src={banner}
      />
      <div className='absolute left-[34px] top-[25px] text-white'>
        <p className='text-[17px] leading-[40px] font-medium'>
          AI 추천 서울여행지!
        </p>
        <p className='text-[30px] leading-[40px]'>
          서울고궁
          <br />
          <span className='text-[#FAE100]'>야간개장</span>
        </p>
      </div>
    </div>
  )
}
