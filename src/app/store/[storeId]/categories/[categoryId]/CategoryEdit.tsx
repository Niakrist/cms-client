'use client'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useParams } from 'next/navigation'
import { CategoryForm } from '../CategoryForm'

export default function CategoryEdit() {
  const params = useParams<{ categoryId: string }>()
  const { categories } = useGetCategories()
  const category = categories?.find(
    category => category.id === params.categoryId
  )

  return <CategoryForm category={category} />
}
