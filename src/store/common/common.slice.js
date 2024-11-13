import { createSlice } from '@reduxjs/toolkit'

export const { actions: commonActions, reducer: commonReducer } = createSlice({
  name: 'common',
  initialState: {
    comparedHotels: {
      isOpen: false,
      hotels: []
    },
    hotelView: 'row', // grid , row , map
    paxes: [],
    isOpenCartModal: false,
    isOpenUpdateServerModal: false,
    isVisibleCoupon: true
  },
  reducers: {
    clearCompareList: (state) => {
      state.comparedHotels.hotels = []
      state.comparedHotels.isOpen = false
    },
    toggleCompareBar: (state) => {
      state.comparedHotels.isOpen = !state.comparedHotels.isOpen
    },
    closeCompareBar: (state) => {
      state.comparedHotels.isOpen = false
    },
    toggleCartModal: (state, { payload }) => {
      state.isOpenCartModal = payload.isOpen
    },
    savePaxes: (state, { payload }) => {
      state.paxes = payload.paxes
    },
    setHotelView: (state, { payload }) => {
      state.hotelView = payload
    },
    toggleUpdateServerModal: (state, { payload }) => {
      state.isOpenUpdateServerModal = payload
    },
    toggleHotelFromCompareList: (state, { payload }) => {
      const foundHotel = state.comparedHotels.hotels.find(
        (hotel) => hotel.JPCode === payload.JPCode
      )

      if (foundHotel) {
        if (state.comparedHotels.hotels.length === 1) {
          state.comparedHotels.isOpen = false
        }
        state.comparedHotels.hotels = state.comparedHotels.hotels.filter(
          (hotel) => hotel.JPCode !== payload.JPCode
        )
      } else {
        state.comparedHotels.hotels = [...state.comparedHotels.hotels, payload]
        state.comparedHotels.isOpen = true
      }
    },
    hideCouponModal(state) {
      state.isVisibleCoupon = false
    },
    showCouponModal(state) {
      state.isVisibleCoupon = true
    },
    checkHideForToday(state) {
      const hideUntil = localStorage.getItem('hideCouponModalUntil')
      if (hideUntil && new Date(hideUntil) > new Date()) {
        state.isVisibleCoupon = false
      } else {
        state.isVisibleCoupon = true
      }
    }
  }
})
