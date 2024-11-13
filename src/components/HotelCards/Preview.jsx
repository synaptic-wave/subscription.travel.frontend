import HBIcon from '@/assets/icons/hb.svg?react'
import FavouriteIcon from '@/assets/icons/favourite-outline.svg?react'
import classNames from 'classnames'
import FavouriteFilledIcon from '@/assets/icons/favourite-fill.svg?react'

import { NumericFormat } from 'react-number-format'
import { IconButton } from '..'
import { handleErrorOnImageLoad } from '@/consts/img'
import { shortcutAddress } from '@/utils/hotelFunctions'

export function HotelPreviewCard({
  title = '더 b 이케부쿠로',
  titleEn,
  zone,
  img,
  location,
  description,
  className,
  onClick,
  reviewsCount,
  rating = 4,
  hotelCode,
  wishlist,
  handleToggleWishlist,
  markupImageUrl
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={classNames('block text-left', className)}
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
        <div className='sm:mt-5 mt-[10px]'>
          <p className='text-sm sm:text-lg font-medium truncate w-full'>
            {title}
          </p>
          <p className='text-sm sm:text-lg font-medium truncate'>{titleEn}</p>
          <p className='text-xs text-[#5C5F79] mt-1 leading-[18px] more-dots-1 max-h-[22px]'>
            {shortcutAddress(zone)?.replace('|', ' , ')}
          </p>

          <div className='block w-full mt-10'>
            <span className='px-[12px] py-1 bg-[#D9D9D9] rounded-full text-center sm:text-base text-[15px]'>
              {location}
            </span>

            <p className='mt-3 text-lg font-normal'>“{description}”</p>

            <div className='flex items-center gap-[6px] mt-4'>
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
          </div>
        </div>
      </button>
    </>
  )
}
