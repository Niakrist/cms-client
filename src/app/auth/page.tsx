import { Metadata } from 'next'
import { Auth } from './Auth'

export const metadata: Metadata = {
  title: 'Авторизация',
  description: 'Авторизация - описание'
}

export default function AuthPage() {
  return <Auth />
}
