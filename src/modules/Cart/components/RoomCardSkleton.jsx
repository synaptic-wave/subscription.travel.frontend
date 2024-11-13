import PersonIcon from '@/assets/icons/person-v2.svg?react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

export function RoomCardSkleton({ className = '' }) {
  return (
    <div className={className}>
      <div className='grid grid-cols-12 gap-[20px]'>
        <div className='sm:col-span-3 col-span-12'>
          <Skeleton
            className='h-[118px] sm:h-[178px] w-full'
            borderRadius='10px'
          />
        </div>
        <div className='sm:col-span-9 col-span-12'>
          <div className='flex sm:justify-between sm:flex-row flex-col'>
            <div className='flex flex-col justify-between gap-3'>
              <div>
                <div className='flex items-center gap-5'>
                  <div className='flex items-center gap-1 text-sm'>
                    <PersonIcon />
                    <Skeleton className='w-[100px] h-[20px]' />
                  </div>
                </div>
                <div className='flex items-center sm:justify-normal justify-between mt-4 gap-5'>
                  <p className='w-[52px] text-sm text-[#A3A5B8]'>객실</p>
                  <Skeleton className='w-[150px] h-[20px]' />
                </div>
                <div className='flex items-center sm:justify-normal justify-between mt-4 gap-5'>
                  <p className='w-[52px] text-sm text-[#A3A5B8]'>일정</p>
                  <p className='text-sm'>
                    <Skeleton className='w-[200px] h-[20px]' />
                  </p>
                </div>
              </div>

              <RoomInfo className='sm:hidden flex justify-between items-end' />
            </div>
            <RoomInfo className='sm:flex hidden flex-col items-end' />
          </div>
        </div>
      </div>
    </div>
  )
}

const RoomInfo = ({ className }) => {
  return (
    <div className={className}>
      <div className='flex justify-between items-start sm:items-end flex-col'>
        <Skeleton className='h-[16px] w-[150px] mb-1' />
        <Skeleton className='h-[28px] w-[150px]' />
        <Skeleton className='h-[16px] w-[150px] mt-1' />
        <Skeleton className='h-[16px] w-[150px] mt-1' />{' '}
        <Skeleton className='h-[16px] w-[200px] mt-[14px]' />
      </div>

      <Skeleton className='h-[48px] w-[91px] sm:mt-[30px]' />
    </div>
  )
}
