'use client'
import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useGetColors } from '../../../../../hooks/queries/colors/useGetColors'
import { useGetCategories } from '../../../../../hooks/queries/categories/useGetCategories'
import { ProductForm } from '@/app/store/[storeId]/products/ProductForm'

export function ProductEdit() {
  const params = useParams<{ productId: string }>()
  const { data } = useQuery({
    queryKey: ['get product'],
    queryFn: () => productService.getById(params.productId)
  })

  const { colors } = useGetColors()
  const { categories } = useGetCategories()

  return (
    <ProductForm
      product={data}
      categories={categories || []}
      colors={colors || []}
    />
  )
}
