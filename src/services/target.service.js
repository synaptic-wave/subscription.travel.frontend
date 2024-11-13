import { useQuery } from 'react-query'
import { httpRequest } from './httpRequest'

export const targetService = {
  getGroupDestinations: (params) =>
    httpRequest.get('v1/promotions/group-card-destinations', { params }),
  getBanners: (params) =>
    httpRequest.get('v1/promotions/landing-banners', { params }),
  getBanner: (id, params) =>
    httpRequest.get(`v1/promotions/landing-banners/${id}`, { params }),
  getUpTargetDestinations: (params, configs = {}) =>
    httpRequest.get('v1/promotions/group-hotel-destinations', {
      params,
      ...configs
    }),
  getHotelPreviews: (params, configs = {}) =>
    httpRequest.get('v1/promotions/preview-hotels', {
      params,
      ...configs
    }),
  getDownTargetDestinations: (params) =>
    httpRequest.get('v1/promotions/down-target-destinations', { params })
}

export const useGetGroupDestinations = ({
  params = {},
  queryParams = {}
} = {}) => {
  return useQuery(
    ['useGetGroupDestinations', params],
    () => targetService.getGroupDestinations(params),
    queryParams
  )
}

export const useGetBanners = ({ params = {}, queryParams = {} } = {}) => {
  return useQuery(
    ['useGetBanners', params],
    () => targetService.getBanners(params),
    queryParams
  )
}

export const useGetBanner = ({ params = {}, queryParams = {}, id } = {}) => {
  return useQuery(
    ['useGetBanners', params, id],
    () => targetService.getBanner(id, params),
    queryParams
  )
}

export const useGetUpTargetDestinations = ({
  params = {},
  queryParams = {},
  configs = {}
} = {}) => {
  return useQuery(
    ['useGetUpTargetDestinations', params],
    () => targetService.getUpTargetDestinations(params, configs),
    queryParams
  )
}

export const useGetHotelPreviews = ({
  params = {},
  queryParams = {},
  configs = {}
} = {}) => {
  return useQuery(
    ['useGetHotelPreviews', params],
    () => targetService.getHotelPreviews(params, configs),
    queryParams
  )
}

export const useGetDownTargetDestinations = ({
  params = {},
  queryParams = {}
} = {}) => {
  return useQuery(
    ['useGetDownTargetDestinations', params],
    () => targetService.getDownTargetDestinations(params),
    queryParams
  )
}
