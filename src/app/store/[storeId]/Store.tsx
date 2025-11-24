'use client'
import { Heading } from '@/components/ui/Heading'
import { MainStatistics } from './statistics/MainStatistics/MainStatistics'
import { MiddleStatistics } from './statistics/MiddleStatistics/MiddleStatistics'

export function Store() {
  return (
    <div className='p-6'>
      <Heading title='Статистика' />

      <MainStatistics />
      <MiddleStatistics />
    </div>
  )
}
