'use client'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/Sheet'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/string/format-price'
import { CartItem } from './CartItem/CartItem'

export function HeaderCart() {
  const { items, total } = useCart()

  const handleClick = () => {}

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>Корзина</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Корзина товаров</SheetTitle>
          <SheetDescription>Корзина товаров</SheetDescription>
        </SheetHeader>

        <Heading title='Корзина товаров ' className='text-xl' />
        {/* <div className='items'>
          {items.length ? (
            items.map(item => <CartItem item={item} key={item.id} />)
          ) : (
            <div className='not_found'>Корзина пустая!</div>
          )}
        </div>
        {items.length ? (
          <>
            {' '}
            <div className='total'>Итого к оплате: {formatPrice(total)}</div>
            <Button onClick={handleClick} variant='primary' disabled={true}>
              Перейти к оплате
            </Button>
          </>
        ) : (
          <></>
        )} */}
      </SheetContent>
    </Sheet>
  )
}
