import React from 'react'
import { Hero } from './Hero/Hero'
import { IProduct } from '@/shared/types/product.interface'
import { Catalog } from '@/components/ui/Catalog/Catalog'
import { PUBLIC_URL } from '@/config/url.config'

interface IHomeProps {
  products: IProduct[]
}

export function Home({ products }: IHomeProps) {
  return (
    <>
      <Hero />
      <Catalog
        title='Хиты продаж'
        description='Самые популярные товары нашего магазина'
        linkTitle='Узнать больше'
        link={PUBLIC_URL.explorer()}
        products={products}
      />
    </>
  )
}
