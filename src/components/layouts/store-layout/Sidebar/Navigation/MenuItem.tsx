'use client'
import { IMenuItem } from './menu.interface'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface IMenuItemProps {
  route: IMenuItem
}

export function MenuItem({ route }: IMenuItemProps) {
  const pathname = usePathname()

  return (
    <Link
      href={route.link}
      className={cn(
        'flex items-center gap-x-3 text-slate-500 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm bg-transparent transition-all duration-200',
        {
          ['text-sm text-blue-500 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-500']:
            pathname === route.link
        }
      )}
    >
      <route.icon className='size-5' />
      {route.value}
    </Link>
  )
}
