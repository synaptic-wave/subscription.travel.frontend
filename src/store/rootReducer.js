import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import { authReducer } from './auth/auth.slice'
import storage from 'redux-persist/lib/storage'
import { cartReducer } from './cart/cart.slice'
import { commonReducer } from './common/common.slice'
import { wishlistReducer } from './wishlist/wishlist.slice'
import { createMigrate } from 'redux-persist'

const migrationsCart = {
  0: (state) => {
    return {
      ...state,
      items: []
    }
  }
}

const authPersistConfig = {
  key: 'auth',
  storage
}

const cartPersistConfig = {
  key: 'cart',
  storage,
  blacklist: ['rooms'],
  version: 0,
  migrate: createMigrate(migrationsCart, { debug: false })
}

const commonPersistConfig = {
  key: 'common',
  storage,
  blacklist: [
    'paxes',
    'isOpenCartModal',
    'isOpenUpdateServerModal',
    'isVisibleCoupon'
  ]
}

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
  whitelist: ['items']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  common: persistReducer(commonPersistConfig, commonReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer)
})

export default rootReducer
