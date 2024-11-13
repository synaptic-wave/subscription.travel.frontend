import roomImg from '@/assets/images/defaultRoom.jpg'

import { useEffect, useMemo, useState } from 'react'
import { viewTypes } from '@/consts'
import { HotelGridCard, HotelRowCard, Map, PegmanRow } from '@/components/index'
import useHotelRooms from '@/hooks/useHotelRooms'
import HotelRowCardSkeleton from '@/components/HotelCards/Row.skeleton'
import HotelGridCardSkeleton from '@/components/HotelCards/Grid.skeleton'

import { useSelector } from 'react-redux'
import { useCreateSession } from '@/services/search.service'
import { toast } from 'react-toastify'
import { useWishlistItem } from '@/hooks/useWishlist'
import { fetchHotelNames } from '../..'

export const normalizedHotelOption = (data) => {
  const paxes = Array.isArray(data?.HotelRooms?.HotelRoom)
    ? data?.HotelRooms.HotelRoom.map(
        (item) => item.RoomOccupancy.attributes.Adults
      ).reduce((a, b) => a + +b, 0)
    : data?.HotelRooms?.HotelRoom?.RoomOccupancy?.attributes?.Adults

  return {
    name: data?.Board?.value,
    price: data?.Prices?.Price?.TotalFixAmounts?.attributes.Nett,
    boardType: data?.Board?.attributes.Type,
    boardTypeLabel: data?.Board?.value,
    paxes,
    cancellationPolicy: {
      name: null
    },
    ratePlanCode: data?.attributes?.RatePlanCode,
    currency: data?.Prices?.Price.attributes.Currency
  }
}

export const HotelParentContainer = ({ hotel, Component, props }) => {
  const [wishlist, handleToggleWishlist] = useWishlistItem()

  const { roomWithMinPrice, hotelOptions } = useHotelRooms({
    data: {
      results: {
        HotelResult: hotel
      }
    }
  })

  const rating = Number(
    hotel?.HotelInfo?.HotelCategory?.value
      ?.replace(' Stars', '')
      .replace(' Star', '')
  )

  const _adults = props.paxes
    ?.map((item) => item.passangers)
    ?.flat()
    ?.filter((item) => item.age > 17).length

  return (
    <Component
      {...props}
      key={hotel.attributes?.Code}
      img={hotel.HotelInfo?.Images?.Image || roomImg}
      lng={hotel.HotelInfo?.Longitude}
      lat={hotel.HotelInfo?.Latitude}
      name={hotel.HotelInfo?.Name}
      nameEn={hotel.HotelInfo?.NameEn || hotel.HotelInfo?.HotelName}
      rooms={hotelOptions}
      price={roomWithMinPrice?.price}
      paxes={_adults}
      boardType={roomWithMinPrice?.boardType}
      boardTypeLabel={roomWithMinPrice?.boardTypeLabel}
      rating={rating}
      location={hotel.HotelInfo?.Address || hotel.HotelInfo?.HotelAddress}
      hotelCode={hotel.attributes?.Code}
      description={hotel.HotelInfo?.Description}
      specialMarkup={hotel.specialMarkup}
      wishlist={wishlist}
      handleToggleWishlist={() => handleToggleWishlist(hotel.attributes?.Code)}
    />
  )
}

const RowView = ({
  hotels,
  checkIn,
  checkOut,
  sessionId,
  isLoading,
  onCheckRatePlanCode,
  isLoadingCheckRate,
  checkingRate,
  nationality,
  onChooseHotel,
  onNextLoadHotels,
  hasMore,
  paxes
}) => {
  const createSession = useCreateSession()
  const { comparedHotels } = useSelector((store) => store.common)

  const onGetSessionId = (hotelCode) => {
    const payload = {
      paxes: paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: nationality || 'KR',
      checkInDate: checkIn,
      checkOutDate: checkOut,
      hotelCodes: [hotelCode]
    }

    return new Promise((resoslve, reject) => {
      createSession.mutate(payload, {
        onSuccess: (res) => {
          resoslve(res.search_session_id)
        },
        onError: (err) => {
          reject(err)
          toast.error('Error on checking hotel')
        }
      })
    })
  }

  if (isLoading)
    return (
      <div className='flex flex-col w-full mt-5 gap-5'>
        {Array(6)
          .fill(1)
          .map((_, key) => (
            <div className='mt-3' key={key}>
              <HotelRowCardSkeleton />
            </div>
          ))}
      </div>
    )

  return (
    <div className='flex flex-col w-full mt-5 gap-5'>
      {hotels?.map((hotel, idx) => {
        const isCompared = comparedHotels.hotels.find(
          (hot) => hot.JPCode === hotel?.attributes?.JPCode
        )

        return (
          <div className='mt-3' key={hotel?.attributes?.JPCode}>
            <HotelParentContainer
              hotel={hotel}
              Component={HotelRowCard}
              props={{
                paxes: [...(paxes || [])],
                hotelCode: hotel?.attributes?.JPCode,
                isCompared,
                checkOut: checkOut,
                checkIn: checkIn,
                sessionId: sessionId,
                hbRating: Number(hotel?.attributes?.rating),
                hbComments: Number(hotel?.attributes?.reviewsCount),
                defaultShowList: false,
                isLoadingCheckRate,
                onCheckRatePlanCode,
                checkingRate,
                onGetSessionId,
                isLoadingSessionId: createSession?.isLoading,
                onChooseHotel: () =>
                  onChooseHotel(hotel?.attributes?.JPCode, hotel.HotelInfo.Name)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

const GridView = ({
  hotels,
  sessionId,
  checkIn,
  checkOut,
  isLoading,
  onCheckRatePlanCode,
  isLoadingCheckRate,
  checkingRate,
  onNextLoadHotels,
  hasMore,
  isLastPage,
  onChooseHotel,
  paxes,
  nationality
}) => {
  const createSession = useCreateSession()
  const { comparedHotels } = useSelector((store) => store.common)

  const onGetSessionId = (hotelCode) => {
    const payload = {
      paxes: paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: nationality || 'KR',
      checkInDate: checkIn,
      checkOutDate: checkOut,
      hotelCodes: [hotelCode] // JPCode
    }

    return new Promise((resoslve, reject) => {
      createSession.mutate(payload, {
        onSuccess: (res) => {
          resoslve(res.search_session_id)
        },
        onError: (err) => {
          reject(err)
          toast.error('Error on checking hotel')
        }
      })
    })
  }

  if (isLoading)
    return (
      <div className='grid sm:grid-cols-3 grid-cols-1 mt-5 gap-[25px] w-full'>
        {Array(6)
          .fill(1)
          .map((_) => (
            <HotelGridCardSkeleton />
          ))}
      </div>
    )

  return (
    <div
      id='grid-hotels'
      className='grid sm:grid-cols-3 grid-cols-1 mt-5 gap-[25px]'
    >
      {hotels.map((hotel, index) => {
        const isCompared = comparedHotels.hotels.find(
          (hot) => hot.JPCode === hotel?.attributes?.JPCode
        )
        return (
          <div key={hotel?.attributes?.JPCode}>
            <HotelParentContainer
              hotel={hotel}
              Component={HotelGridCard}
              props={{
                paxes: [...(paxes || [])],
                lng: hotel.HotelInfo?.Longitude,
                lat: hotel.HotelInfo?.Latitude,
                hotelCode: hotel?.attributes?.JPCode,
                checkOut: checkOut,
                checkIn: checkIn,
                sessionId: sessionId,
                hbRating: Number(hotel?.attributes?.rating),
                hbComments: Number(hotel?.attributes?.reviewsCount),
                defaultShowList: true,
                isLastChild: index === hotels?.length - 1,
                isLoadingCheckRate,
                onCheckRatePlanCode,
                checkingRate,
                onChooseHotel,
                onGetSessionId,
                isLoadingSessionId: createSession?.isLoading,
                isCompared,
                bGroupHotel: index % 3 === 1,
                cGroupHotel: index % 3 === 2
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export const MapView = ({
  hotels,
  locations,
  sessionId,
  onChooseHotel,
  useMeridianToView
}) => {
  const [currentPlace, setCurrentPlace] = useState()
  const [isStreetView, setIsStreetView] = useState(false)
  const [coordinates, setCoordinates] = useState()

  useEffect(() => {
    async function getHotelNames() {
      const allHotelNames = await fetchHotelNames(
        locations
          .map((loc) => ({
            attributes: {
              ...loc
            }
          }))
          .slice(0, 400),
        1000
      )

      const allHotelNames2 = await fetchHotelNames(
        locations
          .map((loc) => ({
            attributes: {
              ...loc
            }
          }))
          .slice(400),
        1000
      )

      setCoordinates(
        locations?.map((loc) => {
          const foundLoc =
            allHotelNames?.find(
              (hotel) => hotel?.attributes?.JPCode === loc?.JPCode
            ) ||
            allHotelNames2?.find(
              (hotel) => hotel?.attributes?.JPCode === loc?.JPCode
            )

          return {
            lat: Number(loc?.Latitude),
            lng: Number(loc?.Longitude),
            info: {
              ...loc,
              HotelName: foundLoc?.HotelInfo?.Name || loc?.HotelName,
              NameEn: foundLoc?.HotelInfo?.NameEn
            }
          }
        })
      )
    }

    getHotelNames()
  }, [locations])

  const onNavigate = (lat, lng) => {
    const loc = locations?.find(
      (_loc) =>
        Number(_loc?.Latitude) === Number(lat) &&
        Number(_loc?.Longitude) === Number(lng)
    )

    if (loc?.JPCode) onChooseHotel(loc?.JPCode)
  }

  return (
    <div className='w-full mt-5'>
      {/* <PegmanRow
        className="mb-4"
        onClick={() => setIsStreetView((prev) => !prev)}
        isActive={isStreetView}
        hideViewLocationArround
      /> */}
      <div className='sm:h-[582px] h-[80vh]'>
        <Map
          coordinates={coordinates}
          showCurrentPlace={true}
          currentPlace={currentPlace}
          isStreetViewMode={isStreetView}
          isCluster={true}
          onNavigate={onNavigate}
          useMeridianToView={useMeridianToView}
        />
      </div>
    </div>
  )
}

const Renders = {
  [viewTypes.ROW]: RowView,
  [viewTypes.GRID]: GridView,
  [viewTypes.MAP]: MapView
}

export function ViewHotelsResult({
  view,
  isLoading,
  hotels,
  checkIn,
  checkOut,
  sessionId,
  onCheckRatePlanCode,
  isLoadingCheckRate,
  checkingRate,
  onChooseHotel,
  totalHotelsCount,
  onNextLoadHotels,
  hasMore,
  paxes,
  locations,
  isLastPage,
  useMeridianToView,
  nationality
}) {
  const Render = Renders[view]

  return (
    <Render
      hotels={hotels}
      checkIn={checkIn}
      checkOut={checkOut}
      sessionId={sessionId}
      isLoading={isLoading}
      onCheckRatePlanCode={onCheckRatePlanCode}
      isLoadingCheckRate={isLoadingCheckRate}
      checkingRate={checkingRate}
      onChooseHotel={onChooseHotel}
      totalHotelsCount={totalHotelsCount}
      onNextLoadHotels={onNextLoadHotels}
      hasMore={hasMore}
      paxes={paxes}
      isLastPage={isLastPage}
      nationality={nationality}
      locations={locations}
      useMeridianToView={useMeridianToView}
    />
  )
}
