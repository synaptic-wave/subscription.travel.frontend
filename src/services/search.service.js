import { useMutation, useQuery } from 'react-query'
import { httpRequest } from './httpRequest'
import axios from 'axios'
import { sortKeys } from '@/consts/sorts'
import generateSignature from '@/utils/generateSignature'

const STATIC_API_BASE_URL = 'https://static-api.wafflestay.net'
const CONTENT_API_BASE_URL = 'https://content-api.wafflestay.net'

export const searchService = {
  createSessiionId: (data) =>
    httpRequest.post('v1/search/hotel-availability', data),
  getHotelCodesByJPD: (jpd) => {
    const signature = generateSignature()
    const headers = {}

    headers['x-api-key'] = import.meta.env.VITE_API_KEY
    headers['x-api-secret'] = signature.key
    headers['x-timestamp'] = signature.timestamp
    return axios.get(
      `${STATIC_API_BASE_URL}/v1/hotel-portfolios-codes?jpd_codes=` + jpd,
      {
        headers: {
          ...headers
        }
      }
    )
  },
  searchHotels: (sessionId, params) =>
    httpRequest.get('v1/search/hotel-availability/' + sessionId, {
      params
    }),
  searchDirection: (params) =>
    axios.get('https://search-api.wafflestay.kr/v1/search/search-zone', {
      params
    }),
  getZonesByJPCodes: (jpCodes) => {
    const signature = generateSignature()
    const headers = {}

    headers['x-api-key'] = import.meta.env.VITE_API_KEY
    headers['x-api-secret'] = signature.key
    headers['x-timestamp'] = signature.timestamp
    return axios.get(`${STATIC_API_BASE_URL}/v1/zone-lists-by-params`, {
      params: { jpd_codes: jpCodes },
      headers: {
        ...headers
      }
    })
  },

  searchHotelAndZone: (params) => {
    const signature = generateSignature()
    const headers = {}

    headers['x-api-key'] = import.meta.env.VITE_API_KEY
    headers['x-api-secret'] = signature.key
    headers['x-timestamp'] = signature.timestamp
    return axios.get(`${STATIC_API_BASE_URL}/v1/search-hotel-and-zone`, {
      params,
      headers: {
        ...headers
      }
    })
  },
  searchHotel: (params) =>
    axios.get('https://search-api.wafflestay.kr/search/search-hotel', {
      params
    }),
  searchCountry: (params) =>
    axios.get('https://search-api.wafflestay.kr/search/search-country', {
      params
    }),
  getHotelPortfolio: (params) =>
    axios.get(`${CONTENT_API_BASE_URL}/v1/hotel-portfolios`, {
      params
    }),
  getLocationReviews: (params, code) => {
    const signature = generateSignature()
    const headers = {}

    headers['x-api-key'] = import.meta.env.VITE_API_KEY
    headers['x-api-secret'] = signature.key
    headers['x-timestamp'] = signature.timestamp
    return axios.get(
      `${STATIC_API_BASE_URL}/v1/content/tripadvisor/location-reviews/${code}`,
      {
        params,
        headers: {
          ...headers
        }
      }
    )
  },
  getTranslatedHotelPortfolio: (params) => {
    const signature = generateSignature()
    const headers = {}

    headers['x-api-key'] = import.meta.env.VITE_API_KEY
    headers['x-api-secret'] = signature.key
    headers['x-timestamp'] = signature.timestamp

    return axios.get(`${STATIC_API_BASE_URL}/v1/hotel-portfolios-by-params`, {
      params,
      headers: {
        ...headers
      }
    })
  },
  getTranslatedHotelName: (params, jpCode) => {
    const signature = generateSignature()
    const headers = {}

    headers['x-api-key'] = import.meta.env.VITE_API_KEY
    headers['x-api-secret'] = signature.key
    headers['x-timestamp'] = signature.timestamp

    return axios.get(
      `${import.meta.env.VITE_BASE_URL}v1/content/hotel/${jpCode}`,
      {
        params,
        headers: {
          ...headers
        }
      }
    )
  }
}

export const useCreateSession = ({ queryParams } = {}) => {
  return useMutation(searchService.createSessiionId, queryParams)
}

export const useSearchHotels = ({ queryParams, sessionId, params }) => {
  return useQuery(
    ['GET_HOTELS', sessionId, params],
    () =>
      searchService.searchHotels(sessionId, {
        ...params,
        sortBy: params?.sortBy || sortKeys.RECOMMENDATION
      }),
    queryParams
  )
}
export const useGetHotelPortfolio = ({ queryParams, params }) => {
  return useQuery(
    ['useGetHotelPortfolio', params],
    () => searchService.getHotelPortfolio(params),
    queryParams
  )
}

export const useSearchHotel = ({ queryParams, params }) => {
  return useQuery(
    ['GET_HOTEL', params],
    () => searchService.searchHotel(params),
    queryParams
  )
}

export const useSearchCountry = ({ queryParams, params }) => {
  return useQuery(
    ['GET_COUNTRY', params],
    () => searchService.searchCountry(params),
    queryParams
  )
}

export const useSearchDirection = ({ queryProps, params }) => {
  return useQuery(
    ['SEARCH_DIRECTION', params],
    () => searchService.searchDirection(params),
    {
      ...queryProps
    }
  )
}

export const useGetHotelCodes = ({ queryProps, params }) => {
  return useQuery(
    ['USE_GET_HOTEL_CODES', params],
    () => searchService.getHotelCodesByJPD(params),
    {
      ...queryProps
    }
  )
}

export const useSearchHotelAndZone = ({ queryProps, params }) => {
  return useQuery(
    ['SEARCH_HOTEL_AND_ZONE', params],
    () => searchService.searchHotelAndZone(params),
    {
      ...queryProps
    }
  )
}
