import { PUBLIC_URL } from '@/config/url.config'
import { formatPrice } from '@/lib/string/format-price'
import { IProduct } from '@/shared/types/product.interface'
import Image from 'next/image'
import Link from 'next/link'

interface IProductCardProps {
  product: IProduct
}
export function ProductCard({ product }: IProductCardProps) {
  return (
    <div className='bg-white'>
      <Link href={PUBLIC_URL.product(product.id)}>
        <Image
          className='rounded-lg h-[300px] object-contain'
          src={
            product.images[0].includes('/uploads/products/')
              ? product.images[0]
              : `/uploads/products/${product.images[0]}`
          }
          alt={product.title}
          width={300}
          height={300}
        />
      </Link>
      <h3 className='mt-4 font-semibold text-gray-700 line-clamp-1'>
        {product.title}
      </h3>
      <Link
        className='mt-1 text-sm text-gray-500'
        href={PUBLIC_URL.category(product.category.id)}
      >
        {product.category.title}
      </Link>
      <p className='mt-1 font-medium text-sm text-gray-900'>
        {formatPrice(product.price)}
      </p>
    </div>
  )
}
