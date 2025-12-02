import { PropsWithChildren } from 'react'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col h-full'>
      <Header />
      <main className='h-full flex-1 mx-5 lg:mx-14'>{children}</main>
      <Footer />
    </div>
  )
}
