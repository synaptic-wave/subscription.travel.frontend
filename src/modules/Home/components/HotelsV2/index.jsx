import { HotelHorizontalSkletonCard } from '@/components/HotelCards/Horinzontal.skeleton'
import { HotelHorizontalCard } from '@/components/HotelCards/Horizontal'
import { HotelVerticalSkletonCard } from '@/components/HotelCards/Vertical.skeleton'
import {
  HotelVerticalCard,
  SliderNextArrow,
  SliderPrevArrow
} from '@/components/index'
import { useWishlistItem } from '@/hooks/useWishlist'
import { fetchHotelNames } from '@/modules/SearchResult'
import { NoRoomDialog } from '@/modules/SearchResult/components/NoRoomDialog'
import { SearchDialog } from '@/modules/SearchResult/components/SearchDialog'
import { shortcutAddress } from '@/utils/hotelFunctions'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'

export const settingsSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  nextArrow: <SliderNextArrow />,
  prevArrow: <SliderPrevArrow />,
  customPaging: (i, e) => {
    return (
      <span className='slick-custom-dot min-w-[12px] min-h-[12px] rounded-full bg-[#888888] flex'></span>
    )
  },
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    }
  ]
}

const getAvailableHotel = (code, hotels) => {
  const _hotel = hotels?.find((item) => item.attributes.JPCode === code)
  return !!_hotel
}

const getNameKRByJPCode = (code, hotels) => {
  const _hotel = hotels?.find((item) => item.attributes.JPCode === code)

  return _hotel?.HotelInfo?.Name || _hotel?.HotelInfo?.NameEn
}

const getNameENByJPCode = (code, hotels) => {
  const _hotel = hotels?.find((item) => item.attributes.JPCode === code)

  return _hotel?.HotelInfo?.NameEn || _hotel?.HotelInfo?.NameEn
}

const getPriceByJPCode = (code, hotels) => {
  const _hotel = hotels?.find((item) => item.attributes.JPCode === code)

  const price =
    _hotel?.HotelOptions?.HotelOption?.[0].Prices.Price.TotalFixAmounts
      .attributes.Gross

  return price
}

const getCountryByJPCode = (code, hotels) => {
  const _hotel = hotels?.find((item) => item.attributes.JPCode === code)

  return _hotel?.HotelInfo?.ZoneKr || _hotel?.HotelInfo?.ZoneEn
}

export function HotelsV2({
  title,
  tabs,
  items,
  hotels,
  isSearching,
  isOpenNotFound,
  setIsSearching,
  setIsOpenNotFound,
  onChooseHotel,
  isLoading,
  markupImageUrl,
  mockHotels = [],
  tab
}) {
  const [mutatedHotels, setMutatedHotels] = useState()
  const [wishlist, handleToggleWishlist] = useWishlistItem()
  const [isLoadingHotel, setIsLoadingHotel] = useState(false)

  useEffect(() => {
    if (!hotels) return

    async function updateHotelName() {
      setIsLoadingHotel(true)
      fetchHotelNames(hotels)
        .then((res) => {
          setMutatedHotels(res)
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          setIsLoadingHotel(false)
        })
    }

    updateHotelName()
  }, [hotels])

  const getHotelImages = (code) => {
    const _hotel = mockHotels.find((item) => item.hotelCode === code)
    return _hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName
  }

  useEffect(() => {
    setMutatedHotels([])
  }, [tab])

  return (
    <>
      <SearchDialog
        isOpen={isSearching}
        onClose={() => setIsSearching(false)}
      />

      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />
      <div className='mt-[40px] sm:mt-[80px] mx-[-16px] sm:mx-0'>
        <div className='px-[16px] sm:px-0 flex items-center sm:justify-center sm:mb-[30px] flex-col sm:flex-row gap-5 sm:text-[30px] text-lg font-bold'>
          {title}
        </div>
        <div className='px-[16px] sm:px-0 flex sm:items-center sm:justify-between sm:mb-[30px] flex-col sm:flex-row gap-5'>
          {tabs}
        </div>
        <div className='min-h-[349px] hidden sm:block'>
          <div className='hidden mx-[-13px] sm:block'>
            {!isLoading && mockHotels?.length > 4 ? (
              <Slider
                {...settingsSlider}
                dots={!isLoading && mutatedHotels?.length > 0}
              >
                {mockHotels?.map((hotel, index) => {
                  if (mutatedHotels?.length > 0) {
                    if (getAvailableHotel(hotel.hotelCode, mutatedHotels)) {
                      return (
                        <div key={hotel.hotelCode} className='pt-1'>
                          <AvailableHotelCard
                            isLoadingInfo={isLoadingHotel}
                            hotel={hotel}
                            wishlist={wishlist}
                            handleToggleWishlist={handleToggleWishlist}
                            onChooseHotel={onChooseHotel}
                            mutatedHotels={mutatedHotels}
                            markupImageUrl={markupImageUrl}
                            index={index}
                            type='horizontal'
                          />
                        </div>
                      )
                    }
                    return null
                  }

                  return (
                    <div key={hotel.hotelCode} className='pt-1'>
                      <InitialHotelCard
                        isLoadingInfo={true}
                        hotel={hotel}
                        wishlist={wishlist}
                        handleToggleWishlist={handleToggleWishlist}
                        onChooseHotel={onChooseHotel}
                        markupImageUrl={markupImageUrl}
                        index={index}
                        type='horizontal'
                      />
                    </div>
                  )
                })}
              </Slider>
            ) : (
              !isLoading &&
              !isLoadingHotel && (
                <div className='flex flex-col'>
                  {mockHotels?.map((hotel, index) => {
                    if (mutatedHotels?.length > 0) {
                      if (getAvailableHotel(hotel.hotelCode, mutatedHotels)) {
                        return (
                          <div key={hotel.hotelCode} className='pt-1'>
                            <AvailableHotelCard
                              isLoadingInfo={isLoadingHotel}
                              hotel={hotel}
                              wishlist={wishlist}
                              handleToggleWishlist={handleToggleWishlist}
                              onChooseHotel={onChooseHotel}
                              mutatedHotels={mutatedHotels}
                              markupImageUrl={markupImageUrl}
                              index={index}
                              type='horizontal'
                            />
                          </div>
                        )
                      }
                      return null
                    }

                    return (
                      <div key={hotel.hotelCode} className='pt-1'>
                        <InitialHotelCard
                          isLoadingInfo={true}
                          hotel={hotel}
                          wishlist={wishlist}
                          handleToggleWishlist={handleToggleWishlist}
                          onChooseHotel={onChooseHotel}
                          markupImageUrl={markupImageUrl}
                          index={index}
                          type='horizontal'
                        />
                      </div>
                    )
                  })}
                </div>
              )
            )}
          </div>

          {isLoading && (
            <div className='hidden sm:flex flex-col gap-3'>
              <HotelHorizontalSkletonCard />
              <HotelHorizontalSkletonCard />
              <HotelHorizontalSkletonCard />
            </div>
          )}
        </div>
        <div className='min-h-[271px] sm:hidden block'>
          {isLoading && (
            <div className='grid sm:hidden grid-cols-2 sm:grid-cols-4 gap-3 ml-[16px] mt-[20px]'>
              <HotelVerticalSkletonCard />
              <HotelVerticalSkletonCard />
            </div>
          )}

          {!isLoading && (
            <div className='flex mt-[20px] w-full overflow-auto no-scrollbar sm:hidden'>
              {mockHotels?.map((hotel, index) => {
                if (mutatedHotels?.length > 0) {
                  if (getAvailableHotel(hotel.hotelCode, mutatedHotels)) {
                    return (
                      <AvailableHotelCard
                        isLoadingInfo={isLoadingHotel}
                        hotel={hotel}
                        wishlist={wishlist}
                        handleToggleWishlist={handleToggleWishlist}
                        onChooseHotel={onChooseHotel}
                        mutatedHotels={mutatedHotels}
                        markupImageUrl={markupImageUrl}
                        key={hotel.hotelCode}
                        type='vertical'
                        index={index}
                        className={classNames(
                          'min-w-[200px] max-w-[250px] ml-[16px]'
                          // index === 0 && 'ml-[16px]',
                          // index === mockHotels?.length && 'mr-[16px]'
                        )}
                      />
                    )
                  }
                  return null
                }
                return (
                  <InitialHotelCard
                    isLoadingInfo={true}
                    hotel={hotel}
                    wishlist={wishlist}
                    handleToggleWishlist={handleToggleWishlist}
                    onChooseHotel={onChooseHotel}
                    markupImageUrl={markupImageUrl}
                    key={hotel.hotelCode}
                    index={index}
                    type='vertical'
                    className={classNames(
                      'min-w-[200px] max-w-[250px] ml-[16px]'
                      // index === 0 && 'ml-[16px]',
                      // index === mockHotels?.length && 'mr-[16px]'
                    )}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const AvailableHotelCard = ({
  hotel,
  wishlist,
  handleToggleWishlist,
  markupImageUrl,
  onChooseHotel,
  mutatedHotels,
  isLoadingInfo,
  type,
  ...restProps
}) => {
  const images = Array.isArray(hotel?.metaData?.hotel?.images?.Image)
    ? hotel?.metaData?.hotel?.images?.Image.map((item) => item.FileName)
    : [hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName]

  const Component =
    type === 'horizontal' ? HotelHorizontalCard : HotelVerticalCard

  return (
    <Component
      isLoadingInfo={isLoadingInfo}
      title={getNameKRByJPCode(hotel.hotelCode, mutatedHotels)}
      titleEn={getNameENByJPCode(hotel.hotelCode, mutatedHotels)}
      country={shortcutAddress(
        getCountryByJPCode(hotel.hotelCode, mutatedHotels)
      )?.replace('|', ' , ')}
      img={hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName}
      wishlist={wishlist}
      handleToggleWishlist={() => handleToggleWishlist(hotel.hotelCode)}
      markupImageUrl={markupImageUrl}
      onClick={() =>
        onChooseHotel(hotel.hotelCode, hotel?.metaData.hotel?.kr_name)
      }
      images={images}
      hotelCode={hotel.hotelCode}
      reviewsCount={hotel?.metaData?.tripadvisorReview?.reviews}
      rating={hotel?.metaData?.tripadvisorReview?.rayting}
      price={getPriceByJPCode(hotel.hotelCode, mutatedHotels)}
      className='w-full'
      {...restProps}
    />
  )
}

const InitialHotelCard = ({
  hotel,
  wishlist,
  isLoadingInfo,
  handleToggleWishlist,
  markupImageUrl,
  onChooseHotel,
  type,
  ...restProps
}) => {
  const Component =
    type === 'horizontal' ? HotelHorizontalCard : HotelVerticalCard
  const images = Array.isArray(hotel?.metaData?.hotel?.images?.Image)
    ? hotel?.metaData?.hotel?.images?.Image.map((item) => item.FileName)
    : [hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName]
  return (
    <Component
      isLoadingInfo={isLoadingInfo}
      title={hotel?.metaData.hotel?.kr_name}
      titleEn={hotel?.metaData.hotel?.en_name}
      country={shortcutAddress(hotel?.metaData?.hotel?.zone?.kr_name)?.replace(
        '|',
        ' , '
      )}
      img={hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName}
      wishlist={wishlist}
      handleToggleWishlist={() => handleToggleWishlist(hotel.hotelCode)}
      markupImageUrl={markupImageUrl}
      onClick={() =>
        onChooseHotel(hotel.hotelCode, hotel?.metaData.hotel?.kr_name)
      }
      hotelCode={hotel.hotelCode}
      reviewsCount={hotel?.metaData?.tripadvisorReview?.reviews}
      rating={hotel?.metaData?.tripadvisorReview?.rayting}
      price={hotel?.metaData?.hotel?.price}
      images={images}
      className='w-full'
      {...restProps}
    />
  )
}
