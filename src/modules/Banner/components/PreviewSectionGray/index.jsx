import img1 from '@/assets/images/004.png'
import img2 from '@/assets/images/mob_5.png'
import img3 from '@/assets/images/mob_6.png'
import pegman from '@/assets/images/pegman.png'
import hotelBooking from '@/assets/images/hotel_booking.png'

export const PreviewSectionGray = () => {
  return (
    <section className='w-full container flex max-w-[900px] flex-col'>
      <div className='w-full flex flex-col justify-center gap-4'>
        <span className='sm:text-[24px] text-[13px] text-center font-normal'>
          페그맨(Pegman) 여행지 뷰 3D 탐색
        </span>
        <h2 className='sm:text-[30px] text-base font-bold text-center  hidden sm:flex'>
          <span className=' text-nowrap'>오른쪽 아래 페그맨</span>
          <img
            src={pegman}
            width={20}
            // height={31}
            className='object-contain mx-1'
          />{' '}
          <span className='sm:text-nowrap'>
            아이콘을 원하는 여행지에 가져다 놓아보세요!
          </span>
        </h2>

        <h2 className='sm:text-5xl text-base font-bold text-center flex flex-col items-center sm:hidden'>
          <div className=' text-nowrap flex'>
            <span className='text-nowrap'>오른쪽 아래 페그맨</span>
            <img
              src={pegman}
              width={15}
              height={31}
              className='object-contain mx-1'
            />{' '}
            <span>아이콘을</span>
          </div>

          <span className='sm:text-nowrap'>
            원하는 여행지에 가져다 놓아보세요!
          </span>
        </h2>

        <div className='grid sm:grid-cols-3 grid-cols-2 gap-[35px]'>
          <div className='flex flex-col'>
            <img src={img1} alt='img1' />

            <span className='sm:mt-8 mt-[10px] text-center sm:text-[18px] text-sm font-medium sm:hidden block'>
              페그맨을 원하는 곳에 <br />
              끌어다 놓아주세요!
            </span>

            <span className='mt-8 text-center sm:text-[18px] text-sm font-medium sm:block hidden'>
              페그맨을 원하는 곳에 끌어다 놓아주세요!
            </span>
          </div>

          <div className='flex flex-col relative'>
            <img src={img2} alt='img1' />

            <span className='sm:mt-8 mt-[10px] text-center sm:text-[18px] text-sm font-medium sm:hidden block'>
              해당 지역에 스트릿 <br /> 뷰가 보입니다.
            </span>

            <span className='mt-8 text-center sm:text-[18px] text-sm font-medium sm:block hidden'>
              해당 지역에 스트릿 뷰가 보입니다.
            </span>
          </div>

          <div className='flex flex-col relative'>
            <img src={img3} alt='img1' />

            <span className='sm:mt-8 mt-[10px] text-center sm:text-[18px] text-sm font-medium sm:hidden block'>
              주변을 스트릿 뷰로 <br /> 미리 검색해 보세요!
            </span>

            <span className='mt-8 text-center sm:text-[18px] text-sm font-medium sm:block hidden'>
              주변을 스트릿 뷰로 미리 검색해 보세요!
            </span>
          </div>

          <div className='sm:hidden flex flex-col relative justify-center'>
            <img
              src={hotelBooking}
              alt='img1'
              width={192}
              height={192}
              className=' translate-x-[15px]'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
