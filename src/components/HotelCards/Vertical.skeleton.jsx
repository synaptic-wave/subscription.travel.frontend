import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

export function HotelVerticalSkletonCard({ className }) {
  return (
    <>
      <div className={classNames('block text-left', className)}>
        <div className='h-[142px] sm:h-[200px] relative overflow-hidden'>
          <Skeleton width='100%' height={200} />
        </div>
        <div className='sm:mt-5 mt-[10px]'>
          <Skeleton width={200} height={24} />
          <div className='mt-1'>
            <Skeleton width={80} height={19} />
          </div>
          <div className='flex items-center mt-2 gap-[6px]'>
            <Skeleton width={120} height={13} />
          </div>
          <p className='sm:mt-[7px]'>
            <Skeleton width={150} height={32} />
          </p>
        </div>
      </div>
    </>
  )
}
