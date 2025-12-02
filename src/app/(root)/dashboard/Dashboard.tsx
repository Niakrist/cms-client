'use client'
import { useProfile } from '@/hooks/useProfile'
import { saveTokenStorage } from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { IOrderColumn, orderColumns } from './OrderColumns'
import { formatDate } from '@/lib/date/format-date'
import { EnumOrderStatus } from '@/shared/types/order.interface'
import { formatPrice } from '@/lib/string/format-price'
import { Button } from '@/components/ui/Button'
import { LogOut } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'

export function Dashboard() {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) {
      saveTokenStorage(accessToken)
    }
  }, [searchParams])

  const { user } = useProfile()

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => push('/auth')
  })

  if (!user) {
    return <></>
  }

  const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
    createdAt: formatDate(order.createdAt),
    status:
      order.status === EnumOrderStatus.PENDING ? 'В ожидании ' : 'Оплачен',
    total: formatPrice(order.total)
  }))

  return (
    <div className='my-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Ваши заказы</h1>
        <Button variant='ghost' onClick={() => logout()}>
          <LogOut className='size-4 mr-2' />
          Выйти
        </Button>
      </div>
      <DataTable columns={orderColumns} data={formattedOrders} />
    </div>
  )
}
