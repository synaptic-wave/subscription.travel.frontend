import classNames from 'classnames'
import moment from 'moment'
import { useMemo } from 'react'
import { NumericFormat } from 'react-number-format'

export const PriceSection = ({
  textAlign = 'right',
  price,
  checkIn,
  checkOut,
  hotelOffers,
  responsiveTextAlign = 'right',
  paxes
}) => {
  const nightsAmount = useMemo(() => {
    return moment(checkOut).diff(checkIn, 'day')
  }, [checkIn, checkOut])

  return (
    <div className='flex flex-col w-full'>
      <div
        className={classNames(
          `sm:text-${textAlign} text-${responsiveTextAlign} text-xs text-gray-600 mb-1 flex`,
          {
            'sm:justify-start': textAlign === 'left',
            'sm:justify-end': textAlign !== 'left',
            'justify-start': responsiveTextAlign === 'left',
            'justify-end': responsiveTextAlign !== 'left'
          }
        )}
      >
        {nightsAmount || 1}박 / 성인 {paxes}명 기준
      </div>
      {hotelOffers?.length > 0 && (
        <div
          className={classNames('flex items-center gap-[6px]', {
            'sm:justify-start': textAlign === 'left',
            'sm:justify-end': textAlign !== 'left',
            'justify-start': responsiveTextAlign === 'left',
            'justify-end': responsiveTextAlign !== 'left'
          })}
        >
          <span className='bg-[#FFF06B] px-[3px] py-[7px] text-xs font-medium rounded-[5px]'>
            30% 할인
          </span>

          <div className='flex items-center text-[#FF3838]'>
            <span className='text-[13px] font-normal line-through'>
              <NumericFormat
                prefix='₩'
                value={price}
                displayType='text'
                thousandSeparator
              />
            </span>
          </div>
        </div>
      )}

      <div
        className={classNames(`flex items-center`, {
          'sm:justify-start': textAlign === 'left',
          'sm:justify-end': textAlign !== 'left',
          'justify-start': responsiveTextAlign === 'left',
          'justify-end': responsiveTextAlign !== 'left'
        })}
      >
        <NumericFormat
          className='text-lg sm:text-[22px] font-bold'
          value={price}
          displayType='text'
          thousandSeparator
        />

        <span className='text-[13px] sm:text-base ml-1'> 원</span>
      </div>

      <div
        className={classNames(
          `text-[11px] sm:text-xs sm:text-${textAlign} flex items-center text-${responsiveTextAlign} text-[#5b95eb] mt-1 flex-wrap`,
          {
            'sm:justify-start': textAlign === 'left',
            'sm:justify-end': textAlign !== 'left',
            'justify-start': responsiveTextAlign === 'left',
            'justify-end': responsiveTextAlign !== 'left'
          }
        )}
      >
        1박당 평균금액&nbsp;
        <NumericFormat
          displayType='text'
          thousandSeparator
          prefix=' '
          decimalScale={0}
          value={Number(price) / (nightsAmount || 1)}
          suffix='원'
        />
      </div>
    </div>
  )
}
