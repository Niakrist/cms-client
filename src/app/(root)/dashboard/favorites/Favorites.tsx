'use client'

import { Catalog } from '@/components/ui/Catalog/Catalog'
import { useProfile } from '@/hooks/useProfile'

export function Favorites() {
  const { user } = useProfile()

  if (!user) {
    return <></>
  }

  return (
    <div className='my-6'>
      <Catalog title='Избранное' products={user.favorites} />
    </div>
  )
}
