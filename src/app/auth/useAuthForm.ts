import { PUBLIC_URL } from '@/config/url.config'
import { authService } from '@/services/auth/auth.service'
import { IAuthForm } from '@/shared/types/auth.interface'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useAuthForm = (isReg: boolean) => {
  // Нужен для переадресации
  const router = useRouter()

  // Инициализация формы из react-hook-form'
  const form = useForm<IAuthForm>({
    mode: 'onChange' // Валидацие на изменение формы
  })

  //
  const { mutate, isPending } = useMutation({
    mutationKey: ['auth user'], // Ключ для кэширования
    mutationFn: (data: IAuthForm) => {
      return authService.main(isReg ? 'register' : 'login', data)
    },
    onSuccess() {
      form.reset()
      toast.success('Успешная авторизация')
      router.replace(PUBLIC_URL.home())
    },
    onError(error) {
      if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('Ошибка при авторизации')
      }
    }
  })

  // Обработчик отправки
  const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)

  // onSubmit - функция для отправки формы
  // form - объект формы из react-hook-form
  // isPending - флаг загрузки (показывает, выполняется ли запрос)
  return { onSubmit, form, isPending }
}
