import { STORE_URL } from '@/config/url.config'
import { reviewService } from '@/services/review.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteReview = () => {
  // const params = useParams<{ storeId: string; reviewId: string }>()
  const queryClient = useQueryClient()
  // const { push } = useRouter()

  const { mutate: deleteReview, isPending: isLoadingDeleteReview } =
    useMutation({
      mutationKey: ['delete review'],
      mutationFn: (reviewId: string) => reviewService.delete(reviewId),
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['product']
        })
        toast.success('Отзыв удален')
        // push(STORE_URL.reviews(params.storeId))
      },
      onError() {
        toast.error('Не удалось удалить отзыв')
      }
    })

  return useMemo(
    () => ({ deleteReview, isLoadingDeleteReview }),
    [deleteReview, isLoadingDeleteReview]
  )
}
