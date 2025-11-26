import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import { CreateProduct } from './CreateProduct'

export const metadata: Metadata = {
  title: 'Создание твоара',
  ...NO_INDEX_PAGE
}

export default function CreateProductPage() {
  return <CreateProduct />
}
