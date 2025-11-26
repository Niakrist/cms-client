'use client'
import { STORE_URL } from '@/config/url.config'
import { categoryService } from '@/services/category.service'
import { ICategoryInput } from '@/shared/types/category.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useCreateCategory() {
  const params = useParams<{ storeId: string }>()
  const queryClient = useQueryClient()
  const { push } = useRouter()

  const { mutate: createCategory, isPending: isLoadingCreateCategory } =
    useMutation({
      mutationKey: ['create category'],
      mutationFn: (data: ICategoryInput) => {
        return categoryService.create(data, params.storeId)
      },
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['get catgories for store dashboard']
        })
        toast.success('Категория создана')
        push(STORE_URL.categories(params.storeId))
      },
      onError() {
        toast.error('Не удалось создать категорию')
      }
    })
  return useMemo(
    () => ({ createCategory, isLoadingCreateCategory }),
    [createCategory, isLoadingCreateCategory]
  )
}
