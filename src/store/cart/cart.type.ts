import type { ICartItem } from '@/shared/types/cart.interface'

export interface ICartInitialState {
  items: ICartItem[]
}

// Omit утилитарный тип в TypeScript, который позволяет исключить
// определённые свойства из уже существующего типа или интерфейса.
// Он создаёт новый тип, убирая из исходного списка полей те, которые указаны.
export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

// Pick — утилитарный тип в TypeScript, который позволяет «выбрать»
// конкретные свойства из существующего типа или интерфейса.
// Он создаёт новый тип, включающий лишь те поля, которые явно указаны.
export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
  type: 'minus' | 'plus'
}
