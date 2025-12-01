import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { STORE_URL } from '@/config/url.config'
import { ICategory } from '@/shared/types/category.interface'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'

export const categoryColumn: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Название <ArrowUpDown className='ml-2 size-4' />{' '}
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
  },
  {
    accessorKey: 'actions',
    header: 'Действия',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal size={4} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <Link
            href={STORE_URL.categoryEdit(row.original.storeId, row.original.id)}
          >
            <DropdownMenuItem>
              <Pencil className='s-4 mr-2' /> Изменить
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]
