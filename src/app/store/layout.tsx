import { StoreLayout } from '@/components/layouts/StoreLayout/StoreLayout'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <StoreLayout>{children}</StoreLayout>
}
