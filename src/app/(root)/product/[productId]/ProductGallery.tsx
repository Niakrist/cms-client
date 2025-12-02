import { cn } from '@/lib/utils'
import { IProduct } from '@/shared/types/product.interface'
import Image from 'next/image'
import { useState } from 'react'

interface IProductGalleryProps {
  product: IProduct
}
export function ProductGallery({ product }: IProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      <Image
        src={product.images[currentIndex]}
        alt={product.title}
        width={500}
        height={500}
        className='rounded-lg h-[500px] object-contain'
      />
      <div className='flex mt-6 gap-6'>
        {product.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'duration-300 border rounded-lg overflow-hidden',
              index === currentIndex ? 'border-black' : 'border-transparent'
            )}
          >
            <Image src={img} width={100} height={100} alt={product.title} />
          </button>
        ))}
      </div>
    </div>
  )
}
