'use client'

import { useParams } from 'next/navigation'
import { ColorForm } from '../ColorForm'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

export function ColorEdit() {
  const params = useParams<{ colorId: string }>()
  const { colors } = useGetColors()

  const color = colors?.find(color => color.id === params.colorId)

  return <ColorForm color={color} />
}
