import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
  return { items: 1, total: 1 }
  const items = useTypedSelector(state => state.cart.items)

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return { items, total }
}
