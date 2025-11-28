import { Metadata } from 'next'
import { Categories } from './Categories'

export const metadata: Metadata = {
  title: 'Категории '
}

export default function CategoriesPage() {
  return <Categories />
}
