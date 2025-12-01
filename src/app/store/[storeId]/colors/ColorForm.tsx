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
import { useCreateColor } from '@/hooks/queries/colors/useCreateColor'
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor'
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor'
import { IColor, IColorInput } from '@/shared/types/color.interface'
import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IColorFormProps {
  color?: IColor
}

export function ColorForm({ color }: IColorFormProps) {
  const { colorCreate, isLoadingColorCreate } = useCreateColor()
  const { updateColor, isLoadingUpdateColor } = useUpdateColor()
  const { colorDelete, isLoadingColorDelete } = useDeleteColor()
  const title = color ? 'Изменить цвет' : 'Создать цвет'
  const description = color
    ? 'Изменить данные о цвете'
    : 'Добавить новый цвет в магазин'
  const action = color ? 'Сохранить' : 'Создать'

  const form = useForm<IColorInput>({
    mode: 'onChange',
    values: {
      name: color?.name ?? '',
      value: color?.value ?? ''
    }
  })

  const onSubmit: SubmitHandler<IColorInput> = data => {
    if (color) {
      updateColor(data)
    } else {
      colorCreate(data)
    }
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {color && (
          <ConfirmModal handleClick={() => colorDelete()}>
            <Button
              className='flex items-center gap-x-4'
              size='icon'
              variant='primary'
              disabled={isLoadingColorDelete}
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
              name='name'
              rules={{
                required: 'Поле название цвета обязательное'
              }}
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Цвет</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Название цвета'
                      type='text'
                      disabled={isLoadingColorCreate || isLoadingUpdateColor}
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='value'
              rules={{ required: 'Значение цвета обязательное поле' }}
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Знаение цвета</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Значение цвета'
                      type='text'
                      disabled={isLoadingColorCreate || isLoadingUpdateColor}
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            variant='primary'
            disabled={isLoadingColorCreate || isLoadingUpdateColor}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
