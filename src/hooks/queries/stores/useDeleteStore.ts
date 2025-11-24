'use client'

import { PUBLIC_URL } from '@/config/url.config'
import { storeService } from '@/services/store.service'
import { IStoreEdit } from '@/shared/types/store.interface'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteStore = () => {
  const params = useParams<{ storeId: string }>()
  const router = useRouter()
  const { mutate: deleteStore, isPending: isLoadingDeleteStore } = useMutation({
    mutationKey: ['delete store'],
    mutationFn: () => storeService.delete(params.storeId),
    onSuccess() {
      toast.success('Магазин удален')
      router.push(PUBLIC_URL.home())
    },
    onError() {
      toast.error('Не удалось удалить магазин')
    }
  })

  return useMemo(
    () => ({ deleteStore, isLoadingDeleteStore }),
    [deleteStore, isLoadingDeleteStore]
  )
}
