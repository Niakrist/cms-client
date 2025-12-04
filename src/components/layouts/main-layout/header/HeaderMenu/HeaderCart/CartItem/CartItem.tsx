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
    <div className='item'>
      <Link className='images' href={PUBLIC_URL.product(item.product.id)}>
        <Image src={item.product.images[0]} alt={item.product.title} fill />
      </Link>
      <div className='right'>
        <h2>{item.product.title}</h2>
        <p>{formatPrice(item.product.price)}</p>
        <CartActions item={item} />
      </div>
    </div>
  )
}
