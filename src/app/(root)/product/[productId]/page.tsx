import { productService } from '@/services/product.service'
import { Product } from './Product'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const products = await productService.getAll()
  const paths = products.map(product => {
    return {
      params: { productId: product.id }
    }
  })
  return paths
}

async function fetchProductData(params: Promise<{ productId: string }>) {
  try {
    const productId = (await params).productId
    const product = await productService.getById(productId)
    const similarProducts = await productService.getSimilar(productId)

    return { product, similarProducts }
  } catch (error) {
    return notFound()
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ productId: string }>
}): Promise<Metadata> {
  const { product } = await fetchProductData(params)

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: {
        url: product.images[0],
        width: 1000,
        height: 1000,
        alt: product.title
      }
    }
  }
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ productId: string }>
}) {
  const { product, similarProducts } = await fetchProductData(params)
  const productId = (await params).productId
  return (
    <Product
      product={product}
      similarProducts={similarProducts}
      productId={productId}
    />
  )
}
