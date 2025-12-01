import { Metadata } from 'next'
import { Reviews } from './Reviews'

export const metadata: Metadata = {
  title: 'Отзывы'
}

export default function ReviewsPage() {
  return <Reviews />
}
