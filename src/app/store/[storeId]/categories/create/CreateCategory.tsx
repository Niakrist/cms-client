'use client'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useParams } from 'next/navigation'
import { CategoryForm } from '../CategoryForm'

export function CreateCategory() {
  return <CategoryForm />
}
