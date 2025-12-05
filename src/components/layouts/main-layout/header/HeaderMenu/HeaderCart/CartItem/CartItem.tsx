import { PUBLIC_URL } from '@/config/url.config'
import { ICartItem } from '@/shared/types/cart.interface'
import Image from 'next/image'
import Link from 'next/link'
import { CartActions } from './CartActions'
import { formatPrice } from '@/lib/string/format-price'

interface iCartItemProps {
  item: ICartItem
}
export function CartItem({ item }: iCartItemProps) {
  return (
    <div className='flex items-center mb-5'>
      <Link className='images' href={PUBLIC_URL.product(item.product.id)}>
        <Image
          width={120}
          height={120}
          className='relative  rounded-md overflow-hidden object-cover'
          src={
            item.product.images[0].includes('/uploads/products/')
              ? item.product.images[0]
              : `/uploads/products/${item.product.images[0]}`
          }
          alt={item.product.title}
        />
      </Link>
      <div className='ml-6'>
        <h2 className='font-medium line-clamp-1'>{item.product.title}</h2>
        <p className='text-sm text-muted-foreground mt-1'>
          {formatPrice(item.product.price)}
        </p>
        <CartActions item={item} />
      </div>
    </div>
  )
}
