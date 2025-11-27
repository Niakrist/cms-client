'use client'
import { STORE_URL } from '@/config/url.config'
import { productService } from '@/services/product.service'
import { IProductInput } from '@/shared/types/product.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useCreateProducts = () => {
  const params = useParams<{ storeId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: createProducts, isPending: isLoadingProducts } = useMutation({
    mutationKey: ['create products'],
    mutationFn: (data: IProductInput) => {
      return productService.create(params.storeId, data)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get products for store dashboard']
      })
      toast.success('Товар успешно создан')
      router.push(STORE_URL.products(params.storeId))
    },
    onError() {
      toast.error('Ошибка при создании товара')
    }
  })

  return useMemo(
    () => ({ createProducts, isLoadingProducts }),
    [createProducts, isLoadingProducts]
  )
}
