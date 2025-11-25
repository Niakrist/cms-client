'use client'
import { useGetProducts } from '@/hooks/queries/products/useGetProducts'
import { useParams } from 'next/navigation'
import { IProductColumn, productColumns } from './ProductsColumn'
import { formatPrice } from '@/lib/string/format-price'
import { DataTableLoading } from '@/components/ui/data-loading/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import Link from 'next/link'
import { STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-loading/DataTable'

export function Products() {
  const params = useParams<{ storeId: string }>()
  const { products, isLoading } = useGetProducts()
  const formattedData: IProductColumn[] = products
    ? products.map(product => ({
        id: product.id,
        title: product.title,
        price: formatPrice(product.price),
        category: product.category.title,
        color: product.color.value,
        storeId: product.storeId
      }))
    : []

  console.log(formattedData)

  return (
    <div className='p-6'>
      {isLoading || !products?.length ? (
        <DataTableLoading />
      ) : (
        <>
          <div className='flex items-center justify-between'>
            <Heading
              title={`Товары (${products?.length})`}
              description='Все товары вашего магазина'
            />
            <div className='flex items-center gap-x-4'>
              <Link href={STORE_URL.productCreate(params.storeId)}>
                <Button variant='primary'>
                  <Plus className='size-4' /> Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className='table w-full'>
            <DataTable
              columns={productColumns}
              data={formattedData}
              filterKey='title'
            />
          </div>
        </>
      )}
    </div>
  )
}
