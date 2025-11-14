export interface ICategory {
  id: string
  title: string
  description: string
  storeId: string
  createdAt: string
}

// Pick создает новый тип, с указанными свойствами из исходного типа.
// Берём  свойства 'title' | 'description' из ICategory
export interface ICategoryInput
  extends Pick<ICategory, 'title' | 'description'> {}
