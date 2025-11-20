import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form-element/Form'
import { Input } from '@/components/ui/form-element/Input'
import { validEmail } from '@/shared/regex'
import { IAuthForm } from '@/shared/types/auth.interface'
import { UseFormReturn } from 'react-hook-form'

interface IAuthFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<IAuthForm, any, IAuthForm>
  isPending: boolean
  isReg?: boolean
}

export function AuthFields({ form, isPending, isReg }: IAuthFieldsProps) {
  return (
    <>
      {isReg && (
        <FormField
          control={form.control}
          name='name'
          rules={{ required: 'Имя обязательно' }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Имя'
                  disabled={isPending}
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name='email'
        rules={{
          required: 'Почта обязательна',
          pattern: {
            value: validEmail,
            message: 'Введите валидную почту'
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder='email'
                type='email'
                disabled={isPending}
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
        name='password'
        rules={{
          required: 'Пароль обязателен',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов'
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder='password'
                type='password'
                disabled={isPending}
                autoComplete='off'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
