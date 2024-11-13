import PersonIcon from '@/assets/icons/person-v2.svg?react'
import BedIconBedIcon from '@/assets/icons/bed-v2.svg?react'
import ArrowRightIcon from '@/assets/icons/arrow-right-v2.svg?react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

export function RoomCardSkeleton({ isGrid = false, isLast, rtl }) {
  return (
    <div
      className={classNames(
        'sm:p-[30px] p-[12px] flex gap-[30px] w-full border-gray-100 sm:flex-row flex-col',
        isGrid
          ? rtl
            ? 'sm:flex-col gap-[20px] border-r border-b'
            : 'sm:flex-col gap-[20px] border-b'
          : 'border-b',
        isLast && 'border-none'
      )}
    >
      <div
        className={
          isGrid
            ? 'w-full h-[240px] relative'
            : 'min-w-[280px] sm:max-w-[280px] max-w-full h-[240px] relative'
        }
      >
        <Skeleton width='100%' height='100%' />
      </div>
      <div className='flex justify-between flex-auto'>
        <div className='flex flex-col justify-between sm:w-auto w-full'>
          <div className='mb-4'>
            <p className='text-lg font-medium mb-3'>
              <Skeleton width={100} height={28} />
            </p>
            <p className='flex items-center gap-1 text-[13px]'>
              <PersonIcon />
              <Skeleton width={100} height={20} />
            </p>
            <p className='flex items-center gap-1 text-[13px] mt-2'>
              <BedIconBedIcon />
              <Skeleton width={100} height={20} />
            </p>
          </div>

          <div className='sm:hidden w-full flex justify-between'>
            <div className='flex items-start flex-col'>
              <PriceInfo />
            </div>
            <div className='flex items-end gap-4'>
              <Skeleton width={48} height={48} />
              <Skeleton width={100} height={48} />
            </div>
          </div>
        </div>
        <div className='sm:flex hidden flex-col justify-between items-end'>
          <div className='flex items-end flex-col'>
            <button className='text-[15px] font-medium flex items-center gap-1'>
              객실 정보 <ArrowRightIcon />
            </button>
            <PriceInfo />
          </div>
          <div className='flex items-center gap-4'>
            <Skeleton width={48} height={48} />
            <Skeleton width={100} height={48} />
          </div>
        </div>
      </div>
    </div>
  )
}

const PriceInfo = () => {
  return (
    <>
      <p className='text-2xl font-bold mt-[10px] flex items-center gap-1'>
        <Skeleton width={100} height={35} />
        <span className='text-[16px] font-[400]'>원</span>
      </p>
      <p className='text-xs text-[#5C5F79] mt-1'>
        <Skeleton width={150} height={16} />
      </p>
      <p className='text-xs text-[#087671] mt-1'>
        {' '}
        <Skeleton width={150} height={16} />
      </p>
      <p className='text-xs mt-[14px]'>
        <Skeleton width={150} height={16} />
      </p>
    </>
  )
}
