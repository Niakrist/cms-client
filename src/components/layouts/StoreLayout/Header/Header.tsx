'use client'
import React from 'react'

import styles from './Header.module.css'
import { MobileSidebar } from '../Sidebar/Navigation/MobileSidebar'
import { useProfile } from '@/hooks/useProfile'

export function Header() {
  const { user, isLoading } = useProfile()
  return (
    <div>
      <MobileSidebar />
    </div>
  )
}
