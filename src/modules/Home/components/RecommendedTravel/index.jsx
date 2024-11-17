import travel1 from '@/assets/images/reccomended-travel/travel1.png'
import travel2 from '@/assets/images/reccomended-travel/travel2.png'
import travel3 from '@/assets/images/reccomended-travel/travel3.png'
import travel4 from '@/assets/images/reccomended-travel/travel4.png'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const items = [
  {
    title: '태국',
    img: travel1,
    key: 'Seoul'
  },
  {
    title: '일본',
    img: travel2,
    key: 'Jeju'
  },
  {
    title: '베트남',
    img: travel3,
    key: 'Japan'
  },
  {
    title: '필리핀',
    img: travel4,
    key: 'Vietnam'
  }
]

export function RecommendedTravel() {
  const navigate = useNavigate()
  const ref = useRef()

  return (
    <div className='mt-[37px]'>
      <h5 className='text-[32px] text-center leading-[43px] font-semibold pt-[40px] border-t border-gray-100 mb-[40px]'>
        지금 가장 많이 찾는 여행지
      </h5>

      <div className='grid grid-cols-4 gap-[30px]'>
        {items.map((item) => (
          <div
            style={{
              height: ref?.current?.offsetWidth
            }}
            ref={ref}
            key={item.title}
            className='relative'
          >
            <img
              className='w-full h-full object-cover rounded-full'
              src={item.img}
            />
            <p
              className='py-[9px] w-[100px] font-[15px] text-black px-[20px] rounded-[20px] absolute bottom-[24px] text-center'
              style={{
                background: '#FFFFFF80',
                left: 'calc(50% - 50px)'
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
