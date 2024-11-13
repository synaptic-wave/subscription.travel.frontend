import image from '@/assets/images/room.png'
import HBIcon from '@/assets/icons/hb.svg?react'
import FavouriteIcon from '@/assets/icons/favourite-outline.svg?react'
import classNames from 'classnames'
import { NumericFormat } from 'react-number-format'
import { IconButton } from '..'
import { useDispatch, useSelector } from 'react-redux'
import FavouriteFilledIcon from '@/assets/icons/favourite-fill.svg?react'
import { wishlistActions } from '@/store/wishlist/wishlist.slice'
import { handleErrorOnImageLoad } from '@/consts/img'
import { useGetHotelPortfolio } from '@/services/search.service'
import { shortcutAddress } from '@/utils/hotelFunctions'
import { useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'

const translateOptions = {
  kr_name_manual: 'kr_name_manual',
  kr_name_oai: 'kr_name_oai'
}

export function HotelVerticalCard({
  title = '더 b 이케부쿠로',
  titleEn,
  country,
  price = '116,303',
  img,
  className,
  onClick,
  reviewsCount,
  rating = 4,
  hotelCode,
  wishlist,
  handleToggleWishlist,
  markupImageUrl,
  isLoadingInfo = false
}) {
  // const { data: portfolio } = useGetHotelPortfolio({
  //   params: {
  //     page: 1,
  //     page_size: 10,
  //     jp_code: hotelCode
  //   }
  // })

  // const hotelNameKr = useMemo(() => {
  //   if (
  //     portfolio?.data?.hits?.[0]?.translation_options?.kr_name ===
  //     'kr_name_manual'
  //   ) {
  //     return portfolio?.data?.hits?.[0]?.kr_name_manual
  //   }
  //   if (
  //     portfolio?.data?.hits?.[0]?.translation_options?.kr_name === 'kr_name_oai'
  //   ) {
  //     return portfolio?.data?.hits?.[0]?.kr_name_oai
  //   }
  //   return portfolio?.data?.hits?.[0]?.kr_name
  // }, [portfolio?.data])

  return (
    <div className='py-[10px]'>
      <button
        onClick={onClick}
        className={classNames('block text-left scale-box', className)}
      >
        <div className='h-[142px] sm:h-[200px] relative'>
          {markupImageUrl && (
            <img
              src={markupImageUrl}
              className='w-[35px] h-[43px] object-contain left-[10px] top-[10px] absolute'
            />
          )}
          <img
            src={img || import.meta.env.VITE_EMPTY_HOTEL_IMAGE_URL}
            onError={handleErrorOnImageLoad}
            className='w-full h-full object-cover rounded-[10px]'
          />
          <div className='flex items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-[10px] bg-white absolute left-[10px] bottom-[10px]'>
            <IconButton
              style={{ border: 'none' }}
              onClick={(e) => {
                e?.stopPropagation()
                handleToggleWishlist()
              }}
              icon={
                wishlist?.includes(hotelCode) ? (
                  <FavouriteFilledIcon />
                ) : (
                  <FavouriteIcon />
                )
              }
            />
          </div>
        </div>
        {isLoadingInfo ? (
          <InfoSkeleton />
        ) : (
          <div className='sm:mt-5 mt-[10px]'>
            <p className='text-sm sm:text-base font-medium more-dots-1 h-[22px] max-h-[22px] sm:h-auto sm:max-h-auto'>
              {title}
            </p>
            <p className='text-sm sm:text-base font-medium more-dots-1 h-[22px] max-h-[22px] sm:h-auto sm:max-h-auto'>
              {titleEn}
            </p>
            <p className='text-xs sm:text-base text-[#5C5F79] mt-1 leading-[18px] more-dots-1 max-h-[22px]'>
              {shortcutAddress(country)?.replace('|', ' , ')}
            </p>
            <div className='flex items-center mt-2 gap-[6px]'>
              <HBIcon />
              <div className='flex items-center gap-[2px]'>
                {Array.from(
                  Array(rating > 5 ? 5 : Math.floor(rating)).keys()
                ).map((value) => (
                  <div
                    className='rounded-full w-[12px] h-[12px] bg-[#00AA6C] border border-[#00AA6C]'
                    key={value}
                  ></div>
                ))}

                {Array.from(
                  Array(5 - (rating > 5 ? 5 : Math.floor(rating))).keys()
                ).map((value) => (
                  <div
                    className='rounded-full w-[12px] h-[12px] bg-white border border-[#00AA6C]'
                    key={value}
                  ></div>
                ))}
              </div>
              <p className='text-xs text-[#333333]'>
                <NumericFormat
                  displayType='text'
                  value={reviewsCount}
                  thousandSeparator
                />
              </p>
            </div>
            <p className='text-lg font-bold sm:text-[22px] sm:leading-[31px] sm:mt-[7px]'>
              <NumericFormat
                displayType='text'
                value={price}
                thousandSeparator
              />{' '}
              <span className='text-base font-normal leading-[23px]'>원</span>
            </p>
          </div>
        )}
      </button>
    </div>
  )
}

const InfoSkeleton = () => (
  <div className='sm:mt-5 mt-[10px]'>
    <p className='text-sm sm:text-base font-medium more-dots-1 h-[22px] max-h-[22px] sm:h-auto sm:max-h-auto w-40'>
      <Skeleton height={18} width={200} />
    </p>
    <p className='text-sm sm:text-base font-medium more-dots-1 h-[22px] max-h-[22px] sm:h-auto sm:max-h-auto'>
      <Skeleton height={18} width={200} />
    </p>
    <p className='text-xs sm:text-base text-[#5C5F79] mt-1 leading-[18px] more-dots-1 max-h-[22px]'>
      <Skeleton height={14} width={150} />
    </p>
    <div className='flex items-center mt-2 gap-[6px]'>
      <HBIcon />
      <div className='flex items-center gap-[2px]'>
        {Array.from(Array(5).keys()).map((value) => (
          <div
            className='rounded-full w-[12px] h-[12px] bg-white border border-[#00AA6C]'
            key={value}
          ></div>
        ))}
      </div>
      <p className='text-xs text-[#333333]'>
        <Skeleton height={12} width={80} />
      </p>
    </div>
    <p className='text-lg font-bold sm:text-[22px] sm:leading-[31px] sm:mt-[7px] flex gap-1'>
      <Skeleton height={18} width={80} />
      <Skeleton height={18} width={20} />
    </p>
  </div>
)
