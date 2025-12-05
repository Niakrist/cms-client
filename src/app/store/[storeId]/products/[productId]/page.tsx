import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import { ProductEdit } from './ProductEdit'

export const metadata: Metadata = {
  title: 'Настройки товара',
  ...NO_INDEX_PAGE
}

export default function ProductEditPage() {
  return <ProductEdit />
}
