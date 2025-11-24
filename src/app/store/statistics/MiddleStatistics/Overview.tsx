import React from 'react'

import styles from './MiddleStatistics.module.scss'
import { IMonthlySales } from '@/shared/types/statistics.interfzce'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/Chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { formatPrice } from '@/lib/string/format-price'

// satisfies - это оператор TypeScript, который появился в версии 4.9.
// Он позволяет проверять, что выражение соответствует определенному типу,
// не изменяя выводимый тип этого выражения.
const chartConfig = {
  value: {
    label: 'Прибыль',
    color: '#3B82F6'
  }
} satisfies ChartConfig

interface IOverviewProps {
  data: IMonthlySales[]
}

export function Overview({ data }: IOverviewProps) {
  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-4'>
        <CardTitle>Прибыль</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className='aspect-auto h-[310px] w-full'
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={formatPrice}
                  indicator='line'
                />
              }
            />
            <Area
              dataKey='value'
              type='natural'
              fill='var(--color-value)'
              stroke='var(--color-value)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
