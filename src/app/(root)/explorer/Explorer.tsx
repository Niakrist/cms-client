'use client'
import { Catalog } from '@/components/ui/Catalog/Catalog'
import { productService } from '@/services/product.service'
import { IProduct } from '@/shared/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

interface IExplorerProps {
  products: IProduct[]
}

export function Explorer({ products }: IExplorerProps) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('searchTerm')

  const { data } = useQuery({
    queryKey: ['product explorer', searchTerm],
    queryFn: () => productService.getAll(searchTerm),
    initialData: products
  })

  console.log('data: ', data)

  return (
    <div className='my-6'>
      <Catalog
        title={
          searchTerm ? `Поиск по запросу "${searchTerm}"` : 'Каталог товаров'
        }
        products={data}
      />
    </div>
  )
}
