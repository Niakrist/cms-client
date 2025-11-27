'use client'
import { STORE_URL } from '@/config/url.config'
import { productService } from '@/services/product.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteProducts = () => {
  const params = useParams<{ productId: string; storeId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: deleteProduct, isPending: IsLoadingDeleteProduct } =
    useMutation({
      mutationKey: ['delete product'],
      mutationFn: () => productService.delete(params.productId),
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['get products for store dashboard']
        })
        toast.success('Товар успешно удален')
        router.push(STORE_URL.products(params.storeId))
      },
      onError() {
        toast.error('Не удалось удалить товар')
      }
    })

  return useMemo(
    () => ({ deleteProduct, IsLoadingDeleteProduct }),
    [deleteProduct, IsLoadingDeleteProduct]
  )
}
