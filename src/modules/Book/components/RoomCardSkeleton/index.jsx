import LocationIcon from '@/assets/icons/location.svg?react'
import PeopleIcon from '@/assets/icons/people.svg?react'
import KinBedIcon from '@/assets/icons/king-bed.svg?react'
import MealIcon from '@/assets/icons/meal.svg?react'

import Skeleton from 'react-loading-skeleton'

export default function RoomCardSkeleton() {
  return (
    <div className='w-full flex flex-col'>
      <div className='flex items-center justify-between'>
        <h5 className='text-[20px] leading-[28px] font-medium'>
          호텔 예약 정보
        </h5>
      </div>
      <div className='h-[120px] mt-[26px]'>
        <Skeleton width='100%' height='100%' />
      </div>

      <h4 className='mt-5 text-base font-medium'>
        <Skeleton width='100%' height={24} />
      </h4>

      <div className='flex items-center mt-[13px] gap-1'>
        <LocationIcon className='min-w-[18px]' />
        <Skeleton width={150} height={15} />
      </div>

      <div className='flex w-full items-center gap-5 mt-3'>
        <p className='flex items-center gap-1 text-sm'>
          <PeopleIcon />
          <Skeleton width={50} height={20} />
        </p>

        <p className='flex items-center gap-1 text-sm'>
          <KinBedIcon /> <Skeleton width={50} height={20} />
        </p>

        <p className='flex items-center gap-1 text-sm'>
          <MealIcon />
          <Skeleton width={50} height={20} />
        </p>
      </div>

      <div className='flex flex-col w-full mt-[32px] gap-4'>
        <div className='flex justify-between items-center gap-1'>
          <span className='text-sm font-medium min-w-[30px] text-[#A3A5B8]'>
            객실
          </span>
          <Skeleton width={100} height={20} />
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium text-[#A3A5B8]'>일정</span>
          <Skeleton width={100} height={20} />
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium text-[#A3A5B8]'>
            객실 가격(1박)
          </span>
          <div className='flex items-center gap-1'>
            <Skeleton width={100} height={28} />원
          </div>
        </div>
      </div>
    </div>
  )
}
