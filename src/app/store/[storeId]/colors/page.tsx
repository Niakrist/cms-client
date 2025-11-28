import { Metadata } from 'next'
import React from 'react'
import { Colors } from './Colors'

export const metadata: Metadata = {
  title: 'Цвета'
}

export default function ColorsPage() {
  return <Colors />
}
