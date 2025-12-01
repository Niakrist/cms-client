'use client'
import { useProfile } from '@/hooks/useProfile'
import { HeaderCart } from './HeaderCart/HeaderCart'
import Link from 'next/link'
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { LogOut } from 'lucide-react'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import Image from 'next/image'

export function HeaderMenu() {
  const { user, isLoading } = useProfile()
  return (
    <div className='hidden items-center gap-x-2 ml-auto lg:flex'>
      <HeaderCart />
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant='ghost'>Каталог</Button>
      </Link>
      {isLoading ? (
        <Loader size='sm' />
      ) : user ? (
        <>
          <Link href={DASHBOARD_URL.favorites()}>
            <Button variant='ghost'>Избранное</Button>
          </Link>
          {user.stores.length ? (
            <Link href={STORE_URL.home(user.stores[0].id)}>Мои магазины</Link>
          ) : (
            <CreateStoreModal>
              <Button variant='ghost'>Создать магазин</Button>
            </CreateStoreModal>
          )}
          <Link href={DASHBOARD_URL.home()}>
            <Image
              src={user.picture}
              alt={user.name}
              width={42}
              height={42}
              className='rounded-full'
            />
          </Link>
        </>
      ) : (
        <Link href={PUBLIC_URL.auth()}>
          <Button variant='primary'>
            <LogOut className='icon' />
            Войти
          </Button>
        </Link>
      )}
    </div>
  )
}
