// Interceptors (перехватчики) — это мощный паттерн, который позволяет перехватывать и обрабатывать HTTP-запросы и ответы на глобальном уровне,
// прежде чем они будут обработаны вашим приложением или отправлены на сервер.
// их можнго как "посредников" или "таможенников" для всех ваших HTTP-вызовов.

// credentials - полномочия
// withCredentials: true - настройка, которая позволяет включать передачу учетных данных при выполнении CORS запросов.
// Браузер начинает включать в запросы:
// Сессионные куки
// Аутентификационные токены
// Другие куки, связанные с доменом
// Заголовки Authorization
// Basic Auth данные

import { SERVER_URL } from '@/config/api.config'
import type { CreateAxiosDefaults } from 'axios'
import { errorCatch, getContentType } from './api.helpers'
import axios from 'axios'
import {
  getAccessToken,
  removeTokenFromStorage
} from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

// функция добавляет токен авторизации ко всем исходящим запросам

// Перехватывает каждый запрос перед отправкой на сервер
// Получает access token из куки
// Добавляет заголовок Authorization в формате Bearer {token}
// Возвращает измененный конфиг с заголовком

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

//  функция для автоматического обновления access token при истечении срока действия (ошибка 401).

// Перехватывает ошибки от сервера
// Если токен протух (401 или сообщения о JWT) - пытается обновить
// Флаг _isRetry предотвращает бесконечные циклы
// При успешном обновлении повторяет оригинальный запрос
// Если refresh токен тоже протух - удаляет токены (разлогинивает)

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (
          errorCatch(error) === 'jwt expired' ||
          errorCatch(error) === 'Refresh token not passed'
        ) {
          removeTokenFromStorage()
        }
      }
    }

    throw error
  }
)

export { axiosClassic, axiosWithAuth }
