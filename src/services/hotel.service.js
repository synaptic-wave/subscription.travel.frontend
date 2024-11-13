import { useMutation, useQuery } from 'react-query'
import { httpRequest } from './httpRequest'

const service = {
  getHotelContent: (data) => httpRequest.post('v1/search/hotel-content', data),
  getRoomInfo: (roomId) => httpRequest.get(`v1/content/room-type/${roomId}`),
  getRecommendedHotels: (params, locationId) =>
    httpRequest.get(
      `v1/promotions/recommended-destinations/by-location/${locationId}`,
      {
        params
      }
    )
}

export const useGetHotelContent = () => {
  return useMutation((data) => service.getHotelContent(data))
}

export const useGetRecommendedHotels = ({
  params = {},
  queryProps = {},
  locationId
}) => {
  return useQuery(
    ['GET_RECOMMENDED_HOTELS', params, locationId],
    () => service.getRecommendedHotels(params, locationId),
    {
      ...queryProps
    }
  )
}

export const useGetRoomInfo = ({ JRCode, params = {}, queryParams = {} }) => {
  return useQuery(
    ['GET_ROOM_TYPE', JRCode, params],
    () => service.getRoomInfo(JRCode),
    queryParams
  )
}
