'use client'
import { colorServices } from '@/services/color.service'
import { IColorInput } from '@/shared/types/color.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useUpdateColor() {
  const params = useParams<{ colorId: string }>()

  const queryClient = useQueryClient()

  const { mutate: updateColor, isPending: isLoadingUpdateColor } = useMutation({
    mutationKey: ['update color'],
    mutationFn: (data: IColorInput) => {
      return colorServices.update(params.colorId, data)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get colors for store dashboard']
      })
      toast.success('с успешно изменен')
    },
    onError() {
      toast.error('Не удалось изменить Не удалось изменить товар')
    }
  })

  return useMemo(
    () => ({ updateColor, isLoadingUpdateColor }),
    [updateColor, isLoadingUpdateColor]
  )
}
