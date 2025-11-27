import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form-element/Form'
import { ImageUpload } from '@/components/ui/form-element/ImageUpload/ImageUpload'
import { Input } from '@/components/ui/form-element/Input'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { useCreateProducts } from '@/hooks/queries/products/useCreateProducts'
import { useDeleteProducts } from '@/hooks/queries/products/useDeleteProducts'
import { useUpdateProducts } from '@/hooks/queries/products/useUpdateProducts'
import { ICategory } from '@/shared/types/category.interface'
import { IColor } from '@/shared/types/color.interface'
import { IProduct, IProductInput } from '@/shared/types/product.interface'

import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProductFormProps {
  product?: IProduct
  categories: ICategory[]
  colors: IColor[]
}

export function ProductForm({
  product,
  categories,
  colors
}: IProductFormProps) {
  const { createProducts, isLoadingProducts } = useCreateProducts()
  const { updateProduct, isLoadingUpdateProduct } = useUpdateProducts()
  const { deleteProduct, IsLoadingDeleteProduct } = useDeleteProducts()

  const title = product ? 'Изменить данные' : 'Создать товар'
  const description = product
    ? 'Изменить данные о товаре'
    : 'Добавить новый товар в магазин'
  const action = product ? 'Сохранить' : 'Создать'

  const form = useForm<IProductInput>({
    mode: 'onChange',
    values: {
      title: product?.title ?? '',
      description: product?.description ?? '',
      images: product?.images ?? [],
      price: product?.price ?? 0,
      categoryId: product?.category.id ?? '',
      colorId: product?.color.id ?? ''
    }
  })
  const onSubmit: SubmitHandler<IProductInput> = data => {
    data.price = Number(data.price)
    if (product) {
      updateProduct(data)
    } else {
      createProducts(data)
    }
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
            <Button
              className='flex items-center gap-x-4'
              size='icon'
              variant='primary'
              disabled={IsLoadingDeleteProduct}
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
          <FormField
            control={form.control}
            name='images'
            rules={{
              required: 'Загрузите хотябы одну картинку'
            }}
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Картинки</FormLabel>
                <FormControl className='w-full'>
                  <ImageUpload
                    isDisabled={isLoadingProducts || isLoadingUpdateProduct}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      placeholder='Название товара'
                      type='text'
                      disabled={isLoadingProducts || isLoadingUpdateProduct}
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
              name='price'
              rules={{
                required: 'Цена обязательна'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Цена товара'
                      type='number'
                      disabled={isLoadingProducts || isLoadingUpdateProduct}
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
              name='categoryId'
              rules={{
                required: 'Категория обязательна'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категория</FormLabel>
                  <Select
                    disabled={isLoadingProducts || isLoadingUpdateProduct}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder='Категория товара' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            <FormField
              control={form.control}
              name='colorId'
              rules={{
                required: 'Цвет обязателен'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цвет</FormLabel>
                  <Select
                    disabled={isLoadingProducts || isLoadingUpdateProduct}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder='Цвет товара' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {colors.map(color => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            rules={{
              required: 'Описание обязательно'
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Описание товара'
                    disabled={isLoadingProducts || isLoadingUpdateProduct}
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant='primary'
            disabled={isLoadingProducts || isLoadingUpdateProduct}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
