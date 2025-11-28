import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { STORE_URL } from '@/config/url.config'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'

interface IColorColumn {
  id: string
  name: string
  value: string
  storeId: string
}

export const colorsColumn: ColumnDef<IColorColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          {' '}
          Название <ArrowUpDown className='ml-2 size-4' />{' '}
        </Button>
      )
    }
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Цвет <ArrowUpDown className='ml-2 size-4' />{' '}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='flex items-center gap-x-3'>
        <div
          className='size-5 rounded-full border'
          style={{ backgroundColor: row.original.value }}
        />
        {row.original.name}
      </div>
    )
  },
  {
    accessorKey: 'actions',
    header: 'Действия',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <Link
            href={STORE_URL.colorEdit(row.original.storeId, row.original.id)}
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
