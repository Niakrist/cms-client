'use client'
import { Button } from '@/components/ui/Button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export interface IReviewColumn {
  id: string
  createdAt: string
  username: string
  rating: string
}

export const reviewsColumn: ColumnDef<IReviewColumn>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Пользователь <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Рейтинг <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Дата создания <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    }
  }
]
