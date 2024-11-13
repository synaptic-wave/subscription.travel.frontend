import { useQuery } from 'react-query'
import { httpRequest } from './httpRequest'

export const locationService = {
  getLocationsList: (params) =>
    httpRequest.get('v1/promotions/locations', { params }),
  getLocationById: (params, id) =>
    httpRequest.get(`v1/promotions/locations/${id}`, { params }),
  getRecommendedDestintationById: (params, id) =>
    httpRequest.get(`v1/promotions/destinations/${id}`, { params }),
  getDestinationByRecommendedDestinationId: (params, id) =>
    httpRequest.get(`v1/promotions/destinations/by-group-destination/${id}`, {
      params
    })
}

export const useGetDestinationsList = ({
  params = {},
  queryParams = {},
  id
}) => {
  return useQuery(
    ['GET_DESTINATIONS', params, id],
    () => locationService.getDestinationByRecommendedDestinationId(params, id),
    queryParams
  )
}

export const useGetLocationsList = ({ params = {}, queryParams = {} }) => {
  return useQuery(
    ['GET_LOCATIONS', params],
    () => locationService.getLocationsList(params),
    queryParams
  )
}

export const useGetRecommendedDestinationById = ({
  params = {},
  queryParams = {},
  id
}) => {
  return useQuery(
    ['GET_DESTINATION_BY_ID', params, id],
    () => locationService.getRecommendedDestintationById(params, id),
    queryParams
  )
}

export const useGetLocationById = ({ params = {}, queryParams = {}, id }) => {
  return useQuery(
    ['GET_LOCATION', id],
    () => locationService.getLocationById(params, id),
    queryParams
  )
}
