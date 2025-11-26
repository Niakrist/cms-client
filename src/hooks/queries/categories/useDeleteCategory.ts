'use client'
import { STORE_URL } from '@/config/url.config'
import { categoryService } from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useDeleteCategory() {
  const params = useParams<{ categoryId: string; storeId: string }>()
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutate: categoryDelete, isPending: isLoadingCategoryDelete } =
    useMutation({
      mutationKey: ['delete category'],
      mutationFn: () => categoryService.delete(params.categoryId),
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['get catgories for store dashboard']
        })
        toast.success('Категория удалена')
        push(STORE_URL.categories(params.storeId))
      },
      onError() {
        toast.error('Ошибка при удалении категории')
      }
    })

  return useMemo(
    () => ({ categoryDelete, isLoadingCategoryDelete }),
    [categoryDelete, isLoadingCategoryDelete]
  )
}
