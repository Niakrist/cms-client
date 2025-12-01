'use client'
import { useParams } from 'next/navigation'
import { ColorForm } from '../ColorForm'
import { useQuery } from '@tanstack/react-query'
import { colorServices } from '@/services/color.service'

export function ColorEdit() {
  const params = useParams<{ colorId: string }>()

  const { data } = useQuery({
    queryKey: ['get color'],
    queryFn: () => colorServices.getById(params.colorId)
  })

  return <ColorForm color={data} />
}
