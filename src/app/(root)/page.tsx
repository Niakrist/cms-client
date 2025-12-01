import { Metadata } from 'next'
import { Home } from './Home'

export const metadata: Metadata = {
  title: 'Интернент магазин',
  description: 'Интернент магазин - описание'
}

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  )
}
