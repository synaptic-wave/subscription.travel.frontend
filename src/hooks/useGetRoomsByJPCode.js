import { searchService } from '@/services/search.service'
import { useEffect, useState } from 'react'
import useHotelRooms from './useHotelRooms'

export default function useGetRoomsByJPCode({ JPCode, payload, onError }) {
  const [hotel, setHotel] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getRooms = async () => {
    try {
      setIsLoading(true)
      const result = await searchService.createSessiionId({
        ...payload,
        hotelCodes: [JPCode]
      })

      const _hotel = await searchService.searchHotels(result.search_session_id)
      setHotel(_hotel.hotels?.[0])
    } catch (e) {
      onError()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (JPCode) getRooms()
  }, [JPCode])

  const { hotelOptions } = useHotelRooms({
    data: {
      results: {
        HotelResult: hotel
      }
    }
  })

  return { isLoading, hotelOptions }
}
