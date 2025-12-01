import { Metadata } from 'next'
import { Categories } from './Categories'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Категории ',
  ...NO_INDEX_PAGE
}

export default function CategoriesPage() {
  return <Categories />
}
