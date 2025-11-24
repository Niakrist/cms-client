'use client'
import React from 'react'

import styles from './Header.module.css'
import { MobileSidebar } from '../Sidebar/Navigation/MobileSidebar'
import { useProfile } from '@/hooks/useProfile'
import { DASHBOARD_URL } from '@/config/url.config'
import Image from 'next/image'
import { Loader } from '@/components/ui/Loader'
import Link from 'next/link'

export function Header() {
  const { user, isLoading } = useProfile()
  return (
    <div className='p-6 gap-x-4 h-full flex items-center bg-white border-b'>
      <MobileSidebar />
      <div className='flex items-center gap-x-4 ml-auto'>
        {isLoading ? (
          <Loader size={'sm'} />
        ) : (
          user && (
            <>
              <Link href={DASHBOARD_URL.home()}>
                <Image
                  className='rounded-full'
                  src={user.picture}
                  alt={user.name}
                  width={42}
                  height={42}
                />
              </Link>
            </>
          )
        )}
      </div>
    </div>
  )
}
