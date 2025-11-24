import React from 'react'
import styles from './MiddleStatistics.module.scss'
import { ILastUsers } from '@/shared/types/statistics.interfzce'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Image from 'next/image'
import { formatPrice } from '@/lib/string/format-price'

interface ILastUsersProps {
  data: ILastUsers[]
}

export function LastUsers({ data }: ILastUsersProps) {
  console.log('data ', data)
  return (
    <Card>
      <CardHeader
        className={'flex flex-col items-stretch space-y-0 border-b p-4'}
      >
        <CardTitle>Прибыль</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length ? (
          data.map(user => (
            <div key={user.id} className={'flex items-center mt-5'}>
              {user.picture ? (
                <Image
                  className='rounded-full'
                  src={user.picture}
                  alt={user.name}
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  className='rounded-full'
                  src={'/images/no-user-images.png'}
                  alt={'no foto'}
                  width={40}
                  height={40}
                />
              )}
              <div className={'ml-4 space-y-1 text-sm text-muted-foreground'}>
                <p className='leading-none text-black font-medium'>
                  {user.name}
                </p>
                <p>{user.email}</p>
              </div>
              <div className='ml-auto font-medium'>
                +{formatPrice(user.total)}
              </div>
            </div>
          ))
        ) : (
          <div>У этого магазина нету покупателей</div>
        )}
      </CardContent>
    </Card>
  )
}
