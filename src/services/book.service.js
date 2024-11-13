import { useMutation, useQuery } from 'react-query'
import { httpRequest } from './httpRequest'
import axios from 'axios'
import generateSignature from '@/utils/generateSignature'

export const service = {
  checkHotel: (data) =>
    httpRequest.post('v1/booking/check-hotel-availability', data),
  bookingRules: (data) => httpRequest.post('v1/booking/booking-rules', data),
  preBook: (data) => httpRequest.post('v1/booking/pre-booking-request', data),
  cancelBooking: (data) => httpRequest.post('v1/payment/cancelReq', data),
  sendVerificationCode: (data) =>
    httpRequest.post('v1/booking/send-verification-code-hotel-details', data),
  postBook: (data) =>
    httpRequest.post('v1/booking/make-booking/' + data?.id, data),
  getBookingStatus: (params) =>
    httpRequest.get(`v1/booking/check-booking-status/${params.moid}`),
  getBookedHotel: (params) =>
    httpRequest.get('v1/booking/retrive-booking-details', {
      params
    }),
  getBookingHistory: (params) =>
    httpRequest.get('v1/booking/booking-history', {
      params
    }),
  getBookingHistoryById: (id) =>
    httpRequest.get(`v1/booking/booking-history-detail/${id}`),
  makePayment: (data) => {
    const signature = generateSignature()
    const headers = {}
    headers['x-api-key'] = import.meta.env.VITE_API_KEY
    headers['x-api-secret'] = signature.key
    headers['x-timestamp'] = signature.timestamp
    return axios.post(
      import.meta.env.VITE_BASE_URL + `v1/payment/transaction/${data.id}`,
      data,
      {
        headers: {
          ...headers
        }
      }
    )
  },
  getPreBookById: (data) =>
    httpRequest.post(`v1/booking/pre-booking-request-by-id/${data.id}`, data)
}

export const useCheckHotel = () => {
  return useMutation((data) => service.checkHotel(data))
}

export const useBookingStatus = ({ params = {}, queryParams = {} } = {}) => {
  return useQuery(
    ['GET_BOOKING_STATUS', params],
    () => service.getBookingStatus(params),
    queryParams
  )
}

export const useMakePayment = ({ queryParams = {} } = {}) => {
  return useMutation((data) => service.makePayment(data), queryParams)
}

export const useCancelBooking = ({ queryParams = {} } = {}) => {
  return useMutation((data) => service.cancelBooking(data), queryParams)
}

export const usePreBookById = ({ queryParams = {} } = {}) => {
  return useMutation(service.getPreBookById, {
    ...queryParams
  })
}

export const useGetBookingHistoryById = ({ queryParams = {}, id } = {}) => {
  return useQuery(
    ['GET_BOOKING_HISTORY_BY_ID', id],
    () => service.getBookingHistoryById(id),
    queryParams
  )
}

export const useGetBookingHistory = ({ queryParams = {}, params } = {}) => {
  return useQuery(
    ['GET_BOOKING_HISTORY', params],
    () => service.getBookingHistory(params),
    queryParams
  )
}

export const useGetBookedHotel = ({ queryParams = {}, params } = {}) => {
  return useQuery(
    ['GET_BOOKED_HOTEL', params],
    () => service.getBookedHotel(params),
    queryParams
  )
}

export const usePostBookById = ({ queryParams = {} } = {}) => {
  return useMutation(service.postBook, {
    ...queryParams
  })
}

export const usePreBook = () => {
  return useMutation(service.preBook)
}

export const useSendVerificationCode = ({ mutationSettings = {} } = {}) => {
  return useMutation(service.sendVerificationCode, mutationSettings)
}

export const useBookingRules = ({ queryParams = {} }) => {
  return useMutation((data) => service.bookingRules(data), queryParams)
}
