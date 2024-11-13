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

export function GroupHotels({
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
  title2,
  tab
}) {
  const [mutatedHotels, setMutatedHotels] = useState()
  const [wishlist, handleToggleWishlist] = useWishlistItem()

  useEffect(() => {
    if (!hotels) return

    async function updateHotelName() {
      try {
        fetchHotelNames(hotels).then((res) => {
          setMutatedHotels(res)
        })
      } catch (e) {
      } finally {
      }
    }

    updateHotelName()
  }, [hotels])

  const getPriceByJPCode = (code) => {
    const _hotel = mutatedHotels?.find(
      (item) => item.attributes.JPCode === code
    )

    const price =
      _hotel?.HotelOptions?.HotelOption?.[0].Prices.Price.TotalFixAmounts
        .attributes.Gross

    return price
  }

  const getCountryByJPCode = (code) => {
    const _hotel = mutatedHotels?.find(
      (item) => item.attributes.JPCode === code
    )

    return _hotel?.HotelInfo?.ZoneKr || _hotel?.HotelInfo?.ZoneEn
  }

  const getNameKRByJPCode = (code) => {
    const _hotel = mutatedHotels?.find(
      (item) => item.attributes.JPCode === code
    )

    return _hotel?.HotelInfo?.Name || _hotel?.HotelInfo?.NameEn
  }

  const getNameENByJPCode = (code) => {
    const _hotel = mutatedHotels?.find(
      (item) => item.attributes.JPCode === code
    )

    return _hotel?.HotelInfo?.NameEn || _hotel?.HotelInfo?.NameEn
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
        <div className='px-[16px] sm:px-0 flex sm:items-center sm:justify-between sm:mb-[30px] flex-col sm:flex-row gap-5'>
          {title}
          {tabs}
        </div>
        <div className='min-h-[349px] hidden sm:block'>
          <div className='hidden mx-[-13px] sm:block'>
            {!isLoading && mockHotels?.length > 4 ? (
              <Slider {...settingsSlider}>
                {mockHotels?.map((hotel) => {
                  if (mutatedHotels?.length > 0) {
                    if (getCountryByJPCode(hotel.hotelCode))
                      return (
                        <HotelVerticalCard
                          title={getNameKRByJPCode(hotel.hotelCode)}
                          titleEn={getNameENByJPCode(hotel.hotelCode)}
                          country={shortcutAddress(
                            mutatedHotels?.length > 0
                              ? getCountryByJPCode(hotel.hotelCode)
                              : hotel?.metaData?.hotel?.Zone.kr_name
                          )?.replace('|', ' , ')}
                          img={
                            hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName
                          }
                          wishlist={wishlist}
                          handleToggleWishlist={() =>
                            handleToggleWishlist(hotel.hotelCode)
                          }
                          markupImageUrl={markupImageUrl}
                          onClick={() =>
                            onChooseHotel(
                              hotel.hotelCode,
                              getNameKRByJPCode(hotel.hotelCode)
                            )
                          }
                          hotelCode={hotel.hotelCode}
                          key={hotel.hotelCode}
                          reviewsCount={
                            hotel?.metaData?.tripadvisorReview?.reviews
                          }
                          rating={hotel?.metaData?.tripadvisorReview?.rayting}
                          price={
                            mutatedHotels?.length > 0
                              ? getPriceByJPCode(hotel.hotelCode)
                              : hotel?.metaData?.hotelAvail?.HotelOptions
                                  ?.HotelOption?.[0].Prices.Price
                                  .TotalFixAmounts.attributes.Gross
                          }
                          className='px-[13px] w-full'
                        />
                      )
                    else return null
                  }
                  return (
                    <HotelVerticalCard
                      title={hotel?.metaData.hotel?.kr_name}
                      titleEn={hotel?.metaData.hotel?.en_name}
                      country={shortcutAddress(
                        mutatedHotels?.length > 0
                          ? getCountryByJPCode(hotel.hotelCode)
                          : hotel?.metaData?.hotel?.Zone.kr_name
                      )?.replace('|', ' , ')}
                      img={hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName}
                      wishlist={wishlist}
                      handleToggleWishlist={() =>
                        handleToggleWishlist(hotel.hotelCode)
                      }
                      markupImageUrl={markupImageUrl}
                      onClick={() =>
                        onChooseHotel(
                          hotel.hotelCode,
                          hotel?.metaData.hotel?.kr_name
                        )
                      }
                      hotelCode={hotel.hotelCode}
                      key={hotel.hotelCode}
                      reviewsCount={hotel?.metaData?.tripadvisorReview?.reviews}
                      rating={hotel?.metaData?.tripadvisorReview?.rayting}
                      price={
                        mutatedHotels?.length > 0
                          ? getPriceByJPCode(hotel.hotelCode)
                          : hotel?.metaData?.hotelAvail?.HotelOptions
                              ?.HotelOption?.[0].Prices.Price.TotalFixAmounts
                              .attributes.Gross
                      }
                      className='px-[13px] w-full'
                    />
                  )
                })}
              </Slider>
            ) : (
              !isLoading && (
                <div className='grid grid-cols-4'>
                  {mockHotels?.map((hotel) => {
                    if (mutatedHotels?.length > 0) {
                      if (getCountryByJPCode(hotel.hotelCode))
                        return (
                          <HotelVerticalCard
                            className='px-[13px] w-full'
                            title={getNameKRByJPCode(hotel.hotelCode)}
                            titleEn={getNameENByJPCode(hotel.hotelCode)}
                            country={shortcutAddress(
                              mutatedHotels?.length > 0
                                ? getCountryByJPCode(hotel.hotelCode)
                                : hotel?.metaData?.hotel?.Zone.kr_name
                            )?.replace('|', ' , ')}
                            img={
                              hotel?.metaData?.hotel?.images?.Image?.[0]
                                ?.FileName
                            }
                            wishlist={wishlist}
                            handleToggleWishlist={() =>
                              handleToggleWishlist(hotel.hotelCode)
                            }
                            key={hotel.hotelCode}
                            markupImageUrl={markupImageUrl}
                            onClick={() =>
                              onChooseHotel(
                                hotel.hotelCode,
                                getNameKRByJPCode(hotel.hotelCode)
                              )
                            }
                            hotelCode={hotel.hotelCode}
                            reviewsCount={
                              hotel?.metaData?.tripadvisorReview?.reviews
                            }
                            rating={hotel?.metaData?.tripadvisorReview?.rayting}
                            price={
                              mutatedHotels?.length > 0
                                ? getPriceByJPCode(hotel.hotelCode)
                                : hotel?.metaData?.hotelAvail?.HotelOptions
                                    ?.HotelOption?.[0].Prices.Price
                                    .TotalFixAmounts.attributes.Gross
                            }
                          />
                        )
                      else return null
                    }
                    return (
                      <HotelVerticalCard
                        className='px-[13px] w-full'
                        title={hotel?.metaData.hotel?.kr_name}
                        titleEn={hotel?.metaData.hotel?.en_name}
                        country={shortcutAddress(
                          mutatedHotels?.length > 0
                            ? getCountryByJPCode(hotel.hotelCode)
                            : hotel?.metaData?.hotel?.Zone.kr_name
                        )?.replace('|', ' , ')}
                        img={
                          hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName
                        }
                        wishlist={wishlist}
                        handleToggleWishlist={() =>
                          handleToggleWishlist(hotel.hotelCode)
                        }
                        key={hotel.hotelCode}
                        markupImageUrl={markupImageUrl}
                        onClick={() =>
                          onChooseHotel(
                            hotel.hotelCode,
                            hotel?.metaData.hotel?.kr_name
                          )
                        }
                        hotelCode={hotel.hotelCode}
                        reviewsCount={
                          hotel?.metaData?.tripadvisorReview?.reviews
                        }
                        rating={hotel?.metaData?.tripadvisorReview?.rayting}
                        price={
                          mutatedHotels?.length > 0
                            ? getPriceByJPCode(hotel.hotelCode)
                            : hotel?.metaData?.hotelAvail?.HotelOptions
                                ?.HotelOption?.[0].Prices.Price.TotalFixAmounts
                                .attributes.Gross
                        }
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
            <div className='flex mt-[20px] w-full overflow-auto no-scrollbar gap-3 sm:hidden'>
              {mockHotels?.map((hotel, index) => {
                if (mutatedHotels?.length > 0) {
                  if (getCountryByJPCode(hotel.hotelCode))
                    return (
                      <HotelVerticalCard
                        className={classNames(
                          'min-w-[200px] max-w-[250px]',
                          index === 0 && 'ml-[16px]',
                          index === mutatedHotels?.length && 'mr-[16px]'
                        )}
                        title={getNameKRByJPCode(hotel.hotelCode)}
                        titleEn={getNameENByJPCode(hotel.hotelCode)}
                        country={shortcutAddress(
                          mutatedHotels?.length > 0
                            ? getCountryByJPCode(hotel.hotelCode)
                            : hotel?.metaData?.hotel?.Zone.kr_name
                        )?.replace('|', ' , ')}
                        img={
                          hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName
                        }
                        wishlist={wishlist}
                        handleToggleWishlist={() =>
                          handleToggleWishlist(hotel.hotelCode)
                        }
                        key={hotel.hotelCode}
                        markupImageUrl={markupImageUrl}
                        onClick={() =>
                          onChooseHotel(
                            hotel.hotelCode,
                            getNameKRByJPCode(hotel.hotelCode)
                          )
                        }
                        hotelCode={hotel.hotelCode}
                        reviewsCount={
                          hotel?.metaData?.tripadvisorReview?.reviews
                        }
                        rating={hotel?.metaData?.tripadvisorReview?.rayting}
                        price={
                          mutatedHotels?.length > 0
                            ? getPriceByJPCode(hotel.hotelCode)
                            : hotel?.metaData?.hotelAvail?.HotelOptions
                                ?.HotelOption?.[0].Prices.Price.TotalFixAmounts
                                .attributes.Gross
                        }
                      />
                    )
                  else return null
                }
                return (
                  <HotelVerticalCard
                    className={classNames(
                      'min-w-[200px] max-w-[250px]',
                      index === 0 && 'ml-[16px]',
                      index === mutatedHotels?.length && 'mr-[16px]'
                    )}
                    title={hotel?.metaData.hotel?.kr_name}
                    titleEn={hotel?.metaData.hotel?.en_name}
                    country={shortcutAddress(
                      mutatedHotels?.length > 0
                        ? getCountryByJPCode(hotel.hotelCode)
                        : hotel?.metaData?.hotel?.Zone.kr_name
                    )?.replace('|', ' , ')}
                    img={hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName}
                    wishlist={wishlist}
                    handleToggleWishlist={() =>
                      handleToggleWishlist(hotel.hotelCode)
                    }
                    key={hotel.hotelCode}
                    markupImageUrl={markupImageUrl}
                    onClick={() =>
                      onChooseHotel(
                        hotel.hotelCode,
                        hotel?.metaData.hotel?.kr_name
                      )
                    }
                    hotelCode={hotel.hotelCode}
                    reviewsCount={hotel?.metaData?.tripadvisorReview?.reviews}
                    rating={hotel?.metaData?.tripadvisorReview?.rayting}
                    price={
                      mutatedHotels?.length > 0
                        ? getPriceByJPCode(hotel.hotelCode)
                        : hotel?.metaData?.hotelAvail?.HotelOptions
                            ?.HotelOption?.[0].Prices.Price.TotalFixAmounts
                            .attributes.Gross
                    }
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
