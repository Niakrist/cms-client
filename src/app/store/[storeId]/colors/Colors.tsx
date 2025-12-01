'use client'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { DataTableLoading } from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import { STORE_URL } from '@/config/url.config'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'
import { formatDate } from '@/lib/date/format-date'
import { IColor } from '@/shared/types/color.interface'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { colorsColumn } from './ColorsColumn'

export function Colors() {
  const params = useParams<{ storeId: string }>()
  const { colors, isLoading } = useGetColors()
  const formattedData: IColor[] = colors
    ? colors?.map(color => ({
        id: color.id,
        name: color.name,
        value: color.value,
        storeId: color.storeId,
        createdAt: formatDate(color.createdAt)
      }))
    : []

  return (
    <div className='p-6'>
      {isLoading || !colors?.length ? (
        <DataTableLoading />
      ) : (
        <>
          <div className='flex items-center justify-between'>
            <Heading
              title={`Цвета (${colors?.length})`}
              description='Все цвета вашего магазина'
            />
            <div className='flex items-center gap-x-4'>
              <Link href={STORE_URL.colorCreate(params.storeId)}>
                <Button variant='primary'>
                  <Plus className='size-4' /> Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className='table w-full'>
            <DataTable
              columns={colorsColumn}
              data={formattedData}
              filterKey='name'
            />
          </div>
        </>
      )}
    </div>
  )
}
