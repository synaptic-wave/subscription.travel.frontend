import { Card } from './components/Card'
import { FoodCard } from '../RecommendedTravelDetails/components/FoodCard'
import { Hotels } from '../Home/components/Hotels'
import { Banner } from './components/Banner'
import { Header } from '@/components/Header'
import { useGetRecommendedHotels } from '@/services/hotel.service'
import { useParams } from 'react-router-dom'
import { useGetLocationById } from '@/services/location.service'
import { useMemo } from 'react'
import useHotelAvail from '@/hooks/useHotelAvail'
import { RecommendedTravel as Travels } from '../Home/components/RecommendedTravel'
export function RecommendedTravel() {
  const { name } = useParams()

  const { data, isFetching: isLoading2 } = useGetRecommendedHotels({
    locationId: name,
    queryProps: {
      enabled: true
    }
  })

  const { data: location } = useGetLocationById({
    id: name,
    queryParams: {
      enabled: !!name
    }
  })

  const hotelCodes = useMemo(() => {
    if (!data?.popular) return []

    return data?.popular?.map((item) => item.JPCode)
  }, [data?.popular])

  const {
    hotels,
    isSearching,
    isNotFound,
    closeSearchingModal,
    closeNotFoundModal,
    onChooseHotel,
    isLoading
  } = useHotelAvail({ hotelCodes })

  return (
    <div key={name}>
      <Header />

      <div className='container mx-auto px-4 mt-2 sm:mt-7'>
        <h4 className='text-center text-[22px] leading-[34px] sm:text-[36px] sm:leading-[52px] font-medium'>
          와플스테이 <span className='text-primary-600'>추천 여행지</span>
        </h4>
        <Travels className='mt-4 sm:mt-[47px]' withoutTitle />

        <Banner
          isLoading={isLoading2}
          title={data?.header?.[0]?.kr_headerTitle}
          content={data?.header?.[0]?.kr_hederContent}
          img={
            window.innerWidth > 600
              ? data?.header?.[0]?.headerImageURL?.browser
              : data?.header?.[0]?.headerImageURL?.mobile
          }
        />
        <p className='text-lg sm:text-[26px] font-medium sm:leading-[37px] mt-[29px] sm:mt-[80px] mb-[34px] sm:mb-[44px]'>
          {location?.kr_title}{' '}
          <span className='text-primary-600'>추천 여행지</span>
        </p>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-[26px]'>
          {data?.groupDestination
            .sort((a, b) => a.order - b.order)
            ?.map((item) => (
              <Card item={item} key={item._id} itemId={item._id} />
            ))}
        </div>
      </div>

      <div className='container mx-auto px-4'>
        <Hotels
          items={data?.popular}
          isSearching={isSearching}
          isOpenNotFound={isNotFound}
          setIsOpenNotFound={closeNotFoundModal}
          setIsSearching={closeSearchingModal}
          onChooseHotel={onChooseHotel}
          hotels={hotels}
          isLoading={isLoading}
          title={
            <h5 className='text-lg sm:text-[26px] font-medium'>
              A I 추천 주변 <span className='text-primary-600'>인기호텔</span>
            </h5>
          }
        />
      </div>
    </div>
  )
}
