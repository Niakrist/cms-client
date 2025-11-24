import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

const iconVariants = cva('animate-spin text-muted-foreground', {
  variants: {
    size: {
      default: 'size-9',
      sm: 'size-6'
    },
    defaultVariants: {
      size: 'default'
    }
  }
})

type TypeIconVariants = VariantProps<typeof iconVariants>

type ILoader = TypeIconVariants

export function Loader({ size }: ILoader) {
  return <LoaderCircle className={cn(iconVariants({ size }))} />
}
