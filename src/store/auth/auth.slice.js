import { createSlice } from '@reduxjs/toolkit'

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: null
  },
  reducers: {
    login: (state, { payload }) => {
      const _user = JSON.parse(JSON.stringify(payload))
      delete _user.user
      state.user = _user
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
      state.user = null
    }
  }
})
