import { reviewService } from '@/services/review.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useGetReview = () => {
  const params = useParams<{ storeId: string }>()
  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['get reviews for store dashboard'],
    queryFn: () => reviewService.getByStoreId(params.storeId)
  })

  return useMemo(
    () => ({ reviews, isLoadingReviews }),
    [reviews, isLoadingReviews]
  )
}
