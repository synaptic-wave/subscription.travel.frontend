import HBIcon from '@/assets/icons/hb.svg?react'
import Location from '@/assets/icons/location.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import FavouriteIcon from '@/assets/icons/favourite.svg?react'
import { IconButton, ShareModal } from '@/components/index'
import StarIcon from '@/assets/icons/star.svg?react'
import FavouriteFilledIcon from '@/assets/icons/favourite-fill.svg?react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { wishlistActions } from '@/store/wishlist/wishlist.slice'
import { useState } from 'react'
import { PriceSection } from '@/components/PriceSection'

export function Info({
  name,
  nameEn,
  location,
  stars,
  price,
  rating,
  commentsAmount,
  adultsAmount,
  checkOut,
  checkIn,
  specialMarkup
}) {
  const scrollToReview = () => {
    const section = document.querySelector('#review')
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className='sm:mt-[40px] mt-[11px] flex justify-between sm:flex-row flex-col'>
      <div>
        <div className='sm:hidden'>
          <StartBulks amount={stars || 0} />
        </div>

        <p className='sm:text-[24px] text-base font-medium mb-[10px] sm:h-[30px]'>
          {name}
        </p>

        <p className='sm:text-[24px] text-base font-medium mb-[10px] sm:h-[30px]'>
          {nameEn}
        </p>
        <div className='flex items-center text-[13px] gap-1'>
          <Location />
          <p className='text-[#5C5F79]'>{location}</p>
          {/* <button className='text-[#17A2B8]'>주소 복사</button> */}
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='flex items-center mt-[20px] gap-[6px]'>
              <HBIcon />
              <div className='flex items-center gap-[2px]'>
                {Array.from(Array(Math.floor(rating || 0)).keys()).map(
                  (value) => (
                    <div
                      className='rounded-full sm:w-[16px] sm:h-[16px] w-[10px] h-[10px] bg-[#00AA6C] border border-[#00AA6C]'
                      key={value}
                    ></div>
                  )
                )}
                {Array.from(Array(5 - Math.floor(rating || 0)).keys()).map(
                  (value) => (
                    <div
                      className='rounded-full sm:w-[16px] sm:h-[16px] w-[10px] h-[10px] bg-[#fff] border border-gray-100'
                      key={value}
                    ></div>
                  )
                )}
              </div>
              <p className='text-xs text-[#333333]'>
                <NumericFormat
                  value={commentsAmount}
                  thousandSeparator
                  displayType='text'
                />
              </p>
              <button
                onClick={scrollToReview}
                className='text-[#17A2B8] text-[13px]'
              >
                이용후기 확인
              </button>
            </div>

            {/* <div className="flex items-center gap-2 mt-[20px] relative z-[9]">
              <IconButton
                icon={
                  wishlist.includes(hotelCode) ? (
                    <FavouriteFilledIcon />
                  ) : (
                    <FavouriteIcon />
                  )
                }
                onClick={() => {
                  dispatch(wishlistActions.addToWishlist(hotelCode));
                }}
              />
              <IconButton
                icon={<ShareIcon />}
                onClick={toggleShareModal}
                active={showShareModal}
              />
            </div> */}
          </div>

          <HotelPriceInfo
            checkIn={checkIn}
            checkOut={checkOut}
            price={price}
            className='flex flex-col items-end sm:hidden'
            adultsAmount={adultsAmount}
          />
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='sm:block hidden'>
          <StartBulks amount={stars || 0} />
        </div>
        <HotelPriceInfo
          checkIn={checkIn}
          checkOut={checkOut}
          price={price}
          className='sm:flex items-end flex-col hidden'
          adultsAmount={adultsAmount}
        />
      </div>

      {/* <ShareModal
        isOpen={showShareModal}
        onClose={toggleShareModal}
        isLoading={false}
        sessionId={sessionId}
      /> */}
    </div>
  )
}

const HotelPriceInfo = ({
  price,
  className,
  adultsAmount,
  checkIn,
  checkOut
}) => {
  return (
    <div className={className}>
      <PriceSection
        price={price}
        paxes={adultsAmount}
        checkIn={checkIn}
        checkOut={checkOut}
        // hotelOffers={[1, 2, 3]}
      />

      <p className='text-xs text-[#087671] mt-1'>세금 및 기타 요금 포함</p>
    </div>
  )
}

const StartBulks = ({ amount }) => {
  return (
    <div className='flex gap-1'>
      {Array(amount)
        .fill(1)
        .map((_, index) => (
          <StarIcon key={index} />
        ))}
    </div>
  )
}
