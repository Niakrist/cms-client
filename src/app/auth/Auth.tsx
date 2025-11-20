'use client'

import { useState } from 'react'
import { useAuthForm } from './useAuthForm'

import styles from './Auth.module.scss'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Form } from '@/components/ui/form-element/Form'
import { Button } from '@/components/ui/Button'
import { AuthFields } from './AuthFields'
import { Social } from './Social'

export function Auth() {
  const [isReg, setIsReg] = useState<boolean>(false)
  const { onSubmit, form, isPending } = useAuthForm(isReg)
  return (
    <div className={'min-h-screen grid grid-cols-1 lg:grid-cols-2'}>
      <div
        className={
          'h-full bg-blue-600 hidden lg:flex items-center justify-center'
        }
      >
        <Image src='/images/auth.svg' alt='auth' width={200} height={200} />
      </div>
      <div className={'h-full flex flex-col items-center justify-center'}>
        <Card
          className={
            'border-none p-6 flex flex-col items-center justify-center w-full-[380px]'
          }
        >
          <CardHeader className={'text-center pb-5 w-full'}>
            <CardTitle className='pb-1 text-3xl font-bold;'>
              {isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </CardTitle>
            <CardDescription>
              Войдите или создайте учетную запись, чтобы оформлять покупки!
            </CardDescription>
          </CardHeader>
          <CardContent className={'p-0 w-full'}>
            <Form {...form}>
              <form
                className='space-y-5'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <AuthFields form={form} isPending={isPending} isReg={isReg} />
                <Button className='w-full' disabled={isPending}>
                  Продолжить
                </Button>
              </form>
            </Form>
            <Social />
          </CardContent>
          <CardFooter className={'p-0 mt-4 text-sm text-muted-foreground'}>
            {isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
            <Button
              variant='ghost'
              className='ml-1 text-sky-600'
              onClick={() => setIsReg(!isReg)}
            >
              {isReg ? 'Войти' : 'Создать'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
