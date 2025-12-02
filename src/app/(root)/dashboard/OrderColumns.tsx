'use client'

import { Button } from '@/components/ui/Button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export interface IOrderColumn {
  createdAt: string
  status: string
  total: string
}

export const orderColumns: ColumnDef<IOrderColumn>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Дата оплаты <ArrowUpDown className='ml-2' size={4} />
        </Button>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Статус <ArrowUpDown className='ml-2' size={4} />
        </Button>
      )
    }
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Сумма <ArrowUpDown className='ml-2' size={4} />
        </Button>
      )
    }
  }
]
