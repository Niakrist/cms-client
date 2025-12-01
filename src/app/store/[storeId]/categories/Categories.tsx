'use client'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { ICategory } from '@/shared/types/category.interface'
import { formatDate } from '@/lib/date/format-date'
import { DataTableLoading } from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { categoryColumn } from './CategoryColumn'

export function Categories() {
  const { categories, isLoading } = useGetCategories()
  const params = useParams<{ storeId: string }>()

  const formattedData: ICategory[] = categories
    ? categories.map(category => ({
        id: category.id,
        title: category.title,
        description: category.description,
        storeId: category.storeId,
        createdAt: formatDate(category.createdAt)
      }))
    : []

  return (
    <div className='p-6'>
      {isLoading && !categories?.length ? (
        <DataTableLoading />
      ) : (
        <>
          <div className='flex items-center justify-between'>
            <Heading
              title={`Категории (${categories?.length})`}
              description='Все категории вашего магазина'
            />
            <div className='flex items-center gap-x-4'>
              <Link href={STORE_URL.categoryCreate(params.storeId)}>
                <Button variant='primary'>
                  <Plus className='size-4' /> Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className='table w-full'>
            <DataTable
              columns={categoryColumn}
              data={formattedData}
              filterKey='title'
            />
          </div>
        </>
      )}
    </div>
  )
}
