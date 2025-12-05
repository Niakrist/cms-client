// Импорты
// redux-toolkit - для создания store
// redux-persist - для сохранения состояния в localStorage/sessionStorage

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
import { cartSlice } from './cart/cart.slice'
const persistConfig = {
  key: 'cms-shop', // ключ в localStorage
  storage, // движок хранения (localStorage по умолчанию)
  whitelist: ['cart'] // сохранять только состояние корзины
}

//Определение клиентской среды, выполняется ли код на клиенте (в браузере)
// Это важно для SSR, чтобы не пытаться использовать localStorage на сервере.
const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
  cart: cartSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
  // Динамический импорт для SSR
  const { persistReducer } = require('redux-persist')
  const clientCombinedReducers = combineReducers({
    cart: cartSlice.reducer
  })
  // Только на клиенте оборачиваем редюсер в persistReducer, чтобы избежать ошибок на сервере.
  mainReducer = persistReducer(persistConfig, clientCombinedReducers)
}

// Настройка Store

// Middleware - это промежуточное ПО, которое обрабатывает действия до того,
// как они достигнут редюсера. Redux Toolkit включает несколько middleware по умолчанию:
// 1. thunk - для асинхронных операций
// 2. serializableCheck - проверка сериализуемости
// 3. immutableCheck - проверка иммутабельности

export const store = configureStore({
  reducer: mainReducer,
  //Функция, которая возвращает массив middleware с кастомными настройками.
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      // Redux требует, чтобы все состояния и действия были сериализуемыми
      // (преобразуемыми в строку JSON). Это важно для:
      // 1. DevTools (отладка)
      // 2. Сохранения/восстановления состояния
      // 3. Предсказуемости
      // 4. SSR (Server-Side Rendering)
      // Что проверяет serializableCheck:
      // Действия (actions) - должны быть plain objects
      // Состояние (state) - не должно содержать несериализуемых значений
      // Полезная нагрузка (payload) - тоже должна быть сериализуемой
      // НЕсериализуемые (вызовут предупреждения):
      // - Функции: () => {}
      // - Promise'ы: Promise.resolve()
      // - Map/Set: new Map(), new Set()
      // - Date: new Date()
      // - undefined
      // - Символы: Symbol()
      // - Классы: new Error()
      serializableCheck: {
        //С ignoredActions для redux-persist - предупреждений не будет, так как мы явно разрешили эти действия
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
})

// объект для управления персистентностью
export const persistor = persistStore(store)
// TypeScript тип состояния
export type TypeRootState = ReturnType<typeof mainReducer>
