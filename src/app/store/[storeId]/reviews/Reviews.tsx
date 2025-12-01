'use client'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { DataTableLoading } from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import { useGetReview } from '@/hooks/queries/reviews/useGetReviews'
import { formatDate } from '@/lib/date/format-date'
import { IReviewColumn, reviewsColumn } from './ReviewsColumn'

export function Reviews() {
  const { reviews, isLoadingReviews } = useGetReview()

  const formattedData: IReviewColumn[] = reviews
    ? reviews?.map(review => ({
        id: review.id,
        createdAt: formatDate(review.createdAt),
        username: review.user.name,
        rating: Array.from({ length: review.rating })
          .map(() => '⭐')
          .join('')
      }))
    : []

  return (
    <div className='p-6'>
      {isLoadingReviews || !reviews?.length ? (
        <DataTableLoading />
      ) : (
        <>
          <div className='flex items-center justify-between'>
            <Heading
              title={`Отзывы (${reviews?.length})`}
              description='Все отзывы вашего магазина'
            />
          </div>
          <div className='table w-full'>
            <DataTable
              columns={reviewsColumn}
              data={formattedData}
              filterKey='username'
            />
          </div>
        </>
      )}
    </div>
  )
}
