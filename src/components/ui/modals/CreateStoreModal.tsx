import { useCreateStore } from '@/hooks/queries/stores/useCreateStore'
import { IStoreCreate } from '@/shared/types/store.interface'
import React, { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../Dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form-element/Form'
import { Input } from '../form-element/Input'
import { Button } from '../Button'

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
  const [isOpen, setIsOpen] = useState(false)

  const { createStore, isLoadingCreateStore } = useCreateStore()

  const form = useForm<IStoreCreate>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IStoreCreate> = data => {
    createStore(data)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='w-full'>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание магазина</DialogTitle>
          <DialogDescription>
            Для создания магазина необхожимо указать название
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
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
                      disabled={isLoadingCreateStore}
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button variant={'primary'} disabled={isLoadingCreateStore}>
                Создать
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
