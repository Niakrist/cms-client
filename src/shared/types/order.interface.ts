import { ICartItem } from './cart.interface'
import { IUser } from './user.interface'

// Сумма
interface IAmount {
  value: string
  currency: string
}

// Получатель
interface IRecipient {
  account_id: string
  gateway_id: string
}

// Способ оплаты
interface IPaymentMethod {
  id: string
  type: string
  saved: string
}

// Подтверждение
interface IConfirmation {
  type: string
  return_url: string
  confirmation_url: string
}

// Платежный ответ
export interface IPaymentResponse {
  id: string
  created_at: Date
  status: string
  amount: IAmount
  recipient: IRecipient
  payment_method: IPaymentMethod
  confirmation: IConfirmation
}

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED'
}

export interface IOrder {
  id: string
  createdAt: string
  items: ICartItem[]
  status: EnumOrderStatus
  user: IUser
  total: number
}
