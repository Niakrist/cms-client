import { SITE_NAME } from '@/constants/seo.constants'

export function Footer() {
  const yera = new Date().getFullYear()

  return (
    <footer className='border-t mt-16'>
      <div className='mx-auto py-5 text-center'>
        {`${SITE_NAME} ${yera} © Все права защищены`}
      </div>
    </footer>
  )
}
