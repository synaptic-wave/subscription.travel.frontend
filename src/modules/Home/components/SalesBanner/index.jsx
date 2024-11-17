import bannerImg1 from '@/assets/images/sales_banner_1.png'
import bannerImg2 from '@/assets/images/sales_banner_2.png'
import { Button } from '@/components/index'

const items = [
  {
    img: bannerImg1,
    title: '원가여행 보장에<br/>최대 50% 할인',
    text: '한달 3,000원 이면<br/> 원가로 여행을 즐길 수<br/> 있습니다.'
  },
  {
    img: bannerImg2,
    title: '인플루언서라면!<br/>Influncer?',
    text: '핸디 파트너스 신청하고<br/> 영상제작 지원금 받자!'
  }
]

export function SalesBanner() {
  return (
    <div className='grid grid-cols-2 gap-[30px] mt-[28px]'>
      {items.map((item) => (
        <div className='h-[420px] relative'>
          <img
            className='w-full h-full object-cover rounded-[8px]'
            src={item.img}
          />
          <div className='absolute top-[40px] left-[40px] bottom-[40px] flex flex-col justify-between'>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.title
                }}
                className='text-[44px] leading-[60px] text-white font-bold mb-[5px]'
              ></p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.text
                }}
                className='text-[#3B2A1B] text-[24px] leading-[32px]'
              ></p>
            </div>
            <Button size='lg' className='w-[180px]' variant='secondary-white'>
              자세히보기
            </Button>
          </div>
        </div>
      ))}

      {/* <div className='h-[420px]'>
        <img className='w-full h-full object-cover' src={bannerImg2} />
      </div> */}
    </div>
  )
}
