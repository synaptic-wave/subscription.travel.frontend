import travel1 from '@/assets/images/reccomended-travel/travel1.png'
import travel2 from '@/assets/images/reccomended-travel/travel2.png'
import travel3 from '@/assets/images/reccomended-travel/travel3.png'
import travel4 from '@/assets/images/reccomended-travel/travel4.png'
import travel5 from '@/assets/images/reccomended-travel/travel5.png'
import travel6 from '@/assets/images/reccomended-travel/travel6.png'
import travel7 from '@/assets/images/reccomended-travel/travel7.png'
import travel8 from '@/assets/images/reccomended-travel/travel8.png'
import travel9 from '@/assets/images/reccomended-travel/travel9.png'
import { handleErrorOnImageLoad } from '@/consts/img'
import { useGetLocationsList } from '@/services/location.service'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

const items = [
  {
    title: '서울',
    img: travel1,
    key: 'Seoul'
  },
  {
    title: '제주',
    img: travel2,
    key: 'Jeju'
  },
  {
    title: '일본',
    img: travel3,
    key: 'Japan'
  },
  {
    title: '베트남',
    img: travel4,
    key: 'Vietnam'
  },
  {
    title: '발리',
    img: travel5,
    key: 'Bali'
  },
  {
    title: '타이베이',
    img: travel6,
    key: 'Taipei'
  },
  {
    title: '필리핀',
    img: travel9,
    key: 'Philippines'
  },
  {
    title: '유럽',
    img: travel8,
    key: 'Europe'
  }
]

export function RecommendedTravel({
  withoutTitle = false,
  className = '',
  section
}) {
  const navigate = useNavigate()

  const { data, isLoading } = useGetLocationsList({
    params: {
      page: 1,
      limit: 100,
      display_active: true,
      sortBy: 'order:asc',
      sectionId: section.id
    }
  })

  const title = section.kr_title.split('#')

  const locations = data?.results

  return (
    <div className={className}>
      {!withoutTitle && (
        <h5 className='text-lg sm:text-[26px] font-medium mb-[20px] sm:mb-[30px]'>
          {title[0]} <span className='text-primary-600'>{title[1]}</span>
        </h5>
      )}
      <div className='grid grid-cols-4 sm:grid-cols-8 gap-4'>
        {isLoading
          ? Array.from(Array(8).keys()).map((key) => (
              <div className='flex items-center justify-center flex-col sm:gap-4 gap-1'>
                <Skeleton
                  borderRadius='50%'
                  className='w-[64px] h-[64px] sm:min-w-[106px] sm:min-h-[106px] rounded-ful'
                />
                <Skeleton h={18} width={50} />
              </div>
            ))
          : locations?.map((item, index) => (
              <div
                className='flex flex-col sm:gap-4 gap-1 items-center cursor-pointer'
                key={index}
                onClick={() => navigate(`/recommended-travel/${item.id}`)}
              >
                <div className='w-[64px] h-[64px] sm:min-w-[106px] sm:min-h-[106px] rounded-full bg-[#F9F9FC] flex items-center justify-center'>
                  <img
                    className='w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] object-contain'
                    src={item.imageURL}
                    alt={item.kr_title}
                    onError={handleErrorOnImageLoad}
                  />
                </div>
                <p className='sm:text-lg text-sm'>{item.kr_title}</p>
              </div>
            ))}
      </div>
    </div>
  )
}
