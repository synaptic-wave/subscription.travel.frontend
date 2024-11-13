import { createSlice } from '@reduxjs/toolkit'

export const { actions: cartActions, reducer: cartReducer } = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    deletableRatePlanCodes: [],
    rooms: []
  },
  reducers: {
    addDeletableRatePlanCodes: (state, { payload }) => {
      state.deletableRatePlanCodes = payload.ratePlanCodes
    },
    clearDeletableRatePlanCodes: (state) => {
      state.deletableRatePlanCodes = []
    },
    addRoom: (state, { payload }) => {
      const rooms = JSON.parse(JSON.stringify(state.rooms))
      rooms.push({
        ...payload
      })
      state.rooms = rooms
    },
    removeRoom: (state, { payload }) => {
      const rooms = JSON.parse(JSON.stringify(state.rooms))

      state.rooms = rooms.filter(
        (item) => item.ratePlanCode !== payload.ratePlanCode
      )
    },

    clearRoom: (state) => {
      state.rooms = []
    },
    addToCart: (state, { payload }) => {
      const items = JSON.parse(JSON.stringify(state.items))
      // const index = items.findIndex(
      //   (item) => item.ratePlanCode === payload.ratePlanCode
      // )
      items.push({
        ...payload
      })
      // if (index === -1) {
      //   items.push({
      //     ...payload
      //   })
      // } else {
      //   items[index] = {
      //     ...payload,
      //     quantity: items[index].quantity + payload.quantity
      //   }
      // }
      state.items = items
    },
    updateRoomFromCart: (state, { payload }) => {
      const items = JSON.parse(JSON.stringify(state.items))
      const _items = items.map((item) => {
        const value = payload.rooms.find(
          (_room) => _room.ratePlanCode === item.ratePlanCode
        )
        if (value) {
          return {
            ...item,
            room: { ...item.room, ...value.room }
          }
        } else {
          return item
        }
      })
      state.items = _items
    },
    clearCart: (state) => {
      state.items = []
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload.id)
    },
    removeRoomsFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => !payload.ids.includes(item.id))
    }
  }
})
