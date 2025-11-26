'use client'
import { STORE_URL } from '@/config/url.config'
import { colorServices } from '@/services/color.service'
import { IColorInput } from '@/shared/types/color.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useCreateColor() {
  const params = useParams<{ storeId: string }>()
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutate: colorCreate, isPending: isLoadinColorCreate } = useMutation({
    mutationKey: ['create color'],
    mutationFn: (data: IColorInput) => {
      return colorServices.create(params.storeId, data)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get colors for store dashboard']
      })
      toast.success('Новый цвет создан')
      push(STORE_URL.colors(params.storeId))
    },
    onError() {
      toast.error('Не удалось создать цвет')
    }
  })

  return useMemo(
    () => ({ colorCreate, isLoadinColorCreate }),
    [colorCreate, isLoadinColorCreate]
  )
}
