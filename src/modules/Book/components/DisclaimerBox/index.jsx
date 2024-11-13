import { Button, Dialog, Input } from '@/components/index'
import warningGif from '@/assets/gifs/warning.gif'
import classNames from 'classnames'
import { useState } from 'react'

export default function DisclaimerBox({
  isLoadingPromocode,
  paymentTypes,
  onChangePaymentType,
  selectedPaymentType,
  className,
  promocode,
  onChangePromocode,
  onCheckPromocode,
  hasAppliedPromoced,
  isLoading
}) {
  const [isOpenWarning, setIsOpenWarning] = useState(false)

  return (
    <>
      <div className={classNames('flex flex-col', className)}>
        <h2 className='text-[14px] font-medium text-[#161A3F]'>할인 쿠폰</h2>

        <div className='flex flex-col items-center my-[15px] sm:my-[26px] gap-3'>
          <Input
            value={promocode}
            onChange={(e) => onChangePromocode(e.target.value)}
            className='w-full'
            label='쿠폰 번호'
            placeholder='쿠폰 번호를 입력해 주세요'
            disabled={hasAppliedPromoced}
          />
          <Button
            disabled={!promocode || isLoadingPromocode || hasAppliedPromoced}
            className='w-full'
            onClick={onCheckPromocode}
            isLoading={isLoading}
          >
            쿠폰 확인
          </Button>
        </div>

        <div className='w-full'>
          <p className='text-[#FF3838] text-sm font-bold'>쿠폰사용 주의사항</p>
          <ul className='list-disc pl-5 mt-1 mb-6'>
            <li className='text-[#5C5F79] text-sm font-normal'>
              사용한 쿠폰은 취소 시 반환되지 않습니다.
            </li>
            <li className='text-[#5C5F79] text-sm font-normal'>
              한번에 여러 객실 결제 시 요금이 가장 높은 객실에 적용됩니다.
            </li>
            <li className='text-[#5C5F79] text-sm font-normal'>
              예약 금액이 100,000원 이상이어야 할인 쿠폰 적용이 가능합니다.
            </li>
          </ul>
        </div>

        <h2 className='text-[14px] font-medium text-[#161A3F]'>
          결제 수단 선택
        </h2>

        <div className='flex mt-[15px] sm:mt-[26px] gap-[10px]'>
          {paymentTypes.map((payment, pidx) => (
            <button
              key={pidx}
              type='button'
              onClick={() => onChangePaymentType(payment.value)}
              className={classNames(
                'w-[160px] h-[48px] border border-solid border-gray-100 rounded-[10px] text-[14px] text-[#161A3F]',
                {
                  ['border-[#2D40FF] bg-[#2D40FF] text-white']:
                    payment.value === selectedPaymentType
                }
              )}
            >
              {payment.label}
            </button>
          ))}
        </div>
      </div>

      <Dialog
        isOpen={isOpenWarning}
        withCloseButton={false}
        onClose={() => {
          setIsOpenWarning(false)
        }}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={warningGif} className='w-[80px] h-[80px] object-contain' />

          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            쿠폰 확인 오류
          </p>
          <p className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            유효하지 않은 쿠폰입니다
            <br />
            쿠폰 번호를 다시 확인해 주세요
          </p>
          <Button
            onClick={() => {
              setIsOpenWarning(false)
            }}
            type='button'
            className='w-[180px] mx-auto mt-[50px]'
          >
            다시 입력하기
          </Button>
        </div>
      </Dialog>
    </>
  )
}
