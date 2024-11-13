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

export function HotelHorizontalCard({
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
  isLoadingInfo
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
  //     "kr_name_manual"
  //   ) {
  //     return portfolio?.data?.hits?.[0]?.kr_name_manual;
  //   }
  //   if (
  //     portfolio?.data?.hits?.[0]?.translation_options?.kr_name === "kr_name_oai"
  //   ) {
  //     return portfolio?.data?.hits?.[0]?.kr_name_oai;
  //   }
  //   return portfolio?.data?.hits?.[0]?.kr_name;
  // }, [portfolio?.data]);

  return (
    <>
      <button
        onClick={onClick}
        className={classNames(
          'flex text-left gap-[37px] transform-box pr-[15px]',
          className
        )}
      >
        <div className='h-[142px] sm:h-[137px] sm:w-[245px] relative'>
          {markupImageUrl && (
            <img
              src={markupImageUrl}
              className='w-[35px] h-[43px] object-contain left-[10px] top-[10px] absolute'
            />
          )}
          <img
            src={img || import.meta.env.VITE_EMPTY_HOTEL_IMAGE_URL}
            onError={handleErrorOnImageLoad}
            className='w-full h-full object-cover rounded-[10px] image'
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

        <div className='sm:mt-5 mt-[10px] flex-1 flex justify-between items-center'>
          <div className='flex flex-col'>
            <div className='flex gap-3'>
              <p className='text-sm sm:text-lg font-bold more-dots-1 h-[32px] max-h-[32px] sm:h-auto sm:max-h-auto'>
                {title}
              </p>

              <p className='text-lg text-[#333333]'>
                (리뷰
                <NumericFormat
                  displayType='text'
                  value={reviewsCount}
                  suffix='+개'
                  prefix=' '
                  thousandSeparator
                />
                )
              </p>
            </div>

            <p className='text-sm sm:text-base font-medium more-dots-1 h-[22px] max-h-[22px] sm:h-auto sm:max-h-auto'>
              {titleEn}
            </p>

            <p className='text-xs sm:text-base text-[#5C5F79] mt-1 leading-[18px] more-dots-1 max-h-[22px]'>
              {shortcutAddress(country)?.replace('|', ' , ')}
            </p>
          </div>

          <div className='flex items-center gap-8'>
            <div className='flex flex-col'>
              <p className='text-lg'>1박 기준</p>
              {isLoadingInfo ? (
                <div className='gap-1 flex items-center'>
                  <Skeleton width='100px' height='30px' />
                  <span className='text-base font-normal leading-[23px]'>
                    원
                  </span>
                </div>
              ) : (
                <p className='text-lg font-bold sm:text-[22px] sm:leading-[31px]'>
                  <NumericFormat
                    displayType='text'
                    value={price}
                    thousandSeparator
                  />{' '}
                  <span className='text-base font-normal leading-[23px]'>
                    원
                  </span>
                </p>
              )}
            </div>

            <p className='text-lg'>{'>'}</p>
          </div>
        </div>
      </button>
    </>
  )
}
