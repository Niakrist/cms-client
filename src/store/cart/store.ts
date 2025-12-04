import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import { cartSlice } from './cart.slice'
const peristConfig = {
  key: 'cms-shop',
  storage,
  whiteList: ['cart']
}

const isClient = typeof window !== undefined

const combinedReducers = combineReducers({
  cart: cartSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { persistReducer } = require('redux-persist')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const storage = require('redux-persist/lib/storage-persist')
  mainReducer = persistReducer(peristConfig, combineReducers)
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
})

export const persistor = persistStore(store)
export type TypeRootState = ReturnType<typeof mainReducer>
