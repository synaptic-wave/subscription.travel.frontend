import img1 from '@/assets/images/001.png'
import img2 from '@/assets/images/mob_2.png'
import img3 from '@/assets/images/mob_3.png'
import mapIcon from '@/assets/images/map_icon.png'

export const PreviewSection = () => {
  return (
    <section className='w-full container flex flex-col max-w-[900px]'>
      <div className='w-full flex flex-col justify-center gap-4'>
        <div className='w-full flex flex-col justify-center'>
          <span className='font-medium sm:text-[24px] text-[13px] text-center mb-0 sm:mb-1'>
            호텔 위치확인 / 객실 3D 확인
          </span>
          <h2 className='sm:text-[30px] text-[16px] leading-[28px] font-bold text-center sm:leading-[40px] sm:mb-[24px]'>
            “호텔 주변보기” 클릭하면 호텔 주변 및 객실 내부 3D 뷰*로 바로 확인!
          </h2>
          <span className='text-center text-[#FF0000] text-xl hidden sm:block'>
            * 객실내부 3D 뷰는 일부 제공 호텔에 한함
          </span>
        </div>

        <div className='grid sm:grid-cols-3 grid-cols-2 gap-[35px] sm:mt-[30px]'>
          <div className='flex flex-col'>
            <img src={img1} alt='img1' />

            <span className='sm:mt-8 mt-[10px] text-center sm:text-[18px] text-sm font-medium sm:hidden block'>
              호텔의 위치 보기
              <br /> 아이콘 클릭!
            </span>

            <span className='mt-8 text-center sm:text-[18px] text-sm font-medium sm:block hidden'>
              호텔의 위치 보기 아이콘 클릭!
            </span>
          </div>

          <div className='flex flex-col relative'>
            <img src={img2} alt='img1' />
            <span className='absolute sm:w-[45px] sm:h-[45px] w-[22px] h-[22px]  bg-[#FF00004D] rounded-full sm:top-[23%] top-[20%] right-[33%]'></span>

            <span className='sm:mt-8 mt-[10px] text-center sm:text-[18px] text-sm font-medium sm:hidden block'>
              호텔 주변보기 버튼을
              <br /> 클릭 합니다.
            </span>

            <span className='mt-8 text-center sm:text-[18px] text-sm font-medium sm:block hidden'>
              호텔 주변보기 버튼을 클릭 합니다.
            </span>
          </div>

          <div className='flex flex-col relative'>
            <img src={img3} alt='img1' />

            <span className='sm:mt-8 mt-[10px] text-center sm:text-[18px] text-sm font-medium sm:hidden block'>
              생생한 3D화면으로 <br /> 검증 하세요!
            </span>

            <span className='mt-8 text-center sm:text-[18px] text-sm font-medium sm:block hidden'>
              생생한 3D화면으로 검증 하세요!
            </span>
          </div>

          <div className='flex sm:hidden flex-col relative justify-center'>
            <img src={mapIcon} alt='img1' className=' translate-x-[15px]' />
          </div>
        </div>
        <span className='text-center text-[#FF0000] text-xs sm:hidden block'>
          * 객실내부 3D 뷰는 일부 제공 호텔에 한함
        </span>
      </div>
    </section>
  )
}
