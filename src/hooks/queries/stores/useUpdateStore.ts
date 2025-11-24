'use client'
import { STORE_URL } from '@/config/url.config'
import { storeService } from '@/services/store.service'
import { IStoreEdit } from '@/shared/types/store.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateStore = () => {
  const queryClient = useQueryClient()
  const params = useParams<{ storeId: string }>()

  const { data: store } = useQuery({
    queryKey: ['store', params.storeId],
    queryFn: () => storeService.getById(params.storeId)
  })

  const { mutate: updateStore, isPending: isLoadingUpdateStore } = useMutation({
    mutationKey: ['update store'],
    mutationFn: (data: IStoreEdit) => storeService.update(data, params.storeId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })
      toast.success('Магазин обновлен')
    },
    onError() {
      toast.error('Ошибка при обновлении магазина')
    }
  })

  return useMemo(
    () => ({
      store,
      updateStore,
      isLoadingUpdateStore
    }),
    [store, updateStore, isLoadingUpdateStore]
  )
}
