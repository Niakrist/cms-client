import { Metadata } from 'next'
import { Home } from './Home'
import { productService } from '@/services/product.service'

export const metadata: Metadata = {
  title: 'Интернент магазин',
  description: 'Интернент магазин - описание'
}

export const revalidate = 60

async function getPopularProducts() {
  const data = (await productService.getMostPopular()).slice(0, 6)
  return data
}

export default async function HomePage() {
  const data = await getPopularProducts()
  return <Home products={data} />
}
