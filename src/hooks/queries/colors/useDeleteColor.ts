'use client'
import { STORE_URL } from '@/config/url.config'
import { colorServices } from '@/services/color.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useDeleteColor() {
  const params = useParams<{ colorId: string; storeId: string }>()
  const queryClient = useQueryClient()
  const { push } = useRouter()

  const { mutate: colorDelete, isPending: isLoadingColorDelete } = useMutation({
    mutationKey: ['delete color'],
    mutationFn: () => colorServices.delete(params.colorId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get colors for store dashboard']
      })
      toast.success('Цвет успешно удален')
      push(STORE_URL.colors(params.storeId))
    },
    onError() {
      toast.error('Ошибка при удалении цвета')
    }
  })
  return useMemo(
    () => ({ colorDelete, isLoadingColorDelete }),
    [colorDelete, isLoadingColorDelete]
  )
}
