import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import { ColorForm } from '../ColorForm'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'
import CreateColor from './CreateColor'

export const metadata: Metadata = {
  title: 'Создание цвета',
  ...NO_INDEX_PAGE
}

export default function CreateColorPage() {
  return <CreateColor />
}
