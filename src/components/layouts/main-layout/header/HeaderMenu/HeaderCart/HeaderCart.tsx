import { Button } from '@/components/ui/Button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/Sheet'

export function HeaderCart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>Корзина</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Корзина товаров</SheetTitle>
          <SheetDescription>Корзина товаров</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
