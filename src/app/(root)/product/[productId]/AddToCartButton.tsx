'use client'
import { Button } from '@/components/ui/Button'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/shared/types/cart.interface'
import { IProduct } from '@/shared/types/product.interface'

interface IAddToCartButtonProps {
  product: IProduct
}

export function AddToCartButton({ product }: IAddToCartButtonProps) {
  const { addToCart, removeFromCart } = useActions()
  const { items } = useCart()
  const currenElement = items.find(item => item.product.id === product.id)

  const handleClick = (currenElement: ICartItem | undefined) => {
    if (currenElement) {
      removeFromCart({ id: currenElement.id })
    } else {
      addToCart({ product, quantity: 1, price: product.price })
    }
  }

  return (
    <Button
      className='w-full'
      variant='primary'
      size='lg'
      onClick={() => handleClick(currenElement)}
    >
      {currenElement ? 'Удалить из корзины' : 'Добавить в корзину'}
    </Button>
  )
}
