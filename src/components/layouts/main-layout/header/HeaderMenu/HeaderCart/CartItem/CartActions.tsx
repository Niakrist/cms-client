import { Button } from '@/components/ui/Button'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/shared/types/cart.interface'
import { icons, Minus, Plus } from 'lucide-react'

interface iCartActionsProps {
  item: ICartItem
}

export function CartActions({ item }: iCartActionsProps) {
  const { changeQuantity } = useActions()

  const { items } = useCart()
  const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity
  return (
    <div className='flex items-center mt-1'>
      <Button
        className='size-7'
        onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
        variant='ghost'
        size='icon'
        disabled={quantity === 1}
      >
        <Minus size={4} />
      </Button>
      <input
        className='w-10 text-center text-sm'
        disabled
        readOnly
        value={quantity}
        type='text'
      />
      <Button
        className='size-7'
        onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
        variant='ghost'
        size='icon'
      >
        <Plus size={4} />
      </Button>
    </div>
  )
}
