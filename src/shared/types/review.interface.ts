import { IUser } from './user.interface'

export interface IReview {
  id: string
  text: string
  rating: number
  user: IUser
  createdAt: string
}

// Pick создает новый тип, с указанными свойствами из исходного типа.
// Берём  свойства 'text' | 'rating' из IReview
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IReviewInput extends Pick<IReview, 'text' | 'rating'> {}
