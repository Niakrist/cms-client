import { NextRequest, NextResponse } from 'next/server' // типы для работы с запросами и ответами в Next.js
import { EnumTokens } from './services/auth/auth-token.service'
import { PUBLIC_URL } from './config/url.config'

// middleware обеспечивает базовую защиту маршрутов и предотвращает доступ неавторизованных пользователей к защищенным разделам приложения.
export async function middleware(request: NextRequest) {
  // Получаем refresh token из cookies
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  // Проверяем, является ли текущая страница страницей авторизации
  const isAuthPage = request.url.includes(PUBLIC_URL.auth())

  if (isAuthPage) {
    if (refreshToken) {
      // Если пользователь УЖЕ авторизован - редирект на главную
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url))
    }
    // NextResponse.next() - это метод, который:
    // Пропускает запрос дальше по цепочке обработки
    // Не изменяет исходный запрос
    // Позволяет продолжить стандартную обработку страницы
    // Если НЕ авторизован - разрешаем доступ к странице авторизации /auth if (isAuthPage)
    // Не авторизован на /auth → разрешаем доступ (ВЫХОД ИЗ ФУНКЦИИ!)
    return NextResponse.next()
  }
  if (refreshToken === undefined) {
    // Если токена нет - редирект на страницу авторизации
    // Этот код выполняется ТОЛЬКО для НЕ-auth страниц!
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
  }
  // есть токен и находимся на защищенной странице
  return NextResponse.next()
}
// Middleware применяется к:
export const config = {
  matcher: ['/dashboard/:path*', '/store/:path*', '/auth']
}
