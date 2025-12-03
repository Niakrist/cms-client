'use client'
import { STORE_URL } from '@/config/url.config'
import { reviewService } from '@/services/review.service'
import { IReviewInput } from '@/shared/types/review.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useCreateReview = (storeId: string) => {
  const params = useParams<{ productId: string }>()
  const queryClient = useQueryClient()
  // const { push } = useRouter()

  const { mutate: createReviev, isPending: isLoadingCreateReviev } =
    useMutation({
      mutationKey: ['create review'],
      mutationFn: (data: IReviewInput) => {
        return reviewService.create(data, params.productId, storeId)
      },
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['product']
        })
        // push(STORE_URL.products(params.productId))
        toast.success('Отзыв успешно добавлен')
      },
      onError() {
        toast.error('Ошибка при добавлени отзыва')
      }
    })

  return useMemo(
    () => ({ createReviev, isLoadingCreateReviev }),
    [createReviev, isLoadingCreateReviev]
  )
}
