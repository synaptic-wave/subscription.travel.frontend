import Skeleton from 'react-loading-skeleton'
import { NumericFormat } from 'react-number-format'

export function Info({ roomsPrice, roomAmount, isLoading }) {
  return (
    <div className='py-8 px-5 border border-solid border-gray-100 rounded-[10px] sm:mt-[30px]'>
      <div className='flex justify-between items-center'>
        <h5 className='text-base sm:text-[20px] font-medium text-[#161A3F]'>
          결제 금액
        </h5>

        {isLoading ? (
          <Skeleton className='w-[80px] h-[15px]' />
        ) : (
          <p className='text-[14px] font-medium text-[#161A3F]'>
            결제 총 {roomAmount}건
          </p>
        )}
      </div>

      <div className='flex flex-col w-full mt-[27px] gap-4'>
        <div className='flex items-center justify-between'>
          <span className='text-[14px] font-medium text-[#A3A5B8]'>
            총 상품 가격
          </span>
          {isLoading ? (
            <Skeleton className='w-[100px] h-[25px]' />
          ) : (
            <span className='text-[#161A3F] text-sm sm:text-[20px] font-bold'>
              <NumericFormat
                displayType='text'
                value={roomsPrice}
                thousandSeparator
              />{' '}
              <span className='text-sm font-medium'>원</span>
            </span>
          )}
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-[14px] font-medium text-[#A3A5B8]'>
            세금/수수료
          </span>
          {isLoading ? (
            <Skeleton className='w-[100px] h-[25px]' />
          ) : (
            <span className='text-[#161A3F] text-sm sm:text-[20px] font-bold'>
              <NumericFormat displayType='text' value={0} thousandSeparator />{' '}
              <span className='text-sm font-medium'>원</span>
            </span>
          )}
        </div>

        <div className='h-[1px] w-full bg-[#F3F3FB] my-2'></div>

        <div className='flex justify-between w-full items-center'>
          <span className='text-[14px] font-medium text-[#161A3F]'>
            총 결제 금액
          </span>
          {isLoading ? (
            <Skeleton className='w-[100px] h-[25px]' />
          ) : (
            <span className='text-[#FF176B] text-lg sm:text-[20px] font-bold'>
              <NumericFormat
                displayType='text'
                value={roomsPrice}
                thousandSeparator
              />{' '}
              <span className='text-sm font-medium'>원</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
