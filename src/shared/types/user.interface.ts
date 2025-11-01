import { IOrder, IProduct, IStore } from './store.interface'

export interface IUser {
  id: string
  name: string
  email: string
  picture: string
  favorites: IProduct[]
  orders: IOrder[]
  stores: IStore[]
}
