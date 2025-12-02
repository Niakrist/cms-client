import { Catalog } from '@/components/ui/Catalog/Catalog'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'
import type { Metadata } from 'next'

export const revalidate = 60

async function getProducts(categoryId: string) {
  const products = await productService.getByCategory(categoryId)
  const category = await categoryService.getById(categoryId)

  return { products, category }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ categoryId: string }>
}): Promise<Metadata> {
  const categoryId = (await params).categoryId
  const { products, category } = await getProducts(categoryId)

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images: [
        {
          url: products[0].images[0],
          width: 1000,
          height: 1000,
          alt: category.title
        }
      ]
    }
  }
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ categoryId: string }>
}) {
  const categoryId = (await params).categoryId
  const { products, category } = await getProducts(categoryId)
  return (
    <div className='my-6'>
      <Catalog
        title={category.title}
        description={category.description}
        products={products}
      />
    </div>
  )
}
