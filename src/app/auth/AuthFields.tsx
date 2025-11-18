import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form-element/Form'
import { Input } from '@/components/ui/form-element/Input'
import { IAuthForm } from '@/shared/types/auth.interface'
import { UseFormReturn } from 'react-hook-form'

interface IAuthFieldsProps {
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
                <Input placeholder='Имя' disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  )
}
