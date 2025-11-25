'use client'
import { STORE_URL } from '@/config/url.config'
import { productService } from '@/services/product.service'
import { IProductInput } from '@/shared/types/product.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateProducts = () => {
  const params = useParams<{ productId: string }>()

  const queryClient = useQueryClient()
  const { mutate: updateProduct, isError: isLoadingUpdateProduct } =
    useMutation({
      mutationKey: ['update product'],
      mutationFn: (data: IProductInput) =>
        productService.update(params.productId, data),
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['get products for store dashboard']
        }),
          toast.success('Товар успешно изменен')
      },
      onError() {
        toast.error('Не удалось изменить товар')
      }
    })

  return useMemo(
    () => ({ updateProduct, isLoadingUpdateProduct }),
    [updateProduct, isLoadingUpdateProduct]
  )
}
