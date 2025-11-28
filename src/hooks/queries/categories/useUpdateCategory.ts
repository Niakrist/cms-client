'use client'
import { STORE_URL } from '@/config/url.config'
import { categoryService } from '@/services/category.service'
import { ICategoryInput } from '@/shared/types/category.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useUpdateCategory() {
  const params = useParams<{ categoryId: string }>()
  const queryClient = useQueryClient()
  const { push } = useRouter()

  const { mutate: updateCategory, isPending: isLoadingUpdateCategory } =
    useMutation({
      mutationKey: ['update category'],
      mutationFn: (data: ICategoryInput) => {
        return categoryService.update(data, params.categoryId)
      },
      onSuccess(data) {
        queryClient.invalidateQueries({
          queryKey: ['get catgories for store dashboard']
        })
        toast.success('Категория успешно обновлена')
        push(STORE_URL.categories(data.storeId))
      },
      onError() {
        toast.error('Ошибка при обнавлении категории')
      }
    })
  return useMemo(
    () => ({ updateCategory, isLoadingUpdateCategory }),
    [updateCategory, isLoadingUpdateCategory]
  )
}
