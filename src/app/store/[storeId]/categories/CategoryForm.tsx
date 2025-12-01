'use client'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form-element/Form'
import { Input } from '@/components/ui/form-element/Input'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Textarea } from '@/components/ui/Textarea'
import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'
import { ICategory, ICategoryInput } from '@/shared/types/category.interface'
import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICategoryFormProps {
  category?: ICategory
}

export function CategoryForm({ category }: ICategoryFormProps) {
  const { createCategory, isLoadingCreateCategory } = useCreateCategory()
  const { updateCategory, isLoadingUpdateCategory } = useUpdateCategory()
  const { categoryDelete, isLoadingCategoryDelete } = useDeleteCategory()

  const title = category ? 'Изменить категорию' : 'Создать категорию'
  const description = category
    ? 'Изменить данные о категории'
    : 'Добавить новую категорию в магазин'
  const action = category ? 'Сохранить' : 'Создать'

  const form = useForm<ICategoryInput>({
    mode: 'onChange',
    values: {
      title: category?.title ?? '',
      description: category?.description ?? ''
    }
  })

  const onSubmit: SubmitHandler<ICategoryInput> = data => {
    if (category) {
      updateCategory(data)
    } else {
      createCategory(data)
    }
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {category && (
          <ConfirmModal handleClick={() => categoryDelete()}>
            <Button
              className='flex items-center gap-x-4'
              size='icon'
              variant='primary'
              disabled={isLoadingCategoryDelete}
            >
              <Trash className='size-4' />
            </Button>
          </ConfirmModal>
        )}
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
                required: 'Поле название категории обязательное'
              }}
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Категория</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Название категории'
                      type='text'
                      disabled={
                        isLoadingCreateCategory || isLoadingUpdateCategory
                      }
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            rules={{
              required: 'Поле описание категории обязательное'
            }}
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Описание категории'
                    disabled={
                      isLoadingCreateCategory || isLoadingUpdateCategory
                    }
                    autoComplete='off'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            variant='primary'
            disabled={isLoadingCreateCategory || isLoadingUpdateCategory}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
