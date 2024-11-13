import { Gallery } from './components/Gallery'
import { Hotels, settingsSlider } from '../Home/components/Hotels'
import { Header } from '@/components/Header'
import { FoodCard } from './components/FoodCard'
import { useGetDestinationsList } from '@/services/location.service'
import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import recommendImg from '@/assets/images/recommend4.png'
import useHotelAvail from '@/hooks/useHotelAvail'
import Slider from 'react-slick'
import { IconButton, Map, ShareModal } from '@/components/index'
import RestaurantModal from './components/RestaurantModal'
import classNames from 'classnames'
import ShareIcon from '@/assets/icons/share.svg?react'

export function RecommendedTravelDetails() {
  const [searchParams] = useSearchParams()
  const [showShareModal, setShowShareModal] = useState(false)
  const id = searchParams.get('id')

  const [restaurants, setRestaurants] = useState()
  const [selectedRestaurant, setSelectedRestaurant] = useState()

  const { data } = useGetDestinationsList({
    id,
    queryParams: {
      enabled: !!id
    }
  })

  const hotelCodes = useMemo(() => {
    if (!data?.nearbyHotes) return []

    const _restaurants = []

    const _jpCodes = data?.nearbyHotes?.map((item) => {
      item.restaurant?.forEach((rest) => {
        _restaurants.push({
          ...rest?.locationDetails,
          ...rest?.nearbyPlace,
          images: rest?.photos
        })
      })
      return item.JPCode
    })

    setRestaurants(_restaurants || [])

    return _jpCodes
  }, [data?.nearbyHotes])

  const {
    hotels,
    isSearching,
    isNotFound,
    closeSearchingModal,
    closeNotFoundModal,
    onChooseHotel
  } = useHotelAvail({ hotelCodes })

  const coordinates = useMemo(() => {
    return [
      ...(hotels || [])?.map((hotel) => ({
        lat: Number(hotel?.HotelInfo?.Latitude),
        lng: Number(hotel?.HotelInfo?.Longitude),
        info: {
          JPCode: hotel?.attributes?.JPCode,
          Name: hotel?.HotelInfo?.Name,
          HotelAddress: hotel?.HotelInfo?.Address,
          HotelImages: hotel?.HotelInfo?.Images?.Image,
          Type: 'hotel',
          rating: 1,
          reviewsCount: 10
        },
        Type: 'hotel'
      })),
      ...(restaurants || [])?.map((restaurant) => ({
        lat: Number(restaurant?.latitude),
        lng: Number(restaurant?.longitude),
        info: {
          locationId: restaurant?.location_id,
          Name: restaurant?.name,
          HotelAddress: restaurant?.address_obj?.address_string,
          Latitude: restaurant?.latitude,
          Longitude: restaurant?.longitude,
          HotelImages:
            restaurant?.images?.[0]?.images?.original?.url || recommendImg,
          Type: 'restaurant',
          rating: Number(restaurant?.rating),
          reviewsCount: Number(restaurant?.num_reviews),
          detail: restaurant
        },
        Type: 'restaurant'
      }))
    ]
  }, [restaurants, hotels])

  const onClickMarker = (lat, lng, info) => {
    if (info?.Type === 'hotel') onChooseHotel(info?.JPCode)
    else {
      setSelectedRestaurant(info?.detail)
    }
  }

  const toggleShareModal = () => {
    setShowShareModal((prev) => !prev)
  }

  return (
    <>
      <Header />
      <div className='container mx-auto px-4 mt-2 sm:mt-7'>
        <div className='flex mb-0 sm:mb-[30px] justify-between'>
          <div>
            <h4 className='text-[22px] leading-[32px] sm:text-[26px] sm:leading-[32px] font-medium mb-[20px] sm:mb-0'>
              와플스테이 <span className='text-primary-600'>추천 여행지</span>
            </h4>
            <h3 className='hidden sm:block text-[28px] leading-[36px] font-medium '>
              {data?.header?.kr_title}
            </h3>
          </div>
          <IconButton
            icon={<ShareIcon />}
            onClick={toggleShareModal}
            active={showShareModal}
          />
        </div>
        <Gallery images={data?.header?.imagesURL} />
        <p className='text-lg sm:text-[22px] sm:leading-[30px] font-medium mt-[27px] sm:mt-[36px]'>
          {data?.header?.kr_content}
        </p>
        <p className='text-xs sm:text-[14px] sm:leading-[20px] mt-[10px] sm:mt-[14px]'>
          {data?.header?.kr_subContent}
        </p>

        <div className='pt-[42px] sm:pt-[88px]'>
          <div className='sm:h-[709px] h-[80vh]'>
            {coordinates?.length > 0 && (
              <Map
                zoom={16}
                key={coordinates?.length}
                coordinates={coordinates}
                isCluster={true}
                showCurrentPlace={true}
                onNavigate={onClickMarker}
              />
            )}
          </div>
        </div>

        <div className='pt-[42px] sm:pt-[88px]'>
          <p className='sm:hidden text-lg mb-4 font-medium'>
            인근 <span className='text-primary-600'>카페ㅣ맛집</span>
          </p>
          <div className='grid grid-cols-12 gap-[30px]'>
            <div className='hidden sm:block col-span-2'>
              <span className='text-[26px] leading-[37px] border-[#E20000] font-medium border-t-2 pt-[10px]'>
                인근
              </span>
              <p className='text-[26px] leading-[37px] text-primary-600'>
                카페 | 맛집
              </p>
              <p
                className='text-lg mt-[17px]'
                dangerouslySetInnerHTML={{ __html: restaurants?.kr_title }}
              ></p>
            </div>
            <div className='col-span-12 sm:col-span-10 sm:mx-[0] mx-[-16px]'>
              <div className='flex w-full overflow-auto no-scrollbar gap-3 sm:hidden'>
                {restaurants?.map((val, index) => (
                  <div
                    className={classNames(
                      'min-w-[200px]',
                      index === 0 && 'ml-[16px]',
                      index === hotels?.length && 'mr-[16px]'
                    )}
                  >
                    <FoodCard
                      key={val}
                      name={val?.name}
                      address={val?.address_obj?.address_string}
                      onClick={() => setSelectedRestaurant(val)}
                      img={
                        val?.images?.[0]?.images?.original?.url || recommendImg
                      }
                    />
                  </div>
                ))}
              </div>
              <Slider
                className='hidden sm:block'
                {...settingsSlider}
                slidesToShow={4}
              >
                {restaurants?.map((val) => (
                  <div className='px-[10px]'>
                    <FoodCard
                      key={val}
                      name={val?.name}
                      address={val?.address_obj?.address_string}
                      onClick={() => setSelectedRestaurant(val)}
                      img={
                        val?.images?.[0]?.images?.original?.url || recommendImg
                      }
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <Hotels
          items={data?.nearbyHotes}
          isSearching={isSearching}
          isOpenNotFound={isNotFound}
          setIsOpenNotFound={closeNotFoundModal}
          setIsSearching={closeSearchingModal}
          onChooseHotel={onChooseHotel}
          hotels={hotels}
          title={
            <h5 className='text-lg sm:text-[26px] font-medium'>
              A I 추천 주변 <span className='text-primary-600'>인기호텔</span>
            </h5>
          }
        />
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={toggleShareModal}
        customLink={`${window.location.origin}/recommended-travel-details?id=${id}`}
      />

      {selectedRestaurant && (
        <RestaurantModal
          open={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          locationId={selectedRestaurant?.location_id}
          title={selectedRestaurant?.name}
          rating={selectedRestaurant?.rating}
          reviewsCount={selectedRestaurant?.num_reviews}
          address={selectedRestaurant?.address_obj?.address_string}
          overallRate={selectedRestaurant?.ranking_data?.ranking_string}
          phone={selectedRestaurant?.phone}
          cuisines={selectedRestaurant?.cuisine
            ?.map((cus) => cus?.localized_name)
            .join(',')}
          openTime={selectedRestaurant?.hours?.periods?.[0]?.open?.time?.replace(
            '00',
            ':00'
          )}
          rateFood={Object.values(selectedRestaurant?.subratings || {})?.find(
            (el) => el?.name === 'rate_food'
          )}
          rateService={Object.values(
            selectedRestaurant?.subratings || {}
          )?.find((el) => el?.name === 'rate_service')}
          rateValue={Object.values(selectedRestaurant?.subratings || {})?.find(
            (el) => el?.name === 'rate_value'
          )}
          images={[
            ...(selectedRestaurant?.images || [])?.map(
              (image) => image?.images?.original?.url
            )
          ]}
        />
      )}
    </>
  )
}
