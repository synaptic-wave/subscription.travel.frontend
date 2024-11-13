import { HotelPreviewCard } from '@/components/HotelCards/Preview'
import { HotelVerticalSkletonCard } from '@/components/HotelCards/Vertical.skeleton'
import { useWishlistItem } from '@/hooks/useWishlist'
import { NoRoomDialog } from '@/modules/SearchResult/components/NoRoomDialog'
import { SearchDialog } from '@/modules/SearchResult/components/SearchDialog'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'

export function SliderNextArrowType(props) {
  const { className, arrowClassName = '', onClick } = props
  return (
    <div
      className={classNames(
        className,
        ` before:hidden flex items-center justify-center sm:w-[45px] sm:h-[45px] w-[32px] h-[32px] z-[9] pl-7 ${arrowClassName}`
      )}
      onClick={onClick}
    >
      <svg
        width='23'
        height='27'
        viewBox='0 0 23 27'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.9119 15.2159L0.0426137 26.8636V22.3182L17.5852 13.8665L17.4432 14.1506V13.4403L17.5852 13.7244L0.0426137 5.27273V0.727272L22.9119 12.375V15.2159Z'
          fill='#888888'
        />
      </svg>
    </div>
  )
}

export function SliderPrevArrowType(props) {
  const { className, arrowClassName = '', onClick } = props
  return (
    <div
      className={classNames(
        className,
        ` before:hidden flex items-center justify-center sm:w-[45px] sm:h-[45px] w-[32px] h-[32px] z-[9] pr-7 ${arrowClassName}`
      )}
      onClick={onClick}
    >
      <svg
        className='rotate-180'
        width='23'
        height='27'
        viewBox='0 0 23 27'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.9119 15.2159L0.0426137 26.8636V22.3182L17.5852 13.8665L17.4432 14.1506V13.4403L17.5852 13.7244L0.0426137 5.27273V0.727272L22.9119 12.375V15.2159Z'
          fill='#888888'
        />
      </svg>
    </div>
  )
}

export const settingsSlider = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SliderNextArrowType />,
  prevArrow: <SliderPrevArrowType />,
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

export function HotelsPreview({
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
  mockHotels = []
}) {
  const [mutatedHotels, setMutatedHotels] = useState()
  const [wishlist, handleToggleWishlist] = useWishlistItem()

  useEffect(() => {
    if (!hotels) return
    setMutatedHotels(hotels)
    // async function updateHotelName() {
    //   try {
    //     fetchHotelNames(hotels).then((res) => {
    //       setMutatedHotels(res);
    //     });
    //   } catch (e) {
    //   } finally {
    //   }
    // }

    // updateHotelName();
  }, [hotels])

  const getHotelImages = (code) => {
    const _hotel = mockHotels.find((item) => item.hotelCode === code)
    return _hotel?.metaData?.hotel?.images?.Image?.[0]?.FileName
  }

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
      <div className='my-[40px] sm:mt-[80px] mx-[-16px] sm:mx-0 bg-[#F3ECEC] py-[63px]'>
        <div className='container'>
          <div className='sm:w-[80%] w-full mx-auto'>
            <div className='px-[16px] sm:px-0 flex sm:items-center sm:justify-center sm:mb-[30px] flex-col sm:flex-row gap-5'>
              {title}
            </div>
            <div className='min-h-[349px] hidden sm:block'>
              <div className='hidden mx-[-13px] sm:block'>
                {!isLoading && mutatedHotels?.length > 4 ? (
                  <Slider {...settingsSlider}>
                    {mutatedHotels?.map((hotel) => {
                      return (
                        <div className='w-full px-3'>
                          <HotelPreviewCard
                            wishlist={wishlist}
                            handleToggleWishlist={() =>
                              handleToggleWishlist(hotel?.hotelCode)
                            }
                            title={hotel?.metaData?.kr_name}
                            markupImageUrl={markupImageUrl}
                            titleEn={hotel?.metaData?.en_name}
                            className='w-full bg-white px-[18px] py-[25px] rounded-[10px]'
                            zone={hotel?.metaData?.zone?.kr_name}
                            img={
                              hotel?.metaData?.images?.Image?.[0]?.FileName ||
                              getHotelImages(hotel?.attributes?.JPCode)
                            }
                            onClick={() =>
                              onChooseHotel(
                                hotel?.hotelCode,
                                hotel?.metaData?.kr_name
                              )
                            }
                            location={hotel?.metaData?.location}
                            description={hotel?.metaData?.description}
                            hotelCode={hotel?.hotelCode}
                            reviewsCount={
                              hotel?.metaData?.tripadvisorReview?.reviews
                            }
                            rating={hotel?.metaData?.tripadvisorReview?.rayting}
                          />
                        </div>
                      )
                    })}
                  </Slider>
                ) : (
                  !isLoading && (
                    <div className='grid grid-cols-3 gap-5'>
                      {mutatedHotels?.map((hotel) => (
                        <HotelPreviewCard
                          className='w-full bg-white px-[18px] py-[25px] rounded-[10px]'
                          title={hotel?.metaData?.kr_name}
                          titleEn={hotel?.metaData?.en_name}
                          wishlist={wishlist}
                          handleToggleWishlist={() =>
                            handleToggleWishlist(hotel?.hotelCode)
                          }
                          markupImageUrl={markupImageUrl}
                          zone={hotel?.metaData?.zone?.kr_name}
                          location={hotel?.metaData?.location}
                          description={hotel?.metaData?.description}
                          img={
                            hotel?.metaData?.images?.Image?.[0]?.FileName ||
                            getHotelImages(hotel?.attributes?.JPCode)
                          }
                          onClick={() =>
                            onChooseHotel(
                              hotel?.hotelCode,
                              hotel?.metaData?.kr_name
                            )
                          }
                          hotelCode={hotel?.hotelCode}
                          reviewsCount={
                            hotel?.metaData?.tripadvisorReview?.reviews
                          }
                          rating={hotel?.metaData?.tripadvisorReview?.rayting}
                        />
                      ))}
                    </div>
                  )
                )}
              </div>
              {isLoading && mockHotels.length > 0 && (
                <Slider {...settingsSlider}>
                  {mockHotels?.map((hotel) => (
                    <div className='w-full px-3'>
                      <HotelPreviewCard
                        className='w-full bg-white px-[18px] py-[25px] rounded-[10px]'
                        title={hotel?.metaData?.kr_name}
                        titleEn={hotel?.metaData?.en_name}
                        wishlist={wishlist}
                        handleToggleWishlist={() =>
                          handleToggleWishlist(hotel?.hotelCode)
                        }
                        markupImageUrl={markupImageUrl}
                        zone={hotel?.metaData?.zone?.kr_name}
                        img={
                          hotel?.metaData?.images?.Image?.[0]?.FileName ||
                          getHotelImages(hotel?.attributes?.JPCode)
                        }
                        location={hotel?.metaData?.location}
                        description={hotel?.metaData?.description}
                        onClick={() =>
                          onChooseHotel(
                            hotel?.hotelCode,
                            hotel?.metaData?.kr_name
                          )
                        }
                        hotelCode={hotel?.hotelCode}
                        reviewsCount={
                          hotel?.metaData?.tripadvisorReview?.reviews
                        }
                        rating={hotel?.metaData?.tripadvisorReview?.rayting}
                      />
                    </div>
                  ))}
                </Slider>
              )}
              {isLoading && mockHotels.length === 0 && (
                <div className='hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-3'>
                  <HotelVerticalSkletonCard />
                  <HotelVerticalSkletonCard />
                  <HotelVerticalSkletonCard />
                </div>
              )}
            </div>
            <div className='min-h-[271px] sm:hidden block'>
              {isLoading && mockHotels.length === 0 && (
                <div className='grid sm:hidden grid-cols-2 sm:grid-cols-4 gap-3 ml-[16px] mt-[20px]'>
                  <HotelVerticalSkletonCard />
                  <HotelVerticalSkletonCard />
                </div>
              )}
              {isLoading && mockHotels.length > 0 && (
                <div className='flex mt-[20px] w-full overflow-auto no-scrollbar gap-3 sm:hidden'>
                  {mockHotels?.map((hotel, index) => (
                    <HotelPreviewCard
                      key={index}
                      className='w-full bg-white px-[18px] py-[25px] rounded-[10px]'
                      title={hotel?.metaData?.kr_name}
                      titleEn={hotel?.metaData?.en_name}
                      wishlist={wishlist}
                      handleToggleWishlist={() =>
                        handleToggleWishlist(hotel?.hotelCode)
                      }
                      location={hotel?.metaData?.location}
                      description={hotel?.metaData?.description}
                      markupImageUrl={markupImageUrl}
                      zone={hotel?.metaData?.zone?.kr_name}
                      img={
                        hotel?.metaData?.images?.Image?.[0]?.FileName ||
                        getHotelImages(hotel?.attributes?.JPCode)
                      }
                      onClick={() =>
                        onChooseHotel(
                          hotel?.hotelCode,
                          hotel?.metaData?.kr_name
                        )
                      }
                      hotelCode={hotel?.hotelCode}
                      reviewsCount={hotel?.metaData?.tripadvisorReview?.reviews}
                      rating={hotel?.metaData?.tripadvisorReview?.rayting}
                    />
                  ))}
                </div>
              )}
              {!isLoading && (
                <div className='flex mt-[20px] w-full overflow-auto no-scrollbar gap-3 sm:hidden'>
                  {mutatedHotels?.map((hotel, index) => (
                    <HotelPreviewCard
                      className={classNames(
                        'min-w-[200px] max-w-[250px] bg-white rounded-[10px] px-4 py-3',
                        index === 0 && 'ml-[16px]',
                        index === mutatedHotels?.length && 'mr-[16px]'
                      )}
                      wishlist={wishlist}
                      handleToggleWishlist={() =>
                        handleToggleWishlist(hotel?.hotelCode)
                      }
                      key={index + 'hotel'}
                      title={hotel?.metaData?.kr_name}
                      titleEn={hotel?.metaData?.en_name}
                      location={hotel?.metaData?.location}
                      description={hotel?.metaData?.description}
                      markupImageUrl={markupImageUrl}
                      zone={hotel?.metaData?.zone?.kr_name}
                      img={
                        hotel?.metaData?.images?.Image?.[0]?.FileName ||
                        getHotelImages(hotel?.hotelCode)
                      }
                      onClick={() =>
                        onChooseHotel(
                          hotel?.hotelCode,
                          hotel?.metaData?.kr_name
                        )
                      }
                      hotelCode={hotel?.hotelCode}
                      reviewsCount={hotel?.metaData?.tripadvisorReview?.reviews}
                      rating={hotel?.metaData?.tripadvisorReview?.rayting}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
