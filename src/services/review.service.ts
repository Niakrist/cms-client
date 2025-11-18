import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.config'
import { IReview, IReviewInput } from '@/shared/types/review.interface'

export class ReviewService {
  async getByStoreId(storeId: string) {
    const { data } = await axiosWithAuth<IReview[]>({
      url: API_URL.reviews(`/by-storeId/${storeId}`),
      method: 'GET'
    })
    return data
  }
  async getById(reviewId: string) {
    const { data } = await axiosWithAuth<IReview>({
      url: API_URL.reviews(`/by-id/${reviewId}`),
      method: 'GET'
    })
    return data
  }
  async create(data: IReviewInput, productId: string, storeId: string) {
    const { data: createdReview } = await axiosWithAuth<IReview>({
      url: API_URL.reviews(`/${productId}/${storeId}`),
      method: 'POST',
      data
    })
    return createdReview
  }
  async delete(reviewId: string) {
    const { data } = await axiosWithAuth<IReview>({
      url: API_URL.reviews(`/${reviewId}`),
      method: 'DELETE'
    })
    return data
  }
}

export const reviewService = new ReviewService()
