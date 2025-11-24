import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import { Settings } from './Settings'

export const metadata: Metadata = {
  title: 'Настрйоки магазина',
  ...NO_INDEX_PAGE
}

export default function SettingsPage() {
  return (
    <>
      <Settings />
    </>
  )
}
