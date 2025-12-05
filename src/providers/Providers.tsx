'use client'
import { useState, type PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'

export function Providers({ children }: PropsWithChildren) {
  // const client = new QueryClient() ПЛОХО: создается новый клиент при каждом рендере

  const [client] = useState(
    // ХОРОШО: создается один раз и сохраняется между рендерами
    new QueryClient({
      defaultOptions: {
        queries: {
          // По умолчанию (true):
          // Когда пользователь переключается на другую вкладку и возвращается
          // React Query автоматически делает refetch всех активных запросов
          // При false:
          // Запросы НЕ обновляются при возвращении на вкладку

          // Почему отключают:
          // Производительность - меньше запросов к API
          // UX - не нужно показывать loading при каждом переключении вкладок
          // Стабильность данных - если данные редко меняются
          // Мобильные устройства - часто переключаются между приложениями
          // Когда НЕ стоит отключать:
          // Реальные данные, которые часто обновляются (чаты, уведомления)
          // Финансовые приложения (курсы валют, биржа)
          // Совместная работа (документы Google Docs)
          refetchOnWindowFocus: false,
          staleTime: 60 * 60 * 1000, // 60 минут до устаревания
          // cacheTime: 10 * 60 * 1000, // 10 минут в кэше
          retry: 2, // 2 попытки при ошибке
          retryDelay: 1000 // задержка 1 секунда
        }
      }
    })
  )

  // 1. Загрузка приложения
  // 2. <Provider> делает store доступным
  // 3. <PersistGate> блокирует рендеринг children
  // 4. redux-persist читает данные из localStorage
  // 5. Диспатч action REHYDRATE с восстановленными данными
  // 6. Store обновляется с восстановленным состоянием
  // 7. <PersistGate> получает подтверждение восстановления
  // 8. <PersistGate> рендерит children
  // 9. Приложение отображается с полным состоянием

  return (
    <QueryClientProvider client={client}>
      {/* Компонент из react-redux, который делает Redux Store доступным во всем React-приложении. */}
      <Provider store={store}>
        {/* Компонент из redux-persist, который задерживает рендеринг приложения до восстановления состояния из хранилища. */}
        {/* Предотвращает "мигание" - когда приложение сначала рендерится с пустым состоянием, а потом обновляется с восстановленными данными */}
        {/* Гарантирует целостность - все компоненты получают уже восстановленное состояние */}
        {/* Управляет процессом загрузки - показывает loading индикатор во время восстановления */}
        <PersistGate loading={null} persistor={persistor}>
          {/* loading={null} - Что показывать во время загрузки */}
          {/* persistor={persistor}  // Объект persistor из persistStore(store) */}
          {/* onBeforeLift={() =>  Действия перед показом приложения */}
          <Toaster />
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
