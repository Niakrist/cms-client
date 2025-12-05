'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { SERVER_URL } from '@/config/api.config'
import { FcGoogle } from 'react-icons/fc'
import { FaYandex } from 'react-icons/fa'

export function Social() {
  // Нужен для переадресации
  const router = useRouter()
  return (
    <div className={'space-y-3  w-full mt-5'}>
      <Button
        className='w-full'
        variant='outline'
        onClick={() => router.push(`${SERVER_URL}/auth/google`)}
      >
        <FcGoogle className='size-5 mr-2' />
        Продолжить через Google
      </Button>
      <Button
        className='w-full'
        variant='outline'
        onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}
      >
        <FaYandex color='#FC3F1D' />
        Продолжить через Yandex
      </Button>
    </div>
  )
}
