import { IProduct } from '@/shared/types/product.interface'

interface IProductInfoProps {
  product: IProduct
}

export function ProductInfo({ product }: IProductInfoProps) {
  return <div>ProductInfo</div>
}
