import { Button } from '@/components/ui/Button'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/shared/types/cart.interface'
import { icons } from 'lucide-react'

interface iCartActionsProps {
  item: ICartItem
}

export function CartActions({ item }: iCartActionsProps) {
  const { changeQuantity } = useActions()

  const { items } = useCart()
  return (
    <div className='actions'>
      <Button
        onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
        variant='ghost'
        size='icon'
        disabled={qua}
      ></Button>
    </div>
  )
}
