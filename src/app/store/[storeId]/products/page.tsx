import { Metadata } from 'next'
import { Products } from './Products'

export const metadata: Metadata = {
  title: 'Товары'
}

export default function ProductsPage() {
  return <Products />
}
