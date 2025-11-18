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
  CardTitle
} from '@/components/ui/Card'
import { Form } from '@/components/ui/form-element/Form'
import { Button } from '@/components/ui/Button'
import { AuthFields } from './AuthFields'

export function Auth() {
  const [isReg, setIsReg] = useState<boolean>(false)
  const { onSubmit, form, isPending } = useAuthForm(isReg)
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Image src='/images/auth.svg' alt='auth' width={200} height={200} />
      </div>
      <div className={styles.right}>
        <Card className={styles.card}>
          <CardTitle>{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}</CardTitle>
          <CardDescription>
            Войдите или создайте учетную запись, чтобы оформлять покупки!
          </CardDescription>
          <CardContent className={styles.content}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AuthFields form={form} isPending={isPending} isReg={isReg} />
                <Button disabled={isPending}>Продолжить</Button>
              </form>
            </Form>
            {/* Social */}
          </CardContent>
          <CardFooter className={styles.footer}>
            {isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта'}
            <Button onClick={() => setIsReg(!isReg)}>
              {isReg ? 'Войти' : 'Создать'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
