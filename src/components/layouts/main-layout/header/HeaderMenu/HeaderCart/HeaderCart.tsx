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
import { useRouter } from 'next/navigation'
import { useCheckout } from './useCheckout'
import { useProfile } from '@/hooks/useProfile'
import { PUBLIC_URL } from '@/config/url.config'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export function HeaderCart() {
  const { items, total } = useCart()
  const { push } = useRouter()
  const { createPayment, isLoadingCreatePayment } = useCheckout()
  const { user } = useProfile()

  const handleClick = () => {
    user ? createPayment() : push(PUBLIC_URL.auth())
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>Корзина</Button>
      </SheetTrigger>
      <SheetContent className='h-full flex flex-col p-5'>
        <VisuallyHidden asChild>
          <SheetHeader>
            <SheetTitle>Корзина товаров</SheetTitle>
            <SheetDescription>Корзина товаров</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <Heading title='Корзина товаров' />
        <div className='flex flex-col w-full flex-1'>
          {items.length ? (
            items.map(item => <CartItem item={item} key={item.id} />)
          ) : (
            <div className='text-sm text-muted-foreground'>Корзина пустая!</div>
          )}
        </div>
        {items.length ? (
          <>
            <div className='text-lg font-medium'>
              Итого к оплате: {formatPrice(total)}
            </div>
            <Button
              className='w-full'
              onClick={handleClick}
              variant='primary'
              disabled={isLoadingCreatePayment}
            >
              Перейти к оплате
            </Button>
          </>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  )
}
