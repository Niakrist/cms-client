'use client'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form-element/Form'
import { Input } from '@/components/ui/form-element/Input'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Textarea } from '@/components/ui/Textarea'
import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'
import { IStoreEdit } from '@/shared/types/store.interface'
import { Trash } from 'lucide-react'
import { type SubmitHandler, useForm } from 'react-hook-form'

export function Settings() {
  const { store, updateStore, isLoadingUpdateStore } = useUpdateStore()
  const { deleteStore, isLoadingDeleteStore } = useDeleteStore()

  const form = useForm<IStoreEdit>({
    mode: 'onChange',
    values: {
      title: store?.title || '',
      description: store?.description || ''
    }
  })

  console.log('Settings store: ', store)

  const onSubmit: SubmitHandler<IStoreEdit> = data => {
    updateStore(data)
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <Heading
          title='Настройки'
          description='Управление настройками магазина'
        />
        <ConfirmModal handleClick={() => deleteStore()}>
          <Button
            className='flex items-center gap-x-4'
            size={'icon'}
            variant='primary'
            disabled={isLoadingDeleteStore}
          >
            <Trash className='size-4' />
          </Button>
        </ConfirmModal>
      </div>
      <Form {...form}>
        <form
          className='space-y-6 h-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            <FormField
              control={form.control}
              name='title'
              rules={{
                required: 'Название обязательно'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Название магазина'
                      type='text'
                      disabled={isLoadingUpdateStore}
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Описание магазина'
                    disabled={isLoadingUpdateStore}
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={'primary'} disabled={isLoadingUpdateStore}>
            Сохранить
          </Button>
        </form>
      </Form>
    </div>
  )
}
