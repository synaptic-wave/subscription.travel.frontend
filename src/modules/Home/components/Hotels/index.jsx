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
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SliderNextArrow />,
  prevArrow: <SliderPrevArrow />,
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

export function Hotels({
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
        <div className='px-[16px] sm:px-0 flex sm:items-center sm:justify-between sm:mb-[20px] flex-col sm:flex-row gap-5'>
          {title}
          {tabs}
        </div>
        <div className='min-h-[349px] hidden sm:block'>
          <div className='hidden mx-[-13px] sm:block'>
            {!isLoading && mockHotels?.length > 4 ? (
              <Slider {...settingsSlider}>
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
                          index={index}
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
                    />
                  )
                })}
              </Slider>
            ) : (
              !isLoading &&
              !isLoadingHotel && (
                <div className='grid grid-cols-4'>
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
                            index={index}
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
                      />
                    )
                  })}
                </div>
              )
            )}
          </div>

          {isLoading && (
            <div className='hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-3'>
              <HotelVerticalSkletonCard />
              <HotelVerticalSkletonCard />
              <HotelVerticalSkletonCard />
              <HotelVerticalSkletonCard />
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

const InitialHotelCard = ({
  hotel,
  wishlist,
  isLoadingInfo,
  handleToggleWishlist,
  markupImageUrl,
  onChooseHotel,
  ...restProps
}) => {
  const images = Array.isArray(hotel?.metaData?.hotel?.images?.Image)
    ? hotel?.metaData?.hotel?.images?.Image.map((item) => item.FileName)
    : [hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName]
  return (
    <HotelVerticalCard
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
      className='px-[13px] w-full'
      images={images}
      {...restProps}
    />
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
  ...restProps
}) => {
  const images = Array.isArray(hotel?.metaData?.hotel?.images?.Image)
    ? hotel?.metaData?.hotel?.images?.Image.map((item) => item.FileName)
    : [hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName]
  return (
    <HotelVerticalCard
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
      className='px-[13px] w-full'
      {...restProps}
    />
  )
}
