'use client'
import { Catalog } from '@/components/ui/Catalog/Catalog'
import { productService } from '@/services/product.service'
import { IProduct } from '@/shared/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'
import { ProductsReview } from './ProductsReview'

interface IProductProps {
  product: IProduct
  similarProducts?: IProduct[]
  productId?: string
}
export function Product({
  product,
  similarProducts,
  productId = ''
}: IProductProps) {
  // Для ревалидации, чтобы при добавлении отзыва он появлялся без обновления страницы

  const { data } = useQuery({
    queryKey: ['product', product.id],
    queryFn: () => productService.getById(productId),
    initialData: product,
    enabled: !!productId
  })

  return (
    <div className='mx-auto max-w-7xl'>
      <div className='space-y-7 px-4 py-10 sm:px-6 lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          <ProductGallery product={data} />
          <ProductInfo product={data} />
        </div>
      </div>
      <Catalog title='Похожие товары' products={similarProducts || []} />
      <ProductsReview product={data} />
    </div>
  )
}
