import { Button, HFInput, Input } from '@/components/index'
import { paymentTypes } from '@/consts/index'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

export default function BookFormSkeleton({ control }) {
  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-base sm:text-xl font-medium text-[#161A3F]'>
        고객 예약 정보
      </h2>
      <p className='text-xs mt-2 text-[#FF3838]'>
        동반 예약자 정보 입력은 선택사항이나, 일부 국가의 경우 모든 예약자 정보
        제공이 필수적입니다. 이점 유의하시기 바랍니다.
      </p>
      <div className='flex flex-col gap-6 mt-[30px]'>
        <div className='flex flex-col gap-2'>
          <Skeleton width={60} height={24} />
          <div className='flex flex-col gap-[26px]'>
            <div className='flex flex-col gap-3'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <HFInput
                  isLoading
                  control={control}
                  name='name'
                  label='성(영문사용)'
                  placeholder='예) Hong'
                />

                <HFInput
                  isLoading
                  control={control}
                  name='surname'
                  label='이름(영문사용)'
                  placeholder='예) Gildong'
                />

                <HFInput
                  isLoading
                  label='핸드폰'
                  control={control}
                  name='phone'
                  placeholder='연락처를 입력해 주세요'
                />

                <HFInput
                  isLoading
                  label='이메일'
                  control={control}
                  name='email'
                  placeholder='이메일을 입력해 주세요'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-[1px] w-full bg-[#F3F3FB] my-7'></div>

      <div className='flex flex-col'>
        <h2 className='text-[14px] font-medium text-[#161A3F]'>할인 쿠폰</h2>

        <div className='flex items-center my-[26px] gap-4'>
          <Input
            className='w-[65%] sm:w-[300px]'
            label='쿠폰 번호'
            placeholder='쿠폰 번호를 입력해 주세요'
            isLoading
          />
          <Skeleton className='mt-[26px]' width={120} height={48} />
        </div>

        <h2 className='text-[14px] font-medium text-[#161A3F]'>
          결제 수단 선택
        </h2>

        <div className='flex mt-[26px] gap-[10px]'>
          {paymentTypes.map((payment, pidx) => (
            <Skeleton key={pidx} width={160} height={48} />
          ))}
        </div>
      </div>
    </div>
  )
}
